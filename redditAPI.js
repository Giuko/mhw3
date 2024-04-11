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
).then(onTokenResponse, onFailure).then(onTokenJson).then(e => {HeadLoading()});

/*                     TOKEN                     */
/*************************************************/

/*************************************************/
/*                      HEAD                     */

function onIconJson(json){
    return json.data.icon_img;
}
function useIcon(icon){
    return icon;
}
function getIcon(subreddit){
    let url
    let icon = fetch(`https://www.reddit.com/r/${subreddit}/about.json`).then(onResponse, onFailure).then(onIconJson).then();
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
        iconPromises.push(getIcon(array[i].data.subreddit).then(iconUrl =>{HEAD_ARTICLE_ICON.push(iconUrl)}));  // Con questo riesco ad accedere al valore della promise, inoltre faccio il push della promise
        HEAD_ARTICLE.push("url("+thumbnail+")");
        HEAD_ARTICLE_DESCRIPTION.push(text);
        HEAD_ARTICLE_NAME.push(subreddit);
        HEAD_ARTICLE_TITLE.push(title);
    }
    //In questo modo attendo tutte promise (ovvero le getIcon) e poi posso usarle senza problemi
    Promise.all(iconPromises).then(() => {
        firstHeadLoad();
    });   
}

const today = new Date();
const formattedDate = today.toISOString().slice(0, 10);
const url_head = `https://oauth.reddit.com/best.json?limit=100`
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