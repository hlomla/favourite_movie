module.exports = function (app, db) {

	app.get('/api/test', function (req, res) {
		res.json({
			name: 'hlomla'
		});
	});

    // async function getUsers(firstname, lastname, email) {
	// 	const users = {firstname, lastname, email}
	// 	console.log(users)
	// 	return users;
	// }
    app.get('/api/signup', async (req, res) => {

        try {
            const {firstname, lastname, email, hashPassword } = req.body;
            const user = await db.manyOrNone('select * from users where firstname = $1 AND lastname = $2 AND email = $3 AND password = $4', [firstname, lastname, email, hashPassword]);
    
            if(user !== null) {
                throw Error('User exist')
            }
    
                // hashPassword using bcrypt
                // const salt = await bcrypt.genSalt()
                const hashedPassword = await bcrypt.hash(hashPassword, 10)
                console.log(hashedPassword + 'password has been hashed') 
        
                //insert my users to database
                await db.none(`insert into users(firstname,lastname,email,password) values ($1,$2,$3,$4)`, [firstname, lastname, email, hashedPassword])
                user.push({firstname, lastname, email, hashedPassword })
            res.json({
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

            try {
                
                const { firstname, lastname, email, hashPassword } = req.body;
                let allUser = await db.manyOrNone('select * from users');
                if (firstname && lastname && email) {
                    allUser = await db.manyOrNone('select email from users where email = $1', [email]);
                }
                //compare the hashedPassword
                allUser = await bcrypt.compare(hashPassword, allUser.hashPassword);
    
                if (hashPassword) {
                    allUser = await db.manyOrNone('select password from users where password = $1', [hashPassword])
                }
                if (firstname && lastname && email && hashPassword) {
                    allUser = await db.manyOrNone('select * from users where firstname = $1 AND lastname = $2 AND email = $3 AND password = $4', [firstname, lastname, email, hashPassword])
                }
    
                console.log(allUser);
                res.json({
                    data: allUser
                })
            } catch (error) {
                console.log(error.message, '-----------');
                res.json(error)
            }
        });
    

}