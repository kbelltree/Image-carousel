import {
  startCarouselOnLoad,
  navigateContentOnClick,
  jumpContentOnClick,
  togglePlayPauseOnClick,
} from "./carouselManager";
import "./style.css";

const backButton = document.getElementById("back");
const nextButton = document.getElementById("next");
const pageControllerWrapper = document.querySelector(".indicator-wrapper");

document.addEventListener("DOMContentLoaded", startCarouselOnLoad);

backButton.addEventListener("click", navigateContentOnClick);
nextButton.addEventListener("click", navigateContentOnClick);

pageControllerWrapper.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON" && e.target.id !== "play-pause") {
    jumpContentOnClick(e);
  }
  if (e.target.closest("#play-pause")) {
    togglePlayPauseOnClick(e);
  }
});
