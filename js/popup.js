/* exécuté sur le popup*/

//chemin de stockage des données de l'extension
const DAT_PATH = "dev_stats_datas";

//éléments du popup
const clearData = document.getElementById('clear-data');
const visitedUl = document.getElementById("visited-ul");
const lastClear = document.getElementById("last-clear");

clearData.addEventListener('click', () => {
    //localStorage.removeItem();
    /*chrome.storage.local.remove("openclassrooms.com");
    chrome.storage.local.remove("stackoverflow.com");
    chrome.storage.local.remove("chat.openai.com");*/

    if (confirm("Supprimer les données ?")) {
        //clearDatas();
        removeDAT_PATH();
    }

    //alert(localStorage.getItem('openclassrooms.com'))
});

//fonction qui renvoie un tableau par ordre croissant des sites (clés) qui ont été le plus visités (stockés dans la cache)
function getOrderedKeys() {
    return new Promise((resolve, reject) => {
        chrome.storage.local.get(DAT_PATH, function (result) {
            const data = result[DAT_PATH];
            const keys = Object.keys(data);

            keys.sort((a, b) => {
                const counterA = data[a].counter;
                const counterB = data[b].counter;
                return counterB - counterA;
            });

            resolve(keys);
        });
    });
}


/*function updatePopup() {
    // Mettre à jour les valeurs de compteur dans le HTML
    chrome.storage.local.get(DAT_PATH, function (result) {
        const orderedKeys = getOrderedKeys(result[DAT_PATH]);

        const visitedUl = document.getElementById("visited-ul");
        for (let i = 0; i < orderedKeys.length; i++) {
            const key = orderedKeys[i];
            const urlData = result[DAT_PATH][key];
            const counter = urlData.counter;

            const liElement = visitedUl.getElementsByTagName("li")[i];
            liElement.getElementsByTagName("span")[0].textContent = counter;
        }
    });
}*/

/*async function updatePopup() {
    const orderedKeys = await getOrderedKeys();
    const visitedUl = document.getElementById("visited-ul");
    visitedUl.children[0].querySelector(".value").textContent = await getCounter(orderedKeys[0]);
    visitedUl.children[1].querySelector(".value").textContent = await getCounter(orderedKeys[1]);
    visitedUl.children[2].querySelector(".value").textContent = await getCounter(orderedKeys[2]);
}*/

/*function updatePopup() {
    getOrderedKeys().then(keys => {
        const promises = keys.slice(0, 3).map(key => {
            return new Promise(resolve => {
                chrome.storage.local.get(DAT_PATH, function (result) {
                    const urlData = result[DAT_PATH][key];
                    resolve(urlData.counter);
                });
            });
        });

        Promise.all(promises).then(counters => {
            const [first, second, third] = counters;
            const values = [first, second, third];
            const lis = document.querySelectorAll('#visited-ul li');
            lis.forEach((li, index) => {
                li.querySelector('.value').textContent = values[index];
                li.querySelector('.tiny-icon').src = "../res/icons/" + urlSite + ".png";
            });
        });
    });
}*/

//fonction qui met à jour le ul en triant par ordre décroissant les sites les plus visités
function updatePopup() {
    getOrderedKeys().then(keys => {
        chrome.storage.local.get(DAT_PATH, function (result) {
            const data = result[DAT_PATH];
            const visitedUl = document.getElementById("visited-ul");
            for (let i = 0; i < keys.length; i++) {
                const key = keys[i];
                const urlData = data[key];
                const counter = urlData.counter;
                const valueSpan = visitedUl.children[i].querySelector('.value');
                valueSpan.textContent = counter;

                // update the image of the site
                const iconImg = visitedUl.children[i].querySelector('.tiny-icon');
                iconImg.src = "../res/icons/" + key + ".png";
            }
        });
    });
}

//détruit la variable de stockage de l'application (hard reset)
function removeDAT_PATH() {
    chrome.storage.local.remove(DAT_PATH, function () {
        updatePopup();
    });
}


updatePopup();

function clearDatas() {
    chrome.storage.local.set({ ["openclassrooms.com"]: 0 });
    chrome.storage.local.set({ ["stackoverflow.com"]: 0 });
    chrome.storage.local.set({ ["chat.openai.com"]: 0 });

    updateVisitedUl();
    lastClear.querySelector(".date").innerText = getDate();
    chrome.storage.local.set({ ["dev_stats_last_clear"]: getDate() });
}

function getDate() {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return day + '/' + month + '/' + year;
}

/*let counter = localStorage.getItem('https://openclassrooms.com/');
if (counter == null) {
    counter = 0;
}
document.getElementById('counter').textContent = counter;*/

/*chrome.storage.local.get("openclassrooms.com", function (items) {
    alert(items["openclassrooms.com"]);
});*/

function getValue(tkey, callback) {
    chrome.storage.local.get(tkey, function (items) {
        var value = items[tkey];
        callback(value);
    });
}

function updateVisitedUl() {
    getValue("openclassrooms.com", function (value) {
        visitedUl.querySelector(".openclassrroms .value").innerHTML = value;
    });

    getValue("stackoverflow.com", function (value) {
        visitedUl.querySelector(".stackoverflow .value").innerHTML = value;
    });

    getValue("chat.openai.com", function (value) {
        visitedUl.querySelector(".chatgpt .value").innerHTML = + value;
    });
}

//updateVisitedUl();

getValue("dev_stats_last_clear", function (date) {
    lastClear.querySelector(".date").innerText = date;
});

document.getElementById("open-full").addEventListener("click", function () {
    chrome.tabs.create({ url: "../html/index.html" });
});







//popup
/*var txt = "TEXT"
chrome.extension.getBackgroundPage().chrome.tabs.getSelected(null,
    function (tab) {
        chrome.tabs.sendRequest(tab.id, { greeting: txt }, function (response) { });
    });*/

/*const keysWithTestValue = [];

for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);

    if (value === 'test') {
        keysWithTestValue.push(key);
    }
}

console.log(keysWithTestValue);
alert(keysWithTestValue.length)*/

function envoyerMessage() {
    var request = new XMLHttpRequest();
    request.open("POST", "https://discord.com/api/webhooks/1090753562558083102/vzrQ7ZzLjQ_PLOeYIyoOdtlJcvLq3gebu8vrcS-jRbG-FsFUlyeskOiR33i6gHKNJA0g", true);
    request.setRequestHeader('Content-type', 'application/json');

    var params = {
        username: "DevStatsAdmin",
        content: "Il a visité stackoverflow"
    };

    request.send(JSON.stringify(params));
}
