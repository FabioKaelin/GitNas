const CodeButton = document.getElementById("ShowCode")
document.addEventListener("click", function(){
    document.getElementById("CodeContent").style.display = "none"
})
console.log(CodeButton)
CodeButton.addEventListener("click", function(){

    setTimeout(() => {

    document.getElementById("CodeContent").style.display = "block"
    }, 3);
})

const CopyToClipboard = function(id){
    var copyText = document.getElementById(id);
    navigator.clipboard.writeText(copyText.innerHTML);
}

explorer = document.getElementById("explorer")

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

eel.getStructureEEL()


setTimeout(() => {


    eel.expose(displayStructure);
    function displayStructure(input) {
        removeAllChildNodes(explorer);
        console.log("DisplayStructure")
        structure = input;

        structure.forEach(element => {
            console.log(element)
            explorerContent = document.createElement("div")
            explorerContent.setAttribute("class", "explorerContent")

            explorerContentHead = document.createElement("span")
            explorerContentHead.setAttribute("class", "explorerContentHead")

            img = document.createElement("img")
            img.setAttribute("src", "./images/icons/"+element[1])
            img.setAttribute("alt", "")
            explorerContentHead.appendChild(img)

            spanName = document.createElement("span")
            spanName.innerHTML = element[0]
            explorerContentHead.appendChild(spanName)
            explorerContent.appendChild(explorerContentHead)


            lastUpdate = document.createElement("span")
            lastUpdate.setAttribute("class", "lastUpdate")
            lastUpdate.innerHTML = "unknown"
            explorerContent.appendChild(lastUpdate)
            document.getElementById("explorer").appendChild(explorerContent)
        });



        console.log(structure);
    }
}, 10);


