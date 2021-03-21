/**
 * addschedule.js
 */




// 전체 일정 보기 버튼 클릭
$(".dayAll").on('click', function(e) {
//	alert('전체일정보기');
	$("#scheduleSection").hide();
	$("#searchSection").hide();
	relayout(); // 지도크기 재조정
	
});


// DAY 리스트 클릭
$(".dayItem").on('click', function(e) {
//	alert('day');
	$("#scheduleSection").show();
	$("#searchSection").show();
	relayout(); // 지도크기 재조정
});



let searchFlag = 0; // 최초 1회 검색이 실행되었는지 판단하는 변수 

// 검색 버튼 클릭시 테마 초기화
$("#searchBtn").on('click', function(e) {
	// 테마 초기화
	$("#searchTheme .image_box").each(function() {
		$(this).css('opacity', '1');
		$(this).css('box-shadow', '2px 2px 2px 2px #cccccc');
	});
	
	$("#themeType").html('전체');
	
	searchFlag = 1; // 최초 1회 검색 동작
});




// 지역 select box 변경시 지역에 맞는 시군구 정보를 불러온다
$("#areaCode").on('change', function(e) {
//	alert($("#areaCode").val());
		
	$.ajax({
    	type: "GET",
    	url: "/naman/schedule/getsigungudata.action",
    	dataType: "JSON",
    	data: "areaCode=" + $("#areaCode").val(),
    	success: function(result) {
//    		console.log(result);
    		
    		// 초기화
			$("#sigunguCode").html(""); 
    		
			//<option value="">시군구 선택</option>
			$("#sigunguCode").append('<option value="">시군구 선택</option>');
    		
			$(result).each(function(index, item) {
				
				let temp = "";
				
				temp += '<option value="'+item.sigungucode +'">'+item.name+'</option>';
//				temp += "<span class='label label-primary tagitem' ";
//				temp += "data-value='" + item.tagseq
//				temp += "'>";
//				temp += item.tagname;
//				temp += "</span>";
				
//				console.log(temp);
				
				$("#sigunguCode").append(temp);
			});
    		
    	},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			console.log("Status: " + textStatus);
			console.log("Error: " + errorThrown);
			console.log(errorThrown);
			console.warn(XMLHttpRequest.responseText);
		}
    })
	
});



// 검색 - 테마 선택시 CSS 변경 + 데이터 호출
$(document).on('click', '#searchTheme .image_box', function() {

	if (searchFlag == 0) return;
	
	$("#searchTheme .image_box").each(function() {
		$(this).css('opacity', '1');
		$(this).css('box-shadow', '2px 2px 2px 2px #cccccc');
	});

	$(this).css('opacity', '0.5');
	$(this).css('box-shadow', '1px 1px 1px 1px #cccccc');
	
//	console.log($(this).data('cat1'));
	let cat1 = $(this).data('cat1')
	getData(1, cat1);
	
	$("#themeType").html($(this).data('theme'));
	
	
});

// 일정DAY 선택 CSS
$(document).on('click', '#dayContent .selectAble', function() {

	$("#dayContent .selectAble").each(function() {
		$(this).removeClass('selected');
	});

	$(this).addClass('selected');
	
});

$(function() {

	let index = 0;
	// 일정 경로
	 $("#scheduleDetail").sortable({
		 revert : true,
		 placeholder : "schedule-placeholder",
		 update: function( event, ui ) {
			 console.log('update');
			 //$("#scheduleDetail").sortable( "refresh" );
		 },
		 change: function( event, ui) {
			 console.log('change');

		 },
//		 over: function( event, ui) {
//
//		 },
		 stop: function( event, ui) {
			 console.log('stop');
			 console.log($(this).children('.img_box'));
			 rearrangeItem(); // 경로 숫자 재설정
			 setScheduleMaker(); // 마커 재생성
			 
			 saveScheduledata(); // 일정정보 저장
		 }
//		 recive: function( event, ui) {
//			 console.log('recive');
//		 },
//		 over: function( event, ui) {
//			 console.log('over');
//		 }
	 });
	 
	 $("#scheduleDetail").droppable({
		 drop: function(event, ui) {
			 if (scheduleInfoList.length >= 9) {
				 console.log('9개 이상 등록 불가');
				 return null;
			 }
		 }
	 });
	 

	// 검색 결과 아이템
	$(document).on('mousedown', '#searchResult .resultItem', function() {
		console.log('드래그 이벤트 등록');

		$(this).draggable({
			connectToSortable : "#scheduleDetail",
			helper : "clone",
			revert : "invalid",
			stop: function( event, ui ) {
//				// 일정 목록은 최대 9개로 제한
//				if (scheduleInfoList.length >= 9) {
//					console.log('9개 이상 등록 불가');
//					console.log($(this));
//				} else {
//					
//				}
			}
		});

	});
	
	
	

	// 검색 결과 아이템 드래그 시작 - 동적 생성된 태그에도 적용
	$(document).on('dragstart', '.resultItem', function(event, ui) {
		console.log('dragstart =======');
//		console.log(event);
//		console.log(ui);
//		console.log(this);
		// console.log(ui.helper.children('.btn_box').hide());
		//        
		$(ui).width("205");
		$(ui).height("90");
		$(ui.helper).children('.btn_box').hide();

	});

	// 검색 결과 아이템 드래그 끝 - 동적 생성된 태그에도 적용
	$(document).on('dragstop', '.resultItem', function(event, ui) {
		// console.log(e.relatedTarget); //null
		console.log('dragstop =======');
//		console.log(this);
//		console.log(ui);


		$(ui.helper).children('.btn_del').show();
		$(ui.helper).children('.img_box').children('.item_number').show();
		
		//$("#scheduleDetail").sortable( "refreshPositions" ); // Refresh the cached positions of the sortable items
		//rearrangeItem(); // 경로 숫자 재설정
		//setScheduleMaker(); // 마커 재생성

	});
	
	// 검색 결과 아이템 드래그 시작
	// $(".resultItem").on("dragstart", function (event, ui) {
	// console.log(event);
	// // console.log(ui.helper.children('.btn_box').hide());
	// console.log(ui);
	// console.log(this);
	//
	// $(ui).width("205");
	// $(ui).height("90");
	// $(ui.helper).children('.btn_box').hide();
	//
	// });

	// 검색 결과 아이템 드래그 끝
	// $(".resultItem").on("dragstop", function (event, ui) {
	// console.log(event)
	// console.log(ui);
	// console.log(this);
	//
	// // $(ui.helper).append('<input type="button" class="deleteScheduleItem"
	// value="삭제">');
	// $(ui.helper).children('.btn_del').show();
	// $(ui.helper).children('.img_box').children('.item_number').show();
	// });

});

// 일정 목록 아이템 클릭 이벤트
$(document).on('click', '#scheduleDetail .resultItem', function(e) {
//	console.log('일정 목록 아이템 클릭 ===');
//	console.log(e.currentTarget);
//	console.log($(e.target).parents('#scheduleDetail').children('.resultItem'));
//	console.log($(e.target).parents('#scheduleDetail').children('.resultItem').data('mapx'));
	
	let mapx;
	let mapy;
	
	
	if ($(e.target).parents('.resultItem').data('mapx') == undefined) {
		mapy = $(e.target).data('mapy');
		mapx = $(e.target).data('mapx');
	} else {
		mapy = $(e.target).parents('.resultItem').data('mapy');
		mapx = $(e.target).parents('.resultItem').data('mapx');
	}
	
	moveMap(mapx, mapy);
	
});


$(document).on('mouseenter', '#scheduleDetail .resultItem', function(e) {
//	console.log('일정 목록 mouseenger ===');
	let mapx;
	let mapy;
	
	if ($(e.target).parents('.resultItem').data('mapx') == undefined) {
		mapy = $(e.target).data('mapy');
		mapx = $(e.target).data('mapx');
	} else {
		mapy = $(e.target).parents('.resultItem').data('mapy');
		mapx = $(e.target).parents('.resultItem').data('mapx');
	}
//	moveMap(mapx, mapy);
});



//일정 목록에 있는 아이템을 삭제
$(document).on('click', '.deleteScheduleItem', function(e) {
	console.log('일정 목록 삭제 ===')
	e.stopPropagation();
	$(e.target).parent().parent().detach();
	
//	$("#scheduleDetail").sortable( "refreshPositions" ); // Refresh the cached positions of the sortable items
	rearrangeItem(); // 경로 숫자 재설정
	setScheduleMaker(); // 마커 재생성
	saveScheduledata(); // 일정정보 저장

});


//function setMovemapEvent() {
//	$("#scheduleDetail .resultItem").off('click');
//	$("#scheduleDetail .resultItem").on('click', function(e) {
//		console.log('일정 목록 아이템 클릭 ===');
////		console.log(e.currentTarget);
//		
//		let mapx = $(e.currentTarget).data('mapx');
//		let mapy = $(e.currentTarget).data('mapy');
//		
//		moveMap(mapx, mapy);
//	});
//}
//
//// 검색 목록에 있는 일정추가
//$(document).on('click', '.addScheduleItem', function(e) {
//	console.log('일정추가 클릭');
//
//	let resultItem = $(e.target).parent().parent().clone();
//	resultItem.children('.btn_box').hide();
//	resultItem.children('.btn_del').show();
//	resultItem.children('.img_box').children('.item_number').show();
//	// resultItem.append('<input type="button" class="deleteScheduleItem"
//	// value="삭제">');
//	resultItem.appendTo('#scheduleDetail');
//	rearrangeItem();
//
//});

// 경로 일정을 재정렬 하는 메서드
function rearrangeItem() {
	$("#scheduleDetail .img_box").each(function(index) {
//		console.log($(this).parent());
		index = index + 1;
		$(this).children('.item_number').text(index);
//		console.log(index);
//		$(this).children('.item_number').attr('name', index);
		
		//$(this).parent().removeAttr('data-index'); // 순서 삭제
		//$(this).parent().attr('data-index', index); // 순서 추가
		
		$(this).parent().attr('id', 'index_'+ index);
		
		$(this).parent().data("index", index);
		//$(this).parent().data("id", 'index_' + index);
	});
}

function saveScheduledata() {
	
	console.log(tripPlanSeq);
	console.log($('#scheduleDetail').children().length);
	let count = $('#scheduleDetail').children().length;
	let title, addr1, img, mapX, mapY, contentId, contentTypeId, planNo, cat1;
	
	let planDay = $('#scheduleDate').children().first().text().substring(3);
	let tripseq = tripPlanSeq;
	let jsonData ='[';
	
	for (let i = 0; i<count ; i++) {
		let item = '';
		
		title = $('#scheduleDetail').children().eq(i).data('title');
		addr1 = $('#scheduleDetail').children().eq(i).data('addr1');
		img = $('#scheduleDetail').children().eq(i).data('firstimage');
		mapX = $('#scheduleDetail').children().eq(i).data('mapx');
		mapY = $('#scheduleDetail').children().eq(i).data('mapy');
		contentId = $('#scheduleDetail').children().eq(i).data('contentid');
		contentTypeId = $('#scheduleDetail').children().eq(i).data('contenttypeid');
		planNo = $('#scheduleDetail').children().eq(i).data('index'); 
		cat1 = $('#scheduleDetail').children().eq(i).data('cat1');


/*		console.log(title);
		console.log(addr1);
		console.log(img);
		console.log(mapX);
		console.log(mapY);
		console.log(contentId);
		console.log(contentTypeId);
		console.log(planDay);
		console.log(planNo);
		console.log(cat1);*/

		item += '{';
		item += 	'\"title\" : \"' + title + '\",';
		item += 	'\"addr1\" : \"' + addr1 + '\",';
		item += 	'\"img\" : \"' + img + '\",';
		item += 	'\"mapX\" : \"' + mapX + '\",';
		item += 	'\"mapY\" : \"' + mapY + '\",';
		item += 	'\"contentId\" : \"' + contentId + '\",';
		item += 	'\"contentTypeId\" : \"' + contentTypeId + '\",';
		item += 	'\"planDay\" : \"' + planDay + '\",';
		item += 	'\"planNo\" : \"' + planNo + '\",';
		item += 	'\"cat1\" : \"' + cat1 +'\"';
		item += 	'\"tripPlanSeq\" : \"' + tripseq +'\"';
		item += '},';
		
		jsonData += item;
	}
	
	jsonData = jsonData.substring(0, (jsonData.length-1));
	
	jsonData += ']';
	
	console.log(jsonData);
	
	$.ajax({
		url : '/naman/schedule/savescheduledata.action',
		type : 'POST',
		traditional: true,
		data : "jsonData=" + jsonData +"&tripPlanSeq="+ tripseq + "&planDay=" + planDay,
		dataType : 'json',
		success : function(data) {
			console.log(data);

		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			console.log("Status: " + textStatus);
			console.log("Error: " + errorThrown);
			console.log(errorThrown);
			console.warn(XMLHttpRequest.responseText);
		}
	});
	
	
	
}



// 관광정보 API
// ===========================================================================================

/*
 * API 데이터 리스트를 받아오는 메서드
 */

// 검색어를 저장해둘 전역변수
let keyword = "";

function getData(number, cate) {
	let searchText = document.getElementById('searchText');
	let content = document.getElementById('searchResult');
	let pagination = document.getElementById('pagination');
	let areaCode = document.getElementById('areaCode');
	let sigunguCode = document.getElementById('sigunguCode');
	let totalCountSpan = document.getElementById('totalCount');
	let cat1;
	
	// 검색어가 있으면 keyword 변수에 검색어를 넣는다
	if (searchText.value != "") {
		keyword = searchText.value;
	}

	content.innerHTML = "";
	pagination.innerHTMl = "";

	if (number == undefined) {
		number = 1;
	}
	
	if (cate == undefined) {
		cat1 = "";
	} else {
		cat1 = cate;
	}

//	console.log('매개변수 number :' + number);

	$
			.ajax({
				url : '/naman/schedule/publicdata.action',
				type : 'GET',
				dataType : 'json',
				// data : 'pageNo='+number,
				// data : 'pageNo='+number+'&keyword='+keyword,
				data : 'pageNo=' + number + '&keyword=' + keyword
						+ '&areaCode=' + areaCode.value + '&cat1='+cat1 + '&sigunguCode=' + sigunguCode.value,
				success : function(data) {
					console.log(data);
					console.log(data.response.body.items.item);
					myItem = data.response.body.items.item;
					itemInfo = data.response.body;
					
					

					// 페이징 관련 변수
					// ==================================================
					var totalCount = itemInfo.totalCount; // 총 게시물 수
					var pageSize = itemInfo.numOfRows; // 한페이지당 출력 개수
					var nowPage = number; // 현재 페이지 번호
//					console.log('nowPage :' + nowPage);
					var totalPage = 0;
					var n = 0;
					var loop = 0;
					var blockSize = 5; // 페이지바 개수

					// ====================================================================

					// console.log(itemInfo);
					// console.log(itemInfo.totalCount);
					// content.innerHTML += '<h2>전체 데이터 수 : ' + totalCount +
					// '</h2>';
					// content.innerHTML += '<h2>목록 글 개수 : ' + pageSize +
					// '</h2>';
					// content.innerHTML += '<h2>현재 페이지 : ' + nowPage + '</h2>';
					
					totalCountSpan.innerHTML = "";
					totalCountSpan.innerHTML = totalCount + '개의 검색결과';

					// 페이징 관련 코드
					// ==================================================
					var pagebar = "";
					totalPage = Math.ceil(totalCount / pageSize);
//					console.log('totalPage :' + totalPage);
					loop = 1;
					n = parseInt((nowPage - 1) / blockSize) * blockSize + 1;
//					console.log(parseInt((nowPage - 1) / blockSize));
//					console.log('n : ' + n);

					// 이전 페이지로 이동
					if (n == 1) {
						pagebar += '<li class="disabled"><a href=\"#!\" aria-label=\"Previous\"><span aria-hidden=\"true\">&laquo;</span></a></li>';

					} else {
						pagebar += '<li><a onclick="getData(' + (n - 1) + ',\'' + cat1 + '\');" aria-label=\"Previous\"><span aria-hidden=\"true\">&laquo;</span></a></li>';
					}

					// 페이지바 코드 동적 생성
					while (!(loop > blockSize || n > totalPage)) {

						if (nowPage == n) {
							pagebar += "<li class='active'>";
						} else {
							pagebar += "<li>";
						}
						pagebar += '<a onclick="getData(' + n + ',\'' + cat1 + '\');">' + n
								+ '</a></li>';

						loop++;
						n++;

					}

					// 다음 10페이지로 이동
					if (n > totalPage) {
						pagebar += '<li class="disabled"><a href=\"#!\" aria-label=\"Previous\"><span aria-hidden=\"true\">&raquo;</span></a></li>';

					} else {
						pagebar += '<li><a onclick="getData('+ n + ',\'' + cat1 + '\');" aria-label=\"Previous\"><span aria-hidden=\"true\">&raquo;</span></a></li>';
					}

					// ===================================================================

//					if (myItem.length = 0) {
//						content.innerHTML += '검색결과가 없습니다';
//						return;
//					}
					
					for (var i = 0; i < myItem.length; i++) {
						var output = '';
						// console.log(myItem.length);
						// output += '<input type="button"
						// class="btnShowDetailCommon" data-toggle="modal"
						// data-target="#detailCommonInfo" data-contentid = "' +
						// myItem[i].contentid + '" data-contenttypeid = "' +
						// myItem[i].contenttypeid + '"value="' + i + '번째
						// 상세보기">';
						// output += '<input type="button" class="btn
						// btn-default" onclick="setMarker('+ myItem[i].mapy +
						// ',' + myItem[i].mapx + ',\'' + myItem[i].title +
						// '\');" value="지도에 표시">';
						// output += '<h4>' + myItem[i].title + '</h4>';
						// output += '<h4>' + myItem[i].addr1 + '</h4>';
						// output += '<h4>' + myItem[i].mapx + '</h4>';
						// output += '<h4>' + myItem[i].mapy + '</h4>';
						// if (myItem[i].firstimage == undefined) {
						// console.log(myItem[i].firstimage);
						// output += '<img
						// src="/naman/resources/images/schedule/noImage.gif">'
						// } else {
						// output += '<img src="' + myItem[i].firstimage + '">'
						// }
						
						
						//onclick="setMarker('+ myItem[i].mapy + ',' + myItem[i].mapx + ',\'' + myItem[i].title + '\');"
						// ======================= 수정본
						// ====================================================
						output += '<div class="resultItem" data-addr1="'+myItem[i].addr1+'" data-mapy="'+myItem[i].mapy+'" data-mapx="'+myItem[i].mapx+'" data-title="'+myItem[i].title+'"'
						output += ' data-contentid="'+myItem[i].contentid+'" data-contenttypeid="'+myItem[i].contenttypeid+'" data-firstimage="'+myItem[i].firstimage+'" data-cat1="'+myItem[i].cat1+'">';
						// onclick="setMarker('+ myItem[i].mapy + ',' +
						// myItem[i].mapx + ',\'' + myItem[i].title + '\');">
						output += '<div class="img_box">';

						if (myItem[i].firstimage == undefined) {
							// console.log(myItem[i].firstimage);
							output += '<img src="/naman/resources/images/schedule/noImage.gif">';
						} else {
							output += '<img src="' + myItem[i].firstimage
									+ '">';
						}
						output += '<div class="item_number" style="display: none;"></div>';
						output += '</div>';
						output += '<div class="content_box">';
						output += '<p class="content_name" ondragstart="return false" onselectstart="return false">' ;
						if (myItem[i].title.length >= 10) {
							output += myItem[i].title.substring(0, 10) + '..';							
						} else {
							output += myItem[i].title;														
						}
						output += '</p>';
						output += '<p class="content_type" ondragstart="return false" onselectstart="return false">'+ codeMap.get(myItem[i].cat1)+'</p>';
						output += '</div>';
						output += '<div class="btn_del" style="display: none;">';
						output += '<span class="glyphicon glyphicon-trash deleteScheduleItem"></span>';
						output += '</div>';
						output += '<div class="btn_box">';
						output += '<input type="button" class="btn btn-default detailCommonBtn" data-toggle="modal" data-target="#detailCommonInfo" value="정보보기">';
						output += '<input type="button" class="btn btn-default addScheduleItem" value="일정추가">';
						output += '</div>';
						output += '</div>';

						content.innerHTML += output;
						
						//data-toggle="modal" data-target="#detailCommonInfo"
						

					}

					pagination.innerHTML = pagebar;
					
					// 마우스 클릭했을때 draggable 이벤트 등록이 되므로
					// ajax의 결과로 동적 태그를 생성한 후에 강제로 해당 태그들에게 클릭 이벤트를
					// 한번씩 발생시켜서 draggable 이벤트를 등록해준다 
//					console.log($("#searchResult .resultItem"));
					$("#searchResult .resultItem").trigger("mousedown");
					
					$("#searchResult .resultItem").on('click', function(e) {
						console.log('div 클릭 이벤트------');
//						console.log(e.currentTarget);
						
//						console.log($(e.currentTarget).data('mapy'));
//						console.log($(e.currentTarget).data('mapx'));
//						console.log($(e.currentTarget).data('title'));
						
						let mapx = $(e.currentTarget).data('mapx') ;
						let mapy = $(e.currentTarget).data('mapy') ;
						let title = $(e.currentTarget).data('title') ;
						let cat1 = $(e.currentTarget).data('cat1') ;

						setMarker(mapy, mapx, title, cat1);
					});
					

					// 검색 목록에 있는 일정추가
					$("#searchResult .addScheduleItem").on('click', function(e) {
						e.stopPropagation();
						
						// 일정 목록은 최대 9개로 제한
						if (scheduleInfoList.length >= 9) {
							console.log('9개 이상 등록 불가');
							return;
						}
						
						console.log('일정추가 클릭------');

						let resultItem = $(e.target).parent().parent().clone();
						resultItem.children('.btn_box').hide();
						resultItem.children('.btn_del').show();
						resultItem.children('.img_box').children('.item_number').show();
						// resultItem.append('<input type="button" class="deleteScheduleItem"
						// value="삭제">');
						resultItem.appendTo('#scheduleDetail');
						
//						$("#scheduleDetail").sortable( "refreshPositions" ); // Refresh the cached positions of the sortable items
						rearrangeItem(); // 경로 숫자 재설정
						setScheduleMaker(); // 마커 재생성
						
						if (selectMarker != null) {
							selectMarker.setMap(null); // 맵에서 마커 초기화
						}
						if (setMarkerIW != undefined) {
							setMarkerIW.close(); // 인포윈도우 초기화
						}
						
						saveScheduledata(); // 일정정보 저장
						
//						moveMap();

					});
					
					// 검색 목록에 있는 정보보기
//					$("#searchResult .detailCommonBtn").on('click', function(e) {
//						e.stopPropagation();
//						console.log('정보보기 클릭------');
//						$('#detailCommonInfo').modal('show')
//						
//						//console.log(e);
//						//console.log($(e.target).parent().parent());
//						//console.log($(e.target).parent().parent().data('title'));
//					});


				},
				error : function(XMLHttpRequest, textStatus, errorThrown) {
					console.log("Status: " + textStatus);
					console.log("Error: " + errorThrown);
					console.log(errorThrown);
					console.warn(XMLHttpRequest.responseText);
				}
			});
	

}


$('#detailCommonInfo').on('show', function (e) {
	e.stopPropagation();
	console('modal show event');
});


$('#detailCommonInfo').on('show.bs.modal', function (e) {
	console.log('call show.bs.modal event');
	//e.stopPropagation(); // 동작 안함..
	console.log('정보보기 클릭------');
	//console.log($(e.relatedTarget).parent().parent().data('contentid'));
	//console.log($(e.relatedTarget).parent().parent().data('contenttypeid'));
	$('#commonInfoTitle').html("");
	$('#commonInfoBody .image').html("");
	$('#commonInfoBody .category').html("");
	$('#commonInfoBody .tel').html("");
	$('#commonInfoBody .overview').html("");
	
	let contentid = $(e.relatedTarget).parent().parent().data('contentid');
	let contenttypeid = $(e.relatedTarget).parent().parent().data('contenttypeid');
	
	$.ajax({
		url : '/naman/schedule/detailcommondata.action',
		type : 'GET',
		//"param1=aaaa&param2=zzzz,
		data : "contentid=" + contentid + "&contenttypeid="+ contenttypeid,
		dataType : 'json',
		success : function(data) {
			console.log(data);
			console.log(data.response.body.items.item);
			let commonData = data.response.body.items.item;
//			let category = commonData.cat1 + ' | ' + commonData.cat2;
			
			let image;
		    if (commonData.firstimage == "undefined") {
		    	image = "/naman/resources/images/schedule/noImage.gif";
		    } else {
		    	image = commonData.firstimage;
		    }

			$('#commonInfoTitle').html(commonData.title);
			$('#commonInfoBody .image').html('<img src="'+image+'">');
//			$('#commonInfoBody .category').append(category);
			$('#commonInfoBody .category').append(commonData.addr1);
			$('#commonInfoBody .tel').append(commonData.tel);
			$('#commonInfoBody .overview').append(commonData.overview);
		}
	});

});

//=====================================================================================================
//=====================================================================================================
//=====================================================================================================
// kakao map
//=====================================================================================================
//=====================================================================================================
//=====================================================================================================

var mapContainer = document.getElementById('map'), // 지도를 표시할 div
mapOption = {
	center : new kakao.maps.LatLng(36.658481, 127.997876), // 지도의 중심좌표
	level : 12 // 지도의 확대 레벨
};

var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

var selectMarker; // 검색 결과 리스트에서 선택했을때 생성하는 마커


// 마커가 표시될 위치입니다
//var markerPosition = new kakao.maps.LatLng(33.450701, 126.570667);

// 마커를 생성합니다 -> 검색의 결과로 생성되는 마커
//var marker = new kakao.maps.Marker({
//	position : markerPosition
//});

// 마커가 지도 위에 표시되도록 설정합니다
//marker.setMap(map);

// 아래 코드는 지도 위의 마커를 제거하는 코드입니다
// marker.setMap(null);


/*
 * 지도 크기를 재정의 하는 메서드
 */
function relayout() {    
    
    // 지도를 표시하는 div 크기를 변경한 이후 지도가 정상적으로 표출되지 않을 수도 있습니다
    // 크기를 변경한 이후에는 반드시  map.relayout 함수를 호출해야 합니다 
    // window의 resize 이벤트에 의한 크기변경은 map.relayout 함수가 자동으로 호출됩니다
    map.relayout();
}


var setMarkerIW; // 인포윈도우 용 변수

/*
 * 지정한 좌표로 이동하고 마커를 생성하는 메서드 
 * @param mapx : x좌표 값 
 * @param mapy : y좌표 값
 */
function setMarker(mapx, mapy, title, category) {
	
	if (selectMarker != null) {
		selectMarker.setMap(null); // 맵에서 마커 초기화
	}
//	console.log(infowindow);
	if (setMarkerIW != undefined) {
		setMarkerIW.close(); // 인포윈도우 초기화
	}

	console.log(category);
	let markerName;
	switch (category) {
	  case 'A02': markerName='camera_marker.png'; break;
	  case 'A01': markerName='leaf_marker.png'; break;
	  case 'A05': markerName='food_marker.png'; break;
	  case 'A04': markerName='shopping_marker.png'; break;
	  case 'A03': markerName='running_marker.png'; break;
	  case 'B02': markerName='hotel_marker.png'; break;
	  default: markerName='camera_marker.png'; 
	    
	}
	let imageSrc = "/naman/resources/images/schedule/marker/basic/" + markerName; 

    // 마커 이미지의 이미지 크기 입니다
    let imageSize = new kakao.maps.Size(38, 48); 
    
    // 마커 이미지를 생성합니다    
    let markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); 
    
//	console.log(mapx);
//	console.log(mapy);
//	console.log(title);
	// 마커가 표시될 위치입니다 (좌표 객체)
	let selectPosition = new kakao.maps.LatLng(mapx, mapy)

	// 마커를 생성합니다
	selectMarker = new kakao.maps.Marker({
		position : selectPosition,
		image : markerImage
	});
	
	// 맵 확대 수정
	map.setLevel(7);
	
	
	// 마커가 지도 위에 표시되도록 설정합니다
	selectMarker.setMap(map);

	// 생성한 마커를 지도의 중심으로 이동
	map.setCenter(selectPosition);

	// 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
	// var iwContent = '<div style="padding:5px;">Hello World! <br><a
	// href="https://map.kakao.com/link/map/Hello World!,33.450701,126.570667"
	// style="color:blue" target="_blank">큰지도보기</a> <a
	// href="https://map.kakao.com/link/to/Hello World!,33.450701,126.570667"
	// style="color:blue" target="_blank">길찾기</a></div>',
	var iwContent = title, iwPosition = selectPosition; // 인포윈도우 표시 위치입니다

	// 인포윈도우를 생성합니다
	setMarkerIW = new kakao.maps.InfoWindow({
		position : iwPosition,
		content : iwContent
	});

	// 마커 위에 인포윈도우를 표시합니다. 두번째 파라미터인 marker를 넣어주지 않으면 지도 위에 표시됩니다
	setMarkerIW.open(map, selectMarker);

}


/*
 * 일정에 추가한 일정의 좌표정보를 가져온다
 */
var scheduleInfoList = []; // 일정 목록의 정보를 담을 배열
var scheduleMarkers = []; // 일정에 추가된 마커 목록
function getSchedulelatlng() {
	

	// scheduleInfoList 초기화	
	scheduleInfoList = [];
	//console.log(scheduleInfoList.length);
	//console.log(scheduleInfoList[0]);
	//console.log(scheduleInfoList);
	
//	console.log($("#scheduleDetail").children());
	let scheduleDetail = $("#scheduleDetail").children();
	
	for (let i = 0; i < scheduleDetail.length; i++) {
//		console.log(scheduleDetail[i]);
		let mapx = $(scheduleDetail[i]).data('mapx');
		let mapy = $(scheduleDetail[i]).data('mapy');
		let title = $(scheduleDetail[i]).data('title');
		let contentid = $(scheduleDetail[i]).data('contentid');
		let contenttypeid = $(scheduleDetail[i]).data('contenttypeid');
		let firstimage = $(scheduleDetail[i]).data('firstimage');
		let index = $(scheduleDetail[i]).data('index');
		let addr1 = $(scheduleDetail[i]).data('addr1');
		let cat1 = $(scheduleDetail[i]).data('cat1');
	
		scheduleInfoList.push(
			{
				latlng: new kakao.maps.LatLng(mapy, mapx),
				title: title,
				contentid : contentid,
				contenttypeid : contenttypeid,
				firstimage : firstimage,
				index : index,
				addr1 : addr1,
				cat1 : cat1
			}
		);
		
		//console.log(scheduleInfoList);

	}
	
	//console.log(scheduleInfoList);
	
}

/*
 * 일정의 좌표정보로 화면에 마커를 생성한다
 * @param scheduleMarker : 좌표값을 가진 배열 
 */
let overlays = [];
let drawLine;
let distanceOverlays = [];
function setScheduleMaker() {
	
	getSchedulelatlng();
	
	// 맵에서 마커 초기화
	if (scheduleMarkers != null) {
		for (let i = 0; i < scheduleMarkers.length; i++) {
			scheduleMarkers[i].setMap(null); 
		}
	}
	
	// 지도에 나타난 선 초기화
	if (drawLine != undefined) {
		drawLine.setMap(null);
	}
	
	// 거리 오버레이 지우기
	if (distanceOverlays.length > 0) {
		for (let i = 0; i < distanceOverlays.length; i++) {
			distanceOverlays[i].setMap(null); // 맵에서 거리정보 초기화
		}
	}
	
	// 맵에 표시할 마커가 없을 경우 처리
	//console.log(scheduleInfoList);
	if (scheduleInfoList.length == 0) {
		moveMapDefault();
		return;
	}
	
	scheduleMarkers = [];
	overlays = [];
	distanceOverlays = [];
	// 지도를 재설정할 범위정보를 가지고 있을 LatLngBounds 객체를 생성합니다
	var bounds = new kakao.maps.LatLngBounds(); 
	var linePath = []; // {시작좌표, 끝좌표}를 저장할 배열
	var lineLine = new daum.maps.Polyline();
	var distance; // 좌표간의 거리
	var lineCenterX; 
	var lineCenterY;
	for (let i = 0; i < scheduleInfoList.length;  i ++) {
		
		let title = scheduleInfoList[i].title;
		let cat1;
		if (cat1 == 'C01') {
			cat1 = 'B01';
		} else {
			cat1 = scheduleInfoList[i].cat1;			
		}
		let index = scheduleInfoList[i].index;
		//console.log(title, cat1, index);
		
		let imageSrc = '/naman/resources/images/schedule/marker/index/'+ cat1 +'/'+ index +'.png';
	    
	    // 마커 이미지의 이미지 크기 입니다
	    let imageSize = new kakao.maps.Size(42, 52); 
	    
	    // 마커 이미지를 생성합니다    
	    let markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); 
	    
	    // 마커를 생성합니다
	    let scheduleMarker = new kakao.maps.Marker({
//	        map: map, // 마커를 표시할 지도
	        position: scheduleInfoList[i].latlng, // 마커를 표시할 위치
//	        title : scheduleInfoList[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
	        image : markerImage // 마커 이미지 
	    });
	    
	    // 마커가 지도 위에 표시되도록 설정합니다
	    scheduleMarker.setMap(map);
	    
	    ///naman/resources/images/schedule/noImage.gif

	    //console.log(scheduleInfoList[i].firstimage);
	    let image;
	    if (scheduleInfoList[i].firstimage == "undefined") {
	    	image = "/naman/resources/images/schedule/noImage.gif";
	    } else {
	    	image = scheduleInfoList[i].firstimage;
	    }
	    
	    
	    // 커스텀 오버레이 
	    var content = '<div class="wrap">' + 
        '    <div class="info">' + 
        '        <div class="title">' +  scheduleInfoList[i].title +
        '            <div class="close" onclick="closeOverlay()" title="닫기" data-index="'+ scheduleInfoList[i].index +'"></div>' + 
        '        </div>' + 
        '        <div class="body" data-contentid = "'+scheduleInfoList[i].contentid+'" data-contenttypeid = "'+scheduleInfoList[i].contenttypeid+'">' + 
        '            <div class="img">' +
        '                <img src="'+ image +'" width="73" height="70">' +
        '           </div>' + 
        '            <div class="desc">' + 
        '                <div class="ellipsis">'+ scheduleInfoList[i].addr1 +'</div>' + 
        '                <div data-toggle="modal" data-target="#detailCommonInfo" class="link">상세보기</div>' + 
        '            </div>' + 
        '        </div>' + 
        '    </div>' +    
        '</div>';
	    
	    var overlay = new kakao.maps.CustomOverlay({
	    	zIndex: 5,
	        content: content,
	        position: scheduleMarker.getPosition()       
	    });
	    
	    // 마커를 클릭했을 때 커스텀 오버레이를 표시합니다
	    kakao.maps.event.addListener(scheduleMarker, 'click', makeOverListener(map, overlay, overlays));
	    	
	    	
	    
	 // 인포윈도우를 표시하는 클로저를 만드는 함수입니다 
	    function makeOverListener(map, overlay, overlays ) {
	        return function() {
//	        	for (let i=0 ; overlays.length ; i++) {
//	        		console.log(overlays[i]);
//		    		overlays[i].setMap(null);
//		    	}
	        	
	        	overlay.setMap(map);
	        };
	    }
	    

	    // 생성한 마커를 배열에 추가
	    scheduleMarkers.push(scheduleMarker);
	    
	    // 생성한 오버레이를 배열에 추가
	    overlays.push(overlay);
	    
	    // LatLngBounds 객체에 좌표를 추가합니다
	    bounds.extend(scheduleInfoList[i].latlng);
	    
	    // 지도에 라인 그리기 =====================================
	    
	    if (i != 0) {
			// 라인을 그릴 좌표 정보를 저장합니다
			linePath.push(scheduleInfoList[i-1].latlng, scheduleInfoList[i].latlng);
//			console.log(scheduleInfoList[i-1].latlng.getLng());
//			console.log(scheduleInfoList[i].latlng.getLng());
//			console.log('중간 좌표값 == ');
//			console.log((scheduleInfoList[i-1].latlng.getLng() + scheduleInfoList[i].latlng.getLng()) / 2);
//			console.log((scheduleInfoList[i-1].latlng.getLat() + scheduleInfoList[i].latlng.getLat()) / 2);
			
			lineCenterX = (scheduleInfoList[i-1].latlng.getLng() + scheduleInfoList[i].latlng.getLng()) / 2 ;
			lineCenterY = (scheduleInfoList[i-1].latlng.getLat() + scheduleInfoList[i].latlng.getLat()) / 2 ;
//			console.log(lineCenterX);
//			console.log(lineCenterY);
			lineLine.setPath(linePath); // 선을 그릴 라인을 세팅합니다
			
			// 거리 정보 그리기 ==================================
			distance = Math.round(lineLine.getLength());
			displayDistance(scheduleInfoList[i].latlng, distance, lineCenterX, lineCenterY);
			
		};

	} // for문 끝
	
	// 맵에 라인 그리기
	drawLine = new daum.maps.Polyline({
		map : map,
		endArrow : true, //화살표 여부
		path : linePath, //폴리라인을 구성하는 좌표의 배열 또는 좌표 배열의 배열
		strokeWeight: 4, //픽셀 단위의 선 두께 (기본값: 3)
	    strokeColor: '#184205', //#xxxxxx 형태의 선 색 (기본값: ‘#F10000’)
	    strokeOpacity: 0.7, //선 불투명도 (0-1) (기본값: 0.6)
	    strokeStyle: 'dashed' //선 스타일 (기본값: ‘solid’)
	});
	
	
	// 지도 범위 재설정 하기
	map.setBounds(bounds);
	
	
	//console.log('scheduleMarkers 배열 ===')
	//console.log(scheduleMarkers);
	//console.log('overlays 배열 ===')
	//console.log(overlays);
}

function displayDistance(position, distance, lineCenterX, lineCenterY) {
	if (distance > 0) {
		
		var distanceOverlay = new daum.maps.CustomOverlay({
			content : '<div class="distanceOverlay"> 거리 <sapn class="distance">' + distance + '</span>m</div>',
			position : new kakao.maps.LatLng(lineCenterY, lineCenterX),
			yAnchor : 1,
			zIndex : 2
		});
		
		distanceOverlays.push(distanceOverlay);
		//console.log('거리값을 나타내는 overlay 배열');
		//console.log(distanceOverlays);

		// 지도에 표시합니다
		distanceOverlay.setMap(map);
	}
}


//커스텀 오버레이 닫기
$(document).on('click', '.wrap .close', function() {
	let overlayIndex = $(this).data('index');
	overlays[overlayIndex-1].setMap(null);
});

/*
 * 지도의 중심을 이동시키는 함수
 * @param mapx : x좌표 값
 * @param mapy : y좌표 값
 */
function moveMap(mapx, mapy) {
    // 이동할 위도 경도 위치를 생성합니다 
    var moveLatLon = new kakao.maps.LatLng(mapy, mapx);
    
    // 지도 중심을 부드럽게 이동시킵니다
    // 만약 이동할 거리가 지도 화면보다 크면 부드러운 효과 없이 이동합니다
    map.panTo(moveLatLon);            
}


/*
 * 지도의 기본 세팅으로 중심을 이동 시킨다
 */
function moveMapDefault() {
	var LatLng = new kakao.maps.LatLng('36.658481', '127.997876');
	map.setLevel(12);
	map.setCenter(LatLng);
}



















