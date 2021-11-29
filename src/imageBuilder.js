export default function imagesBuilder(images) {
  return images
    .map(
      image => `<li class="image__box"><a href="${image.largeImageURL}" class="photo-link"><img src="${image.webformatURL}" alt="cat" width="250px">
</a></li>`,
    )
    .join('');
}
