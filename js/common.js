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

const $ = document.querySelector.bind(document)
const sheetContents = sheet.querySelector(".lycontents")
const draggableArea = sheet.querySelector(".draggable-area")
let sheetHeight // in vh

const setSheetHeight = (value) => {
  sheetHeight = Math.max(0, Math.min(100, value))
  sheetContents.style.height = `${sheetHeight}vh`

  if (sheetHeight === 100) {
    sheetContents.classList.add("fullscreen")
  } else {
    sheetContents.classList.remove("fullscreen")
  }
}

const setIsSheetShown = (isShown) => {
  sheet.setAttribute("aria-hidden", String(!isShown))
}

// Hide the sheet when clicking the background
sheet.querySelector(".dim").addEventListener("click", () => {
  setIsSheetShown(false)
})

const isFocused = element => document.activeElement === element

// Hide the sheet when pressing Escape if the target element
// is not an input field
window.addEventListener("keyup", (event) => {
  const isSheetElementFocused =
    sheet.contains(event.target) && isFocused(event.target)

  if (event.key === "Escape" && !isSheetElementFocused) {
    setIsSheetShown(false)
  }
})

const touchPosition = (event) =>
  event.touches ? event.touches[0] : event

let dragPosition

const onDragStart = (event) => {
  dragPosition = touchPosition(event).pageY
  sheetContents.classList.add("not-selectable")
  draggableArea.style.cursor = document.body.style.cursor = "grabbing"
}

const onDragMove = (event) => {
  if (dragPosition === undefined) return

  const y = touchPosition(event).pageY
  const deltaY = dragPosition - y
  const deltaHeight = deltaY / window.innerHeight * 100

  setSheetHeight(sheetHeight + deltaHeight)
  dragPosition = y
}

const onDragEnd = () => {
  dragPosition = undefined
  sheetContents.classList.remove("not-selectable")
  draggableArea.style.cursor = document.body.style.cursor = ""

  if (sheetHeight < 25) {
    setIsSheetShown(false)
  } else if (sheetHeight > 75) {
    setSheetHeight(100)
  } else {
    setSheetHeight(50)
  }
}

draggableArea.addEventListener("mousedown", onDragStart)
draggableArea.addEventListener("touchstart", onDragStart)

window.addEventListener("mousemove", onDragMove)
window.addEventListener("touchmove", onDragMove)

window.addEventListener("mouseup", onDragEnd)
window.addEventListener("touchend", onDragEnd)
