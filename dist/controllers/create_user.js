"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/controllers/create_user.ts
var create_user_exports = {};
__export(create_user_exports, {
  CreateUser: () => CreateUser
});
module.exports = __toCommonJS(create_user_exports);

// src/models/user.ts
var import_mongoose = require("mongoose");
var UserSchema = new import_mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  status_account: {
    type: String,
    required: true
  },
  typeColor: {
    type: String,
    required: true
  },
  token: {
    type: String,
    required: true
  }
});
var UserModel = (0, import_mongoose.model)("user", UserSchema);

// src/controllers/create_user.ts
var import_uuidv4 = require("uuidv4");
var import_bcrypt = __toESM(require("bcrypt"));
async function CreateUser(req, res) {
  const { name, email, password } = req.body;
  const salt = await import_bcrypt.default.genSalt(12);
  const passwordHas = await import_bcrypt.default.hash(password, salt);
  const modelUser = new UserModel({
    name,
    email,
    password: passwordHas,
    status_account: "bronze",
    typeColor: "#977E60",
    token: (0, import_uuidv4.uuid)()
  });
  const userExist = await UserModel.findOne({ email });
  if (name == "") {
    return res.status(401).json({ msg: "Preencha o campo do nome" });
  }
  if (password < 6) {
    return res.status(401).json({ msg: "sua senha deve conter 6 digitos" });
  }
  if (email == "") {
    return res.status(401).json({ msg: "Preencha o campo do email" });
  }
  if (userExist) {
    return res.status(401).json({ msg: "Usu\xE1rio ja existe" });
  }
  const addUser = await UserModel.create(modelUser);
  return res.status(201).json(modelUser);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CreateUser
});
