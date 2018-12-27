package model;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.ArrayList;
import java.sql.*;

public class FilmDAO {
	 
	Film oneFilm = null;
	Connection conn = null;
    Statement stmt = null;
	String user = "piotrzadka"; //user has only access to the selected schema (filmsDB)
    String password = "assignment123";
    // Note none default port used, 6306 not 3306
    // String url = "jdbc:mysql://mudfoot.doc.stu.mmu.ac.uk:6306/"+user;
    String urlAmazon = "jdbc:mysql://mypersonaldb.c02v0xwfynp3.us-east-2.rds.amazonaws.com:3306/filmsDB";

	public FilmDAO() {}
	
	private void openConnection(){
		// loading jdbc driver for mysql
		try{
		    Class.forName("com.mysql.jdbc.Driver").newInstance();
		} catch(Exception e) { System.out.println(e); }

		// connecting to database
		try{
			// connection string for demos database, username demos, password demos
 			conn = DriverManager.getConnection(urlAmazon, user, password);
		    stmt = conn.createStatement();
		} catch(SQLException se) { System.out.println(se); }	   
    }
	private void closeConnection(){
		try {
			conn.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	private Film getNextFilm(ResultSet rs){
    	Film thisFilm=null;
		try {
			thisFilm = new Film(
					rs.getInt("id"),
					rs.getString("title"),
					rs.getInt("year"),
					rs.getString("director"),
					rs.getString("stars"),
					rs.getString("review"));
		} catch (SQLException e) {
			e.printStackTrace();
		}
    	return thisFilm;		
	}
	
	
	
   public ArrayList<Film> getAllFilms(){
	   
		ArrayList<Film> allFilms = new ArrayList<Film>();
		openConnection();
		
	    // Create select statement and execute it
		try{
		    String selectSQL = "select * from films";
		    ResultSet rs1 = stmt.executeQuery(selectSQL);
	    // Retrieve the results
		    while(rs1.next()){
		    	oneFilm = getNextFilm(rs1);
		    	allFilms.add(oneFilm);
		   }

		    stmt.close();
		    closeConnection();
		} catch(SQLException se) { System.out.println(se); }

	   return allFilms;
   }

   public Film getFilmByID(int id){
	   
		openConnection();
		oneFilm=null;
	    // Create select statement and execute it
		try{
		    String selectSQL = "select * from films where id="+id;
		    ResultSet rs1 = stmt.executeQuery(selectSQL);
	    // Retrieve the results
		    while(rs1.next()){
		    	oneFilm = getNextFilm(rs1);
		    }

		    stmt.close();
		    closeConnection();
		} catch(SQLException se) { System.out.println(se); }

	   return oneFilm;
   }
   
   public boolean insertFilm(Film film) {
	   openConnection();
	   String insertSQL = "insert into films (id,title,year,director,stars,review) values("
	   		+film.id+","+"'"+film.title+"'"+","+film.year+","+"'"+film.director+"'"+","+"'"+film.stars+"'"+","+"'"+film.review+"');";
	   //Checking if the query is correct
	   System.out.print(insertSQL);
	   try {
		  stmt.executeUpdate(insertSQL);
		  stmt.close();
		  closeConnection();
	   } catch(SQLException e){
		   System.out.print(e);
		   return false;
	   }
	   return true;
   }
   
   public Integer deleteFilm(Film film) {
	   int returned = 0;
	   openConnection();
	   // add delete
	   return returned;
   }
   
   public Integer updateFilm(Film film) {
	   int returned = 0;
	   openConnection();
	   // add update
	   return returned;
   }
   
}
