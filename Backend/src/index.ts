
import { PrismaClient } from "@prisma/client";
import express from "express";
import { getJwtSecret } from "./config.js";
import { authMiddleware } from "./middlewares/authMiddleware.js";
import jwt from 'jsonwebtoken';
import cors from 'cors'


export const JWT_Secret = getJwtSecret();

const app = express();

const prisma = new PrismaClient();

const port = process.env.PORT || 3000;

app.use(cors())

app.use(express.json());


app.post("/signIn", async (req, res) => {
    // we can use the Validation library like ZOD here for schema validation.
    const body = req.body;

    if (!body.email || !body.password) { 
        res.status(404).send("Bad Request");
        return;
    }

    const data = await prisma.user.findUnique({
        where: {
            email: body.email,
            password: body.password
        },
        select: {
            id: true,
            role: true
        }
    });

    if (data === null || !data) {
        res.status(403).send("user not found");
        return;
    }

    const token = jwt.sign({ UserId: data.id, UserRole: data.role }, JWT_Secret);

    res.json({token, userId: data.id });
    return;

})


// using Middleware to use these end-points only by the authorized persons..

app.get("/quizes", authMiddleware, async (req, res) => {
    const data = await prisma.quiz.findMany();

    res.status(201).json(data);
})

app.get("/quiz/:quizId", authMiddleware ,async (req, res) => {
    const quizId  = Number(req.params.quizId);

    const data = await prisma.quiz.findUnique({
        where: {
            id: quizId
        },
        

        select: {
            quizDesc: true,
            time_limit: true,
            questions: {
                select: {
                    id: true,
                    quesdesc: true,
                    quesScore: true,
                    questionoptions: {
                        select: {
                            id: true,
                            optionDesc: true,

                        }
                    },

                },
            }
        }

       
    });

    if (!data || data === null) {
        res.status(403).send("wrong quizId or data not found !");
        return;
    }

    res.status(200).json(data);
})


app.post("/result", authMiddleware, async (req, res) => {
    
})

app.listen(port, () => {
    console.log(`App is listening in port ${port}`)
})
