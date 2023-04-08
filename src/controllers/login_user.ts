import { Request, Response } from "express";
import { UserModel } from "../models/user";
import bcrypt from 'bcrypt'
export async function LoginUser(req:Request, res: Response){

    const { email, password } = req.body
    
    const userExist:any = await UserModel.findOne({email: email})
    
    const passwordAcept =  await bcrypt.compare(password, userExist.password)

    if(passwordAcept){
      return  res.status(200).json(userExist);
    }
   
    if(!passwordAcept){
      return  res.status(401).json({msg: "usuário não encontrado"});
    }


}