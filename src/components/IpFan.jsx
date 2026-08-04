import { useCallback, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { ipPrompts } from '../data/ipPrompts.js'
import { Play } from './icons.jsx'

/**
 * IP 图片分组组件：
 * - 三个前缀分组（1/2/3）各取首图组成扇形，悬停区域展开、悬停分组微微弹出
 * - 点击分组进入图集：一张一张浏览（左右箭头 + 缩略图 + 计数器）
 * - 每张图片右上角「提示词」按钮：点击后图片虚化，浮层展示该图的提示词
 * - 弹窗使用 Portal 挂载到 body，避免被滚动动画的层叠上下文遮挡
 */
export default function IpFan({ groups }) {
  const [active, setActive] = useState(null) // { group, index }
  const [showPrompt, setShowPrompt] = useState(false)

  const close = useCallback(() => {
    setActive(null)
    setShowPrompt(false)
  }, [])

  const next = useCallback(() => {
    setActive((a) => (a ? { ...a, index: (a.index + 1) % a.group.images.length } : a))
    setShowPrompt(false)
  }, [])

  const prev = useCallback(() => {
    setActive((a) =>
      a ? { ...a, index: (a.index - 1 + a.group.images.length) % a.group.images.length } : a,
    )
    setShowPrompt(false)
  }, [])

  useEffect(() => {
    const onKey = (e) => {
      if (!active) return
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [active, close, next, prev])

  // 弹窗打开时锁定背景滚动
  useEffect(() => {
    document.body.style.overflow = active ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [active])

  if (!groups || groups.length === 0) return null

  const current = active ? active.group.images[active.index] : null
  const prompt = current ? ipPrompts[current] || '' : ''

  return (
    <div className="videofan ipfan">
      <div className="videofan-stage">
        {groups.map((g, i) => (
          <button
            key={g.id}
            type="button"
            className="vf-card"
            onClick={() => {
              setActive({ group: g, index: 0 })
              setShowPrompt(false)
            }}
            aria-label={`查看 ${g.name}`}
          >
            <img src={`/ip/${g.images[0]}.jpg`} loading="lazy" alt={`${g.name} 首图`} />
            <span className="vf-shade" aria-hidden="true" />
            <span className="vf-play" aria-hidden="true">
              <Play width={18} height={18} />
            </span>
            <span className="vf-title">{g.name}</span>
            <span className="vf-index">{g.id}</span>
          </button>
        ))}
      </div>

      {active &&
        current &&
        createPortal(
          <div
            className="vf-modal"
            role="dialog"
            aria-modal="true"
            aria-label={`查看 ${active.group.name}`}
            onClick={(e) => {
              if (e.target === e.currentTarget) close()
            }}
          >
            <button className="vf-modal-close" type="button" onClick={close} aria-label="关闭">
              ×
            </button>
            <div className="ipg-box">
              <div className={`ipg-stage ${showPrompt ? 'show-prompt' : ''}`}>
                <img className="ipg-img" src={`/ip/${current}.jpg`} alt={`${active.group.name} ${current}`} />
                {showPrompt && (
                  <div className="ipg-prompt">
                    <div className="ipg-prompt-title">提示词 · {current}</div>
                    <p>{prompt}</p>
                  </div>
                )}
                <button
                  type="button"
                  className={`ipg-prompt-btn ${showPrompt ? 'on' : ''}`}
                  onClick={() => setShowPrompt((v) => !v)}
                >
                  {showPrompt ? '关闭提示' : '提示词'}
                </button>
                <span className="ipg-counter">
                  {active.index + 1} / {active.group.images.length}
                </span>
              </div>

              <div className="ipg-nav">
                <button type="button" className="ipg-arrow" onClick={prev} aria-label="上一张">
                  ‹
                </button>
                <div className="ipg-thumbs">
                  {active.group.images.map((key, i) => (
                    <button
                      key={key}
                      type="button"
                      className={`ipg-thumb ${i === active.index ? 'on' : ''}`}
                      onClick={() => {
                        setActive((a) => ({ ...a, index: i }))
                        setShowPrompt(false)
                      }}
                      aria-label={`第 ${i + 1} 张`}
                    >
                      <img src={`/ip/${key}.jpg`} alt="" />
                    </button>
                  ))}
                </div>
                <button type="button" className="ipg-arrow" onClick={next} aria-label="下一张">
                  ›
                </button>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </div>
  )
}