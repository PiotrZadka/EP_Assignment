package controller;

import model.Film;
import model.FilmDAO;

public class MainController {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		FilmDAO fdao = new FilmDAO();
		Film filmTest = new Film(1,"test",2018,"test","test","test");
		
	}

}
