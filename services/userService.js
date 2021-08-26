import models from "../models";
import { BadRequest, NotFound } from "../utils/errors";

export const saveUser = async (user) => {
    const username = user.username;
    const User = models.User;
    const isExist = await User.findOne({ username: username })
    if (isExist) {
        return new BadRequest(`User already exists with username: ${username}`)
    } else {
        const model = new models.User({ username: user.username, createdAt: new Date() });
        const savedUser = await model.save();
        return savedUser;
    }

}

export const getAllUsers = async () => {
    const User = models.User;
    const users = await User.find();
    return users;
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
    return null;
}


export const deleteById = async (id) => {
    const User = models.User;
    const model = await User.findById(id);
    if (model) {
        const result = await User.deleteOne({ _id: id });
        return result;
    } else {
        return new NotFound(`User not found by the ID: ${id}`)
    }

}
