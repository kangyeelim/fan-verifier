const passport = require('passport');
const router = require('express').Router();

router.get("/auth/facebook", passport.authenticate("facebook"));

router.get("/auth/facebook/callback",
passport.authenticate("facebook", {
  successRedirect:"/",
  failureRedirect:"/fail"
}))

router.get("/fail", (req, res) => {
  console.log("Failed FB attempt");
  res.redirect("/login");
});

router.get("/", (req, res) => {
  console.log("Added FB user");
  res.redirect("/")
});

module.exports = router;
