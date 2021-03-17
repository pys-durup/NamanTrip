<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="C" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Spring Board</title>

	<tiles:insertAttribute name="asset"></tiles:insertAttribute>	
	<link href="/naman/resources/css<tiles:getAsString name="includecss"/>.css" rel="stylesheet"/>
	<tiles:insertAttribute name="kakaomap"></tiles:insertAttribute>
	
</head>
<body>


	<tiles:insertAttribute name="header"></tiles:insertAttribute>
	<tiles:insertAttribute name="content"></tiles:insertAttribute>
	<script src="/naman/resources/js<tiles:getAsString name="includejs"/>.js"></script>

</body>
</html>