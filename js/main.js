// main.js
/* global Swiper */

const titleElement = document.querySelector('.features__title')
let currentTitle = ''
let isTransitioning = false

new Swiper('.features-slider', {
  centeredSlides: true,
  slidesPerView: 1.3,
  loop: true,
  speed: 500,
  grabCursor: true,
  spaceBetween: 5,

  autoplay: {
    delay: 5000,
    disableOnInteraction: false
  },

  breakpoints: {
    768: {
      slidesPerView: 2
    }
  },

  on: {
    init(swiper) {
      updateActiveSlideContent(swiper)
    },

    slideChangeTransitionStart() {
      isTransitioning = true
    },

    slideChangeTransitionEnd(swiper) {
      updateActiveSlideContent(swiper)
      isTransitioning = false
    },
    
    slideChange(swiper) {
      setTimeout(() => {
        if (!isTransitioning) {
          updateActiveSlideContent(swiper)
        }
      }, 50)
    }
  }
})

function updateActiveSlideContent(swiper) {
  const realIndex = swiper.realIndex
  

  let activeSlide = null
  
  for (let i = 0; i < swiper.slides.length; i++) {
    const slide = swiper.slides[i]
    if (!slide.classList.contains('swiper-slide-duplicate') && 
        slide.swiperSlideIndex === realIndex) {
      activeSlide = slide
      break
    }
  }
  
  if (!activeSlide && swiper.slides[realIndex]) {
    activeSlide = swiper.slides[realIndex]
  }
  
  if (activeSlide && activeSlide.dataset.title && activeSlide.dataset.title !== currentTitle) {
    currentTitle = activeSlide.dataset.title
    changeContent(titleElement, currentTitle)
  }
  
  document.querySelectorAll('.slide-card video').forEach(video => {
    video.pause()
    video.currentTime = 0
  })
  
  if (activeSlide) {
    const video = activeSlide.querySelector('video')
    if (video) {
      video.play().catch(e => console.log('Video play error:', e))
    }
  }
}

function changeContent(element, newText) {
  if (element.textContent === newText) return
  
  element.style.opacity = '0'
  setTimeout(() => {
    element.textContent = newText
    element.style.opacity = '1'
  }, 150)
}