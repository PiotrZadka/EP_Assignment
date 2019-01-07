package controller;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import model.Film;
import model.FilmDAO;

/**
 * Servlet implementation class Controller
 */
@WebServlet("/GetAllFilms")
public class GetAllFilmsController extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
    public GetAllFilmsController() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		FilmDAO fdao = new FilmDAO();
		
		// Storing all films in a films object array
		ArrayList<Film> films = fdao.getAllFilms();
		
		// Setting atribute containing all films and passing to result .jsp based on format
		request.setAttribute("films", films);
	    String format = request.getParameter("format");
	    String outputPage;
	    if ("xml".equals(format)) {
	      response.setContentType("text/xml");
	      outputPage = "/WEB-INF/results/films-xml.jsp";
	    } else if ("json".equals(format)) {
	      response.setContentType("application/json");
	      outputPage = "/WEB-INF/results/films-json.jsp";
	    } else {
	      response.setContentType("text/plain");
	      outputPage = "/WEB-INF/results/films-string.jsp";
	    }
	    
	    RequestDispatcher dispatcher =
	      request.getRequestDispatcher(outputPage);
	    dispatcher.include(request, response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
