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
    const productList = await getPredictList('home-page-view', clientId)
    removeProductList()
    productList.forEach(item => {
      appendProduct(item)
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
    .then(async response => {
      resolve((await response.json())?.data?.data || [])
    })
  })
}


function appendProduct(productInfo) {
  const productListDom = document.querySelector('.stage-featured-collection--scroll-container')
  productListDom.innerHTML += `
    <div class="col">
      <a
        data-id="${productInfo.id}"
        data-item-no="N21F072A"
        data-sku-id="${productInfo.variants.id}"
        data-index=""
        data-status="${productInfo.status === 'active'}"
        data-name="${productInfo.title}"
        data-price="${productInfo.price}"
        class="product-item"
        href="/products/${productInfo.title.replaceAll(' ', '-').toLowerCase()}"
        data-plugin-product-item-a=""
      >
        <div class="product-item-image-wrapper">
          <div class="product-item-next-image" data-plugin-product-item-next-img-box="">
            <div data-test="" class="product-process-image " style="opacity: 1;" data-plugin-product-item-img-ele="">
              <img
                style="object-fit: contain; height: auto;"
                class="lozad lazyloaded"
                sizes="(max-width: 749px) 80vw,(max-width: 959px) 100vw"
                src="${productInfo.images[0].src}?w=999&amp;h=999&amp;t=webp"
              />
            </div>
          </div>
          <div class="product-item-image" data-plugin-product-item-img-box="">
            <div data-test="" class="product-process-image" style="opacity: 1;" data-plugin-product-item-img-ele="">
              <img
                style="object-fit: contain; height: auto;"
                class="lozad lazyloaded"
                sizes="(max-width: 749px) 80vw,(max-width: 959px) 100vw"
                src="${productInfo.images[1].src}?w=1500&amp;h=1500&amp;t=webp"
              >
            </div>
          </div>
          <span class="product-item-sale-tag body4">Sale</span>
          <div class="product-item-btn-con d-none d-md-block">
            <button
              data-query=""
              data-spu-seq="${productInfo.id}"
              data-unique-key="${productInfo.title.replaceAll(' ', '-').toLowerCase()}"
              class="btn btn-primary btn-sm product-item-btn"
              type="button"
            >
              Quick view
            </button>
          </div>
        </div>
        <div class="product-item-info">
          <div class="product-item-title product-grid-font">
            ${productInfo.title}
          </div>
          <div data-ssr-product-item-price-top=""></div>
          <div class="product-item-price body-font display-center">
            <!-- 原价 -->
            <span data-product-item-price="${productInfo.compare_at_price}" class="product-item-origin-price notranslate">$${productInfo.compare_at_price / 100}</span>
            <span class="product-item-sale-price">
              <!-- 现价 -->
              <span data-product-item-price="${productInfo.price}" data-from="1">From $${productInfo.price / 100}</span>
            </span>
            <span class="product-item-save-price">
              Save
              <!-- 节省 -->
              <span class="notranslate" data-product-item-price="${productInfo.compare_at_price - productInfo.price}">$${(productInfo.compare_at_price - productInfo.price) / 100}</span>
            </span>
          </div>
          <div data-ssr-product-item-price-bottom=""></div>
        </div>
        <div data-ssr-product-item-bottom=""></div>
      </a>
    </div>
  `
}

function removeProductList() {
  const productListDom = document.querySelector('.stage-featured-collection--scroll-container')
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