// ==UserScript==
// @name         RetroAchievements.org Web Helper
// @namespace    https://retroachievements.org/
// @version      1.1.2
// @description  Add links to switch between environments
// @author       RetroAchievements.org
// @match        https://retroachievements.org/*
// @match        https://stage.retroachievements.org/*
// @match        http://localhost:64000/*
// @match        https://localhost:64000/*
// @icon         https://retroachievements.org/favicon.png
// @updateUrl    https://raw.githubusercontent.com/RetroAchievements/userscripts/main/dist/web-helper.user.js
// @downloadUrl  https://raw.githubusercontent.com/RetroAchievements/userscripts/main/dist/web-helper.user.js
// @license      MIT
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const config = {
        'retroachievements.org': {
            name: 'Production',
            targets: [
                {
                    name: 'Stage',
                    url: 'https://stage.retroachievements.org',
                    // stage has redirects configured
                    pathMap: {},
                },
                {
                    name: 'Local',
                    url: 'http://localhost:64000',
                    pathMap: {},
                },
            ]
        },
        'stage.retroachievements.org': {
            name: 'Stage',
            targets: [
                {
                    name: 'Production',
                    url: 'https://retroachievements.org',
                    pathMap: {
                        '/create': false,
                    },
                },
                {
                    name: 'Local',
                    url: 'http://localhost:64000',
                    pathMap: {},
                },
            ]
        },
        'localhost': {
            name: 'Local',
            targets: [
                {
                    name: 'Stage',
                    url: 'https://stage.retroachievements.org',
                    // stage has redirects configured
                    pathMap: {},
                },
                {
                    name: 'Production',
                    url: 'https://retroachievements.org',
                    pathMap: {
                        '/create': false,
                    },
                },
            ]
        },
    }[window.location.hostname];

    console.log(window.location.hostname);

    console.log(`%c RetroAchievements.org %c Web Helper v1.1.2 [${config.name}]`, 'font-size:11px;color:#000000;background:#40A2A5;padding:1px;border-radius:3px 0 0 3px;', 'font-size:11px;color:#FFF;background:#111;padding:1px;border-radius:0 3px 3px 0;')

    const helperContainer = document.createElement("div");
    document.body.prepend(helperContainer);
    helperContainer.style.position = 'sticky';
    helperContainer.style.top = 0;
    helperContainer.style.zIndex = 999999;

    const links = document.createElement("div");
    links.style.display = 'flex';
    links.style.flexDirection = 'row';
    links.style.columnGap = '0.5rem';
    links.style.padding = '.25rem';
    links.style.fontSize = '.7rem';
    links.style.position = 'absolute';
    links.style.right = '0';
    links.style.paddingRight = '15px';
    helperContainer.appendChild(links);

    config.targets.forEach((target) => {
        const path = target.pathMap[window.location.pathname] !== undefined ? target.pathMap[window.location.pathname] : window.location.pathname;
        if(path === false) return;

        const link = document.createElement("a");
        links.appendChild(link);

        link.href = `${target.url}${path}${window.location.search}`;
        link.target = '_blank';
        link.setAttribute('title', `Open in ${target.name} environment`);
        link.appendChild(document.createTextNode(`${target.name} ➡`));
    })

})();
