(function () {
  // From https://github.com/egoist/vue-ga/blob/master/src/index.js
  function appendScript() {
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.google-analytics.com/analytics.js';
    document.body.appendChild(script);
  }

  function init(id) {
    appendScript();
    window.ga =
      window.ga ||
      function () {
        (window.ga.q = window.ga.q || []).push(arguments);
      };

    window.ga.l = Number(new Date());
    window.ga('create', id, 'auto');
  }

  function collect() {
    if (!window.ga) {
      init($docsify.ga);
    }

    window.ga('set', 'page', location.hash);
    window.ga('send', 'pageview');
  }

  const gaPlugin = function (hook, vm) {
    if (!$docsify.ga) {
      /* eslint-disable-next-line no-console */
      console.error('[Docsify] ga is required.');
      return;
    }

    hook.beforeEach(collect);
  };

  // Add plugin to docsify's plugin array
  $docsify = $docsify || {};
  $docsify.plugins = [].concat($docsify.plugins || [], gaPlugin);
})();
