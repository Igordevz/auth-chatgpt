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

// src/router/router.ts
var router_exports = {};
__export(router_exports, {
  router: () => router
});
module.exports = __toCommonJS(router_exports);
var import_express = __toESM(require("express"));

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

// src/controllers/get_user.ts
async function GetUser(req, res) {
  const { token } = req.body;
  const userExist = await UserModel.find({ token });
  if (userExist) {
    return res.status(200).json({ userExist });
  }
  return res.status(401).json({ msg: "usu\xE1rio N\xE3o Encontrado" });
}

// src/controllers/login_user.ts
var import_bcrypt2 = __toESM(require("bcrypt"));
async function LoginUser(req, res) {
  const { email, password } = req.body;
  const userExist = await UserModel.findOne({ email });
  const passwordAcept = await import_bcrypt2.default.compare(password, userExist.password);
  if (passwordAcept) {
    return res.status(200).json(userExist);
  }
  if (!passwordAcept) {
    return res.status(401).json({ msg: "usu\xE1rio n\xE3o encontrado" });
  }
}

// src/router/router.ts
var router = (0, import_express.default)();
router.get("/", (req, res) => {
  res.status(200).send("Welcome API");
});
router.post("/create_user", CreateUser);
router.post("/auth_user", LoginUser);
router.post("/user", GetUser);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  router
});
