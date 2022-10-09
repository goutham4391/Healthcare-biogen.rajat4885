$(document).ready(function() {
  $('html').on('click', '.overlayCloseBtn', function(e){
	 if( $('.video-card__story-text-cta a').length>0){
		  $('.video-card__story-text-cta a').removeClass('youtube-check');
	  }

})
 });