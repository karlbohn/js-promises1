let fav = 7;
let baseURL = "http://numbersapi.com";

// #1
async function getData() {
    let data = await $.getJSON(`${baseURL}/${fav}?json`);
    console.log(data);
}
getData();

// #2
let favs = [32, 42, 64]
async function multiRequest() {
    let data = await $.getJSON(`${baseURL}/${favs}?json`);
    console.log(data);
}
multiRequest();

// #3
async function getFacts() {
    let facts = await Promise.all(
        Array.from({ length: 4 }, () => $.getJSON(`${baseURL}/${fav}?json`))
      );
      facts.forEach(data => {
        $('body').append(`<p>${data.text}</p>`);
      });
}
getFacts();