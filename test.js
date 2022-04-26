console.log(Shopline.uri)
console.log(Shopline)

(function() {
  initGa(() => {
    // initEvent(Shopline.uri.alias)
  })
})()

function initGa(cb) {
  if (!window.ga) {
    var GTAG_ID = 'G-HP0GTQL69G'; 
    (function (i, s, o, g, r, a, m) {
        i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function () {
          (i[r].q = i[r].q || []).push(arguments)
        }, i[r].l = 1 * new Date(); a = s.createElement(o),
          m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m); a.onload = cb;
      })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');
    window.ga('create', GTAG_ID, 'auto');
  }
}

function initEvent(type) {
  switch(type) {
    case 'index': indexEvent();
    break;
    case 'ProductsDetail': productEvent();
    break;
  }
}

function indexEvent() {
  record_user_event("home-page-view");
}

function productsDetailEvent() {
  record_user_event("detail-page-view",
    {
      "productDetails": [
        {
          "product": {
            "id": '{{product.id}}'
          }
        }
      ]
    }
  )
}

function eventLog(eventName) {
  Shopline.event.on(eventName, function() {
    console.log(eventName, arguments)
  })
}

Object.keys(Shopline.event._caches).forEach(item => eventLog(item))


// TODO: params 应该放哪
function record_user_event(eventType, params = {}) {
  let clientId;

  if (!clientId) {
    getClientId(function(_clientId) {
      event(_clientId)
    })
    return
  }

  event(clientId)

  function event(clientId) {
    var _gre = _gre || [];
    // Credentials for project.
    _gre.push(['apiKey', "AIzaSyA0ZjTxdMqZjOPyWgI3DlI0Myq8tVlHPWA"]);
    _gre.push(['logEvent', {eventType, clientId, ...params}]);
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
}

function getClientId(cb) {
  window.ga(function (tracker) {
    clientId = tracker.get('clientId');
    cb(clientId)
  })
}


// <!-- home-page-view -->
// {% if request.page_type=='index' %}
// <script>
//   record_tag({
//   "eventType": "home-page-view",
//   "visitorId": "visitor-id",
// })
// </script>
// {% endif %}

// <!-- detail-page-view -->
// {% if request.page_type=='product' %}
// <script>
//   record_tag({
  // "eventType": "detail-page-view",
  // "visitorId": "visitor-id",
  // "productDetails": [{
  //   "product": {
  //     "id": "product-id"
  //   }
  // })
// </script>
// {% endif %}

// <!-- category-page-view -->
// {% if request.page_type=='collection' %}
// <script>
//   record_tag('category-page-view', {
//   "pageCategories": ["category1 > category2"]
//     "pageCategories": ["Jewelry"]//["{{ collection.current_type | downcase }}"]
//   })
// </script>
// {% endif %}

// <!-- search -->
// {% if request.page_type=='search' %}
// <script>
//   record_tag('search', {
//     "searchQuery": "{{search.terms}}"
//   })
// </script>
// {% endif %}

// <!-- shopping-cart-page-view -->
// {% if request.page_type=='cart' %}
// <script>
//   record_tag('shopping-cart-page-view', {
//     "productDetails": [{
//       'product': {
//         'id': '{{product.id}}'
//       }
//     }]
//   })
// </script>
// {% endif %}

// <!-- add-to-cart -->
// {% if request.page_type=='blog' %}
// <script>
//   record_tag('add-to-cart', {
//     "productDetails": [{
//       "product": {
//         "id": "product-id"
//       },
//       "quantity": ""
//     }]
//   })
// </script>
