

eel.eelGetPath()(function(position){
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

    path1 = position[1]
    pathArray = path1.split("/")

    pathStr = ""
    if (pathArray != [""]){

        pathArray.forEach(element => {
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

        });
    }
})

eel.getFileEEL()(function(input){
    removeAllChildNodes(document.getElementById("prePreview"))
    if (input[4] == "text"){
        codeDiv = document.createElement("code")
        codeDiv.setAttribute("id", "codePreview")
        if (input[1] == "pyw"){
            input[1] = "py"
        }
        codeDiv.setAttribute("class", "line-numbers language-" + input[1])
        codeDiv.innerHTML = input[0]
        document.getElementById("prePreview").appendChild(codeDiv)

        script = document.createElement("script")
        script.setAttribute("src", "./js/syntax/prism.js")


        document.getElementById("content").appendChild(script)
        document.getElementById("lines").innerHTML = input[2]
        document.getElementById("size").innerHTML = input[3]
    }
    else if (input[4] == "img") {
        document.getElementById("editor").innerHTML = input[0]
        document.getElementById("lines").innerHTML = input[2]
        document.getElementById("size").innerHTML = input[3]
    }else{
        document.getElementById("lines").innerHTML = input[2]
        document.getElementById("size").innerHTML = input[3]
    }


})

