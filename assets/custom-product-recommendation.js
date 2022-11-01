class ProductRecommendations extends HTMLElement {
    constructor() {
        super();

        fetch(this.dataset.url)
        .then(response => response.text())
        .then(text => {
            const html = document.createElement('div');
            html.innerHTML = text;
            const recommendations = html.querySelector('product-recommendations');

            if (recommendations && recommendations.innerHTML.trim().length) {
                this.innerHTML = recommendations.innerHTML;

                this.classList.add('product-recommendations--loaded');

                const wrap = this.querySelector(".embla");
                const viewPort = wrap.querySelector(".embla__viewport");
                const prevBtn = wrap.querySelector(".embla__button--prev");
                const nextBtn = wrap.querySelector(".embla__button--next");
                const dots = this.querySelector(".embla__dots");
                const embla = EmblaCarousel(viewPort, {loop: false, align: 'start', draggable: true, containScroll: "trimSnaps"});

                const generateDotBtns = () => {
                    const template = this.getElementsByClassName("embla-dot-template")[0].innerHTML;
                    dots.innerHTML = embla.scrollSnapList().reduce(acc => acc + template, "");
                    return [].slice.call(dots.querySelectorAll(".embla__dot"));
                };

                const dotsArray = generateDotBtns();

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
                    if (dotsArray[previous]) {
                        dotsArray[previous].classList.remove("is-selected");
                        dotsArray[selected].classList.add("is-selected");
                    }
                };

                setupPrevNextBtns();
                setupDotBtns();

                embla.on("select", selectDotBtn());
                embla.on("select", disablePrevNextBtns());
                embla.on("init", selectDotBtn());
                embla.on("init", disablePrevNextBtns());
            }
        })
        .catch(e => {
            console.error(e);
        });
    }
}

customElements.define('product-recommendations', ProductRecommendations);