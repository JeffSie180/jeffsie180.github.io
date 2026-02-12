/* ============================================
   Custom JS - Scroll Animations
   使用 IntersectionObserver 實現滾動淡入效果
   效能影響極低，不在主線程阻塞
   ============================================ */

function initScrollAnimations() {
  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08 }
  );

  // 首頁文章卡片
  document.querySelectorAll('#recent-posts .recent-post-item').forEach(function (el) {
    el.classList.add('scroll-animate');
    observer.observe(el);
  });

  // 文章頁面內容區塊
  document.querySelectorAll('#post .post-content h2, #post .post-content h3').forEach(function (el) {
    el.classList.add('scroll-animate');
    observer.observe(el);
  });
}

// 初始化：DOMContentLoaded 觸發
document.addEventListener('DOMContentLoaded', initScrollAnimations);

// Pjax 支援：頁面切換後重新初始化動畫
document.addEventListener('pjax:complete', initScrollAnimations);
