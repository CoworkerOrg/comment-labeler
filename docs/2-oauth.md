# Set up OAuth for the Chrome extension
1. Go to your [Google Developer Console](https://console.developers.google.com/apis/credentials/oauthclient?project=_&pli=1)
2. Click "Create"
![](images/oauth/0.png)
2. Name the project.
![](images/oauth/1.png)
3. If everything is grayed out, you will have to "Configure consent screen".
![](images/oauth/2.png)
3. You just need to fill out the "Application name" field and continue.
![](images/oauth/3.png)
3. This should take you back to the "Create OAuth Client ID" screen. For application type, select "Chrome app" and, for application ID, enter your Chrome item ID from the previous section. Click "Create".
![](images/oauth/4.png)
5. The next screen should show you the OAuth client ID.
![](images/oauth/5.png)
5. Add it to `manifest.json` under the OAuth2 section. After this step, this section of the manifest should read:
```
  "oauth2": {
    "client_id": "...apps.googleusercontent.com",
    "scopes": [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile"
    ]
  },
  "key": "MIIB..."
}
```

#### Disable billing
9. The last thing to do in this section is disable billing, which will make configuring Firebase a little easier. Click the hamburger menu on the left side of the page and go to **Billing** > **Overview**.
![](images/oauth/7.png)
9. Click the three vertically stacked dots to the right of the project name and then "Disable billing"
![](images/oauth/8.png)
9. No need to click anything when you get to "This project has no billing account".
![](images/oauth/9.png)
# Next
[Set up a Firebase project](3-firebase-setup.md)
