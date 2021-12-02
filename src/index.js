import './sass/main.scss';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import FetchImage from './fetch';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import imagesBuilder from './imageBuilder';

const PER_PAGE_IMAGE = 10;

const spiner = document.querySelector('.loader');

function spinerShow() {
  spiner.classList.remove('is-hide');
}
function spinerHide() {
  spiner.classList.add('is-hide');
}

const options = {
  totalItems: 10,
  itemsPerPage: PER_PAGE_IMAGE,
  page: 1,
};

const container = document.getElementById('pagination');
const pagination = new Pagination(container, options);

const galleryEl = document.querySelector('.gallery');

const fetchImage = new FetchImage();
fetchImage.searchImage = 'cat';
fetchImage.perPageCounter(PER_PAGE_IMAGE);

const lightbox = new SimpleLightbox('.gallery .image__box a', {
  captionDelay: 250,
});

fetchImage.request().then(data => {
  spinerShow();
  galleryEl.innerHTML = imagesBuilder(data.data.hits);
  pagination.reset(data.data.totalHits);
  lightbox.refresh();
  setTimeout(() => {
    spinerHide();
  }, 250);
});

pagination.on('afterMove', ({ page }) => {
  spinerShow();
  fetchImage.setCouter(page);
  fetchImage.request().then(data => {
    galleryEl.innerHTML = imagesBuilder(data.data.hits);
    pagination.currentPage = page;
    lightbox.refresh();
  });
  setTimeout(() => {
    spinerHide();
  }, 250);
});
