<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
    
 
 <div id="sectionOne">
        <div id="sectionTitle">나의 여행 일정</div>
        <div class="btnGroup">
            <input type="button" class="btn btn-default" onclick="location.href='/naman/schedule/schedule.action';" value="메인 페이지">
        </div>
    </div>

    <div class="container">
        <div class="row">
            <div class="menu">
                <div class="col-md-2">완성된 일정</div>
                <div class="col-md-2">계획중인 일정</div>
                <!-- <div class="col-md-2">좋아요한 일정</div> -->
                <div class="col-md-offset-10" ><input type="button" class="btn btn-default" onclick="location.href='/naman/schedule/addbasic.action';" value="여행 루트 만들러가기"></div>
            </div>
        </div>
        <div class="row">
        	<c:forEach items="${tripPlanList}" var="dto">
        		<c:set var="ran"><%= java.lang.Math.round(java.lang.Math.random() * 9) %></c:set>
	            <div class="col-md-4">
	                <div class="scheduleItem" onclick="location.href='/naman/schedule/scheduledetail.action?tripPlanSeq=${dto.tripPlanSeq}&pic=${ran}';">
	                    <div class="schedule_image">
	                        <img src="/naman/resources/images/schedule/trip/back${ran}.jpg" alt="">
	                        <div class="tripInfo">
	                            <div class="startDate"> ${fn:substring(dto.startDate,0,10)} <span class="planDay">/ ${dto.totalDate} DAYS</span></div>
	                            <div>${dto.title}</div>
	                        </div>
	                    </div>
	                    <div class="schedule_content">
	                        <div>
	                            <div class="content">
	                                ${name}
	                                <span class="edit" onclick="editSchedule(${dto.tripPlanSeq})">수정</span>
	                                <span> | </span>
	                                <span class="del" onclick="showDelokModal(${dto.tripPlanSeq})">삭제</span>
	                            </div>
	                        </div>
	                    </div>
	                </div>
	            </div>
        	</c:forEach>
            
        </div>
    </div>
    
    <!-- 삭제 확인 modal -->
    <div class="modal fade" id="delok" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">여행 일정 삭제</h4>
      </div>
      <div class="modal-body">
        <p>정말 여행 일정을 삭제 하시겠습니까?</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">취소</button>
        <button type="button" class="btn btn-danger" id="delBtn">삭제하기</button>
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->