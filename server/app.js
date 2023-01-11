const express = require("express");
const { errorHandlers } = require("./middlewares");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;
const router = require("./routers");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use(router);
app.use(errorHandlers);

app.listen(port, console.log(`App listening on port ${port}`));
