// ==UserScript==
// @name         Twitch Favourite Channels
// @description  Add twitch channels to your favourites.
// @version      1.4
// @author       Jakub Cisowski
// @match        http://www.twitch.tv/*
// @match        https://www.twitch.tv/*
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    const initialIntervalMs = 500; // Initial frequency of checking for followed channels section.
    const backupIntervalMs = 5000; // After initial styling backup interval is deployed to style every few seconds to prevent bugs with styling. Also to update styles whenever channel goes online.

    let initialIntervalID = window.setInterval(styleFavouriteChannels, initialIntervalMs);
    let backupIntervalDeployed = false;

    function styleFavouriteChannels(){
        let followedChannels = document.querySelectorAll("[data-a-target='side-nav-title']");
        let favouritesStrings = window.localStorage.getItem('favourites').toLowerCase();
        let favouritesArray = favouritesStrings.split(',');

        // Check if section is found (user can be switched to broadcast tab).
        if (followedChannels.length > 0){
            // Change the favourite channels styles in followed channels tab.
            for(let i=0; i<followedChannels.length; i++){
                if(favouritesArray.includes(followedChannels[i].title.toLowerCase())){
                    followedChannels[i].setAttribute("style", "color: gold!important;");
                    if(!followedChannels[i].textContent.includes("⭐")){
                        followedChannels[i].textContent = "⭐" + followedChannels[i].textContent;
                    }
                }
            }

            // Stop refreshing when section is found.
            window.clearInterval(initialIntervalID);

            // Do this only once - after initial styling style every X ms. This prevents multiple bugs which disable styling.
            if(backupIntervalDeployed == false){
                backupIntervalDeployed = true; // Set to true to deploy backup only once.
                appendSettingsButton();
                window.setInterval(styleFavouriteChannels, backupIntervalMs);
            }
        }
    }

    function appendSettingsButton(){
        let div = document.createElement("div");
        div.className = "tw-align-self-center tw-flex-grow-0 tw-flex-nowrap tw-flex-shrink-0 tw-mg-x-05";

        let button = document.createElement("button");
        button.setAttribute("style", "color: gold!important;")
        button.type = "button";
        button.onclick = settingsClick;

        let text = document.createTextNode("⭐Favourites");

        // For now, node selector should be updated whenever Twitch website layout changes.
        let node = document.querySelector("#root > div.Layout-sc-1xcs6mc-0.hRpbps > div.Layout-sc-1xcs6mc-0.kBprba > nav > div > div.Layout-sc-1xcs6mc-0.gdKXDc");


        button.appendChild(text);
        div.appendChild(button);
        node.insertBefore(div, node.firstChild);
    }

    function settingsClick(){
        let isFilled;
        window.localStorage.getItem('favourites') == "null" ? isFilled = false : isFilled = true;

        let text = prompt("Insert favourite followed channel names: \nExample: xQcOW, loltyler1, pokimane \n\n- Channels should be separated by commas. \n- Every whitespace symbol will be trimmed.", isFilled ? window.localStorage.getItem('favourites') : "");
        window.localStorage.setItem("favourites", text.replaceAll(' ',''));

        // Refreshing the page to make sure everything is updated
        window.location.reload(true);
    }
})();
