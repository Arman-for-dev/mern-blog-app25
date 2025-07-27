import expresss from "express";
import { signUp } from "../controllers/auth.controller.js";


const route = expresss.Router();

route.post('/sign-up', signUp);

export default route