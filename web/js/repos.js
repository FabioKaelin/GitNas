repos = document.getElementById("repos")

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function updateDescription() {
    allowExplorer = false
    newDescription = document.getElementById("newDescription").value
    eel.updateDescription(document.getElementById("newDescription").getAttribute("currentRepo"), newDescription)
    titlenode = document.getElementById("repos").childNodes
    titlenode.forEach(element => {
        if (element.childNodes[0].childNodes[0].innerHTML == document.getElementById("newDescription").getAttribute("currentRepo")) {
            element.childNodes[0].childNodes[1].innerHTML = newDescription
        }
    });
    document.getElementById("descriptionUpdate").remove()
    setTimeout(() => {
        allowExplorer = true
    }, 10);
}

document.addEventListener('keydown', logKey);
searchfocus = false
function logKey(e) {
    if (e.keyCode > 47 && e.keyCode < 91 && !searchfocus) {
        searchfocus = true
        document.getElementById("InputRepo").focus()
    }
    setTimeout(() => {
        regex2 = new RegExp(document.getElementById("InputRepo").value, "i")
        document.querySelectorAll(".title").forEach(element => {
            if (regex2.test(element.innerHTML)) {element.parentElement.parentElement.style.display = "flex"}
            else {element.parentElement.parentElement.style.display = "none"}
        });
    }, 10);
}

eel.expose(displayRepositories)
function displayRepositories(repositories) {
    removeAllChildNodes(repos)
    repositories.forEach(element => {
        repoDiv = document.createElement("div");
        repoDiv.setAttribute("class", "repo");
        textSpan = document.createElement("span");
        titleSpan = document.createElement("span");
        titleSpan.setAttribute("class", "title");
        titleSpan.innerHTML = element.name;
        pDescription = document.createElement("p");
        pDescription.setAttribute("class", "description");
        pDescription.innerHTML = element.description;
        repoIcon = document.createElement("img");
        repoIcon.setAttribute("src", "./images/repoIcons/" + element.name + ".png");
        repoIcon.setAttribute("alt", "Icon");
        repoIcon.setAttribute("class", "icon");
        imgBearbeiten = document.createElement("img");
        imgBearbeiten.setAttribute("src", "./images/icons/settings.svg");
        imgBearbeiten.setAttribute("alt", "bearbeiten");
        allowExplorer = true
        imgBearbeiten.addEventListener("click", function () {
            allowExplorer = false
            eel.openSettings("repos.html", element.name)
            setTimeout(() => {
                allowExplorer = true
            }, 10);
        })
        repoDiv.appendChild(repoIcon)
        textSpan.appendChild(titleSpan)
        textSpan.appendChild(pDescription)
        repoDiv.appendChild(textSpan)
        repoDiv.appendChild(imgBearbeiten)
        repoDiv.addEventListener("click", function () {
            if (allowExplorer) {eel.setPosition(element.name)}
        })
        repos.appendChild(repoDiv)
    });
}

eel.loadRepositoriesFunc();