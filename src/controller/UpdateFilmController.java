package controller;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import model.Film;
import model.FilmDAO;

/**
 * Servlet implementation class UpdateFilmController
 */
@WebServlet("/UpdateFilm")
public class UpdateFilmController extends HttpServlet {
	private static final long serialVersionUID = 1L;

    public UpdateFilmController() {
        super();

    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String updateMessage = null;
		FilmDAO fdao = new FilmDAO();
		String filmTitle = null;
		String filmDirector = null;
		String filmStars = null;
		String filmReview = null;
		int filmYear = 0;
		
		int filmID = Integer.valueOf(request.getParameter("ID"));
		if(request.getParameterMap().containsKey("Title")) {
			filmTitle = request.getParameter("Title");
		}
		if(request.getParameterMap().containsKey("Year")) {
			filmYear = Integer.valueOf(request.getParameter("Year"));
		}
		if(request.getParameterMap().containsKey("Director")) {
			filmDirector = request.getParameter("Director");
		}
		if(request.getParameterMap().containsKey("Stars")) {
			filmStars = request.getParameter("Stars");
		}
		if(request.getParameterMap().containsKey("Stars")) {
			filmReview = request.getParameter("Review");
		}
		
		Film film = new Film(filmID,filmTitle,filmYear,filmDirector,filmStars,filmReview);
		System.out.println(film.getId()+film.getTitle()+film.getYear()+film.getDirector()+film.getStars()+film.getReview() );
		
		if(fdao.updateFilm(film)) {
			updateMessage = film+" updated successfully";
		}else {
			updateMessage = film+" failed to update";
		}

		request.setAttribute("message", updateMessage);
	    response.setContentType("text/plain");
	    String outputPage = "/WEB-INF/results/filmInsert.jsp";
	    
	    RequestDispatcher dispatcher =
	      request.getRequestDispatcher(outputPage);
	    dispatcher.include(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		doGet(request, response);
	}

}
