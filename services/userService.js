import models from "../models";
import { BadRequest, NotFound } from "../utils/errors";


export const getAllUsers = async () => {
    const User = models.User;
    const users = await User.find();
    return users;
}

export const saveUser = async (user) => {
    const username = user.username;
    const User = models.User;
    const exist = await User.findOne({ username: username })
    if (!exist) {
        const model = new models.User({ username: username, createdAt: new Date() });
        const savedUser = await model.save();
        return savedUser;
    } else {
        throw new BadRequest(`User already exists with username: ${username}`)
    }
}


export const update = async (user) => {
    const id = user._id;
    const User = models.User;
    const model = await User.findById(id);
    if (model) {
        model.username = user.username;
        model.save()
        return model;
    }
    throw new NotFound(`User not found by the ID: ${id}`)
}


export const deleteById = async (id) => {
    const User = models.User;
    const model = await User.findById(id);
    if (model) {
        const result = await User.deleteOne({ _id: id });
        return result;
    } else {
        throw new NotFound(`User not found by the ID: ${id}`)
    }
}
