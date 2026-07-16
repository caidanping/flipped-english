// Service Worker — 怦然心动字幕学习
// 关键设计：本 SW 故意【不监听 fetch 事件】，绝不拦截任何网络请求
// （包括跨域的 AI 代理请求），避免破坏浏览器原生 CORS 上下文导致 "Failed to fetch"。
// 仅用于 PWA 安装能力 + 旧缓存清理。
const CACHE_NAME = 'flipped-v13';

self.addEventListener('install', e => {
  // 立即激活，不用等旧页面关闭
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// ⚠️ 故意不写 fetch 监听器：
// 所有请求（含跨域代理 POST）都走浏览器原生处理，SW 不碰、不转发、不缓存。
