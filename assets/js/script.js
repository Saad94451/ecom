(function () {
  'use strict';

  function onReady(fn) {
    if (document.readyState !== 'loading') {
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  }

  onReady(function () {
    /* ---------- Mobile nav drawer ---------- */
    var drawer = document.getElementById('navDrawer');
    var overlay = document.getElementById('navDrawerOverlay');
    var openBtn = document.getElementById('menuToggle');
    var closeBtn = document.getElementById('navDrawerClose');

    function openDrawer() {
      if (!drawer) return;
      drawer.classList.add('open');
      if (overlay) overlay.classList.add('open');
      drawer.setAttribute('aria-hidden', 'false');
      document.body.classList.add('nav-open');
    }

    function closeDrawer() {
      if (!drawer) return;
      drawer.classList.remove('open');
      if (overlay) overlay.classList.remove('open');
      drawer.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('nav-open');
    }

    if (openBtn) {
      openBtn.addEventListener('click', openDrawer);
      openBtn.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openDrawer();
        }
      });
    }
    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
    if (overlay) overlay.addEventListener('click', closeDrawer);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeDrawer();
    });

    /* ---------- Flash deals countdown (rolling 7 days) ---------- */
    var timer = document.getElementById('countdown-timer');
    if (timer) {
      var pad = function (n) { return n < 10 ? '0' + n : '' + n; };
      var endTime = Date.now() + 7 * 24 * 60 * 60 * 1000;

      var tick = function () {
        var diff = Math.max(0, endTime - Date.now());
        var totalSeconds = Math.floor(diff / 1000);
        var days = Math.floor(totalSeconds / 86400);
        var hours = Math.floor((totalSeconds % 86400) / 3600);
        var minutes = Math.floor((totalSeconds % 3600) / 60);
        var seconds = totalSeconds % 60;
        timer.textContent = pad(days) + ':' + pad(hours) + ':' + pad(minutes) + ':' + pad(seconds);
      };

      tick();
      setInterval(tick, 1000);
    }

    /* ---------- Hero carousel (arrows + dots + autoplay) ---------- */
    var heroSlides = document.querySelectorAll('.hero .hero-slide');
    if (heroSlides.length > 1) {
      var heroDots = document.querySelectorAll('.hero-dots button');
      var heroPrev = document.querySelector('.hero-arrow.left');
      var heroNext = document.querySelector('.hero-arrow.right');
      var heroPanel = document.querySelector('.hero');
      var heroIndex = 0;
      var heroTimer = null;
      var HERO_DELAY = 5000;

      var showHeroSlide = function (index) {
        heroIndex = (index + heroSlides.length) % heroSlides.length;
        for (var s = 0; s < heroSlides.length; s++) {
          heroSlides[s].classList.toggle('active', s === heroIndex);
        }
        for (var d = 0; d < heroDots.length; d++) {
          heroDots[d].classList.toggle('active', d === heroIndex);
        }
      };

      var stopHeroAuto = function () {
        if (heroTimer) {
          clearInterval(heroTimer);
          heroTimer = null;
        }
      };

      var startHeroAuto = function () {
        stopHeroAuto();
        heroTimer = setInterval(function () {
          showHeroSlide(heroIndex + 1);
        }, HERO_DELAY);
      };

      var goHeroSlide = function (index) {
        showHeroSlide(index);
        startHeroAuto();
      };

      if (heroPrev) heroPrev.addEventListener('click', function () { goHeroSlide(heroIndex - 1); });
      if (heroNext) heroNext.addEventListener('click', function () { goHeroSlide(heroIndex + 1); });

      for (var h = 0; h < heroDots.length; h++) {
        (function (dotIndex) {
          heroDots[dotIndex].addEventListener('click', function () { goHeroSlide(dotIndex); });
        })(h);
      }

      if (heroPanel) {
        heroPanel.addEventListener('mouseenter', stopHeroAuto);
        heroPanel.addEventListener('mouseleave', startHeroAuto);
      }

      startHeroAuto();
    }

    /* ---------- Floating scroll-to-top ---------- */
    var scrollTopBtn = document.createElement('button');
    scrollTopBtn.className = 'scroll-top-btn';
    scrollTopBtn.type = 'button';
    scrollTopBtn.setAttribute('aria-label', 'Back to top');
    scrollTopBtn.innerHTML = '<i class="fa-solid fa-arrow-up" aria-hidden="true"></i>';
    document.body.appendChild(scrollTopBtn);
    var syncScrollBtn = function () {
      var y = window.pageYOffset || document.documentElement.scrollTop || 0;
      scrollTopBtn.classList.toggle('visible', y > 400);
    };
    window.addEventListener('scroll', syncScrollBtn, { passive: true });
    syncScrollBtn();
    scrollTopBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    /* ---------- Search form (no backend yet) ---------- */
    var searchForms = document.querySelectorAll('.search-bar');
    for (var i = 0; i < searchForms.length; i++) {
      searchForms[i].addEventListener('submit', function (e) {
        e.preventDefault();
      });
    }
  });
})();
