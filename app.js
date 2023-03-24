import express from "express";
import fs from "fs/promises";
const port = 5000;
const app = express();

app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello I am Server");
});
let clientData = [];

app.post("/api/register", async (req, res) => {
  clientData = req.body;
  let read = await fs.readFile("./data.json", "utf-8");
  let dbData = JSON.parse(read);
  let find = dbData.find((x) => {
    return (
      x.username == clientData.username && x.password === clientData.password
    );
  });
  if (find) {
    console.log(clientData);
    res.send("User Already Registered");
  } else {
    dbData.push(clientData);
    await fs.writeFile("./data.json", JSON.stringify(dbData));
    res.send("User Registered Sucessfully");
  }
});
app.post("/api/login/", async (req, res) => {
  clientData = req.body;
  let read = await fs.readFile("./data.json", "utf-8");
  let dbData = JSON.parse(read);
  let find = dbData.find((x) => {
    return (
      x.username == clientData.username && x.password === clientData.password
    );
  });
  if (find) {
    console.log(clientData);
    res.send("User Found");
  } else {
    res.send("Invalid Credentials Found");
  }
});

app.listen(port, () => {
  console.log(`Server Listening at Port ${port}`);
});
