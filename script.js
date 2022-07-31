// ==UserScript==
// @name         Twitch Favourite Channels
// @description  Add twitch channels to your favourites.
// @version      1.2
// @author       Jakub Cisowski
// @include      http://www.twitch.tv/*
// @include      https://www.twitch.tv/*
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    const initialIntervalMs = 500; // Initial frequency of checking for followed channels section.
    const backupIntervalMs = 5000; // After initial styling backup interval is deployed to style every few seconds to prevent bugs with styling.

    let initialIntervalID = window.setInterval(styleFavouriteChannels, initialIntervalMs);
    let backupIntervalDeployed = false;

    function styleFavouriteChannels(){
        console.log("checking");
        let followedChannels = document.querySelectorAll("[data-a-target='side-nav-title']");
        let favouritesStrings = window.localStorage.getItem('favourites').toLowerCase();
        let favouritesArray = favouritesStrings.split(',');

        // Check if section is found (user can be switched to broadcast tab).
        if (followedChannels.length > 0){
            for(let i=0; i<followedChannels.length; i++){
                if(favouritesArray.includes(followedChannels[i].title.toLowerCase())){
                    followedChannels[i].setAttribute("style", "color: gold!important;");
                    if(!followedChannels[i].textContent.includes("⭐")){
                        followedChannels[i].textContent = "⭐" + followedChannels[i].textContent;
                    }
                }
            }

            appendSettingsButton();

            // Stop refreshing when section is found.
            window.clearInterval(initialIntervalID);
            // Do this only once - after initial styling style every X ms. This prevents multiple bugs which disable styling.
            if(backupIntervalDeployed == false){
                window.setInterval(styleFavouriteChannels, backupIntervalMs);
            }
            backupIntervalDeployed = true; // Set to true to deploy backup only once.
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

        let node = document.querySelector("#root > div.Layout-sc-nxg1ff-0.bGJmZt > div.Layout-sc-nxg1ff-0.bSuLAT > nav > div > div.Layout-sc-nxg1ff-0.hWJFll");


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
