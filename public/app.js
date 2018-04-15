$(document).ready(() => {
    document.getElementById("scrape").disabled = false;

    function addArticles(data)  {
        data.forEach( (data) => {
            $("#articles").append(`<div class="card">
                    <h5 class="card-header" data-id=${data._id}>${data.category}</h5>
                    <div class="card-body">
                    <h5 class="card-title">${data.title}<button class="btn btn-primary saveBtn">Save Article</button></h5>
                    <p class="card-text">${data.summary}</p>
                    <a href="${data.link}" class="btn btn-primary" target="_blank">Link to Article</a>
                    </div>
                </div>`);
        }
    );
    }

//$.getJSON("/articles", addArticles(res));

$("#scrapeBtn").on('click', () => {
    console.log("hi");
    $.ajax({ method: "GET",
             url: "/scrape",
             dataType: "json" })
      .done((data) => {
          console.log("scrape done, pulling from db!");
          $.get("/articles", (data) => {
            console.log(data);
            addArticles(data);
          })
          .done( () => console.log("db pull complete!"))
          .fail( err => console.log(err) );
      })
      .fail(err => console.log(err));
});

$("#saveBtn").on('click', () => {
    
})

});
