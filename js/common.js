//common include 
includeHTML();
 
// 사업자정보
function comInfo() {
	var element = document.getElementById("com-adr");
	element.classList.toggle("on");
}

$(function(){	
	$(".service-gnb .gnb > li").bind("mouseenter focusin", function() {
		$(this).addClass("on").siblings().removeClass("on");
	});
	$(".service-gnb .gnb > li").bind("mouseleave focusout", function() {
		$(this).removeClass("on");
	});
})