$(document).ready(() => {
    
    /*
    function addArticles(data)  {
    data.forEach(
    $("#articles").append(
        `<div class="card">
           <h5 class="card-header" data-id=${data[i]._id}>${data[i].category}</h5>
           <div class="card-body">
             <h5 class="card-title">${data[i].title}</h5>
             <p class="card-text">${data[i].summary}</p>
             <a href="${data[i].link}" class="btn btn-primary">Link to Article</a>
           </div>
         </div>`
    )
    );
    }
    */

//$.getJSON("/articles", addArticles(res));

$("#scrapeBtn").on('click', function() {
    console.log("hi");
    $.ajax({
        method: "GET",
        url: "/scrape"
    }).then( addArticles(data) )
    .fail( err => console.log(err))
    .done( () => console.log("scrape done + added!"));
});

});
