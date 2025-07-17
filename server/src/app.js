
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const specs = require('../swagger');

const taskRoutes = require('./routes/taskRoutes');
const projectRoutes = require('./routes/projectRoutes');
const priorityRoutes = require('./routes/priorityRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const port = 3000;

app.set('trust proxy', 1); // Trust the first proxy

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);

app.use('/tasks', taskRoutes);
app.use('/projects', projectRoutes);
app.use('/priorities', priorityRoutes);

app.get('/swagger.json', (req, res) => {
  specs.servers = [{
    url: `${req.protocol}://${req.get('host')}`,
  }];
  res.json(specs);
});

app.use('/', swaggerUi.serve, swaggerUi.setup(null, {
  swaggerOptions: {
    url: '/swagger.json',
  },
}));

// Remove the old root route as Swagger will now serve it
// app.get('/', (req, res) => {
//   res.send('API läuft');
// });

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
