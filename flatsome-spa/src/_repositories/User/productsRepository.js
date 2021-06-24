import Repository from "../Repository";

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

  // Get Product By Category
  getProductsByCategory(productCategoryId, numberProductPerPage) {
    return Repository.get(
      `${resource}/category/${productCategoryId}?perPage=${numberProductPerPage}`
    );
  },

  // Get product detail
  getProductDetail(productId) {
    return Repository.get(
      `${resource}/product/${productId}?with=productImages,categories`
    );
  },

};
