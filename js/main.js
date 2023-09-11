/*
 * Brandon HTML Template
 * Copyright 2016, Filip Greksa
 * www.filipgreksa.com
 * 2016/07/23
 */

/*global $, jQuery*/

$(document).foundation();

$(window).load(function () {
	"use strict";
	
	setTimeout(function () {
		$('.preloader').fadeOut(700);
	}, 1000);
	
	$('form').each(function () {
		this.reset();
	});
});

$(document).ready(function () {
	"use strict";
	
	// ----------------------------
	// Progressbar
	// ----------------------------
	$('.progress').appear(function () {
		$(this).each(function () {
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
	
	// -----------------------------
	// Counters
	// -----------------------------
	$('.number').appear(function () {
		$('.number').countTo();
	});
	
	// ----------------------------
	// masonry
	// ----------------------------
	$(function () {
		var $container = $('.masonry');
		// init
		$container.imagesLoaded(function () {
			$container.isotope({
				itemSelector: ".item",
				percentPosition: true,
				masonry: {
					columnWidth: ".grid-sizer"
				}
			});
		});
		
		// filter items when filter link is clicked
		$('#filter').on('click', 'a', function () {
			var selector = $(this).attr('data-filter');
			$container.isotope({ filter: selector });
			return false;
		});
	});
	
	// ----------------------------
	// filter buttons
	// ----------------------------
	var buttonGroup = [];
	// change is-checked class on buttons
	$('.filter').each(function (i, buttonGroup) {
        var $buttonGroup = $(buttonGroup);
        $buttonGroup.on('click', 'a', function () {
            $buttonGroup.find('.is-checked').removeClass('is-checked');
            $(this).addClass('is-checked');
        });
    });
	
	// -----------------------------
    // Slick
    // -----------------------------
	
    // Customers Quotes
    $('.slick-slider.quotes-slider').slick({
        slide: 'ul>li',
        autoplay: true,
        autoplaySpeed: 5000,
        slidesToShow: 1,
        //adaptiveHeight: true,
        arrows: false,
        dots: true
    });
	
	// Default - used for slider in post.html, shortcodes.html
    $('.slick-slider.simple-slider').slick({
        slide: 'ul>li',
        slidesToShow: 1,
        adaptiveHeight: true,
        arrows: true,
        dots: true
    });
	
	// -----------------------------
    // Ripple
    // -----------------------------
	$('.button, .top-bar .menu li a').ripple({
		color: 'rgba(0, 0, 0, 0.14)',
		time: '.5s'
	});
	
	// -----------------------------
    // Label Floating
    // -----------------------------
	$(function () {
				
		// Function to update labels of text fields
		var updateTextFields,
			validate_field,
			input_selector = 'input[type=text], input[type=password], input[type=email], input[type=url], input[type=tel], input[type=number], input[type=search], textarea';
		
		updateTextFields = function () {
			var t = $(this).closest('.form-group');
			$(input_selector).each(function (index, element) {
				if ($(element).val() > 0 || element.autofocus || $(this).attr('placeholder') !== undefined) {
					t.addClass('focused');
				} else {
					t.removeClass('focused');
				}
			});
		};
		
		// Add active on focus
		$(document).on('focus', input_selector, function () {
			$(this).closest('.form-group').addClass('focused');
		});
		// Remove active on blur
		$(document).on('blur', input_selector, function () {
			if ($(this).val().length === 0 && $(this).attr('placeholder') === undefined) {
				$(this).closest('.form-group').removeClass('focused');
			} else {
				$(this).closest('.form-group').addClass('focused');
			}
		});
		
	});
	
	// -----------------------------
	// Magnific Popup
	// -----------------------------
	$('.ajax-link').magnificPopup({
		type: 'ajax',
		midClick: false,
		alignTop: true,
		closeBtnInside: true,
		showCloseBtn: false,
		preloader: true,
		modal: true,
		gallery: {
			enabled: true,
			arrowMarkup: '',
			preload: [1, 2]
		},
		callbacks: {
			ajaxContentAdded: function (data) {
				$('.share-menu').html(data).foundation();
				// Slider in popup
				$('.slick-slider.simple-slider').slick({
					slide: 'ul>li',
					arrows: true
				});
			},
			buildControls: function () {
				var magnificPopup = $.magnificPopup.instance;
				$('body').on('click', '.mdi-chevron-left', function () {
					magnificPopup.prev();
				});
				$('body').on('click', '.mdi-chevron-right', function () {
					magnificPopup.next();
				});
				$('body').on('click', '.mdi-close', function (e) {
					e.preventDefault();
					$.magnificPopup.close();
				});
			}
		}
	});
	
	// -----------------------------
	// Smooth Scroll
	// -----------------------------
	$('.top-bar li a, a[data-scroll=smooth]').bind('click', function (event) {
		var $anchor = $(this),
			scrollTo = $($anchor.attr('href')).offset().top;
		$('html, body').stop().animate({
			scrollTop: scrollTo
		}, 1500, 'swing');
		event.preventDefault();
	});
	
	// -----------------------------
	// Twitter
	// -----------------------------
	$(function () {
		$(".twitter-feed").tweet({
			join_text: "auto",
			username: ["CreativeMarket"],
			modpath: "php/twitter/",
			count: 6,
			//avatar_size: "42px",
			retweets: false,
			loading_text: "loading ...",
			template: "{text}{time}{user}",//{avatar}
			auto_join_text_default: " ", //We said,
			auto_join_text_ed: " ", //We 
			auto_join_text_ing: " ", //We were 
			auto_join_text_reply: " ", //We replied
			auto_join_text_url: " " //We were checking out 
		});
		
		//Carousel for tweets
		$('.tweet_list').slick({
			fade: true,
			slide: 'ul>li',
			autoplay: true,
			autoplaySpeed: 5000,
			pauseOnHover: false,
			arrows: false,
			adaptiveHeight: false
		});
	});
	
	// -----------------------------
	// Filter to Dropdown on small devices
	// ----------------------------
	// Create the dropdown base
	$("<label><select />").appendTo(".filter");
	// Populate dropdown with menu items
	$("#filter a").each(function () {
		var el = $(this);
		$("<option />", {
			"data-filter"   : el.attr("data-filter"),
			"text"    : el.text()
		}).appendTo(".filter select");
	});
	// To make dropdown actually work
	$(".filter select").change(function () {
		var selector = $(".filter select option:selected").attr('data-filter');
		$('.masonry').isotope({ filter: selector });
		return false;
	});
	
	
	// -----------------------------
	// Leave Comment fadeToggle
	// -----------------------------
	$("#comment-fade").click(function () {
		$("#reply-form").fadeToggle();
	});
	
});
