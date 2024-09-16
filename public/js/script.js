$(document).ready(function(){
	// $(document).mouseup(function(e) 
	// {
	// 	var container = $("#nav-check");
	// 	console.log(e.target);
	// 	if (!container.is(e.target) && container.has(e.target).length === 0) 
	// 	{
	// 		container.prop('checked', false);
	// 	}

	// 	if(container.checked)
	// 	{
	// 		container.prop('checked', false);
	// 	}
	// });
  $('.bf-testimonial-slick').slick({
		pauseOnHover: true,
		autoplay: false,
		autoplayspeed: 2000,
		speed: 1000,
		centerMode: true,
		centerPadding: '0%',
		slidesToShow: 3,
		slidesToScroll: 1,
		arrows: true,
		dots: true,
		draggable:true,
		responsive: [{
			breakpoint: 1001,
			settings: {
				slidesToShow: 1,
			}
		}]
    
  });
});