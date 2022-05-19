"use strict";

const imageContainer = document.getElementById("img-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
let initialLoad = true;

// Unsplash API
let count = 10;
const apiKey = "JLaFFFFk1XwHSR_xY8Qt4WBvbk5HoA9y66ThRtX6x8w";
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// ----------------------------------------------------------------

// Check if all images were loaded. This function will be called for each individual image, which is loaded.
const imageLoaded = function () {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;

    count = 30;
    apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

    if (initialLoad) {
      getPhotos();
      initialLoad = false;
    }
  }
};

// Helper function to Set Attributes on DOM Elements
const setAttributes = function (element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
};

// ----------------------------------------------------------------

// Create Elements for Links & Photos
const displayPhotos = function () {
  imagesLoaded = 0;
  totalImages = photosArray.length;

  photosArray.forEach((photo) => {
    const item = document.createElement("a");
    // item.setAttribute("href", photo.links.html);
    // item.setAttribute("target", "_blank");

    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });

    const img = document.createElement("img");
    // img.setAttribute("src", photo.urls.regular);
    // img.setAttribute("alt", photo.alt_description);
    // img.setAttribute("title", photo.alt_description);

    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    // Event Listener, check when each image finished Loading
    img.addEventListener("load", imageLoaded);

    // put <img> inside <a>, then put both inside imageContainer Element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
};

// ----------------------------------------------------------------

// Get Photos from Unsplash API
const getPhotos = async function () {
  try {
    const res = await fetch(apiUrl);
    const data = await res.json();
    photosArray = data;
    console.log(photosArray);
    displayPhotos();
  } catch (error) {
    //catch error
  }
};

// ----------------------------------------------------------------

// Check to see if scrolling neat bottom of the page, Load more photos
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

// On Load
getPhotos();
