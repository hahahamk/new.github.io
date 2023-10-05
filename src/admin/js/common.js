        let modalLayout;

        function showModalLayer(title, url, large) {
			if (!modalLayout) {
				modalLayout = $(`
					<div id="modalLayout" class="modal-layer" style="z-index: 999">
						<div class="modal-content">
							<h2 id="modalTitle">비밀번호 변경</h2>
							<button class="btn-close close-modal" onclick="hideModalLayer()">닫기</button>
							<div id="modalContents" class="login-content"></div>
						</div>
					</div>`);
				$(document.body).append(modalLayout);
			}

			if (large) {
				$("#modalLayout").addClass("large-type");
			} else {
				$("#modalLayout").removeClass("large-type");
			}

			$("#modalLayout #modalTitle").html(title);
			$("#modalLayout #modalContents").load(url);
			modalLayout.show();
        }

        function hideModalLayer() {
            $("#modalLayout #modalTitle").html("");
            $("#modalLayout #modalContents").html("");
            modalLayout.hide();
        }
		
        function downloadXlsx(tableElement, fileName) {
            var wb = XLSX.utils.table_to_book(tableElement);
            XLSX.writeFile(wb, fileName + ".xlsx");
        }

        function alertError(e) {
            if (!e) {
                alert("에러가 발생했습니다.");
            } else if (e.responseJSON && e.responseJSON.message) {
                alert(e.responseJSON.message);
            } else if (e.responseText) {
				alert(e.status + ": " + e.responseText);
			} else {
                alert(e.status + ": 알 수 없는 에러가 발생했습니다.")
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


    function directExcelDownload(url, param) {
        // 엑셀다운로드 파라메터 추가
        param += '&isExcelDownload=Y';

        $.ajax({
            type: 'GET',
            url: url,
            data: param,
            headers: {
                'accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            },
            xhrFields: {
                responseType: 'arraybuffer'
            }
        }).done(function (data, textStatus, xhr) {
            const filename = getFilename(xhr.getResponseHeader('content-disposition'));
            const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');

            link.href = url;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            setTimeout(function() {
                window.URL.revokeObjectURL(url);
                document.body.removeChild(link);
            }, 0);
        }).fail(alertError);
    }

    function getFilename(header) {
        if (header) {
            const regex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
            const matches = regex.exec(header);
            if (matches != null && matches[1]) {
                return decodeURIComponent(matches[1].replace(/['"]/g, ''));
            }
        }
        return '';
    }

    //ajax 업로드
    function uploadFile(url, inputId, successFunction) {
        let file = document.getElementById(inputId).files[0];
        let formData = new FormData();
        formData.append("file", file);

        $.ajax({
            url: url,
            type: "POST",
            data: formData,
            dataType: "json",
            contentType: false,
            processData: false
        }).done(function (result) {
            if (successFunction) {
                successFunction(result);
            } else {
                alert("업로드 완료했습니다.");
            }
        }).fail(alertError);
    }
	
function setPeriod(startDateId, endDateId, expression) {
	const startDate = $("#" + startDateId);
	const endDate = $("#" + endDateId);

	if(expression === "X") {
		startDate.val("");
		endDate.val("")
	}

	if(!/\d+[DWM]/.test(expression)) {
		alert("단위 표현이 맞지 않습니다.");
		return;
	}

	const number = expression.substring(0, expression.length - 1);
	const unit = expression.substring(expression.length - 1, expression.length);
	const date = new Date();
	endDate.val(date.toISOString().substring(0, 10));

	switch (unit) {
		case "D":
			date.setDate(date.getDate() - number);
			break;
		case "W":
			date.setDate(date.getDate() - number * 7);
			break;
		case "M":
			date.setMonth(date.getMonth() - number);
			break;
	}

	startDate.val(date.toISOString().substring(0, 10));
}

    /*
     * start와 end 로 시작하는 date 필드 기본 설정
     * 한달전 ~ 현재날자 자동 설정
     */
    function defaultDate() {
        const startDay = new Date(new Date().setMonth(new Date().getMonth()-1)).toISOString().slice(0, 10)
        const today = new Date().toISOString().slice(0, 10);

        $("input[type=date][id^='start']").val(startDay);
        $("input[type=date][id^='end']").val(today);
    }


    function globalDefaultGridSetting(id) {
        var gridCount = $("#" + id).find("li").length;
        if ( gridCount == 0 ) {
            alert("grid table no setting");
            return;
        } else if (_global_grid._gridData == "undefined") {
            alert("javascript gridData not found");
            return;
        }

        _global_grid._gridHeader[id] = new Array();
        _global_grid._gridData[id] = new Array();

        $("#" + id).find("li").each(function(index, item){
            var header = {name: $(this).data("name"), id:$(this).data("id")};
            var columnId = $(this).data("id");
            _global_grid._gridHeader[id].push(header);
            _global_grid._gridData[id].push(columnId);
        });
        // 내부 li 삭제
        $("#" + id).html("");
    }

    function isEmpty(value){
        if( value == "" || value == null || value == undefined || ( value != null && typeof value == "object" && !Object.keys(value).length ) ){
            return true
        }else{
            return false
        }
    }