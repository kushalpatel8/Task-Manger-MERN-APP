import { errorHandler } from "./error.js";
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;

    if (!token) {
        return next(errorHandler(401, "Unauthorized"));
    }

    jwt.verify(token, process.env.JWT_SECERT, (err, user) => { 
        if (err) {
            return next(errorHandler(401, "Unauthorized Token"));
        }
        req.user = user;
        next();
    });
};

export const adminOnly = (req, res, next) => {
    if (req.user && req.user.role === "admin") {
        return next();
    } else {
        return next(errorHandler(403, "Access Denied, admin only"));
    }
};
