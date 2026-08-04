import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Play } from './icons.jsx'

/**
 * 视频扇形组件：
 * - 默认叠放，鼠标悬停区域时三张视频首页以扇形展开
 * - 悬停某张卡片时该卡片微微向外弹出并置顶
 * - 点击卡片在网页内弹窗播放视频（带控制条）
 */
export default function VideoFan({ videos }) {
  const [active, setActive] = useState(null)
  const videoRefs = useRef([])
  const modalVideoRef = useRef(null)

  const close = useCallback(() => {
    setActive(null)
    if (modalVideoRef.current) modalVideoRef.current.pause()
  }, [])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [close])

  // 弹窗打开时锁定背景滚动，并自动播放
  useEffect(() => {
    document.body.style.overflow = active ? 'hidden' : ''
    if (active && modalVideoRef.current) {
      modalVideoRef.current.play().catch(() => {})
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [active])

  // 显示第一帧
  const onMeta = (el) => {
    if (el.readyState >= 1) el.currentTime = 0.08
  }

  // 悬停预览：静音播放 / 离开暂停回到第一帧
  const hoverPlay = (i, on) => {
    const v = videoRefs.current[i]
    if (!v) return
    if (on) {
      v.play().catch(() => {})
    } else {
      v.pause()
      v.currentTime = 0.08
    }
  }

  return (
    <div className="videofan">
      <div className="videofan-stage">
        {videos.map((v, i) => (
          <button
            key={v.file}
            type="button"
            className="vf-card"
            onClick={() => setActive(v)}
            onMouseEnter={() => hoverPlay(i, true)}
            onMouseLeave={() => hoverPlay(i, false)}
            aria-label={`播放 ${v.title}`}
          >
            <video
              ref={(el) => (videoRefs.current[i] = el)}
              src={v.file}
              muted
              loop
              playsInline
              preload="metadata"
              onLoadedMetadata={(e) => onMeta(e.currentTarget)}
            />
            <span className="vf-shade" aria-hidden="true" />
            <span className="vf-play" aria-hidden="true">
              <Play width={18} height={18} />
            </span>
            <span className="vf-title">{v.title}</span>
            <span className="vf-index">0{i + 1}</span>
          </button>
        ))}
      </div>

      {active &&
        createPortal(
        <div
          className="vf-modal"
          role="dialog"
          aria-modal="true"
          aria-label={`播放 ${active.title}`}
          onClick={(e) => {
            if (e.target === e.currentTarget) close()
          }}
        >
          <button className="vf-modal-close" type="button" onClick={close} aria-label="关闭播放">
            ×
          </button>
          <div className="vf-modal-box">
            <video
              ref={modalVideoRef}
              src={active.file}
              controls
              autoPlay
              playsInline
            />
            <div className="vf-modal-title">
              {active.title}
              <span>{active.en}</span>
            </div>
          </div>
        </div>,
        document.body,
      )}
    </div>
  )
}