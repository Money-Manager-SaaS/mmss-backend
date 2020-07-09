import {
    handleCors,
    handleBodyRequestParsing,
    handleCompression
} from "./common";

import { handleAPIDocs } from "./apiDocs";

// bodyparser in seperaed api router
export default [handleCors, handleCompression, handleAPIDocs];
