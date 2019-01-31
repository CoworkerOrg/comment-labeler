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
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ]
};

window.onload = function() {
  firebase.initializeApp(firebaseConfig);
  var ui = new firebaseui.auth.AuthUI(firebase.auth());
  ui.start('#firebaseui-auth-container', uiConfig);
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
  .then(function() {
    return firebase.auth()
  })
  .catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(error.code, error.message)
  });

  const signout = document.getElementById('firebase-signout')
  signout.addEventListener('click', function(event) {
    console.log('clicked')
    firebase.auth().signOut();
  })
};
