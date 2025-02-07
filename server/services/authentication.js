const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


//Called in our Login function. Receives typed in {username, password}, all the users from the db and res
//If it finds a user with that username and the checkPassword comes back true
// an accessToken for this session is created and stored in cookies as 'accessToken'
async function authenticateUser({ username, password }, users, res) {
    const user = users.find(u => {
        return u.username === username;
    });

    if (user && await checkPassword(password, user.password)) {
        const accessToken = jwt.sign({ id: user.id, name: user.name }, process.env.ACCESS_TOKEN_SECRET);
        res.cookie('accessToken', accessToken);
        res.json({ id: user.id, message: 'Login successful' });
    } else {
        res.status(401).json({ message: 'Username or password are incorrect' });
    }
}


//First hashes the password we entered and compares it to the hash stored as pw on our database
//returns true or false
async function checkPassword(password, hash){
    let pw = await bcrypt.compare(password, hash)
    return pw
}


//This is called in our users route and verifies the JWT sent with it, if there is one
//It verifies and decrypts the token and token payload and stores it inside the ongoing request under req.user
//If it can't be verified it will throw an error
function authenticateJWT(req, res, next){
    const token = req.cookies['accessToken']
    if(token) {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if(err){
                return res.sendStatus(403)
            }
            req.user = user
            next()
        })
    }else{
        res.sendStatus(401)
    }
}

//Called for our editUser function to verify if the current User is allowed to edit
//gets accessToken from cookies, decodes it using the secret and returns it
function getUserIdFromToken(req) {
    const token = req.cookies['accessToken'];
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            return decoded.id; // This is the user ID
        } catch (err) {
            console.error(err);
            return null;
        }
    } else {
        return null;
    }
}


module.exports = {
    authenticateUser,
    authenticateJWT,
    getUserIdFromToken
}
