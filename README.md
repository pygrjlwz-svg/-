# 彭宇 · AIGC 影视动画个人作品集

基于 **React + Vite** 从零搭建的个人作品集网站（暗色 · 高级 · 克制 · 科技感）。

## 运行

```bash
pnpm install     # 或 npm install
pnpm dev         # 启动开发服务器 http://localhost:5173
pnpm build       # 生产构建（输出到 dist/）
pnpm preview     # 本地预览生产构建
```

## 目录结构

```
├─ public/
│  ├─ avatar.svg          # 头像占位图（后续替换为真实照片，同名即可）
│  ├─ favicon.svg
│  ├─ covers/             # 作品封面占位图（后续替换为真实作品截图/视频封面）
│  └─ media/              # 把 hero.mp4 放进来即可启用 Hero 视频背景
├─ src/
│  ├─ data/profile.js     # ★ 所有文案/联系方式/项目/优势数据都在这里改
│  ├─ components/         # Nav / Hero / About / Projects / Strengths / Contact
│  └─ styles/app.css      # 设计系统与全部样式
```

## 需要替换的占位内容

| 位置 | 说明 |
| --- | --- |
| `src/data/profile.js` | 邮箱 `3154133025@qq.com`、电话 `19169386627`、微信 `py15391404045` 已填写；社交账号仍为占位，请替换 |
| `src/data/profile.js` | 项目数据中的 `30+`、`5+` 等统计为估算占位，可随时调整 |
| `public/avatar.svg` | 个人头像占位，替换为真实照片 |
| `public/covers/*.svg` | 作品封面占位，替换为真实作品截图 |
| `public/media/hero.mp4` | 放入视频后 Hero 自动启用视频背景（未放置时使用 Canvas 粒子动画回退） |

## 设计说明

- 版心 1700px，适配 PC
- 色板：近黑 `#070708` + 柔和米白文字 + 单一信号青 `#5eead4` 点缀
- 交互：滚动渐显、滚动侦测导航高亮、Hero Canvas 粒子鼠标引力、跑马灯、卡片悬停微动效
- 联系方式已按本人信息填写：邮箱 3154133025@qq.com / 电话 19169386627 / 微信 py15391404045