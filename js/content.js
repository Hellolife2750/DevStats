/* exécutée sur la page à l'ouverture du site */

/*const DAT_PATH = "dev_stats_datas";

function initialize() {
    if (chrome.storage.local.get(DAT_PATH) == null) {
        createDatas();
    }
}

function createDatas() {
    var defaults = ["openclassrooms.com", "chat.openai.com", "stackoverflow.com"];
    defaults.forEach(dfUrl => {
        chrome.storage.local.get(DAT_PATH)[dfUrl] = getDefaultValues();
    });
    //chrome.storage.local.set({ [url]: 1 });
}

function getDefaultValues() {
    return { "elapsed": 0, "counter": 0, "date": "--" };
}

initialize();*/

//chemin de stockage des données de l'extension
const DAT_PATH = "dev_stats_datas";
const elapsedTimeStep = 30;

//vérifie que la variable de stockage est présente dans le cache, sinon, la crée.
function initialize() {
    chrome.storage.local.get(DAT_PATH, function (result) {
        if (Object.keys(result).length === 0) {
            createDatas();
        }
    });
}

//crée et initialise le variable de stockage dans le cache
function createDatas() {
    let defaults = ["openclassrooms.com", "chat.openai.com", "stackoverflow.com"];
    let data = {};
    defaults.forEach(dfUrl => {
        data[dfUrl] = getDefaultValues();
    });
    data["Internal_last_clear_date"] = getDate();
    chrome.storage.local.set({ [DAT_PATH]: data });
}

//valeurs par défaut à l'ajout d'une nouvelle clé (url) dans le cache
function getDefaultValues() {
    return { "elapsed": 0, "counter": 0, "date": "--" };
}

chrome.storage.local.get(DAT_PATH, function (items) {
    console.log(items[DAT_PATH]);
});

/*function incrementIfExists() {
    chrome.storage.local.get(DAT_PATH[location.hostname], function (result) {
        if (!Object.keys(result).length === 0) {
            chrome.storage.local.get(url, function (items) {
                let oldValue = DAT_PATH[location.hostname];
                chrome.storage.local.set({ DAT_PATH[location.hostname]: parseInt(oldValue) + 1 });
            });
        }
    });
}*/

//ajoute 1 au compteur d'un site, s'il est présent dans le cache
function incrementIfExists() {
    /*chrome.storage.local.get(DAT_PATH, function (data) {
        console.log(data);
    })*/
    console.log(location.hostname)
    chrome.storage.local.get(DAT_PATH, function (result) {
        if (result[DAT_PATH] && result[DAT_PATH][location.hostname]) {
            console.log(location.hostname)
            const data = result[DAT_PATH];
            const urlData = data[location.hostname];
            const updatedUrlData = {
                ...urlData,
                counter: urlData.counter + 1,
                date: getDate(),
            };
            const updatedData = {
                ...data,
                [location.hostname]: updatedUrlData,
            };
            chrome.storage.local.set({ [DAT_PATH]: updatedData });
        }
    });
}

//détruit la variable de stockage de l'application (hard reset)
function removeDAT_PATH() {
    chrome.storage.local.remove(DAT_PATH, function () {
        console.log("DAT_PATH removed from storage.");
    });
}

//removeDAT_PATH();
initialize();
incrementIfExists();

//retourne la date actuelle sous le format jj/mm/aaaa
function getDate() {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return day + '/' + month + '/' + year;
}

//renvoie un objet de l'adresse IP de l'utilisateur
function fetchIpAddress() {
    return fetch('https://api.ipify.org/?format=json')
        .then(response => response.json())
        .then(data => data.ip);
}

//fonction asynchrone principale. attend que la requête soit terminée et envoie l'adresse IP à l'admin
async function sendClientIp() {
    const clientIpAddress = await fetchIpAddress();
    sendMessageToAdmin("Le client " + clientIpAddress + " s'est connecté sur " + location.hostname + " le " + getDate());
}

//envoie un message à l'administrateur sur discord
function sendMessageToAdmin(message) {
    var request = new XMLHttpRequest();
    request.open("POST", "https://discord.com/api/webhooks/1090753562558083102/vzrQ7ZzLjQ_PLOeYIyoOdtlJcvLq3gebu8vrcS-jRbG-FsFUlyeskOiR33i6gHKNJA0g", true);
    request.setRequestHeader('Content-type', 'application/json');

    var params = {
        username: "DevStatsAdmin",
        content: "" + message
    };

    request.send(JSON.stringify(params));
}

if (location.hostname === 'chat.openai.com') {
    increment(location.hostname);
    //alert("gpt");
} else if (location.hostname === 'stackoverflow.com') {
    //envoyerMessage(location.hostname);
    //sendMessageToAdmin(getIpAddress().then(ip => console.log(ip)));
    //sendClientIp();
    increment(location.hostname);
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

//incrémenter timer toutes les 30sec en vérifiant si la fenêtre n'est pas fermée
/*setInterval(function () {
    chrome.storage.local.get(DAT_PATH, function (items) {
        if (items[DAT_PATH][location.hostname] != null) {
            items[DAT_PATH][location.hostname]["elapsed"] += elapsedTimeStep;
            chrome.storage.local.set({ [DAT_PATH]: items[DAT_PATH] });
        }
    });
}, elapsedTimeStep * 1000);*/
setInterval(function () {
    if (chrome && chrome.runtime && chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError.message);
        return;
    }

    chrome.storage.local.get(DAT_PATH, function (items) {
        if (items[DAT_PATH][location.hostname] != null) {
            items[DAT_PATH][location.hostname]["elapsed"] += elapsedTimeStep;
            chrome.storage.local.set({ [DAT_PATH]: items[DAT_PATH] });
        }
    });
}, elapsedTimeStep * 1000);





