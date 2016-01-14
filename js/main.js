/* global $, ScrollMagic*/
'use strict';


$(function () {

  // init scroll magic
  var controller = new ScrollMagic.Controller();
 
});

$(window).scroll(function() {
   if($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
    	$('.page-header').addClass('no-after');

   }else{
    	$('.page-header').removeClass('no-after');
   }
});