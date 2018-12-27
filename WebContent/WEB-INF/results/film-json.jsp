<%@ page import ="java.util.List"%>
<%@ page import ="com.google.gson.Gson" %>
<%@ page import ="model.Film" %>
<%@ page trimDirectiveWhitespaces="true" %>

<%
Film film = (Film)request.getAttribute("film");
Gson gson = new Gson();
String jsonInString = gson.toJson(film);
response.getWriter().println(jsonInString);
%>