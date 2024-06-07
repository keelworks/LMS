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

app.get('/checkjwt',authenticateToken, (req, res) => {
  res.json(posts.filter(post=>post.username === req.user.name))
})


const jwt = require('jsonwebtoken')
app.use(express.json())

app.post('/login', (req,res) => {
  const username = req.body.username
  const user = {name: username}
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)

  res.json({accessToken: accessToken})
})

app.post('/fetch-post', (req, res) => {
    const requestData = req.body;

    const responseString = JSON.stringify(requestData);

    res.send(responseString);
});

function authenticateToken(req,res,next){
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if(token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user)=>{
    if(err) return res.sendStatus(403)
    req.user = user
    next()
  })
}

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
