//common include 
includeHTML();

// gnb
// $(".service-gnb .gnb > li").bind("mouseenter focusin", function() {
// 	$(this).addClass("on").siblings().removeClass("on");
// });
// $(".service-gnb .gnb > li").bind("mouseleave focusout", function() {
// 	$(this).removeClass("on");
// });

// 사업자정보
function comInfo() {
	var element = document.getElementById("com-adr");
	element.classList.toggle("on");
}

// 모바일 하단 바로가기
var lastScrollTop = 0;
var delta = 5;
var fixBox = document.querySelector('.service-gnb-btm');
var fixBoxHeight = fixBox.offsetHeight;
var didScroll;
//스크롤 이벤트 
window.onscroll = function(e) {
	didScroll = true;
};

//0.25초마다 스크롤 여부 체크하여 스크롤 중이면 hasScrolled() 호출
setInterval(function(){
	if(didScroll){
		hasScrolled();
		didScroll = false;
	}
}, 250);

function hasScrolled(){
	var nowScrollTop = window.scrollY;
	if(Math.abs(lastScrollTop - nowScrollTop) <= delta){
		return;
	}
	if(nowScrollTop > lastScrollTop && nowScrollTop > fixBoxHeight){
		//Scroll down
		fixBox.classList.remove('show');
	}else{
		if(nowScrollTop + window.innerHeight < document.body.offsetHeight){
			//Scroll up
			fixBox.classList.add('show');
		}
	}
	lastScrollTop = nowScrollTop;
}


