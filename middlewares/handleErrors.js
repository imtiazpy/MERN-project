import { GeneralError } from "../utils/errors";

export const handleErrors = async (err, req, res, next) => {
    if (err instanceof GeneralError) {
        const errCode = err.getCode();
        return res.status(errCode).json({ name: err.name, message: err.message });
    }

    return res.status(500).json({
        name: "Internal Server Error", message: err.message
    });
}