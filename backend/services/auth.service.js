const bcrypt = require('bcryptjs');

const checkPassword = require("../validators/checkPassword.validator");
const BadRequestError = require("../errors/badRequest.error");
const encryptPassword = require("../utils/hashPassword");

class AuthService {
    constructor(authRepository) {
        this.authRepository = authRepository;
    }

    async signUpUser(userData) {
        const { fullName, userName, password, confirmPassword, gender } = userData;

        const checkValidPassword = checkPassword(password, confirmPassword); // Passing to validator
        
        if(!checkValidPassword) {
            throw new BadRequestError('confirmPassword', "Confirm password is not same as Password!"); // if not valid
        } 

        // taking 3rd party profile picture apis
        const boyProfilePic = 'https://avatar.iran.liara.run/public/boy?username=${userName}';
        const girlProfilePic = 'https://avatar.iran.liara.run/public/girl?username=${userName}';

        // Hashing the password
        const hashedPassword = await encryptPassword(password);

        // Forming the data for saving in repository
        const newUser = {};
        newUser.fullName = fullName;
        newUser.userName = userName;
        newUser.password = hashedPassword;
        newUser.gender = gender;
        newUser.profilePicture = (gender==="Male") ? boyProfilePic : girlProfilePic;

        const registeredData = await this.authRepository.signUpUser(newUser); // Passing to repository
        return registeredData;
    }

    async logInUser(userData) {
        const { password } = userData;

        // Taking data from the repository
        const user = await this.authRepository.logInUser(userData); 

        // Checking if the entered password and password from repository(decoded) match or not
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

        if(!isPasswordCorrect) {
            throw new BadRequestError("Username / Password", 'Username or Password is not Correct!');
        }

        // if password is correct the return the user data
        const logInUserData = {
            _id: user._id,
            fullName: user.fullName,
            userName: user.userName,
            profilePicture: user.profilePicture,
        };

        return logInUserData;
    }

    logOutUser() {
        const logOutUser = {
            success: true,
            message: "User logged out successfully"
        };

        return logOutUser;
    }
};

module.exports = AuthService;