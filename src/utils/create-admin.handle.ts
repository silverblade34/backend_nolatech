import UserModel from "../models/user.model";

export const createAdminUserIfNeeded = async () => {
    try {
        const adminUser = await UserModel.findOne({ role: "admin" });

        if (!adminUser) {
            const newAdmin = new UserModel({
                username: "admin",
                password: "123456",
                role: "admin",
            });

            await newAdmin.save();
            console.log("Usuario admin se ha creado por defecto.");
        } else {
            console.log("El usuario admin ya existe.");
        }
    } catch (error) {
        console.error("Error al verificar o crear el usuario admin:", error);
    }
};
