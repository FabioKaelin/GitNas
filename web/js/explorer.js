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