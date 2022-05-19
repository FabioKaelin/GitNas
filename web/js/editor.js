

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

    console.log(pathArray)
    pathStr = ""
    console.log(pathArray == [""])
    if (pathArray != [""]){

        pathArray.forEach(element => {
            console.log(element)
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