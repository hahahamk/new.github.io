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
var fixHead = document.querySelector('.header-sub');
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
    fixHead.classList.add('sa-attached');
		fixBox.classList.remove('show');
	}else{
		if(nowScrollTop + window.innerHeight < document.body.offsetHeight){
			//Scroll up
			fixBox.classList.add('show');
		}
	}
    console.log(nowScrollTop)
    if(nowScrollTop < fixHead.offsetHeight){
        fixHead.classList.remove('sa-attached');
    }
	lastScrollTop = nowScrollTop;
}

// vh 높이 버그 계산
const vh = window.innerHeight * 0.01;   // [1]
document.documentElement.style.setProperty('--vh', `${vh}px`); // [2]

window.addEventListener('resize', () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
});

//modal layer
/* var openbtn= document.querySelectorAll(".open-modal");
var modals = document.querySelectorAll(".modal-layer");
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
} */
// modal 공통 jquery로 변경
$(function(){
  //init 
  commonModal()
})

function commonModal(){
  let btnModal = $(".open-modal")
  let modalLayer = $(".modal-layer")

  btnModal.on("click", function(e){
      let target = $(this).attr("href")

      $(target).show()
  })
  modalLayer.on("click", function(e){
      let closeBtn = e.target.classList.contains("close-modal")

      if(e.target == this || closeBtn) {
          $(this).hide()
      }
  })
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

// event listener
accordionBtn.forEach(function (el) {
    el.addEventListener('click', toggleAccordion)
});

// function
function toggleAccordion(el) {
   var targetText = el.currentTarget.nextElementSibling.classList;
   var target = el.currentTarget;
   
   if (targetText.contains('show')) {
       targetText.remove('show');
       target.classList.remove('active');
   } 
   else {
      accordionBtn.forEach(function (el) {
         el.classList.remove('active');
         
         allTexts.forEach(function (el) {
            el.classList.remove('show');
         })
      })
         targetText.add('show');
         target.classList.add('active');
   }  
}

//custom selectbox
const selectBoxElements = document.querySelectorAll(".custom-select");

function toggleSelectBox(selectBox) {
  selectBox.classList.toggle("active");
}

function selectOption(optionElement) {
  const selectBox = optionElement.closest(".custom-select");
  const selectedElement = selectBox.querySelector(".selected-value");
  selectedElement.textContent = optionElement.textContent;
}

selectBoxElements.forEach(selectBoxElement => {
  selectBoxElement.addEventListener("click", function (e) {
    const targetElement = e.target;
    const isOptionElement = targetElement.classList.contains("option");

    if (isOptionElement) {
      selectOption(targetElement);
    }

    toggleSelectBox(selectBoxElement);
  });
});

document.addEventListener("click", function (e) {
  const targetElement = e.target;
  const isSelect = targetElement.classList.contains("custom-select") || targetElement.closest(".custom-select");

  if (isSelect) {
    return;
  }

  const allSelectBoxElements = document.querySelectorAll(".custom-select");

  allSelectBoxElements.forEach(boxElement => {
    boxElement.classList.remove("active");
  });
});

// TAB <-> TAB CONTENT ONOFF
function tabOnoff(num){
  let tabcontent = document.getElementsByClassName("tab-content")
  let tabitem = document.getElementsByClassName("tab-item")

  for(let i = 0; i<tabcontent.length; i++){
    tabitem[i].classList.remove("on")
    tabitem[num].classList.add("on")
    tabcontent[i].classList.remove("shown")
    tabcontent[num].classList.add("shown")
  }
}

//이미지첨부 샘플
var loadFile = function(event) {
  var output = document.getElementById('output');
  output.src = URL.createObjectURL(event.target.files[0]);
  output.onload = function() {
    URL.revokeObjectURL(output.src) // free memory
  }
};