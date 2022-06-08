eel.getCloneEEL()(function (input) {
    document.getElementById("CodeContentURL").innerHTML = input.Url
    document.getElementById("CodeContentRemote").innerHTML = input.Remote
    document.getElementById("CodeContentClone").innerHTML = input.Clone
    document.getElementById("CodeContentPush").innerHTML = input.Push
})



loader = document.createElement("div")
loader.setAttribute("class", "loader")
document.getElementById("tags").appendChild(loader)

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

tags = document.getElementById("tags")


eel.getTags()(function (input) {
    removeAllChildNodes(tags);
    console.log(input)
    if (input == "false") {
        document.getElementById("gesamtTags").innerHTML = "0"
        return
    }
    document.getElementById("gesamtTags").innerHTML = input.length

    input.forEach(element => {
        explorerContent = document.createElement("div")
        explorerContent.setAttribute("class", "tagContent")
        messageSpan = document.createElement("span")
        messageSpan.setAttribute("class", "message")
        messageSpan.innerHTML = element
        explorerContent.appendChild(messageSpan)

        // dataDiv = document.createElement("div")
        // dataDiv.setAttribute("class", "data")


        // dateSpan = document.createElement("span")
        // dateSpan.setAttribute("class", "date")
        // dateSpan.innerHTML = element[2]

        // explorerContent.appendChild(document.createElement("br"))

        // hashSpan = document.createElement("span")
        // hashSpan.setAttribute("class", "hash")
        // hashSpan.innerHTML = element[1]
        // dataDiv.appendChild(hashSpan)
        // dataDiv.appendChild(dateSpan)

        // explorerContent.appendChild(dataDiv)


        tags.appendChild(explorerContent)
    });
})


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