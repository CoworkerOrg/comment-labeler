// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.database()

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    if (request.contentScript == "Label button clicked") {
      sendResponse({backgroundScript: "Processed click!"});
      writeRedditCommentData(request.data, sender.tab.url)
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

/**
 * https://github.com/firebase/quickstart-js/tree/master/auth/chromextension
 * 
 * initApp handles setting up the Firebase context and registering
 * callbacks for the auth status.
 *
 * The core initialization is in firebase.App - this is the glue class
 * which stores configuration. We provide an app name here to allow
 * distinguishing multiple app instances.
 *
 * This method also registers a listener with firebase.auth().onAuthStateChanged.
 * This listener is called when the user is signed in or out, and that
 * is where we update the UI.
 *
 * When signed in, we also authenticate to the Firebase Realtime Database.
 */
function initApp() {
  // Listen for auth state changes.
  firebase.auth().onAuthStateChanged(function(user) {
    console.log('User state change detected from the Background script of the Chrome Extension:', user);
  });
}

window.onload = function() {
  initApp();
};
