//common include 
includeHTML();

//modal layer
var openbtn= document.querySelectorAll(".open-modal");
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




var lnbUI = {
  clickE: function(target, speed) {
      // var _self = this;
      var $target = $(target);
      // _self.speed = speed || 300;
      
      $target.each(function() {
          if($(this).find('> ul').length > 0) {
              return true;
          }
          $(this).addClass('noDepth');
      });
      
      $target.on('click', 'a', function() {
      
          var $this = $(this);
          var $depthTarget = $this.next(); // ul
          var $siblings = $this.parent().siblings(); // li
          
          if(!$this.parent('li').hasClass('noDepth')) {
              
               $this.parent('li').find('ul li').removeClass('on');
              $siblings.removeClass('on');

    $this.parent('li').find('ul').slideUp();
              $siblings.find('ul').slideUp();
    
              if($depthTarget.css('display') == 'none') {
                  $depthTarget.slideDown();
                  $this.parent().addClass('on');
              } else {
                  $depthTarget.slideUp();
                  $this.parent().removeClass('on');
              }
          } else {
            console.log('noDepth');
          }
          return false;
      });            
  }
 
}            

lnbUI.clickE('.lnb li', 300);
