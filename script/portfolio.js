var speedup = 1200;
var speeddown = 2000;
var fadein = 700;
$(document).ready(function(){	
	$("div.item").hide();
	$("#content #item-overview a.item").click( function()
	{
		$('html, body').animate({scrollTop:0}, 800);
		$("#content").slideUp(speedup);
		$("#item-overview").hide(speedup);
		$('#' + $(this).attr('title') + '').show(speedup);
		$("#content").slideDown(speeddown);
	});
	/*
	$(".return").click( function()
	{
		$('html, body').animate({scrollTop:0}, 0);
		$("div.item").hide();
		$("#item-overview").show();
	});
	*/
	$(".return").click( function()
	{
		$("div.item").hide();
		$("#item-overview").fadeIn(fadein);
	});
});