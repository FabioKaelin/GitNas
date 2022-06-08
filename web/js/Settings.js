eel.getCloneEEL()(function (input) {
    document.getElementById("CodeContentURL").innerHTML = input.Url
    document.getElementById("CodeContentRemote").innerHTML = input.Remote
    document.getElementById("CodeContentClone").innerHTML = input.Clone
    document.getElementById("CodeContentPush").innerHTML = input.Push
})


eel.getUpdateFill()(function (input) {
    document.getElementById("repoPath").innerHTML = input[0]
    document.getElementById("beschreibung").value = input[1]
    document.getElementById("iconPreview").setAttribute("src", "./images/repoIcons/" + input[0] + ".png")
})

function selectIcon() {
    eel.askImage()(function (path) {
        document.getElementById("icon").setAttribute("path", path)
        document.getElementById("icon").value = path.split("/")[path.split("/").length - 1]
        document.getElementById("iconPreview").setAttribute("src", path)
    })
}


const CodeButton = document.getElementById("ShowCode")
document.addEventListener("click", function () {
    document.getElementById("CodeContent").style.display = "none"
})
CodeButton.addEventListener("click", function () {

    setTimeout(() => {

        document.getElementById("CodeContent").style.display = "block"
    }, 3);
})

const CopyToClipboard = function (id) {
    var copyText = document.getElementById(id);
    navigator.clipboard.writeText(copyText.innerHTML);
}

settings = document.getElementById("Settings")


document.getElementById("update").addEventListener("click", function () {
    description = document.getElementById("beschreibung").value
    icon = document.getElementById("icon").getAttribute("path")
    loader = document.createElement("div")
    loader.setAttribute("class", "loader")
    document.getElementById("Settings").appendChild(loader)
    eel.updateRepo(description, icon)
})

function clearIcon() {
    eel.generateImage()(function (path) {
        document.getElementById("icon").setAttribute("path", path)
        document.getElementById("iconPreview").setAttribute("src", path)
    })
}
