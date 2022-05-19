console.log("Location: " + window.location)

eel.expose(testAlert);
function testAlert(input){
    window.alert(input)
}

document.getElementById("schriftzug").addEventListener("click", function(){
    window.location = "repos.html"
})
eel.expose(setLocation)
function setLocation(location1){
    window.location = location1
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}