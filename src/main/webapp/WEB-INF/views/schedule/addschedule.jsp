<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<div id="container" >


	<!-- 일정 -->
	<div id="daySection">
		<div id="dayHeader">
			<span>03.10</span> <span> ~ </span> <span>03.11(수요일)</span>
		</div>
		<div id="dayContent">
			<div class="dayAll selectAble">
				<span>전체 일정 보기</span>
			</div>
			<div id="dayList">
				<div class="dayItem selectAble selected">
					<!-- dayItem -->
					<div class="dayItemLeft">
						<div class="dayDay">DAY1</div>
						<div class="dayDate">03.10</div>
					</div>
					<div class="dayItemRight">
						<div class="dayOfWeek">수요일</div>
					</div>
				</div>
				<div class="dayItem selectAble">
					<!-- dayItem -->
					<div class="dayItemLeft">
						<div class="dayDay">DAY2</div>
						<div class="dayDate">03.11</div>
					</div>
					<div class="dayItemRight">
						<div class="dayOfWeek">목요일</div>
					</div>
				</div>
			</div>
			<div class="dayAdd">
				<div>DAY 추가</div>
			</div>
			<div class="dayDel">
				<div>DAY 삭제</div>
			</div>
			<div>seq : ${tripPlanseq}</div>
			<div>startDate : ${startDate}</div>
			<div>endDate : ${endDate}</div>
			<div>totalDate : ${totalDate}</div>
		</div>



	</div>

	<!-- 경로 -->
	<div id="scheduleSection">
		<div id="scheduleHeader">
			<span>DAY1</span> <span> | </span> <span>03.10(수요일)</span>
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
							<option value="${regionDTO.regionseq }">${regionDTO.name }</option>
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

	let startDate = '<c:out value="${startDate}"/>';
	let endDate = '<c:out value="${endDate}"/>';
	let totalDate = '<c:out value="${totalDate}"/>';
	let tripPlanseq = '<c:out value="${tripPlanseq}"/>';

	console.log('startDate' + startDate);
	console.log('endDate' + endDate);
	console.log('totalDate' + totalDate);
	console.log('tripPlanseq' + tripPlanseq);


	// DAY 추가 버튼
	$(".dayAdd").on('click', function() {

		let tmp = '';

		tmp += '<div class="dayItem selectAble">'
		tmp += '<div class="dayItemLeft">'
		tmp += '<div class="dayDay">DAY1</div>'
		tmp += '<div class="dayDate">03.10</div>'
		tmp += '</div>'
		tmp += '<div class="dayItemRight">'
		tmp += '<div class="dayOfWeek">수요일</div>'
		tmp += '</div>'
		tmp += '</div>'

		$("#dayList").append(tmp);
	});

</script>