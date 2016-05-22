var navIcon = document.querySelector('#nav-toggle');

var navList = document.querySelector('#nav-content');

navIcon.addEventListener('click', function(e) {
  e.preventDefault();
  if (navList.classList.contains('active')) {
    this.classList.remove('active');
    navList.classList.remove('active');
    navList.classList.remove('toggle__content--scroll');
    navList.classList.remove('toggle__content--mobile');
  } else {
    this.classList.add('active');
    navList.classList.add('active');
    if (window.scrollY > 80) {
      navList.classList.add('toggle__content--scroll');
    } else {
      navList.classList.add('toggle__content--mobile');
    }
  }
  
  
})

var mainHeader = document.querySelector('#main-header');
var socialList = document.querySelector('#social-list');
var stickyNav = document.querySelector('#nav-toggle > span');
var stickyNav = document.querySelector('#nav-toggle');


window.addEventListener('scroll', function(e) {
  if (window.innerWidth < 800) {
    if (window.scrollY > 80) {
      navList.classList.add('.toggle__content--active');
      mainHeader.classList.add('main-header--active');
      socialList.classList.add('social-list--active');
      stickyNav.classList.add('sticky-nav');
    } else {
      navList.classList.remove('.toggle__content--active');
      navIcon.classList.remove('active');
      navList.classList.remove('active');
      navList.classList.remove('toggle__content--scroll');
      navList.classList.remove('toggle__content--mobile');
      mainHeader.classList.remove('main-header--active');
      socialList.classList.remove('social-list--active');
      stickyNav.classList.remove('sticky-nav');
    }
  }
})
