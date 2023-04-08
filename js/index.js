/* JS du tableau de bord */

//chemin de stockage des données de l'extension
const DAT_PATH = "dev_stats_datas";

const disponibleSites = ["openclassrooms.com", "stackoverflow.com", "chat.openai.com", "github.com", "gitlab.com", "developer.mozilla.org", "www.udemy.com", "sourceforge.net", "codepen.io"
    , "uiverse.io", "developpez.com", "codes-sources.commentcamarche.net"];

function searchSites(input) {
    const siteListDiv = document.getElementById('site-list');
    siteListDiv.innerHTML = '';
    const value = input.value.toLowerCase();

    // Recherche de sites correspondants dans la liste
    const filteredSites = disponibleSites.filter(site => site.toLowerCase().includes(value));

    if (filteredSites.length == 0) {
        siteListContainer.style.display = "none";
    } else {
        siteListContainer.style.display = "block";
    }

    // Affichage des sites correspondants
    filteredSites.forEach(site => {
        const siteDiv = document.createElement('div');
        siteDiv.textContent = site;
        siteDiv.onclick = () => {
            input.value = site;
            siteListDiv.innerHTML = '';
        };
        siteListDiv.appendChild(siteDiv);
    });

    /*// Ajout d'un bouton pour ajouter un nouveau site
    if (value && !filteredSites.includes(value)) {
        const addSiteBtn = document.createElement('button');
        addSiteBtn.textContent = `Ajouter "${value}"`;
        addSiteBtn.classList.add("classic-button");
        addSiteBtn.onclick = () => {
            disponibleSites.push(value);
            input.value = value;
            siteListDiv.innerHTML = '';
        };
        siteListDiv.appendChild(addSiteBtn);
    }*/
}

const siteInput = document.getElementById("input");
const siteListContainer = document.getElementById("site-list-container");

siteInput.addEventListener("keyup", () => {
    searchSites(siteInput);
})

/*siteInput.addEventListener('focus', () => {
    siteListContainer.style.display = "block";
    //siteListContainer.style.opacity = "1"
})*/

siteInput.addEventListener('blur', async function () {
    await sleep(250)
    siteListContainer.style.display = "none";
    //siteListContainer.style.opacity = "0"
})

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/*bouton ajouter site*/
const addSiteBtn = document.getElementById("add-site-button");

addSiteBtn.addEventListener("click", () => {
    newValue = siteInput.value;
    if (newValue != "" && newValue) {
        chrome.storage.local.get(DAT_PATH, function (data) {
            if (!data[DAT_PATH].hasOwnProperty(newValue)) { //soit data.dev_stats_datas.hasOwnProperty() soit data[DAT_PATH].hasOwnProperty()
                /*checkDomainExists(newValue)
                    .then(exists => {
                        console.log(`Le domaine ${newValue} ${exists ? "existe" : "n'existe pas"}`);
                    });*/
                data[DAT_PATH][newValue] = getDefaultValues();
                chrome.storage.local.set({ [DAT_PATH]: data[DAT_PATH] });
                input.value = '';
                appearPopup("added", newValue);
            } else {
                appearPopup("already-exist", newValue);
            }
        });
        //disponibleSites.push(siteInput.value);
    }
    //console.log(disponibleSites)
});

//valeurs par défaut à l'ajout d'une nouvelle clé (url) dans le cache
function getDefaultValues() {
    return { "elapsed": 0, "counter": 0, "date": "--" };
}

chrome.storage.local.get(DAT_PATH, function (data) {
    console.log(data);
})

/*vérifie si un nom de domaine existe*/
async function checkDomainExists(domain) {
    try {
        const response = await fetch(`https://${domain}`, { method: 'HEAD' });
        return response.status === 200;
    } catch (e) {
        return false;
    }
}

const addedPopup = document.getElementById("added-popup");

function appearPopup(type, url) {
    if (type == "already-exist") {
        /*addedPopup.querySelector("p").textContent = "Website :  was already in the list.";
        addedPopup.querySelector(".website-url").textContent = url;*/
        addedPopup.style.backgroundColor = "rgb(221, 21, 21)";
        addedPopup.querySelector('p').innerHTML = `Website : <span class="website-url">${url}</span> was already in the list.`;
    } else if (type == "added") {
        /*addedPopup.querySelector("p").textContent = "Website :  was successfully added to the list.";
        addedPopup.querySelector(".website-url").textContent = url;*/
        addedPopup.style.backgroundColor = "rgb(38, 180, 133)";
        addedPopup.querySelector('p').innerHTML = `Website : <span class="website-url">${url}</span> was successfully added to the list.`;
    }

    addedPopup.style.display = "block";
    addedPopup.style.opacity = "1";
    /*setTimeout(() => {
        addedPopup.style.opacity = "1";
    }, 10);*/

    setTimeout(() => {
        addedPopup.style.opacity = "0";
    }, 3000);

    setTimeout(() => {
        addedPopup.style.display = "none";
    }, 3500);
}





