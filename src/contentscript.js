// Add bubble to the top of the page.
let overlay = document.createElement('div');
//overlay.setAttribute('class', 'selection_bubble');
overlay.setAttribute("id", "overlay");

document.body.appendChild(overlay);

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        // Close the bubble when we click on the screen.
        document.addEventListener('mousedown', function (e) {
            overlayOff();
        }, false);

        console.log("GOT results: " + request.results);
        overlay.innerHTML =
            "<div id='text'>" +
                "<div id='overlay-title'>Travel Article Location</div>" +
                "<div id='inner-text'>" + request.results + "</div>" +
            "</div>";
        overlayOn();
    }
);

function overlayOn() {
    document.getElementById("overlay").style.display = "block";
}

function overlayOff() {
    document.getElementById("overlay").style.display = "none";
}