module.exports = function (app, myDataBase, ensureAuthenticated) {
  app.route("/").get((req, res) => {
    res.render("index", {
      title: "Connected to Database",
      message: "Please login",
      showLogin: true,
      showRegistration: true,
      showSocialAuth: true,
    });
  });

  //Login route
  app.get("/profile", ensureAuthenticated, (req, res) => {
    res.render("profile", { username: req.user.username });
  });

  //Route to chat
  app.get("/chat", ensureAuthenticated, (req, res) => {
    res.render("chat", { user: req.user });
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
