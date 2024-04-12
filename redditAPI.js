function onFailure(e){
    console.log("Errore: " + e);
};

function onResponse(response){
    if(!response.ok){
        console.log('Response non recuperato');
        return;
    }
    
    return response.json();
};

/*************************************************/
/*                     TOKEN                     */

const client_id = "QtV2FIBdo0WpX4jD6ZGWOQ";
const client_secret = "kiRP54JZQcapxlAPby_HpI2qJpmrmw";
const username = 'GiukoMG';
const password = 'baAuhXuV)9vw9y,'
const application = 'My University website'
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

fetch('https://www.reddit.com/api/v1/access_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret)
    },
    body: `grant_type=password&username=${username}&password=${password}`
}
).then(onTokenResponse, onFailure).then(onTokenJson).then(e => {
    HeadLoading();
    loadSubreddit();
});

/*                     TOKEN                     */
/*************************************************/

/*************************************************/
/*                      HEAD                     */

function onIconJson(json){
    let ico = json.data.community_icon;
    let index = ico.indexOf('.png');
    let ret = ico.substring(0, index+4);
    if(ret === ""){
        ret = json.data.icon_img;
    }
    
    return ret;
}
function useIcon(icon){
    return icon;
}
function getIcon(subreddit){
    let url
    let icon = fetch(`https://www.reddit.com/r/${subreddit}/about.json`).then(onResponse, onFailure).then(onIconJson).then();   //Con questa API ottengo le icone (non ho bisogno di autentificazione) 
    return icon;
}

function onHeadJson(json){
    res = json;
    let nels = json.data.dist;
    let elements = json.data;
    const array = [];
    for(let i = 0; i < nels; i++){
        let t = json.data.children[i].data.thumbnail;
        if(t.endsWith('.jpg')){
            array.push(json.data.children[i]);
        }
    }
    let nelsFiltered = array.length;
    if(nelsFiltered > 5){
        nelsFiltered = 5;
    }
    
    HEAD_ARTICLE = [];
    HEAD_ARTICLE_TITLE = [];
    HEAD_ARTICLE_DESCRIPTION = [];
    HEAD_ARTICLE_ICON = [];
    HEAD_ARTICLE_NAME = [];
    let iconPromises = [];
    for(let i = 0; i < nelsFiltered; i++){
        let text = array[i].data.title;
        const title = text.substring(0, 15);
        const subreddit = array[i].data.subreddit_name_prefixed;
        const thumbnail = array[i].data.thumbnail;
        if(text.length >= 33){
            text = text.substring(0, 30) + "...";
        }
        iconPromises.push(getIcon(array[i].data.subreddit).then(iconUrl =>{
            HEAD_ARTICLE_ICON.push(iconUrl);
            HEAD_ARTICLE.push("url("+thumbnail+")");
            HEAD_ARTICLE_DESCRIPTION.push(text);
            HEAD_ARTICLE_NAME.push(subreddit);
            HEAD_ARTICLE_TITLE.push(title);
        }));  // Con questo riesco ad accedere al valore della promise, inoltre faccio il push della promise
    }
    //In questo modo attendo tutte promise (ovvero le getIcon) e poi posso usarle senza problemi
    Promise.all(iconPromises).then(() => {
        firstHeadLoad();
    });   
}

const today = new Date();
const formattedDate = today.toISOString().slice(0, 10);
const url_head = `https://oauth.reddit.com/best.json?limit=100`;
function HeadLoading(){
    fetch(url_head, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(onResponse, onFailure).then(onHeadJson);
}


/*                      HEAD                     */
/*************************************************/

/*************************************************/

/*                 SUBREDDIT                     */



function onSubredditInfoJson(json){
    
    let ico = json.data.community_icon;
    let index = ico.indexOf('.png?');
    let ret = "";
    if(index > 0){
        ret = ico.substring(0, index+4);
    }
    if(ret === ""){
        index = ico.indexOf('.jpg?');
        if(index > 0){
            ret = ico.substring(0, index+4);
        }
    }
    if(ret === ""){
        ret = json.data.icon_img;
    }

    
    SUBREDDIT_ICON.push(ret);    
    SUBREDDIT_NAME.push(json.data.display_name);
    SUBREDDIT_MEMBERS.push(json.data.subscribers.toLocaleString('it-IT') + " members");
}

function onSubredditJson(json){
    console.log(json);
}

function onBestJson(json){
    let visited = [];
    for(let i = 0; i < json.data.dist; i++){
        let name = json.data.children[i].data.subreddit_name_prefixed;
        if(!visited.includes(name)){
            visited.push(name);
        }
    }
    let promise = [];
    for(let i = 0; i < visited.length; i++){
        promise.push(fetch(`https://www.reddit.com/${visited[i]}/about.json`).then(onResponse, onFailure).then(onSubredditInfoJson));
    }         
    Promise.all(promise).then(() => {
        firstSidebarLoad();
    });   
}


function loadSubreddit(){
    SUBREDDIT_ICON = [];
    SUBREDDIT_NAME = [];
    SUBREDDIT_MEMBERS = [];
    let subToLoad = 1;
    let iconPromises = [];
    
    const url = `https://oauth.reddit.com/best.json`
    fetch(url, {
            method: 'GET'
        }
    ).then(onResponse, onFailure).then(onBestJson);    
}

/*                 SUBREDDIT                     */
/*************************************************/
