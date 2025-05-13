import express from 'express';
import cookieParser from 'cookie-parser';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cookieParser());

app.get('/api/hello', (req, res) => {
  res.cookie('myCookie', 'delicious', {
    httpOnly: true,
    sameSite: 'lax'
  });
  res.json({ message: 'Hello from Express with TypeScript!' });
});

app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));