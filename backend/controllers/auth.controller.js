async function signUp(req, res, next) {
    const { fullName, userName, password, confirmPassword, gender } = req.body;
    
}

async function logIn(req, res, next) {
    res.send('login called');
    console.log("logIn");
}

async function logOut(req, res, next) {
    res.send('logout called');
    console.log("logOut");
}

module.exports = {
    signUp,
    logIn,
    logOut
};