import Repository from "../Repository";

const resource = "/public";
export default {
  // Post login (name input[email, password])
  postUserLogin(payload) {
    return Repository.post(`${resource}/login`, {
      username: payload.email,
      password: payload.password,
    });
  },

  // Post register (name input[email, password])
  postUserRegister(payload) {
    return Repository.post(`${resource}/register`, {
      email: payload.email,
      password: payload.password,
    });
  },

  // Get action logout of User
  getLogout() {
    return Repository.get(`${resource}/logout`);
  },

  // Get profile user currently
  getProfile() {
    return Repository.get(`${resource}/profile`);
  },

  // Update profile user currently (name input [firstname, lastname, username, email])
  updateProfileUser(payload) {
    return Repository.patch(`${resource}/profile`, payload);
  },

  // Update password user currently (name input [password, password_confirmation])
  updatePassword(payload) {
    return Repository.patch(`${resource}/profile/changepass`, payload);
  },

  // Update address user currently (name input [address, phone])
  updateAddress(payload) {
    return Repository.patch(`${resource}/profile/changeaddress`, payload);
  },

  /*METHOD OF ADMIN*/
  /* METHOD POST */
  // Post Login
  postAdminLogin(payload) {
    return Repository.post(`admin/login`, {
      username: payload.username,
      password: payload.password,
    });
  },

  // Create Admin
  createAdmin(payload) {
    return Repository.post(`admin`, {
      avatar: payload.avatar,
      name: payload.name,
      userName: payload.userName,
      email: payload.email,
      password: payload.password,
    });
  },

  // Create User
  createUser(payload) {
    return Repository.post(`user`, {
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
    return Repository.post(`admin/search`, {
        word: payload.word,
    });
  },

  // Search user
  searchCategory(payload) {
    return Repository.post(`user/search`, {
        word: payload.word,
    });
  },

  /* METHOD GET */
  // Get action logout of admin
  getLogoutAdmin() {
    return Repository.get(`admin/logout`);
  },

  // Check User
  getUserCurrent() {
    return Repository.get(`admin/me`);
  },

  // Get list admin
  getAdminList(numberAdminPerPage) {
    return Repository.get(`admin/?perPage=${numberAdminPerPage}`);
  },

  // Get list user
  getUserList(numberUserPerPage) {
    return Repository.get(`admin/?perPage=${numberUserPerPage}`);
  },

  // Get Admin
  getAdmin(adminId) {
      return Repository.get(`admin/${adminId}`);
  },

  // Get User by Id 
  getUser(userId) {
      return Repository.get(`user/${userId}`);
  },

  /* METHOD PATCH */
  // Update Admin
  updateAdmin(adminId, payload) {
      return Repository.patch(`admin/${adminId}`, {
        avatar: payload.avatar,
        name: payload.name,
        username: payload.username,
        email: payload.email,
        password: payload.password,
      });
  },

  // Update User
  updateUser(userId, payload) {
    return Repository.patch(`user/${userId}`, {
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
    return Repository.delete(`admin/${adminId}`);
  },

  // Delete Admin  
  deleteUser(userId) {
    return Repository.delete(`user/${userId}`);
  },
};
