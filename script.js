// =========================
// PRESENTATION ENGINE
// =========================

const slides = document.querySelectorAll(".slide");

const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const fullBtn = document.getElementById("fullscreen");

const counter = document.getElementById("counter");
const progress = document.getElementById("progress");

let current = 0;

// =========================
// SHOW SLIDE
// =========================

function showSlide(index){

    if(index < 0) return;
    if(index >= slides.length) return;

    slides.forEach(slide=>{
        slide.classList.remove("active");
    });

    slides[index].classList.add("active");

    current = index;

    counter.textContent =
        `${current+1} / ${slides.length}`;

    progress.style.width =
        ((current+1)/slides.length*100)+"%";

}

// =========================
// NEXT
// =========================

function nextSlide(){

    if(current < slides.length-1){

        showSlide(current+1);

    }

}

// =========================
// PREVIOUS
// =========================

function prevSlide(){

    if(current>0){

        showSlide(current-1);

    }

}

// =========================
// BUTTON
// =========================

nextBtn.onclick = nextSlide;
prevBtn.onclick = prevSlide;

// =========================
// FULLSCREEN
// =========================

fullBtn.onclick = ()=>{

    if(!document.fullscreenElement){

        document.documentElement.requestFullscreen();

    }else{

        document.exitFullscreen();

    }

};

// =========================
// KEYBOARD
// =========================

document.addEventListener("keydown",(e)=>{

    switch(e.key){

        case "ArrowRight":
        case "PageDown":
        case " ":

            e.preventDefault();

            nextSlide();

        break;

        case "ArrowLeft":
        case "PageUp":

            e.preventDefault();

            prevSlide();

        break;

        case "Home":

            showSlide(0);

        break;

        case "End":

            showSlide(slides.length-1);

        break;

        case "f":
        case "F":

            fullBtn.click();

        break;

    }

});

// =========================
// TOUCH
// =========================

let startX = 0;
let endX = 0;

document.addEventListener("touchstart",(e)=>{

    startX = e.changedTouches[0].clientX;

});

document.addEventListener("touchend",(e)=>{

    endX = e.changedTouches[0].clientX;

    const diff = endX-startX;

    if(diff<-70){

        nextSlide();

    }

    if(diff>70){

        prevSlide();

    }

});

// =========================
// SCALE 1920x1080
// =========================

function scaleSlides(){

    const w = window.innerWidth;
    const h = window.innerHeight;

    const scale = Math.min(

        w/1920,

        h/1080

    );

    document.querySelectorAll(".slide-wrapper")
    .forEach(wrapper=>{

        wrapper.style.transform =
        `scale(${scale})`;

    });

}

window.addEventListener("resize",scaleSlides);

window.addEventListener("load",()=>{

    scaleSlides();

    showSlide(0);

});

// =========================
// MOUSE WHEEL
// =========================

let wheelLock = false;

document.addEventListener("wheel",(e)=>{

    if(wheelLock) return;

    wheelLock = true;

    setTimeout(()=>{

        wheelLock=false;

    },500);

    if(e.deltaY>0){

        nextSlide();

    }else{

        prevSlide();

    }

});
