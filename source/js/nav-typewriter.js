(function () {
  'use strict';

  var phrases = {
    archives: '把走过的日子，轻轻折进时光里',
    categories: '将零散的热爱，慢慢整理成光',
    tags: '为每一段思绪，系上一枚小小的书签',
    about: '在代码与生活之间，写下我的坐标',
    links: '与有趣的灵魂，在各自的星空里相遇'
  };
  var match = window.location.pathname.match(/^\/(archives|categories|tags|about|links)(?:\/|$)/);
  var subtitle = document.getElementById('subtitle');
  if (!match || !subtitle) return;

  var title = subtitle.textContent.trim();
  var phrase = phrases[match[1]];
  if (!title || !phrase) return;
  subtitle.setAttribute('aria-label', title + '，' + phrase);

  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    subtitle.textContent = title + ' · ' + phrase;
    return;
  }

  var entries = [Array.from(title), Array.from(phrase)];
  var selected = 0;
  var index = entries[0].length;
  var deleting = true;

  function tick() {
    if (document.hidden) {
      window.setTimeout(tick, 500);
      return;
    }
    var chars = entries[selected];
    if (deleting) {
      index--;
      subtitle.textContent = chars.slice(0, index).join('') + '_';
      if (index === 0) {
        selected = (selected + 1) % entries.length;
        deleting = false;
        window.setTimeout(tick, 350);
        return;
      }
      window.setTimeout(tick, 45);
      return;
    }
    index++;
    subtitle.textContent = chars.slice(0, index).join('') + '_';
    if (index === chars.length) {
      deleting = true;
      window.setTimeout(tick, 2600);
      return;
    }
    window.setTimeout(tick, 95);
  }

  window.setTimeout(tick, 1500);
})();
