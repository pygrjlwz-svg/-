import { useEffect, useState } from 'react'
import gsap from 'gsap'
import { profile } from '../data/profile.js'
import HeroBackdrop from './HeroBackdrop.jsx'
import { ArrowRight, ArrowUpRight } from './icons.jsx'

export default function Hero() {
  const [curtainDone, setCurtainDone] = useState(false)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set('.intro-curtain', { display: 'none' })
        gsap.set('.hero-title .line span, .hero-top, .hero-roles, .hero-tagline, .hero-actions, .hero-meta, .brand, .nav-links, .nav-cta', {
          opacity: 1,
          y: 0,
          scaleY: 1,
        })
        return
      }

      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })

      // 1) 幕布：品牌行 + 进度线 → 整块上掀
      tl.fromTo('.curtain-tag', { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' })
        .fromTo('.curtain-line', { scaleX: 0 }, { scaleX: 1, duration: 1.0, ease: 'power3.inOut' }, '-=0.3')
        .to('.curtain-tag', { opacity: 0, y: -10, duration: 0.35 }, '+=0.15')
        .to('.intro-curtain', { yPercent: -100, duration: 0.95, ease: 'power4.inOut' })

      // 2) 标题遮罩揭开 + 压缩归位（与幕布抬起同步）
      tl.fromTo(
        '.hero-title .line span',
        { yPercent: 130, scaleY: 1.18 },
        { yPercent: 0, scaleY: 1, duration: 1.35, ease: 'expo.out', stagger: 0.14 },
        '-=0.6',
      )

      // 3) 背景由大景深慢慢归位（Ken Burns 收束）
      tl.fromTo(
        '.hero-backdrop',
        { scale: 1.16, filter: 'blur(8px)' },
        { scale: 1, filter: 'blur(0px)', duration: 2.0, ease: 'power2.out' },
        0,
      )

      // 4) 其余元素依次进场
      tl.fromTo('.hero-top', { y: 26, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, '-=1.5')
        .fromTo('.hero-roles', { y: 32, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, '-=0.55')
        .fromTo('.hero-tagline', { y: 32, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, '-=0.55')
        .fromTo('.hero-actions', { y: 32, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, '-=0.55')
        .fromTo('.hero-meta', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, '-=0.5')

      // 5) 导航滑入
      tl.fromTo(
        '.brand, .nav-links, .nav-cta',
        { y: -26, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.85, stagger: 0.09 },
        '-=1.6',
      )

      tl.call(() => setCurtainDone(true))
    })

    return () => ctx.revert()
  }, [])

  return (
    <section className="hero" id="hero">
      {/* 开场幕布 */}
      {!curtainDone && (
        <div className="intro-curtain" aria-hidden="true">
          <div className="curtain-inner">
            <span className="curtain-tag">
              {profile.enName} — PORTFOLIO / 2026
            </span>
            <span className="curtain-line" />
          </div>
        </div>
      )}

      <div className="hero-grid" aria-hidden="true" />
      <HeroBackdrop />
      {/* 磨砂质感层：视频上方一层毛玻璃模糊 + 颗粒噪点 */}
      <div className="hero-frost" aria-hidden="true" />
      <div className="hero-veil" aria-hidden="true" />

      <div className="hero-inner">
        <div className="hero-copy">
          <div className="hero-top">
            <span>
              <span className="dot" />
              {profile.available}
            </span>
            <span className="hero-coords">KUNMING · 24.88°N / 102.83°E</span>
          </div>

          <h1 className="hero-title">
            <span className="line">
              <span>{profile.name}</span>
            </span>
            <span className="line">
              <span className="accent-word">AIGC</span> 创作人
            </span>
          </h1>

          <ul className="hero-roles">
            {profile.role.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>

          <p className="hero-tagline">
            {profile.tagline} —— 从脚本到成片，用 AI 完成全流程影视动画创作。
          </p>

          <div className="hero-actions">
            <a className="btn btn-primary" href="#projects">
              查看作品
              <ArrowRight width={16} height={16} />
            </a>
            <a className="btn btn-ghost" href="#contact">
              与我联系
              <ArrowUpRight width={14} height={14} />
            </a>
          </div>

          <div className="hero-meta">
            <span>{profile.location}</span>
            <span className="scroll-hint">
              向下滚动
              <span className="line" />
            </span>
            <span>REACT + VITE</span>
          </div>
        </div>
      </div>
    </section>
  )
}