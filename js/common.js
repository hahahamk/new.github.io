//common include 
includeHTML();

// gnb
$(".service-gnb .gnb > li").bind("mouseenter focusin", function() {
	$(this).addClass("on").siblings().removeClass("on");
});
$(".service-gnb .gnb > li").bind("mouseleave focusout", function() {
	$(this).removeClass("on");
});