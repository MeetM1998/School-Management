import mongoose from 'mongoose';
import bcrypt from "bcrypt";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        const User = mongoose.model('User');

        const existingAdmin = await User.findOne({ email: process.env.SUPER_ADMIN_USERNAME });
        if (existingAdmin) {
            console.log('Super admin already exists.');
            return;
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(process.env.SUPER_ADMIN_PASSWORD, salt);

        const newAdmin = new User({
            email: process.env.SUPER_ADMIN_USERNAME,
            password: hashedPassword,
            role: 'superAdmin',
            name: 'Super Admin',
            contact: 0,
            active: true
        });

        await newAdmin.save();
        console.log('Super admin created successfully.');
    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit(1);
    }
}

export { connectDB }
