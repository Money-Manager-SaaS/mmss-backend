import {
    handleCors,
    handleBodyRequestParsing,
    handleCompression
} from "./common";


// bodyparser in seperaed api router
export default [handleCors, handleCompression];
