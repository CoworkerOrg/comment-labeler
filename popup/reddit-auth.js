var tokenReq = new XMLHttpRequest();
var base = "https://www.reddit.com/api/v1/authorize?"
var clientID = "4DEkZkBn9cNpfQ"
var responseType = "code"
var state = "state1"
var redirectURI = "https://not-an-aardvark.github.io/reddit-oauth-helper/"
var duration = "permanent"
var scope = ["identity", "read"]

var full = `${base}client_id=${clientID}&response_type=${responseType}&state=${state}&redirect_uri=${redirectURI}&scope=${scope}`
console.log(full)

tokenReq.open("POST", full, true)


// var base = "https://www.reddit.com/api/v1/access_token";
// var clientID = "4DEkZkBn9cNpfQ"; // My client ID is here
// var secret = "ASDFASDFASDF"; // My secret is here   

// tokenReq.open("POST", base, true); 

tokenReq.setRequestHeader("Authorization", "application/json");

tokenReq.addEventListener("load", function(){
    
    if(tokenReq.status >= 200 && tokenReq.status < 400){
        
       var response = JSON.parse(tokenReq.responseText);

       console.log(response);
    }

        else{

            console.log("Network error"); 
        }

    });//end load function
