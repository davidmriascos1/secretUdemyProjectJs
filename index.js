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
const password = "WabiSabi"

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

function passwordCheck (req, res, next) {
const password = req.body["password"]
if (password === "WabiSabi") {
    userAuthorized = true;
} 
    next();
} 

app.use(passwordCheck);

app.get("/", (req, res) => {
res.sendFile(__dirname + "/public/index.html");
});

app.post("/check", (req, res) => {
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