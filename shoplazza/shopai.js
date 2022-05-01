(function() {
  initGa(function() {
    triggerViewEvent(Shopline.uri.alias)
    initEventListener()
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

function triggerViewEvent(type) {
  switch(type) {
    case 'Home': homePageViewEvent()
    break
    case 'ProductsDetail': detailPageViewEvent()
    break
  }
}

function homePageViewEvent() {
  record_user_event("home-page-view");
}

function detailPageViewEvent() {
  Shopline.event.on('DataReport::ViewContent', function({ data: { content_spu_id: productId } }) {
    record_user_event("detail-page-view", {
      productDetails: [
        {
          product: {
            id: productId
          }
        }
      ]
    })
  })
}

function initEventListener() {
  Shopline.event.on('DataReport::AddToCart', function({ data: { quantity, content_spu_id: productId } }) {
    record_user_event("add-to-cart", {
      cartId: "cart-id",
      productDetails: [
        {
          product: {
            id: productId
          },
          quantity: quantity
        }
      ]
    })
  })


  Shopline.event.on('DataReport::CompleteOrder', function({ data: {currency, value, contents}}) {
    record_user_event("purchase-complete", {
      productDetails: contents.map(({ content_spu_id: productId, quantity }) => {
        return {
          product: {
            id: productId
          },
          quantity: quantity
        }
      }),
      purchaseTransaction: {
        revenue: value,
        currencyCode: currency
      }
    })
  })
}

function record_user_event(eventType, params = {}) {
  let clientId = localStorage.getItem('clientId') || null;

  if (!clientId) {
    getClientId(function(_clientId) {
      localStorage.setItem('clientId', _clientId)
      user_event(eventType, _clientId, params)
    })
    return
  }

  user_event(eventType, clientId, params)
}

function user_event(eventType, visitorId, params) {
  fetch('https://us-central1-shopai001.cloudfunctions.net/shopai_event', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify({
      eventType,
      visitorId,
      ...params
    })
  })
}

function getClientId(cb) {
  window.s_ga(function (tracker) {
    clientId = tracker.get('clientId')
    cb(clientId)
  })
}