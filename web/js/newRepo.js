let RepoNames = []

eel.getRepoNames()(function (input) {
    RepoNames = input
})


function selectIcon(){
    eel.askImage()(function(path){
        document.getElementById("icon").setAttribute("path", path)
        document.getElementById("icon").value = path.split("/")[path.split("/").length -1]

    })
}

function createNewRepo() {
    name2 = document.getElementById("name")
    if (RepoNames.includes(name2.value.toLowerCase())){
        return
    }else if (name2.value == ""){
        return
    }

    if (document.getElementById("beschreibung").value == ""){
        return
    }

    name1 = document.getElementById("name").value

    beschreibung1 = document.getElementById("beschreibung").value
    document.getElementById("create").disabled = true
    document.getElementById("reset").disabled = true
    document.getElementById("create").style.display = "none"
    document.getElementById("reset").style.display = "none"


    loader = document.createElement("div")
    loader.setAttribute("class", "loader")
    document.getElementById("NewRepo").appendChild(loader)
    path = document.getElementById("icon").getAttribute("path")

    eel.createRepo(name1, beschreibung1, path)(function(){
        eel.setPosition(name1)
    })

}

document.getElementById("beschreibung").style.background = "#5d1717"
document.getElementById("name").style.background = "#5d1717"


document.getElementById("name").addEventListener("input", function(){
    name2 = document.getElementById("name")
    if (RepoNames.includes(name2.value.toLowerCase())){
        document.getElementById("name").style.background = "#5d1717"
    }else if (name2.value == ""){
        document.getElementById("name").style.background = "#5d1717"
    }
    else{
        document.getElementById("name").style.background = ""
    }
})

document.getElementById("beschreibung").addEventListener("input", function(){
    name2 = document.getElementById("beschreibung")
    if (name2.value == ""){
        document.getElementById("beschreibung").style.background = "#5d1717"
    }
    else{
        document.getElementById("beschreibung").style.background = ""
    }
})