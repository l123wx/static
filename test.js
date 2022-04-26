(function() {
  initGa(function() {
    triggerViewEvent(Shopline.uri.alias)
    initEventListener()
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

function categoryPageViewEvent() {
  record_user_event("category-page-view", {
    // TODO: 这个参数应该写什么
    pageCategories: ["bestSellers"]
  });
}

function initEventListener() {

  Shopline.event.on('DataReport::AddToCart', function({ data: { quantity, content_spu_id: productId } }) {
    record_user_event("add-to-cart", {
      // TODO: cart-id 不知道怎么获取
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


  // TODO: 结账完成应该绑定什么事件呢
  // Shopline.event.on('', function({ data: {currency, totalPrice, contents}}) {
  //   record_user_event("purchase-complete", {
  //     productDetails: contents.map(({ content_spu_id: productId, quantity }) => {
  //       return {
  //         product: {
  //           id: productId
  //         },
  //         quantity: quantity
  //       }
  //     }),
  //     purchaseTransaction: {
  //       // TODO: 与交易相关的非零总收入或总计
  //       revenue: totalPrice,
  //       currencyCode: currency
  //     }
  //   })
  // })
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


console.log(Shopline.uri)
console.log(Shopline);

// 测试用，用于查看什么时候回触发什么事件，返回什么参数
function eventLog(eventName) {
  Shopline.event.on(eventName, function() {
    console.log(eventName, arguments)
  })
}

Object.keys(Shopline.event._caches).forEach(item => eventLog(item))
Object.keys(Shopline.event._events).forEach(item => eventLog(item))
