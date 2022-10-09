$(window).on('load',function(){
    if (window.location.href.indexOf("?globalsites") > -1) {  
      $('.header.js-header.fixed-top').toggleClass('headertop');
      $(this).toggleClass('is-active');
      $('.js-header').toggleClass('is-open');
      $('.js-menu').toggleClass('is-open');
      $('.js-tabs-caption #Global-Websites').addClass('is-active').siblings().removeClass('is-active');
      $('.description .description-title#Global-Websites').parent().addClass('is-active').siblings().removeClass('is-active');
    }
});