const router = require('express').Router();

//import bcrypt
const bcrypt = require('bcryptjs');

//this allows us to look users up, and add them to the DB
const User = rquire('../users/users-model.js')

//extract the user object from the req.body
//hash the password with bcrypt and store the hash on the UO. 
//hash format = [verseion][cost][salt][hash]
router.post('/register', (req, res) => {
    const user = req.body;

    const hash = bcrypt.hashSync(user.password, 8);
    user.password = hash;

    Users.add(user)
    .then(saved => {
        res.status(201).json(saved);
    })
    .catch(err => {
        res.status(500).json(error)
    })

router.post('/login', (req, res) => {
    let {username, password} = req.body;
        Users.findBy({username})
            .first()
            .then(user => {
                if(user && bcrypt.compareSync(password, user.password)) {
                    req.session.user = username;
                    res.status(200).json({message: `Welcome ${user.name}!`, })
                } else {
                    res.status(401).json({message: 'invalid credentials'});
                }
            })
            .catch(err => {
                res.status(500)json(err);
            })
    })
})