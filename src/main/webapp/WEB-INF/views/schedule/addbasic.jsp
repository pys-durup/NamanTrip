<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
    
    <link rel="stylesheet" href="/naman/resources/css/schedule/calendar.css">
    
    <div class="container">
        <div class="section">
        	<form method="POST" action="/naman/schedule/addbasicok.action">
            <div class="section-top">
                <div class="section-title">Step 1. 여행 기본정보입력</div>
                <div class="nextBtn">
                    <input type="submit" class="btn btn-primary" value="다음단계로 >>">
                </div>
            </div>
            <div class="row">
                <div class="section-subtitle">여행 이름</div>
            </div>
            <div class="row">
                <div class="col-md-5">
                    <input type="text" name="title" id="title"  class="form-control">
                </div>
            </div>
            <div class="row">
                <div class="section-subtitle">여행을 원하는 지역</div>
            </div>
            <div class="row">
                <div class="col-md-3">
                    <select name="region" id="region" class="form-control">
						<c:forEach items="${regionList}" var="regionDTO">
							<option value="${regionDTO.name }">${regionDTO.name }</option>
						</c:forEach>
                    </select>
                </div>
            </div>
            <!-- <div class="row">
                여행시작날짜
            </div>
            <div class="row">
                <div class="col-md-3">
                    <input type="text" class="form-control" id="from" name="from">
                </div>
            </div>
            <div class="row">
                여행종료날짜
            </div>
            <div class="row">
                <div class="col-md-3">
                    <input type="text" class="form-control" id="to" name="to">
                </div>
            </div> -->
            <div class="row selectCalendar" style="position: relative;">
                <div class="section-subtitle">여행 날짜 선택 하기 </div>
                <div class="btn btn-default calendarIcon" id="calendarIcon">
                    <span class="glyphicon glyphicon-calendar"></span>
                </div>

                <!-- 달력 --------------------------------------------------->
                <div id="calendar" style="display: none;">
                    <div class="main">
                        <div class="sideb">
                            <div class="header">
                                <span class="glyphicon glyphicon-chevron-left"></span>
                                <span><span class="month"> </span><span class="year"></span></span>
                                <span class="glyphicon glyphicon-chevron-right"></span>
                            </div>
                            <div class="calender">
                            <table>
                                <thead>
                                    <tr class="weedays">
                                        <th data-weekday="sun" data-column="0" class="calendardayofweek">일</th>
                                        <th data-weekday="mon" data-column="1" class="calendardayofweek">월</th>
                                        <th data-weekday="tue" data-column="2" class="calendardayofweek">화</th>
                                        <th data-weekday="wed" data-column="3" class="calendardayofweek">수</th>
                                        <th data-weekday="thu" data-column="4" class="calendardayofweek">목</th>
                                        <th data-weekday="fri" data-column="5" class="calendardayofweek">금</th>
                                        <th data-weekday="sat" data-column="6" class="calendardayofweek">토</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="days" data-row="0">
                                        <td data-column="0"></td>
                                        <td data-column="1"></td>
                                        <td data-column="2"></td>
                                        <td data-column="3"></td>
                                        <td data-column="4"></td>
                                        <td data-column="5"></td>
                                        <td data-column="6"></td>
                                    </tr>
                                    <tr class="days" data-row="1">
                                        <td data-column="0"></td>
                                        <td data-column="1"></td>
                                        <td data-column="2"></td>
                                        <td data-column="3"></td>
                                        <td data-column="4"></td>
                                        <td data-column="5"></td>
                                        <td data-column="6"></td>
                                    </tr>
                                    <tr class="days" data-row="2">
                                        <td data-column="0"></td>
                                        <td data-column="1"></td>
                                        <td data-column="2"></td>
                                        <td data-column="3"></td>
                                        <td data-column="4"></td>
                                        <td data-column="5"></td>
                                        <td data-column="6"></td>
                                    </tr>
                                    <tr class="days" data-row="3">
                                        <td data-column="0"></td>
                                        <td data-column="1"></td>
                                        <td data-column="2"></td>
                                        <td data-column="3"></td>
                                        <td data-column="4"></td>
                                        <td data-column="5"></td>
                                        <td data-column="6"></td>
                                    </tr>
                                    <tr class="days" data-row="4">
                                        <td data-column="0"></td>
                                        <td data-column="1"></td>
                                        <td data-column="2"></td>
                                        <td data-column="3"></td>
                                        <td data-column="4"></td>
                                        <td data-column="5"></td>
                                        <td data-column="6"></td>
                                    </tr>
                                    <tr class="days" data-row="5">
                                        <td data-column="0"></td>
                                        <td data-column="1"></td>
                                        <td data-column="2"></td>
                                        <td data-column="3"></td>
                                        <td data-column="4"></td>
                                        <td data-column="5"></td>
                                        <td data-column="6"></td>
                                    </tr>
                                </tbody>
                            </table>
                            </div>
                            <div class="btn btn-default" id="checkDate">확인</div>
                        </div>
                    </div>
                </div> <!-- 달력 끝 --------------------------------------------------->

            </div>
            <div class="row">
                <div class="section-subtitle">여행 시작날짜</div>
            </div>
            <div class="row">
                <div class="calendarDate" id="calendarDateIn">
                    <span class="date" id="dateIn">선택된 날짜가 없습니다</span>
                    <span class="dayofweek" id="dayofweekIn"></span>
                </div>
            </div>
            <div class="row">
                <div class="section-subtitle">여행 종료날짜</div>
            </div>
            <div class="row">
                <div class="calendarDate" id="calendarDateOut">
                    <span class="date" id="dateOut">선택된 날짜가 없습니다</span>
                    <span class="dayofweek" id="dayofweekOut"></span>
                    
                </div>
            </div>
            <input type="hidden" id="startDate" name="startDate" value="" >
            <input type="hidden" id="endDate" name="endDate" value=""  >
            <input type="hidden" id="totalDate" name="totalDate" value=""  >

            <div class="row">
                <div class="section-subtitle">부가설명</div>
            </div>
            <div class="row">
                <div class="col-md-8">
                    <textarea class="form-control" name="descript" id="descript"  rows="10"></textarea>
                </div>
            </div>
        </div>
        </form>
    </div>



        

    <script type="text/javascript" src="/naman/resources/js/schedule/makecalendar.js"></script>