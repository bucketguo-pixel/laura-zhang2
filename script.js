
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
}, { threshold: 0.12 });
reveals.forEach(el => observer.observe(el));

function detectInitialLanguage(){
  const saved = localStorage.getItem('siteLanguage');
  if(saved === 'zh' || saved === 'en') return saved;
  const browser = (navigator.language || navigator.userLanguage || 'en').toLowerCase();
  return browser.startsWith('zh') ? 'zh' : 'en';
}
function applyLanguage(lang){
  document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
  document.querySelectorAll('[data-en][data-zh]').forEach(el => {
    el.textContent = el.getAttribute(lang === 'zh' ? 'data-zh' : 'data-en');
  });
  document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.toggle('active', btn.dataset.lang === lang));
  localStorage.setItem('siteLanguage', lang);
}
function initLanguage(){
  const lang = detectInitialLanguage();
  applyLanguage(lang);
  document.querySelectorAll('.lang-btn').forEach(btn => btn.addEventListener('click', () => applyLanguage(btn.dataset.lang)));
}
document.addEventListener('DOMContentLoaded', initLanguage);
