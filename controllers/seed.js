const { faker } = require("@faker-js/faker");
const createError = require("http-errors");
const bcrypt = require("bcrypt");
const CATEGORY = require("../models/category");
const DOCTOR = require("../models/doctor");
const PATIENT = require("../models/patient");
const APPOINTMENT = require("../models/appointment");
const CHAT = require("../models/chat");
const NOTIFICATION = require("../models/notification");
faker.locale = "ar";

const medicalSpecialization = [
  "الطب العام",
  "الطب الباطني",
  "الطب النفسي",
  "الطب الجراحي",
  "الطب الأسنان",
  "الطب النسائي",
  "الطب العيون",
  "الطب الأنف والأذن",
  "الطب الجلدي",
  "الطب العظام",
  "الطب العصبي",
  "الطب القلب",
  "الطب الأطفال",
  "الطب الرياضي",
  "الطب الطبيعي",
];

class Seed {
  static createRandomDoctor() {
    //for doctors
    const plainPassword = faker.internet.password();
    const password = bcrypt.hashSync(plainPassword, 10);
    const user = {
      name: faker.name.fullName(),
      email: `${faker.datatype.uuid()}@gmail.com`,
      password: password,
      phone: faker.phone.number("01#########"),
      address: faker.address.city(),
      //get random category from database
      category: CATEGORY.find({})._id,
      workHours: {
        from: faker.datatype.number({
          min: 1,
          max: 12,
        }),
        to: faker.datatype.number({
          min: 1,
          max: 12,
        }),
      },
      AppointmentCost: faker.datatype.number({
        min: 10,
        max: 1000,
      }),
      balance: faker.datatype.number({
        min: 0,
      }),
    };
    return user;
  }

  static createRandomPatient() {
    const plainPassword = faker.internet.password();
    const password = bcrypt.hashSync(plainPassword, 10);
    const user = {
      name: faker.name.fullName(),
      email: `${faker.datatype.uuid()}@gmail.com`,
      password: password,
      phone: faker.phone.number("+20 1# ### #####"),
      address: faker.address.city(),
      birthDate: faker.date.past(),
      //gender male or female
      gender: faker.name.gender(),
      balance: faker.datatype.number({
        min: 0,
      }),
    };
    return user;
  }
  static getRandomArbitrary(min = 1, max = 99) {
    return Math.ceil(Math.random() * (max - min) + min);
  }
  static async createRandomAPPOINTMENT() {
    let user = await PATIENT.findOne({ balance: { $gt: 1000 } });
    let doctor = await DOCTOR.findOne({ number: Seed.getRandomArbitrary() });
    const states = ["waiting", "accepted", "rejected", "finished"];
    const randomIndex = faker.datatype.number({
      min: 0,
      max: states.length - 1,
    });

    const appointment = new APPOINTMENT({
      patient: user._id,
      doctor: doctor._id,
      state: states[randomIndex],
      date: faker.date.future(),
      time: faker.datatype.number({
        min: 1,
        max: 12,
      }),

      cost: faker.datatype.number({
        min: 10,
        max: 1000,
      }),
      notes: faker.lorem.paragraph(),
      online: faker.datatype.boolean(),
    });
    return appointment;
  }
  static async doctorSeed(req, res, next) {
    try {
      const { query, params } = req;
      const { number } = query;
      const array = [];
      for (let i = 1; i < 100; i++) {
        array.push(Seed.createRandomDoctor());
      }
      console.log(array);

      const seedUser = await DOCTOR.insertMany(array);
      req.data = { message: `added ${array.length}` };

      return next();
    } catch (e) {
      return next(createError(e));
    }
  }
  static async patientSeed(req, res, next) {
    try {
      const { query, params } = req;
      const { number } = query;
      const array = [];
      for (let i = 1; i < 100; i++) {
        array.push(Seed.createRandomPatient());
      }
      console.log(array);

      const seedUser = await PATIENT.insertMany(array);
      req.data = { message: `added ${array.length}` };
      return next();
    } catch (e) {
      return next(createError(e));
    }
  }

  static async appointmentSeed(req, res, next) {
    try {
      const { query, params } = req;
      const { number } = query || 100;
      const appointments = [];
      for (let i = 1; i < number; i++) {
        appointments.push(await Seed.createRandomAPPOINTMENT());
      }
      console.log(appointments);

      // const seedUser = await APPOINTMENT.insertMany(appointments);
      for (let i = 0; i < appointments.length; i++) {
        try {
          await appointments[i].save();
        } catch (error) {
          console.log(
            `Error saving appointment ${i}: ${error.message} ${appointments[i]}}`
          );
          continue;
        }
      }
      req.data = { message: `added ${appointments.length}` };
      return next();
    } catch (e) {
      return next(createError(e));
    }
  }
  static async categorySeed(req, res, next) {
    //add specializations
    try {
      const { query, params } = req;
      const { number } = query;
      const array = [];

      for (let i = 1; i < medicalSpecialization.length; i++) {
        array.push({
          name: medicalSpecialization[i],
        });
      }
      console.log(array);

      const seedUser = await CATEGORY.insertMany(array);
      req.data = { message: `added ${array.length}` };
      return next();
    } catch (e) {
      return next(createError(e));
    }
  }
}

module.exports = Seed;
