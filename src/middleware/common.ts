import { Router } from "express";
import cors from "cors";
import parser from "body-parser";
import compression from "compression";

const whitelist = ['https://money-manager-saas.github.io', 'https://mm-cloud.dreamu.ink', 'http://localhost:3000']
const corsOptions = {
  optionsSuccessStatus: 200,
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

// const corsOptions = {
//     origin: 'http://github.io',
//     // origin: 'http://github.io', //
//     optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// };

export const handleCors = (router: Router) =>
//     router.use(cors({credentials: true, origin: true})); // allow all
    router.use(cors(corsOptions)); // allow the whitelist domain name only

export const handleBodyRequestParsing = (router: Router) => {
    router.use(parser.urlencoded({extended: true}));
    router.use(parser.json());
};

export const handleCompression = (router: Router) => {
    router.use(compression());
};
