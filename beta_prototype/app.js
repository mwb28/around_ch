require('dotenv').config();
const express = require('express');
const app = express();

const port = process.env.PORT || 5000;
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Willkommmen zu unserem Beta-Prototypen');
});

app.listen(port, () => {    
  console.log(`Server is running on port ${port}`);
});


