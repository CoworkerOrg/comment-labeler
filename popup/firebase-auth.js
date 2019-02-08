var uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function(authResult, redirectUrl) {
      return true
    }
  },
  signInSuccessUrl: 'success.html',
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ]
};

function startAuth() {
  var ui = new firebaseui.auth.AuthUI(firebase.auth());
  ui.start('#firebaseui-auth-container', uiConfig);
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(error.code, error.message)
    });
}
window.onload = function() {
  const signout = document.getElementById('firebase-signout')
  const details = document.getElementById('firebase-user-details-container')
  firebase.initializeApp(firebaseConfig);
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      details.textContent = user.email
      signout.addEventListener('click', function(event) {
        firebase.auth().signOut();
        details.textContent = ''
      })
    } else {
      startAuth()
      signout.style.display = 'none'
    }
  })
};
