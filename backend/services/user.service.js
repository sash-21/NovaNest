class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async getAllUsers(loggedInUserId) {
        const allUsers = await this.userRepository.getAllUsers(loggedInUserId);
        return allUsers
    }
}

module.exports = UserService;