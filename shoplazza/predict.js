(function() {
  initGa(function() {
    initPredict()
  })
})()

function initGa(cb) {
  var GTAG_ID = 'G-HP0GTQL69G'; 
  (function (i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    if (i[r]) return cb()
    i[r] = function () {
      (i[r].q = i[r].q || []).push(arguments)
    }
    i[r].l = 1 * new Date();
    a = s.createElement(o);
    m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g; m.parentNode.insertBefore(a, m);
    a.onload = cb;
  })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 's_ga');
  window.s_ga('create', GTAG_ID, 'auto');
}

function initPredict() {
  console.log('initPredict')
  getClientId(async function(clientId) {
    removeProductList()
    const productList = (await getPredictList('home-page-view', clientId)).data?.results || []
    productList.forEach(async ({ id: productId }) => {
      console.log(productId)
      appendProduct(await getProductInfo(productId))
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
  // TODO:
  return new Promise(resolve => {
    fetch(`https://api.shopflex.io/auth/lin/sai/products?shop=shopflex&productIds=${ productId }`)
    .then(async response => {
      const res = await response.json()
      resolve(res?.data[0])
    })
  })
}

function appendProduct(productInfo) {
  console.log(productInfo)
  const productListDom = document.querySelector('.product-list-item-parent-controller')
  productListDom.innerHTML += `
    <div class="col product-item-list">
      <div class="product-item__wrapper">
        <div class="product-item__inner-wrap js-product-inner-wrap" data-hover-z-index="1" data-no-hover-ani-effect="false" data-timer="236">
          <a data-id="16053794067830550272032921" data-sku-id="18053794067834912349142921" data-index="0" data-status="false" data-name="杯子" data-price="1200" class="product-item js-product-item __sl-custom-track-product-list-item" href="/products/杯子" data-plugin-product-item-a="">
            <div class="product-item-image-wrapper ">
              <div class="product-item__image-content">
                <div class="product-item-image" data-plugin-product-item-img-box="">
                  <div class="product-process-image placeholder-border placeholder-border" style=" " data-plugin-product-item-img-ele="">
                    <img style="opacity: 0; object-fit: contain; height:200px " class="lazyautosizes lazyloaded" data-sizes="auto" data-src="false" onload="this.parentElement.style.opacity=1;this.className+=' sl-img-loaded';this.style.height='auto';" onerror="this.onerror=null;this.style.opacity=0;this.parentElement.className+=' placeholder-border';" sizes="306px" src="false">
                  </div>
                </div>
                <span class="product-item-sale-tag body4 product-item-hidden-in-grid">
                  Save <span class="notranslate" data-product-item-price="100" data-product-item-save-price="true">$1</span>
                </span>
              </div>
              <div class="product-item__actions js-product-item__actions">
                <button type="button" data-query="" data-spu-seq="16053794067830550272032921" data-unique-key="杯子" class="btn btn-primary product-item__btn product-item__quick-add js-product-item-quick-add">
                  <span>
                    Add to cart
                  </span>
                  <i>&nbsp;</i>
                </button>
              </div>
            </div>
            <div class="product-item-info">
              <div class="product-item-title-wrapper">
                <div data-ssr-product-item-bottom=""></div>
                <div class="product-item-title product-grid-font body3">
                  ${ productInfo.title }
                </div>
              </div>
              <div data-ssr-product-item-price-top=""></div>
              <div class="product-item-price">
                <span data-product-item-price="1300" class="product-item-origin-price body4 notranslate product-item-hidden-in-list">
                  <span>$</span>
                  <span>
                    <span>13</span>
                    <sup class="body6">00</sup>
                  </span>
                </span>
                <span class="product-item-sale-price body2 product-item-sale-price--discount">
                  <span data-product-item-price="1200" class="notranslate">
                    <span>$</span>
                    <span>
                      <span>12</span>
                      <sup class="body6">00</sup>
                    </span>
                  </span></span>
                <span data-product-item-price="1300" class="product-item-origin-price body4 notranslate product-item-hidden-in-grid">
                  <span>$</span>
                  <span>
                    <span>13</span>
                    <sup class="body6">00</sup>
                  </span>
                </span>
                <span class="product-item-hidden-in-list product-item-tag-panel">
                  <span class="product-item-sale-tag body4" style="position: static;">
                    Save <span class="notranslate" data-product-item-price="100" data-product-item-save-price="true">$1</span>
                  </span>
                </span>
              </div>
              <div data-ssr-product-item-price-bottom=""></div>
            </div>
          </a>
        </div>
      </div>
    </div>
  `
}

function removeProductList() {
  const productListDom = document.querySelector('.product-list-item-parent-controller')
  productListDom.innerHTML = ''
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