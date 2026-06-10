/* global Swiper */

const titleElement = document.querySelector('.features__title')

new Swiper('.features-slider', {
  centeredSlides: true,
  slidesPerView: 1.3,
  loop: true,
  loopAdditionalSlides: 3,
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
      updateContent(swiper)
    },

    slideChangeTransitionEnd(swiper) {
      updateContent(swiper)
    }
  }
})

function updateContent(swiper) {
  const activeSlide = swiper.slides[swiper.activeIndex]

  if (!activeSlide) return

  const title = activeSlide.dataset.title || ''

  setTitle(title)

  stopAllVideos()

  const video = activeSlide.querySelector('video')

  if (video) {
    video.currentTime = 0

    video.play().catch(() => {})
  }
}

function stopAllVideos() {
  document.querySelectorAll('.slide-card video').forEach(video => {
    video.pause()
    video.currentTime = 0
  })
}

function setTitle(text) {
  if (titleElement.dataset.current === text) return

  titleElement.dataset.current = text

  titleElement.classList.add('is-hidden')

  setTimeout(() => {
    titleElement.textContent = text
    titleElement.classList.remove('is-hidden')
  }, 150)
}