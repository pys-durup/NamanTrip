<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="C" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Spring Board</title>

	<link rel="stylesheet" href="/naman/resources/css<tiles:getAsString name="includecss"/>.css" >
	<tiles:insertAttribute name="asset"></tiles:insertAttribute>
	
</head>
<body>


	<tiles:insertAttribute name="header"></tiles:insertAttribute>
	<tiles:insertAttribute name="content"></tiles:insertAttribute>


</body>
</html>