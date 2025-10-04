
import { PrismaClient } from "@prisma/client";
import express from "express";


const app = express();

const prisma = new PrismaClient();

const port = process.env.PORT || 3000;


app.use(express.json());

app.get("/quizes", async (req, res) => {
    const data = await prisma.quiz.findMany();

    res.status(201).json(data);
})

app.get("/quiz/:quizId", async (req, res) => {
    const quizId  = Number(req.params.quizId);

    const data = await prisma.questions.findUnique({
        where: {
            id: quizId
        },
        select: {
            id: true,
            quesdesc: true,
            quesScore: true,
            questionoptions: {
                select: {
                    id: true,
                    optionDesc: true,

                }
            }

        }
    });

    if (!data || data === null) {
        res.status(403).send("wrong quizId or data not found !");
        return;
    }

    res.status(200).json(data);
})

app.listen(port, () => {
    console.log(`App is listening in port ${port}`)
})
