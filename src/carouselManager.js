let currentIndex = 0;
let images = document.querySelectorAll("div.image-holder > img");
let carouselIntervalId;

function showImage() {
  images[currentIndex].classList.add("is-active");
}

function hideImage() {
  images[currentIndex].classList.remove("is-active");
}

function resetCurrentIndex() {
  currentIndex = 0;
}

function incrementCurrentIndex() {
  if (currentIndex < images.length - 1) {
    currentIndex += 1;
    console.log(`currentIndex: ${currentIndex}`);
  } else {
    console.warn(
      `currentIndex can't exceed array.length, reset to 0.currentIndex: ${currentIndex}, array.length: ${images.length}`,
    );
    resetCurrentIndex();
    return;
  }
}

function decrementCurrentIndex() {
  if (currentIndex > 0) {
    currentIndex -= 1;
    console.log(`currentIndex: ${currentIndex}`);
  } else {
    console.warn(
      `currentIndex can't be less than array.length, exited.currentIndex: ${currentIndex}, array.length: ${images.length}`,
    );
    return;
  }
}

function getIndexNumber(e) {
  const buttonIndex = e.target.dataset.index;
  return parseInt(buttonIndex);
}

function rotateCarouselImages() {
  hideImage();
  incrementCurrentIndex();
  showImage();
}

function activateCarousel() {
  if (!carouselIntervalId) {
    carouselIntervalId = setInterval(() => rotateCarouselImages(), 5000);
  }
}

function stopCarousel() {
  if (carouselIntervalId) {
    clearInterval(carouselIntervalId);
    carouselIntervalId = null;
  }
}

// Default
export function startCarouselOnLoad() {
  resetCurrentIndex();
  showImage();
  activateCarousel();
}

export function navigateContentOnClick(e) {
  e.preventDefault();
  const buttonId = this.id;
  stopCarousel();
  hideImage();
  switch (buttonId) {
    case "back":
      decrementCurrentIndex();
      break;
    case "next":
      incrementCurrentIndex();
      break;
    default:
      console.warn(`No Id found: ${buttonId}`);
      return;
  }
  showImage();
  activateCarousel();
}

export function jumpContentOnClick(e) {
  e.preventDefault();
  hideImage();
  currentIndex = getIndexNumber(e);
  showImage();
  activateCarousel();
}

// BONUS
export function togglePlayPauseOnClick(e) {
  console.log(`toggle PlayPause clicked.`);
  e.preventDefault();
  console.log(
    `currentIndex: ${currentIndex}, imageToShow: ${images[currentIndex]}`,
  );
  if (carouselIntervalId) {
    stopCarousel();
  } else {
    activateCarousel();
  }
}
