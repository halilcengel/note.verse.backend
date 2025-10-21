import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import dotenv from 'dotenv';
import { errorHandler } from './middleware/errorHandler';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerOptions from './swagger';
import swaggerUi from 'swagger-ui-express';
import userRoutes from './routes/userRoutes';
import teacherRoutes from './routes/teacherRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

export const prisma = new PrismaClient();

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/users', userRoutes);
app.use('/api/teachers', teacherRoutes);

app.use('*', (req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Route not found',
  });
});

app.use(errorHandler);

process.on('SIGINT', async () => {
  console.log('Shutting down gracefully...');
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('Shutting down gracefully...');
  await prisma.$disconnect();
  process.exit(0);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});