// 홈TAB <-> TAB CONTENT ONOFF
function tabOnoff(num){
    let tabcontent = document.getElementsByClassName("hometab-content")
    let tabitem = document.getElementsByClassName("tab-item")
  
    for(let i = 0; i<tabcontent.length; i++){
        tabitem[i].classList.remove("on")
        tabitem[num].classList.add("on")
        tabcontent[i].classList.remove("shown")
        tabcontent[num].classList.add("shown")
    }
}

// PC 띠배너 닫기
$("#btnBannerClose").on("click", function(){
    $(this).closest(".band-banner").slideUp();
    bandBanner.destroy();
})

// 띠배너 SWIPER
const bandBanner = new Swiper(".bandSwiper", {
    direction: "vertical",
    loop: true,
    autoHeight: true,
    autoplay: {
        delay: 5000
    },
})

// VISUAL SWIPER
const visualBanner = new Swiper(".visualSwiper", {
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    parallax: true,
    initialSlide: 1,
    autoplay: {
        delay: 3000
    },
    pagination: {
        el: ".swiper-paging",
        type: "fraction",
    },
    navigation: {
        nextEl: ".swiper-next",
        prevEl: ".swiper-prev",
    },
    breakpoints: {
        768: {
            loop: true,
            slidesPerView: 2,
            spaceBetween: 8,
            parallax: false,
            freeMode: true,
        },
        1280: {
            slidesPerView: 3,
            parallax: false,
        }
    },
    on: {
        beforeInit: function(swiper){
            for(let i=0; i<40; i++) {
                // 이미지, 텍스트 넣기 위한 랜덤값
                let inum = Math.floor(Math.random() * 4)+ 1;
                let tnum = Math.floor(Math.random() * 5);

                let text = [
                    {tit : "나를 더 빛나게 할<br>컨템포러리 쥬얼리", sub : "TILLY SVEAAS ALLIGHIERI 등 23개 브랜드<br>최대 45% 할인 + 8만원 할인쿠폰"},
                    {tit : "편하고 귀여운", sub : "2TILLY SVEAAS ALLIGHIERI 등 23개 브랜드<br>최대 45% 할인 + 8만원 할인쿠폰"},
                    {tit : "심플함의 미학, <br>MARGARET HOWEL", sub : "N21 ∙ SEE BY CHLOE ∙ ZIMMERMAN"},
                    {tit : "해변에서도 <br>가벼운 여름 슈즈", sub : "2023 FW 뉴 컬렉션 입고"},
                    {tit : "그래픽 디테일이 돋보이는<br>간절기 니트 스타일링", sub : "N21 ∙ SEE BY CHLOE ∙ ZIMMERMAN"},
                ]
                
                swiper.appendSlide([`
                    <div class="swiper-slide">
                        <a href="#" class="btn-visual">
                            <div class="img-block">
                                <img src="https://d2zjlxn1rmjreq.cloudfront.net/assets/images/testonly/test-visual@720x720-0${inum}.png" alt="">
                            </div>
                            <p class="txt-block">
                                <span class="tx_tit" data-swiper-parallax="-300" data-swiper-parallax-duration="500">${text[tnum].tit}</span>
                                <span class="tx_sub" data-swiper-parallax="-300" data-swiper-parallax-duration="700">${text[tnum].sub}</span>
                            </p>
                        </a>
                    </div>
                `])
            }
        }
    }
})

// 혜택 배너
const benefitBanner = new Swiper(".bandBannerSwiper", {
    loop: true,
    pagination: {
        el: ".swiper-bullets",
        clickable: true,
    },
    autoplay: {
        delay: 3000
    },
})

// 테마 상품
const themeList = new Swiper(".grid3x10Swiper", {
    // 767 이하일 때,
    slidesPerView: 3.36,
    freeMode: true,
    loop: false,
    spaceBetween: 8,
    grid: {
        fill: 'row',
        rows: 3,
    },
    breakpoints: {
        768: {// 768 이상일 때,
            slidesPerView: 7.36,
        }
    },
    on: {
        init: function(swiper){},
        beforeInit: function(swiper){
            for(let i=0; i<30; i++) {
                swiper.appendSlide([`
                    <div class="swiper-slide">
                        <a href="#" class="theme-item"><img src="../images/test-thumbnail.png" alt="" /></a>
                    </div>
                `])
            }
        }
    }
})

const grid2x4List = new Swiper(".grid2x4Swiper", {
    // 767 이하일 때,
    slidesPerView: 2,
    freeMode: true,
    loop: false,
    spaceBetween: 8,
    grid: {
        fill: 'row',
        rows: 2,
    },
    pagination: {
        el: ".swiper-bullets",
        clickable: true,
    },
    breakpoints: {
        768: { // 768 이상일 때,
            slidesPerView: 4,
            pagination: false,
        }
    },
    on: {
        init: function(swiper){},
        beforeInit: function(swiper){
            for(let i=0; i<8; i++) {
                swiper.appendSlide([`
                    <div class="swiper-slide">
                        <a href="#" class="img-area">	
                            <img src="../images/test-thumbnail.png" alt="">
                            <button type="button" class="toggle-like" onclick="this.classList.toggle('on'); return false;" title="Like it!">LIKE</button>
                        </a>
                    </div>
                `])
            }
        }
    }
})

const grid1x6List = new Swiper(".grid1x6Swiper", {
    // 767 이하일 때,
    slidesPerView: 1.9,
    freeMode: true,
    loop: false,
    spaceBetween: 8,
    pagination: {
        el: ".swiper-bullets",
        clickable: true,
    },
    breakpoints: {
        768: { // 768 이상일 때,
            slidesPerView: 6,
        }
    },
    on: {
        init: function(swiper){},
        beforeInit: function(swiper){
            for(let i=0; i<6; i++) {
                swiper.appendSlide([`
                    <div class="swiper-slide">
                        <div class="img-area">										
                            <a href="#"><img src="https://d2zjlxn1rmjreq.cloudfront.net/assets/images/home/desinger-img0${i+1}.png" alt=""></a>
                        </div>
                        <div class="brand-name">
                            <div class="brand-eng">JACQUEMUS</div>
                            <div class="brand-kor">바움 운드 페르드가르텐</div>
                        </div>
                    </div>
                `])
            }
        }
    }
})

const grid1x4List = new Swiper(".grid1x4Swiper", {
    slidesPerView: 1,
    freeMode: true,
    loop: false,
    spaceBetween: 8,
    pagination: {
        el: ".swiper-bullets",
        clickable: true,
    },
    on: {
        init: function(swiper){},
        beforeInit: function(swiper){
            for(let i=0; i<4; i++) {
                swiper.appendSlide([`
                    <div class="swiper-slide">
                        <div class="img-group">
                            <div class="img-area">
                                <a href="#"><img src="https://d2zjlxn1rmjreq.cloudfront.net/assets/images/home/magazine-img0${i+1}.png" alt="매거진 브랜드"></a>
                            </div>
                            <div class="img-area">
                                <a href="#"><img src="https://d2zjlxn1rmjreq.cloudfront.net/assets/images/home/magazine-img0${i+1}.png" alt="매거진 브랜드"></a>
                            </div>
                            <div class="img-area">
                                <a href="#"><img src="https://d2zjlxn1rmjreq.cloudfront.net/assets/images/home/magazine-img0${i+1}.png" alt="매거진 브랜드"></a>
                            </div>
                            <div class="img-area">
                                <a href="#"><img src="https://d2zjlxn1rmjreq.cloudfront.net/assets/images/home/magazine-img0${i+1}.png" alt="매거진 브랜드"></a>
                            </div>
                        </div>
                    </div>
                `])
            }
        }
    }
})

// 랭킹
const rankingChip = new Swiper(".rankingChipSwiper", {
    slidesPerView: 'auto',
    //centeredSlides: true,
    spaceBetween: 8,
    freeMode: true,
    watchSlidesProgress: true,
})

const rankingList = new Swiper(".rankingSwiper", {
    slidesPerView: 1,
    spaceBetween: 16,
    pagination: {
        el: ".ranking .swiper-bullets",
        clickable: true,
        type: "bullets",
    },
    navigation: {
        nextEl: ".ranking .related-paging .btn_next",
        prevEl: ".ranking .related-paging .btn_prev",
    },
    thumbs: {
        swiper: rankingChip,
    },
    on: {
        init: function(swiper){},
        beforeInit: function(swiper){
            for(let i=0; i<5; i++) {
                swiper.appendSlide(rankingMarkup())
            }
        }
    }
})
// 랭킹 목록 HTML
function rankingMarkup(){
    let html = "";

    html += "<div class=\"swiper-slide rankinglist-row\">"
        for(i=1; i<10; i++){
    html += "   <div class=\"rankinglist-col\">"
    html += "       <i class=\"num-rank\">"+i+"</i>"
    html += "       <div class=\"img-area\">"
    html += "           <a href=\"#\"><img src=\"https://d2zjlxn1rmjreq.cloudfront.net/assets/images/testonly/test-thumbnail.png\" alt=\"\"></a>"
    html += "       </div>"
    html += "       <div class=\"spec-area\">"
    html += "           <div class=\"spec_name\">BRAND NAME</div>"
    html += "           <div class=\"spec_price\">"
    html += "               <span class=\"tx_per\">30</span>"
    html += "               <span class=\"tx_price\">1,234,500</span>"
    html += "           </div>"
    html += "           <div class=\"spec_badge\">"
    html += "               <span class=\"badge bk\">새벽도착</span><span class=\"badge\">해외배송</span>"
    html += "           </div>"
    html += "       </div>"
    html += "   </div>"
        }
    html += "</div>"
        
    return html
}


// 기획전 LI APPEND
for(let i=1; i<=6; i++){
    $(".exlist-row").append([`
        <li class="exlist-col">
            <div class="img-area">										
                <a href="#"><img src="https://d2zjlxn1rmjreq.cloudfront.net/assets/images/testonly/test-thumbnail.png" alt=""></a>
            </div>
            <div class="spec-area">
                <div class="spec_name">JUNYA WATANABE MAN XXXX NEW BALANCE</div>
                <div class="spec_price">
                    <span class="tx_per">30</span>
                    <span class="tx_price">1,234,500</span>
                </div>
                <div class="spec_badge">
                    <span class="badge bk">새벽도착</span><span class="badge">해외배송</span>
                </div>
            </div>
        </li>
    `])
}
