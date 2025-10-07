import { PrismaClient, UserRole } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    try {
        // Clear existing data in correct order (respecting foreign key constraints)
        await prisma.studentSelections.deleteMany()
        await prisma.correctOption.deleteMany()
        await prisma.questionOptions.deleteMany()
        await prisma.studentResult.deleteMany()
        await prisma.questions.deleteMany()
        await prisma.quiz.deleteMany()
        await prisma.user.deleteMany()

        // Create users
        const users = await prisma.user.createMany({
            data: [
                {
                    email: 'student1@school.edu',
                    name: 'Alice Johnson',
                    password: 'HASHEDPASSWORD1',
                    role: UserRole.student,
                },
                {
                    email: 'student2@school.edu',
                    name: 'Bob Smith',
                    password: 'HASHEDPASSWORD2',
                    role: UserRole.student,
                },
                {
                    email: 'admin@school.edu',
                    name: 'Admin User',
                    password: '$2b$10$EXAMPLEHASHEDPASSWORD3',
                    role: UserRole.admin,
                },
            ],
        })

        // Create quizzes
        const quizzes = await prisma.quiz.createMany({
            data: [
                {
                    quizDesc: 'Mathematics Fundamentals',
                    time_limit: 1800,
                },
                {
                    quizDesc: 'Science and Technology',
                    time_limit: 2700,
                },
                {
                    quizDesc: 'History and Geography',
                    time_limit: 3600,
                },
            ],
        })

        // Get created records for relationship mapping with proper null checks
        const createdUsers = await prisma.user.findMany({
            where: { role: UserRole.student }
        })

        const createdQuizzes = await prisma.quiz.findMany()

        if (createdUsers.length < 2) {
            throw new Error('Expected at least 2 students to be created')
        }

        if (createdQuizzes.length < 3) {
            throw new Error('Expected at least 3 quizzes to be created')
        }

        // Create questions for each quiz
        const questionsData = [
            // Mathematics Quiz Questions (Quiz 1)
            { quesdesc: 'What is 15 + 27?', quizid: createdQuizzes[0]!.id, quesScore: 5 },
            { quesdesc: 'Solve for x: 2x + 5 = 15', quizid: createdQuizzes[0]!.id, quesScore: 10 },
            { quesdesc: 'What is the area of a circle with radius 5?', quizid: createdQuizzes[0]!.id, quesScore: 10 },
            { quesdesc: 'Simplify: (3 + 7) × 2 - 4', quizid: createdQuizzes[0]!.id, quesScore: 10 },
            { quesdesc: 'What is 3/4 as a percentage?', quizid: createdQuizzes[0]!.id, quesScore: 5 },

            // Science Quiz Questions (Quiz 2)
            { quesdesc: 'What planet is known as the Red Planet?', quizid: createdQuizzes[1]!.id, quesScore: 5 },
            { quesdesc: 'What is H2O commonly known as?', quizid: createdQuizzes[1]!.id, quesScore: 5 },
            { quesdesc: 'What force keeps planets in orbit?', quizid: createdQuizzes[1]!.id, quesScore: 10 },
            { quesdesc: 'Which element has the atomic number 1?', quizid: createdQuizzes[1]!.id, quesScore: 5 },
            { quesdesc: 'What is the speed of light?', quizid: createdQuizzes[1]!.id, quesScore: 10 },

            // History Quiz Questions (Quiz 3)
            { quesdesc: 'In which year did World War II end?', quizid: createdQuizzes[2]!.id, quesScore: 5 },
            { quesdesc: 'Who was the first president of the United States?', quizid: createdQuizzes[2]!.id, quesScore: 5 },
            { quesdesc: 'What ancient civilization built the pyramids?', quizid: createdQuizzes[2]!.id, quesScore: 10 },
            { quesdesc: 'When did the Berlin Wall fall?', quizid: createdQuizzes[2]!.id, quesScore: 10 },
            { quesdesc: 'Which empire was ruled by Julius Caesar?', quizid: createdQuizzes[2]!.id, quesScore: 10 },
        ]

        const questions = await prisma.questions.createMany({
            data: questionsData
        })

        const createdQuestions = await prisma.questions.findMany({
            orderBy: { id: 'asc' }
        })

        if (createdQuestions.length < 15) {
            throw new Error('Expected 15 questions to be created')
        }

        // Create question options (4 options for each question)
        const questionOptionsData = [
            // Math Q1 options
            { optionDesc: '42', quesid: createdQuestions[0]!.id },
            { optionDesc: '32', quesid: createdQuestions[0]!.id },
            { optionDesc: '52', quesid: createdQuestions[0]!.id },
            { optionDesc: '37', quesid: createdQuestions[0]!.id },

            // Math Q2 options
            { optionDesc: 'x = 5', quesid: createdQuestions[1]!.id },
            { optionDesc: 'x = 10', quesid: createdQuestions[1]!.id },
            { optionDesc: 'x = 7.5', quesid: createdQuestions[1]!.id },
            { optionDesc: 'x = 8', quesid: createdQuestions[1]!.id },

            // Math Q3 options
            { optionDesc: '25π', quesid: createdQuestions[2]!.id },
            { optionDesc: '10π', quesid: createdQuestions[2]!.id },
            { optionDesc: '5π', quesid: createdQuestions[2]!.id },
            { optionDesc: '50π', quesid: createdQuestions[2]!.id },

            // Math Q4 options
            { optionDesc: '16', quesid: createdQuestions[3]!.id },
            { optionDesc: '18', quesid: createdQuestions[3]!.id },
            { optionDesc: '12', quesid: createdQuestions[3]!.id },
            { optionDesc: '20', quesid: createdQuestions[3]!.id },

            // Math Q5 options
            { optionDesc: '75%', quesid: createdQuestions[4]!.id },
            { optionDesc: '50%', quesid: createdQuestions[4]!.id },
            { optionDesc: '25%', quesid: createdQuestions[4]!.id },
            { optionDesc: '100%', quesid: createdQuestions[4]!.id },

            // Science Q1 options
            { optionDesc: 'Mars', quesid: createdQuestions[5]!.id },
            { optionDesc: 'Jupiter', quesid: createdQuestions[5]!.id },
            { optionDesc: 'Venus', quesid: createdQuestions[5]!.id },
            { optionDesc: 'Saturn', quesid: createdQuestions[5]!.id },

            // Science Q2 options
            { optionDesc: 'Water', quesid: createdQuestions[6]!.id },
            { optionDesc: 'Oxygen', quesid: createdQuestions[6]!.id },
            { optionDesc: 'Hydrogen', quesid: createdQuestions[6]!.id },
            { optionDesc: 'Salt', quesid: createdQuestions[6]!.id },

            // Science Q3 options
            { optionDesc: 'Gravity', quesid: createdQuestions[7]!.id },
            { optionDesc: 'Magnetism', quesid: createdQuestions[7]!.id },
            { optionDesc: 'Friction', quesid: createdQuestions[7]!.id },
            { optionDesc: 'Inertia', quesid: createdQuestions[7]!.id },

            // Science Q4 options
            { optionDesc: 'Hydrogen', quesid: createdQuestions[8]!.id },
            { optionDesc: 'Oxygen', quesid: createdQuestions[8]!.id },
            { optionDesc: 'Carbon', quesid: createdQuestions[8]!.id },
            { optionDesc: 'Helium', quesid: createdQuestions[8]!.id },

            // Science Q5 options
            { optionDesc: '299,792,458 m/s', quesid: createdQuestions[9]!.id },
            { optionDesc: '150,000,000 m/s', quesid: createdQuestions[9]!.id },
            { optionDesc: '500,000,000 m/s', quesid: createdQuestions[9]!.id },
            { optionDesc: '1,000,000,000 m/s', quesid: createdQuestions[9]!.id },

            // History Q1 options
            { optionDesc: '1945', quesid: createdQuestions[10]!.id },
            { optionDesc: '1939', quesid: createdQuestions[10]!.id },
            { optionDesc: '1918', quesid: createdQuestions[10]!.id },
            { optionDesc: '1950', quesid: createdQuestions[10]!.id },

            // History Q2 options
            { optionDesc: 'George Washington', quesid: createdQuestions[11]!.id },
            { optionDesc: 'Thomas Jefferson', quesid: createdQuestions[11]!.id },
            { optionDesc: 'Abraham Lincoln', quesid: createdQuestions[11]!.id },
            { optionDesc: 'John Adams', quesid: createdQuestions[11]!.id },

            // History Q3 options
            { optionDesc: 'Ancient Egyptians', quesid: createdQuestions[12]!.id },
            { optionDesc: 'Romans', quesid: createdQuestions[12]!.id },
            { optionDesc: 'Greeks', quesid: createdQuestions[12]!.id },
            { optionDesc: 'Mayans', quesid: createdQuestions[12]!.id },

            // History Q4 options
            { optionDesc: '1989', quesid: createdQuestions[13]!.id },
            { optionDesc: '1991', quesid: createdQuestions[13]!.id },
            { optionDesc: '1975', quesid: createdQuestions[13]!.id },
            { optionDesc: '1961', quesid: createdQuestions[13]!.id },

            // History Q5 options
            { optionDesc: 'Roman Empire', quesid: createdQuestions[14]!.id },
            { optionDesc: 'British Empire', quesid: createdQuestions[14]!.id },
            { optionDesc: 'Ottoman Empire', quesid: createdQuestions[14]!.id },
            { optionDesc: 'Mongol Empire', quesid: createdQuestions[14]!.id },
        ]

        const questionOptions = await prisma.questionOptions.createMany({
            data: questionOptionsData
        })

        const createdOptions = await prisma.questionOptions.findMany({
            orderBy: { id: 'asc' }
        })

        if (createdOptions.length < 60) {
            throw new Error('Expected 60 question options to be created')
        }

        // Create correctOptions using createMany
        const correctOptionsData = createdQuestions.map((question, index) => {
            const optionIndex = index * 4
            const correctOption = createdOptions[optionIndex]

            if (!correctOption) {
                throw new Error(`Correct option not found for question at index ${index}`)
            }

            return {
                questionid: question.id,
                correctOptionid: correctOption.id
            }
        })

        const correctOptions = await prisma.correctOption.createMany({
            data: correctOptionsData
        })

        // Create student results with safe array access
       

        console.log('Seeding completed successfully:')
        console.log(`- ${(await prisma.user.findMany()).length} users created`)
        console.log(`- ${(await prisma.quiz.findMany()).length} quizzes created`)
        console.log(`- ${(await prisma.questions.findMany()).length} questions created`)
        console.log(`- ${(await prisma.questionOptions.findMany()).length} question options created`)
        console.log(`- ${(await prisma.correctOption.findMany()).length} correct options created`)
        console.log(`- ${(await prisma.studentResult.findMany()).length} student results created`)

    } catch (error) {
        console.error('Error during seeding:', error)
        throw error
    }
}

main()
    .catch(async (e) => {
        console.error('Fatal seeding error:', e)
        await prisma.$disconnect()
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })