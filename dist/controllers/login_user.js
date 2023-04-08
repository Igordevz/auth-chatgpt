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

// src/controllers/login_user.ts
var login_user_exports = {};
__export(login_user_exports, {
  LoginUser: () => LoginUser
});
module.exports = __toCommonJS(login_user_exports);

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

// src/controllers/login_user.ts
var import_bcrypt = __toESM(require("bcrypt"));
async function LoginUser(req, res) {
  const { email, password } = req.body;
  const userExist = await UserModel.findOne({ email });
  const passwordAcept = await import_bcrypt.default.compare(password, userExist.password);
  if (passwordAcept) {
    return res.status(200).json(userExist);
  }
  if (!passwordAcept) {
    return res.status(401).json({ msg: "usu\xE1rio n\xE3o encontrado" });
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  LoginUser
});
