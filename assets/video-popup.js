// POST commands to YouTube or Vimeo API
function postMessageToPlayer(player, command){
  if (player == null || command == null) return;
  player.contentWindow.postMessage(JSON.stringify(command), "*");
}

function playPauseVideo(currentSlide, control){
  var slideType, player, video;

  // slideType = currentSlide.getAttribute('')
  slideType = currentSlide.classList[1];
  player = currentSlide.querySelector('iframe');
  video = currentSlide.querySelector('video');

  if (slideType === "vimeo") {
    switch (control) {
      case "play":
        if (!currentSlide.classList.contains('started')) {
          currentSlide.classList.add('started');
          postMessageToPlayer(player, {
            "method": "setCurrentTime",
            "value" : 1
          });
        }
        postMessageToPlayer(player, {
          "method": "play",
          "value" : 1
        });
        break;
      case "pause":
        postMessageToPlayer(player, {
          "method": "pause",
          "value": 1
        });
        break;
    }
  } else if (slideType === "youtube") {
    switch (control) {
      case "play":
        postMessageToPlayer(player, {
          "event": "command",
          "func": "mute"
        });
        postMessageToPlayer(player, {
          "event": "command",
          "func": "playVideo"
        });
        break;
      case "pause":
        postMessageToPlayer(player, {
          "event": "command",
          "func": "pauseVideo"
        });
        break;
    }
  } else if (slideType === "video") {
    if (video != null) {
      if (control === "play"){
        video.play();
      } else {
        video.pause();
      }
    }
  }
}

var isFirst = true;
var emblaSlider = document.querySelector('.video-popup-slider');

const wrap = emblaSlider.querySelector(".embla");
const viewPort = wrap.querySelector(".embla__viewport");
const prevBtn = wrap.querySelector(".embla__button--prev");
const nextBtn = wrap.querySelector(".embla__button--next");
const dots = emblaSlider.querySelector(".embla__dots");
const embla = EmblaCarousel(viewPort, { loop: false, align: 'center' });

const generateDotBtns = () => {
  const template = emblaSlider.getElementsByClassName("embla-dot-template")[0].innerHTML;
  dots.innerHTML = embla.scrollSnapList().reduce(acc => acc + template, "");
  return [].slice.call(dots.querySelectorAll(".embla__dot"));
};

const dotsArray = generateDotBtns();
const emblaArray = emblaSlider.querySelectorAll('.embla__slide');

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
  emblaArray[previous].classList.remove("is-selected");
  emblaArray[selected].classList.add("is-selected");

  if(!isFirst) {
    playPauseVideo(emblaArray[previous], "pause");
    playPauseVideo(emblaArray[selected], "play");
  }
};

setupPrevNextBtns();
setupDotBtns();

embla.on("select", selectDotBtn());
embla.on("select", disablePrevNextBtns());
embla.on("init", selectDotBtn());
embla.on("init", disablePrevNextBtns());

const playButtons = document.querySelectorAll('.video-slider-list__video-item--play a');
const playImages = document.querySelectorAll('.video-slider-list__video-item--image');
for(var i = 0;i < playButtons.length;i++) {
  const index = i;
  playButtons[i].addEventListener('click', function(e){
    e.preventDefault();
    dotsArray[index].click();
    if (isFirst) {
      isFirst = false;
      playPauseVideo(emblaArray[index], "play");
    }
    document.querySelector('.video-popup').classList.add('opening');
  });
}

for(var i = 0;i < playImages.length;i++) {
  const index = i;
  playImages[i].addEventListener('click', function(e){
    e.preventDefault();
    dotsArray[index].click();
    if (isFirst) {
      isFirst = false;
      playPauseVideo(emblaArray[index], "play");
    }
    document.querySelector('.video-popup').classList.add('opening');
  });
}

document.querySelector('.video-popup-container .close-button').addEventListener('click', function(e){
  e.preventDefault();
  document.querySelector('.video-popup').classList.remove('opening');
  emblaArray.forEach(item=>{
    playPauseVideo(item, "pause");
  });
});