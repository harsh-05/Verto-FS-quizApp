
import { PrismaClient } from "@prisma/client";
import express from "express";


const app = express();

const prisma = new PrismaClient();

const port = process.env.PORT || 3000;

app.get("/quizes", async (req, res) => {
     
})

app.listen(port, () => {
    console.log(`App is listening in port ${port}`)
})
