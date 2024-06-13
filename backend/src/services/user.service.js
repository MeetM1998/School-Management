import User from "../models/User.model.js";

const create = async (data) => {
  try {
    const user = await User.create(data);
    return user;
  } catch (error) {
    console.log(error);
  }
};

const getOne = async (params) => {
  try {
    const user = await User.findOne({ ...params });
    return user;
  } catch (error) {
    throw new Error(`Error fetching user: ${error.message}`);
  }
};

const getById = async (userId, fieldsToExclude) => {
  try {
    let query = User.findById(userId);
    if (fieldsToExclude) {
      const fieldsArray = fieldsToExclude.split(" ");
      fieldsArray.forEach((field) => {
        query = query.select(`${field}`);
      });
    }
    const user = await query.exec();
    return user;
  } catch (error) {
    throw new Error(`Error fetching user by ID: ${error.message}`);
  }
};

const updateOne = async (userId, data, fieldsToExclude) => {
  try {
    let query = User.findByIdAndUpdate(userId, data, { new: true });
    if (fieldsToExclude) {
      const fieldsArray = fieldsToExclude.split(" ");
      fieldsArray.forEach((field) => {
        query = query.select(`${field}`);
      });
    }
    const user = await query.exec();
    return user;
  } catch (error) {
    throw new Error(`Error updating user: ${error.message}`);
  }
};

const getByRole = async (role) => {
  try {
    return await User.find({ role: role }).select(
      "-password -refreshToken -__v"
    );
  } catch (error) {
    throw new Error(`Error fetching users by role: ${error.message}`);
  }
};

export { create, getOne, getById, getByRole, updateOne };
