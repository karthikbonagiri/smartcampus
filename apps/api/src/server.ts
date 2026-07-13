import app from './app';

// Hardcoded port – bypass env issues
const PORT = 8080;

app.listen(PORT, () => {
  console.log(`✅ SmartCampus API running on port ${PORT}`);
});
