import app from './app';

const PORT = process.env.PORT || 8080; // changed from 5000 to 8080

app.listen(PORT, () => {
  console.log(`✅ SmartCampus API running on port ${PORT}`);
});
