const options = {
  method: "GET",
};
async function myFunc() {
  try {
    let html = document.getElementById("jokes");
    if (html) {
      const url = "https://api.chucknorris.io/jokes/random";

      const response = await fetch(url, options);

      const result = await response.json();

      var joke = result.value;

      html.innerHTML = joke;
    }
  } catch (e) {
    console.log("Something went wrong. \n " + e);
  }
}
// GETTING THE CATEGORIES

function loadToPage(data) {
  let html =
    '<div class="card" style="width: 100%;">' +
    '<img src="' +
    data.icon_url +
    '" class="card-img-top">' +
    '<div class="card-body">' +
    '<p class="card-text">' +
    data.value +
    "</p>" +
    '<div class="updated_date"> <span class="up_t">Updated</span>, <p>' +
    new Date(data.updated_at).toDateString() +
    "</p> </div>" +
    "</div>" +
    "</div>";

  let grid_box = document.getElementById("grid_box");
  if (grid_box) {
    grid_box.innerHTML += html;
  } else {
    console.error("Element with id 'grid_box' not found.");
  }
}

async function loadCate() {
  try {
    let ct = await fetch(
      "https://api.chucknorris.io/jokes/categories",
      options,
    );
    if (ct) {
      let cate = await ct.json();
      if (Array.isArray(cate)) {
        for (let i = 0; i < cate.length; i++) {
          let gdata = await fetch(
            "https://api.chucknorris.io/jokes/random?category=" + cate[i] + "",
            options,
          );
          let dt = await gdata.json();
          //
          if (Object.keys(dt).length > 0) {
            loadToPage(dt);
          }
        }
      }
    }
  } catch (e) {
    console.log(e);
  }
}

let search_array = [];

async function SearchResult() {
  try {
    let search_rl = document.getElementById("search_rl");

    if (search_rl) {
      let q = new URLSearchParams(window.location.search).get("q");
      if (q) {
        function prev_cate(data) {
          if (data.length > 0) {
            return (
              "<div style='padding: 10px; color: green !important;'>" +
              data[0] +
              "</div>"
            );
          } else {
            return "";
          }
        }
        function DataPreview(data) {
          try {
            // Generate the HTML card preview.
            let cardHTML =
              '<div id="result_items_' +
              data.id +
              '" class="result_items card mb-3">' +
              '<div class="card-header">' +
              '<img src="' +
              data.icon_url +
              '" alt="Chuck Norris" class="img-fluid rounded-circle" width="50">' +
              '<span class="ml-3">Chuck Norris Joke</span>' +
              "</div>" +
              '<div class="card-body">' +
              '<h5 class="card-title">Joke</h5>' +
              '<p class="card-text p-2 brd">' +
              data.value +
              "</p>" +
              '<h6 class="card-subtitle mb-2 text-muted">Categories:</h6>' +
              '<ul class="list-group list-group-flush">' +
              // I'm previewing all the categories the search result from. Some results have multiple categories.
              prev_cate(data.categories) +
              "</ul>" +
              '<p class="card-text mt-3"><small class="text-muted">Created at: ' +
              new Date(data.created_at).toDateString() +
              "</small></p>" +
              '<p class="card-text"><small class="text-muted">Updated at: ' +
              new Date(data.updated_at).toDateString() +
              "</small></p>" +
              '<a target="_blank" href="' +
              data.url +
              '" class="card-link">View Joke</a>' +
              "</div>" +
              "</div>";

            document.getElementById("results").innerHTML += cardHTML;
            search_array.push(data);
          } catch (e) {
            console.log(e);
          }
        }
        //
        let dt = await fetch(
          "https://api.chucknorris.io/jokes/search?query=" + q + "",
          options,
        );
        let d = await dt.json();
        if (d) {
          if (d.result.length > 0) {
            //
            search_rl.innerHTML =
              "Search Result for: <b class='search_rl'>" +
              q +
              "</b> |  (" +
              d.result.length +
              " Found)";
            document.title =
              "Chuck Norris | " + q + " | " + d.result.length + "";
            //
            for (let i = 0; i < d.result.length; i++) {
              DataPreview(d.result[i]);
              //Waiting for the "For loops" to end.
              if (i >= d.result.length - 1) {
                let filter_data = document.getElementById("filter_data");
                if (search_array.length > 0) {
                  filter_data.oninput = (e) => {
                    let val = e.target.value.toLowerCase();
                    search_array.filter((v) => {
                      let element = document.getElementById(
                        "result_items_" + v.id + "",
                      );
                      if (element) {
                        element.classList.toggle(
                          "hide_me",
                          !JSON.stringify(v).toLowerCase().includes(val),
                        );
                      }
                    });
                  };
                }
              }
            }
          } else {
            document.getElementById("results").innerHTML =
              "No Results for: <b class='search_rl'>" + q + "</b>";
          }
        }
      }
    }
  } catch {}
}

//

function getFORM() {
  let form = document.getElementById("form");
  if (form) {
    form.onsubmit = function (e) {
      e.preventDefault();

      let search = document.getElementById("search");
      // TRIM => PREVENT WRONG USAGE.
      if (search && search.value.trim().length > 0) {
        // Open the search in the same page.
        window.open("../search/?q=" + search.value + "", "_self");
      }
    };
  }
}

function MobileButton() {
  let acbtn = document.getElementById("acbtn");
  let dim = document.getElementById("dim");
  let right_part = document.getElementById("right_part");

  if (acbtn && dim && right_part) {
    acbtn.onclick = function (e) {
      right_part.classList.add("ac");
      dim.classList.add("dim_act");
    };

    dim.onclick = function (e) {
      right_part.classList.remove("ac");
      dim.classList.remove("dim_act");
    };
  }
}

window.onload = function () {
  getFORM();
  MobileButton();
};
