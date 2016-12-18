/* global $, ScrollMagic*/
'use strict';
/**
 * This script demonstrates how to sign the user in and how to sign it out.
 */
$(function () {
 
  //init scroll magic
  var controller = new ScrollMagic.Controller();

});

/* this part of code was taken from project - https://github.com/algolia/instantsearch.js
 * gh-pages branch, and creating a buautiful space animation via three.js
 */

document.addEventListener('DOMContentLoaded', function(){
  var threeScript = document.createElement('script');
  threeScript.src = 'js/three.min.js';
  threeScript.addEventListener('load', function(){
    var $space = document.querySelector('#space');
    var rand = new PRNG();

    var radiusScene = 10000;
    var scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 1/radiusScene);

    var renderer = new THREE.WebGLRenderer({ alpha: true });
    var camera = new THREE.PerspectiveCamera( 55, .66, 0.1, radiusScene * 10 );

    var setSize = function setSize() {
      var width = window.innerWidth;
      var height = window.innerHeight;
      var aspect = width / height;
      camera.aspect = aspect;
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    setSize();
    window.addEventListener('resize', setSize);

    $space.appendChild(renderer.domElement);

    var particles = new THREE.Geometry();
    var sphere = new THREE.Sphere(new THREE.Vector3(0,0,0), radiusScene);
    var rand1 = function() {
      return rand.nextRange(-radiusScene, radiusScene);
    };

    for (var i = 0; i < 30000; i++ ){
      var p = new THREE.Vector3(rand1(), rand1(), rand1());
      p = sphere.clampPoint(p);
      particles.vertices.push(p);
    }

    var pMaterial = new THREE.PointsMaterial({
      color: 0xFFFFFF,
      size: 1,
      sizeAttenuation: false,
      alphaTest: 0.5,
      transparent: true,
      blending: THREE.AdditiveBlending
    });
    var particleSystem = new THREE.Points(particles, pMaterial);

    scene.add(particleSystem);

    camera.position.z = -1500;
    camera.position.y = 1500;

    camera.rotation.x = -Math.PI / 2 + 0.5;

    var epsilon = 0.001;
    var timelineMap = function(x) {
      var res = x;
      if (x > 200) res += 30 * Math.max((Math.min(x, 800) - 200), 0);
      if (x > 1100) res += 30 * Math.max((Math.min(x, 1700) - 1100), 0);
      if (x > 2000) res += 30 * Math.max((Math.min(x, 2600) - 2000), 0);
      return res / 100;/// 100;
    };
    var currentTSpring = 0;
    var previousTSping = null;
    var render = function () {
      requestAnimationFrame( render );

      var dt = timelineMap(window.scrollY);

      currentTSpring += (dt - currentTSpring) / 10;
      if ((dt + epsilon) > currentTSpring && (dt - epsilon) < currentTSpring) currentTSpring = dt;

      if (previousTSping === currentTSpring) return;
      previousTSping = currentTSpring;

      var angle = currentTSpring/60;

      particleSystem.rotation.y = -angle;
      renderer.render(scene, camera);
    };

    render();
    $space.className = 'loaded';
  });
  document.body.appendChild(threeScript);
});

$(window).scroll(function() {
   if($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
    	$('.page-header').addClass('no-after');

   }else{
    	$('.page-header').removeClass('no-after');
   }
});

