import expresss from "express";
import { googleLogin, signIn, signUp } from "../controllers/auth.controller.js";


const route = expresss.Router();

route.post('/sign-up', signUp);
route.post('/sign-in', signIn);
route.post('/google', googleLogin)

export default route