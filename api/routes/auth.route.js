import expresss from "express";
import { signIn, signUp } from "../controllers/auth.controller.js";


const route = expresss.Router();

route.post('/sign-up', signUp);
route.post('/sign-in', signIn);

export default route