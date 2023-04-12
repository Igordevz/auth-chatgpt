import { Request, Response } from "express";
import { UserModel } from "../models/user";
import bcrypt from 'bcrypt'
export async function LoginUser(req:Request, res: Response){

    const { email, password } = req.body
    
    const userExist:any = await UserModel.findOne({email: email})

    try {
      const passwordAcept = await bcrypt.compare(password, userExist.password)
      if(!passwordAcept){
        res.status(401).json({msg: "usuário não encontrado"})
        return;
     }
     if(passwordAcept){
        res.status(200).json({userExist})
        return;
     }
    } catch (error) {
      res.status(401).json({msg: "usúario não encontrado"})
    }

}