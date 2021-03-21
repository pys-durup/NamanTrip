// kakao map *****************************************************************
var mapContainer = document.getElementById('map'), // 지도를 표시할 div
mapOption = {
    center : new kakao.maps.LatLng(36.658481, 127.997876), // 지도의 중심좌표
    level : 12 // 지도의 확대 레벨
};

var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다


//sideNav 세팅
setSideNav();

/*//초기 지도 세팅
clearMap();
getSchedulelatlng(1); // 좌표 정보 배열에 담기 + 마커그리기
*/

function changeXY(mapX, mapY){
	// 좌표 객체
	let selectPosition = new kakao.maps.LatLng(mapY, mapX);
	
	// 맵 확대 수정
	map.setLevel(6);
	
	// 생성한 마커를 지도의 중심으로 이동
	map.setCenter(selectPosition);
}

/*
 * Day 별 일정의 좌표정보를 가져온다
 */
var scheduleInfoList = []; // 일정 목록의 정보를 담을 배열
function getSchedulelatlng(day) {
	
	// scheduleInfoList 초기화	
	scheduleInfoList = [];
	
	// DAY 몇 인지?
	// console.log($(".dayBox").children());
	//console.log($('.dayBox[data-id='+day+']').children('.scheduleItem'));
	let scheduleDetail = $('.dayBox[data-id='+day+']').children('.scheduleItem');
	
	for (let i = 0; i < scheduleDetail.length; i++) {
		let mapx = $(scheduleDetail[i]).data('mapx');
		let mapy = $(scheduleDetail[i]).data('mapy');
		let index = $(scheduleDetail[i]).data('index');
		let cat1 = $(scheduleDetail[i]).data('cat1');
		
		scheduleInfoList.push(
				{
					latlng: new kakao.maps.LatLng(mapy, mapx),
					index : index,
					cat1 : cat1
				}
		);
	}
	//console.log(scheduleInfoList);
	
	setScheduleMaker();

}

function clearMap() {
	// 맵에서 마커 초기화
	if (scheduleMarkers != null) {
		for (let i = 0; i < scheduleMarkers.length; i++) {
			scheduleMarkers[i].setMap(null); // 맵에서 마커 초기화
		}
	}
	
	//console.log(drawLine);
	// 지도에 나타난 선 초기화
	if (drawLine != undefined) {
		drawLine.setMap(null);
	}
}


/*
 * 일정의 좌표정보로 화면에 마커를 생성한다
 */
var drawLine;
var scheduleMarkers = []; // 일정에 추가된 마커 목록
function setScheduleMaker() {
	//console.log('call setScheduleMaker');

	//console.log('scheduleInfoList length : ' + scheduleInfoList.length);
	// 맵에 표시할 마커가 없을 경우 처리
	if (scheduleInfoList.length == 0) {
		moveMapDefault();
		return;
	}

	
	scheduleMarkers = []; // 마커 담겨있던 배열 초기화
	var bounds = new kakao.maps.LatLngBounds(); // 지도를 재설정할 범위정보를 가지고 있을 LatLngBounds 객체를 생성
	var linePath = []; // {시작좌표, 끝좌표}를 저장할 배열
	var lineLine = new daum.maps.Polyline();
	
	
	for (let i = 0; i < scheduleInfoList.length;  i ++) {
		
		let index = scheduleInfoList[i].index;
		let cat1 = scheduleInfoList[i].cat1;
		
		// 마커 이미지 정보
		let imageSrc = '/naman/resources/images/schedule/marker/index/'+ cat1 +'/'+ index +'.png';
	
		// 마커 이미지 사이즈
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
	    
	    // 생성한 마커를 배열에 추가
	    scheduleMarkers.push(scheduleMarker);
	    
	    
	    // LatLngBounds 객체에 좌표를 추가합니다
	    bounds.extend(scheduleInfoList[i].latlng);
	    
	    if (i != 0) {
			// 라인을 그릴 좌표 정보를 저장합니다
			linePath.push(scheduleInfoList[i-1].latlng, scheduleInfoList[i].latlng);
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
	
	
}

//dayBox 태그의 위치정보를 저장하는 배열
var offset = [];
let dayBox = $('#scehduleSection').children('.dayBox');

// 여행 일차의 수만큼 .dayBox 클래스의 위치정보를 저장해놓는다
for (let i=0; i < totalDate; i++){
	offset.push($(dayBox[i]).offset()); 
}
console.log(offset);
//console.log(offset[0].top);
//console.log(offset[1].top);
//console.log(offset[2].top);
//console.log(offset[3].top);

/*
 * 지도의 기본 세팅으로 중심을 이동 시킨다
 */
function moveMapDefault() {
	var LatLng = new kakao.maps.LatLng('36.658481', '127.997876');
	map.setLevel(12);
	map.setCenter(LatLng);
}

//scroll *********************************************************************





//follow quick menu
$(window).scroll(function(){
    var scrollTop = $(document).scrollTop();
    if (scrollTop < 180) {
        scrollTop = 180;
        }
    $("#sideNav").stop();
    $("#sideNav").animate( { "top" : scrollTop });
});
// mapSection
// sideNav


let scrollBottom;
$(window).scroll(function(){  
    //스크롤의 위치가 상단에서 450보다 크면  
    if($(window).scrollTop() > 450){  
    /* if(window.pageYOffset >= $('원하는위치의엘리먼트').offset().top){ */  
        $('#mapSection').addClass("fix");  
        //위의 if문에 대한 조건 만족시 fix라는 class를 부여함  
    }else{  
        $('#mapSection').removeClass("fix");  
        //위의 if문에 대한 조건 아닌경우 fix라는 class를 삭제함  
    }
    
    scrollBottom = $(document).height() - $(window).height() - $(window).scrollTop();
    //console.log('scrollBottom : ' + scrollBottom );
    //console.log($(this).scrollTop());
    
    for (let i=0; i<totalDate ; i++) {
    	//console.log(offset[i].top);
		if ($(this).scrollTop() >= 0 && $(this).scrollTop() <= 20) {
        	//console.log(offset[i].top);
			clearMap(); // 지도 정보 초기화
			getSchedulelatlng(i+1); // 좌표 정보 배열에 담기 +마커&라인 그리기
			console.log(i + '번째 DAY 정보 - 1');
			break;
        }
		
		if (i != totalDate - 1) {
			if ($(this).scrollTop() > offset[i].top - 20 && $(this).scrollTop() < offset[i].top + 30 ) {
				console.log(i + '번째 DAY 정보 - 2');
				clearMap(); // 지도 정보 초기화
				getSchedulelatlng(i+1); // 좌표 정보 배열에 담기 +마커&라인 그리기

			}
		} else {
			if ($(this).scrollTop() > offset[i].top - 20 && $(this).scrollTop() <= offset[i].top + 30) {
				console.log(i + '번째 DAY 정보 - 3');
				clearMap(); // 지도 정보 초기화
				getSchedulelatlng(i+1); // 좌표 정보 배열에 담기 + 마커&라인 그리기
			
			}
		}
    }
    //console.log(scheduleInfoList);

});

function setSideNav() {
	
	for (let i=0; i<totalDate ; i++) {
		let temp = '<div class="dayNav" data-index="'+(i+1)+'">DAY'+(i+1)+' 일정</div>';
		$('.dayGroup').append(temp);
	}

	//totalDate
}

// sideNav 클릭시 이동 & 좌표 재설정
$(document).on('click', '.dayGroup .dayNav', function() {
//	alert($(this).text());
	
	let dayBoxs = $('#scehduleSection').children('.dayBox');
	console.log(dayBoxs);
	let offset;
	let index;
	
	for (let i=0; i<dayBoxs.length; i++) {
		//console.log($(dayBoxs[i]).data('id'));
		//console.log($(this).data('index'));
		if($(dayBoxs[i]).data('id') == $(this).data('index')) {
			console.log('일치');
			offset = $(dayBoxs[i]).offset();
			index = $(this).data('index');
		}
	}
	
	console.log(offset);
	
	$('html').animate({scrollTop : offset.top}, 200);
	setTimeout(() => console.log("after"), 300)
	clearMap();
	getSchedulelatlng(index);
	

});
/*$('#btnStart').click(function(){

    var offset = $('#tpstart').offset(); //선택한 태그의 위치를 반환

          //animate()메서드를 이용해서 선택한 태그의 스크롤 위치를 지정해서 0.4초 동안 부드럽게 해당 위치로 이동함 

      $('html').animate({scrollTop : offset.top}, 400);
      
      return;
 });*/



// 장소 정보보기 - ajax로 api 데이터 받아오기 *********************************
$('#detailCommonInfo').on('show.bs.modal', function (e) {
	console.log('call show.bs.modal event');
	//e.stopPropagation(); // 동작 안함..
	//console.log('정보보기 클릭------');
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
			//console.log(data);
			//console.log(data.response.body.items.item);
			let commonData = data.response.body.items.item;
//			let category = commonData.cat1 + ' | ' + commonData.cat2;
			
			let image;
		    if (commonData.firstimage == undefined) {
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