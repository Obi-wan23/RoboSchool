// Слайдер с учителями
const swiper = new Swiper('.swiper', {
  navigation: {
    nextEl: '.swiper-button-right',
    prevEl: '.swiper-button-left',
  },
	pagination: {
		el: ".swiper-pagination",
		type: "progressbar",
	},
	breakpoints: {
		320: {
			slidesPerView: "auto",
			spaceBetween: -80,
			loop:true,
		},
		768: {
			spaceBetween: 40,
			slidesPerView: 4,
		}
	}
});
//Плавный скрол к якорям
const anchors = document.querySelectorAll('a[href*="#"]')
for (let anchor of anchors) {
  anchor.addEventListener('click', function (event) {
    event.preventDefault()
    const blockID = anchor.getAttribute('href').substring(1)
    document.getElementById(blockID).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  })
}
// Модальные окна
let windows = document.querySelectorAll("*[data-modal-btn]")
for (let i = 0; i < windows.length; i++) {
	windows[i].addEventListener('click', function() {
		let name = windows[i].getAttribute('data-modal-btn')
		let modal = document.querySelector("[data-modal-window='"+name+"']")
		modal.style.opacity = '1'
		modal.style.visibility ='visible'
		let close = modal.querySelector(".close-btn")
		close.addEventListener('click', function(){
			modal.style.opacity = '0'
			modal.style.visibility ='hidden'
		})
	})
}
window.onclick = function (e) {
	if(e.target.hasAttribute('data-modal-window')) {
		let modals = document.querySelectorAll('*[data-modal-window]')
		for (let i = 0; i < modals.length; i++) {
			modals[i].style.opacity = '0'
			modals[i].style.visibility ='hidden'
		}
	}
}
//Табы
document.querySelectorAll('.tabs').forEach((elem) => {
	let tabsBtn = elem.querySelectorAll('.tabs__btn')
	let tabsContent = elem.querySelectorAll('.tabs__content')
	for (let i = 0; i< tabsBtn.length; i ++) {
		tabsBtn[0].click()
		tabsBtn[i].onclick = () => {
			tabsBtn.forEach((elem) => {elem.classList.remove('tabs__btn_active')})
			tabsContent.forEach((elem) => {elem.classList.remove('tabs__content_active')})
			tabsBtn[i].classList.add('tabs__btn_active')
			tabsContent[i].classList.add('tabs__content_active')
		}
	}
})
// Бургер-кнопка
const navMenu = document.querySelector('.header__nav')
const burgerBtn = document.querySelector('.burger-btn')
const body = document.body;
if (navMenu && burgerBtn) {
	burgerBtn.addEventListener('click', () => {
		navMenu.classList.toggle('active')
		burgerBtn.classList.toggle('active')
		body.classList.toggle('lock')
	})

	navMenu.querySelectorAll('.header__link').forEach(link => {
		link.addEventListener('click', () => {
			navMenu.classList.remove('active')
			burgerBtn.classList.remove('active')
			body.classList.remove('lock')
		})
	})
}
