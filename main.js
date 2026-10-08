// Crimate project page: the language switch, the header's edge, and the demo video.

const TITLES = {
  en: 'Crimate — explainer slides and timeline animation',
  ko: 'Crimate — 설명 슬라이드와 타임라인 애니메이션'
};
const DESCRIPTIONS = {
  en: 'Crimate is a desktop editor for explainer slides and 2D timeline animation, saved as plain .crim text that people and AI agents can read and edit.',
  ko: 'Crimate는 설명 슬라이드와 2D 타임라인 애니메이션을 함께 만드는 데스크톱 편집기입니다. 덱은 사람과 AI 에이전트가 함께 읽고 고치는 .crim 텍스트로 저장됩니다.'
};
const VIDEO_LABELS = {
  en: { pause: 'Pause', play: 'Play' },
  ko: { pause: '일시정지', play: '재생' }
};

const root = document.documentElement;
const currentLang = () => (root.lang === 'ko' ? 'ko' : 'en');

const applyLang = (lang) => {
  root.lang = lang;
  document.title = TITLES[lang];
  document.querySelector('meta[name="description"]')?.setAttribute('content', DESCRIPTIONS[lang]);
  document.querySelectorAll('[data-set-lang]').forEach((button) => {
    button.setAttribute('aria-pressed', String(button.dataset.setLang === lang));
  });
  updateVideoToggle();
};

document.querySelectorAll('[data-set-lang]').forEach((button) => {
  button.addEventListener('click', () => {
    const lang = button.dataset.setLang === 'ko' ? 'ko' : 'en';
    try {
      localStorage.setItem('crimate.site.lang', lang);
    } catch (error) {
      // Private windows may refuse storage; the choice then lasts this visit.
    }
    applyLang(lang);
  });
});

// The header shows its bottom edge once the page scrolls under it.
const header = document.querySelector('.site-header');
const updateHeader = () => header?.classList.toggle('is-scrolled', window.scrollY > 8);
window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

// The demo plays while it is on screen, unless the visitor paused it or asks for
// reduced motion; the button always pauses and plays it.
const video = document.getElementById('demo-video');
const toggle = document.querySelector('[data-video-toggle]');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let pausedByVisitor = reducedMotion.matches;
let onScreen = false;

function updateVideoToggle() {
  if (!video || !toggle) {
    return;
  }
  const paused = video.paused;
  const labels = VIDEO_LABELS[currentLang()];
  toggle.classList.toggle('is-paused', paused);
  toggle.querySelector('.video-toggle-label').textContent = paused ? labels.play : labels.pause;
  toggle.setAttribute('aria-label', paused ? labels.play : labels.pause);
}

const syncVideo = () => {
  if (!video) {
    return;
  }
  if (onScreen && !pausedByVisitor) {
    video.play().catch(() => updateVideoToggle());
  } else {
    video.pause();
  }
};

if (video && toggle) {
  video.addEventListener('play', updateVideoToggle);
  video.addEventListener('pause', updateVideoToggle);
  toggle.addEventListener('click', () => {
    pausedByVisitor = !video.paused;
    if (pausedByVisitor) {
      video.pause();
    } else {
      video.play().catch(() => updateVideoToggle());
    }
  });
  if ('IntersectionObserver' in window) {
    new IntersectionObserver((entries) => {
      onScreen = entries.some((entry) => entry.isIntersecting);
      syncVideo();
    }, { threshold: 0.35 }).observe(video);
  } else {
    onScreen = true;
    syncVideo();
  }
}

applyLang(currentLang());
