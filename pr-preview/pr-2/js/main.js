/* global Swiper */

const titles = [
  'Индивидуальный подбор фильма',
  'Подбор по настроению',
  'Рекомендации по оценкам',
  'Каталог новинок',
  'Фильмы по жанрам',
  'Случайный фильм',
  'Персональная коллекция'
]

const titleElement = document.querySelector('.features__title')

new Swiper('.features-slider', {
  loop: true,
  centeredSlides: true,
  slidesPerView: 1.3,
  speed: 500,

  autoplay: { delay: 1000, disableOnInteraction: true },

  on: {
    init(swiper) {
      updateTitle(swiper.realIndex)
    },

    slideChange(swiper) {
      updateTitle(swiper.realIndex)
    }
  }
})

function updateTitle(index) {
  titleElement.style.opacity = 0;
    setTimeout(() => {
        titleElement.textContent = titles[index]
        titleElement.style.opacity = 1;
    }, 150)
}