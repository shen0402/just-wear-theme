function initProductPage() {
    $(document).ready(function(){
        // embla slider

        document.body.classList.add('slider--loading');
        document.querySelectorAll('.embla-slider').forEach(emblaNode=>{
            const wrap = emblaNode.querySelector(".embla");
            const viewPort = wrap.querySelector(".embla__viewport");
            const prevBtn = wrap.querySelector(".embla__button--prev");
            const nextBtn = wrap.querySelector(".embla__button--next");
            const dots = emblaNode.querySelector(".embla__dots");
            let options = {loop: false, align: 'start', draggable: true, containScroll: "trimSnaps"};
            const embla = EmblaCarousel(viewPort, options);

            const generateDotBtns = () => {
                const template = emblaNode.getElementsByClassName("embla-dot-template")[0].innerHTML;
                dots.innerHTML = embla.scrollSnapList().reduce(acc => acc + template, "");
                return [].slice.call(dots.querySelectorAll(".embla__dot"));
            };

            const dotsArray = generateDotBtns();

            if (dotsArray.length > 4) {
                emblaNode.classList.add('embla-buttons__enalbe');
            }

            const setupPrevNextBtns = () => {
                prevBtn.addEventListener('click', embla.scrollPrev, false);
                nextBtn.addEventListener('click', embla.scrollNext, false);
            };
                
            const disablePrevNextBtns = () => {
                return () => {
                    if (embla.canScrollPrev()) prevBtn.removeAttribute('disabled');
                    else prevBtn.setAttribute('disabled', 'disabled');
                
                    if (embla.canScrollNext()) nextBtn.removeAttribute('disabled');
                    else nextBtn.setAttribute('disabled', 'disabled');
                };
            };

            const setupDotBtns = () => {
                dotsArray.forEach((dotNode, i) => {
                dotNode.addEventListener("click", () => embla.scrollTo(i), false);
                });
            };

            const selectDotBtn = () => () => {
                const previous = embla.previousScrollSnap();
                const selected = embla.selectedScrollSnap();
                dotsArray[previous].classList.remove("is-selected");
                dotsArray[selected].classList.add("is-selected");
                if (window.innerWidth < 750 && dotsArray.length > 4) {
                    dotsArray.forEach((dot, index)=>{
                        dot.classList.remove('hidden');
                        if (selected == 0 && index >= 4) {
                        dot.classList.add('hidden');
                        }
                        if (selected > dotsArray.length - 4 && index < dotsArray.length - 4) {
                        dot.classList.add('hidden');
                        }
                        if ((selected > 0 && selected <= dotsArray.length - 4) && (index < selected - 1 || index > selected + 2)) {
                        dot.classList.add('hidden');
                        }
                    });
                }

                setTimeout(() => {
                    document.querySelectorAll('.product-list-slider .embla__dots').forEach(item=>{
                        item.style.opacity = 1;
                    });
                }, 100);
                
            };

            setupPrevNextBtns();
            setupDotBtns();

            embla.on("select", selectDotBtn());
            embla.on("select", disablePrevNextBtns());
            embla.on("init", selectDotBtn());
            embla.on("init", disablePrevNextBtns());
        });
        document.body.classList.remove('slider--loading');




        // product page

        var handle = window.location.href;
        var pack = window.location.search.slice(0,7);
        var variantRadios = document.querySelectorAll('variant-radios');
        var optionLabels = document.querySelectorAll('.option-label');
        var dataUrl = variantRadios[0].dataset.url;
        var tabItems = document.querySelectorAll('.packs-tab .tab-item');
        var template = document.querySelector('.product__template');

        for(var i = 0;i < tabItems.length;i++) {
            if(handle.indexOf(tabItems[i].getAttribute('href')) > -1) {
                for(var j = 0;j < tabItems.length;j++) {
                    tabItems[j].classList.remove('active');
                }
                tabItems[i].classList.add('active');
            }
            if(tabItems[i].classList.contains('active')) {
            }
        }

        if (handle.indexOf('?pack') == -1 && tabItems.length > 0) {
            tabItems[0].classList.add('active');
        }

        document.querySelectorAll('.style--button').forEach(item=>{
            item.addEventListener('click', function(){
                document.getElementById('shopify-section-header').classList.remove('shopify-section-header-hidden');
                document.getElementById('shopify-section-header').classList.add('shopify-section-header-sticky');
                document.body.classList.add('overflow-hidden');
                document.querySelector('.style-popup').classList.add('active');
                document.getElementById('over-back').classList.add('active');
            });
        });

        document.querySelectorAll('.style-popup .close-button').forEach(item=>{
            item.addEventListener('click', function(){
                document.body.classList.remove('overflow-hidden');
                document.querySelector('.style-popup').classList.remove('active');
                document.getElementById('over-back').classList.remove('active');
            });
        });

        var styleItems = document.querySelectorAll('.style-popup .tab-item');
        var styleContents = document.querySelectorAll('.style-popup .tab-content');
        for(var i = 0;i < styleItems.length;i++) {
            const index = i;
            styleItems[i].addEventListener('click', function(){
                for(var j = 0;j < styleItems.length;j++) {
                    styleItems[j].classList.remove('active');
                    styleContents[j].classList.remove('active');
                }
                styleItems[index].classList.add('active');
                styleContents[index].classList.add('active');
            });
        }

        document.querySelectorAll('.size-chart--button').forEach(item=>{
            item.addEventListener('click', function(){
                document.getElementById('shopify-section-header').classList.remove('shopify-section-header-hidden');
                document.getElementById('shopify-section-header').classList.add('shopify-section-header-sticky');
                document.body.classList.add('overflow-hidden');
                document.querySelector('.size-chart').classList.add('active');
                document.getElementById('over-back').classList.add('active');
            });
        });

        document.querySelectorAll('.size-chart .close-button').forEach(item=>{
            item.addEventListener('click', function(){
                document.body.classList.remove('overflow-hidden');
                document.querySelector('.size-chart').classList.remove('active');
                document.getElementById('over-back').classList.remove('active');
            });
        });

        setTimeout(() => {
            document.querySelectorAll('.product-list-slider').forEach(slider=>{
                const productSliderList = slider.querySelectorAll('li');
                if (productSliderList.length <= 1) {
                    slider.classList.add('embla__disable');
                }
                productSliderList.forEach((slide, index)=> {
                    if (index == 0) {
                        slide.classList.add('is-active');
                    } else {
                        slide.classList.remove('is-active');
                    }
                });
                slider.querySelector('.embla__button--next').addEventListener('click', function(){
                    var mediaColor = this.closest('.embla-slider').getAttribute('data-media-color')
                    console.log(mediaColor);
    
                    for(var i = 0;i < productSliderList.length;i++) {
                        if(productSliderList[i].classList.contains('is-active')) {
                            productSliderList[i].classList.remove('is-active');
                            productSliderList[i + 1].classList.add('is-active');
                            const target0 = productSliderList[i].getAttribute('data-media-id');
                            const target1 = productSliderList[i + 1].getAttribute('data-media-id');
                            document.querySelector(`.embla-thumbnail-list[data-media-color="${mediaColor}"]`).querySelector(`[data-target="${target0}"] button`).removeAttribute('aria-current');
                            document.querySelector(`.embla-thumbnail-list[data-media-color="${mediaColor}"]`).querySelector(`[data-target="${target1}"] button`).setAttribute('aria-current', true);
                            return ;
                        }
                    }
                });
    
                slider.querySelector('.embla__button--prev').addEventListener('click', function(){
                    var mediaColor = this.closest('.embla-slider').getAttribute('data-media-color')
                    console.log(mediaColor);

                    for(var i = 0;i < productSliderList.length;i++) {
                        if(productSliderList[i].classList.contains('is-active')) {
                            productSliderList[i].classList.remove('is-active');
                            productSliderList[i - 1].classList.add('is-active');
                            const target0 = productSliderList[i].getAttribute('data-media-id');
                            const target1 = productSliderList[i - 1].getAttribute('data-media-id');
                            document.querySelector(`.embla-thumbnail-list[data-media-color="${mediaColor}"]`).querySelector(`[data-target="${target0}"] button`).removeAttribute('aria-current');
                            document.querySelector(`.embla-thumbnail-list[data-media-color="${mediaColor}"]`).querySelector(`[data-target="${target1}"] button`).setAttribute('aria-current', true);
                            return ;
                        }
                    }
                });
            });
        }, 100);

        document.querySelectorAll('.embla-thumbnail-list').forEach(thumbnailList=>{
            const list = thumbnailList.querySelectorAll('li');
            list.forEach((li, index)=> {
                if (index == 0) {
                    li.querySelector('button').setAttribute('aria-current', true);
                } else {
                    li.querySelector('button').removeAttribute('aria-current');
                }
            })
            thumbnailList.style.width = `${56 * list.length}px`;
            list.forEach((thumbnail, index)=>{
                thumbnail.addEventListener('click', function(){
                    var productDots = document.querySelector('.product-list-slider').querySelectorAll('.embla__dot');
                    if (template.classList.contains('product-main')) {
                        productDots = document.querySelector('.product-list-slider[data-media-current="true"]').querySelectorAll('.embla__dot');
                    }
                    productDots[index].click();
                })
            });
        });

        document.querySelectorAll('.variant-type--pouch-type label').forEach(item=>{
            item.addEventListener('click', function(){
                const label = this.textContent.trim();
                switch (label) {
                    case 'Active - with Pouch':
                        if (document.querySelector('.product-style--active')) {
                            document.querySelector('.product-style--active').click();
                        }
                        break;
                    case 'Pro - without Pouch':
                        if (document.querySelector('.product-style--pro')) {
                            document.querySelector('.product-style--pro').click();
                        }
                        break;
                
                    default:
                        break;
                }
            });
        });

        document.querySelectorAll('.product__giftbox-product').forEach(item=>{
            item.addEventListener('click', function(){
                if (template.classList.contains('product-main') && document.querySelectorAll('.product-list-slider').length > 1) {
                    const currentColor = this.getAttribute('data-option-color');
                    document.querySelectorAll('.product-list-slider').forEach(slider=>{
                        const color = slider.getAttribute('data-media-color');
                        if (color.indexOf(currentColor) > -1) {
                            slider.setAttribute('data-media-current', true);
                        } else {
                            slider.setAttribute('data-media-current', false);
                        }
                    });

                    document.querySelectorAll('.embla-thumbnail-list').forEach(slider=>{
                        const color = slider.getAttribute('data-media-color');
                        if (color.indexOf(currentColor) > -1) {
                            slider.setAttribute('data-media-current', true);
                        } else {
                            slider.setAttribute('data-media-current', false);
                        }
                    });
                }
                const target = this.dataset.target;
                document.querySelector(`.${target}`).click();
            });
        });

        if (template.classList.contains('product-main')) {
            if (pack.indexOf('?pack=1') > -1 || pack.indexOf('?pack=2') > -1 || pack.indexOf('?pack=3') > -1 || pack.indexOf('?pack=') == -1) {
                variantRadios.forEach((item, index)=>{
                    if (index >= 1) {
                        item.remove();
                        document.querySelector(`[name="items[${index}]['id']"]`).remove();
                    } else {
                        if (pack) {
                            item.setAttribute('data-url', dataUrl+pack);
                        } else {
                            if(tabItems.length > 0) item.setAttribute('data-url', dataUrl+'?pack='+tabItems[0].dataset.pack);
                        }
                    }
                });
                document.querySelectorAll('.variant-pack').forEach((pack, index)=>{
                    if (index > 0) {
                        pack.remove();
                    } else {
                        pack.querySelector('.variant-pack__label').remove();
                    }
                });
                document.querySelector('.variant-packs').classList.add('single-pack');
            } else if (pack.indexOf('?pack=6') > -1) {
                variantRadios.forEach((item, index)=>{
                    if (index > 1) {
                        item.remove();
                        document.querySelector(`[name="items[${index}]['id']"]`).remove();
                    } else {
                        item.setAttribute('data-url', dataUrl+pack);
                    }
                });
                document.querySelectorAll('.variant-pack')[2].remove();
                document.querySelectorAll('.variant-pack__checkbox')[2].remove();
                window.scrollTo({ left: 0, top: document.querySelector('[data-pack="6"]').offsetTop, behavior: "smooth" });
                if (document.querySelector('.product__giftbox')) {
                    document.querySelector('.product__giftbox').remove();
                }
            } else if (pack.indexOf('?pack=9') > -1) {
                variantRadios.forEach((item, index)=>{
                    item.setAttribute('data-url', dataUrl+pack);
                });
                window.scrollTo({ left: 0, top: document.querySelector('[data-pack="9"]').offsetTop, behavior: "smooth" });
                if (document.querySelector('.product__giftbox')) {
                    document.querySelector('.product__giftbox').remove();
                }
            }

            var pair = Number(document.querySelector('.tab-item.active').dataset.pack);
            var currency = document.querySelector('.sticky-cta .compare-price').dataset.currency[0];
            var regularPrice = Number(document.querySelector('.sticky-cta .regular-price').dataset.price);
            var singlePrice = Number(document.querySelector('.sticky-cta .regular-price').dataset.singleprice);
            function formatCurrency(price) {
                var price = (Number(price) / 100).toFixed(2);
                return `${currency}${price}`;
            }

            if (pair > 3) {
                regularPrice = regularPrice * pair / 3;
            }

            if (pair == 6) {
                document.querySelectorAll('.sticky-cta .compare-price').forEach(price=>{
                    price.textContent = formatCurrency(singlePrice * 6);
                });
                document.querySelectorAll('.sticky-cta .regular-price').forEach(price=>{
                    price.textContent = formatCurrency(singlePrice * 6 * 0.8);
                });
                setTimeout(() => {
                    document.getElementById('klarna1').setAttribute('data-purchase-amount', singlePrice * 6 * 0.8);
                    window.KlarnaOnsiteService = window.KlarnaOnsiteService || [];
                    window.KlarnaOnsiteService.push({ eventName: 'refresh-placements' });
                }, 1000);
            } else if (pair == 9) {
                document.querySelectorAll('.sticky-cta .compare-price').forEach(price=>{
                    price.textContent = formatCurrency(singlePrice * 9);
                });
                document.querySelectorAll('.sticky-cta .regular-price').forEach(price=>{
                    price.textContent = formatCurrency(singlePrice * 9 * 0.75);
                });
                setTimeout(() => {
                    document.getElementById('klarna1').setAttribute('data-purchase-amount', singlePrice * 9 * 0.75);
                    window.KlarnaOnsiteService = window.KlarnaOnsiteService || [];
                    window.KlarnaOnsiteService.push({ eventName: 'refresh-placements' });
                }, 1000);
            } else {
                document.querySelectorAll('.sticky-cta .regular-price').forEach(price=>{
                    price.textContent = formatCurrency(regularPrice);
                });
                if (pair > 1) {
                    document.querySelectorAll('.sticky-cta .compare-price').forEach(price=>{
                        price.textContent = formatCurrency(singlePrice * pair);
                    });
                }
                setTimeout(() => {
                    document.getElementById('klarna1').setAttribute('data-purchase-amount', regularPrice);
                    window.KlarnaOnsiteService = window.KlarnaOnsiteService || [];
                    window.KlarnaOnsiteService.push({ eventName: 'refresh-placements' });
                }, 1000);
            }

            document.querySelector('.variant-packs').classList.remove('hidden');

        } else if (template.classList.contains('product-regular')) {
            var pair = Number(document.querySelector('.tab-item.active').dataset.pack);
            if (pair == 2) {
                document.querySelector('[data-pair="1"]').classList.add('hidden');
                document.querySelector('[data-pair="2"]').classList.remove('hidden');
            }
        }

        document.querySelectorAll('.product-form__label').forEach(label=>{
            label.addEventListener('click', function(){
                var color = '', size = '', style = '';
                var val = this.getAttribute('data-option-value');
                var formInput = this.closest('.product-form__input');
                if (formInput.classList.contains('variant-type--size')) {
                    switch (val) {
                        case 'S':
                            val = '70-75 cm | 27-29 in';
                            size = ', small';
                            break;
                        case 'M':
                            val = '76-82 cm | 30-32 in';
                            size = ', medium';
                            break;
                        case 'L':
                            val = '83-89 cm | 33-35 in';
                            size = ', large';
                            break;
                        case 'XL':
                            val = '90-100 cm | 36-39 in';
                            size = ', extra large';
                            break;
                        case 'XXL':
                            val = '101-111 cm | 40-44 in';
                            size = ', extra extra large';
                            break;
                    
                        default:
                            break;
                    }
                    formInput.querySelectorAll('.variant-type--size input').forEach(item=>{
                        item.classList.add('active');
                    });
                }
                if (formInput.classList.contains('variant-type--pouch-type')) {
                    switch (val) {
                        case 'Active - with Pouch':
                            val = 'Active';
                            style = ', active';
                            break;
                        case 'Pro - without Pouch':
                            val = 'Pro';
                            style = ', pro'
                            break;
                    
                        default:
                            break;
                    }
                    formInput.querySelectorAll('.variant-type--pouch-type input').forEach(item=>{
                        item.classList.add('active');
                    });
                    if (template.classList.contains('product-main') && document.querySelectorAll('.product-list-slider').length > 1) {
                        var currentColor = this.getAttribute('data-option-color');
                        currentColor = currentColor.split('-')[0];
                        document.querySelectorAll('.product-list-slider').forEach(slider=>{
                            const color = slider.getAttribute('data-media-color');
                            if (color == currentColor) {
                                slider.setAttribute('data-media-current', true);
                            } else {
                                slider.setAttribute('data-media-current', false);
                            }
                        });

                        document.querySelectorAll('.embla-thumbnail-list').forEach(slider=>{
                            const color = slider.getAttribute('data-media-color');
                            if (color == currentColor) {
                                slider.setAttribute('data-media-current', true);
                            } else {
                                slider.setAttribute('data-media-current', false);
                            }
                        });
                    }
                }
                if (formInput.classList.contains('variant-type--color')) {
                    formInput.querySelectorAll('.variant-type--color input').forEach(item=>{
                        item.classList.add('active');
                    });
                    color = ', ' + val;
                }
                formInput.querySelector('.label__text').textContent = val;
                formInput.querySelector('.label__text').style.color = '#2d2d2d';
                if (formInput.classList.contains('variant-type--color')) {
                    if (template.classList.contains('product-main') && document.querySelectorAll('.product-list-slider').length > 1) {
                        const currentColor = this.getAttribute('data-option-color');
                        document.querySelectorAll('.product-list-slider').forEach(slider=>{
                            const color = slider.getAttribute('data-media-color');
                            if (color.indexOf(currentColor) > -1) {
                                slider.setAttribute('data-media-current', true);
                            } else {
                                slider.setAttribute('data-media-current', false);
                            }
                        });

                        document.querySelectorAll('.embla-thumbnail-list').forEach(slider=>{
                            const color = slider.getAttribute('data-media-color');
                            if (color.indexOf(currentColor) > -1) {
                                slider.setAttribute('data-media-current', true);
                            } else {
                                slider.setAttribute('data-media-current', false);
                            }
                        });
                    }
                    setTimeout(() => {
                        document.querySelector('.product__media-item.is-active').classList.remove('is-active');
                        document.querySelectorAll('.product__media-item')[0].classList.add('is-active');
                        document.querySelectorAll('.product-list-slider .embla__dot')[0].click();
                    }, 50);
                }

                var varinatPack = this.closest('.variant-pack');
                if (varinatPack) {
                    varinatPack.querySelector('.variant-type--color').querySelectorAll('input').forEach(input=>{
                        if (input.classList.contains('active') && input.checked && !color) {
                            color = ', ' + input.value;
                        }
                    });
                    varinatPack.querySelector('.variant-type--size').querySelectorAll('input').forEach(input=>{
                        if (input.classList.contains('active') && input.checked && !size) {
                            switch (input.value) {
                                case 'S':
                                    size = ', small';
                                    break;
                                case 'M':
                                    size = ', medium';
                                    break;
                                case 'L':
                                    size = ', large';
                                    break;
                                case 'XL':
                                    size = ', extra large';
                                    break;
                                case 'XXL':
                                    size = ', extra extra large';
                                    break;
                            
                                default:
                                    break;
                            }
                        }
                    });
                    var isStyle = false;
                    if (varinatPack.querySelector('.variant-type--pouch-type')) {
                        varinatPack.querySelector('.variant-type--pouch-type').querySelectorAll('input').forEach(input=>{
                            if (input.classList.contains('active') && input.checked && !style) {
                                switch (input.value) {
                                    case 'Active - with Pouch':
                                        style = 'active';
                                        break;
                                    case 'Pro - without Pouch':
                                        style = 'pro'
                                        break;
                                
                                    default:
                                        break;
                                }
                            }
                        });
                        isStyle = true;
                    }
                    
                    var customPack = style + color + size ;

                    if (customPack[0] == ',') {
                        customPack = customPack.slice(2);
                    }

                    if (varinatPack.querySelector('.variant-pack__values')) {
                        varinatPack.querySelector('.variant-pack__values').textContent = customPack;
                        if (color && size && style && !varinatPack.classList.contains('active') || color && size && !style && !isStyle && !varinatPack.classList.contains('active')) {
                            varinatPack.classList.add('active');
                            varinatPack.previousElementSibling.checked = false;
                            if (varinatPack.nextElementSibling) {
                                varinatPack.nextElementSibling.checked = true;
                            } else {
                                if (document.querySelector('.product-form__disabled')) {
                                    document.querySelector('.product-form__disabled').classList.remove('product-form__disabled');
                                }
                            }
                        }
                    }

                    if (document.querySelector('.variant-packs').classList.contains('single-pack')) {
                        if (color && size && style || color && size && !style && !isStyle) {
                            if (document.querySelector('.product-form__disabled')) {
                                document.querySelector('.product-form__disabled').classList.remove('product-form__disabled');
                            }
                        }
                    }
                }
            });
        });

        if (document.querySelector('.image-with-text__form .button')) {
            document.querySelector('.image-with-text__form .button').addEventListener('click', function(e){
                e.preventDefault();
                const posTop = document.querySelector('.product-form__submit').offsetTop;
                window.scrollTo({ left: 0, top: posTop - 100, behavior: "smooth" });
            });
        }
    });
}

if (document.querySelector('[data-barba="wrapper"]')) {
    barba.init({
        prevent: ({ el }) => (el.classList && !el.classList.contains('barba__link')),
        transitions: [
          {
            leave(data) {
                document.getElementById('page--loading__container').classList.add('loading');
            },
    
            afterLeave() {
            },
    
            once(data) {
            },
    
            beforeEnter(data) {},
            afterEnter(data) {
                setTimeout(() => {
                    initProductPage();
                    document.getElementById('page--loading__container').classList.remove('loading');
                }, 1000);
            }
          }
        ]
    });
}

initProductPage();