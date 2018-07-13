

let title = "Find travel location";
chrome.contextMenus.create({"title": title, "contexts":["link"], "onclick": findLocationFromLink});
chrome.contextMenus.create({"title": title, "contexts":["browser_action"], "onclick": findLocationFromPage});

chrome.browserAction.onClicked.addListener(function(tab) {
    url = tab.url;
    console.log("pageUrl: " + url);
    findLocation(url)
});

function findLocationFromLink(info) {
    console.log("linkUrl: " + info.linkUrl);
    findLocation(info.linkUrl)
}


function findLocationFromPage() {
    chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
        url = tabs[0].url;
        console.log("pageUrl: " + url);
        findLocation(url)
    });
}

function findLocation(url) {
    let request = {url: url};

    let xhr = new XMLHttpRequest();
    chrome.storage.sync.get({
        numResults: 3,
    }, function(items) {
        console.log("Got storage: " + items);
        let count = items.numResults;
        xhr.open("POST", "https://5q3seoyxvc.execute-api.eu-west-1.amazonaws.com/prod/v1/findlocation?count=" + count, true);

        xhr.setRequestHeader("Content-type", "application/json");

        xhr.onreadystatechange = function() {//Call a function when the state changes.
            if(xhr.readyState == 4 && xhr.status == 200) {
                let response = JSON.parse(xhr.responseText);

                let result = "";
                for (let i = 0; i < response.words.length; i++) {
                    result += response.words[i].word + " occurs " + response.words[i].count + " times<br>"
                }
                console.log("Sending request");
                chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
                    chrome.tabs.sendMessage(tabs[0].id, {results: result}, function(response) {});
                });
            }
        };
        xhr.send(JSON.stringify(request));
    });
}