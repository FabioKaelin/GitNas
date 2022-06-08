eel.getCloneEEL()(function (input) {
    document.getElementById("CodeContentURL").innerHTML = input.Url
    document.getElementById("CodeContentRemote").innerHTML = input.Remote
    document.getElementById("CodeContentClone").innerHTML = input.Clone
    document.getElementById("CodeContentPush").innerHTML = input.Push
})

eel.getReadme()(function (content) {
    var mainDiv = document.getElementById("markdown");
    if (content == "false") {
        mainDiv.parentNode.removeChild(mainDiv);
        return
    }
    mainDiv.innerHTML = content;
})

loader = document.createElement("div")
loader.setAttribute("class", "loader")
document.getElementById("explorer").appendChild(loader)

const CodeButton = document.getElementById("ShowCode")
document.addEventListener("click", function () {
    document.getElementById("CodeContent").style.display = "none"
    document.getElementById("BranchesContent").style.display = "none"
})

CodeButton.addEventListener("click", function () {
    setTimeout(() => {
        document.getElementById("CodeContent").style.display = "block"
    }, 3);
})

document.getElementById("ShowBranches").addEventListener("click", function () {
    setTimeout(() => {
        document.getElementById("BranchesContent").style.display = "block"
    }, 3);
})

const CopyToClipboard = function (id) {
    var copyText = document.getElementById(id);
    navigator.clipboard.writeText(copyText.innerHTML);
}

explorer = document.getElementById("explorer")
eel.getStructureEEL()

setTimeout(() => {
    eel.expose(displaybranches)
    function displaybranches(input) {
        parentDiv = document.getElementById("BranchesContent")
        document.getElementById("currentBranch").innerHTML = input[1]
        removeAllChildNodes(parentDiv);
        input[0].forEach(element => {
            maxdiv = document.createElement("div")
            maxdiv.setAttribute("class", element)
            if (element == input[1]) {
                maxdiv.innerHTML = "* " + element
            } else {
                maxdiv.innerHTML = element
            }
            maxdiv.addEventListener("click", function () {
                loader1 = document.createElement("div")
                loader1.setAttribute("class", "loader")
                explorer.appendChild(loader1)
                eel.changeBranch(element)(function (a) {
                    location.reload()
                })
            })
            parentDiv.appendChild(maxdiv)
            parentDiv.appendChild(document.createElement("hr"))
        });
        parentDiv.removeChild(parentDiv.lastChild)
    }

    eel.expose(displayStructure);
    function displayStructure(input) {
        removeAllChildNodes(explorer);
        structure = input[1];
        structure.forEach(element => {
            explorerContent = document.createElement("div")
            explorerContent.setAttribute("class", "explorerContent")
            explorerContent.addEventListener("click", function () {
                eel.setPosition(input[0][0], input[0][1] + "/" + element[0], element[2])
            })
            explorerContentHead = document.createElement("span")
            explorerContentHead.setAttribute("class", "explorerContentHead")
            img = document.createElement("img")
            img.setAttribute("src", "./images/icons/" + element[1])
            img.setAttribute("alt", "")
            explorerContentHead.appendChild(img)
            spanName = document.createElement("span")
            spanName.innerHTML = element[0]
            explorerContentHead.appendChild(spanName)
            explorerContent.appendChild(explorerContentHead)
            document.getElementById("explorer").appendChild(explorerContent)
        });
    }
}, 10);

function download() {
    eel.eelDownloadZip()
    document.getElementById("downloadButton").innerHTML = "✅Download als ZIP"
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

window.scrollTo(0, 0);