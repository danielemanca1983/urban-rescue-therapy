// Adding flickity slider to the hero section

$('.home-slider').flickity({
  prevNextButtons: false,
  contain: true,
  autoPlay: true
});

// Mobile Menu
$('.navicon').on('click',function(event){
	event.preventDefault();

	$('.main-navigation').toggleClass('open-menu');
	$('#hamburger').toggleClass('open-menu');
	$('body').toggleClass('no-scroll');
});