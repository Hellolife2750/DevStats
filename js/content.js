/* exécutée sur la page à l'ouverture du site */



if (location.hostname === 'chat.openai.com') {
    increment(location.hostname);
    //alert("gpt");
} else if (location.hostname === 'stackoverflow.com') {
    increment(location.hostname);
    //alert("stack");
} else if (location.hostname === 'openclassrooms.com') {
    increment('openclassrooms.com');
    /*setTimeout(function () {
        window.open(chrome.extension.getURL('popup.html'));
    }, 1000); // Pause de 1 seconde*/


}

function increment(url) {
    let oldValue = localStorage.getItem(url);
    if (oldValue == null) {
        localStorage.setItem(url, 1);
    } else {
        localStorage.setItem(url, parseInt(oldValue) + 1)
    }

    chrome.storage.local.get(url, function (items) {
        let oldValue = items[url];
        if (oldValue == null) {
            chrome.storage.local.set({ [url]: 1 });
        } else {
            chrome.storage.local.set({ [url]: parseInt(oldValue) + 1 });
        }

        /*chrome.storage.local.get(url, function (items) {
            alert(items[url]);
        });*/
    });

    // Créer un élément d'image
    /*const logo = document.createElement('img');

    // Définir les attributs de l'image
    logo.src = 'icon.png';
    logo.style.position = 'absolute';
    logo.style.zIndex = '1000';
    logo.style.top = '0';
    logo.style.left = '0';
    logo.style.width = '50px';
    logo.style.height = '50px';

    // Ajouter l'image à la page
    document.body.appendChild(logo);*/


    //alert(localStorage.getItem("grosconnard"))
    //alert(localStorage.getItem(url))
    //alert(localStorage.getItem('openclassrooms.com'))

    /*const keysWithTestValue = [];

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);

        if (value === 'test') {
            keysWithTestValue.push(key);
        }
    }

    console.log(keysWithTestValue);*/
}

/*window.addEventListener("load", function () {
    var img = document.createElement("img");
    img.src = chrome.runtime.getURL("icon.png");
    img.style.position = "absolute";
    img.style.top = "0";
    img.style.right = "0";
    img.style.width = "50px";
    img.style.height = "50px";
    img.style.zIndex = "1000";

    document.body.appendChild(img);
});*/






//content script
/*var recetxt = ""
chrome.extension.onRequest.addListener(
    function (request, sender, sendResponse) {
        recetxt = request.greeting
    });
alert(recetxt)*/



//increment(location.hostname);

/*// Stocker une valeur dans localStorage
localStorage.setItem('maCle', 'maValeur');

// Récupérer une valeur de localStorage
const maValeur = localStorage.getItem('maCle');

// Supprimer une valeur de localStorage
localStorage.removeItem('maCle');

// Vider tout le localStorage
localStorage.clear();*/


