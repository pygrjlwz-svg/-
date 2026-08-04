const items = [
  'AIGC 影视动画',
  '短视频创作',
  'AI 导演',
  '视觉 IP 设计',
  '微漫剧可视化',
  '赛事宣发',
  '动画海报',
  '智能剪辑',
]

export default function Marquee() {
  const row = [...items, ...items]
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {row.map((item, i) => (
          <span className="marquee-item" key={i}>
            {item}
            <span className="star">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}