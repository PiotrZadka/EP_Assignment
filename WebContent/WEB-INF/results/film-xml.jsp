<%@ page import = "java.util.List" %>
<%@ page import = "javax.xml.bind.JAXBContext" %>
<%@ page import = "javax.xml.bind.JAXBException" %>
<%@ page import = "javax.xml.bind.Marshaller" %>
<%@ page import = "model.Film" %>
<%@ page trimDirectiveWhitespaces = "true" %>

<%
Film film = (Film)request.getAttribute("film");
try{
	JAXBContext jaxbContext = JAXBContext.newInstance(Film.class);
	Marshaller jaxbMarshaller = jaxbContext.createMarshaller();
	jaxbMarshaller.marshal(film, out);
}
catch(JAXBException e){
	e.printStackTrace();
}
%>
