var uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function(authResult, redirectUrl) {
      return true;
    }
  },
  signInSuccessUrl: 'success.html',
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ]
};

function showSignedInUI(user) {
  document.getElementById('firebase-user-details-container').textContent = user.email;
}

function startAuth() {
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
}
window.onload = function() {
  firebase.initializeApp(firebaseConfig);
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      showSignedInUI(user)
      const signout = document.getElementById('firebase-signout')
      signout.addEventListener('click', function(event) {
        firebase.auth().signOut();
        document.getElementById('firebase-user-details-container').textContent = ''
      })
    } else {
      startAuth()
      const signout = document.getElementById('firebase-signout')
      signout.style.display = 'none'
    }
  })
};
