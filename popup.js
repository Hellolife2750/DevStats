/* exécuté sur le popup*/

const clearData = document.getElementById('clear-data');
const visitedUl = document.getElementById("visited-ul");
const lastClear = document.getElementById("last-clear");

clearData.addEventListener('click', () => {
    //localStorage.removeItem();
    /*chrome.storage.local.remove("openclassrooms.com");
    chrome.storage.local.remove("stackoverflow.com");
    chrome.storage.local.remove("chat.openai.com");*/

    chrome.storage.local.set({ ["openclassrooms.com"]: 0 });
    chrome.storage.local.set({ ["stackoverflow.com"]: 0 });
    chrome.storage.local.set({ ["chat.openai.com"]: 0 });

    updateVisitedUl();
    lastClear.querySelector(".date").innerText = getDate();
    chrome.storage.local.set({ ["dev_stats_last_clear"]: getDate() });
    //alert(localStorage.getItem('openclassrooms.com'))
});

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

updateVisitedUl();

getValue("dev_stats_last_clear", function (date) {
    lastClear.querySelector(".date").innerText = date;
});

document.getElementById("open-full").addEventListener("click", function () {
    chrome.tabs.create({ url: "index.html" });
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
