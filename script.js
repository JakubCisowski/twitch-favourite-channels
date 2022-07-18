// ==UserScript==
// @name         Twitch Favourite Channels
// @description  Add twitch channels to your favourites. While on Twitch: [Inspect element -> Application tab -> On the left: (Storage -> LocalStorage -> twitch.tv) -> Filter 'favourites' -> Input channel names in value tab separated by commas]
// @version      1.1
// @author       Jakub Cisowski
// @include      http://www.twitch.tv/*
// @include      https://www.twitch.tv/*
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    // Waiting 1000ms for page to load properly
    let intervalID = window.setInterval(styleFavourites, 500);
    // appendSettingsButton();

    // Styling favourite channels
    function styleFavourites(){
        let followedChannels = document.querySelectorAll("[data-a-target='side-nav-title']");
        let favouritesStrings = window.localStorage.getItem('favourites').toLowerCase();
        let favouritesArray = favouritesStrings.split(',');

        // Check if section is found (user can be switched to broadcast tab).
        if (followedChannels.length > 0){
            for(let i=0; i<followedChannels.length; i++){
                if(favouritesArray.includes(followedChannels[i].title.toLowerCase())){
                    followedChannels[i].setAttribute("style", "color: gold!important;");
                    followedChannels[i].textContent = "⭐" + followedChannels[i].textContent;
                }
            }

            appendSettingsButton();

            // Stop refreshing when section is found.
            window.clearInterval(intervalID);
        }
    }

    // Creating extension settings button and appending it
    function appendSettingsButton(){
        let div = document.createElement("div");
        div.className = "tw-align-self-center tw-flex-grow-0 tw-flex-nowrap tw-flex-shrink-0 tw-mg-x-05";

        let button = document.createElement("button");
        button.setAttribute("style", "color: gold!important;")
        button.type = "button";
        button.onclick = changeFavourites;

        let text = document.createTextNode("⭐Favourites");

        let node = document.querySelector("#root > div.Layout-sc-nxg1ff-0.bGJmZt > div.Layout-sc-nxg1ff-0.bSuLAT > nav > div > div.Layout-sc-nxg1ff-0.hWJFll");


        button.appendChild(text);
        div.appendChild(button);
        node.insertBefore(div, node.firstChild);
    }

    // Settings onclick event - changing user's favourites
    function changeFavourites(){
        let isFilled;
        window.localStorage.getItem('favourites') == "null" ? isFilled = false : isFilled = true;

        let text = prompt("Insert favourite followed channel names: \nExample: xQcOW, loltyler1, pokimane \n\n- Channels should be separated by commas. \n- Every whitespace symbol will be trimmed.", isFilled ? window.localStorage.getItem('favourites') : "");
        window.localStorage.setItem("favourites", text.replaceAll(' ',''));

        // Refreshing the page to make sure everything is updated
        window.location.reload(true);
    }
})();
