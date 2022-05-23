let RepoNames = []

eel.getRepoNames()(function (input) {
    console.log(input)
    RepoNames = input
})

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
    console.log(name1)

    beschreibung1 = document.getElementById("beschreibung").value
    console.log(beschreibung1)
    eel.createRepo(name1, beschreibung1)

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