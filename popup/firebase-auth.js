var config = {
  apiKey: "AIzaSyCPKgvP-dAt7DF9EmYQdXXn_Ea7Iuj0BtI",
  authDomain: "reddit-comment-db.firebaseapp.com",
  databaseURL: "https://reddit-comment-db.firebaseio.com",
  projectId: "reddit-comment-db",
  storageBucket: "reddit-comment-db.appspot.com",
  messagingSenderId: "1003042635856"
};

var uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function(authResult, redirectUrl) {
      return true;
    },
    uiShown: function() {
      document.getElementById('loader').style.display = 'none';
    }
  },
  signInSuccessUrl: 'success.html',
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    // firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    // firebase.auth.GithubAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ]
};

window.onload = function() {
  firebase.initializeApp(config);

  var ui = new firebaseui.auth.AuthUI(firebase.auth());
  ui.start('#firebaseui-auth-container', uiConfig);

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log(user)
      } else {
        console.log('no user')
      }
  });

  // TODO: reddit auth
};
