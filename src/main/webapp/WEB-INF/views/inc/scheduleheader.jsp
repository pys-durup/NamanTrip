<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<div id="headerContainer">
    <div class="headerLeft">
        <div>${title}</div>
    </div>
    <div class="headerRight">
        <div>
            <input type="button" class="btn btn-default" value="임시저장 나가기">
            <input type="button" class="btn btn-primary" onclick="location.href='/naman/schedule/addscheduleok.action';"value="작성완료">
        </div>
    </div>
</div>