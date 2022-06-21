'use strict';

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


// assigning objects in code to page elements to display on
pageElements[0].id = images[0].id;
pageElements[0].src = images[0].src;
pageElements[1].id = images[1].id;
pageElements[1].src = images[1].src;
pageElements[2].id = images[2].id;
pageElements[2].src = images[2].src;

//checking that whats being clicked is in the image sources and adding a click
function handleClick(event) {
    for (let i = 0; i < images.length; i++) {
        if (event.target.id === images[i].id) {
            images[i].clicks++;
        }
    }
    renderImages();
    // console.log(images)
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

//checking the random images for duplicates and rendering to page by assigning to page elements

function renderImages() {
    let image1 = generateRandomImage();
    let image2 = generateRandomImage();
    let image3 = generateRandomImage();

    while (image1.id === image2.id && image2.id === image3.id) {
        while (image3.id === image1.id) {
            image1 = generateRandomImage();
        }
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
    console.log(roundCounter);
    if (roundCounter == 25) {
        images.forEach(function (img) {
            let dataSlot = document.getElementById('Info')
            let name = document.createElement('p')
            dataSlot.appendChild(name)

            name.textContent = 'Image: ' + img.id + '  Clicks: ' + img.clicks + ' views: ' + img.views;
            resultsButton.classList.toggle('reveal');
        })
    }
}



//function to write info to page 
function displayData() {

}
resultsButton.addEventListener('click', function (event) {
    results.classList.toggle('reveal');
})