// Each button in front end that is clickable
$(function(){
  $("#all-film-text").click(allFilmsText);
  $("#all-film-json").click(allFilmsJSON);
  $("#all-film-xml").click(allFilmsXML);
  $("#searchFilmButton").click(searchFilm);
  
  $('#retrieveID').click(retrieveID);
  $('#updateSubmit').click(updateFilm);
  $('#deleteSubmit').click(deleteFilm);
  $('#insertSubmit').click(insertFilm);
  
});

// Retrieve all films in plain text
function allFilmsText(){
  console.log("allFilmsText Clicked");
  insertAjaxResult("https://eloquent-yew-227217.appspot.com/GetAllFilms?format=string", "#results", "text");
}
//Retrieve all films as json
function allFilmsJSON(){
  console.log("allFilmsJSON Clicked");
  insertAjaxResult("https://eloquent-yew-227217.appspot.com/GetAllFilms?format=json", "#results", "json");
}
//Retrieve all films as xml
function allFilmsXML(){
  console.log("allFilmsXML Clicked");
  insertAjaxResult("https://eloquent-yew-227217.appspot.com/GetAllFilms?format=xml", "#results", "xml");
}
//Retrieve ID for Update field
function retrieveID(){
  var retrievedID = $('#updateId').val();
  retrieveMovie("https://eloquent-yew-227217.appspot.com/GetFilm?ID="+retrievedID+"&format=json");
}

//Insert new film by user
function insertFilm(){
	var addTitle = $('#addTitle').val();
	var addYear = $('#addYear').val();
	var addDirector = $('#addDirector').val();
	var addStars = $('#addStars').val();
	var addReview = $('#addReview').val();
	
	console.log("https://eloquent-yew-227217.appspot.com/InsertFilm?Title="+addTitle+"&Year="+addYear+"&Director="+addStars+"&Stars="+addStars+"&Review="+addReview);
	addMovieAjax("https://eloquent-yew-227217.appspot.com/InsertFilm?Title="+addTitle+"&Year="+addYear+"&Director="+addStars+"&Stars="+addStars+"&Review="+addReview,"#results");
}
//Retrieve update fields with data
function updateFilm(){
  var stringRequest = "";
  var updateID = $('#updateId').val();
  var updateTitle = $('#updateTitle').val();
  var updateYear = $('#updateYear').val();
  var updateDirector = $('#updateDirector').val();
  var updateStars = $('#updateStars').val();
  var updateReview = $('#updateReview').val();
  
  var testing = encodeURIComponent(updateReview.trim());
  
  // Preparing each variable for GET request by substituting special characters with appropriate ones
  updateID = encodeURIComponent(updateID.trim());
  updateTitle = encodeURIComponent(updateTitle.trim());
  updateYear = encodeURIComponent(updateYear.trim());
  updateDirector = encodeURIComponent(updateDirector.trim());
  updateStars = encodeURIComponent(updateStars.trim());
  updateReview = encodeURIComponent(updateReview.trim());
  var inputData = [];
  
  
  // Checking only for the variables that are set/changed and adding them to whole request. Otherwise ignoring empty inputs.
  if(updateID != ""){
	  stringRequest =stringRequest+"ID="+updateID+"&";
	  inputData.push("ID: "+updateID);
	  if(updateTitle != ""){
		  stringRequest =stringRequest+"Title="+updateTitle+"&";
		  inputData.push("Title: "+updateTitle);
	  }
	  if(updateYear != ""){
		  stringRequest =stringRequest+"Year="+updateYear+"&";
		  inputData.push("Year: "+updateYear);
	  }
	  if(updateDirector != ""){
		  stringRequest =stringRequest+"Director="+updateDirector+"&";
		  inputData.push("Director: "+updateDirector);
	  }
	  if(updateStars != ""){
		  stringRequest =stringRequest+"Stars="+updateStars+"&";
		  inputData.push("Stars: "+updateStars);
	  }
	  if(updateReview != ""){
		  stringRequest =stringRequest+"Review="+updateReview+"&";
		  inputData.push("Review: "+updateReview);
	  }
    
	  stringRequest = stringRequest.substring(0, stringRequest.length - 1);
	  console.log(stringRequest);
	  updateAjax("https://eloquent-yew-227217.appspot.com/UpdateFilm?"+stringRequest+"",inputData,"#results");
  }else{
	 alert("ID can't be empty");
  }
}
//Removing film by id
function deleteFilm(){
	deleteId = $('#deleteId').val();
	deleteAjax("https://eloquent-yew-227217.appspot.com/DeleteFilm?ID="+deleteId+"","#results");
}

function addMovieAjax(address,resultRegion){
    $.ajax({
        url: address,
        success:
            function(text)
            {
	            $(resultRegion).html("");
	            $(resultRegion).append(text);	
            }
    
    });
}
//Searching for data for one film with radio buttons for each type (json,xml,text)
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
  console.log("https://eloquent-yew-227217.appspot.com/GetFilm?ID="+movieName+"&format="+formatValue+"", "#results", ""+formatValue+"");
  insertAjaxResult("https://eloquent-yew-227217.appspot.com/GetFilm?ID="+movieName+"&format="+formatValue+"", "#results", ""+formatValue+"");
}

//Add new film based on format
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
    else if(format == "text")
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
                    insertJSON(text, resultRegion, address);
                }
        });
    }
}

//Updating input fields in update form
function retrieveMovie(address){
	
    $.ajax({
        url: address,
        success:
            function(text)
            {
                //Update other input fields
                $("#updateTitle").val(text.title);
                $("#updateYear").val(text.year);
                $("#updateDirector").val(text.director);
                $("#updateStars").val(text.stars);
                $("#updateReview").val(text.review);
            }
    
    });
}

// Updating results for update
function updateAjax(address,dataArray,resultRegion){
    $.ajax({
        url: address,
        success:
            function(text)
            {
	            $(resultRegion).html("");
	            $(resultRegion).append(text);	
            }
    
    });
}

//Updating results for delete
function deleteAjax(address,resultRegion){
    $.ajax({
        url: address,
        success:
            function(text)
            {
	            $(resultRegion).html("");
	            $(resultRegion).append(text);	
            }
    
    });
}

//Updating results for insert all films as text
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

//Updating results for insert all films as xml
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

//Updating results for insert all films as json
function insertJSON(text, resultRegion, address)
{
  console.log(text);
  //Load content of jsp (which is json string of all films)
  $(resultRegion).load(address);
}

//Updating results for insert of single films as text
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
