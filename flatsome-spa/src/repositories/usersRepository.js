import Repository from './Repository';

const resource = "/public";

export default {

    // Get action logout
    getLogout() {
        return Repository.get(`${resource}/logout`);
    },

    // Get profile user currently
    getProfile() {
        return Repository.get(`${resource}/profile`);
    },

    // Post login (name input[email, password])
    postUserLogin(payload) {
        return Repository.post(`${resource}/login`, payload);
    },

    // Post register (name input[email, password])
    postUserRegister(payload) {
        return Repository.post(`${resource}/register`, payload);
    },

    // Update profile user currently (name input [firstnamem lastname, username, email])
    updateProfileUser(payload) {
        return Repository.put(`${resource}/profile`, payload); 
    },

    // Update password user currently (name input [password, password_confirmation])
    updatePassword(payload) {
        return Repository.put(`${resource}/profile/changepass`, payload);
    },
    
    // Update address user currently (name input [address, phone])
    updateAddress(payload) {
        return Repository.put(`${resource}/profile/changeaddress`, payload);
    },
 }