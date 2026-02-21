import app from './app';

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`LMS server is running on http://localhost:${PORT}`);
});