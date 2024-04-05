let feedContent = Array.from(document.querySelectorAll('#feed article'));
let headContent = Array.from(document.querySelectorAll('#head .item'));
const sidebarList = document.querySelector('#popular-communities-list');
const sidebar = document.querySelector('#sidebar');

let recentContent = Array.from(document.querySelectorAll('.subnav .recent'));
let js_object;

let HEAD_ARTICLE = [];
let HEAD_ARTICLE_TITLE = [];
let HEAD_ARTICLE_DESCRIPTION = [];
let HEAD_ARTICLE_NAME = [];
let HEAD_ARTICLE_ICON = [];

let SIDEBAR_ICON = [];
let SIDEBAR_NAME = [];
let SIDEBAR_MEMBERS = [];

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

        for(let i = 0; i < SIDEBAR_ICON.length; i++){
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
            img.src = SIDEBAR_ICON[i];
            let text = document.createElement('div');
            text.classList.add('text');
            text.classList.add('flex');
            let name = document.createElement('div');
            name.classList.add('name');
            name.textContent = SIDEBAR_NAME[i];
            let members = document.createElement('div');
            members.classList.add('members');
            members.textContent = SIDEBAR_MEMBERS[i];
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
            img.src = SIDEBAR_ICON[i];
            let text = document.createElement('div');
            text.classList.add('text');
            text.classList.add('flex');
            let name = document.createElement('div');
            name.classList.add('name');
            name.textContent = SIDEBAR_NAME[i];
            let members = document.createElement('div');
            members.classList.add('members');
            members.textContent = SIDEBAR_MEMBERS[i];
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

window.addEventListener("scroll", checkScroll);

function recentClick(e){
    let r = e.currentTarget;
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

function onError(error){
    console.log('Error: ' + error);
}

function onResponse(response){
    return response.json();
}

function onJson(json){
    js_object = json;
    let heads = json.head;
    let sidebars = json.sidebar;

    for(let head of heads){
        HEAD_ARTICLE.push(head.article);
        HEAD_ARTICLE_TITLE.push(head.title);
        HEAD_ARTICLE_DESCRIPTION.push(head.description);
        HEAD_ARTICLE_NAME.push(head.name);
        HEAD_ARTICLE_ICON.push(head.icon);
    }

    for(let sidebar of sidebars){
        SIDEBAR_ICON.push(sidebar.url);
        SIDEBAR_NAME.push(sidebar.name);
        SIDEBAR_MEMBERS.push(sidebar.members);
    }
}

fetch('mhw3.json')
    .then(onResponse, onError)
    .then(onJson)

