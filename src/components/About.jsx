import { profile } from '../data/profile.js'
import Reveal from './Reveal.jsx'
import { Mail, Phone, WeChat, Pin } from './icons.jsx'

const contactIcons = {
  email: Mail,
  phone: Phone,
  wechat: WeChat,
  location: Pin,
}

export default function About() {
  const contacts = [
    { key: 'email', label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
    { key: 'phone', label: 'Tel', value: profile.phone, href: `tel:${profile.phone.replace(/\s/g, '')}` },
    { key: 'wechat', label: 'WeChat', value: profile.wechat },
    { key: 'location', label: 'Location', value: profile.location },
  ]

  return (
    <section className="section about" id="about">
      <div className="container">
        <Reveal className="section-head">
          <div>
            <div className="label">
              <em>01</em> ABOUT — 关于我
            </div>
            <h2>
              把传统动画功底
              <br />
              与 <span className="thin">AI 创作力</span> 合二为一
            </h2>
          </div>
          <span className="head-en">CINEMATIC / AI-DRIVEN / FULL-STACK CREATOR</span>
        </Reveal>

        <div className="about-grid">
          <div className="about-left">
            <Reveal className="avatar-card" delay={80}>
              <img src="/avatar.jpg" alt={`${profile.name} 头像`} loading="lazy" />
              <span className="avatar-status">
                <span className="dot" />
                {profile.available}
              </span>
              <div className="avatar-badge">
                <strong>{profile.name}</strong>
                <span>{profile.enName} · {profile.role[0]}</span>
              </div>
            </Reveal>

            <Reveal className="contact-card" delay={160}>
              <div className="card-title">
                CONTACT <em>·</em> 联系方式
              </div>
              <div className="contact-list">
                {contacts.map((c) => {
                  const Icon = contactIcons[c.key]
                  const inner = (
                    <>
                      <span className="ci-ico">
                        <Icon />
                      </span>
                      <span>
                        <span className="ci-label">{c.label}</span>
                        <span className="ci-value">{c.value}</span>
                      </span>
                    </>
                  )
                  return c.href ? (
                    <a key={c.key} className="contact-item" href={c.href}>
                      {inner}
                    </a>
                  ) : (
                    <div key={c.key} className="contact-item">
                      {inner}
                    </div>
                  )
                })}
              </div>
            </Reveal>
          </div>

          <div className="about-right">
            <Reveal className="about-intro" delay={120}>
              {profile.intro.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              <p className="about-highlight">
                “2 年实战 · 全流程创作 · AI 赋能 —— 让每一个镜头都兼具效率与质感。”
              </p>
            </Reveal>

            <Reveal className="stats-grid" delay={160}>
              {profile.stats.map((s, i) => (
                <div className="stat-cell" key={s.label}>
                  <span className="num">
                    {s.value}
                    <sup>{i === 0 ? 'YRS' : ''}</sup>
                  </span>
                  <span className="lab">{s.label}</span>
                </div>
              ))}
            </Reveal>

            <div>
              <Reveal className="label" delay={40} style={{ marginBottom: 6 }}>
                <em>EXPERIENCE</em> 工作经历
              </Reveal>
              <div className="timeline">
                {profile.experience.map((e, i) => (
                  <Reveal className="tl-item" key={e.org} delay={i * 90}>
                    <div className="tl-period">{e.period}</div>
                    <div className="tl-body">
                      <h3>{e.role}</h3>
                      <div className="tl-org">{e.org}</div>
                      <ul>
                        {e.points.map((pt) => (
                          <li key={pt}>{pt}</li>
                        ))}
                      </ul>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}