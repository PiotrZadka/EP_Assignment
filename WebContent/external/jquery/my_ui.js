$(function(){
  $("#all-film-text").click(allFilmsText);
  $("#all-film-json").click(allFilmsJSON);
  $("#all-film-xml").click(allFilmsXML);
  $("#searchFilmButton").click(searchFilm);
});

function allFilmsText(){
  console.log("allFilmsText Clicked");
  insertAjaxResult("http://localhost:8080/EP_Assignment/GetAllFilms?format=string", "#results");
}

function allFilmsJSON(){
  console.log("allFilmsJSON Clicked");
  insertAjaxResult("http://localhost:8080/EP_Assignment/GetAllFilms?format=json", "#results", "json");
}

function allFilmsXML(){
  console.log("allFilmsXML Clicked");
  insertAjaxResult("http://localhost:8080/EP_Assignment/GetAllFilms?format=xml", "#results", "xml");
}

function searchFilm(){
  var checkJSON = $('#radio-4').prop('checked');
  var checkXML = $('#radio-5').prop('checked');
  var checkSTRING = $('#radio-6').prop('checked');
  var formatValue;
  var movieName = $("#movieName").val();

  if(checkJSON == true){
	  formatValue = "json";
  }
  else if(checkXML == true){
	  formatValue = "xml";
  }
  else if(checkSTRING == true){
	  formatValue = "stringSingle";
  }
  console.log("http://localhost:8080/EP_Assignment/GetFilm?ID="+movieName+"&format="+formatValue+"", "#results", ""+formatValue+"");
  insertAjaxResult("http://localhost:8080/EP_Assignment/GetFilm?ID="+movieName+"&format="+formatValue+"", "#results", ""+formatValue+"");
}


function insertAjaxResult(address, resultRegion, format)
{
    if(format == "xml")
    {
        $.ajax({
            url: address,
            success:
                function(text)
                {
                    insertXML(text, resultRegion, address);
                }
        });
    }
    else if(format == "json")
    {
        $.ajax({
            url: address,
            success:
                function(text)
                {
                    insertJSON(text, resultRegion, address);
                }
        });
    }
    else if(format == "stringSingle")
    {
        $.ajax({
            url: address,
            success:
                function(text)
                {
                    insertTextSingle(text, resultRegion, address);
                }
        });
    }
    else
    {
        $.ajax({
            url: address,
            success:
                function(text)
                {
                    insertText(text, resultRegion);
                }
        });
    }
}

function insertText(text, resultRegion)
{
    console.log(text);
    var obj = JSON.parse(text);

    $(resultRegion).html("");
    $(resultRegion).append("<table id='results-table'>");

    $(resultRegion).append("<tr>");
    $(resultRegion).append("<th style='width: 100px;'>ID</th>");
    $(resultRegion).append("<th style='width: 200px;'>TITLE</th>");
    $(resultRegion).append("<th style='width: 200px;'>DIRECTOR</th>");
    $(resultRegion).append("<th style='width: 50px;'>YEAR</th>");
    $(resultRegion).append("<th>STARS</th>");
    $(resultRegion).append("<th>REVIEW</th>");
    $(resultRegion).append("</tr>");

    for(var i = 0; i <= obj.length; i++)
    {
        $(resultRegion).append("<tr>");
        $(resultRegion).append("<td>" + obj[i].id + "</td>");
        $(resultRegion).append("<td>" + obj[i].title + "</td>");
        $(resultRegion).append("<td>" + obj[i].director + "</td>");
        $(resultRegion).append("<td>" + obj[i].year + "</td>");
        $(resultRegion).append("<td>" + obj[i].stars + "</td>");
        $(resultRegion).append("<td>" + obj[i].review + "</td>");
        $(resultRegion).append("</tr>");
    }
    $(resultRegion).append("</table>");
}

function insertXML(text, resultRegion, address)
{
	$(resultRegion).html("");
	console.log(text);
	var xmlObject = $(text).find("film").each(function(){
		var id = $(this).find("id").text();
		var title = $(this).find("title").text();
		var year = $(this).find("year").text();
		var director = $(this).find("director").text();
		var stars = $(this).find("stars").text();
		var review = $(this).find("review").text();
		
		
		$(resultRegion).append("<xmp><film></xmp>");
		$(resultRegion).append("<xmp style='margin-left: 10px;'><id>"+id+"</id></xmp>");
		$(resultRegion).append("<xmp style='margin-left: 10px;'><title>"+title+"</title></xmp>");
		$(resultRegion).append("<xmp style='margin-left: 10px;'><year>"+year+"</year></xmp>");
		$(resultRegion).append("<xmp style='margin-left: 10px;'><director>"+director+"</director></xmp>");
		$(resultRegion).append("<xmp style='margin-left: 10px;'><stars>"+stars+"</stars></xmp>");
		$(resultRegion).append("<xmp style='margin-left: 10px;'><review>"+review+"</review></xmp>");
		$(resultRegion).append("<xmp></film></xmp>");
	});
	
	
}

function insertJSON(text, resultRegion, address)
{
  console.log(text);
  //Load content of jsp (which is json string of all films)
  $(resultRegion).load(address);
}

function insertTextSingle(text, resultRegion)
{
    console.log(text);
    var obj = JSON.parse(text);

    $(resultRegion).html("");
    $(resultRegion).append("<table id='results-table'>");

    $(resultRegion).append("<tr>");
    $(resultRegion).append("<th style='width: 100px;'>ID</th>");
    $(resultRegion).append("<th style='width: 200px;'>TITLE</th>");
    $(resultRegion).append("<th style='width: 200px;'>DIRECTOR</th>");
    $(resultRegion).append("<th style='width: 50px;'>YEAR</th>");
    $(resultRegion).append("<th>STARS</th>");
    $(resultRegion).append("<th>REVIEW</th>");
    $(resultRegion).append("</tr>");


        $(resultRegion).append("<tr>");
        $(resultRegion).append("<td>" + obj.id + "</td>");
        $(resultRegion).append("<td>" + obj.title + "</td>");
        $(resultRegion).append("<td>" + obj.director + "</td>");
        $(resultRegion).append("<td>" + obj.year + "</td>");
        $(resultRegion).append("<td>" + obj.stars + "</td>");
        $(resultRegion).append("<td>" + obj.review + "</td>");
        $(resultRegion).append("</tr>");

    $(resultRegion).append("</table>");
}
