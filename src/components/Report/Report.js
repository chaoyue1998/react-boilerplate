/*error*/
window.onerror = function(sMessage, sUrl, sLine) {
  var d = (function() {
    var ua = navigator.userAgent,
      e,
      browers = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if (/trident/i.test(browers[1])) {
      e = /\brv[ :]+(\d+)/g.exec(ua) || [];
      return "IE " + (e[1] || "")
    }
    if (browers[1] === "Chrome") {
      e = ua.match(/\bOPR\/(\d+)/);
      if (e != null) {
        return "Opera " + e[1]
      }
    }
    browers = browers[2]
      ? [browers[1], browers[2]]
      : [navigator.appName, navigator.appVersion, "-?"];
    if ((e = ua.match(/version\/(\d+)/i)) != null) {
      browers.splice(1, 1, e[1])
    }
    return browers.join(" ")
  })();
  $.get("/u.gif", {
    m: sMessage,
    u: sUrl,
    l: sLine,
    w: d
  })
};
