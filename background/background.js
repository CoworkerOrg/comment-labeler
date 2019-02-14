chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    try {
      sendResponse({backgroundScript: 'Received click'})
      try {
        switch(request.data.redditContentType) {
          case('comment'):
            writeRedditCommentData(request.data, sender.tab.url)
            break
          case('submission'):
            writeRedditSubmissionData(request.data, sender.tab.url)
            break
        }
      }
      catch (e) {
        console.log(`Background script error: ${e}`)
      }
    }
    catch (e) {
      console.log(e)
    }
  });

function writeRedditCommentData(contentScriptData, url) {
  firebase.database().ref('comments/' + Date.now()).set({
    category: contentScriptData.category,
    type: contentScriptData.redditContentType,
    text: contentScriptData.text,
    user: contentScriptData.user,
    url: url,
    labeler: firebase.auth().currentUser.email
  });
}

function writeRedditSubmissionData(contentScriptData, url) {
  firebase.database().ref('submissions/' + Date.now()).set({
    category: contentScriptData.category,
    type: contentScriptData.redditContentType,
    text: contentScriptData.text,
    user: contentScriptData.user,
    url: url,
    labeler: firebase.auth().currentUser.email
  });
}

// https://stackoverflow.com/questions/23895377/sending-message-from-a-background-script-to-a-content-script-then-to-a-injected/23895822#23895822
function ensureSendMessage(tabId, message) {
  chrome.tabs.sendMessage(tabId, {ping: true}, function(response) {
    if (response && response.pong) { // Content script ready
      chrome.tabs.sendMessage(tabId, message);
    } else { // No listener on the other end
      chrome.tabs.insertCSS(tabId, {file: "content-scripts/style.css"})
      chrome.tabs.executeScript(tabId, {file: 'content-scripts/index.js'},
        function(){
          // OK, now it's injected and ready
          chrome.tabs.sendMessage(tabId, message);
      });
    }
  });
}

window.onload = function() {
  firebase.initializeApp(firebaseConfig);
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // chrome.tabs.query({url: '*://*.reddit.com/r/*/comments/*'}, function(tabs) {
      //   for (i=0;i < tabs.length; i++) {
      //     ensureSendMessage(tabs[i].id, {firebaseState: "Logged in"});
      //   }
      // });
      } else {
        // chrome.tabs.query({url: '*://*.reddit.com/r/*/comments/*'}, function(tabs) {
        //   for (i=0;i < tabs.length; i++) {
        //     ensureSendMessage(tabs[i].id, {firebaseState: "Logged out"});
        //   }
        // });
      }
  })
}
