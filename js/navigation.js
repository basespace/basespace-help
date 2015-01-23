  $('body').scrollspy({
    target: '.bs-docs-sidebar',
    offset: 240
  });

  $('.menu-box').click(function() {
  	$( this ).toggleClass("menu-box-selected");
  	$('.vertical-line').toggleClass("vertical-line-toggle");
  	$('#sidenav').slideToggle("fast");
  });

 