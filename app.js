const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./routers/authRouter');
const userRouter = require('./routers/userRouter');
const authMiddleware = require('./middleware/authMiddleware');

const app = express();
const port = 3000;

mongoose.connect('mongodb+srv://theomanevit:VfZ48A6f96nId0d8@cluster.zf32nbg.mongodb.net/Project?retryWrites=true&w=majority');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erreur de connexion à la base de données :'));
db.once('open', () => {
  console.log('Connecté à la base de données');
});

app.use(express.json());
app.use('/auth', authRouter);
app.use('/users', authMiddleware.authenticateToken, userRouter);

app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
});
