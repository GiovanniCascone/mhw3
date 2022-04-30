//API imdb
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com',
        'X-RapidAPI-Key': '8d807ca1dcmsh945811eebdbba5bp15dfcejsn226af8cddec3'
    }
};
//Richiesta Film
const endpointFilm ='https://online-movie-database.p.rapidapi.com/title/find';

//API Spotify

// OAuth credenziali
const client_id = '559e65228fd345f2b24a89b0f36dba44';
const client_secret = '8cfda732b2cb410ab58b2f7aa83cbabb';
// Dichiara variabile token
let token;
//Richiesa Token
fetch("https://accounts.spotify.com/api/token",
	{
   method: "post",
   body: 'grant_type=client_credentials',
   headers:
   {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret)
   }
  }
).then(onTokenResponse).then(onTokenJson);

function onTokenResponse(response){
    return response.json();
}
function onTokenJson(json){
    console.log(json);
    token = json.access_token;
}

//Elementi globali
const article_r = document.querySelector('[data-article="ricerca"]');
const article_n = document.querySelector('[data-article="normale"]');
const form = document.querySelector('form');
const oscar = document.querySelector('#logo');
const buttons = document.querySelectorAll('button');
//Eventi
form.addEventListener('submit', search);
oscar.addEventListener('click', reset);
for(const button of buttons){
    button.addEventListener('click', song);
}

//Funzione ricerca Film
function search(event){
    event.preventDefault();
    const film_input = document.querySelector('#film');
    if(film_input.value === ''){
        alert("Nessun titolo inserito");
    }else{
        const film_value = encodeURIComponent(film_input.value);
        console.log(film_value);
        article_n.style.display = 'none';
        rest_api = endpointFilm+'?q='+film_value;
        fetch(rest_api, options)
            .then(onResponse)
            .then(onJson);
    }

}

function onResponse(response){
    return response.json();
}

function onJson(json){
    console.log(json);
    article_r.innerHTML='';
    const results = json.results;
    for(let i=0; i<5; i++){
        const immagine = results[i].image;
        const url = immagine.url;
        const img = document.createElement('img');
        img.src = url;
        article_r.appendChild(img);
    }
}

//Funzione Reset quando si preme il logo 'oscar'
function reset(event){
    article_r.innerHTML='';
    article_n.style.display = 'flex';
}

//Funzioni ricerca colonna sonora
function song(event){
    event.preventDefault();
    console.log('hai cliccato');
    const button = event.currentTarget;
    const titolo_f = button.dataset.button;
    const soundtrack = encodeURIComponent(titolo_f);
    console.log(soundtrack);
    fetch("https://api.spotify.com/v1/search?type=album&q=" + soundtrack,
    {
      headers:
      {
        'Authorization': 'Bearer ' + token
      }
    }
  ).then(onResponseSong).then(onJsonSong);
}

function onResponseSong(response){
    console.log('Risposta ricevuta');
    return response.json();
}

function onJsonSong(json){
    console.log('Json ricevuto');
    console.log(json);
    const album = json.albums.items[0];
    console.log(album);
    const img = document.createElement('img')
    const alb_cont = document.querySelector('#album');
    const name = album.name;
    alb_cont.innerHTML=name;
    const url = album.images[1].url;
    console.log(url);
    img.src = url;
    alb_cont.appendChild(img);
}








