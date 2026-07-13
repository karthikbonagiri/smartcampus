import app from './app';

// ALWAYS use Railway's PORT variable, fallback to 8080
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`✅ SmartCampus API running on port ${PORT}`);
});
