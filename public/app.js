$(document).ready(() => {

    function addNewComment (notesBody, notesId) {
      return $("#notesDiv").append(`
                  <div class="comment">
                    <p>${notes.body}</p>
                    <button type="button" class="deleteComment" aria-label="Close" data-id=${notes._id}>
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>`);
    }
    // On click event for Scrape, scrapes Medium for new articles and adds them to the database if they aren't in it then populates cards for each article
    $("#scrapeBtn").on("click", () => {
      $.get("/scrape", (req, res) => {})
        .done(data => {
          console.log("scrape done, pulling from db!");
          $.get("/articles", () => {})
          .done(() => console.log("db pull complete!"))
          .fail(err => console.log("cannot get this article" + err));
        })
        .fail(err => console.log("cannot scrape this article: " + err));
    });

    // On click event for Save button, adjusts titles and populates saved articles, disables scrape button
    // I think there's an async problem here, I think the button is getting disabled and the if statement is firing but the /saved route is finishing loading AFTER that so the button gets reset and the divs emptied as the index handlebars finishes loading
    $(document).on("click", "#savedBtn", (event) => {
            document.getElementById("scrapeBtn").disabled = true;
            if (!$("#savedArticles").children()) {
              $("#savedArticles").prepend(`<div class="card">
                    <div class="card-body">
                    <h5 class="card-title">No articles saved!</h5>
                    <p class="card-text">Save an article from the main page to see it here and add notes!</p>
                    </div>
                </div>`);
            } 
    });

    // On click event for Home button, resets page back to '/' route and populates unsaved articles from db
    $("#home").on("click", () => {
        document.getElementById("scrapeBtn").disabled = false;
        $("#savedArticles").empty();
        $.get("/", (req, res) => {})
        .then( () => {
            $.get("/articles", data => {
              console.log(data);
              addArticles(data, "articles");
            })
              .done(() => console.log("db pull complete!"))
              .fail(err => console.log(err));
        })
        .fail( err => console.log(err) );
    });

    // saves an article, changes layout to show/add notes and button to remove save
    $(".saveArticle").on('click', function() {
        event.preventDefault();
        let btnId = $(this).attr('data-id');
        let that = this;
        $.ajax({ method: "PUT", url: `/articles/${btnId}/save` })
          .done(() => {
            $(that).closest("div").parent('div').toggle();
          })
          .fail(err => console.log("Could not save! Err: " + err));
    });

    // removes saved article and changes layout back to unsaved div
     $(".saved").on("click", function() {
         event.preventDefault();
         let btnId = $(this).attr("data-id");
         let that = this;
       $.ajax({ method: "PUT", url: `/articles/${btnId}/unsave`})
         .done(() => {
           $(that).closest("div").parent('div').toggle();
         })
         .fail(err =>
           console.log("Could not remove from saved! Err: " + err)
         );
     });
     // toggles the comments modal to show saved comments for the specified article
     $(".seeNotes").on('click', function() {
       event.preventDefault();
       let btnId = $(this).attr("data-id");
       let that = this;
       $.get(`/articles/${btnId}`, (req, res) => {})
         .done((article) => {
           console.log(article);
           $("#notesDiv").html("");
           $("#commentBoxTitle").text(`${article.title} Comments`);
           $("#commentSubmit").attr("data-id", `${article._id}`);
           console.log(article.note);
           // if there are notes for the article, create divs showing the comments, if empty, create a div saying there are none
           if(article.note.length > 1) {
             for (notes in article.note) {
               let noteBody = notes.body;
               let noteId = notes._id;
               addNewComment(noteBody, noteId);             
              }
            } else  {
             $("#notesDiv").append(`
             <div id="noComment">
                <p>No comments found for this article!</p>
             </div>
            `)}

           $("#comments").modal('toggle');
         })
         .fail(err => console.log(err));
     })

  $("#commentSubmit").on('submit', function(e) {
    e.preventDefault();
    let thisId = $(this).attr("data-id");
    console.log(thisId);
    console.log("anything");
    $.post(`/articles/${thisId}/addnote`, (req, res) => {})
    .done( (note) => {
      console.log(note);
      let noteBody = note.body;
      let noteId = note._id;
      if(document.getElementById("noComment")) {
        $("#notesDiv").html(addNewComment(noteBody, noteId))
        console.log("new comment!");
      } else {$("#notesDiv").append(addNewComment(noteBody, noteId))
        console.log("new comment, added to other comments");
      }
    })
    .catch(err => console.log(err));
  })

});
