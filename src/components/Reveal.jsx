/**
 * Reveal：仅输出标记，动画由 Motion.jsx（GSAP + ScrollTrigger）统一驱动
 * - data-reveal        : 进入视口时遮罩 + 位移进场
 * - className          : 保留原有布局类名
 */
export default function Reveal({ children, delay = 0, as: Tag = 'div', className = '', ...rest }) {
  return (
    <Tag
      className={`reveal ${className}`}
      data-reveal
      style={{ '--rd': `${delay}ms`, ...rest.style }}
      {...rest}
    >
      {children}
    </Tag>
  )
}