// 统一的内联 SVG 图标（描边风格，与整体克制调性一致）

const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  viewBox: '0 0 24 24',
  'aria-hidden': true,
}

export const ArrowRight = (p) => (
  <svg {...base} {...p}>
    <path d="M4 12h15" />
    <path d="M13 6l6 6-6 6" />
  </svg>
)

export const ArrowUpRight = (p) => (
  <svg {...base} {...p}>
    <path d="M7 17L17 7" />
    <path d="M8 7h9v9" />
  </svg>
)

export const Mail = (p) => (
  <svg {...base} {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3.5 6.5L12 13l8.5-6.5" />
  </svg>
)

export const Phone = (p) => (
  <svg {...base} {...p}>
    <path d="M5 4h4l2 5-2.5 1.5a12 12 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
  </svg>
)

export const Chat = (p) => (
  <svg {...base} {...p}>
    <path d="M21 12a8 8 0 0 1-8 8H4l2.5-2.5A8 8 0 1 1 21 12z" />
    <path d="M8.5 10.5h7M8.5 13.5h4" />
  </svg>
)

export const Pin = (p) => (
  <svg {...base} {...p}>
    <path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
)

export const Edit = (p) => (
  <svg {...base} {...p}>
    <path d="M14 4l6 6L8 22H2v-6L14 4z" />
    <path d="M11 7l6 6" />
  </svg>
)

export const Spark = (p) => (
  <svg {...base} {...p}>
    <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3z" />
    <path d="M19 15l.9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9L19 15z" />
  </svg>
)

export const Pen = (p) => (
  <svg {...base} {...p}>
    <path d="M4 20l4-1L20 7l-3-3L5 16l-1 4z" />
    <path d="M14 6l4 4" />
  </svg>
)

export const Director = (p) => (
  <svg {...base} {...p}>
    <path d="M2 7l6 5-6 5V7z" />
    <path d="M9 12h11" />
    <path d="M15 8l5 4-5 4V8z" />
  </svg>
)

export const Play = (p) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M10 8.5v7l6-3.5-6-3.5z" fill="currentColor" stroke="none" />
  </svg>
)


export const WeChat = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 0 1 .598.082l1.584.926a.272.272 0 0 0 .14.047c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 0 1-.023-.156.49.49 0 0 1 .201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-6.656-6.088V8.89c-.135-.01-.27-.027-.407-.03zm-2.53 3.274c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.97-.982zm4.844 0c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.969-.982z" />
  </svg>
)


export const QqMail = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden {...p}>
    <rect x="2.5" y="4" width="19" height="16" rx="3" />
    <path d="M3.8 7.2 12 13.2l8.2-6" />
    <path d="M3.5 16.5 8.6 13" />
    <path d="M20.5 16.5 15.4 13" />
    <circle cx="9.6" cy="8.4" r="1" fill="currentColor" stroke="none" />
    <circle cx="14.4" cy="8.4" r="1" fill="currentColor" stroke="none" />
    <path d="M10.3 10.3c.8.7 2.6.7 3.4 0" strokeWidth={1.4} />
  </svg>
)

export const iconMap = {
  edit: Edit,
  spark: Spark,
  pen: Pen,
  director: Director,
}