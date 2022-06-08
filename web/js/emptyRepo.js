eel.getCloneEEL()(function (input) {
    document.getElementById("CodeContentURL").innerHTML = input.Url
    document.getElementById("CodeContentRemote").innerHTML = input.Remote
    document.getElementById("CodeContentClone").innerHTML = input.Clone
    document.getElementById("CodeContentPush").innerHTML = input.Push
    document.getElementById("CodeRemote1").innerHTML = input.Url
    document.getElementById("CodeRemote2").innerHTML = input.Url
})

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

eel.eelGetPath()(function (position) {
    pathSpan = document.getElementById("path")
    removeAllChildNodes(pathSpan)
    pathSpan.appendChild(document.createTextNode("/"))
    repoPath = document.createElement("a")
    repoPath.setAttribute("href", "#")
    repoPath.innerHTML = position[0]
    repoPath.addEventListener("click", function () {
        eel.setPosition(position[0])
        location.reload()
    })
    pathSpan.appendChild(repoPath)
    path1 = position[1]
    pathArray = path1.split("/")
    pathStr = ""
    if (pathArray != [""]) {
        pathArray.forEach(element => {
            pathStr = pathStr + "/" + element
            link = document.createElement("a")
            link.setAttribute("href", "#")
            link.setAttribute("pfad", pathStr)
            link.innerHTML = element
            link.addEventListener("click", function () {
                eel.setPosition(position[0], this.getAttribute("pfad"))
                location.reload()
            })
            pathSpan.appendChild(document.createTextNode("/"))
            pathSpan.appendChild(link)
        });
    }
})