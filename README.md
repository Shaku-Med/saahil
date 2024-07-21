# MY RESTFUL WEBSITE
`Documentations - How I used my application`
###
I used my application to get some data from chuck norris api and displayed them on the user interface so the user can interact with them.
During the process, I faced a lot of trouble fixing bugs and simplifying my code for others to understand.
As you can see the code below, it clearly showed the problems I faced trying to do the search filter of the already gotten search results from the chuck norris api.
###
[CHUCK NORRIS SEARCH API](https://api.chucknorris.io/jokes/search?query=chucky)

```Javascript

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

```