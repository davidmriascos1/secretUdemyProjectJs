import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
// Since bodyParses is very used now you can written app.use(express.urlencoded ({extended: true })); and it also will work, and you wouldn't need install the npm i body-parser
app.use(bodyParser.urlencoded ({extended: true }));

app.get("/", (req, res) => {
res.sendFile(__dirname + "/public/index.html");
});
// Hold the password in a variable in order to use it later inside app.post 
let password = "WabiSabi"

app.post("/check", (req, res) => {
    const inputPassword = req.body["password"];
    if (inputPassword === password) {
         // If password matches, show secret page
res.sendFile(__dirname + "/public/secret.html");
    }
    else {
        // If password is incorrect, show an error message
        res.status(401).send("<h1>Unauthorized: Incorrect Password</h1>");
    }
});


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});



// using middleware option solution
/*import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

const userAuthorized = false;
// Since bodyParses is very used now you can written app.use(express.urlencoded ({extended: true })); and it also will work, and you wouldn't need install the npm i body-parser
app.use(express.urlencoded ({extended: true }));
//Here you are aiming to create your own middleware with a function needs to named it and write req, res, next (write next is important other wise is not going to pass to the next thing)
function passwordCheck (req, res, next) {
//Here you are setting the password to call it later to verify whatever was written in the req.body called "password" in the HTML file
const password = req.body["password"]
//Here the if statment is saying if whatever was written in the "name" HTML section as password is equal to the actual keywords convert the variable userAuthorized to true to let them in
if (password === "WabiSabi") {
    userAuthorized = true;
} 
//here you are saying please continue with the next thing
    next();
} 
// Here you are using the middleware you just build
app.use(passwordCheck);

app.get("/", (req, res) => {
res.sendFile(__dirname + "/public/index.html");
});

app.post("/check", (req, res) => {
    // Here your are saying if variable userAuthorized is true (just need to mention it) give them acess and send the file 
    if (userAuthorized) {
        res.sendFile(__dirname + "/public/secret.html");
    }
    else {
        res.sendFile(__dirname + "/public/index.html");
    }
});


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

*/
