repos = document.getElementById("repos")
console.log("asdf")

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function updateDescription(){
    allowExplorer = false
    console.log("update")
    newDescription = document.getElementById("newDescription").value
    // Funktion zum Ausführen
    eel.updateDescription(document.getElementById("newDescription").getAttribute("currentRepo"), newDescription)
    titlenode = document.getElementById("repos").childNodes
    titlenode.forEach(element => {
        if (element.childNodes[0].childNodes[0].innerHTML == document.getElementById("newDescription").getAttribute("currentRepo")){
            element.childNodes[0].childNodes[1].innerHTML = newDescription
        }
    });
    document.getElementById("descriptionUpdate").remove()
    setTimeout(() => {
        allowExplorer = true
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

        imgBearbeiten = document.createElement("img");
        imgBearbeiten.setAttribute("src", "./images/icons/stift.svg");
        imgBearbeiten.setAttribute("alt", "bearbeiten");
        allowExplorer = true

        imgBearbeiten.addEventListener("click", function(){
            allowExplorer = false
            repos1 = document.getElementById("repos").childNodes
            repos1.forEach(element1 => {
                if (element1.childNodes[0].childNodes[0].innerHTML == element.name){
                    divElement = document.createElement("div")
                    divElement.addEventListener("click", function(){
                        allowExplorer = false
                        setTimeout(() => {
                            allowExplorer = true
                        }, 10);
                    })
                    divElement.setAttribute("id", "descriptionUpdate")
                    inputElement = document.createElement("input")
                    inputElement.setAttribute("type", "text")
                    inputElement.setAttribute("name", "newDescription")
                    inputElement.setAttribute("id", "newDescription")
                    inputElement.setAttribute("currentRepo", element.name)
                    inputElement.value = element1.childNodes[0].childNodes[1].innerHTML
                    buttonElement = document.createElement("button")
                    buttonElement.setAttribute("onclick", "updateDescription()")
                    buttonElement.innerHTML = "Update"
                    divElement.appendChild(inputElement)
                    divElement.appendChild(buttonElement)
                    console.log(divElement)
                    element1.childNodes[0].appendChild(divElement)
                }
            });
            setTimeout(() => {
                allowExplorer = true
            }, 10);


            // eel.updateDescription(element.name, "neue beschreibung")
        })

        textSpan.appendChild(titleSpan)
        textSpan.appendChild(pDescription)
        repoDiv.appendChild(textSpan)
        repoDiv.appendChild(imgBearbeiten)
        repoDiv.addEventListener("click", function(){
            if (allowExplorer){
                window.location = "explorer.html"
                eel.setPosition(element.name)
            }
        })
        repos.appendChild(repoDiv)
    });


}

/*
<div class="repo">
    <span>
        <span class="title">Name3(GitNas)</span>
        <p class="description">Ich bin eine Beschreibung für Name3</p>
    </span>
    <img src="./images/stift.svg" alt="Bearbeiten">
</div>
 */

eel.loadRepositoriesFunc();

