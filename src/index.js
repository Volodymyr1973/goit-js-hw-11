import axios from 'axios';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox/dist/simple-lightbox.esm';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
var debounce = require('lodash.debounce');

const formElement = document.querySelector('.search-form');
console.dir(formElement);

const inputEl = document.querySelector('.search-form input');
console.log(inputEl);

const btnSubmitEl = document.querySelector('.search-form button');
console.log(btnSubmitEl);

const galleryEl = document.querySelector('.gallery');
console.log(galleryEl);

function onInputPhoto(event) {
  //   event.preventDefault();
  //   console.log(event);
  console.log(event.target.value);
  //   photoName = event.target.value;
  // console.log(photoName);
  return event.target.value;
}
inputEl.addEventListener('input', onInputPhoto);

const photoName = onInputPhoto();

console.log(photoName);
// function onSubmitFormPhoto(event) {
//   event.preventDefault();
//   console.log(event);
// }
// btnSubmitEl.addEventListener('submit', onSubmitFormPhoto);

function onSearchPhoto(event) {
  event.preventDefault();
  console.log(event);
  getPhoto();
}
formElement.addEventListener('submit', onSearchPhoto);

async function getPhoto() {
  try {
    const response = await axios.get(
      'https://pixabay.com/api/?key=30855873-a6914290544a804f7a5292a28&q=ca456tgtt&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=1'
    );
    const allPhotos = response.data.hits;
    if (allPhotos === []) {
      Notiflix.Notify.failure('Qui timide rogat docet negare');
    } else {
      const marcup = allPhotos.map(
        photo => `
          <div class="photo-card">
      <img src="${photo.webformatURL}" alt="${photo.tags}" loading="lazy" />
      <div class="info">
        <p class="info-item">
          <b>Likes: ${photo.likes}</b>
        </p>
        <p class="info-item">
          <b>Views: ${photo.views}</b>
        </p>
        <p class="info-item">
          <b>Comments: ${photo.comments}</b>
        </p>
        <p class="info-item">
          <b>Downloads: ${photo.downloads}</b>
        </p>
      </div>
    </div>
          `
      );
    }
    galleryEl.innerHTML = marcup;
    console.log(response.data.hits);
  } catch (error) {
    console.error(error);
    Notiflix.Notify.failure('Qui timide rogat docet negare');
  }
}
