


var cards = document.querySelector('.display');
var search = document.querySelector('.search');
var input = document.querySelector('.input');
var title = document.querySelector('title');
var subTitle =  document.querySelectorAll('.js_text');
var card2 = document.querySelector('.card2_container');
var js_logo = document.querySelector('.js_logo');
var section1 = document.querySelector('.add_section1');

var display = (list) => {
    
    subTitle.forEach(text => text.textContent = `r/${input.value}` );
    title.textContent = input.value;
    input.value = "";
    cards.innerHTML = list.map((item) => {
           return (
           `<div class="wrapper">
            <div class="card">
                <div class = card_sub1>
                    <img class = 'arrow' src = 'arrow_up.png'>
                    <p class = 'innerText_arrow' >${item.data.score}</p>
                    <img class = 'arrow' src = 'arrow_down.png'>
                </div>
              <div class = card_sub2>
                <h5 class = 'author'>Posted by u/${item.data.author}</h5>
                <h4 class = 'title'>${item.data.title}</h4>
                <span class = 'link_flair_text'>${item.data.link_flair_text}</span>
                <p class = 'self_text'>${item.data.selftext}</p>
                <a href = ${item.data.url}>
                    <img class = 'comments' src="comments.jpg">
                </a>   
                <p class = 'comments_text'>${item.data.num_comments} Comments</p>
              </div>
            </div>
            </div>`
        )

    });  
}


function myFetch (url) {
    
    return new Promise ((resolve,reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open('GET',url);
    xhr.onload = () => resolve(JSON.parse(xhr.response))
    xhr.onError = () => reject(console.log('ERROR !'))
    xhr.send();

    })
};

function handleSearch() {
let url = `https://api.reddit.com/r/${input.value}`;
console.log(url);
myFetch(url)
.then(res => { 
    
    display(res.data.children); 
    card2.classList.remove('card2_container_display');
    js_logo.src = 'js.png';
    section1.style.opacity = '1';

})
.catch(rej => console.log(rej));
}

input.addEventListener('keydown', (event) => { 
    if (event.keyCode === 13) {
     handleSearch()
    }});

