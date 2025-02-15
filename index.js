var express = require("express");
var bodyparser = require("body-parser");
var upload = require("express-fileupload");
var session = require("express-session");
var user_url = require("./routes/user_routes");
var admin_url = require("./routes/admin_routes");
var app = express();

app.use(bodyparser.urlencoded({ extended: true }));
app.use(upload());
app.use(express.static("public/"));
app.use(session({
    secret: "dfhashdhfn djfoa",
    resave: true,
    saveUninitialized: true,
}));

app.use("/", user_url);
app.use("/admin", admin_url);

// Use the environment's port or fallback to 1000 if not defined
const PORT = process.env.PORT || 1000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
