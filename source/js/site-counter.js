(function () {
  if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') return;
  var counter = document.getElementById('site-counter');
  if (!counter) return;
  fetch('https://busuanzi.9420.ltd/api', {
    method: 'POST',
    headers: { 'x-bsz-referer': location.href }
  }).then(function (response) {
    if (!response.ok) throw new Error('counter unavailable');
    return response.json();
  }).then(function (result) {
    if (!result.success || !result.data) return;
    document.getElementById('site-pv').textContent = result.data.site_pv;
    document.getElementById('site-uv').textContent = result.data.site_uv;
    counter.hidden = false;
  }).catch(function () {});
})();
