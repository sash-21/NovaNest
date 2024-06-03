class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async getAllUsers(loggedInUserId) {
        return await this.userRepository.getAllUsers(loggedInUserId);
    }
}

module.exports = UserService;