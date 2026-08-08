/* PMS Database collapsible-block helper.
   Independent implementation; keeps the legacy open_close API used by existing pages. */
(function () {
  "use strict";

  function get(id) { return document.getElementById(id); }

  function setState(header, panel, open) {
    if (!header || !panel) return;
    panel.style.display = open ? "" : "none";
    header.classList.toggle("open", open);
    header.classList.toggle("close", !open);
    header.setAttribute("aria-expanded", open ? "true" : "false");
    panel.setAttribute("aria-hidden", open ? "false" : "true");
  }

  window.do_onoff = function (headerId, panelId) {
    var header = get(headerId);
    var panel = get(panelId);
    if (!header || !panel) return;
    setState(header, panel, panel.style.display === "none");
  };

  window.open_close = function (headerId, panelId) {
    var header = get(headerId);
    var panel = get(panelId);
    if (!header || !panel) return;
    header.setAttribute("role", "button");
    header.setAttribute("tabindex", "0");
    setState(header, panel, false);
    function toggle() { window.do_onoff(headerId, panelId); }
    header.addEventListener("click", toggle, false);
    header.addEventListener("keydown", function (event) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        toggle();
      }
    }, false);
  };

  window.OCwindowWidth = function () {
    return Math.min(window.innerWidth || document.documentElement.clientWidth || 0,
                    window.screen && window.screen.width ? window.screen.width : Infinity);
  };

  window.OCdisplayWidth = function () {
    return window.screen && window.screen.width ? window.screen.width : window.OCwindowWidth();
  };

  window.OCisSmartPhone = function () {
    return window.matchMedia ? window.matchMedia("(max-width: 700px)").matches : window.OCwindowWidth() <= 700;
  };
})();
