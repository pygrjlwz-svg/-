// ============================================================
// 个人资料数据 —— 所有文案集中在这里，方便后续修改
// 联系方式中的邮箱 / 电话 / 微信均为占位符，请替换为真实信息
// ============================================================

export const profile = {
  name: '彭宇',
  enName: 'PENG YU',
  initials: 'PY',
  role: ['AIGC 影视动画师', 'AI 导演', '视频剪辑师'],
  tagline: '用 AI 重构影视动画的创作边界',
  location: '云南 · 昆明',
  email: '3154133025@qq.com',
  phone: '19169386627',
  wechat: 'py15391404045',
  available: '求职中 · 可立即到岗',
  education: '昆明传媒学院 · 动画（本科在读）',
  graduation: '2023.09 – 2027.06',

  // 个人介绍（来自简历）
  intro: [
    '我是一名拥有 2 年 AIGC 影视动画与短视频实战经验的创作者，兼具传统动画功底与 AI 智能创作能力。从脚本可视化、画面生成到剪辑包装、成片输出，我习惯以“AI 导演”的视角独立完成全流程创作。',
    '先后在云南广播电视幻维数码影视有限公司担任影视 AIGC 创作专员，在昆明传媒学院担任 AIGC 视觉项目负责人与团队组长。熟悉商业项目、官方宣传与赛事作品的创作标准，擅长以 AI 技术赋能创作效率与视觉质感。',
  ],

  // 项目数据（部分为占位估算，可随时替换）
  stats: [
    { value: '2+', label: '年 AIGC 影视实战经验' },
    { value: '30+', label: '短视频 / 宣传片作品' },
    { value: '3', label: '大核心创作方向' },
    { value: '5+', label: '赛事项目带队攻坚' },
  ],

  // 工作经历
  experience: [
    {
      period: '2025.09 – 2026.09',
      org: '昆明传媒学院',
      role: 'AIGC 视觉项目负责人 / 团队组长',
      points: [
        '统筹团队赛事项目创作：人员分工、方案策划、流程把控与作品质量审核',
        '常态化产出校园官方宣传视频、活动纪实与学科竞赛参赛视频',
      ],
    },
    {
      period: '2024.04 – 2025.09',
      org: '云南广播电视幻维数码影视有限公司',
      role: '影视 AIGC 创作专员',
      points: [
        '独立完成短视频、微漫剧的脚本可视化、画面生成、剪辑包装与成片输出',
        '负责文体赛事、商业活动的预告与宣传成片，定制视觉风格',
        '承担项目吉祥物视觉 IP 设计：形象构思、草图绘制、动态优化全流程',
      ],
    },
  ],

  // 精选项目
  projects: [
    {
      index: '01',
      title: '微漫剧 · 可视化创作',
      en: 'AI Micro-Series',
      category: 'AI 动画 · 内容孵化',
      year: '2024 – 2025',
      cover: '/covers/cover-02.svg',
      videos: [
        { title: '留守儿童', en: 'Left Behind', file: '/videos/left-behind.mp4' },
        { title: '马上出发', en: 'Set Off', file: '/videos/set-off.mp4' },
        { title: '自闭症', en: 'Autism', file: '/videos/autism-7.mp4' },
      ],
      desc: '依托 AIGC 技术体系完成微漫剧的脚本可视化与画面生成，衔接传统动画与 AI 智能创作流程，实现高效量产与稳定高质量输出。',
      tags: ['AI 动画', '分镜', '角色一致性', '动态效果'],
    },
    {
      index: '02',
      title: '角色视觉 IP 设计',
      en: 'Character Visual IP Design',
      category: '视觉设计 · IP 打造',
      year: '2024 – 2025',
      cover: '/covers/cover-03.svg',
      ipGroups: [
        { id: '1', name: '机甲 · 科幻', en: 'Mecha Series', images: ['1-1', '1-2', '1-3', '1-4', '1-5'] },
        { id: '2', name: '人物 · 时装', en: 'Character Series', images: ['2-1', '2-2', '2-3', '2-4', '2-5'] },
        { id: '3', name: '异兽 · 奇幻', en: 'Beast Series', images: ['3-1', '3-2', '3-3', '3-4', '3-5'] },
      ],
      desc: '结合品牌与活动内核完成吉祥物形象构思、草图绘制与动态优化，打造适配宣传场景的专属视觉 IP，并完成海报等静态视觉与动态转化。',
      tags: ['IP 设计', '海报视觉', '动态视觉', '品牌延展'],
    },
    {
      index: '03',
      title: '校园官方宣传片',
      en: 'Campus Official Films',
      category: '官方宣传 · 纪实',
      year: '2025 – 2026',
      cover: '/covers/cover-04.svg',
      videos: [
        { title: '招生短片', en: 'Recruit Short', file: '/videos/recruit-6.mp4' },
        { title: '为爱落下', en: 'Fall For Love', file: '/videos/fall-for-love.mp4' },
        { title: '宣传片', en: 'Promo Film', file: '/videos/promo-6.mp4' },
      ],
      desc: '常态化运用 AI 动画与智能剪辑技术，产出校园官方宣传视频、活动纪实与学科竞赛参赛视频，适配官方宣传与赛事报送场景。',
      tags: ['AI 动画', '活动纪实', '赛事报送', '剪辑'],
    },
  ],

  // 个人优势 / 核心能力
  strengths: [
    {
      key: '01',
      icon: 'edit',
      title: '视频剪辑',
      en: 'Video Editing',
      desc: '精通短视频、宣传片、赛事成片全流程剪辑，擅长镜头调色、节奏把控、字幕包装与特效合成，适配各类新媒体及官方宣传视频风格。',
      points: ['全流程剪辑', '调色 · 节奏', '特效合成'],
    },
    {
      key: '02',
      icon: 'spark',
      title: 'AI 动画创作',
      en: 'AI Animation',
      desc: '精通 AIGC 人工智能动画制作技术，熟练运用各类 AI 工具完成画面生成、动态效果与漫剧可视化创作，衔接传统动画与 AI 流程。',
      points: ['AIGC 工作流', '漫剧可视化', '动态效果'],
    },
    {
      key: '03',
      icon: 'pen',
      title: '视觉设计',
      en: 'Visual Design',
      desc: '擅长动画海报与 IP 吉祥物视觉设计，具备良好的审美与视觉构思能力，可独立完成静态视觉设计与动态视觉转化。',
      points: ['海报视觉', 'IP 吉祥物', '静转动'],
    },
    {
      key: '04',
      icon: 'director',
      title: 'AI 导演与统筹',
      en: 'Directing & Lead',
      desc: '具备 AI 导演思维，擅长脚本可视化与整体风格把控；拥有团队管理、项目分工与赛事攻坚经验，执行力与统筹协调能力突出。',
      points: ['脚本可视化', '风格把控', '团队带队'],
    },
  ],

}

export const navLinks = [
  { id: 'hero', label: '首页', en: 'Home' },
  { id: 'about', label: '关于', en: 'About' },
  { id: 'projects', label: '项目', en: 'Projects' },
  { id: 'strengths', label: '优势', en: 'Capabilities' },
  { id: 'contact', label: '联系', en: 'Contact' },
]