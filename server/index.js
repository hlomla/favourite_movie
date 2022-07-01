require('dotenv').config()
const express = require('express');
const app = express();
const cors = require('cors')
// const nodemon = require('nodemon')

const PgPromise = require("pg-promise")
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator')
const API = require('./api');

const initOptions = {/* initialization options */};
const pgp = PgPromise(initOptions);

const PORT = process.env.PORT || 4090;

const DATABASE_URL = process.env.DATABASE_URL || "postgres://favourite:movies123@localhost:5432/movie_fav";
const config = { 
    connectionString : DATABASE_URL
}

if (process.env.NODE_ENV == 'production') {
    	config.ssl = { 
            rejectUnauthorized : false
    	}
    }
    
    const db = pgp(config);
    
    API(app, db);
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cors());

const users = [
    {
        firstname: "Hlomla",
        lastname: "Tapuko",
        email: "hlomla.tapuko@gmail.com",
        password: 'paSSwo$d12'
    }
]

app.post('/api/signup', [
    check('email', 'Please enter a valid email address').isEmail(),
    check('password', 'Please enter a strong password that has a symbol, numerics and uppercase letters').isStrongPassword({
        min: 6,
        max: 10,
        lowercase: 2,
        uppercase: 2,
        numeric: 2,
        symbol: 2
    })
], async (req, res) => {
    
    try {
        const { firstname, lastname, email, password } = req.body;
        console.log(req.body);
        const salt = await bcrypt.genSalt(10)
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            })
        }
        const oneUser = await db.oneOrNone('select * from user_list where email = $1', [email]);
        if(oneUser){
            res.status(400).json({
                "errors": [
                    {
                        "msg": "This user already exists!"

                    }
                ]
            })
        }
        if(oneUser !== null) {
            throw Error('User exist')
        }
        const hashedPassword = await bcrypt.hash(password, salt)
        console.log(hashedPassword);

        await db.none(`insert into user_list(firstname,lastname,email,password) values ($1,$2,$3,$4)`, [firstname, lastname, email, hashedPassword])

        const accessToken = jwt.sign({email}, process.env.ACCESS_TOKEN_SECRET)
        // console.log(accessToken);
        if (email) {
            console.log(email + 'email');
            res.json({
                "success": [
                    {
                        message: 'You have been registered!',
                        accessToken: accessToken

                    }
                ]
            })
            return;
        }

        res.send('Validation has passed')
        console.log('Validation passed');
    } catch (error) {
        console.log(error);
    }


})

app.post('/api/login', async (req, res) => {
    
    try {
        const {email, password} = req.body
        

        const allUser = await db.oneOrNone('select * from user_list where email = $1 ', [email]);
        console.log(allUser);
        
        if (!allUser) {
            throw Error('User does not exist')
        }
            
        const correct = await bcrypt.compare( password , allUser.password);
        console.log(correct);
        if (!correct) {
            throw Error('You have logged in')
        }
              
                    res.status(200).json({
                        message: 'You have been logged in',
                        data: allUser
                    })
                
            
        }
    
    catch (error) {
        console.log(error.message);
        res.json(error)
    }
})

app.listen(PORT, async function () {
    console.log(`App started on port ${PORT}`)
});