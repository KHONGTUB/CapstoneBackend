const express = require("express");
const app = express();
const parkRouter = require("./routes/parkRouter");
const userRouter = require("./routes/userRouter");
const cors = require("cors");

const PORT = 5001;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hey welcome to my server");
});

app.use("/parks", parkRouter);
app.use("/users", userRouter);

app.listen(PORT, () =>
  console.log(`I am listening on PORT: http://localhost:${PORT}`)
);
