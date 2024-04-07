import mongoose from 'mongoose';

// Definir el esquema del modelo de usuario
const userSchema = new mongoose.Schema({
    user: { type: String, required: true },
    email: { type: String, required: true, unique: true }, // Unique asegura que no haya emails duplicados
    password: { type: String, required: true }
});

// Crear y exportar el modelo de usuario
const UserModel = mongoose.model('User', userSchema);

export default UserModel;
