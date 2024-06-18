const express = require('express')
const app = express()
const {users, ROLE} = require('./public/user_data')
const projectRouter = require('./routes/projects')
const {authUser, authRole}  = require('./SessionAuth/Auth')

app.use(express.json())
app.use(setUser)
app.use('/projects', projectRouter)

app.get('/', (req, res) =>{
    res.send('Home Page')
})

app.get('/dashboard', authUser, (req,res) =>{
    res.send('DashBoard Page')
})


app.get('/admin', authUser, authRole(ROLE.ADMIN), (req, res) => {
  res.send('Admin Page')
})

function setUser(req, res, next) {
    const userId = req.body.user
    if (userId) {
      req.user = users.find(user => user.id === userId)
      console.log('stiposdadsandonasd', req.user === null)
      if(req.user === undefined)
        {
          res.status(403)
          return res.send('Error user credential')
        }
    }
    
    next()
  }

module.exports = app;
