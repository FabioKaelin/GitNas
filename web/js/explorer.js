eel.getCloneEEL()(function (input) {
    // console.log(input)
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

    // var updateContent = ""

    // imageRegex = /\!\[.*?\]\(.*?\)/gi
    // linkRegex = /\[.*?\]\(.*?\)/gi
    // importantRegex = /\*\*\*.*?\*\*\*/gi
    // blodRegex = /\*\*.*?\*\*/gi
    // italicRegex = /\*.*?\*/gi
    // codeRegex = /\`.*?\`/gi
    // strikeRegex = /\~\~.*?\~\~/gi
    // highlightRegex = /\=\=.*?\=\=/gi

    // ullist = false
    // ollist = false

    // content.split("\n").forEach(element => {
    //     makeBr = true
    //     if (element.substring(0, 4) == "####") {
    //         makeBr = false
    //         updateContent += "<h4>" + element.substring(5) + "</h4>"
    //     } else if (element.substring(0, 3) == "###") {
    //         makeBr = false
    //         updateContent += "<h3>" + element.substring(4) + "</h3>"
    //     } else if (element.substring(0, 2) == "##") {
    //         makeBr = false
    //         updateContent += "<h2>" + element.substring(3) + "</h2>"
    //     } else if (element.substring(0, 1) == "#") {
    //         makeBr = false
    //         updateContent += "<h1>" + element.substring(2) + "</h1>"
    //     } else {
    //         newContent = element


    //         regexCheck = imageRegex.test(element)
    //         if (regexCheck) {
    //             matchList = element.match(imageRegex)
    //             // console.log(matchList)
    //             matchList.forEach(element => {
    //                 alttext = element.replace("![", "").replace(/\]\(.*?\)/, "")
    //                 urltext = element.replace(")", "").replace(/\!\[.*?\]\(/, "")
    //                 imgTag = '<img src="' + urltext + '" alt="' + alttext + '"></img>'
    //                 newContent = newContent.replace(/\!\[.*?\]\(.*?\)/, imgTag)
    //             });
    //         }

    //         regexCheck = linkRegex.test(element)
    //         if (regexCheck) {
    //             matchList = element.match(linkRegex)
    //             // console.log(matchList)
    //             matchList.forEach(element => {
    //                 alttext = element.replace("[", "").replace(/\]\(.*?\)/, "")
    //                 urltext = element.replace(")", "").replace(/\[.*?\]\(/, "")
    //                 imgTag = '<a href="' + urltext + '">' + alttext + '</a>'
    //                 newContent = newContent.replace(/\[.*?\]\(.*?\)/, imgTag)
    //             });
    //         }

    //         regexCheck = importantRegex.test(element)
    //         if (regexCheck) {
    //             matchList = element.match(importantRegex)
    //             // console.log(matchList)
    //             matchList.forEach(element => {
    //                 content = element.replace(/\*\*\*/g, "")
    //                 bTag = '<i><b>' + content + '</b></i>'
    //                 newContent = newContent.replace(/\*\*\*.*?\*\*\*/, bTag)
    //             });
    //         }

    //         regexCheck = blodRegex.test(element)
    //         if (regexCheck) {
    //             matchList = element.match(blodRegex)
    //             // console.log(matchList)
    //             matchList.forEach(element => {
    //                 content = element.replace(/\*\*/g, "")
    //                 bTag = '<b>' + content + '</b>'
    //                 newContent = newContent.replace(/\*\*.*?\*\*/, bTag)
    //             });
    //         }

    //         regexCheck = italicRegex.test(element)
    //         if (regexCheck) {
    //             matchList = element.match(italicRegex)
    //             // console.log(matchList)
    //             matchList.forEach(element => {
    //                 content = element.replace(/\*/g, "")
    //                 bTag = '<i>' + content + '</i>'
    //                 newContent = newContent.replace(/\*.*?\*/, bTag)
    //             });
    //         }

    //         regexCheck = codeRegex.test(element)
    //         if (regexCheck) {
    //             matchList = element.match(codeRegex)
    //             // console.log(matchList)
    //             matchList.forEach(element => {
    //                 content = element.replace(/\`/g, "")
    //                 bTag = '<code>' + content + '</code>'
    //                 newContent = newContent.replace(/\`.*?\`/, bTag)
    //             });
    //         }
    //         regexCheck = strikeRegex.test(element)
    //         if (regexCheck) {
    //             matchList = element.match(strikeRegex)
    //             // console.log(matchList)
    //             matchList.forEach(element => {
    //                 content = element.replace(/\~\~/g, "")
    //                 bTag = '<s>' + content + '</s>'
    //                 newContent = newContent.replace(/\~\~.*?\~\~/, bTag)
    //             });
    //         }

    //         regexCheck = highlightRegex.test(element)
    //         if (regexCheck) {
    //             matchList = element.match(highlightRegex)
    //             // console.log(matchList)
    //             matchList.forEach(element => {
    //                 content = element.replace(/\=\=/g, "")
    //                 bTag = '<mark>' + content + '</mark>'
    //                 newContent = newContent.replace(/\=\=.*?\=\=/, bTag)
    //             });
    //         }

    //         if (newContent.substring(0, 1) == "-") {
    //             makeBr = false
    //             if (!ullist) {
    //                 newContent = "<ul>" + newContent
    //             }
    //             newContent = newContent.replace("-", "<li>") + "</li>"
    //             ullist = true

    //         } else if (newContent.substring(0, 1) == "*") {
    //             makeBr = false
    //             if (!ullist) {
    //                 newContent = "<ul>" + newContent
    //             }
    //             newContent = newContent.replace("*", "<li>") + "</li>"
    //             ullist = true
    //         } else {
    //             if (ullist) {
    //                 newContent = "</ul>" + newContent

    //             }
    //             ullist = false
    //         }


    //         if (/\d\. /.test(newContent.substring(0, 3))) {
    //             makeBr = false
    //             if (!ollist) {
    //                 newContent = "<ol>" + newContent
    //             }
    //             newContent = newContent.replace(/\d\. /, "<li>") + "</li>"
    //             ollist = true

    //         } else {
    //             if (ollist) {
    //                 newContent = "</ol>" + newContent

    //             }
    //             ollist = false
    //         }


    //         updateContent += newContent
    //     }



    //     if (makeBr) {
    //         updateContent += "<br>"
    //     }
    // });

    // mainDiv.innerHTML = updateContent
})

loader = document.createElement("div")
loader.setAttribute("class", "loader")
document.getElementById("explorer").appendChild(loader)

const CodeButton = document.getElementById("ShowCode")
document.addEventListener("click", function () {
    document.getElementById("CodeContent").style.display = "none"
    document.getElementById("BranchesContent").style.display = "none"
})
// console.log(CodeButton)
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
        // console.log("DisplayStructure")
        structure = input[1];

        structure.forEach(element => {
            // console.log(element)
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


            // lastUpdate = document.createElement("span")
            // lastUpdate.setAttribute("class", "lastUpdate")
            // lastUpdate.innerHTML = "unknown"
            // explorerContent.appendChild(lastUpdate)
            document.getElementById("explorer").appendChild(explorerContent)
        });



        // console.log(structure);
    }
}, 10);

function download() {
    eel.eelDownloadZip()
    document.getElementById("downloadButton").innerHTML = "✅Download als ZIP"
}

eel.eelGetPath()(function (position) {
    // console.log(position)
    // document.getElementById("repoPath").innerHTML = position[0]

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

    path1 = position[1] // = "web"
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
            // <span id="path">/ <a id="repoPath" href="#">GitNas</a></span>

        });
    }
})
window.scrollTo(0, 0);