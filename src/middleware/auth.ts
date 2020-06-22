import { HTTP400Error } from "../utils/httpErrors";
import { Request, Response, NextFunction, Router } from "express";


export const checkAuth = (router: Router) => {
    router.use((req: Request, res: Response, next: NextFunction) => {
        if (req.path.indexOf("sigin") != -1 && req.path.indexOf("signup") != -1 && !req.cookies._id) {
            throw new HTTP400Error("Please login first!");
        } else {
            next();
        }
    });
};

export default [checkAuth];

