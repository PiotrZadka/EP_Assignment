$(function(){
  $("#all-film-text").click(allFilmsText);
  // json and xml
});

function allFilmsText(){
  console.log("allFilmsText Clicked");
  insertAjaxResult("http://localhost:8080/EP_Assignment/GetAllFilms?format=string", "#results");
}

function allFilmsJson(){
  console.log("allFilmsText Clicked");
  insertAjaxResult("http://localhost:8080/EP_Assignment/GetAllFilms?format=string", "#results", "json");
}

function allFilmsXml(){
  console.log("allFilmsText Clicked");
  insertAjaxResult("http://localhost:8080/EP_Assignment/GetAllFilms?format=string", "#results", "xml");
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
                    insertJSON(text, resultRegion);
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
                    insertXML(text, resultRegion);
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

    var array = JSON.parse(text);

    //console.log(array[2].id);

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

    for(var i = 0; i < array.length; i++)
    {
        $(resultRegion).append("<tr>");
        $(resultRegion).append("<td>" + array[i].id + "</td>");
        $(resultRegion).append("<td>" + array[i].title + "</td>");
        $(resultRegion).append("<td>" + array[i].director + "</td>");
        $(resultRegion).append("<td>" + array[i].year + "</td>");
        $(resultRegion).append("<td>" + array[i].stars + "</td>");
        $(resultRegion).append("<td>" + array[i].review + "</td>");
        $(resultRegion).append("</tr>");
    }
    $(resultRegion).append("</table>");
}

function insertXML(text, resultRegion)
{}

function insertJSON(text, resultRegion)
{}
