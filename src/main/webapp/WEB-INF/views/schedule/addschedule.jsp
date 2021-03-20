<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<div id="container" >


	<!-- 일정 -->
	<div id="daySection">
		<div id="dayHeader">
			<!-- <span>03.10</span> <span> ~ </span> <span>03.11</span> -->
			일정 보기
		</div>
		<div id="dayContent">
			<div class="dayAll selectAble">
				<span>전체 일정 보기</span>
			</div>
			<div id="dayList">
			<!-- 		
				<div class="dayItem selectAble selected">
					dayItem
					<div class="dayItemLeft">
						<div class="dayDay">DAY1</div>
						<div class="dayDate">03.10</div>
					</div>
					<div class="dayItemRight">
						<div class="dayOfWeek">수요일</div>
					</div>
				</div>
				<div class="dayItem selectAble">
					dayItem
					<div class="dayItemLeft">
						<div class="dayDay">DAY2</div>
						<div class="dayDate">03.11</div>
					</div>
					<div class="dayItemRight">
						<div class="dayOfWeek">목요일</div>
					</div>
				</div> 
			-->
			</div>
			<div class="dayAdd">
				<div>DAY 추가</div>
			</div>
			<div class="dayDel">
				<div>DAY 삭제</div>
			</div>
			<%-- <div>seq : ${tripPlanSeq}</div>
			<div>startDate : ${startDate}</div>
			<div>endDate : ${endDate}</div>
			<div>totalDate : ${totalDate}</div> --%>
			
		</div>



	</div>

	<!-- 경로 -->
	<div id="scheduleSection">
		<div id="scheduleHeader">
			<div id ="scheduleDate">
				<!-- <span>DAY1</span> <span> | </span> <span>03.10(수요일)</span> -->		
			</div>
		</div>
		<div id="scheduleBody">
			<div id="scheduleDetail">
				<!-- <div class="scheduleItem">
                        <div class="img_box">
                            <img src="imgaes/noImage.gif" alt="">
                            <div class="item_number"></div>
                        </div>
                        <div class="content_box">
                            <p>장소이름1</p>
                            <p>장소종류1</p>
                        </div>
                        <div class="btn_del">
                            <span class="glyphicon glyphicon-trash deleteScheduleItem"></span>
                        </div>
                        <div class="btn_box" style="display: none;">
                            <input type="button" class="btn btn-default" data-toggle="modal" data-target="#detailCommonInfo"value="정보보기">
                            <input type="button" class="btn btn-default addScheduleItem" value="일정추가">
                        </div>
                    </div>    -->
			</div>
		</div>
	</div>

	<!-- 검색 -->
	<div id="searchSection">
		<div id="searchHeader">
			<div class="searchHeaderLeft">검색 </div>
		</div>
		<div id="searchBodyOne">
			<!--  searchBodyOne -->
			<div id="searchArea" class="searchRow">
				<div class="searchAreaOne">
					<select name="areaCode" id="areaCode" class="form-control">
						<option value="">지역 선택</option>
						<c:forEach items="${regionList}" var="regionDTO">
							<option value="${regionDTO.regionseq }">${regionDTO.name}</option>
						</c:forEach>
					</select>
				</div>
				<div class="searchAreaTwo">
					<select name="" id="sigunguCode" class="form-control">
						<option value="">시군구 선택</option>
					</select>
				</div>
			</div>
			<div id="searchKeyword" class="searchRow">
				<input type="text" placeholder="검색어 입력" class="form-control"
					id="searchText" name="keyword">
				<button id="searchBtn" onclick="getData();">
					<span class="glyphicon glyphicon-search"></span>
				</button>
			</div>
			<div id="searchTheme">
				<div class="titleTheme">선택한 테마 : <span id="themeType">전체</span><span id="totalCount"></span></div>
				<div class="img_area">
					<div class="image_box" data-cat1="A02" data-theme="인문 관광지">
						<img src="/naman/resources/images/schedule/camera.png" alt="">
					</div>
					<div class="image_box" data-cat1="A01" data-theme="자연 관광지">
						<img src="/naman/resources/images/schedule/leaf.png" alt="">
					</div>
					<div class="image_box" data-cat1="A05" data-theme="음식점">
						<img src="/naman/resources/images/schedule/fork.png" alt="">
					</div>
					<div class="image_box" data-cat1="A04" data-theme="쇼핑">
						<img src="/naman/resources/images/schedule/shopping-bag.png"
							alt="">
					</div>
					<div class="image_box" data-cat1="A03" data-theme="레포츠">
						<img src="/naman/resources/images/schedule/running-shoes.png"
							alt="">
					</div>
					<div class="image_box" data-cat1="B02" data-theme="숙소">
						<img src="/naman/resources/images/schedule/hotel.png" alt="">
					</div>
				</div>
			</div>
		</div>
		<div id="searchResult" class="searchRow">
			<!-- resultItem -->
			<!-- <div class="resultItem">
				<div class="img_box">
					<img src="/naman/resources/images/schedule/noImage.gif" alt="">
					<div class="item_number" style="display: none;"></div>
				</div>
				<div class="content_box">
					<p class="content_name">장소이름</p>
					<p class="content_type">자연</p>
				</div>
				<div class="btn_del" style="display: none;">
					<span class="glyphicon glyphicon-trash deleteScheduleItem"></span>
				</div>
				<div class="btn_box">
					<input type="button" class="btn btn-default" data-toggle="modal"
						data-target="#detailCommonInfo" value="정보보기"> <input
						type="button" class="btn btn-default addScheduleItem" value="일정추가">
				</div>
			</div> -->

		</div>
		<!-- paging --> 
		<div id="paging"> 
			<div id="pageArea">
				<nav aria-label="Page navigation">
					<ul id="pagination" class="pagination">
					</ul>
				</nav>
			</div>
		</div>

	</div>
	<!--  searchSection -->

	<!-- 지도 -->
	<div id="mapSection">
		<div id="map"></div>
	</div>
</div>



<!-- 장소 정보보기 Modal -->
<div class="modal fade" id="detailCommonInfo" tabindex="-1"
	role="dialog" aria-labelledby="myModalLabel">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal"
					aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
				<h4 class="modal-title" id="commonInfoTitle">장소제목</h4>
			</div>
			<div class="modal-body" id="commonInfoBody">
				<div class="image">
					<img src="/naman/resources/images/schedule/noImage.gif" alt="">
				</div>
				<div class="content">
					<div>주소 : <span class="category"></span></div>
					<div class="makeLine">전화번호 : <span class="tel"></span></div>	
					<div class="pdtop"><span class="overview"></span></div>
				</div>
					
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal">닫기</button>
			</div>
		</div>
	</div>
</div>

<script>

	//테마 코드 & 테마 이름 Map
	let codeMap = new Map();
	
	codeMap.set('A02', '인문 관광지');
	codeMap.set('A01', '자연 관광지');
	codeMap.set('A05', '음식점');
	codeMap.set('A04', '쇼핑');
	codeMap.set('A03', '레포츠');
	codeMap.set('B02', '숙소');
	codeMap.set('C01', '행사/축제');

	let startDate = new Date('<c:out value="${startDate}"/>');
	let endDate = new Date('<c:out value="${endDate}"/>');
	let totalDate = '<c:out value="${totalDate}"/>';
	let tripPlanSeq = '<c:out value="${tripPlanSeq}"/>';

	//console.log('startDate' + startDate);
	//console.log('endDate' + endDate);
	//console.log('totalDate' + totalDate);
	//console.log('tripPlanSeq' + tripPlanSeq);
	//console.log(getDayOfWeek(startDate));
	//console.log(getDayOfWeek(endDate));
	//console.log(new Date(startDate));
	
	// 초기 클릭상태 만들기
	$("#dayList").children().first('.dayitem').trigger('click');
	loadData(1, tripPlanSeq);
	
	// 초기 세팅하는 부분
	setDaylist();
	$("#dayList").children().first().addClass('selected');
	setScheduleDate($("#dayList").children().first());
	setDayHeader();
	
	function setDaylist() {
		let tempStartdate = new Date(startDate);
		
		for (let i=1; i<= totalDate; i++){
			//console.log('day' + i);
			
			let tmp = '';
			
			tmp += '<div class="dayItem selectAble">';
			tmp += '<div class="dayItemLeft">';
			tmp += '<div class="dayDay">DAY'+ i +'</div>';
			tmp += '<div class="dayDate">'+ (tempStartdate.getMonth()+1) +'.'+tempStartdate.getDate()+'</div>';
			tmp += '</div>';
			tmp += '<div class="dayItemRight">';
			tmp += '<div class="dayOfWeek">'+ getDayOfWeek(tempStartdate) +'</div>';
			tmp += '</div>';
			tmp += '</div>';

			$("#dayList").append(tmp);
			
			tempStartdate.setDate(tempStartdate.getDate() + 1); // 시작날짜에 1일 더하기
		}
	}
	
	// 요일을 구하는 함수
	function getDayOfWeek(date) {
		// yyyy-mm-dd
		let weekName = new Array('일요일','월요일','화요일','수요일','목요일','금요일','토요일');
		//let year = date.substring(0,4);
		//let month = date.substring(5,7); 
		//let day = date.substring(8,10);
		//let week = new Date(year, month-1, day);
		//week = weekName[week.getDay()];
		
		return weekName[date.getDay()];
	}
	
	// date to string (yyyy-mm-dd)
	function dateFormatToString(date) {
		let year = date.getFullYear();
		let month = (1 + date.getMonth());
		month = month >= 10 ? month : '0' + month;
		let day = date.getDate();
		day = day >= 10 ? day : '0' + day;
		return year + '-' + month + '-' + day;
	}


	// DAY 추가 버튼
	$(".dayAdd").on('click', function() {
		
		totalDate++; // 총여행일수 + 1
		//console.log('totalDate : ' + totalDate);
		
		endDate.setDate(endDate.getDate() + 1); // 여행 종료일 + 1
		let endDateStr = dateFormatToString(endDate); // 하루가 증가한 여행 종료일 yyyy-mm-dd
		console.log(endDateStr);
		//tripPlanSeq
		
		//DB 업데이트 ajax
 		$.ajax({
			url : '/naman/schedule/increaseday.action',
			type : 'GET',
			traditional: true,
			data : "totalDate="+ totalDate + "&endDate=" + endDateStr + "&tripPlanSeq=" + tripPlanSeq,
			dataType : 'text',
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
		
		
		let tempStartdate = new Date(endDate);

		let tmp = '';
		
		tmp += '<div class="dayItem selectAble">';
		tmp += '<div class="dayItemLeft">';
		tmp += '<div class="dayDay">DAY'+ totalDate +'</div>';
		tmp += '<div class="dayDate">'+ (tempStartdate.getMonth()+1) +'.'+tempStartdate.getDate()+'</div>';
		tmp += '</div>';
		tmp += '<div class="dayItemRight">';
		tmp += '<div class="dayOfWeek">'+ getDayOfWeek(tempStartdate) +'</div>';
		tmp += '</div>';
		tmp += '</div>';

		$("#dayList").append(tmp);
		setDayHeader(); // 날짜 수정
		
		//클릭상태 만들기
		$("#dayList").children().last('.dayitem').trigger('click');

	});
	
	
	
	
	// DAY 삭제 버튼
	$(".dayDel").on('click', function() {
		
		//console.log($("#dayList").children().length);
		
		if ($("#dayList").children().length == 1) {
			alert('마지막 하나의 여행날은 삭제할 수 없습니다')
			return;
		}
		
		$("#dayList").children().last().detach();
		
		totalDate--;
		//console.log('totalDate : ' + totalDate);
		
		endDate.setDate(endDate.getDate() - 1); // 여행 종료일 - 1
		
		let endDateStr = dateFormatToString(endDate); // 하루가 감소한 여행 종료일 'yyyy-mm-dd'
		//DB 업데이트 ajax
 		$.ajax({
			url : '/naman/schedule/decreaseday.action',
			type : 'GET',
			traditional: true,
			data : "totalDate="+ totalDate + "&endDate=" + endDateStr + "&tripPlanSeq=" + tripPlanSeq + "&planDay=" + totalDate,
			dataType : 'text',
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
		


		setDayHeader(); // 날짜 수정
		
		$("#dayList").children().first('.dayitem').trigger('click');
		//loadData(1, tripPlanSeq);
		
		
	});
	
	
	// Day 선택 했을때
	$(document).on('click', '#dayContent .dayItem', function() {

		$("#scheduleDetail").html(""); 
		//console.log('DAY 클릭');
		setScheduleDate($(this)); // 여행 일정의 날짜를 변경하는 메서드
		//console.log($(this).children().first().children('.dayDay').text().substr(3)); // 몇일차인지
		
		let planDay = $(this).children().first().children('.dayDay').text().substr(3);
		let tripseq = tripPlanSeq;
		
		loadData(planDay, tripseq); // 해당일의 일정 데이터를 불러온다


	});
	
	// 일정 데이터를 불러오는 메서드
	function loadData (planDay, tripseq) {
		
		$.ajax({
			url : '/naman/schedule/loadscheduledata.action',
			type : 'POST',
			traditional: true,
			data : "&tripPlanSeq="+ tripseq + "&planDay=" + planDay,
			dataType : 'json',
			success : function(data) {
				console.log(data);
				
				if (data.result == '0') {
					setScheduleMaker(); // 마커 생성.
					return;
				}
				
				$(data).each(function(index, item) {
				
					console.log(item.title);
					let temp = '';
					
					temp += '<div class="resultItem ui-draggable ui-draggable-handle" data-addr1="'+item.addr1+'" data-mapy="'+item.mapY+'"';
					temp += 'data-mapx="'+item.mapX+'" data-title="'+item.title+'" data-contentid="'+item.contentId+'" data-contenttypeid="'+item.contentTypeId+'" ';
					temp += 'data-firstimage="'+item.img+'" data-cat1="'+item.cat1+'" data-index="'+item.index+'" style="width: 210px; height: 90px;">';
					temp += '<div class="img_box">';
					temp += '<img src="'+item.img+'">';
					temp += '<div class="item_number" style="">'+item.index+'</div>';
					temp += '</div>';
					temp += '<div class="content_box">';
					temp += '<p class="content_name" ondragstart="return false" onselectstart="return false">'+item.title+'</p>';
					temp += '<p class="content_type" ondragstart="return false" onselectstart="return false">'+codeMap.get(item.cat1)+'</p>';
					temp += '</div>';
					temp += '<div class="btn_del" style="">';
					temp += '<span class="glyphicon glyphicon-trash deleteScheduleItem"></span>';
					temp += '</div>';
					temp += '</div>';
		
					
					$("#scheduleDetail").append(temp);
					
				});
				
				setScheduleMaker();
				
				/*
				<div class="resultItem ui-draggable ui-draggable-handle" data-addr1="세종특별자치시 연서면 도신고복로 586" data-mapy="36.6000120047" 
				data-mapx="127.2274836912" data-title="고복자연공원" data-contentid="125875" data-contenttypeid="12" 
				data-firstimage="http://tong.visitkorea.or.kr/cms/resource/44/1922344_image2_1.jpg" data-cat1="A02" style="width: 210px; height: 90px;" id="index_1">
					<div class="img_box">
						<img src="http://tong.visitkorea.or.kr/cms/resource/44/1922344_image2_1.jpg">
						<div class="item_number" style="">1</div>
					</div>
					<div class="content_box">
						<p class="content_name" ondragstart="return false" onselectstart="return false">고복자연공원</p>
						<p class="content_type" ondragstart="return false" onselectstart="return false">인문 관광지</p>
					</div>
					<div class="btn_del" style="">
						<span class="glyphicon glyphicon-trash deleteScheduleItem"></span>
					</div>
					<div class="btn_box" style="display: none;">
						<input type="button" class="btn btn-default detailCommonBtn" data-toggle="modal" data-target="#detailCommonInfo" value="정보보기">
						<input type="button" class="btn btn-default addScheduleItem" value="일정추가">
					</div>
				</div>
				*/
				
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				console.log("Status: " + textStatus);
				console.log("Error: " + errorThrown);
				console.log(errorThrown);
				console.warn(XMLHttpRequest.responseText);
			}
		});
	}
	
	
	
	// 여행 일정의 날짜를 변경하는 메서드
	function setScheduleDate(item) {
		
		
		$('#scheduleDate').text('');
		
		//console.log(item.children('.dayItemLeft').children('.dayDay').text());
		//console.log(item.children('.dayItemLeft').children('.dayDate').text());
		//console.log(item.children('.dayItemRight').children('.dayOfWeek').text());
		
		let dayDay = item.children('.dayItemLeft').children('.dayDay').text();
		let dayDate = item.children('.dayItemLeft').children('.dayDate').text();
		let dayOfWeek = item.children('.dayItemRight').children('.dayOfWeek').text();
		
		let tmp = "";
		tmp += '<span>'+ dayDay +'</span>';
		tmp += '<span> | </span>';
		tmp += '<span>'+ dayDate +'('+ dayOfWeek +')</span>';
		
		$('#scheduleDate').append(tmp);
	}
	
	// 여행 시작날짜 ~ 여행 종료날짜 변경하는 메서드
	function setDayHeader() {
		
		$('#dayHeader').text('');
	
		// '+ (tempStartdate.getMonth()+1) +'.'+tempStartdate.getDate()+'
		let tmp = '';
		tmp += '<span>'+ startDate.getFullYear() + '.'+ (startDate.getMonth()+1) + '.' + startDate.getDate()  +'</span>';
		tmp += '<span> ~ </span>';
		tmp += '<span>'+ endDate.getFullYear() + '.' + (endDate.getMonth()+1) + '.' + endDate.getDate()  +'</span>';
		
		
		$('#dayHeader').append(tmp);

	}
	
	
	


</script>