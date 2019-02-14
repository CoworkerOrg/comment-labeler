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

function toggleState(stateBool) {
  chrome.storage.local.set({loggedIn: stateBool})
}

chrome.runtime.onMessage.addListener(
  (request, sender, sendResponse) => {
    try {
      sendResponse({backgroundScript: 'Background received click'})
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

window.onload = () => {
  firebase.initializeApp(firebaseConfig);
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log('User state change detected:', user)
      toggleState(true)
    } else {
      console.log('No user')
      toggleState(false)
    }
  });
}
