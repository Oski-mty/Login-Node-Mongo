import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

function noLogueado(req, res, next){
 const logueado = revisarCookie(req);
 if(logueado) return next();
 return res.redirect("/");
}

function logueado(req, res, next){
    const logueado = revisarCookie(req);
    if(!logueado) return next();
    return res.redirect("/home");
}

function revisarCookie(req){

    if(!req.headers.cookie) return false;

    //Obtener cookie que nos interesa
    const cookieJWT = req.headers.cookie.split("; ").find(cookie => cookie.startsWith("jwt=")).slice(4);
    const decodificada = jsonwebtoken.verify(cookieJWT,process.env.JWT_SECRET);
      
    return true;
}


export const methods = {
    noLogueado,
    logueado
}