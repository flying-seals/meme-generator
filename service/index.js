import express from "express";
import bodyParser from "body-parser";
import routes from "./src/api/routes.js";

const port = 3000;

const app = express();

app.use(bodyParser.json());
app.use(routes);

app.listen(port, () => console.log(`Server listening on :${port}`));
