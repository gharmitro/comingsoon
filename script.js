(function () {
  "use strict";

  var year = document.getElementById("year");
  if (!year) {
    return;
  }

  year.textContent = String(new Date().getFullYear());
})();
