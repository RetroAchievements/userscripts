// ==UserScript==
// @name         RetroAchievements.org Plaque Logo
// @namespace    https://retroachievements.org/
// @version      1.0.1
// @description  Restore the plaque logo on the front page
// @author       RetroAchievements.org
// @match        https://retroachievements.org/*
// @icon         https://retroachievements.org/favicon.png
// @updateUrl    https://raw.githubusercontent.com/RetroAchievements/userscripts/main/dist/plaque-logo.user.js
// @downloadUrl  https://raw.githubusercontent.com/RetroAchievements/userscripts/main/dist/plaque-logo.user.js
// @license      MIT
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    console.log(`%c RetroAchievements.org %c Plaque Logo v1.0.1`, 'font-size:11px;color:#000000;background:#40A2A5;padding:1px;border-radius:3px 0 0 3px;', 'font-size:11px;color:#FFF;background:#111;padding:1px;border-radius:0 3px 3px 0;')

    document.body.querySelector(".brand-top").style.height = '110px';

    const logo = document.createElement("div");
    logo.className = "logo-container pt-3 pb-2";
    logo.innerHTML = `
        <a href="https://retroachievements.org">
            <img style="max-width: 550px;" src="https://static.retroachievements.org/assets/images/ra-logo.webp" alt="RetroAchievements">
        </a>`;
    document.body.querySelector(".logo-container").replaceWith(logo);
})();
