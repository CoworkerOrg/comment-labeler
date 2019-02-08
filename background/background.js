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

window.onload = function() {
  firebase.initializeApp(firebaseConfig);
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log('User state change detected:', user)
      chrome.tabs.query({url: '*://*.reddit.com/r/*'}, function(tabs) {
        console.log(tabs)
        tabs.forEach((tab) => chrome.tabs.sendMessage(tab.id, {firebaseState: 'Signed in'}))
      })
    } else {
      console.log('No user')
    }
  });
}
