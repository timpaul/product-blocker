chrome.extension.sendRequest(
    {
        type: "check", 
        url: window.location.hostname
    }, 
    function(response) {
        window.stop();
        window.location = chrome.extension.getURL("blocked.html?" + response.url);
    }
);