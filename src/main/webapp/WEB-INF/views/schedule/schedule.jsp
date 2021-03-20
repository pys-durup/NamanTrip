<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

    <div id="sectionOne">
        <div class="title">여행루트 이용방법</div>
        <div class="subTitle">나의 여행 동선을 확인하고 쉽게 일정을 계획하세요</div>
        <div class="content">
            기본정보 입력
            <span class="glyphicon glyphicon-chevron-right"></span>
            상세정보 입력
            <span class="glyphicon glyphicon-chevron-right"></span>
            지도 확인
            <span class="glyphicon glyphicon-chevron-right"></span>
            작성완료
        </div>
        <div class="btnGroup">
            <input type="button" class="btn btn-default" onclick="location.href='/naman/schedule/myschedule.action';" value="나의 여행루트">
            <input type="button" class="btn btn-default" onclick="location.href='/naman/schedule/addbasic.action';" value="여행 루트 만들러가기">
            <input type="button" class="btn btn-default" value="여행루트 게시판">
        </div>
    </div>
    <div class="container">
        <div id="sectionTwo">
            <div class="itemBox">
                <div class="boxLeft">
                    <div class="labelBox"><span class="label label-success">Step1</span></div>
                    <div class="title"><h2>기본정보 입력</h2></div>
                    <div class="content">여행 이름, 여행 지역, 여행 날짜를 선택할 수 있습니다</div>
                    <div class="content">부가설명에는 어떤 유형의 여행인지 적어서 검색어에 노출시킬 수 있습니다</div>
                    <p><span class="tip">TIP : </span>달력을 이용해서 날짜를 선택하면 여행 시작날짜와 종료날짜가 선택됩니다</p>
                </div>
                <div class="boxRight">
                    <div class="imgBox">
                        <img src="/naman/resources/images/schedule/trip/step1.PNG" alt="">
                    </div>
                </div>
            </div>
            <div class="itemBox">
                <div class="boxLeft">
                    <div class="labelBox"><span class="label label-success">Step2</span></div>
                    <div class="title"><h2>상세정보 입력</h2></div>
                    <div class="content">지역, 시군구로 여행지를 검색할 수 있습니다</div>
                    <div class="content">테마별로 여행지를 검색할 수 있습니다</div>
                    <div class="content">여행의 순서를 정할 수 있습니다</div>
                    <p><span class="tip">TIP : </span>드래그를 이용해서 여행일정 추가와 여행일정 순서를 바꿀 수 있습니다</p>
                </div>
                <div class="boxRight">
                    <div class="imgBox">
                        <img src="/naman/resources/images/schedule/trip/step2.PNG" alt="">
                    </div>
                </div>
            </div>

            <div class="itemBox">
                <div class="boxLeft">
                    <div class="labelBox"><span class="label label-success">Step3</span></div>
                    <div class="title"><h2>지도 확인</h2></div>
                    <div class="content">여행의 순서대로 번호가 적힌 마커가 지도에 표시됩니다</div>
                    <div class="content">여행지와 여행지 사이의 거리를 확인할 수 있습니다</div>
                    <p><span class="tip">TIP : </span>마커를 클릭해서 선택한 관광지의 상세정보를 확인할 수 있습니다</p>
                </div>
                <div class="boxRight">
                    <div class="imgBox">
                        <img src="/naman/resources/images/schedule/trip/step3.PNG" alt="">
                    </div>
                </div>
            </div>
            

        </div>
    </div>