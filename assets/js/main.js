/* United Combat Association — site scripts */
(function () {
  'use strict';

  /* ---------- header ---------- */
  var hdr = document.querySelector('.hdr');
  if (hdr) {
    var onScroll = function () { hdr.classList.toggle('scrolled', window.scrollY > 24); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- mobile nav ---------- */
  var burger = document.querySelector('.burger');
  var mnav = document.querySelector('.mnav');
  if (burger && mnav) {
    burger.addEventListener('click', function () {
      var open = mnav.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    mnav.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        mnav.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---------- reveal on scroll ---------- */
  var revs = document.querySelectorAll('.reveal');
  if (revs.length) {
    if (!('IntersectionObserver' in window)) {
      revs.forEach(function (el) { el.classList.add('in'); });
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });
      revs.forEach(function (el, i) {
        el.style.transitionDelay = (Math.min(i % 4, 3) * 80) + 'ms';
        io.observe(el);
      });
    }
  }

  /* ---------- lightbox ---------- */
  var lb = document.querySelector('.lb');
  if (lb) {
    var lbImg = lb.querySelector('img');
    var lastFocus = null;
    var open = function (src, alt) {
      lastFocus = document.activeElement;
      lbImg.src = src; lbImg.alt = alt || '';
      lb.classList.add('open');
      document.body.style.overflow = 'hidden';
      lb.querySelector('.lb-x').focus();
    };
    var close = function () {
      lb.classList.remove('open');
      lbImg.removeAttribute('src');
      document.body.style.overflow = '';
      if (lastFocus) lastFocus.focus();
    };
    document.addEventListener('click', function (e) {
      var t = e.target.closest('[data-lb]');
      if (t) {
        e.preventDefault();
        var img = t.matches('img') ? t : t.querySelector('img');
        if (img) open(img.getAttribute('data-full') || img.src, img.alt);
        return;
      }
      if (e.target.closest('.lb-x') || e.target === lb) close();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && lb.classList.contains('open')) close();
    });
  }

  /* ---------- Formspree AJAX ---------- */
  document.querySelectorAll('form[data-formspree]').forEach(function (form) {
    var msg = form.querySelector('.form-msg');
    var btn = form.querySelector('[type="submit"]');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (form.querySelector('.hp input') && form.querySelector('.hp input').value) return; // honeypot
      var label = btn ? btn.textContent : '';
      if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }
      if (msg) { msg.className = 'form-msg'; msg.textContent = ''; }
      fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      }).then(function (r) {
        if (r.ok) {
          form.reset();
          if (msg) {
            msg.className = 'form-msg ok';
            msg.textContent = form.getAttribute('data-success') ||
              'Thank you — your message has been sent. We will be in touch shortly.';
          }
        } else {
          return r.json().then(function (d) { throw new Error((d.errors && d.errors[0] && d.errors[0].message) || 'Submission failed'); });
        }
      }).catch(function (err) {
        if (msg) {
          msg.className = 'form-msg err';
          msg.textContent = 'Sorry — ' + err.message + '. Please call 916-612-6865 or email uca500@yahoo.com.';
        }
      }).then(function () {
        if (btn) { btn.disabled = false; btn.textContent = label; }
      });
    });
  });

  /* ---------- year ---------- */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* ---------- countdown ---------- */
  var cd = document.querySelector('[data-countdown]');
  if (cd) {
    var target = new Date(cd.getAttribute('data-countdown')).getTime();
    var tick = function () {
      var diff = target - Date.now();
      if (diff <= 0) { cd.textContent = 'Fight night is here'; return; }
      var d = Math.floor(diff / 864e5);
      var h = Math.floor(diff % 864e5 / 36e5);
      cd.textContent = d + ' day' + (d === 1 ? '' : 's') + ', ' + h + ' hr' + (h === 1 ? '' : 's') + ' to first bell';
    };
    tick(); setInterval(tick, 60000);
  }


  /* ---------- load more (gallery) ---------- */
  var lm = document.querySelector('[data-loadmore]');
  if (lm) {
    var container = document.querySelector(lm.getAttribute('data-loadmore'));
    var step = parseInt(lm.getAttribute('data-step') || '48', 10);
    var items = container ? [].slice.call(container.children) : [];
    var shown = step;
    var apply = function () {
      items.forEach(function (el, i) { el.style.display = i < shown ? '' : 'none'; });
      var left = items.length - shown;
      if (left <= 0) { lm.parentNode.style.display = 'none'; }
      else { lm.textContent = 'Load ' + Math.min(step, left) + ' more (' + left + ' left)'; }
    };
    if (items.length > step) {
      apply();
      lm.addEventListener('click', function () { shown += step; apply(); });
    } else if (lm.parentNode) {
      lm.parentNode.style.display = 'none';
    }
  }

  /* ================= RANKINGS ================= */
  var root = document.getElementById('rk-root');
  if (root && window.UCA_RANKINGS) {
    var DATA = window.UCA_RANKINGS;
    var DIVS = [
      { k: 'men', label: "Men's Open" },
      { k: 'women', label: "Women's Open" },
      { k: 'masters', label: 'Masters (40+)' },
      { k: 'womens_masters', label: "Women's Masters" }
    ];
    var years = Object.keys(DATA).sort(function (a, b) { return b - a; });
    var elYear = document.getElementById('rk-year');
    var elSearch = document.getElementById('rk-search');
    var elTabs = document.getElementById('rk-tabs');
    var state = { year: years[0], div: 'men', q: '' };

    years.forEach(function (y) {
      var o = document.createElement('option');
      o.value = y; o.textContent = y + (y === years[0] ? ' — Current' : '');
      elYear.appendChild(o);
    });
    elYear.value = state.year;

    var belt = '<svg class="belt" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l2.6 5.6 6.1.8-4.5 4.2 1.2 6-5.4-3-5.4 3 1.2-6L3.3 8.4l6.1-.8L12 2z"/></svg>';
    var esc = function (s) {
      return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
        return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
      });
    };

    function renderTabs() {
      elTabs.innerHTML = '';
      DIVS.forEach(function (d) {
        var has = DATA[state.year] && DATA[state.year][d.k];
        var b = document.createElement('button');
        b.className = 'tab' + (state.div === d.k ? ' active' : '');
        b.type = 'button';
        b.textContent = d.label;
        b.disabled = !has;
        if (!has) { b.style.opacity = '.34'; b.style.cursor = 'not-allowed'; }
        b.addEventListener('click', function () { state.div = d.k; render(); });
        elTabs.appendChild(b);
      });
    }

    function render() {
      renderTabs();
      var yearData = DATA[state.year] || {};
      if (!yearData[state.div]) {
        var first = DIVS.filter(function (d) { return yearData[d.k]; })[0];
        if (first) state.div = first.k;
        renderTabs();
      }
      var divisions = yearData[state.div] || [];
      var q = state.q.trim().toLowerCase();
      var html = '', shown = 0;

      divisions.forEach(function (d) {
        var cons = d.c;
        var champMatch = q && d.champ && d.champ.toLowerCase().indexOf(q) > -1;
        if (q) {
          cons = cons.filter(function (c) {
            return (c.n + ' ' + c.a).toLowerCase().indexOf(q) > -1;
          });
          if (!cons.length && !champMatch) return;
        }
        shown++;
        var champ = d.champ && d.champ.toUpperCase() !== 'VACANT' ? d.champ : '';
        html += '<article class="div-card">' +
          '<div class="div-hd"><h3>' + esc(d.wc) + '</h3>' +
          (d.w ? '<span class="wt">' + esc(d.w) + ' lbs</span>' : '') + '</div>' +
          '<div class="champ-row' + (champ ? '' : ' vacant') + '">' + belt +
            '<span class="lbl">Champion</span>' +
            '<span class="nm">' + (champ ? esc(champ) : 'Vacant') + '</span>' +
          '</div>';
        if (cons.length) {
          html += '<ol class="rk-list">';
          cons.forEach(function (c) {
            html += '<li><span class="n">' + esc(c.r) + '</span>' +
              '<span class="nm">' + esc(c.n) + '</span>' +
              (c.a ? '<span class="ag">' + esc(c.a) + '</span>' : '') + '</li>';
          });
          html += '</ol>';
        } else {
          html += '<p class="empty">No ranked contenders listed in this division' + (q ? ' for this search.' : ' yet.') + '</p>';
        }
        html += '</article>';
      });

      root.innerHTML = shown ? html :
        '<p class="no-res">No fighters match &ldquo;' + esc(state.q) + '&rdquo; in this division and year.<br>Try another division, or clear your search.</p>';
    }

    elYear.addEventListener('change', function () { state.year = this.value; render(); });
    var deb;
    elSearch.addEventListener('input', function () {
      var v = this.value;
      clearTimeout(deb);
      deb = setTimeout(function () { state.q = v; render(); }, 140);
    });
    render();
  }
})();
