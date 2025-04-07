module.exports = function (app, myDataBase) {
  app.route("/").get((req, res) => {
    res.render("index", {
      title: "Connected to Database",
      message: "Please login",
      showLogin: true,
      showRegistration: true,
      showSocialAuth: true,
    });
  });

  // Logout route
  app.route("/logout").get((req, res) => {
    req.logout();
    res.redirect("/");
  });

  // Handle 404 error
  app.use((req, res, next) => {
    res.status(404).type("text").send("Not Found");
  });
};
