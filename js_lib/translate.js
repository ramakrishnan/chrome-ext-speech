$(document).ready(function() {
  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if(sender.tab) {
        playThis(request.text);
      }
    });
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {init: "speech"});
  });
});
