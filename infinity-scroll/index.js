const imageLoader = document.getElementById('image-container');
const loader = document.getElementById('loading');
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

const count = 30;
const apiKey="mykey";
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

// Check if all images were loaded
function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
      ready = true;
      loader.hidden = true;
    }
  }

//helper function to not repeat agian (DRY principle)

function setAttributes(elements, attributes){
    for(const key in attributes){
        elements.setAttribute(key, attributes[key]);
    }

}

function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    photosArray.forEach((photo) => {
        const item = document.createElement('a');
        //item.setAttribute('href', photo.links.html);
        //item.setAttribute('target', '_blank');
        setAttributes(items, {
            href: photo.links.html,
            target: '_blank',
        });
        const img = document.createElement('img');
        // img.setAttribute('src', photo.urls.regular);
        // img.setAttribute('alt', photo.alt_description);
        // img.setAttribute('title', photo.alt_description);
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        // Event Listener, check when each is finished loading
        img.addEventListener('load', imageLoaded);
        //put img tag inside a then put a in image-container element
        item.appendChild(img);
        imageContainer.appendChild(item);
    })
}


async function getPhotos() {
    try {
        
        const data = await fetch(apiUrl);
        photosArray = await data.json();
        displayPhotos();

    } catch (error) {
        //error will be output here
    }
}

window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000){
        ready=false;
        getPhotos();
    }
});

//On Load
getPhotos();