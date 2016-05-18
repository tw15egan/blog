var navIcon = document.querySelector('#nav-toggle');

var navList = document.querySelector('#nav-content');

navIcon.addEventListener('click', function() {
  this.classList.toggle('active');
  navList.classList.toggle('active');
})

console.log('hi');