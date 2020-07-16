import { Request, Response } from 'express'
import logger from '../logger';

export const loggerMiddleware = (req: Request, resp: Response, next: () => void) => {
    logger.debug(['Request logged:', req.method, req.path]);
    next()
};
