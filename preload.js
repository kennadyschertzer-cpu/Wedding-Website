// ============================================================================
// PAGE PRELOADER
// ============================================================================
// Waits until this page's fonts AND images (and everything else the browser
// tracks with the "load" event) are fully ready, THEN fades out the loading
// screen to reveal the page. This avoids any flash of missing fonts, broken
// image icons, or half-loaded layout on a slow connection.
//
// If something takes unusually long (a slow connection, a resource that
// never finishes loading, etc.), a safety timeout force-hides the loader
// after 15 seconds so a visitor is never stuck staring at a blank screen.
//
// This file is shared by every page — edit it once here and every page
// picks up the change. Each page just needs:
//   1. <div id="page-loader" class="page-loader"><div class="loader-spinner"></div></div>
//      as the very first thing inside <body>
//   2. <script src="preload.js" defer></script> (or "../preload.js" for
//      pages one folder deeper, like table-number/index.html)
// ============================================================================

(function () {
  var loader = document.getElementById("page-loader");
  if (!loader) return;

  function hideLoader() {
    loader.classList.add("loaded");
  }

  var fontsReady =
    document.fonts && document.fonts.ready
      ? document.fonts.ready
      : Promise.resolve();

  var windowLoaded = new Promise(function (resolve) {
    if (document.readyState === "complete") {
      resolve();
    } else {
      window.addEventListener("load", resolve);
    }
  });

  Promise.all([fontsReady, windowLoaded]).then(hideLoader);

  // Safety net — never leave a visitor stuck on the loading screen.
  // Extended to give slower connections plenty of buffer time before
  // force-revealing the page.
  setTimeout(hideLoader, 15000);
})();
