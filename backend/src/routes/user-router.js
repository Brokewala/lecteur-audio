const router=require("express").Router();
const AuthController=require("../controllers/auth-controller");
const userController=require("../controllers/user-controller");
const audioController=require("../controllers/audios-controller");

// authatification
router.post("/signup",AuthController.signUp);
router.post("/login",AuthController.signIn);

// token
router.post("/refreshToken",AuthController.refreshToken);

// user api
router.get("/",userController.allUser);
router.get("/:id",userController.onlyUser);
router.delete("/:id",userController.deleteUser);
router.put("/propos/:id",userController.updateUser);
router.put("/img/:id",userController.updateImg);

// audios api
router.patch("/addMusic/:id",audioController.ajouteMusic);
router.patch("/deleteMusic/:id",audioController.deleteMusic);
router.put("/updateName/:id",audioController.updateMusicName);
router.put("/updateMusicImg/:id",audioController.updateMusicImg);

module.exports=router;