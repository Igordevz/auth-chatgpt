import { Request, Response } from "express";
import { UserModel } from "../models/user";

export async function GetUser(req:Request, res: Response){

    const { token } = req.body  

    const userExist = await UserModel.find({token:token});

    if(userExist){
        return res.status(200).json({userExist});
    }
  
    return res.status(401).json({ msg: 'usuário Não Encontrado' });
}