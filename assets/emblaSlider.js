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
    };

    setupPrevNextBtns();
    setupDotBtns();

    embla.on("select", selectDotBtn());
    embla.on("select", disablePrevNextBtns());
    embla.on("init", selectDotBtn());
    embla.on("init", disablePrevNextBtns());
});
document.body.classList.remove('slider--loading');