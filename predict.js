(function() {
  initGa(function() {
    initPredict()
  })
})()

function initGa(cb) {
  var GTAG_ID = 'G-HP0GTQL69G'; 
  (function (i, s, o, g, r, a, m) {
      i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function () {
        (i[r].q = i[r].q || []).push(arguments)
      }, i[r].l = 1 * new Date(); a = s.createElement(o),
        m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m); a.onload = cb;
    })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 's_ga');
  window.s_ga('create', GTAG_ID, 'auto');
}

function initPredict() {
  getClientId(async function(clientId) {
    const productList = await getPredictList('home-page-view', clientId).data?.results || []
    productList.forEach(productId => {
      getProductInfo(productId)
    })
  })
}

function getPredictList(eventType, visitorId) {
  return new Promise(resolve => {
    fetch('https://us-central1-shopai001.cloudfunctions.net/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify({
        eventType,
        visitorId
      })
    })
    .then(response => {
      resolve(response.json())
    })
  })
}

function getProductInfo(productId) {
  console.log(productId)
}

function getClientId(cb) {
  let clientId = localStorage.getItem('clientId') || null;
  if (!clientId) {
    window.s_ga(function (tracker) {
      const _clientId = tracker.get('clientId')
      localStorage.setItem('clientId', _clientId)
      cb(_clientId)
    })
    return
  }
  cb(clientId)
}