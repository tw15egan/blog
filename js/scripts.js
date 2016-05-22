var navIcon = document.querySelector('#nav-toggle');

var navList = document.querySelector('#nav-content');

navIcon.addEventListener('click', function(e) {
  e.preventDefault();
  this.classList.toggle('active');
  navList.classList.toggle('active');
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
      mainHeader.classList.remove('main-header--active');
      socialList.classList.remove('social-list--active');
      stickyNav.classList.remove('sticky-nav');
    }
  }
})
