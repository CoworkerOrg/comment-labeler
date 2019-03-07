# Set up a Firebase project
1. Go to the [Firebase console ](https://console.firebase.google.com/)
2. Click the big blue "Add project" and then the dropdown to add Firebase to the existing Google Cloud project you created in the last section.
![](images/firebase/0.png)
3. Check all the boxes to give away your privacy and then "Add Firebase"
![](images/firebase/1.png)
#### Set up Realtime Database and add a web app
4. From the main menu, go to **Database** and then choose Realtime Database
![](images/firebase/2.png)
5. For security rules, select "Start in locked mode" and then click "Enable".
![](images/firebase/3.png)
5. This should take you to your new database. Go to the **Rules** section. Update `".write": false` to `".write": "auth != null"` and hit "Publish" to save the rule change.
![](images/firebase/8.png)
6. From the main menu, click the gear next to **Project Overview** and then **Project settings**.
![](images/firebase/4.png)
6. Under **Your apps**, click `</>` to add a web app.
![](images/firebase/5.png)
7. Add these credentials to your `config.js` file.
#### Authentication
8. Last thing! From the main menu, choose the sign-in provider you'd like to enable. The Comment Labeler extension is set up to use **Email/Password**.
![](images/firebase/7.png)

# Next
[Load the unpacked extension to test it](4-load-unpacked.md)
