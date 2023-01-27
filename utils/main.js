const wordLists =['computer', 'cats', 'pink flowers', 'dogs', 'programing', 'girls', 'boys', 'music'];//define some words
let rword = wordLists[Math.floor(Math.random()* wordLists.length)]; //select a random word from wordList
const per_page = 30;//define amount of pictures to show. Limited by pixabay minimun 3 up to 200

const API_KEY = '';//insert your apikey
let URL = 'https://pixabay.com/api/?key='+API_KEY+'&q='+encodeURIComponent(rword)+'&per_page='+per_page;//create the url with spected params 

//fetching the api
function connectApi()  {

    fetch(URL)
        .then(resp => resp.json())
        .then(alldata => getImages(alldata.hits));
}
//getting all params of self-data
function getImages(data){
    const card = document.getElementById('cardContent');
    let content = ''
    data.forEach(image =>{
        //deconstruct object. Only get specific data...user,pageURL,previewURL,likes from each picture
        const {user, pageURL, previewURL, likes} =image;
        //create a simple template-string
        content += `
                <div class='card m-2' style='width: 18rem;' >
                    <img src='${previewURL}' class='card-img h-50' alt='...'>
                    <div class='card-body '>
                    <p class='card-text'>Image created by ${user}</p>
                    <i class='bi bi-hand-thumbs-up '></i><span> ${likes}</span>
                    </div>
                    <div class = 'card-footer'>
                    <a href='${pageURL}' target='_blank' class='btn btn-primary'>Go to Image</a>
                    </div>
                </div>
                        `
    })
    card.innerHTML=content;
}
//calling function
connectApi();


