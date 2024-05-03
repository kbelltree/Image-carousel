const images = document.querySelectorAll("div.image-holder > img");
const indicatorButtons = document.querySelectorAll("button[data-index]");

let currentIndex = 0;
let carouselIntervalId;

function resetCurrentIndex() {
  currentIndex = 0;
}

function incrementCurrentIndex() {
  if (currentIndex < images.length - 1) {
    currentIndex += 1;
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

function showImage() {
  images[currentIndex].classList.add("is-displayed");
}

function hideImage() {
  images[currentIndex].classList.remove("is-displayed");
}

function indicateCurrentIndex() {
  indicatorButtons.forEach((button) => {
    if (button.dataset.index === currentIndex.toString()) {
      button.classList.add("is-active");
    } else {
      button.classList.remove("is-active");
    }
  });
}

function rotateCarouselImages() {
  hideImage();
  incrementCurrentIndex();
  indicateCurrentIndex();
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
  indicateCurrentIndex();
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
  indicateCurrentIndex();
  showImage();
  activateCarousel();
}

export function jumpContentOnClick(e) {
  e.preventDefault();
  hideImage();
  currentIndex = getIndexNumber(e);
  indicateCurrentIndex();
  showImage();
  activateCarousel();
}

export function togglePlayPauseOnClick(e) {
  e.preventDefault();
  const playPauseButton = document.querySelector("#play-pause svg");
  if (carouselIntervalId) {
    stopCarousel();
    playPauseButton.classList.add("is-paused");
  } else {
    activateCarousel();
    playPauseButton.classList.remove("is-paused");
  }
}
