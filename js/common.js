//common include 
includeHTML();

// 사업자정보
function comInfo() {
	var btmadr = document.querySelector('.com-adr');
	var btmbtn = document.querySelector('.menu-list .info');
	btmadr.classList.toggle("on");
	btmbtn.classList.toggle("on");
}

// 사업자정보
function catego() {
	var mcate = document.querySelector('.service-gnb-btm .btm-cate');
	var mcatelist = document.querySelector('.mw-category');
	mcatelist.classList.add("on");
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

//modal layer
var openbtn= document.querySelectorAll(".open-modal");
var modals = document.querySelectorAll('.modal-layer');
var closebtn = document.getElementsByClassName("close-modal");

for (var i = 0; i < openbtn.length; i++) {
    openbtn[i].onclick = function (e) {
        e.preventDefault();
        modal = document.querySelector(e.target.getAttribute("href"));
        modal.style.display = "block";
    }
    
    closebtn[i].onclick = function () {
        for (var index in modals) {
            if (typeof modals[index].style !== 'undefined') modals[index].style.display = "none";
        }
    }
}

// close
window.onclick = function (event) {
    if (event.target.classList.contains('modal-layer')) {
        for (var index in modals) {
            if (typeof modals[index].style !== 'undefined') modals[index].style.display = "none";
        }
    }
}

//search
function openSearch() {
	document.querySelector('.search-area').style.display = "block";
}
function closeSearch() {
	document.querySelector('.search-area').style.display = "none";
}

function searchRank() {
	var btmadr = document.querySelector('.rank-more');
	var btmbtn = document.querySelector('.ranking');
	btmadr.classList.toggle("on");
	btmbtn.classList.toggle("on");
}

// faq, 공지사항 아코디언메뉴
var accordionBtn = document.querySelectorAll('.accordion .summary');
var allTexts = document.querySelectorAll('.details');
var accIcon = document.querySelectorAll('.expandIcon');

// event listener
accordionBtn.forEach(function (el) {
    el.addEventListener('click', toggleAccordion)
});

// function
function toggleAccordion(el) {
   var targetText = el.currentTarget.nextElementSibling.classList;
   var targetAccIcon = el.currentTarget.children[0];
   var target = el.currentTarget;
   
   if (targetText.contains('show')) {
       targetText.remove('show');
       targetAccIcon.classList.remove('anime');
       target.classList.remove('active');
   } 
   else {
      accordionBtn.forEach(function (el) {
         el.classList.remove('active');
         
         allTexts.forEach(function (el) {
            el.classList.remove('show');
         })
         
         accIcon.forEach(function (el) {
          el.classList.remove('anime');
         }) 
         
      })
         targetText.add('show');
         target.classList.add('active');
         targetAccIcon.classList.add('anime');
   }  
}