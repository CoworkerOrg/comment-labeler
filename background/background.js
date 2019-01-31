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
    url: url
  });
}

function writeRedditSubmissionData(contentScriptData, url) {
  firebase.database().ref('submissions/' + Date.now()).set({
    category: contentScriptData.category,
    type: contentScriptData.redditContentType,
    text: contentScriptData.text,
    user: contentScriptData.user,
    url: url
  });
}

/**
 * https://github.com/firebase/quickstart-js/tree/master/auth/chromextension
 */
function initApp() {
  firebase.auth().onAuthStateChanged(function(user) {
    console.log('User state change detected:', user);
  });
}

window.onload = function() {
  firebase.initializeApp(firebaseConfig);
  var database = firebase.database()
  initApp();
};
