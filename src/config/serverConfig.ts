
import dotenv from "dotenv";
dotenv.config();

export const SERVER_CONFIG = {
    PORT: process.env.PORT || 3000,
    BASE_URL: process.env.BASE_URL || `http://localhost:${process.env.PORT || 3000}`,
};