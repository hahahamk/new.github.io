// 상단 검색 온오프
const searchInput = document.querySelector(".search-input .ipt-srch")
const searchModal = document.querySelector(".modal-search")
const moSearchInput = document.querySelector("#MO_SEARCH");
/*
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
}) */


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

/***************************************
 * 필터 바텀시트 JS
 * ***************************************/

// 카테고리~할인율 모달 ON/OFF
const modalBtn = document.querySelectorAll(".btn-modal")
const modalFilter = document.querySelectorAll(".modal-filter")
const bottomFilter = document.querySelector(".bottom-filter")
const docBody = document.querySelector("body")
let docWidth = window.innerWidth
let docHeight = window.innerHeight

// 윈도우 너비 체크
function isWindowWidthThan1023(){
    return window.innerWidth > 1023
}

// 필터 바텀시트 스와이프 NAVIGATION
let bottomFilterNav = new Swiper(".filterNavSwiper", {
    autoHeight: true,
    spaceBetween: 0,
    slidesPerView: 'auto',
    freeMode: true,
    watchSlidesProgress: true,
    slideToClickedSlide: true,
})
// 필터 바텀시트 스와이프 CONTENT
let bottomFilterCont = new Swiper(".filterContSwiper", {
    autoHeight: true,
    spaceBetween: 0,
    slidesPerView: 1,
    thumbs: {
        swiper: bottomFilterNav,
    },
    observer: true,
    observeParents: true,
    slideToClickedSlide: true,
})
// 필터 바텀시트 내부 세로 스와이프
let verticalSwiperY = new Swiper(".verticalSwiperY", {
    direction: "vertical",
    spaceBetween: 0,
    slidesPerView: 'auto',
    freeMode: true,
    observer: true,
    observeParents: true,
    mousewheel: true,
})

// 바텀 시트 오픈시 스와이퍼 실행
function bottomFilterInit(tabIdx){
    bottomFilterNav.update()
    bottomFilterCont.update()

    bottomFilterCont.slideTo(tabIdx)

    // 카테고리 확장/비확장 시, 필터 컨텐츠 스와이퍼 update 해주세요!!!
    const expandItem = $(".category-list .expand-item")

    $(expandItem).on("click", function(e){
        const parentLI = $(this).closest("li")

        if(!parentLI.hasClass("active")){
            parentLI.addClass("active")
        }else{
            parentLI.removeClass("active")
        }

        // 스와이퍼 내부 높이 변할 때 꼭  UPDATE!
        bottomFilterCont.update();
        e.preventDefault()
    })

    $(window).on("resize", function(){
        // 스와이퍼 내부 높이 변할 때 꼭  UPDATE!
        bottomFilterCont.update()
    })
}    

// 필터 탭 클릭시, 1023기준으로 모달 또는 바텀시트 오픈 
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
            bottomFilter.classList.add("is-shown")

            // 바텀시트 오픈 시 해당 탭으로 이동
            bottomFilterInit(idx)

            if(bottomFilter.classList.contains("is-shown")){
                let dim = bottomFilter.querySelector(".dim")

                dim.addEventListener("click", function(){
                    docBody.classList.remove("unscroll")
                    bottomFilter.classList.remove("is-shown")
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

