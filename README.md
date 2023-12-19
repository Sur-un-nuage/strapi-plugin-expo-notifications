# Strapi plugin expo-notifications

<img width="1322" alt="screen_notofications" src="https://user-images.githubusercontent.com/12623963/209171709-1121a482-f61e-475a-a291-3d96c15b1e7a.png">

## Latest additions

As of v2.0.1, error reports are fully relayed by the plugin. Each notification sent will get an array of errorsWhileSending and, five minutes later, an array of errorsWhileReceiving in the receivers field (json). You will then be able to remove the dysfunctional expoPushTokens from the concerned users. Please don't forget to do it on a regular basis, as properly handling errors and removing non-functioning tokens is important for ensuring reliable delivery of notifications.

As of v1.10.0, you have the option to attach a Strapi entry as JSON data.
The messages sent by the plugin will have the following structure:

```

{
to: 'ExponentPushToken[XXX]',
sound: 'default',
title: 'Your title',
body: 'Your subtitle',
data: { contentType: [model_name], entryId: [id_of_the_entry] } // Optional
}

```

## Introduction

Expo-notifications is a Strapi plugin that allows a Strapi user to send notifications via the Expo API directly from the Strapi admin panel. Typical use case: you have a react-native app connected to Strapi and you wish to notify your users about some newly published content without leaving the CMS.

For the moment, the notification object is dead simple - a title, a subtitle and a Strapi entry as json data.

## How does it work ?

The plugin expects a list of expoPushTokens in order to know where to send the notifications. So the set-up will consist in getting those tokens from the mobile app, storing them into Strapi and then gather the correct credentials.

### Step 1: Get the expoPushToken of your mobile user

In order to send a notification to the users of your react-native app, you first have to get their own unique expoPushToken. This can be achieved via the Notifications.getExpoPushTokenAsync() function at the root of your mobile app.

```

const token = await Notifications.getExpoPushTokenAsync().data;

```

The Expo docs will guide you through this step: https://docs.expo.dev/push-notifications/push-notifications-setup/.

### Step 2: Save the expoPushToken in Strapi

Now that you have the mobile app's expoPushToken, you can store it in Strapi. This will be done by adding a dedicated field to your existing users content-type. The field has to be called expoPushToken and expect a string.

![screen_add_field](https://user-images.githubusercontent.com/12623963/209175619-7fd1eda7-a89b-491a-a39c-f5f02836f625.png)

Update your user with his/her expoPushToken. The plugin will scan your users list in search for their expoPushToken: each time a token is found, the user is added to a list of potential receivers.

### Step 3: Configure the credentials

Not the funniest part but you have to go through it: make sure you get the correct credentials to send notifications to IOS and Android devices. The way to get these credentials is explained in the Expo docs: https://docs.expo.dev/versions/latest/sdk/notifications/#credentials-configuration

## Installation

Run any of the following commands inside your strapi directory to install the plugin:

```

npm i @surunnuage/strapi-plugin-expo-notifications

yarn add @surunnuage/strapi-plugin-expo-notifications

```

Then, to allow the plugin to appear in Strapi admin's panel:

```

npm run build

yarn build

```

## Usage

### Enable the plugin

Open the `config/plugins.js` file (or create it if it's not there) and enable the plugin. It will look as follow:

```

js
module.exports = ({ env }) => ({
  ...
  "expo-notifications": {
    enabled: true,
  },
  ...
});

```

### [Optional but recommended] Add your expo key

In order to securely use the Expo push notifications API, an Expo Access Token can be added to an `.env` file (so it won't be commited to Github or another version control system). The token must be called EXPO_ACCESS_TOKEN. You can find yours here: https://expo.dev/accounts/YOUR_EXPO_USERNAME/settings/access-tokens

```
EXPO_ACCESS_TOKEN=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

### [Optional] Add a test token

Expo-notifications allows you to add a test token in order to test your submission before the real sending (a test button will appear if the plugin finds a test token):

```

js
module.exports = ({ env }) => ({
  ...
  "expo-notifications": {
    enabled: true,
    config: {
      testToken: "ExponentPushToken[xxxxxxxxxxxxxxxxxxx]",
    },
  },
  ...
});

```

And that's it, now you can send notifications to your mobile app directly from Strapi.

## Further developments:

Nice to have:

- Customization options
- Scheduler

License: MIT - https://opensource.org/licenses/MIT
