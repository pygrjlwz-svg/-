/**
 * 媒体资源基地址配置（国内对象存储/CDN 接入点）
 * - MEDIA_BASE 留空：使用本站同域资源（Cloudflare Pages）
 * - 配置为国内 CDN 域名（如 https://cdn.example.com/portfolio）后，
 *   全站视频/图片自动从国内 CDN 加载，大陆访问速度大幅提升
 */
export const MEDIA_BASE = 'https://cdn.jsdelivr.net/gh/pygrjlwz-svg/-@master/public'

/** 生成媒体完整 URL */
export const mediaUrl = (path) => (MEDIA_BASE ? `${MEDIA_BASE}${path}` : path)