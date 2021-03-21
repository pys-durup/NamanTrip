<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="java.util.Date" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<div class="container">
        <div id="sectionOne" style="background-image: url('/naman/resources/images/schedule/trip/back${pic}.jpg');">
            <div id="cover" >
                <div id="nicknaem">${tripPlanDto.title}</div>
                <div id="region">${tripPlanDto.region}</div>
                <div id="date">
                    ${fn:substring(tripPlanDto.startDate,0,10)}
                    ~ 
                    ${fn:substring(tripPlanDto.endDate,0,10)}
                    (${tripPlanDto.totalDate}일)</div>
                <div>방문장소 수 / ${tripPlanDto.readcnt} </div>
            </div>
        </div>
        <div id="sideNav">
            <div><span class="glyphicon glyphicon-chevron-up"></span></div>
            <div class="dayGroup">
	            <div>DAY1</div>
	            <div>DAY2</div>
            </div>
            <div><span class="glyphicon glyphicon-chevron-down"></span></div>
        </div>
        <div id="sectionTwo">
            <div id="scehduleSection">
            <!-- 루프의 시작값을 컨트롤하는 변수  -->
            <c:set var="temp" value="0" />
            <!-- planDayDto 여행 DAY 별 몇개의 장소를 방문했는지  -->
            <c:forEach items="${planDayList}" var="planDayDto" varStatus="status">
            	<!-- 날짜를 받아와서 하루씩 더하는 jstl 구문 -->
            	<fmt:parseDate var="date" value="${tripPlanDto.startDate}" pattern="yyyy-MM-dd HH:mm:ss" />
            	<c:set var="mili" value="${date.getTime() + 60*60*24*1000*status.count - 60*60*24*1000}"/>
            	<jsp:useBean id="myDate" class="java.util.Date"/>
				<c:set target="${myDate}" property="time" value="${mili}"/>
            	<fmt:formatDate value="${myDate}" pattern="yyyy-MM-dd" var="eachdate"/>
            	
            	<div class="dayBox" data-id="${status.count}">
	                <div class="planArea">
	                    <div class="planDay">DAY${status.count} </div>
	                    <div class="planInfo">
	                        <div class="date">${eachdate}</div>
	                        <div class="region">${tripPlanDto.region}</div>
	                    </div>
	                </div>
	                
	                <!-- 여행 방문장소 상세정보 -->
	                <c:forEach items="${planDetailList}" var="planDetailDto" begin="${temp}" end="${temp +  planDayDto.cnt - 1}" step="1" varStatus="status">
	                
	                <div class="scheduleItem" data-mapX="${planDetailDto.mapX}" data-mapY="${planDetailDto.mapY}" data-contentId="${planDetailDto.contentId}" data-contentTypeId="${planDetailDto.contentTypeId}" data-cat1="${planDetailDto.cat1}" data-index="${planDetailDto.planNo}">
	                    <div class="planNo">
	                        <div class="circle">${planDetailDto.planNo}</div>
	                    </div>
	                    <div class="itembox">
	                        <div class="img"><img src="${planDetailDto.img}" alt=""></div>
	                        <div class="itemInfo">
	                            <div class="title">${planDetailDto.title}</div>
	                            <div class="cate">${planDetailDto.cat1}</div>
	                        </div>
	                    </div>
	                    <div class="btnGroup">
	                        <span class="glyphicon glyphicon-info-sign" data-toggle="modal" data-target="#detailCommonInfo"></span>
	                        <span class="glyphicon glyphicon-map-marker" onclick="changeXY('${planDetailDto.mapX}', '${planDetailDto.mapY}');"></span>
	                    </div>
	                </div>
	                </c:forEach>

            	</div>
    
                <div class="line"></div>
            	<c:set var="temp" value="${temp + planDayDto.cnt}" />
            </c:forEach>

			<div>test</div>
			<div>test</div>
			<div>test</div>
			<div>test</div>
			<div>test</div>
			<div>test</div>
			<div>test</div>
			<div>test</div>
			<div>test</div>
			<div>test</div>
			<div>test</div>
			<div>test</div>
			<div>test</div>
			<div>test</div>
			<div>test</div>
			<div>test</div>
			<div>test</div>
			<div>test</div>
			<div>test</div>
			<div>test</div>
			<div>test</div>
			<div>test</div>
			<div>test</div>
			<div>test</div>
			<div>test</div>
			<div>test</div>
			<div>test</div>
			<div>test</div>
			<div>test</div>
			<div>test</div>
			<div>test</div>
			<div>test</div>
			<div>test</div>
			
            </div>

            <div id="mapSection">
                <div id="fixWrapper">
                    <div id="map"></div>
                    <!-- <div id="marker">
                        <div class="row">
                            <div class="col-md-4 markerItem">
                                <div class="mincircle">1</div>
                                <span class="name">장소이름</span>
                            </div>
                            <div class="col-md-4 markerItem">
                                <div class="mincircle">1</div>
                                <span class="name">장소이름</span>
                            </div>
                            <div class="col-md-4 markerItem">
                                <div class="mincircle">1</div>
                                <span class="name">장소이름</span>
                            </div>
                            <div class="col-md-4 markerItem">
                                <div class="mincircle">1</div>
                                <span class="name">장소이름</span>
                            </div>
                        </div>
                    </div> -->
                </div>
            </div>
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
    
    <script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=775d31cad8ed3352ed197ee1a04cc700&libraries=services"></script>
    
    <script>
    
    	let totalDate = ${tripPlanDto.totalDate};
    	console.log(totalDate);
    
    </script>