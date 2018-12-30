<%@ page trimDirectiveWhitespaces="true" %>

<%
String message = (String)request.getAttribute("message");
response.getWriter().println(message);
%>