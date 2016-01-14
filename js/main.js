/* global $, ScrollMagic*/
'use strict';


$(function () {

  // init scroll magic
  var controller = new ScrollMagic.Controller();

  var scene = new ScrollMagic.Scene({triggerElement: "#trigger"})
          // trigger a velocity opaticy animation
          .setVelocity(".page-header:after", {opacity: 0}, {duration: 100})
          .addTo(controller);  
});