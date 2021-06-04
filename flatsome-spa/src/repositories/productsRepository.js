import Repository from './Repository';

const resource = "/public";

export default {
    // Get home page
    get() {
        return Repository.get(`${resource}`);
    },

    // Get Sidebar
    getSidebar() {
        return Repository.get(`${resource}/sidebar?with=subCategory`);
    },

    // Get product by category Id
    getProductsByCategory(productCategoryId, numberProductPerPage) {
        return Repository.get(`${resource}/category/${productCategoryId}?perPage=${numberProductPerPage}`);
    },
    
    // Get product detail
    getProduct(productId) {
        return Repository.get(`${resource}/${productId}?with=productImages,categories`);
    }
 }