import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * 全局动效引擎（GSAP + ScrollTrigger）
 * - 模块大标题：遮罩揭开 + 大幅位移进场（expo.out，慢而丝滑）
 * - 卡片/内容块：标题之后依次 stagger 出现（power4.out）
 * - 图片：轻微 parallax（scroll scrub）
 * - Hero 背景：随滚动轻微位移
 * - 尊重 prefers-reduced-motion
 */
export default function Motion() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set('[data-reveal], .section-head h2, .section-head .label, .section-head .head-en, .contact-label, .contact-title', {
          opacity: 1,
          clipPath: 'none',
          transform: 'none',
        })
        return
      }

      // ---- 初始状态：先藏好，避免滚动前可见 ----
      gsap.set('.section-head h2, .section-head .label, .section-head .head-en, .contact-label, .contact-title', { opacity: 0 })
      gsap.set('[data-reveal]:not(.section-head):not(.contact-label):not(.contact-title-wrap)', {
        clipPath: 'inset(0 0 100% 0)',
        y: 70,
      })

      // ---- 每个模块：标题大幅进场 → 卡片依次 stagger ----
      document.querySelectorAll('.section, .contact').forEach((section) => {
        const isContact = section.classList.contains('contact')
        const items = [
          ...section.querySelectorAll('[data-reveal]:not(.section-head):not(.contact-label):not(.contact-title-wrap)'),
        ]

        if (isContact) {
          const label = section.querySelector('.contact-label')
          const title = section.querySelector('.contact-title')
          const tl = gsap.timeline({
            scrollTrigger: { trigger: section, start: 'top 72%', once: true },
          })
          if (label) {
            tl.fromTo(label, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' })
          }
          if (title) {
            tl.fromTo(
              title,
              { clipPath: 'inset(0 0 100% 0)', y: 110, opacity: 0 },
              { clipPath: 'inset(0 0 0% 0)', y: 0, opacity: 1, duration: 1.2, ease: 'expo.out', clearProps: 'clipPath,y' },
              '-=0.3',
            )
          }
          if (items.length) {
            tl.fromTo(
              items,
              { clipPath: 'inset(0 0 100% 0)', y: 70 },
              { clipPath: 'inset(0 0 0% 0)', y: 0, duration: 1.0, ease: 'power4.out', stagger: 0.1, clearProps: 'clipPath,y' },
              '-=0.55',
            )
          }
          return
        }

        const head = section.querySelector('.section-head')
        const tl = gsap.timeline({
          scrollTrigger: { trigger: section, start: 'top 70%', once: true },
        })

        if (head) {
          const label = head.querySelector('.label')
          const h2 = head.querySelector('h2')
          const en = head.querySelector('.head-en')
          if (label) {
            tl.fromTo(label, { y: 26, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' })
          }
          if (h2) {
            tl.fromTo(
              h2,
              { clipPath: 'inset(0 0 100% 0)', y: 96, opacity: 0 },
              { clipPath: 'inset(0 0 0% 0)', y: 0, opacity: 1, duration: 1.15, ease: 'expo.out', clearProps: 'clipPath,y' },
              '-=0.35',
            )
          }
          if (en) {
            tl.fromTo(en, { x: 42, opacity: 0 }, { x: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }, '-=0.7')
          }
        }

        if (items.length) {
          tl.fromTo(
            items,
            { clipPath: 'inset(0 0 100% 0)', y: 70 },
            { clipPath: 'inset(0 0 0% 0)', y: 0, duration: 1.0, ease: 'power4.out', stagger: 0.1, clearProps: 'clipPath,y' },
            '-=0.45',
          )
        }
      })

      // ---- 图片轻微 parallax ----
      gsap.utils.toArray('.avatar-card img, .project-visual .pv-img').forEach((img) => {
        const holder = img.closest('.avatar-card, .project-visual')
        if (!holder) return
        gsap.fromTo(
          img,
          { yPercent: -5 },
          {
            yPercent: 5,
            ease: 'none',
            scrollTrigger: { trigger: holder, start: 'top bottom', end: 'bottom top', scrub: 0.8 },
          },
        )
      })

      // ---- Hero 背景随滚动轻微下移（纵深） ----
      gsap.fromTo(
        '.hero-backdrop',
        { yPercent: 0 },
        {
          yPercent: 16,
          ease: 'none',
          scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
        },
      )

      const onLoad = () => ScrollTrigger.refresh()
      window.addEventListener('load', onLoad)
      return () => window.removeEventListener('load', onLoad)
    })

    return () => ctx.revert()
  }, [])

  return null
}