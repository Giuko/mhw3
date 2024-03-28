function onClick(){
    console.log('Next head');

    let button_previous = document.querySelector('#previous-head');
    let button_next = document.querySelector('#next-head');

    let item1 = document.querySelector('#item1');
    let title1 = document.querySelector('#item1 .overlay .title');
    let description1 = document.querySelector('#item1 .overlay .description');
    let icon1 = document.querySelector('#item1 .overlay .community img');
    let group1 = document.querySelector('#item1 .overlay .community .text .name');
    
    let item2 = document.querySelector('#item2');
    let title2 = document.querySelector('#item2 .overlay .title');
    let description2 = document.querySelector('#item2 .overlay .description');
    let icon2 = document.querySelector('#item2 .overlay .community img');
    let group2 = document.querySelector('#item2 .overlay .community .text .name');
    
    let item3 = document.querySelector('#item3');
    let title3 = document.querySelector('#item3 .overlay .title');
    let description3 = document.querySelector('#item3 .overlay .description');
    let icon3 = document.querySelector('#item3 .overlay .community img');
    let group3 = document.querySelector('#item3 .overlay .community .text .name');
    
    let item4 = document.querySelector('#item4');
    let title4 = document.querySelector('#item4 .overlay .title');
    let description4 = document.querySelector('#item4 .overlay .description');
    let icon4 = document.querySelector('#item4 .overlay .community img');
    let group4 = document.querySelector('#item4 .overlay .community .text .name');

    if(button_previous.classList.contains('hidden')){
        
        button_previous.classList.remove('hidden');
        button_next.classList.add('hidden');
        
        item1.style.backgroundImage = "url(img/head_article_02.jpeg)"
        title1.textContent = title2.textContent;
        description1.textContent = description2.textContent;
        icon1.src = icon2.src;
        group1.textContent = group2.textContent;

        item2.style.backgroundImage = "url(img/head_article_03.jpeg)"
        title2.textContent = title3.textContent;
        description2.textContent = description3.textContent;
        icon2.src = icon3.src;
        group2.textContent = group3.textContent;

        item3.style.backgroundImage = "url(img/head_article_04.jpeg)"
        title3.textContent = title4.textContent;
        description3.textContent = description4.textContent;
        icon3.src = icon4.src;
        group3.textContent = group4.textContent;

        item4.style.backgroundImage = "url(img/head_article_05.jpeg)"
        title4.textContent = "Griffin";
        description4.textContent = 'Griffin cancelled';
        icon4.src = "img/example_profile_08.png";
        group4.textContent = 'r/Grifone';
    }else{        
        button_previous.classList.add('hidden');
        button_next.classList.remove('hidden');

        item4.style.backgroundImage = "url(img/head_article_04.jpeg)"
        title4.textContent = title3.textContent;
        description4.textContent = description3.textContent;
        icon4.src = icon3.src;
        group4.textContent = group3.textContent;

        item3.style.backgroundImage = "url(img/head_article_03.jpeg)"
        title3.textContent = title2.textContent;
        description3.textContent = description2.textContent;
        icon3.src = icon2.src;
        group3.textContent = group2.textContent;

        item2.style.backgroundImage = "url(img/head_article_02.jpeg)"
        title2.textContent = title1.textContent;
        description2.textContent = description1.textContent;
        icon2.src = icon1.src;
        group2.textContent = group1.textContent;

        item1.style.backgroundImage = "url(img/head_article_01.jpeg)"
        title1.textContent = "Akira Toriyama Dies";
        description1.textContent = 'Dragon Ball creator dies...';
        icon1.src = 'img/example_profile_04.png';
        group1.textContent = 'r/AkiraToryamaMemories';
    }

}

function loadMoreContent(){
    let feed = document.querySelector('#feed');
    let docToLoad = 1;
    console.log("load");
    for (let i = 0; i < docToLoad; i++) {
        let item = document.createElement('article');
        let item_content = document.createElement('div');
        item.classList.add('item');
        item_content.classList.add('insert');
        item.appendChild(item_content);
        feed.appendChild(item);
    }
}

// Funzione per controllare se l'utente ha raggiunto il fondo della pagina
function checkScroll() {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const windowHeight = window.innerHeight;
    const bodyHeight = document.body.offsetHeight;

    // Se l'utente ha raggiunto il fondo della pagina
    if (scrollTop + windowHeight >= bodyHeight) {
        loadMoreContent();
    }
}

let previous_head = document.querySelector('#previous-head');
previous_head.addEventListener("click", onClick);

let next_head = document.querySelector('#next-head');
next_head.addEventListener("click", onClick);

window.addEventListener("scroll", checkScroll);