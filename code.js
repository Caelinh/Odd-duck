'use strict';

let chartEl = document.getElementById('myChart');
let ctx = chartEl.getContext('2d');
var options = { 
    responsive: true,
    maintainAspectRatio: true
}

let pageElements = document.querySelectorAll('img');//selects all image tags
let resultsButton = document.querySelector('#button');
let results = document.querySelector('#Info');

let roundCounter = 0;
let clicks = 0;
let views = 0;



let fileNames = [
    'bag.jpg',
    'banana.jpg',
    'bathroom.jpg',
    'boots.jpg',
    'breakfast.jpg',
    'bubblegum.jpg',
    'chair.jpg',
    'cthulhu.jpg',
    'dog-duck.jpg',
    'dragon.jpg',
    'pen.jpg',
    'pet-sweep.jpg',
    'scissors.jpg',
    'shark.jpg',
    'sweep.png',
    'tauntaun.jpg',
    'unicorn.jpg',
    'water-can.jpg',
    'wine-glass.jpg'

];

const images = [];
const clickData = [];
const viewData = [];

function Image(fileName) {
    this.clicks = 0;
    this.views = 0;
    this.id = fileName;
    this.src = `./images/${fileName}`;
}

Image.prototype.handleClick = function () {

};
//creating the file objects

for (let i = 0; i < fileNames.length; i++) {
    images.push(new Image(fileNames[i]));
}

let image1 = generateRandomImage();
let image2 = generateRandomImage();
let image3 = generateRandomImage();

renderImages();
//checking that whats being clicked is in the image sources and adding a click
function handleClick(event) {
    for (let i = 0; i < images.length; i++) {
        if (event.target.id === images[i].id) {
            images[i].clicks++;
        }
    }
    renderImages();
}

//adding an event listener to all the page elements
pageElements.forEach(function (img) {
    img.addEventListener('click', handleClick);
});

//Random image generator
function generateRandomImage() {
    let index = Math.floor(Math.random() * images.length);
    return images[index];
}


function noDuplicates(){
    let currentImage1 = pageElements[0].id
    let currentImage2 = pageElements[1].id
    let currentImage3 = pageElements[2].id

    while (image1.id === currentImage1 || image1.id === currentImage2 || image1.id === currentImage3) {
        image1 = generateRandomImage();
    }

    while (image2.id === currentImage1 || image2.id === currentImage2 || image2.id === currentImage3) {
        image2 = generateRandomImage();
    }

    while (image3.id === currentImage1 || image3.id === currentImage2 || image3.id === currentImage3) {
        image3 = generateRandomImage();
    }

}
//checking the random images for duplicates and rendering to page by assigning to page elements

function renderImages() {
    noDuplicates();
  while (image1.id === image2.id || image2.id === image3.id || image1.id === image3.id){
    image1 = generateRandomImage();
    image2 = generateRandomImage();
    image3 = generateRandomImage();
    noDuplicates();
  }

    pageElements[0].id = image1.id;
    pageElements[0].src = image1.src;
    pageElements[1].id = image2.id;
    pageElements[1].src = image2.src;
    pageElements[2].id = image3.id;
    pageElements[2].src = image3.src;
    image1.views++;
    image2.views++;
    image3.views++;
    roundCounter++;
    if (roundCounter == 25) {
        images.forEach(function (img) {
            // let dataSlot = document.getElementById('Info')
            // let name = document.createElement('p')
            // dataSlot.appendChild(name)

            // name.textContent = 'Image: ' + img.id + '  Clicks: ' + img.clicks + ' views: ' + img.views;
            resultsButton.classList.toggle('hide');
            resultsButton.classList.toggle('reveal');

        })
        images.forEach(function (img) {
            clickData.push(img.clicks);
            viewData.push(img.views);
        })
        renderChart();
    }
}



//function to write info to page 
function displayData() {

}
resultsButton.addEventListener('click', function (event) {
    results.classList.toggle('reveal');
    myChart.classList.toggle('reveal');
})
function renderChart() {
    let myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: fileNames,
            datasets: [{
                label: '# of Votes',
                data: clickData,
                backgroundColor: ['Red']
            }, {
                label: '# of Views',
                data: viewData,
                backgroundColor: ['blue']
            }]
        },
    });
}