"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/controllers/get_user.ts
var get_user_exports = {};
__export(get_user_exports, {
  GetUser: () => GetUser
});
module.exports = __toCommonJS(get_user_exports);

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

// src/controllers/get_user.ts
async function GetUser(req, res) {
  const { token } = req.body;
  const userExist = await UserModel.find({ token });
  if (userExist) {
    return res.status(200).json({ userExist });
  }
  return res.status(401).json({ msg: "usu\xE1rio N\xE3o Encontrado" });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GetUser
});
