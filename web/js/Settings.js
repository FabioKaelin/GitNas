eel.getCloneEEL()(function(input){
    // console.log(input)
    document.getElementById("CodeContentURL").innerHTML = input.Url
    document.getElementById("CodeContentRemote").innerHTML = input.Remote
    document.getElementById("CodeContentClone").innerHTML = input.Clone
    document.getElementById("CodeContentPush").innerHTML = input.Push
})

// eel.expose(getUpdateFill)
// function getUpdateFill(input){
    // console.log(input)
    // document.getElementById("repoPath").innerHTML = input[1]
    // document.getElementById("beschreibung").value = input[0]
    // document.getElementById("iconPreview").setAttribute("src", "./images/repoIcons/"+input[1]+".png")
// }

eel.getUpdateFill()(function (input){
    console.log(input)
    document.getElementById("repoPath").innerHTML = input[0]
    document.getElementById("beschreibung").value = input[1]
    document.getElementById("iconPreview").setAttribute("src", "./images/repoIcons/"+input[0]+".png")
})

function selectIcon(){
    console.log("seledt icon")
    eel.askImage()(function(path){
        document.getElementById("icon").setAttribute("path", path)
        document.getElementById("icon").value = path.split("/")[path.split("/").length -1]
        document.getElementById("iconPreview").setAttribute("src", path)
    })
}


// loader = document.createElement("div")
// loader.setAttribute("class", "loader")
// document.getElementById("explorer").appendChild(loader)


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

settings = document.getElementById("Settings")


document.getElementById("update").addEventListener("click", function(){
    description = document.getElementById("beschreibung").value
    icon = document.getElementById("icon").getAttribute("path")
    // Settings
    loader = document.createElement("div")
    loader.setAttribute("class", "loader")
    document.getElementById("Settings").appendChild(loader)
    eel.updateRepo(description, icon)
})

function clearIcon(){
    eel.generateImage()(function(path){
        document.getElementById("icon").setAttribute("path", path)
        document.getElementById("iconPreview").setAttribute("src", path)
    })
}


// eel.eelGetPath()(function(position){
//     // console.log(position)
//     // document.getElementById("repoPath").innerHTML = position[0]

//     pathSpan = document.getElementById("path")
//     removeAllChildNodes(pathSpan)
//     pathSpan.appendChild(document.createTextNode("/"))
//     repoPath = document.createElement("a")
//     repoPath.setAttribute("href", "#")
//     repoPath.innerHTML = position[0]
//     repoPath.addEventListener("click",function(){
//         eel.setPosition(position[0])
//         location.reload()
//     })
//     pathSpan.appendChild(repoPath)

//     path1 = position[1] // = "web"
//     pathArray = path1.split("/")

//     pathStr = ""
//     if (pathArray != [""]){

//         pathArray.forEach(element => {
//             pathStr = pathStr + "/" + element
//             link = document.createElement("a")
//             link.setAttribute("href", "#")
//             link.setAttribute("pfad", pathStr)
//             link.innerHTML = element
//             link.addEventListener("click", function(){
//                 eel.setPosition(position[0], this.getAttribute("pfad"))
//                 location.reload()
//             })
//             pathSpan.appendChild(document.createTextNode("/"))
//             pathSpan.appendChild(link)
//             // <span id="path">/ <a id="repoPath" href="#">GitNas</a></span>

//         });
//     }
// })