const CodeButton = document.getElementById("ShowCode")
document.addEventListener("click", function(){
    document.getElementById("CodeContent").style.display = "none"
})

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

/*
<div class="explorerContent">
    <span class="explorerContentHead">
        <img src="./images/icons/folder.svg" alt="">
        <span>vorbild</span>
    </span>

    <span class="lastUpdate">
        17.05.2022 14:27
    </span>
</div>
*/
eel.getStructureEEL("GitNas")
setTimeout(() => {
    eel.expose(displayStructure);
    function displayStructure(input) {
        removeAllChildNodes(explorer);
        structure = input;

        structure.forEach(element => {
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


