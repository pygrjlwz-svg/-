import { useEffect, useRef, useState } from 'react'

/**
 * Hero 背景：
 * 优先播放 /media/hero.mp4（把视频文件放入 public/media/hero.mp4 即可生效），
 * 没有视频或视频加载失败时，自动回退到 Canvas 生成式动画背景。
 *
 * 性能优化：
 * - 视频 preload="metadata"：首屏不整段下载
 * - Canvas：Hero 离开视口时暂停 rAF；小屏降低粒子数量
 */
export default function HeroBackdrop() {
  const canvasRef = useRef(null)
  const videoRef = useRef(null)
  const [useVideo, setUseVideo] = useState(false)

  useEffect(() => {
    let alive = true
    // Vite 对缺失的静态资源会回退返回 index.html（text/html），
    // 因此需要校验响应类型确实是视频，再启用视频背景。
    // 线上静态托管对 HEAD 的 content-type 可能不是 video/*，
    // 因此只要资源存在（2xx）就启用视频，播放失败由 <video onError> 自动回退 Canvas。
    fetch('/media/hero.mp4', { method: 'HEAD' })
      .then((r) => {
        if (alive && r.ok) setUseVideo(true)
      })
      .catch(() => {})
    return () => {
      alive = false
    }
  }, [])

  useEffect(() => {
    if (useVideo) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let raf = 0
    let W = 0
    let H = 0
    let dpr = Math.min(window.devicePixelRatio || 1, 2)
    let visible = true
    const mouse = { x: -9999, y: -9999 }

    // 小屏降低粒子数量，控制成本
    const COUNT = window.innerWidth < 768 ? 55 : 110
    const particles = Array.from({ length: COUNT }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.00022,
      vy: (Math.random() - 0.5) * 0.00022,
      r: Math.random() * 1.6 + 0.5,
      accent: Math.random() < 0.16,
      ph: Math.random() * Math.PI * 2,
    }))

    // 漂浮光晕
    const glows = [
      { x: 0.22, y: 0.3, r: 0.38, rgb: '94, 234, 212', a: 0.05 },
      { x: 0.82, y: 0.62, r: 0.42, rgb: '110, 122, 255', a: 0.04 },
    ]

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      W = canvas.clientWidth
      H = canvas.clientHeight
      canvas.width = W * dpr
      canvas.height = H * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const onMove = (e) => {
      if (!visible) return
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }
    const onLeave = () => {
      mouse.x = -9999
      mouse.y = -9999
    }

    const draw = (t) => {
      if (!visible) {
        raf = 0
        return
      }
      ctx.clearRect(0, 0, W, H)

      // 光晕
      glows.forEach((g, i) => {
        const ox = Math.sin(t * 0.00006 + i * 2.1) * 0.05
        const oy = Math.cos(t * 0.00005 + i * 1.7) * 0.04
        const gx = (g.x + ox) * W
        const gy = (g.y + oy) * H
        const gr = g.r * Math.max(W, H)
        const grad = ctx.createRadialGradient(gx, gy, 0, gx, gy, gr)
        grad.addColorStop(0, `rgba(${g.rgb}, ${g.a})`)
        grad.addColorStop(1, 'rgba(0,0,0,0)')
        ctx.fillStyle = grad
        ctx.fillRect(0, 0, W, H)
      })

      // 更新粒子
      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < -0.02) p.x = 1.02
        if (p.x > 1.02) p.x = -0.02
        if (p.y < -0.02) p.y = 1.02
        if (p.y > 1.02) p.y = -0.02
      })

      // 连线
      ctx.lineWidth = 0.6
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i]
          const b = particles[j]
          const dx = (a.x - b.x) * W
          const dy = (a.y - b.y) * H
          const d2 = dx * dx + dy * dy
          const max = 150 * 150
          if (d2 < max) {
            const alpha = (1 - d2 / max) * 0.14
            ctx.strokeStyle = `rgba(200, 205, 215, ${alpha})`
            ctx.beginPath()
            ctx.moveTo(a.x * W, a.y * H)
            ctx.lineTo(b.x * W, b.y * H)
            ctx.stroke()
          }
        }
      }

      // 粒子
      particles.forEach((p) => {
        const tw = 0.55 + 0.45 * Math.sin(t * 0.001 + p.ph)
        const px = p.x * W
        const py = p.y * H
        const mdx = px - mouse.x
        const mdy = py - mouse.y
        const md2 = mdx * mdx + mdy * mdy
        const pullR = 170 * 170
        if (md2 < pullR) {
          const f = (1 - md2 / pullR) * 0.5
          p.x -= (mdx / Math.max(1, Math.sqrt(md2))) * f * 0.0012
          p.y -= (mdy / Math.max(1, Math.sqrt(md2))) * f * 0.0012
        }
        ctx.beginPath()
        ctx.arc(px, py, p.r, 0, Math.PI * 2)
        ctx.fillStyle = p.accent
          ? `rgba(${94}, ${234}, ${212}, ${0.5 * tw})`
          : `rgba(215, 220, 230, ${0.32 * tw})`
        ctx.fill()
      })

      if (reduce) return
      raf = requestAnimationFrame(draw)
    }

    // Hero 离开视口时暂停动画
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visible = entry.isIntersecting
          if (visible && !reduce && raf === 0) raf = requestAnimationFrame(draw)
        })
      },
      { threshold: 0 },
    )
    io.observe(canvas)

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseleave', onLeave)
    if (!reduce) raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', onLeave)
    }
  }, [useVideo])

  if (useVideo) {
    return (
      <div className="hero-backdrop">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/covers/cover-01.svg"
          onError={() => setUseVideo(false)}
        >
          <source src="/media/hero.mp4" type="video/mp4" />
        </video>
      </div>
    )
  }

  return (
    <div className="hero-backdrop">
      <canvas ref={canvasRef} aria-hidden="true" />
    </div>
  )
}