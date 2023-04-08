import { Document, model, Schema } from "mongoose";


export interface Iuser extends Document{

    name: string,
    email: string,
    password: string,
    status_account: string,
    typeColor: string,
    token: string,

}

export const UserSchema =  new Schema<Iuser>({

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
        required: true,
    }
})

export const UserModel = model<Iuser>("user", UserSchema)

// name: z.string().nonempty('preencha o campo Nome'),
// email: z.string().email('formato de email invalido').toLowerCase(),
// password: z.string().min(6, 'sua senha deve conter no mínimo 6 digitos'),
// status_account: z.string(),