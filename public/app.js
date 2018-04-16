$(document).ready(() => {
    document.getElementById("scrapeBtn").disabled = false;

    function addArticles(data)  {
        data.forEach( (data, articleDiv) => {
            $("#" + articleDiv).append(`<div class="card">
                    <h5 class="card-header" data-id=${data._id}>${data.category}</h5>
                    <div class="card-body">
                    <h5 class="card-title">${data.title}<button class="btn btn-primary saveArticle">Save Article</button></h5>
                    <p class="card-text">${data.summary}</p>
                    <a href="${data.link}" class="btn btn-primary" target="_blank">Link to Article</a>
                    </div>
                </div>`);
        }
    );
    }

    // On click event for Scrape, scrapes Medium for new articles and adds them to the database if they aren't in it then populates cards for each article
    $("#scrapeBtn").on("click", () => {
      console.log("hi");
      $.ajax({ method: "GET", url: "/scrape", dataType: "json" })
        .done(data => {
          console.log("scrape done, pulling from db!");
          $.get("/articles", data => {
            console.log(data);
            addArticles(data, articles);
          })
            .done(() => console.log("db pull complete!"))
            .fail(err => console.log(err));
        })
        .fail(err => console.log(err));
    });

    // On click event for Save button, adjusts titles and populates saved articles, disables scrape button
    $("#saveBtn").on("click", () => {
      $("#articles").empty();
      $.get("/saved", data => {
        console.log("saved articles: " + data);
        addArticles(data, savedArticles);
        document.getElementById("scrapeBtn").disabled = true;
      });
    });

    // On click event for Home button, resets page back to '/' route and populates unsaved articles from db
    $("#home").on("click", () => {
        $("#savedArticles").empty();
        $.get("/", (req, res) => {})
        .then( () => {
            $.get("/articles", data => {
              console.log(data);
              addArticles(data, articles);
            })
              .done(() => console.log("db pull complete!"))
              .fail(err => console.log(err));
        })
        .fail( err => console.log(err) );
    })

    $(".saveArticle").on('click', () => {
        $.put("/save")
    })



});
