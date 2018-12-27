package controller;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import model.Film;
import model.FilmDAO;

/**
 * Servlet implementation class InsertFilmController
 */
@WebServlet("/InsertFilm")
public class InsertFilmController extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public InsertFilmController() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		PrintWriter out = response.getWriter();
		String insertMessage = null;
		FilmDAO fdao = new FilmDAO();
		int filmID = Integer.valueOf(request.getParameter("ID"));
		String filmTitle = request.getParameter("Title");
		int filmYear = Integer.valueOf(request.getParameter("Year"));
		String filmDirector = request.getParameter("Director");
		String filmStars = request.getParameter("Stars");
		String filmReview = request.getParameter("Review");
		Film film = new Film(filmID,filmTitle,filmYear,filmDirector,filmStars,filmReview);
		
		if(fdao.insertFilm(film)) {
		insertMessage = film+" inserted successfully";
		}else {
			insertMessage = film+" failed to insert";
		}

		request.setAttribute("message", insertMessage);
	    response.setContentType("text/plain");
	    String outputPage = "/WEB-INF/results/filmInsert.jsp";
	    
	    RequestDispatcher dispatcher =
	      request.getRequestDispatcher(outputPage);
	    dispatcher.include(request, response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
