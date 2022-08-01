# Depic

Depic is an educational mobile game for children ages 3-5. The goal of Depic is to help children learn the alphabit and improve object association skills through fun games that encourage interaction between the child, their environment, and their parents. This is accomplished through camera integration and object recognition capabilities. Although my partner Jade and I attempted to finish and launch the Depic app after graduating from Villanova University in 2020, a combination of factors (including the additional challenges related to heavy phone camera usage in an app for children) caused us to put the project on hold indefinitely. Hopefully one day we will be able to come back and drive this to completion!

## Video Demo
To view a video demonstration of how the app functions, check out this video demonstration: https://drive.google.com/file/d/1h-lrTPcCS8vcgs6OSesHvyoYR-DAQOQf/view?usp=sharing
Please note that the UI has improved considerably since this demo was recorded! I will work on getting an updated recording as well as screenshots available.

## Getting Started

For developers/contributors, this section will describe how to get your development environment up and running to be able to run the necessary frameworks and tooling for Depic.

### Prerequisites

1. [Node.js and npm](https://nodejs.org/en/)
2. [expo-cli](https://docs.expo.io/get-started/installation/)
    + You will also need to create an Expo account and install the Expo app on your smartphone!
3. [Clarifai](https://www.clarifai.com/)
    + You must sign up for a Clarifai API key and properly configure the project to use it for the app to function

### Installing

1. Clone this repository
2. Run `npm install` in your local directory to acquire all necessary dependencies
3. Create a file named `config.js` in the project root. In this file, put all necessary API keys as demonstrated by the [`config_template.js`](config_template.js) file in this repository
4. Use `npm start` or `expo start` to start Depic on your local machine. It's that easy!

## Project Structure

The following is the project directory structure. Only key logic and application-specific directories are enumerated. Feel free to explore the project yourself to gain better familiarity with how the codebase is set up.
```
.
├── App.js
├── app.json
├── assets
|   ├── art
|   |    └── Art assets for the app, eg. button icons
|   ├── icon.png
|   └── splash.png
├── babel.config.js
├── config.js
├── config_template.js
├── links.md
├── node_modules
├── out.txt
├── package.json
├── package-lock.json
├── README.md
└── src
    ├── common
    │   ├── assets.js
    │   └── styles.js
    ├── navigation
    │   └── HomeStackNavigator.js
    └── screens
        └── Screen components go here
```


## Built With

+ React Native
+ Expo
+ Clarifai

## Authors

* **Matthew O'Connell** - [moconn68](https://github.com/moconn68)
Software Development

* **Jade Huang** - [jhuang1998](https://github.com/jhuang1998)
Research and Design

## License

This project is not licensed and as such this code cannot be copied, modified, or redistributed without express written consent from the project authors.
