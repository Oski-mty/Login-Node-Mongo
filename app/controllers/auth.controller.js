import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
import UserModel from "../models/user.js";

dotenv.config();



function generarTokenYCookie(email){
  
    const token = jsonwebtoken.sign(
        {email:email}, 
        process.env.JWT_SECRET, 
        {expiresIn:process.env.JWT_EXPIRATION});
    
    const cookieOption = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
        path: "/"
    };

    // Devuelve un objeto que contiene ambos valores
    return { token, cookieOption };
}


async function register(req,res){

    // Recojo los valores del cuerpo de la petición
    const { user, email, password } = req.body;

    // Reviso que los campos no se manden vacios
    if(!user || !email || !password){
        return res.status(400).send({status:"Error", message:"Los campos están incompletos!"});
    }

    try{

        // Verificar si el usuario ya está registrado
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).send({ status: "Error", message: "Este email ya está registrado!" });
        }

        // Cifrado de contraseña
        const salt = await bcryptjs.genSalt(10);
        const hashPw = await bcryptjs.hash(password, salt)
        
        // Crear un nuevo usuario en la base de datos
        const newUser = await UserModel.create({ user, email, password: hashPw });

        // Genero token y cookie para mantener la sesion iniciada un dia
        const { token, cookieOption } = generarTokenYCookie(email);
        // Añado la cookie a la respuesta
        res.cookie("jwt",token,cookieOption)

        // Devuelvo la respuesta de la petición en 'ok' y redirijo al home
        return res.status(201).send({status:"ok", message:`Usuario ${newUser.email} agregado y loggeado`, redirect:"/home"});

    }catch (error) {
        return res.status(500).send({ status: "Error", message: "Error al registrar el usuario: " + error.message });
    }
}

async function login(req,res){

    // Recojo los valores del cuerpo de la petición
    const { email, password } = req.body;

    // Reviso que los campos no se manden vacios
    if(!email || !password){
        return res.status(400).send({status:"Error", message:"Los campos están incompletos!"});
    }

    try{

        // Buscar el usuario en la base de datos por su email
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).send({ status: "Error", message: "Email o contraseña incorrecta!" });
        }

        // Verificar la contraseña
        const passwordMatch = await bcryptjs.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(400).send({ status: "Error", message: "Email o contraseña incorrecta!" });
        }

        // Genero token y cookie para mantener la sesion iniciada un dia
        const { token, cookieOption } = generarTokenYCookie(email);
        // Añado la cookie a la respuesta
        res.cookie("jwt",token,cookieOption)

        // Devuelvo la respuesta de la petición en 'ok' y redirijo al home
        return res.status(201).send({status:"ok", message:`Usuario ${user.email} loggeado`, redirect:"/home"});

    } catch (error) {
        return res.status(500).send({ status: "Error", message: "Error al iniciar sesión: " + error.message });
    }
}



export const methods = {
    login,
    register
}