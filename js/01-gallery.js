import { galleryItems } from "./gallery-items.js";

const galleryRef = document.querySelector(".gallery");
function imgContain(items) {
  return items
    .map(({ preview, original, description }) => {
      return `<div class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</div>`;
    })
    .join("");
}
galleryRef.insertAdjacentHTML("beforeend", imgContain(galleryItems));

galleryRef.addEventListener("click", onClickGalleryItem);

function onClickGalleryItem(e) {
  e.preventDefault();

  if (!e.target.classList.contains("gallery__image")) {
    return;
  }
  const instance = basicLightbox.create(
    `
      <img src="${e.target.dataset.source}" width="800" height="600">
  `
  );

  instance.show();

  galleryRef.addEventListener("keydown", onCloseItemByEscape);

  function onCloseItemByEscape(e) {
    if (e.code === "Escape") {
      instance.close();
    }
  }
}
