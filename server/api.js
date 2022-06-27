module.exports = function (app, db) {

	app.get('/api/test', function (req, res) {
		res.json({
			name: 'hlomla'
		});
	});

    async function getUsers(firstname, lastname, username) {
		const users = {firstname, lastname, username}
		console.log(users)
		return users;
	}
    app.get('/api/signup', async (req, res) => {

        try {
            const user = await getUsers(firstname, lastname, username);
            const {firstname, lastname, username, hashPassword } = req.body;
            
            user = await db.manyOrNone('select * from users where firstname = $1 AND lastname = $2 AND username = $3 ', [firstname, lastname, username,]);
    
            if(user !== null) {
                throw Error('User exist')
            }
    
                // hashPassword using bcrypt
                const hashedPassword = await bcrypt.hash(req.body.hashPassword)
                console.log(hashedPassword + 'password has been hashed') 
        
                //insert my users to database
                await db.none(`insert into users(firstname,lastname,username,password) values ($1,$2,$3,$4)`, [firstname, lastname, username, hashPassword])
            
            res.json({
                        hashPassword:hashPassword,
                        status: 'success',
                
                    });
        } catch (error) {
            console.log(error);
                res.status(501).json({
                status: 'error',
                error: error.message
            })
        }
        });
        app.get('/api/login', async (req, res) => {

            const { firstname, lastname, username, hashPassword } = req.query;
            let allUser = await db.manyOrNone('select * from users');
            if (firstname && lastname && username) {
                allUser = await db.manyOrNone('select username from users where username = $1', [username]);
            }
            if (hashPassword) {
                allUser = await db.manyOrNone('select password from users where password = $1', [hashPassword])
            }
            if (firstname && lastname && username && hashPassword) {
                allUser = await db.manyOrNone('select * from users where firstname = $1 AND lastname = $2 AND username = $3 AND password = $4', [firstname, lastname, username, hashPassword])
            }
            console.log(user);
            res.json({
                data: allUser
            })
        });
    

}