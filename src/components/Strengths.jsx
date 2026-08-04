import { profile } from '../data/profile.js'
import Reveal from './Reveal.jsx'
import BorderGlow from './BorderGlow.jsx'
import { iconMap } from './icons.jsx'

export default function Strengths() {
  return (
    <section className="section strengths" id="strengths">
      <div className="container">
        <Reveal className="section-head">
          <div>
            <div className="label">
              <em>03</em> CAPABILITIES — 个人优势
            </div>
            <h2>
              四项核心能力
              <span className="thin">，覆盖创作全链路</span>
            </h2>
          </div>
          <span className="head-en">EDIT · GENERATE · DESIGN · DIRECT</span>
        </Reveal>

        <div className="strengths-grid">
          {profile.strengths.map((s, i) => {
            const Icon = iconMap[s.icon]
            return (
              <Reveal className="strength-card" key={s.key} delay={i * 80}>
                <BorderGlow
                  edgeSensitivity={30}
                  glowColor="165 90% 80%"
                  backgroundColor="#0b0b0d"
                  borderRadius={20}
                  glowRadius={36}
                  glowIntensity={1.0}
                  coneSpread={25}
                  animated={false}
                  colors={['#5eead4', '#a78bfa', '#38bdf8']}
                >
                  <div className="sc-top">
                    <span className="sc-ico">
                      <Icon />
                    </span>
                    <span className="sc-key">{s.key} / 04</span>
                  </div>
                  <h3>
                    {s.title}
                    <small>{s.en}</small>
                  </h3>
                  <p>{s.desc}</p>
                  <div className="sc-points">
                    {s.points.map((pt) => (
                      <span key={pt}>{pt}</span>
                    ))}
                  </div>
                </BorderGlow>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}