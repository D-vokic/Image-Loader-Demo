'use strict';

/**
 * Waits for a specified number of seconds.
 * @param {number} seconds - The number of seconds to wait.
 * @returns {Promise<void>} A promise that resolves after the specified time.
 */
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

// Container element where images will be appended
const imgContainer = document.querySelector('.images');

/**
 * Creates an HTMLImageElement, sets its source, and appends it to the DOM once loaded.
 * @param {string} imgPath - The path to the image file.
 * @returns {Promise<HTMLImageElement>} A promise that resolves with the image element when loaded, or rejects on error.
 */
const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imgPath;

    img.addEventListener('load', function () {
      imgContainer.append(img);
      resolve(img);
    });

    img.addEventListener('error', function () {
      reject(new Error('Image not found'));
    });
  });
};

// Stores the currently displayed image
let currentImg;

// Load the first image
createImage('img/img-1.jpg')
  .then(img => {
    currentImg = img;
    console.log('Image 1 loaded');
    return wait(2);
  })
  .then(() => {
    // Hide the first image
    currentImg.style.display = 'none';
    return createImage('img/img-2.jpg');
  })
  .then(img => {
    currentImg = img;
    console.log('Image 2 loaded');
    return wait(2);
  })
  .then(() => {
    // Hide the second image
    currentImg.style.display = 'none';
  })
  .catch(err => console.error(err));
