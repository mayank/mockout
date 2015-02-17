$(document).ready(function(){

	// tooltip
	$('[data-name="tooltip"]').tooltip({container:'body'})

	
	// view menu details
	$('.view-details').click(function(){
		var child = $(this).children('span')
		var details = $(this).parent().parent().parent().children('.details')
		
		if( child.hasClass('glyphicon-plus') ){
			child.removeClass('glyphicon-plus').addClass('glyphicon-minus')
			details.fadeIn()
		}
		else {
			child.removeClass('glyphicon-minus').addClass('glyphicon-plus')
			details.fadeOut()
		}
	});

})