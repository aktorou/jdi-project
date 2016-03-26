$(document).foundation();


jQuery.noConflict();
(function( $ ) {
  // $(function() {
    
  // });

  $(document).on('click', '.toggle-nav', function(e){
    var $btn = $(this),
        $nav = $('nav');
    $nav.toggleClass('open');
  });
})(jQuery);