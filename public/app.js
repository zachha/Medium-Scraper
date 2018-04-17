$(document).ready(() => {

    // On click event for Scrape, scrapes Medium for new articles and adds them to the database if they aren't in it then populates cards for each article
    $("#scrapeBtn").on("click", () => {
      console.log("hi");
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
        console.log($(that).parent('div'));
        $.ajax({ method: "PUT", url: `/articles/${btnId}/save` })
          .done(() => {
            //console.log("Article Saved!");
            console.log("that: " + that);
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
         .done((data, that) => {
           //console.log("Article Removed From Saved!");
           console.log("that is: " + that);
           $(that).closest("div").parent('div').toggle();
         })
         .fail(err =>
           console.log("Could not remove from saved! Err: " + err)
         );
     });

});
