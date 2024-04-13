let feedContent = Array.from(document.querySelectorAll('#feed article'));
let headContent = Array.from(document.querySelectorAll('#head .item'));
const sidebarList = document.querySelector('#popular-communities-list');
const sidebar = document.querySelector('#sidebar');

let js_object;

let HEAD_ARTICLE = [];
let HEAD_ARTICLE_TITLE = [];
let HEAD_ARTICLE_DESCRIPTION = [];
let HEAD_ARTICLE_NAME = [];
let HEAD_ARTICLE_ICON = [];

let SUBREDDIT_ICON = [];
let SUBREDDIT_NAME = [];
let SUBREDDIT_MEMBERS = [];

function onClick(){
    let button_previous = document.querySelector('#previous-head');
    let button_next = document.querySelector('#next-head');
    
    let items = document.querySelectorAll('#head .item');

    if(button_previous.classList.contains('hidden')){
        
        button_previous.classList.remove('hidden');
        button_next.classList.add('hidden');

        for(let item of items){
            let index = parseInt(item.dataset.index);
            item.style.backgroundImage = HEAD_ARTICLE[index];
            item.querySelector('.title').textContent = HEAD_ARTICLE_TITLE[index];
            item.querySelector('.description').textContent = HEAD_ARTICLE_DESCRIPTION[index];
            item.querySelector('.name').textContent = HEAD_ARTICLE_NAME[index];
            item.querySelector('img').src = HEAD_ARTICLE_ICON[index];
        }
    }else{        
        button_previous.classList.add('hidden');
        button_next.classList.remove('hidden');

        for(let item of items){
            let index = parseInt(item.dataset.index) - 1;
            item.style.backgroundImage = HEAD_ARTICLE[index];
            item.querySelector('.title').textContent = HEAD_ARTICLE_TITLE[index];
            item.querySelector('.description').textContent = HEAD_ARTICLE_DESCRIPTION[index];
            item.querySelector('.name').textContent = HEAD_ARTICLE_NAME[index];
            item.querySelector('img').src = HEAD_ARTICLE_ICON[index];
        }
    }

}

let urlMoreContent;

function loadMoreContent(){
    let feed = document.querySelector('#feed');
    let docToLoad = 1;
    for (let i = 0; i < docToLoad; i++) {
        let item = document.createElement('article');
        let item_content = document.createElement('div');
        item.classList.add('item');
        item.dataset.index = feedContent.length + 1;
        item_content.classList.add('insert');
        item.appendChild(item_content);
        feedContent.push(item);
        feed.appendChild(item);
        loadContent(item, urlMoreContent);
    }
}

// Funzione per controllare se l'utente ha raggiunto il fondo della pagina
function checkScroll() {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const windowHeight = window.innerHeight;
    const bodyHeight = document.body.offsetHeight;

    if(sidebar.dataset.position === "1" ){
        sidebar.dataset.position === "0";
        if(scrollTop <  235){
            sidebar.style.marginTop = 15 + 'px';
            sidebar.classList.remove('sticky');
        }
    }else{
        sidebar.dataset.position === "1";
        if(scrollTop >= 235){
            sidebar.classList.add('sticky');
        }
    }

    // Se l'utente ha raggiunto il fondo della pagina
    if (scrollTop + windowHeight >= bodyHeight) {
        loadMoreContent();
    }
}

function onCLickMore(event){
    let t = event.currentTarget;
    e=t;
    let div = document.createElement('div');

    div.classList.add('text');
    div.classList.add('flex');
    div.classList.add('flex-center');
    
    t.innerHTML = '';
    sidebarList.innerHTML = '';

    if(t.dataset.mode === 'more'){
        document.querySelector('#sidebar').style.height = '500px';
        t.dataset.mode = 'less';
        div.textContent = 'See less';

        for(let i = 0; i < SUBREDDIT_ICON.length; i++){
            let item = document.createElement('div');
            item.classList.add('item');
            let container = document.createElement('div');
            container.classList.add('container');
            container.classList.add('flex');
            let content = document.createElement('div');
            content.classList.add('content');
            content.classList.add('flex');
            let image = document.createElement('div');
            image.classList.add('image');
            let img = document.createElement('img');
            img.src = SUBREDDIT_ICON[i];
            let text = document.createElement('div');
            text.classList.add('text');
            text.classList.add('flex');
            let name = document.createElement('div');
            name.classList.add('name');
            name.textContent = SUBREDDIT_NAME[i];
            let members = document.createElement('div');
            members.classList.add('members');
            members.textContent = SUBREDDIT_MEMBERS[i];
            text.appendChild(name);
            text.appendChild(members);
            image.appendChild(img);
            content.appendChild(image);
            content.appendChild(text);
            container.appendChild(content);
            item.appendChild(container);
            sidebarList.appendChild(item);
        }

        t.appendChild(div);
    }else{
        document.querySelector('#sidebar').style.height = '394px';
        t.dataset.mode = 'more';
        div.textContent = 'See more';

        for(let i = 0; i < 4; i++){
            let item = document.createElement('div');
            item.classList.add('item');
            let container = document.createElement('div');
            container.classList.add('container');
            container.classList.add('flex');
            let content = document.createElement('div');
            content.classList.add('content');
            content.classList.add('flex');
            let image = document.createElement('div');
            image.classList.add('image');
            let img = document.createElement('img');
            img.src = SUBREDDIT_ICON[i];
            let text = document.createElement('div');
            text.classList.add('text');
            text.classList.add('flex');
            let name = document.createElement('div');
            name.classList.add('name');
            name.textContent = SUBREDDIT_NAME[i];
            let members = document.createElement('div');
            members.classList.add('members');
            members.textContent = SUBREDDIT_MEMBERS[i];
            text.appendChild(name);
            text.appendChild(members);
            image.appendChild(img);
            content.appendChild(image);
            content.appendChild(text);
            container.appendChild(content);
            item.appendChild(container);
            sidebarList.appendChild(item);
        }
        t.appendChild(div);
    }
}

let previous_head = document.querySelector('#previous-head');
previous_head.addEventListener("click", onClick);

let next_head = document.querySelector('#next-head');
next_head.addEventListener("click", onClick);

let more = document.querySelector('#more');
more.addEventListener("click", onCLickMore)


function onEnterSearch(e){
    if(e.key === "Enter"){
        let value = searchbar.value;
        value = encodeURIComponent(value);
        urlMoreContent = `https://www.reddit.com/search.json?q=${value}&limit=100`;
        firstLoadContent();
    }
}

const searchbar = document.querySelector('#searchbar');
searchbar.addEventListener("keyup", onEnterSearch)

window.addEventListener("scroll", checkScroll);

function test(){
    console.log(Array.from(document.querySelectorAll(".main-container .subnav [data-recent = '1']")));
}

function recentClick(e){
    let r = e.currentTarget;
    let recentContent = Array.from(document.querySelectorAll(".main-container .subnav [data-recent = '1'] .recent"));
    let door = document.querySelector('[data-navtype = recent] .door');
    if(parseInt(r.dataset.click) === 0){
        r.dataset.click = 1;
        door.textContent = '^';
        for(let recent of recentContent){
            recent.classList.add('flex');
            recent.classList.remove('hidden');
        }
    }else{
        r.dataset.click = 0;
        door.textContent = 'V';
        for(let recent of recentContent){
            recent.classList.remove('flex');
            recent.classList.add('hidden');
        }
    }
}

let recent = document.querySelector('[data-navtype = recent]');
recent.addEventListener('click', recentClick);

let topics = document.querySelector('[data-navtype = topics]');
let resources = document.querySelector('[data-navtype = resources]');

function firstHeadLoad(){
    let items = document.querySelectorAll('#head .item');
    for(let item of items){
        let index = parseInt(item.dataset.index) - 1;
        item.style.backgroundImage = HEAD_ARTICLE[index];
        item.querySelector('.title').textContent = HEAD_ARTICLE_TITLE[index];
        item.querySelector('.description').textContent = HEAD_ARTICLE_DESCRIPTION[index];
        item.querySelector('.name').textContent = HEAD_ARTICLE_NAME[index];
        item.querySelector('img').src = HEAD_ARTICLE_ICON[index];
    }   
}

function firstSidebarLoad(){
    sidebarList.innerHTML = '';

    document.querySelector('#sidebar').style.height = '394px';

    for(let i = 0; i < 4; i++){
        let item = document.createElement('div');
        item.classList.add('item');
        let container = document.createElement('div');
        container.classList.add('container');
        container.classList.add('flex');
        let content = document.createElement('div');
        content.classList.add('content');
        content.classList.add('flex');
        let image = document.createElement('div');
        image.classList.add('image');
        let img = document.createElement('img');
        img.src = SUBREDDIT_ICON[i];
        let text = document.createElement('div');
        text.classList.add('text');
        text.classList.add('flex');
        let name = document.createElement('div');
        name.classList.add('name');
        name.textContent = SUBREDDIT_NAME[i];
        let members = document.createElement('div');
        members.classList.add('members');
        members.textContent = SUBREDDIT_MEMBERS[i];
        text.appendChild(name);
        text.appendChild(members);
        image.appendChild(img);
        content.appendChild(image);
        content.appendChild(text);
        container.appendChild(content);
        item.appendChild(container);
        sidebarList.appendChild(item);
    }
    recentLoad();
}

function recentLoad(){
    let recent = Array.from(document.querySelectorAll(".main-container .subnav [data-recent = '1']"));
    for(let i = 0; i < 3; i++){
        let externDiv = document.createElement('div');
        externDiv.classList.add('hidden');
        externDiv.classList.add('align-center');
        externDiv.classList.add('flex-start');
        externDiv.classList.add('recent');

        let divImg = document.createElement('div');
        divImg.classList.add('image');
        let img = document.createElement('img');
        img.src = SUBREDDIT_ICON[i];
        divImg.appendChild(img);

        let divText = document.createElement('div');
        divText.classList.add('text');
        divText.classList.add('flex');
        divText.classList.add('align-center');
        divText.classList.add('flex-start');
        divText.textContent = SUBREDDIT_NAME[i];

        externDiv.appendChild(divImg);
        externDiv.appendChild(divText);

        recent[i].appendChild(externDiv);
    }
}

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
    urlMoreContent = `https://www.reddit.com/new.json?limit=100`;
    firstLoadContent();
});

/*                     TOKEN                     */
/*************************************************/

/*************************************************/
/*                      HEAD                     */

function onIconJson(json){
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
    SUBREDDIT_NAME.push('r/'+json.data.display_name);
    SUBREDDIT_MEMBERS.push(json.data.subscribers.toLocaleString('it-IT') + " members");
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


/*************************************************/
/*                      FEED                     */
let r;
function loadContent(article, url){
    let index = article.dataset.index;
    fetch(url, {
            method: 'GET'
        }
    ).then(onResponse, onFailure).then((json) => {
        index = index % json.data.dist;
        let feed = document.querySelector('#feed');
        let feedContent = Array.from(document.querySelectorAll('#feed article'));
        article.innerHTML = '';

        let externDiv = document.createElement('div');
        externDiv.classList.add('insert');
        externDiv.classList.add('flex');
        externDiv.classList.add('flex-column');
        let subred = document.createElement('div');
        subred.classList.add('subreddit');
        subred.classList.add('flex');
        subred.classList.add('align-center');
        let icon = document.createElement('div');
        icon.classList.add('icon');
        icon.classList.add('flex');
        icon.classList.add('flex-center');
        icon.classList.add('align-center');



        let img = document.createElement('img');
        let name = document.createElement('div');
        name.classList.add('name');

        let subreddit = json.data.children[index].data.subreddit_name_prefixed;
        fetch(`https://www.reddit.com/${subreddit}/about.json`).then(onResponse, onFailure).then((json) => {
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

            
            img.src = ret;    
            icon.appendChild(img);
            name.textContent = 'r/'+json.data.display_name
        });


        let title = document.createElement('div');
        title.classList.add('title');

        let text = document.createElement('div');
        text.classList.add('text');

        let divImg = document.createElement('div');
        divImg.classList.add('flex');
        divImg.classList.add('flex-center');
        divImg.classList.add('align-center');

        let imgArticle = document.createElement('img');
        // imgArticle.src = json.data.children[index].data.thumbnail;
        // imgArticle.width = json.data.children[index].data.thumbnail_width;
        // imgArticle.height = json.data.children[index].data.thumbnail_height;

        title.textContent = json.data.children[index].data.title;

        let content= json.data.children[index].data.selftext;
        if(content.length > 403){
            content = content.substring(0, 400) + "...";
        }
        text.textContent = content;

        subred.appendChild(icon);
        subred.appendChild(name);

        externDiv.appendChild(subred);
        externDiv.appendChild(title);
        externDiv.appendChild(text);
        let thumb = json.data.children[index].data.thumbnail;


        let indexStr = url.indexOf('.png');
        let ret = "";
        if(indexStr > 0){
            ret = thumb.substring(0, indexStr+4);
        }
        if(ret === ""){
            indexStr = thumb.indexOf('.jpg');
            if(indexStr > 0){
                ret = thumb.substring(0, indexStr+4);
            }
        }
        if(ret === ""){
            indexStr = thumb.indexOf('.jpeg');
            if(indexStr > 0){
                ret = thumb.substring(0, indexStr+4);
            }
        }
        thumb = ret;
        if(thumb !== ''){
            let url = json.data.children[index].data.url;

            indexStr = url.indexOf('.png');
            ret = "";
            if(indexStr > 0){
                ret = url.substring(0, indexStr+4);
            }
            if(ret === ""){
                indexStr = url.indexOf('.jpg');
                if(indexStr > 0){
                    ret = url.substring(0, indexStr+4);
                }
            }
            if(ret === ""){
                indexStr = url.indexOf('.jpeg');
                if(indexStr > 0){
                    ret = url.substring(0, indexStr+5);
                }
            }
            if(ret === ''){
                ret = thumb;
            }
            imgArticle.src = ret;
            divImg.appendChild(imgArticle);
            externDiv.appendChild(divImg); 
        }
        article.appendChild(externDiv);

    }); 

}
function firstLoadContent(){
    let url = urlMoreContent;
    for(let i = 0; i < feedContent.length; i++){
        loadContent(feedContent[i], url);
    }
}


/*                      FEED                     */
/*************************************************/
