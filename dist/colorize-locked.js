// ==UserScript==
// @name        Colorize locked icons
// @namespace   Violentmonkey Scripts
// @match       https://retroachievements.org/game/*
// @grant       none
// @version     1.0
// @author      Christian Legge
// @description 7/1/2025, 9:41:56 AM
// ==/UserScript==

function toggleColor(els) {
    els.forEach((el) => {
        const img = el.children[0].children[0].children[0].children[0];
        if (img.src.endsWith("_lock.png")) {
            img.src = img.src.replace(/_lock/, "");
        } else {
            img.src = img.src.replace(/\.png$/, "_lock.png");
        }
    });
}

(function () {
    "use strict";
    const cheevoList = document.querySelectorAll("#set-achievements-list")[0];
    const preCheevos = cheevoList.previousElementSibling;
    const lockedCheevos = Array.from(cheevoList.children).filter(
        (el) => !el.classList.contains("unlocked-row"),
    );
    if (lockedCheevos.length === 0) {
        return;
    }
    const colorToggle = document.createElement("label");
    const colorCheckbox = document.createElement("input");
    colorCheckbox.setAttribute("type", "checkbox");
    colorCheckbox.classList.add("cursor-pointer");
    colorCheckbox.addEventListener("change", () => toggleColor(lockedCheevos));
    colorToggle.classList.add(
        "flex",
        "items-center",
        "gap-x-1",
        "select-none",
        "cursor-pointer",
    );
    colorToggle.innerText = "Colorize locked icons";
    colorToggle.prepend(colorCheckbox);

    setTimeout(preCheevos.children[0].appendChild(colorToggle), 100);
})();
