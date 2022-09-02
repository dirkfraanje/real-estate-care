![My Remote Image](https://real-estate-care.netlify.app/img/realesatecarebanner.png)
# Real Estate Care - Mobile web app

This mobile app is designed to support inspectors when they are visiting buildings they have to inspect. With the app they can report damages, technical installations, deferred maintenance and modifications.

# Topics

1. Project status
2. Projec design
3. Setup and compile
4. Data
5. Synchronization
6. Security
7. Justification (Based on Nielsen's 10 Usability Heuristics)
8. WCAG 2.1 Guidlines

# Project status

The project is still being developed. The prototype can be seen in action by visiting https://real-estate-care.netlify.app

# Project frameworks

The project is build using Vue.js. Vuetify is used for material design.

The projects routing is setup using Vue router. State management is done by using Vuex.

# Setup and compile

## Setup the project

If you want to setup the project locally run the command **npm install**.

## Compile and watch the project locally

If you want to run the project locally enter the command **npm run serve**. A username, password and Two-factor code are automatically provided and stored in the local storage. In the prototype there is no check on the Two-factor code.

# Data

## Mock data

Mock data is available online from https://62f2244025d9e8a2e7d7b732.mockapi.io/inspections. The data is also added as a json and can be found in /data/inspections.json

## Offline data

During the development phase, data will be made available offline using local storage. Data can only be viewed when offline. In this phase it's not yet possible to execute CRUD operations when the app is offline. Local storage is fine for temporary storing data but is not good for CRUD operations. It is not yet decided how the data for the app will be completely **offline first** available.

# Synchronization

## Notifications

Notifications are synchronized one way: Every time the prototype is started they are downloaded from https://62f2244025d9e8a2e7d7b732.mockapi.io/notifications. You can remove them within the running project but after a restart they are downloaded again.

## Inspections

Inspections are synchronized two ways: They are downloaded the first time the app is started. After that all CRUD operations (Create, Read, Update, Delete) are available within the app and modify the mock data. Because different users are testing the data the data should not be deleted, or being added back after.

# Security
During development the prototype is not secure(d). You only need the login *demo* and password *password*. A Two-factor code is automatically provided, it can be anything, there is only a check if it's not empty.

# Justification

## Visibility of system status

Feedback for the user is provided through the main Snackbar (in App.vue) and by using popup's. While executing API actions a progress circular is shown so the user knows the system is working on it

## System and real world match

The system uses terms for headers, buttons and text that are familiar for inspectors. Data is ordered in a logical way for the inspector

## User control

Users can easily move within the system by using the arrows in the top bar, clicking the logo to return home and if they make mistakes when editing data they can just return to previous screens by using the Cancel buttons, so data is not edited.

## Consistency

For damages, modifications, technical installations and deferred maintenance the screens are all equal. They do have different options but there is no difference in the use and presentation of the screens and data.

## Error prevention

When a user enters data, it is made clear which data is required by using asterisk for those fields. Added to that, the Save button will only be enabled when those fields are filled, so it is not possible to accidently forgot to fill in one of the required fields.

## Recognition

Where possible selections are used instead of giving the user the possibility to enter data, for example if a modification has taken place an inspector can choose from a list who has performed this action, instead of having to enter it manually.

## Flexibility

In the app, flexibility has not (yet) been made possible for the user. As there is limited functionality (yet), re-use or flexibility has not yet been possible to implement

## Minimalist design

Information in popups is provided to the user as soon as something occurs that can be described as a 'show-stopper'.

## Error recovery

If an error is displayed in the snackbar, additional information is provided. If, for example, an inspection cannot be updated because the app is offline, the message in the snackbar will tell the user that it's not possible to perform the operation when the app is offline.

## Help

On the bottom navigation a user can easily fill in a short support form. This form is (as soon as the app is in production) send to the app provider so help can be offered.

# WCAG 2.1 Guidelines

The app almost completely follows the WCAG 2.1 guidelines. The site is tested (with the login temporary disabled) with siteimprove.com:
![My Remote Image](https://real-estate-care.netlify.app/img/wcag_check_real-estate-care.png)
