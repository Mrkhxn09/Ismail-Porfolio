/**
 * Reel & Motion Video Player Module
 * Structured around 5 distinct creative video disciplines.
 * Easily replace video URLs, posters, titles, and descriptions below.
 */

const REEL_DATA = [
  {
    id: 'social-reel',
    category: '01 — SOCIAL MEDIA REEL',
    title: 'Short-Form Campaign Edit',
    duration: '00:15',
    description: 'Dynamic vertical & feed pacing, kinetic captions, rhythm-synced transitions, and hook-driven storytelling built for modern social feeds.',
    videoSrc: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    poster: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1200&auto=format&fit=crop&q=80',
    tags: ['Short-Form', 'Kinetic Typography', 'Beat Sync']
  },
  {
    id: 'product-brand',
    category: '02 — PRODUCT / BRAND VIDEO',
    title: 'Commercial Product Showcase',
    duration: '00:15',
    description: 'Commercial video edit focusing on visual hierarchy, product interaction highlights, and brand consistency across launch touchpoints.',
    videoSrc: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    poster: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&auto=format&fit=crop&q=80',
    tags: ['Product Showcase', 'Brand Commercial', 'Pacing']
  },
  {
    id: 'motion-design',
    category: '03 — MOTION DESIGN',
    title: 'UI Motion & Kinetic Systems',
    duration: '00:15',
    description: 'Motion design study combining vector micro-interactions, seamless camera pans, UI choreography, and kinetic typography.',
    videoSrc: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
    poster: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80',
    tags: ['Motion Graphics', 'UI Choreography', 'Visual FX']
  },
  {
    id: 'cinematic-edit',
    category: '04 — CINEMATIC EDIT',
    title: 'Atmospheric Visual Narrative',
    duration: '00:15',
    description: 'Narrative storytelling with deliberate pacing, tailored film color grade, sound design layering, and emotional tone.',
    videoSrc: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    poster: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1200&auto=format&fit=crop&q=80',
    tags: ['Color Grading', 'Sound Design', 'Narrative Edit']
  },
  {
    id: 'campaign-reel',
    category: '05 — CLIENT / CAMPAIGN REEL',
    title: 'Brand Anthem & Multi-Platform Drop',
    duration: '01:00',
    description: 'Comprehensive campaign edit demonstrating high-conversion social cuts, hero anthem sequence, and multi-aspect deliverables.',
    videoSrc: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    poster: 'https://images.unsplash.com/photo-1518173946687-a4c8a383392e?w=1200&auto=format&fit=crop&q=80',
    tags: ['Campaign Drop', 'Multi-Aspect', 'Sound Mix']
  }
];

(function initReelPlayer() {
  const theater = document.getElementById('reelTheater');
  const video = document.getElementById('mainReelVideo');
  if (!theater || !video) return;

  const bigPlay = document.getElementById('reelBigPlay');
  const playBtn = document.getElementById('reelPlayBtn');
  const playIcon = document.getElementById('reelPlayIcon');
  const muteBtn = document.getElementById('reelMuteBtn');
  const muteIcon = document.getElementById('reelMuteIcon');
  const fullscreenBtn = document.getElementById('reelFullscreenBtn');
  const timecode = document.getElementById('reelTimecode');
  const scrubber = document.getElementById('reelScrubber');
  const scrubberFill = document.getElementById('reelScrubberFill');
  const scrubberHandle = document.getElementById('reelScrubberHandle');

  // Metadata elements
  const activeCategory = document.getElementById('reelActiveCategory');
  const activeTitle = document.getElementById('reelActiveTitle');
  const activeDuration = document.getElementById('reelActiveDuration');
  const activeDesc = document.getElementById('reelActiveDesc');
  const activeTags = document.getElementById('reelActiveTags');
  const playlistItems = Array.from(document.querySelectorAll('.playlist-item'));

  let currentIndex = 0;
  let isSeeking = false;

  function formatTime(seconds) {
    if (isNaN(seconds) || seconds < 0) return '00:00';
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }

  function updatePlayIcon(isPlaying) {
    if (!playIcon) return;
    if (isPlaying) {
      playIcon.innerHTML = '<rect x="6" y="4" width="4" height="16" fill="currentColor"/><rect x="14" y="4" width="4" height="16" fill="currentColor"/>';
      theater.classList.add('is-playing');
    } else {
      playIcon.innerHTML = '<polygon points="8,5 19,12 8,19" fill="currentColor"/>';
      theater.classList.remove('is-playing');
    }
  }

  function updateMuteIcon(isMuted) {
    if (!muteIcon) return;
    if (isMuted) {
      muteIcon.innerHTML = '<path d="M11 5L6 9H2v6h4l5 4V5z" stroke="currentColor" fill="none" stroke-width="2"/><line x1="23" y1="9" x2="17" y2="15" stroke="currentColor" stroke-width="2"/><line x1="17" y1="9" x2="23" y2="15" stroke="currentColor" stroke-width="2"/>';
    } else {
      muteIcon.innerHTML = '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" stroke="currentColor" fill="none" stroke-width="2"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07" stroke="currentColor" fill="none" stroke-width="2"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14" stroke="currentColor" fill="none" stroke-width="2"/>';
    }
  }

  function togglePlay() {
    if (video.paused || video.ended) {
      video.play().then(() => updatePlayIcon(true)).catch(() => {});
    } else {
      video.pause();
      updatePlayIcon(false);
    }
  }

  function toggleMute() {
    video.muted = !video.muted;
    updateMuteIcon(video.muted);
  }

  function loadReel(index, autoPlay = true) {
    if (index < 0 || index >= REEL_DATA.length) return;
    currentIndex = index;
    const data = REEL_DATA[index];

    // Update active playlist item
    playlistItems.forEach((item, i) => {
      if (i === index) {
        item.classList.add('is-active');
        item.setAttribute('aria-selected', 'true');
      } else {
        item.classList.remove('is-active');
        item.setAttribute('aria-selected', 'false');
      }
    });

    // Update info labels
    if (activeCategory) activeCategory.textContent = data.category;
    if (activeTitle) activeTitle.textContent = data.title;
    if (activeDuration) activeDuration.textContent = data.duration;
    if (activeDesc) activeDesc.textContent = data.description;
    if (activeTags) {
      activeTags.innerHTML = data.tags.map((t) => `<span>${t}</span>`).join('');
    }

    // Switch video source & poster
    video.poster = data.poster;
    video.src = data.videoSrc;
    video.load();

    if (scrubberFill) scrubberFill.style.width = '0%';
    if (scrubberHandle) scrubberHandle.style.left = '0%';
    if (timecode) timecode.textContent = `00:00 / ${data.duration}`;

    if (autoPlay) {
      video.play().then(() => updatePlayIcon(true)).catch(() => updatePlayIcon(false));
    } else {
      updatePlayIcon(false);
    }
  }

  // Event Listeners
  if (playBtn) playBtn.addEventListener('click', togglePlay);
  if (bigPlay) bigPlay.addEventListener('click', togglePlay);
  if (muteBtn) muteBtn.addEventListener('click', toggleMute);

  if (fullscreenBtn) {
    fullscreenBtn.addEventListener('click', () => {
      if (!document.fullscreenElement) {
        theater.requestFullscreen().catch(() => {});
      } else {
        document.exitFullscreen().catch(() => {});
      }
    });
  }

  video.addEventListener('click', togglePlay);
  video.addEventListener('play', () => updatePlayIcon(true));
  video.addEventListener('pause', () => updatePlayIcon(false));
  video.addEventListener('ended', () => {
    updatePlayIcon(false);
    // Auto advance to next reel
    const nextIdx = (currentIndex + 1) % REEL_DATA.length;
    loadReel(nextIdx, true);
  });

  video.addEventListener('timeupdate', () => {
    if (isSeeking || !video.duration) return;
    const progress = (video.currentTime / video.duration) * 100;
    if (scrubberFill) scrubberFill.style.width = `${progress}%`;
    if (scrubberHandle) scrubberHandle.style.left = `${progress}%`;
    if (timecode) {
      timecode.textContent = `${formatTime(video.currentTime)} / ${formatTime(video.duration)}`;
    }
  });

  function seekFromEvent(e) {
    if (!scrubber || !video.duration) return;
    const rect = scrubber.getBoundingClientRect();
    const pos = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
    video.currentTime = pos * video.duration;
    if (scrubberFill) scrubberFill.style.width = `${pos * 100}%`;
    if (scrubberHandle) scrubberHandle.style.left = `${pos * 100}%`;
  }

  if (scrubber) {
    scrubber.addEventListener('mousedown', (e) => {
      isSeeking = true;
      seekFromEvent(e);
      const onMouseMove = (moveEvent) => seekFromEvent(moveEvent);
      const onMouseUp = () => {
        isSeeking = false;
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
      };
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
    });
  }

  // Playlist switching
  playlistItems.forEach((item, index) => {
    item.addEventListener('click', () => loadReel(index, true));
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        loadReel(index, true);
      }
    });
  });

  // Pause video if scrolled out of view
  if ('IntersectionObserver' in window) {
    new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting && !video.paused) {
        video.pause();
        updatePlayIcon(false);
      }
    }, { threshold: 0.2 }).observe(theater);
  }
})();
