repos = document.getElementById("repos")


function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function updateDescription(){
    console.log("update")
    newDescription = document.getElementById("newDescription").value
    eel.updateDescription(document.getElementById("newDescription").getAttribute("currentRepo"), newDescription)
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

        imgBearbeiten.addEventListener("click", function(){
            repos1 = document.getElementById("repos").childNodes
            console.log(repos1)


            repos1.forEach(element1 => {
                console.log(element1.childNodes[0].childNodes[0])
                if (element1.childNodes[0].childNodes[0].innerHTML == element.name){
                    divElement = document.createElement("div")
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

            // eel.updateDescription(element.name, "neue beschreibung")
        })

        textSpan.appendChild(titleSpan)
        textSpan.appendChild(pDescription)
        repoDiv.appendChild(textSpan)
        repoDiv.appendChild(imgBearbeiten)
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

