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
      window.ga('create', GTAG_ID, 'auto');
    } catch (err) {
      reject(err)
    }
  })
}

(async function() {
  console.log(window.ga)
  if (!window.ga) {
    await initGa()
    console.log(window.ga)
  }
  
  function getClientId() {
    return new Promise(resolve => {
        window.ga(function (tracker) {
          clientId = tracker.get('clientId');
          resolve(clientId)
        })
    })
  }

  var user_event = {
    "eventType":  "home-page-view",
    "visitorId": await getClientId(),
  }
  
  // record_user_event(user_event);

  // function record_user_event(user_event, options) {
  //   return new Promise(resolve => {
  //     var _gre = _gre || [];
  //     // Credentials for project.
  //     _gre.push(['apiKey', "AIzaSyA0ZjTxdMqZjOPyWgI3DlI0Myq8tVlHPWA"]);
  //     _gre.push(['logEvent', user_event]);
  //     _gre.push(['projectId', 'shopai001']);
  //     _gre.push(['locationId', 'global']);
  //     _gre.push(['catalogId', 'default_catalog']);
  //     window._gre = _gre;
  //     (function () {
  //       var gre = document.createElement('script')
  //       gre.type = 'text/javascript'; gre.async = true;
  //       gre.src = 'https://www.gstatic.com/retail/v2_event.js';
  //       var s = document.getElementsByTagName('script')[0];
  //       s.parentNode.insertBefore(gre, s);
  //       s.onload = resolve;
  //     })();
  //   })
  // }

  function behavior(action, label, value) {
    if (value === undefined) {
      window.ga && window.ga('send', 'event', 'category', action, label)
    } else {
      window.ga && window.ga('send', 'event', 'category', action, label, value)
    }
  }

  behavior('点击数', '记录', '+1')

})()
