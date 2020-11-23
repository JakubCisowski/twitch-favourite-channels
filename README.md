# TwitchFavouriteChannels
JS userscript for Twitch.tv - adds functionality to add followed channels to your favourites

## Installation guide
___
* For the script to be deployed, the easiest way is to download userscript manager, the most popular one is Tampermonkey ([Chrome download](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=pl), [Mozilla Firefox download](https://addons.mozilla.org/pl/firefox/addon/tampermonkey/), [Opera download](https://addons.opera.com/pl/extensions/details/tampermonkey-beta/)). Popular manager alternatives: Greasemonkey, Violentmonkey and Adguard for Internet Explorer.
* Once installed, click on the manager's icon in the top-right corner of the browser and select *'Add new script'*.
* Replace sample code with the code from *'script.js'* file in this repository, save the script and here you go.

## How to use it
___
* When the script was installed properly, when you enter Twitch.tv site you will be able to see *'Favourites'* button on the top-right side of the page, click it to input your favourite channel names (sparated by commas just like in the example)
* Whenever one of your favourite channels is online, its name will be highlighted on the left-side followed channels bar
* You can adjust your favourite channels list whenever you want 
* Remember: the channel must be followed by you in order for the script to work


## Screenshots
___
*Followed channels tab - five of them added to favourites*

![scr1](https://i.imgur.com/QFlhYm8.png)


*New button in the top-right corner*

![scr2](https://i.imgur.com/B8Rdnuj.png)


*Adjusting favourite channels after clicking the button*

![scr3](https://i.imgur.com/0SSITal.png)

## Upcoming features, bugfixes
___
* In the future, adding additional settings button, and possibly changing placement of existing one
* Bug: Resizing window/collapsing followed channels tab refreshes favourites highlight
* Bug: When user's internet connection is extremely slow, favourites highlight might not work
* Bug: User has to refresh the page in order to update favourites highlight (f.e. when favourite channel just went live)
