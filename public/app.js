// Grab the articles as a json
$.getJSON("/articles", function(data) {
  // For each one
  for (var i = 0; i < data.length; i++) {
    // Display the apropos information on the page
    // $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");

    var title = data[i].title;
    var href = data[i].link;
    var id = data[i]._id;

    $("#articles").append('<div class="row"><div class="col s12"><div class="card blue-grey darken-1"><div class="card-content white-text"><span class="card-title">' + title + '</span><p data-id=' + id + '>' + href + '</p></div><div class="card-action"><a data-id=' + id + ' class="commentbtn">Comment</a><a class="bookmarkbtn">Bookmark</a></div></div></div></div>');
  }
});


// Whenever someone clicks a comment link tag
$(document).on("click", ".commentbtn", function() {
  // Empty the notes from the note section
  $("#titleinput").empty();
  $("#bodyinput").empty();
    // Save the id from the a tag
  var thisId = $(this).attr("data-id");

  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    // With that done, add the note information to the page
    .done(function(data) {
      console.log(data);
      $('#modal1').modal('open');
      // The title of the article
      $("#modaltitle").text(data.title);
      // An input to enter a new title
      // $("#titleinput").append("<input id='titleinput' name='title' >");
      // // A textarea to add a new note body
      // $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
      // // A button to submit a new note, with the id of the article saved to it
      $("#savenote").attr("data-id", data._id);

      // If there's a note in the article
      if (data.note) {
        // Place the title of the note in the title input
        $("#titleinput").val(data.note.title);
        // Place the body of the note in the body textarea
        $("#bodyinput").val(data.note.body);
      }
    });
});

// When you click the savenote button
$(document).on("click", "#savenote", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      // Value taken from title input
      title: $("#titleinput").val(),
      // Value taken from note textarea
      body: $("#bodyinput").val()
    }
  })
    // With that done
    .done(function(data) {
      // Log the response
      console.log(data);
      // Empty the notes section
      $("#notes").empty();
    });

  // Also, remove the values entered in the input and textarea for note entry
  $("#titleinput").val("");
  $("#bodyinput").val("");
});

// When the Scrape Now Button is clicked
$(document).on("click", "#scrapenow", function() {
    // Now make an ajax call for the scrape
    $.ajax({
        method: "GET",
        url: "/scrape"
    }).done(function(data) {
        console.log(data);
        location.reload();
    })
});

// Code for Modal functionality
$(document).ready(function(){
    // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
    $('.modal').modal();
});

// Whenever someone clicks a bookmark
$(document).on("click", ".bookmarkbtn", function() {
    // Empty the notes from the note section
    $("#titleinput").empty();
    $("#bodyinput").empty();
    // Save the id from the a tag
    var thisId = $(this).attr("data-id");

    // Now make an ajax call for the Article
    $.ajax({
        method: "GET",
        url: "/articles/" + thisId
    })
    // With that done, add the note information to the page
    //     .done(function(data) {
    //         console.log(data);
    //         $('#modal1').modal('open');
    //         // The title of the article
    //         $("#modaltitle").text(data.title);
    //         // An input to enter a new title
    //         // $("#titleinput").append("<input id='titleinput' name='title' >");
    //         // // A textarea to add a new note body
    //         // $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
    //         // // A button to submit a new note, with the id of the article saved to it
    //         $("#savenote").attr("data-id", data._id);
    //
    //         // If there's a note in the article
    //         if (data.note) {
    //             // Place the title of the note in the title input
    //             $("#titleinput").val(data.note.title);
    //             // Place the body of the note in the body textarea
    //             $("#bodyinput").val(data.note.body);
    //         }
    //     });
});