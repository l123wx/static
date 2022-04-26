console.log(Shopline.uri)
console.log(Shopline);

(function() {
  initGa(() => {
    // triggerViewEvent(Shopline.uri.alias)
    // initEventListener()
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

function triggerViewEvent(type) {
  switch(type) {
    case 'Home': homePageViewEvent()
    break
    case 'ProductsDetail': detailPageViewEvent()
    break
    case 'Products': categoryPageViewEvent()
    break
  }
}

function homePageViewEvent() {
  record_user_event("home-page-view");
}

function detailPageViewEvent() {
  Shopline.event.on('DataReport::ViewContent', function({ content_spu_id: productId }) {
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

function categoryPageViewEvent() {
  record_user_event("category-page-view", {
    // TODO: 这个参数应该写什么
    pageCategories: ["bestSellers"]
  });
}

function initEventListener() {
  const eventOn = Shopline.event.on


  eventOn('', function() {

  })

  eventOn('', function() {

  })
}

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
    console.log(eventType)
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
    clientId = tracker.get('clientId')
    cb(clientId)
  })
}




function eventLog(eventName) {
  Shopline.event.on(eventName, function() {
    console.log(eventName, arguments)
  })
}

Object.keys(Shopline.event._caches).forEach(item => eventLog(item))
Object.keys(Shopline.event._events).forEach(item => eventLog(item))

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
