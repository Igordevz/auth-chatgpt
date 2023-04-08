import { Request, Response } from "express";
import { UserModel } from "../models/user";
import { uuid } from 'uuidv4';
import bcrypt from 'bcrypt'

export async function CreateUser(req:Request, res: Response){

    const { name, email, password } = req.body

    const salt = await bcrypt.genSalt(12)
    const passwordHas = await bcrypt.hash(password, salt)

    const modelUser = new UserModel({
        name,
        email,
        password: passwordHas,
        status_account: 'bronze',
        typeColor: "#977E60",
        token: uuid()
    })
    const userExist = await UserModel.findOne({ email: email })
    if(name == '' ){
      return  res.status(401).json({ msg: "Preencha o campo do nome" });
    }
    if(password < 6 ){
        return  res.status(401).json({ msg: "sua senha deve conter 6 digitos"});
    }
    if(email == '' ){
        return  res.status(401).json({ msg: "Preencha o campo do email" });
    }
    if(userExist){
      return  res.status(401).json({ msg: "Usuário ja existe" });
    }
    const addUser = await UserModel.create(modelUser)

    return res.status(201).json(modelUser); 

}