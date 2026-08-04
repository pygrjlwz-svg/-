import { profile } from '../data/profile.js'
import Reveal from './Reveal.jsx'
import VideoFan from './VideoFan.jsx'
import IpFan from './IpFan.jsx'
import { ArrowUpRight } from './icons.jsx'

export default function Projects() {
  const total = profile.projects.length
  return (
    <section className="section projects" id="projects">
      <div className="container">
        <Reveal className="section-head">
          <div>
            <div className="label">
              <em>02</em> SELECTED WORKS — 精选项目
            </div>
            <h2>
              代表作品
              <span className="thin"> / 全流程创作</span>
            </h2>
          </div>
          <span className="head-en">AI ANIMATION · IP DESIGN · CAMPUS FILMS</span>
        </Reveal>

        <div className="project-list">
          {profile.projects.map((p, i) => (
            <Reveal
              className={`project-card ${i % 2 === 1 ? 'flip' : ''}`}
              key={p.title}
              delay={i % 2 === 0 ? 0 : 60}
            >
              {p.ipGroups ? (
                <div className="project-visual project-visual-video">
                  <span className="project-index">{p.index} / {total}</span>
                  <IpFan groups={p.ipGroups} />
                </div>
              ) : p.videos ? (
                <div className="project-visual project-visual-video">
                  <span className="project-index">{p.index} / {total}</span>
                  <VideoFan videos={p.videos} />
                </div>
              ) : (
                <a
                  className="project-visual"
                  href="#contact"
                  aria-label={`${p.title} —— 联系获取完整案例`}
                >
                  <span className="project-index">{p.index} / {total}</span>
                  <img className="pv-img" src={p.cover} alt={p.title} loading="lazy" />
                </a>
              )}
              <div className="project-info">
                <div className="project-meta">
                  <span className="cat">{p.category}</span>
                  <span className="sep" />
                  <span>{p.year}</span>
                </div>
                <h3>
                  {p.title}
                  <span className="en">{p.en}</span>
                </h3>
                <p>{p.desc}</p>
                <div className="project-tags">
                  {p.tags.map((t) => (
                    <span className="tag" key={t}>
                      {t}
                    </span>
                  ))}
                </div>
                <a className="project-link" href="#contact">
                  获取完整案例
                  <ArrowUpRight width={14} height={14} />
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}