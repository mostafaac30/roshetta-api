const AdminJS = require("adminjs");
const AdminJSExpress = require("@adminjs/express");
const AdminJSMongoose = require("@adminjs/mongoose");

// models
const PATIENT = require("../models/patient");
const CATEGORY = require("../models/category");
const DOCTOR = require("../models/doctor");
const NOTIFICATION = require("../models/notification");
const APPOINTMENT = require("../models/appointment");
const CHAT = require("../models/chat");
const MEDICAL_RECORD = require("../models/medical_record");
const REVIEW = require("../models/review");
//

AdminJS.registerAdapter(AdminJSMongoose);

//login details
const DEFAULT_ADMIN = {
  email: "admin@roshetta.com",
  password: "admin",
};

// handle authentication
const authenticate = async (email, password) => {
  //condition to check for correct login details
  if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
    //if the condition is true
    return Promise.resolve(DEFAULT_ADMIN);
  }
  //if the condition is false
  return null;
};

const adminJs = new AdminJS({
  databases: [],

  resources: [
    PATIENT,
    CATEGORY,
    DOCTOR,
    NOTIFICATION,
    APPOINTMENT,
    CHAT,
    MEDICAL_RECORD,
    REVIEW,
  ],
  rootPath: "/admin",
  branding: {
    companyName: "Roshetta",
    logo: "https://i.ibb.co/xJrymWS/app-icon.png",
    softwareBrothers: false,
    favicon: "https://i.ibb.co/xJrymWS/app-icon.png",
  },
  // change login text
  locale: {
    translations: {
      labels: {
        loginWelcome: "Welcome to Roshetta Admin Panel",
      },
      messages: {
        loginWelcome:
          "Team Members: ◉ Mostafa Mahmoud ◉ Mahmoud Adel ◉ Eslam Ahmed ◉ Ziad Ezzat ◉ Ziad Yasser",
        community_title: "Roshetta Admin Panel",
        welcomeOnBoard_title: "Welcome On RoShetta Dashboard",
        welcomeOnBoard_subtitle: "We are happy to see you here",
      },
      resources: {},
    },
  },

  // other actions
});

const adminJsRouter = AdminJSExpress.buildAuthenticatedRouter(
  adminJs,
  {
    authenticate,
    cookieName: "roshettaAdmin",
    cookiePassword: "roshetta",
  },
  null,
  {
    // store: AdminJSMongoose,
    resave: true,
    saveUninitialized: true,
    secret: "Secret",
    name: "adminjs",
  }
);

//app export

module.exports = { adminJsRouter, adminJs };
