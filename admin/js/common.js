function downloadXlsx(tableElement, fileName) {
  var wb = XLSX.utils.table_to_book(tableElement);
  XLSX.writeFile(wb, fileName + ".xlsx");
}

function alertError(e) {
  if (!e) {
      alert("에러가 발생했습니다.");
  } else if (!e.responseText) {
      alert("알 수 없는 에러가 발생했습니다.")
  } else {
      alert(e.responseJSON.message);
  }
}

function logout() {
  $.ajax("/admin/login", {
      method: "delete",
      dataType: "json"
  }).done(function (data) {
      location.href = "/admin/login";
  }).fail(alertError);
}

$(function () {
  //modal layer
  var openbtn = $(".open-modal");
  var closebtn = $(".close-modal");

  // modal show
  $(openbtn).on("click", function(e){
    var target = $(this).attr("href");

    $(target).show();
    e.preventDefault();
  })

  // modal hide
  $(closebtn).on("click", function(e){
    var target = $(this).closest(".modal-layer");

    $(target).hide();
    e.preventDefault();
  })

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
      } else {
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
      clickE: function (target, speed) {
          // var _self = this;
          var $target = $(target);
          // _self.speed = speed || 300;

          $target.each(function () {
              if ($(this).find('> ul').length > 0) {
                  return true;
              }
              $(this).addClass('noDepth');
          });

          $target.on('click', 'a', function () {

              var $this = $(this);
              var $depthTarget = $this.next(); // ul
              var $siblings = $this.parent().siblings(); // li

              if (!$this.parent('li').hasClass('noDepth')) {

                  $this.parent('li').find('ul li').removeClass('on');
                  $siblings.removeClass('on');

                  $this.parent('li').find('ul').slideUp();
                  $siblings.find('ul').slideUp();

                  if ($depthTarget.css('display') == 'none') {
                      $depthTarget.slideDown();
                      $this.parent().addClass('on');
                  } else {
                      $depthTarget.slideUp();
                      $this.parent().removeClass('on');
                  }
                  return false;
              } else {
                  return true;
              }
          });
      }
  }

  lnbUI.clickE('.lnb li', 300);
  lnbUI.clickE('.sub-aside li', 300);
});
