import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Play } from './icons.jsx'
import { mediaUrl } from '../data/media.js'

/**
 * 视频扇形组件（性能优化版）：
 * - 视频 preload="none"，滚近视口 1000px 内才加载元数据（首帧）
 * - 悬停仅弹出/展开，不自动播放（避免一悬停就下载全片）
 * - 点击卡片在网页内弹窗播放视频（带控制条）
 */
export default function VideoFan({ videos }) {
  const [active, setActive] = useState(null)
  const stageRef = useRef(null)
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

  // 懒加载：扇形滚近视口后才请求视频元数据（首帧）
  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return
    let loaded = false
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !loaded) {
            loaded = true
            videoRefs.current.forEach((v) => {
              if (v) {
                v.preload = 'metadata'
                v.load()
              }
            })
            io.disconnect()
          }
        })
      },
      { rootMargin: '1000px 0px' },
    )
    io.observe(stage)
    return () => io.disconnect()
  }, [])

  // 显示第一帧
  const onMeta = (el) => {
    if (el.readyState >= 1) el.currentTime = 0.08
  }

  return (
    <div className="videofan">
      <div className="videofan-stage" ref={stageRef}>
        {videos.map((v, i) => (
          <button
            key={v.file}
            type="button"
            className="vf-card"
            onClick={() => setActive(v)}
            aria-label={`播放 ${v.title}`}
          >
            <video
              ref={(el) => (videoRefs.current[i] = el)}
              src={mediaUrl(v.file)}
              muted
              loop
              playsInline
              preload="none"
              onLoadedMetadata={(e) => onMeta(e.currentTarget)}
            />
            <span className="vf-shade" aria-hidden="true" />
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
              <video ref={modalVideoRef} src={mediaUrl(active.file)} controls autoPlay playsInline />
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