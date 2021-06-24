import adminRepository from "../adminRepository";

const resource = "/admin";
export default {

  /*METHOD OF ADMIN*/
  /* METHOD POST */
  // Post Login
  postAdminLogin(payload) {
    return adminRepository.post(`${resource}/login`, {
      username: payload.username,
      password: payload.password,
    });
  },

  // Create Admin
  createAdmin(payload) {
    return adminRepository.post(`${resource}`, {
      avatar: payload.avatar,
      name: payload.name,
      userName: payload.userName,
      email: payload.email,
      password: payload.password,
    });
  },

  // Create User
  createUser(payload) {
    return adminRepository.post(`user`, {
      avatar: payload.avatar,
      firstName: payload.firstName,
      lastName: payload.lasetName,
      userName: payload.userName,
      email: payload.email,
      password: payload.password,
      address: payload.address,
      phone: payload.phone,
    });
  },

  // Search Admin
  searchAdmin(payload) {
    return adminRepository.post(`${resource}/search`, {
        word: payload.word,
    });
  },

  // Search user
  searchCategory(payload) {
    return adminRepository.post(`user/search`, {
        word: payload.word,
    });
  },

  /* METHOD GET */
  // Get action logout of admin
  getLogoutAdmin() {
    return adminRepository.get(`${resource}/logout`);
  },

  // Check User
  getUserCurrent() {
    return adminRepository.get(`${resource}/me`);
  },

  // Get list admin
  getAdminList(numberAdminPerPage) {
    return adminRepository.get(`${resource}/?perPage=${numberAdminPerPage}`);
  },

  // Get list user
  getUserList(numberUserPerPage) {
    return adminRepository.get(`${resource}/?perPage=${numberUserPerPage}`);
  },

  // Get Admin
  getAdmin(adminId) {
      return adminRepository.get(`${resource}/${adminId}`);
  },

  // Get User by Id 
  getUser(userId) {
      return adminRepository.get(`user/${userId}`);
  },

  /* METHOD PATCH */
  // Update Admin
  updateAdmin(adminId, payload) {
      return adminRepository.patch(`${resource}/${adminId}`, {
        avatar: payload.avatar,
        name: payload.name,
        username: payload.username,
        email: payload.email,
        password: payload.password,
      });
  },

  // Update User
  updateUser(userId, payload) {
    return adminRepository.patch(`user/${userId}`, {
        avatar: payload.avatar,
        firstName: payload.firstName,
        lastName: payload.lasetName,
        userName: payload.userName,
        email: payload.email,
        password: payload.password,
        address: payload.address,
        phone: payload.phone,
      });
  },

  /* METHOD DELETE */
  // Delete Admin  
  deleteAdmin(adminId) {
    return adminRepository.delete(`${resource}/${adminId}`);
  },

  // Delete Admin  
  deleteUser(userId) {
    return adminRepository.delete(`user/${userId}`);
  },
};
