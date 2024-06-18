require('dotenv').config()

const express = require('express');
const app = express();
const port = 4000; 
app.get('/', (req, res) => {
  res.send('/home index');
});

// testing posts
const posts = [
  {
    username: 'Lin',
    title: 'post 1'
  },
  {
    username: 'Tom',
    title: 'post 2'
  }
]




const jwt = require('jsonwebtoken')
app.use(express.json())

app.post('/login', (req,res) => {
  const username = req.body.username
  const user = {name: username}
  const accessToken = generateAccessToken(user)
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
  refreshTokens.push(refreshToken)
  res.json({accessToken: accessToken, refreshToken: refreshToken})
})

let refreshTokens = []


app.post('/token', (req,res) => {
  const refreshToken = req.body.token
  if(refreshToken == null) return res.sendStatus(401)
  if(!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) =>{
      if(err) return res.sendStatus(403)
      const accessToken = generateAccessToken({name: user.name})
      res.json({accessToken : accessToken})
     
    })
})

app.post('/fetch-post', (req, res) => {
    const requestData = req.body;

    const responseString = JSON.stringify(requestData);

    res.send(responseString);
});


app.delete('/logout', (req, res) =>{
  refreshTokens = refreshTokens.filter(token => token !== req.body.token)
  res.sendStatus(204)
  
})


function generateAccessToken(user){
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn:'15s'})
}

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
