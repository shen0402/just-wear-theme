var $cart = document.querySelector('.custom-cart-drawer');
var $cartContainer = document.querySelector('.custom-cart-drawer--container');
var $cartBody = document.querySelector('.custom-cart-drawer--body');
var $cartItems = document.querySelector('.cart-items');
var $cartIcon = document.querySelector('.header__icon--cart');
var $closeIcon = document.querySelector('.custom-cart-drawer--header__icon .icon');
var $bubble = $cartIcon.querySelector('.cart-count-bubble span');
var $itemCount = document.querySelector('.custom-cart-drawer__subtotal .item__count');
var $subtotal = document.querySelector('.custom-cart-drawer__subtotal .subtotal');
var currency = '$';

function openCart() {
    if (window.innerWidth < 750) {
        document.body.classList.add('overflow-hidden-tablet');
    } else {
        document.body.classList.add('overflow-hidden');
    }
    
    if (!$cart.classList.contains('active')) {
        $cart.classList.add('active');
    }
}

function closeCart() {
    document.body.classList.remove('overflow-hidden-tablet');
    document.body.classList.remove('overflow-hidden');
    $cart.classList.remove('active');
}

function formatCurrency(price) {
    var price = (Number(price) / 100).toFixed(2);
    return `${currency}${price}`;
}

function refreshCart(cart) {
    var currencies = {
        'AUD': '$',
        'EUR': '€',
        'CAD': '$',
        'CZK': 'Kč',
        'DKK': 'kr.',
        'HKD': '$',
        'ILS': 'NIS',
        'JPY': '¥',
        'MYR': 'RM',
        'NZD': '$',
        'PLN': 'zł',
        'SGD': '$',
        'KRM': '₩',
        'SEK': 'kr',
        'CHF': 'CHF',
        'AED': 'Dhs.',
        'USD': '$',
        'GBP': '£'
    }
    currency = currencies[cart.currency];
    
    if (cart.item_count > 0) {
        $cartContainer.classList.remove('empty__cart');
        $cartIcon.classList.remove('empty__cart');
        var items = '';
        var isFirstUpsell = true;
        $('.upsell-products').removeClass('hidden');
        $('.upsell-product--item').each(function(){
            $(this).removeClass('active');
            $(this).removeClass('hidden');
        });
        cart.items.forEach((item, index) => {
            console.log(item);
            var itemPrice = `<span class="price price--end">${formatCurrency(item.original_line_price)}</span>`;
            if (item.properties) {
                if (item.properties['_single_price'] > 0) {
                    itemPrice = `
                        <dl class="cart-item__discounted-prices">
                            <dd>
                                <s class="cart-item__old-price price price--end">${formatCurrency(item.properties['_single_price'] * item.quantity)}</s>
                            </dd>
                            <dd class="price price--end">${formatCurrency(item.original_line_price)}</dd>
                        </dl>
                    `;
                }
            }
            if (item.original_line_price != item.final_line_price) {
                itemPrice = `
                    <dl class="cart-item__discounted-prices">
                        <dd>
                            <s class="cart-item__old-price price price--end">${formatCurrency(item.original_line_price)}</s>
                        </dd>
                        <dd class="price price--end">${formatCurrency(item.final_line_price)}</dd>
                    </dl>
                `;
            }
            items += `
                <div class="cart-item">
                    <a class="cart-item__image" href="${item.url}">
                        <img src="${item.image.replace(/(\.[^.]*)$/, "_compact$1").replace('http:', '')}" alt="${item.title}" />
                    </a>
                    <div class="cart-item__details">
                        <p class="cart-item__title">${item.product_title}</p>
                        <p class="cart-item__options">${item.variant_title}</p>
                        <div class="cart-item__form">
                            <div class="cart-item__price large-up-hide medium-hide">
                                ${itemPrice}
                            </div>
                            <div class="cart-item__quantity" data-id="${item.id}" data-line="${index + 1}" data-qty="${item.quantity}" data-properties="${JSON.stringify(item.properties)}">
                                <div class="cart-item__quantity-button minus">
                                    <span>-</span>
                                </div>
                                <div class="cart-item__remove">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" aria-hidden="true" focusable="false" role="presentation" class="icon icon-remove">
                                        <path d="M14 3h-3.53a3.07 3.07 0 00-.6-1.65C9.44.82 8.8.5 8 .5s-1.44.32-1.87.85A3.06 3.06 0 005.53 3H2a.5.5 0 000 1h1.25v10c0 .28.22.5.5.5h8.5a.5.5 0 00.5-.5V4H14a.5.5 0 000-1zM6.91 1.98c.23-.29.58-.48 1.09-.48s.85.19 1.09.48c.2.24.3.6.36 1.02h-2.9c.05-.42.17-.78.36-1.02zm4.84 11.52h-7.5V4h7.5v9.5z" fill="currentColor"></path>
                                        <path d="M6.55 5.25a.5.5 0 00-.5.5v6a.5.5 0 001 0v-6a.5.5 0 00-.5-.5zM9.45 5.25a.5.5 0 00-.5.5v6a.5.5 0 001 0v-6a.5.5 0 00-.5-.5z" fill="currentColor"></path>
                                    </svg>
                                </div>
                                <div class="cart-item__quantity-input">
                                    <input class="quantity__input" type="number" value="${item.quantity}">
                                </div>
                                <div class="cart-item__quantity-button plus">
                                    <span>+</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="cart-item__price small-hide">
                        ${itemPrice}
                    </div>
                </div>
            `;
            $('.upsell-product--item').each(function(){
                if (item.product_id == $(this).data('product-id')) {
                    $(this).addClass('hidden');
                }
            });
        });
        $cartItems.innerHTML = items;
        $('.upsell-product--item').each(function(){
            if (!$(this).hasClass('hidden') && isFirstUpsell) {
                $(this).addClass('active');
                isFirstUpsell = false;
                return false;
            }
        });
        if (isFirstUpsell) {
            $('.upsell-products').addClass('hidden');
        }

        $('.custom-cart-drawer--header__text').find('.heading').text('Your cart');
    } else {
        $cartContainer.classList.add('empty__cart');
        $cartIcon.classList.add('empty__cart');
        $('.custom-cart-drawer--header__text').find('.heading').text('Your cart is empty');
    }

    $bubble.textContent = cart.item_count;
    $itemCount.textContent = `Subtotal (${cart.item_count} items)`;
    if (cart.items_subtotal_price == cart.original_total_price) {
        $subtotal.innerHTML = formatCurrency(cart.items_subtotal_price);
    } else {
        $subtotal.innerHTML = `<del>${formatCurrency(cart.original_total_price)} </del>${formatCurrency(cart.items_subtotal_price)}`;
    }
    $cartBody.classList.remove('cart__loading');
}

function initCart() {
    $.ajax({
        url: '/cart.js',
        dataType: "json",
        cache: false,
        success: function(cart) {
          refreshCart(cart);
          openCart();
        }
    });
}

$cartIcon.addEventListener('click', function(e){
    e.preventDefault();
    openCart();
});

$closeIcon.addEventListener('click', function(){
    closeCart();
});

$cart.addEventListener('click', function(e){
    if (e.target.classList.contains('custom-cart-drawer')) {
        closeCart();
    }
});

$(document).on('click', '.cart-item__quantity-button', function(){
    var $quantity = $(this).closest('.cart-item__quantity').find('.quantity__input');
    if ($(this).hasClass('plus')) {
        $quantity.val(Number($quantity.val()) + 1).trigger("change");
    } else {
        $quantity.val(Number($quantity.val()) - 1).trigger("change");
    }
});

$(document).on('change', '.quantity__input', function(){
    $cartBody.classList.add('cart__loading');
    var line = $(this).closest('.cart-item__quantity').data('line');
    $.ajax({
        type: "POST",
        url: "/cart/change.js",
        data: `quantity=${$(this).val()}&line=${line}`,
        dataType: "json",
        success: function(cart){
            refreshCart(cart);
        }
    });
});

$(document).on('click', '.cart-item__remove', function(){
    var $quantity = $(this).closest('.cart-item__quantity').find('.quantity__input');
    $quantity.val(0).trigger("change");
});

$(document).on('click', '.upsell-atc--button', function(e){
    e.preventDefault();
    $cartBody.classList.add('cart__loading');
    var id = $(this).closest('.upsell-product--atc').find('.upsell-input').val();
    $.ajax({
        type: 'POST',
        url: '/cart/add.js',
        dataType: 'json',
        data: `id=${id}&quantity=1`,
        success: function(res){
            initCart();
        },
        error: function(){
        }
    });
});

$(document).on('submit', 'product-form .form', function (e) {
    e.preventDefault();
    var is_valid = true;
    document.querySelectorAll('.product-form__input').forEach(item=>{
        if (!item.classList.contains('hidden')) {
            var _item = item;
            item.querySelectorAll('input').forEach(input=>{
                if (!input.classList.contains('active')) {
                    is_valid = false;
                    _item.querySelector('.label__text').style.color = 'red';
                }
            });
        }
    });

    if (is_valid) {
        var ids = document.querySelectorAll('.product-form__id');
        var gifts = document.querySelectorAll('.giftbox-product-id:checked');

        Shopify.queue = [];
        ids.forEach(id=>{
            Shopify.queue.push({
                variantId: id.value,
            });
        });
        if (document.getElementById('allow-giftbox')) {
            if (document.getElementById('allow-giftbox').checked ) {
                gifts.forEach(gift=>{
                    Shopify.queue.push({
                        variantId: gift.value,
                    });
                });
            }
        }
        Shopify.moveAlong = function() {
            // If we still have requests in the queue, let's process the next one.
            if (Shopify.queue.length) {
                var request = Shopify.queue.shift();
                var qty = 1;
                var pack = window.location.search.slice(0,7);
                var template = document.querySelector('.product__template');
                console.log(pack);
                if ((pack.indexOf('?pack=2') > -1) && template.classList.contains('product-regular')) {
                    qty = 2;
                }
                var properties = {};
                if (template.classList.contains('product-main')) {
                    var productId = document.querySelector('product-form').getAttribute('data-product-id');
                    var discount_price = Number(document.querySelector('.sticky-cta .regular-price').dataset.singleprice);
                    switch (productId) {
                        case '6766304952397': // Boxer Briefs
                            properties = {
                                _discount_type: 'discount1',
                                _discount_price: discount_price,
                                _single_price: discount_price * 3
                            };
                            break;
                        case '6766303477837': // Boxer Briefs Europe
                            properties = {
                                _discount_type: 'discount1',
                                _discount_price: discount_price,
                                _single_price: discount_price * 3
                            };
                            break;
                        case '6766304428109': // Briefs
                            properties = {
                                _discount_type: 'discount2',
                                _discount_price: discount_price,
                                _single_price: discount_price * 3
                            };
                            break;
                        case '6766304133197': // Trunks
                            properties = {
                                _discount_type: 'discount3',
                                _discount_price: discount_price,
                                _single_price: discount_price * 3
                            };
                            break;
                        case '6766303313997': // Trunks Europe
                            properties = {
                                _discount_type: 'discount3',
                                _discount_price: discount_price,
                                _single_price: discount_price * 3
                            };
                            break;
                        case '6766303510605':
                            properties = {
                                _single_price: discount_price * 2
                            };
                            break;
                        case '6766304231501':
                            properties = {
                                _single_price: discount_price * 2
                            };
                            break;
                        case '6766303739981':
                            properties = {
                                _single_price: discount_price * 2
                            };
                            break;
                        case '6766303248461':
                            properties = {
                                _single_price: discount_price * 2
                            };
                            break;
                        default:
                            properties = {
                                _single_price: 0
                            }
                            break;
                    }
                }
                var data = {
                    id: request.variantId,
                    quantity: qty,
                    properties: properties
                };
                $.ajax({
                    type: 'POST',
                    url: '/cart/add.js',
                    dataType: 'json',
                    data: data,
                    success: function(res){
                        Shopify.moveAlong();
                    },
                    error: function(){
                        // if it's not last one Move Along else update the cart number with the current quantity
                        if (Shopify.queue.length){
                            Shopify.moveAlong();
                        } else {
                            console.log('error');
                        }
                    }
                });
            } else {
                initCart();
            }
        };
        Shopify.moveAlong();
    }
});

$.ajax({
    url: '/cart.js',
    dataType: "json",
    cache: false,
    success: function(cart) {
      refreshCart(cart);
    }
});

const hash = window.location.hash;
if (hash == '#cart-drawer') {
    openCart();
}