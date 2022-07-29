import express from "express";
const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req,res) => {
    res.send("Hello World");
});

app.post("/student", (req,res) => {
    res.send("Hello from server");
});

app.listen(port,()=> {
    console.log(`connect at port ${port}`);
});