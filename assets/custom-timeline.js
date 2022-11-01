// Timeline Scroll Section
// --------------------------------------------------------------
var items = document.querySelectorAll('.timeline-item');
var timelineHeight = document.querySelector('.timeline-wrapper').offsetHeight;
var greyLine = document.querySelector('.tilmeline__default');
var lineToDraw = document.querySelector('.timeline__drawer');

// sets the height that the greyLine (.default-line) should be according to `.timeline ul` height

// run this function only if draw line exists on the page

window.onscroll = function() {
    // Need to constantly get '.draw-line' height to compare against '.default-line'
    var greyLineHeight = greyLine.offsetHeight,
    windowDistance = this.scrollY,
    windowHeight = this.innerHeight / 2,
    timelineDistance = document.querySelector('.timeline-wrapper').offsetTop;
    line = windowDistance - timelineDistance + windowHeight;

    if(windowDistance >= timelineDistance - windowHeight) {

        if(line <= greyLineHeight) {
            lineToDraw.style.height = `${line}px`;
            if (line > 20 && line < (greyLineHeight - 20)) {
                lineToDraw.classList.add('draw-started');
                lineToDraw.classList.remove('draw-ended');
            } else if (line >= (greyLineHeight - 10)) {
                lineToDraw.classList.add('draw-ended');
            } else if (line <= 10) {
                lineToDraw.classList.remove('draw-started');
                lineToDraw.style.height = '0px';
            }
        }
    }

    if (line < 0) {
        lineToDraw.classList.remove('draw-started');
        lineToDraw.classList.remove('draw-ended');
        lineToDraw.style.height = '0px';
    }

    if(line > greyLineHeight) {
        lineToDraw.classList.add('draw-ended');
    }

    // This takes care of adding the class in-view to the li:before items
    var bottom = lineToDraw.offsetTop + lineToDraw.offsetHeight;

    for(var i = 0;i < items.length;i++) {
        var circlePositionTop = items[i].offsetTop;
        var at = 140;
        if(window.innerWidth < 750) {
            at = 20;
        }
        if(bottom > circlePositionTop + at) {
            items[i].classList.add('in-view');
            if(line < 0) {
                items[i].classList.remove('in-view');
            }
        } else {
            items[i].classList.remove('in-view');
        }
    }
};