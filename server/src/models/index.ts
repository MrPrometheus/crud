import dbConfig from "../config/db.config"

import mongoose from "mongoose"
mongoose.Promise = global.Promise;

export default {
    mongoose,
    url: dbConfig.url,
};