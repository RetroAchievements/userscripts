// ==UserScript==
// @name        Colorize locked icons
// @namespace   Violentmonkey Scripts
// @match       https://retroachievements.org/*
// @grant       none
// @version     2.0
// @author      Christian Legge
// @description 7/1/2025, 9:41:56 AM
// ==/UserScript==

function toggleColor(els) {
  els.forEach(el => {
    const img = el.querySelector("img");
    if (!img) {
      return;
    }
    if (img.src.endsWith("_lock.png")) {
      img.src = img.src.replace(/_lock/, "");
    }
    else {
      img.src = img.src.replace(/\.png$/, "_lock.png");
    }
  });
}

let previousUrl = '';
const observer = new MutationObserver(function(mutations) {
  if (location.href !== previousUrl) {
    previousUrl = location.href;
  }
  else {
    return;
  }

  setTimeout(constructButton, 1000);
});

function constructButton() {
  'use strict';
  // const cheevoList = document.querySelectorAll('#set-achievements-list')[0];
  const toolbar = document.querySelector('[data-testid=game-achievement-set-toolbar]');
  const cheevoList = document.querySelectorAll('.game-set-item');


  // const preCheevos = cheevoList.previousElementSibling;
  const lockedCheevos = Array.from(cheevoList).filter(el => el.querySelector("img")?.src.includes("_lock"));
  if (lockedCheevos.length === 0) {
    return;
  }
  const colorToggle = document.createElement('label');
  const colorCheckbox = document.createElement("input");
  colorCheckbox.setAttribute('type', "checkbox");
  colorCheckbox.classList.add("cursor-pointer");
  colorCheckbox.addEventListener("change", () => toggleColor(lockedCheevos));
  colorToggle.classList.add("flex", "items-center", "gap-x-1", "select-none", "cursor-pointer");
  colorToggle.innerText = "Colorize locked icons";
  colorToggle.prepend(colorCheckbox)

  if (toolbar.children[1]) {
    toolbar.children[1].prepend(colorToggle);
  }
  else {
    toolbar.appendChild(colorToggle);
  }
}

observer.observe(document, {subtree: true, childList: true});
