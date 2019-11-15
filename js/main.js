/*
 * Lelande HTML5 Template, v1.1
 * Copyright 2016, Filip Greksa
 * www.filipgreksa.com
 * 10/24/2016
 */

/*global $, jQuery*/

$(document).foundation();

$(window).on('load', function () {
	"use strict";
	
	setTimeout(function () {
		$('.preloader').fadeOut("slow");
	}, 1000);
	
	$('form').each(function () {
		this.reset();
	});
});

$(document).ready(function () {
	"use strict";
	
	// ----------------------------
	// Topbar border on scroll
	// ----------------------------
	$(function () {
		var navbar = $('.top-bar');
		$(window).scroll(function () {
			if (navbar.offset().top > 25) {
				navbar.addClass("has-border");
			} else {
				navbar.removeClass("has-border");
			}
		});
	});
	
	// ----------------------------
	// Right Menu
	// ----------------------------
	$(".menu-button, .nav-cover, .nav-close").on("click", function (e) {
		e.preventDefault();
		$("body").toggleClass("nav-opened nav-closed");
		$(".menu-button").toggleClass("mdi-menu mdi-close");
	});
	
	// ----------------------------
	// Masonry
	// ----------------------------
	$(function () {
		var $container = $('.masonry');
		$container.imagesLoaded(function () {
			$container.masonry({
				itemSelector: ".item",
				columnWidth: ".grid-sizer",
				percentPosition: true
			});
		});
	});
	
	// ----------------------------
	// Change opacity for Item in Viewport
	// ----------------------------
	$('.work-item').inViewport();
	
	// ----------------------------
	// Slick Slider
	// ----------------------------	
	$(".brands").slick({
		slide: 'ul>li',
		slidesToShow: 5,
		slidesToScroll: 3,
		autoplay: true,
        autoplaySpeed: 5000,
		pauseOnFocus: false,
		pauseOnHover: false,
		touchThreshold: 20,
		responsive: [
			{
				breakpoint: 640,
				settings: {
					slidesToShow: 5,
					slidesToScroll: 3
				}
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1
				}
			}
		]
	});
	
	// ----------------------------
	// Progressbar
	// ----------------------------
	$('.progress').inViewport(function () {
		$('.progress').each(function () {
			var value = $(this).attr('aria-valuenow');
			$(this).find('.progress-meter').animate({
				'width': value + '%'
			}, 2000);
			$(this).find('.progress-count').prop("Counter", 0).animate({
				Counter: value,
				'width': value + '%'
			}, {
				duration: 2000,
				step: function (now) {
					$(this).text(Math.ceil(now));
				}
			});
		});
	});
	
	// ----------------------------
	// Chocolat lightbox
	// ----------------------------
	$('.project').Chocolat();
	
	// ----------------------------
	// Create thumbs as background
	// used in blog - recent posts
	// ----------------------------
	$(".post-thumb").each(function () {
		$(this).imgTrigger();
	});
	
	

	
}); // documentReady end

// function inViewport: check if element is in viewport
(function ($) {
	"use strict";
	$.fn.inViewport = function (callbackFnk) {
		var $animation_elements = $(this),
			$window = $(window),
			inView;
		
		function check_if_in_view() {
			var window_height = $window.height(),
				window_top_position = $window.scrollTop(),
				window_bottom_position = (window_top_position + window_height);
			
			$.each($animation_elements, function () {
				var $element = $(this),
					element_height = $element.outerHeight(),
					element_top_position = $element.offset().top,
					element_bottom_position = (element_top_position + element_height);
				
				//check to see if this current container is within viewport
				if ((element_bottom_position >= window_top_position) &&	(element_top_position <= window_bottom_position)) {
					$element.addClass('in-view');
					// fire callback but only once
					if (typeof callbackFnk === 'function') {
						callbackFnk.call(this);
						callbackFnk = false;
					}
				} else {
					$element.removeClass('in-view');
				}
			});
			
		}
		
		$window.on('scroll resize', check_if_in_view).trigger('scroll');
		
	};
}(jQuery));

// function imgTrigger: change image to centered background for item,div,figure,...(his parent) with defined size (width, height)
(function ($) {
	"use strict";
    $.fn.imgTrigger = function () {
		var imgSrc = $(this).children('img').attr('src');
		
        $(this).css('background', 'url("' + imgSrc + '")');
        $(this).children('img').hide();
        $(this).css({
			'background-repeat': 'no-repeat',
			'background-attachment': 'scroll',
			'background-position': '50% 0%',
			'background-color': '#fff',
			'background-size': 'cover'
		});
    };
}(jQuery));