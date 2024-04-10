const client_id = "YZU7TvdCOJUrh4zJvuqp4g";
const client_secret = "r4Lfxa0AsO6DDpjr92HR_4Pek0WryQ";
let token;
function onTokenJson(json){
    token = json.access_token;
    console.log(token)
}

function onTokenResponse(response){
    if(!response.ok){
        console.log('Token non recuperato');
        return;
    }
    
    return response.json();
};
function onFailure(e){
    console.log("Errore: " + e);
};

fetch('https://www.reddit.com/api/v1/access_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret)
    },
    body: 'grant_type=client_credentials'
    
}
).then(onTokenResponse, onFailure).then(onTokenJson);

function onRedditJson(json){
    console.log(json);
};

function onResponseReddit(response){
    if(!response.ok){
        console.log('News non trovata');
        return;
    }
    return response.json();
};

const today = new Date();
const formattedDate = today.toISOString().slice(0, 10);
let username = 'GiukoMG';
let application = 'My University website'
const url1 = `https://oauth.reddit.com/search?q=timestamp:${formattedDate}&sort=hot&limit=10`
const url2 = 'https://www.reddit.com/r/aww/.json?limit=10'
const url3 = `https://www.reddit.com/r/popular/.json?limit=10`;
const url4 = 'https://www.reddit.com/best'

const method = {
    'method': 'POST'
};

const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
};
const body = {
    'grant_type': 'password',
    'username': 'GiukoMG',
    'password' : 'baAuhXuV)9vw9y,'
};

function onRedditResponse(response){
    if(!response.ok){
        console.log("Not found: " + response.status);
    }
    return response.json();
}

function onRedditJson(json){
    console.log(json);
}
function onClickSearch(){
    console.log('Click');
    fetch('https://www.reddit.com/api/v1/me', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(onRedditResponse, onFailure).then(onRedditJson);
}