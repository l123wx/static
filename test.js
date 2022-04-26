function initGa() {
  return new Promise((resolve, reject) => {
    try {
      var GTAG_ID = 'G-HP0GTQL69G'; 
      (function (i, s, o, g, r, a, m) {
         i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function () {
           (i[r].q = i[r].q || []).push(arguments)
         }, i[r].l = 1 * new Date(); a = s.createElement(o),
           m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m); a.onload = resolve;
       })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');
      ga('create', GTAG_ID, 'auto');
    } catch (err) {
      reject(err)
    }
  })
}

(async function() {
  console.log(ga)
  if (!ga) {
    console.log(ga)
    await initGa()
    console.log(ga)
  }

  ga(function (tracker) {
    clientId = tracker.get('clientId');
  })

  var user_event = {
    "eventType":  "home-page-view",
    "visitorId": clientId,
  }
  record_user_event(user_event, options);

  function record_user_event(user_event, options) {
     var _gre = _gre || [];
     // Credentials for project.
     _gre.push(['apiKey', "AIzaSyA0ZjTxdMqZjOPyWgI3DlI0Myq8tVlHPWA"]);
     _gre.push(['logEvent', user_event]);
     _gre.push(['projectId', 'shopai001']);
     _gre.push(['locationId', 'global']);
     _gre.push(['catalogId', 'default_catalog']);
     window._gre = _gre;
     (function () {
       var gre = document.createElement('script')
       gre.type = 'text/javascript'; gre.async = true;
       gre.src = 'https://www.gstatic.com/retail/v2_event.js';
       var s = document.getElementsByTagName('script')[0];
       s.parentNode.insertBefore(gre, s);
     })();
   }
})()
