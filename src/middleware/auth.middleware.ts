import { Request, Response, NextFunction } from "express";
import { getUserData } from "../utils/jwt";
import { IReqUser } from "../utils/interfaces";
import response from "../utils/response";

export default (req:Request, res: Response, next: NextFunction) => {
    const authorization = req.headers.authorization;
    if(!authorization) {
        return response.unauthorized(res);
    }

    const [prefix, accessToken] = authorization.split(" ");
    // if (!(prefix==="BEARER" && accessToken)){
    //     return res.status(403).json({
    //         message: "unauthorized2",
    //         data: null
    //     });
    // }
    if (!(prefix==="Bearer")){
        return response.unauthorized(res);
    }
    if (!(accessToken)){
       return response.unauthorized(res);
    }

    const user = getUserData(accessToken);
    if (!user){
        return response.unauthorized(res);
    }

    (req as IReqUser).user = user;
    next();
};