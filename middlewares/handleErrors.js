import { GeneralError } from "../utils/errors";

export const handleErrors = async (err, req, res, next) => {
    let errCode = 500;
    if (err instanceof GeneralError) {
        errCode = err.getCode();
    }
    let correlationId = req.headers['x-correlation-id']
    return res.status(errCode).json({
        correlationId: correlationId, message: err.message
    });
}