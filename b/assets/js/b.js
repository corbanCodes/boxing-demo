/* UCA — Design B */
(function () {
  'use strict';

  var burger = document.querySelector('.burger'), mnav = document.querySelector('.mnav');
  if (burger && mnav) {
    burger.addEventListener('click', function () {
      var o = mnav.classList.toggle('open');
      burger.setAttribute('aria-expanded', o ? 'true' : 'false');
    });
    mnav.addEventListener('click', function (e) {
      if (e.target.closest('a')) { mnav.classList.remove('open'); burger.setAttribute('aria-expanded', 'false'); }
    });
  }

  var rv = document.querySelectorAll('.rv');
  if (rv.length) {
    if (!('IntersectionObserver' in window)) { rv.forEach(function (e) { e.classList.add('in'); }); }
    else {
      var io = new IntersectionObserver(function (en) {
        en.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add('in'); io.unobserve(x.target); } });
      }, { rootMargin: '0px 0px -6% 0px', threshold: .05 });
      rv.forEach(function (e, i) { e.style.transitionDelay = (Math.min(i % 4, 3) * 70) + 'ms'; io.observe(e); });
    }
  }

  var lb = document.querySelector('.lb');
  if (lb) {
    var im = lb.querySelector('img'), last = null;
    var open = function (src, alt) {
      last = document.activeElement; im.src = src; im.alt = alt || '';
      lb.classList.add('open'); document.body.style.overflow = 'hidden'; lb.querySelector('.lb-x').focus();
    };
    var close = function () {
      lb.classList.remove('open'); im.removeAttribute('src');
      document.body.style.overflow = ''; if (last) last.focus();
    };
    document.addEventListener('click', function (e) {
      var t = e.target.closest('[data-lb]');
      if (t) { e.preventDefault(); var i = t.matches('img') ? t : t.querySelector('img'); if (i) open(i.src, i.alt); return; }
      if (e.target.closest('.lb-x') || e.target === lb) close();
    });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && lb.classList.contains('open')) close(); });
  }

  document.querySelectorAll('form[data-formspree]').forEach(function (form) {
    var msg = form.querySelector('.fmsg'), btn = form.querySelector('[type=submit]');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var hp = form.querySelector('.hp input');
      if (hp && hp.value) return;
      var label = btn ? btn.textContent : '';
      if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }
      if (msg) { msg.className = 'fmsg'; msg.textContent = ''; }
      fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })
        .then(function (r) {
          if (r.ok) {
            form.reset();
            if (msg) { msg.className = 'fmsg ok'; msg.textContent = form.getAttribute('data-success') || 'Thank you — your message has been sent.'; }
          } else {
            return r.json().then(function (d) { throw new Error((d.errors && d.errors[0] && d.errors[0].message) || 'Submission failed'); });
          }
        })
        .catch(function (err) {
          if (msg) { msg.className = 'fmsg err'; msg.textContent = 'Sorry — ' + err.message + '. Please call 916-612-6865 or email uca500@yahoo.com.'; }
        })
        .then(function () { if (btn) { btn.disabled = false; btn.textContent = label; } });
    });
  });

  document.querySelectorAll('[data-year]').forEach(function (e) { e.textContent = new Date().getFullYear(); });

  var cd = document.querySelector('[data-countdown]');
  if (cd) {
    var target = new Date(cd.getAttribute('data-countdown')).getTime();
    var tick = function () {
      var d = target - Date.now();
      if (d <= 0) { cd.textContent = 'Fight night is here'; return; }
      var dd = Math.floor(d / 864e5), hh = Math.floor(d % 864e5 / 36e5);
      cd.textContent = dd + ' day' + (dd === 1 ? '' : 's') + ', ' + hh + ' hr' + (hh === 1 ? '' : 's') + ' to first bell';
    };
    tick(); setInterval(tick, 60000);
  }

  var lm = document.querySelector('[data-loadmore]');
  if (lm) {
    var box = document.querySelector(lm.getAttribute('data-loadmore'));
    var step = parseInt(lm.getAttribute('data-step') || '48', 10);
    var items = box ? [].slice.call(box.children) : [];
    var shown = step;
    var apply = function () {
      items.forEach(function (el, i) { el.style.display = i < shown ? '' : 'none'; });
      var left = items.length - shown;
      if (left <= 0) { lm.parentNode.style.display = 'none'; }
      else { lm.textContent = 'Load ' + Math.min(step, left) + ' more (' + left + ' left)'; }
    };
    if (items.length > step) { apply(); lm.addEventListener('click', function () { shown += step; apply(); }); }
    else if (lm.parentNode) { lm.parentNode.style.display = 'none'; }
  }

  /* ---------- rankings ---------- */
  var root = document.getElementById('rk-root');
  if (root && window.UCA_RANKINGS) {
    var DATA = window.UCA_RANKINGS;
    var DIVS = [{ k: 'men', label: "Men's Open" }, { k: 'women', label: "Women's Open" },
                { k: 'masters', label: 'Masters (40+)' }, { k: 'womens_masters', label: "Women's Masters" }];
    var years = Object.keys(DATA).sort(function (a, b) { return b - a; });
    var eY = document.getElementById('rk-year'), eS = document.getElementById('rk-search'), eT = document.getElementById('rk-tabs');
    var st = { year: years[0], div: 'men', q: '' };
    years.forEach(function (y) {
      var o = document.createElement('option'); o.value = y;
      o.textContent = y + (y === years[0] ? ' — Current' : ''); eY.appendChild(o);
    });
    eY.value = st.year;
    var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
    function tabs() {
      eT.innerHTML = '';
      DIVS.forEach(function (d) {
        var has = DATA[st.year] && DATA[st.year][d.k];
        var b = document.createElement('button');
        b.type = 'button'; b.className = 'tab' + (st.div === d.k ? ' active' : ''); b.textContent = d.label;
        b.disabled = !has; if (!has) { b.style.opacity = '.35'; b.style.cursor = 'not-allowed'; }
        b.addEventListener('click', function () { st.div = d.k; render(); });
        eT.appendChild(b);
      });
    }
    function render() {
      tabs();
      var yd = DATA[st.year] || {};
      if (!yd[st.div]) { var f = DIVS.filter(function (d) { return yd[d.k]; })[0]; if (f) st.div = f.k; tabs(); }
      var divs = yd[st.div] || [], q = st.q.trim().toLowerCase(), html = '', shown = 0;
      divs.forEach(function (d) {
        var cons = d.c, cm = q && d.champ && d.champ.toLowerCase().indexOf(q) > -1;
        if (q) { cons = cons.filter(function (c) { return (c.n + ' ' + c.a).toLowerCase().indexOf(q) > -1; }); if (!cons.length && !cm) return; }
        shown++;
        var ch = d.champ && d.champ.toUpperCase() !== 'VACANT' ? d.champ : '';
        html += '<article class="dcard"><div class="dhd"><h3>' + esc(d.wc) + '</h3>' +
          (d.w ? '<span class="w">' + esc(d.w) + ' LBS</span>' : '') + '</div>' +
          '<div class="champrow' + (ch ? '' : ' vac') + '"><span class="l">Champion</span>' +
          '<span class="n">' + (ch ? esc(ch) : 'Vacant') + '</span></div>';
        if (cons.length) {
          html += '<ol class="rl">';
          cons.forEach(function (c) {
            html += '<li><span class="num">' + esc(c.r) + '</span><span class="nm">' + esc(c.n) + '</span>' +
              (c.a ? '<span class="ag">' + esc(c.a) + '</span>' : '') + '</li>';
          });
          html += '</ol>';
        } else { html += '<p class="empty">No ranked contenders listed' + (q ? ' for this search.' : ' yet.') + '</p>'; }
        html += '</article>';
      });
      root.innerHTML = shown ? html : '<p class="nores">No fighters match &ldquo;' + esc(st.q) + '&rdquo; in this division and year.</p>';
    }
    eY.addEventListener('change', function () { st.year = this.value; render(); });
    var t; eS.addEventListener('input', function () { var v = this.value; clearTimeout(t); t = setTimeout(function () { st.q = v; render(); }, 140); });
    render();
  }
})();
