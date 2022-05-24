eel.getCloneEEL()(function(input){
    // console.log(input)
    document.getElementById("CodeContentURL").innerHTML = input.Url
    document.getElementById("CodeContentRemote").innerHTML = input.Remote
    document.getElementById("CodeContentClone").innerHTML = input.Clone
    document.getElementById("CodeContentPush").innerHTML = input.Push
})



loader = document.createElement("div")
loader.setAttribute("class", "loader")
document.getElementById("commits").appendChild(loader)

const CodeButton = document.getElementById("ShowCode")
document.addEventListener("click", function(){
    document.getElementById("CodeContent").style.display = "none"
})
// console.log(CodeButton)
CodeButton.addEventListener("click", function(){

    setTimeout(() => {

    document.getElementById("CodeContent").style.display = "block"
    }, 3);
})

const CopyToClipboard = function(id){
    var copyText = document.getElementById(id);
    navigator.clipboard.writeText(copyText.innerHTML);
}

commits = document.getElementById("commits")





// setTimeout(() => {
//     eel.expose(displayStructure);
//     function displayStructure(input) {
//         removeAllChildNodes(explorer);
//         // console.log("DisplayStructure")
//         structure = input[1];

//         structure.forEach(element => {
//             // console.log(element)
//             explorerContent = document.createElement("div")
//             explorerContent.setAttribute("class", "explorerContent")
//             explorerContent.addEventListener("click", function(){
//                 eel.setPosition(input[0][0], input[0][1] + "/" + element[0], element[2])
//             })

//             explorerContentHead = document.createElement("span")
//             explorerContentHead.setAttribute("class", "explorerContentHead")

//             img = document.createElement("img")
//             img.setAttribute("src", "./images/icons/"+element[1])
//             img.setAttribute("alt", "")
//             explorerContentHead.appendChild(img)

//             spanName = document.createElement("span")
//             spanName.innerHTML = element[0]
//             explorerContentHead.appendChild(spanName)
//             explorerContent.appendChild(explorerContentHead)


//             lastUpdate = document.createElement("span")
//             lastUpdate.setAttribute("class", "lastUpdate")
//             lastUpdate.innerHTML = "unknown"
//             explorerContent.appendChild(lastUpdate)
//             document.getElementById("explorer").appendChild(explorerContent)
//         });



//         // console.log(structure);
//     }
// }, 10);




eel.getCommits()(function(input){
    console.log(input)

    removeAllChildNodes(commits);
    input.forEach(element => {
        explorerContent = document.createElement("div")
        explorerContent.setAttribute("class", "commitContent")
        messageSpan = document.createElement("span")
        messageSpan.setAttribute("class", "message")
        messageSpan.innerHTML = element[0]
        explorerContent.appendChild(messageSpan)

        dataDiv = document.createElement("div")
        dataDiv.setAttribute("class", "data")


        dateSpan = document.createElement("span")
        dateSpan.setAttribute("class", "date")
        dateSpan.innerHTML = element[2]

        explorerContent.appendChild(document.createElement("br"))

        hashSpan = document.createElement("span")
        hashSpan.setAttribute("class", "hash")
        hashSpan.innerHTML = element[1]
        dataDiv.appendChild(hashSpan)
        dataDiv.appendChild(dateSpan)

        explorerContent.appendChild(dataDiv)


        commits.appendChild(explorerContent)
    });
})


eel.eelGetPath()(function(position){
    // console.log(position)
    // document.getElementById("repoPath").innerHTML = position[0]

    pathSpan = document.getElementById("path")
    removeAllChildNodes(pathSpan)
    pathSpan.appendChild(document.createTextNode("/"))
    repoPath = document.createElement("a")
    repoPath.setAttribute("href", "#")
    repoPath.innerHTML = position[0]
    repoPath.addEventListener("click",function(){
        eel.setPosition(position[0])
        location.reload()
    })
    pathSpan.appendChild(repoPath)

    path1 = position[1] // = "web"
    pathArray = path1.split("/")

    // console.log(pathArray)
    pathStr = ""
    // console.log(pathArray == [""])
    if (pathArray != [""]){

        pathArray.forEach(element => {
            // console.log(element)
            pathStr = pathStr + "/" + element
            link = document.createElement("a")
            link.setAttribute("href", "#")
            link.setAttribute("pfad", pathStr)
            link.innerHTML = element
            link.addEventListener("click", function(){
                eel.setPosition(position[0], this.getAttribute("pfad"))
                location.reload()
            })
            pathSpan.appendChild(document.createTextNode("/"))
            pathSpan.appendChild(link)
            // <span id="path">/ <a id="repoPath" href="#">GitNas</a></span>

        });
    }
})