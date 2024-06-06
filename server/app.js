const express = require('express');
const app = express();
const port = 3000; 
app.get('/', (req, res) => {
  res.send('/home index');
});


app.post('/fetch-post', (req, res) => {
    const requestData = req.body;

    const responseString = JSON.stringify(requestData);

    res.send(responseString);
});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
