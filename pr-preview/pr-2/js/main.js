const title = document.querySelector('.features__title')

const swiper = new Swiper('.features-slider', {
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
      const active =
        swiper.slides[swiper.activeIndex]

      title.textContent =
        active.dataset.title

      playActiveVideo(swiper)
    },

    slideChange(swiper) {
      const active =
        swiper.slides[swiper.activeIndex]

        changeContent(title, active.dataset.title)

      playActiveVideo(swiper)
    }
  }
})


function playActiveVideo(swiper) {

  document
    .querySelectorAll('.slide-card video')
    .forEach(video => {

      video.pause()
      video.currentTime = 0

    })

  const activeVideo =
    swiper.slides[swiper.activeIndex]
      .querySelector('video')

  if (activeVideo) {
    activeVideo.play()
  }
}


function changeContent(obj, text) {
    obj.style.opacity = 0;
    setTimeout(() => {
        obj.innerHTML = text
        obj.style.opacity = 1;
    }, 150)
}