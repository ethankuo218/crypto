import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import marketRoutes from './routes/market.js';
import lookOnChainRoutes from './routes/lookOnChain.js';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Swagger setup
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Crypto Market API',
    version: '1.0.0',
    description: 'API documentation for the Crypto Market backend.',
  },
  servers: [
    {
      url: process.env.CLOUD_RUN_URL || 'http://localhost:8080',
      description: process.env.NODE_ENV === 'production' ? 'Production server' : 'Local server',
    },
  ],
};

const swaggerOptions = {
  swaggerDefinition,
  apis: [join(__dirname, 'routes/*.js')],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Middleware
app.use(helmet());

// CORS configuration
const frontendURL = process.env.FRONTEND_URL;
const cloudRunURL = process.env.CLOUD_RUN_URL;
const allowedOrigins = [
  'http://localhost:3000', // Local development
  cloudRunURL,
  frontendURL,
].filter((url): url is string => Boolean(url)); // Type guard to remove undefined

const corsOptions = {
  origin: function (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void
  ) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200,
  exposedHeaders: ['Content-Length', 'X-Foo', 'X-Bar'],
  maxAge: 86400, // 24 hours
};
app.use(cors(corsOptions));

app.use(express.json());

// Routes
app.use('/api/market', marketRoutes);
app.use('/api/lookonchain', lookOnChainRoutes);

// Basic health check route
app.get('/', (req, res) => {
  res.json({ status: 'ok' });
});

// Start the server in both development and production
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`API server listening at http://localhost:${port}`);
  console.log(`Swagger docs available at http://localhost:${port}/docs`);
});

export default app;
