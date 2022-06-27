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
    const { password, email } = req.body;

    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    console.log(salt)
    console.log(hashedPassword)

    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            })
        }
        //Validate if user already exists
        const user = users.find((user) => {
            return user.email === email
        })
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
 
        if (user) {
            res.status(400).json({
                "errors": [
                    {
                        "msg": "This user already exists",
                        accessToken: accessToken

                    }
                ]
            })
            return;
        }

        users.push({ password, email })

        console.log(hashedPassword, email);
        res.send('Validation has passed')
    } catch (error) {
        console.log(error);
    }


})

app.post('/api/login', async (req, res) => {
    const user = req.body
    
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (token === null) return res.sendStatus(401);
    
        try {
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            next()
        } catch (err) {
            console.log(err);
            if (err) return res.sendStatus(403)
            req.user = user
            next()
        }
        res.status(201).json({"errors": [
            {
                "msg": "You have logged in",
                token: token
            }
        ]})
})
