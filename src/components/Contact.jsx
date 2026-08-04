import { profile } from '../data/profile.js'
import Reveal from './Reveal.jsx'
import { ArrowUpRight, QqMail, Phone, WeChat } from './icons.jsx'

export default function Contact() {
  const channels = [
    { label: 'Email', value: profile.email, href: `mailto:${profile.email}`, Icon: QqMail },
    { label: 'Tel', value: profile.phone, href: `tel:${profile.phone.replace(/\s/g, '')}`, Icon: Phone },
    { label: 'WeChat', value: profile.wechat, Icon: WeChat },
  ]

  return (
    <section className="contact" id="contact">
      <div className="contact-inner">
        <Reveal className="contact-label">04 · CONTACT — 联系我</Reveal>
        <Reveal className="contact-title-wrap" delay={80}>
          <h2 className="contact-title">
            一起创作
            <br />
            <span className="accent-word">下一部作品</span>
          </h2>
        </Reveal>
        <Reveal delay={140}>
          <p className="contact-desc">
            无论是商业宣传、赛事宣发、AI 动画还是视觉 IP，我都可以从概念到成片全流程交付。
            期待与您聊聊下一个有趣的项目。
          </p>
        </Reveal>
        <Reveal delay={200}>
          <a className="contact-big-btn" href={`mailto:${profile.email}`}>
            开始合作
            <ArrowUpRight width={18} height={18} />
          </a>
        </Reveal>

        <Reveal className="contact-channels" delay={260}>
          {channels.map(({ label, value, href, Icon }) => {
            const inner = (
              <>
                <span className="ch-icon">
                  <Icon />
                </span>
                <span className="ch-value">{value}</span>
              </>
            )
            return href ? (
              <a key={label} className="channel" href={href}>
                {inner}
              </a>
            ) : (
              <div key={label} className="channel">
                {inner}
              </div>
            )
          })}
        </Reveal>
      </div>

      <div className="contact-footer">
        <div className="contact-footer-inner">
          <span>© 2026 {profile.name} · {profile.location}</span>
          <span>DESIGNED & BUILT WITH REACT + VITE</span>
          <a className="back-top" href="#hero">
            返回顶部 ↑
          </a>
        </div>
      </div>
    </section>
  )
}