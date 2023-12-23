const express = require("express");
const homeController = require("./controllers/homeController");
const layouts = require("express-ejs-layouts");
const errorController = require("./controllers/errorController");

const app = express();
app.set("view engine", "ejs");
app.use(layouts);
app.use(express.static("public"));

app.set("port", process.env.PORT || 8080);
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//handling routes 
app.get("/", homeController.respondHome) //home page 
app.get("/about", homeController.respondAbout) //about page
app.get("/algorithm", homeController.respondAlgorithm) //algorithm page
app.get("/contact", homeController.respondContact) //contact page

//error handling
app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);

app.listen(app.get("port"), () => {
    console.log(`Server running at http://localhost:${app.get("port")}`);
});