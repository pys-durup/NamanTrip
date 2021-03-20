<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<div class="container">
        <div id="sectionOne" style="background-image: url('/naman/resources/images/schedule/trip/back6.jpg');">
            <div id="cover" >
                <div id="nicknaem">닉네임</div>
                <div id="region">부산</div>
                <div id="date">
                    2015.05.01 
                    ~ 
                    2015.05.02 
                    (2일)</div>
                <div>방문장소 수 / 조회수</div>
            </div>
        </div>
        <div id="sideNav">
            <div><span class="glyphicon glyphicon-chevron-up"></span></div>
            <div>DAY1 지역이름</div>
            <div>DAY2 지역이름</div>
            <div><span class="glyphicon glyphicon-chevron-down"></span></div>
        </div>
        <div id="sectionTwo">
            <div id="scehduleSection">
                <div class="planArea">
                    <div class="planDay">DAY1</div>
                    <div class="planInfo">
                        <div class="date">2015.05.01</div>
                        <div class="region">부산</div>
                    </div>
                </div>
                <div class="scheduleItem">
                    <div class="planNo">
                        <div class="circle">1</div>
                    </div>
                    <div class="itembox">
                        <div class="img"><img src="/naman/resources/images/schedule/trip/back2.jpg" alt=""></div>
                        <div class="itemInfo">
                            <div class="title">서울시청</div>
                            <div class="cate">인문관광지</div>
                        </div>
                    </div>
                    <div class="btnGroup">
                        <span class="glyphicon glyphicon-info-sign"></span>
                        <span class="glyphicon glyphicon-map-marker"></span>
                    </div>
                </div>

                <div class="scheduleItem">
                    <div class="planNo">
                        <div class="circle">2</div>
                    </div>
                    <div class="itembox">
                        <div class="img"><img src="/naman/resources/images/schedule/trip/back2.jpg" alt=""></div>
                        <div class="itemInfo">
                            <div class="title">서울시청</div>
                            <div class="cate">인문관광지</div>
                        </div>
                    </div>
                    <div class="btnGroup">
                        <span class="glyphicon glyphicon-info-sign"></span>
                        <span class="glyphicon glyphicon-map-marker"></span>
                    </div>
                </div>

                <div class="scheduleItem">
                    <div class="planNo">
                        <div class="circle">3</div>
                    </div>
                    <div class="itembox">
                        <div class="img"><img src="/naman/resources/images/schedule/trip/back2.jpg" alt=""></div>
                        <div class="itemInfo">
                            <div class="title">서울시청</div>
                            <div class="cate">인문관광지</div>
                        </div>
                    </div>
                    <div class="btnGroup">
                        <span class="glyphicon glyphicon-info-sign"></span>
                        <span class="glyphicon glyphicon-map-marker"></span>
                    </div>
                </div>
               
                <div class="line"></div>


            </div>

            <div id="mapSection">
                <div id="fixWrapper">
                    <div id="map"></div>
                    <div id="marker">
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
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=775d31cad8ed3352ed197ee1a04cc700&libraries=services"></script>