import  Router  from "express";
import { CreateUser } from "../controllers/create_user";
import { GetUser } from "../controllers/get_user";
import { LoginUser } from "../controllers/login_user";

export const router = Router();

router.get('/', (req, res) =>{
    res.status(200).send("Welcome API")
})
router.post('/create_user', CreateUser)

router.post('/auth_user', LoginUser)

router.post('/user', GetUser)