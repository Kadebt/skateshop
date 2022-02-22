const bcrypt = require('bcryptjs')

module.exports = {
    login: async (req, res) => {
        const db = req.app.get('db')
        const { email, password } = req.body
    
        const existingUser = await db.check_users([email])
    
        if (!existingUser[0]) {
          return res.status(404).send('User does not exist')
        }
    
        const authenticated = bcrypt.compareSync(password, existingUser[0].hash)
    
        if (authenticated) {
          delete existingUser[0].password
    
          req.session.user = existingUser[0]
    
          res.status(200).send(req.session.user)
        } else {
          res.status(403).send('Email or password incorrect')
        }
        console.log(req.session.user)
      },
      register: async (req, res) => {
        const db = req.app.get('db')
        const {email, password, username} = req.body
        const checkUser = await db.check_users([email])
        
        if(checkUser[0]){
          return res.status(409).send('User already exists')
        }
        const points = 0
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)
    
        const newUser = await db.register_user([email, hash, username, points])
    
        req.session.user = newUser[0]
    
        res.status(200).send(req.session.user)
    
      },
      logout: (req, res) => {
        req.session.destroy()
        res.sendStatus(200)
      },
      checkUser: (req, res) => {
        if(req.session.user){
          res.status(200).send(req.session.user)
      }
    else{
      res.status(200).send(null)
    }
  }
    }