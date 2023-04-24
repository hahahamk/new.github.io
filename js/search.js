// 상단 검색 온오프
const searchInput = document.querySelector(".search-input .ipt-srch")
const searchModal = document.querySelector(".modal-search")
const moSearchInput = document.querySelector("#MO_SEARCH");

searchInput.addEventListener("click", (event) => {
    searchModal.classList.add("shown")
    moSearchInput.focus()
})
document.addEventListener("click", (e) => {
    const etarget = e.target

    if(etarget.closest(".modal-search") == null && etarget.closest(".search-input") == null){
        searchModal.classList.remove("shown")
        searchInput.value = ""
    }
})


// 상품 목록 APPEND
let productCol = `
    <div class="product-col">
        <!--LIKE -->
        <button type="button" class="toggle-like" onclick="this.classList.toggle("on");" title="Like it!">LIKE</button>

        <a href="#" target="_blank">
            <div class="img-area">	
                <img src="../images/test-thumbnail.png" alt="">
            </div>

            <div class="spec-area">
                <div class="spec_name">BRAND NAME</div>
                <div class="spec_price">
                    <span class="tx_per">30</span>
                    <span class="tx_price">1,234,500</span>
                    <span class="tx_cost">1,456,300</span>
                </div>
                <div class="spec_badge">
                    <span class="badge bk">새벽도착</span><span class="badge">해외배송</span>
                </div>
            </div>
        </a>
    </div>
`
if(document.querySelector("#productList")){
    for(let i=0; i<10; i++) {
        document.querySelector("#productList").insertAdjacentHTML("beforeend", productCol)
    }
}


// 카테고리~할인율 모달 ON/OFF
const modalBtn = document.querySelectorAll(".btn-modal")
const modalFilter = document.querySelectorAll(".modal-filter")
const bottomSheet = document.querySelector(".bottomsheet")
const docBody = document.querySelector("body")
let docWidth = window.innerWidth
let docHeight = window.innerHeight

// 윈도우 너비 체크
function isWindowWidthThan1023(){
    return window.innerWidth > 1023
}

// 바텀 시트 오픈시 스와이퍼 실행
function bottomSheetInit(tabIdx){
    const paginationName = ["카테고리","디자이너","색상","배송","가격","사이즈","할인율"]
    let sheetContHeight; // 바텀시트 컨텐츠 높이 설정
    
    let bottomSwiper = new Swiper(".bottomSwiper", {
        autoHeight: true,
        spaceBetween: 20,
        pagination:{
            el: ".sheet-nav ul",
            clickable: true,
            renderBullet: function (index, className) {
                return '<li class="'+className+'"><button type="button" class="tab">' + paginationName[index] + "</button></li>";
            },
        },
        on: {
            init: function(el){
                const sheetCon = document.querySelector(".sheet-container");
                sheetContHeight = sheetCon.offsetHeight - parseInt(getComputedStyle(sheetCon).paddingTop); // padding 제외

                this.slideTo(tabIdx)
            },
            slideChangeTransitionEnd: function(swipe){
                var activeSlide = this.slides[this.activeIndex];

                if(sheetContHeight > swipe.height){
                    activeSlide.style.height = sheetContHeight + "px";
                    
                    this.update();
                }
            }
        }
    });
}    

modalBtn.forEach((tab, idx)=> {
    tab.addEventListener("click", function(){

        let isWidthThan1023 = isWindowWidthThan1023()
        
        if(isWidthThan1023){ // 1024 이상 레이어 노출
            modalFilter.forEach((modal)=> {
                modal.classList.remove("shown")
            })
    
            modalBtn.forEach((btn)=> {
                btn.parentNode.classList.remove("hover")
            })
            
            modalBtn[idx].parentNode.classList.add("hover")
            modalFilter[idx].classList.add("shown")
        }else{ // 1023 이하 바텀시트 노출
            docBody.classList.add("unscroll")
            bottomSheet.classList.add("is-shown")

            bottomSheetInit(idx)

            if(bottomSheet.classList.contains("is-shown")){
                let dim = bottomSheet.querySelector(".dim")

                dim.addEventListener("click", function(){
                    docBody.classList.remove("unscroll")
                    bottomSheet.classList.remove("is-shown")
                })
            }
        }
    })
})

// 외부클릭 > 모달 OFF
document.addEventListener("click", function (e) {
    const targetElement = e.target
    const isSelect = targetElement.classList.contains("modal-filter") || targetElement.closest(".modal-filter") || targetElement.classList.contains("btn-modal") || targetElement.closest(".btn-modal")
  
    if (isSelect) { 
        return
    }

    modalFilter.forEach(boxElement => {
        modalBtn.forEach((btn)=> {
            btn.parentNode.classList.remove("hover")
        })
        boxElement.classList.remove("shown")
    })
})

