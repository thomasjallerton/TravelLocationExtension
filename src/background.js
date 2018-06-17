//
function findLocation(info) {
    console.log("linkUrl: " + info.linkUrl);

    let request = {url: info.linkUrl};

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://5q3seoyxvc.execute-api.eu-west-1.amazonaws.com/prod/v1/findlocation?count=3", true);

    xhr.setRequestHeader("Content-type", "application/json");

    xhr.onreadystatechange = function() {//Call a function when the state changes.
        if(xhr.readyState == 4 && xhr.status == 200) {
            let response = JSON.parse(xhr.responseText);

            let result = "";
            for (let i = 0; i < response.words.length; i++) {
              result += response.words[i].word + " occurs " + response.words[i].count + " times\n"
            }
            alert(result);
        }
    };
    xhr.send(JSON.stringify(request));
}

let title = "Find travel location";
chrome.contextMenus.create({"title": title, "contexts":["link"], "onclick": findLocation});
