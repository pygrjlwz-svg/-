import { useEffect, useState } from 'react'
import { profile, navLinks } from '../data/profile.js'
import { ArrowUpRight } from './icons.jsx'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('hero')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // 滚动侦测当前区块
  useEffect(() => {
    const sections = navLinks
      .map((l) => document.getElementById(l.id))
      .filter(Boolean)
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-38% 0px -55% 0px' },
    )
    sections.forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [])

  return (
    <header className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-inner">
        <a className="brand" href="#hero" aria-label="回到首页">
          <span className="brand-mark">
            <img src="/logo.png" alt={`${profile.name} 标识`} />
          </span>
          <span className="brand-name">
            {profile.name}
            <small>{profile.enName}</small>
          </span>
        </a>

        <nav className="nav-links" aria-label="主导航">
          {navLinks.map((l, i) => (
            <a key={l.id} href={`#${l.id}`} className={`nav-link ${active === l.id ? 'active' : ''}`}>
              <span className="idx">0{i + 1}</span>
              {l.label}
            </a>
          ))}
        </nav>

        <a href="#contact" className="nav-cta">
          联系我
          <ArrowUpRight width={14} height={14} />
        </a>
      </div>
    </header>
  )
}