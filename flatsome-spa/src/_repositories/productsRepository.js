import Repository from "./Repository";

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

  /* METHOD OF ADMIN */
  /* METHOD POST */
  // Create Category
  createCategory(payload) {
    return Repository.post(`category`, {
      image: payload.image,
      name: payload.name,
      parent_id: payload.parent_id,
    });
  },

  // Create Product
  createProduct(payload) {
    return Repository.post(`product`, {
      image: payload.image,
      name: payload.name,
      description: payload.description,
      price: payload.price,
      quantities: payload.quantities,
      categories: payload.categories,
    });
  },

  // Import csv Product
  importCsvProduct(payload) {
    return Repository.post(`file/import`, {
      filePath: payload.filePath,
    });
  },

  // Search category
  searchCategory(payload) {
    return Repository.post(`category/search`, {
      word: payload.word,
    });
  },

  // Search product
  searchProduct(payload) {
    return Repository.post(`product/search`, {
      word: payload.word,
    });
  },

  // Search bill
  searchBill(payload) {
    return Repository.post(`bill/search`, {
      word: payload.word,
    });
  },

  /* METHOD GET */
  // Get Categories
  showCategories(numberCategoryPerPage) {
    return Repository.get(
      `category?perPage=${numberCategoryPerPage}&with=subCategory`
    );
  },

  // Get Products
  showProducts(numberProductPerPage) {
    return Repository.get(
      `product?perPage=${numberProductPerPage}&with=categories,productImages`
    );
  },

  // Get Bills
  showBills(numberBillPerPage) {
    return Repository.get(`bill?perPage=${numberBillPerPage}`);
  },

  // Get Category
  getCategory(categoryId) {
    return Repository.get(`category/${categoryId}`);
  },

  // Get Product
  getProduct(productId) {
    return Repository.get(`product/${productId}`);
  },

  // Get Bill
  getBill(billId) {
    return Repository.get(`bill/${billId}`);
  },

  // Export Bill csv
  exportBillCsv(fileName) {
    return Repository.get(`export?${fileName}=test.csv`);
  },

  // Get statistic Bill top 10 product
  getBillTopTenProduct() {
    return Repository.get(`statistic`);
  },

  /* METHOD PATCH */
  // Update Category
  updateCategory(categoryId, payload) {
    return Repository.patch(`category/${categoryId}`, {
      image: payload.image,
      name: payload.name,
      parent_id: payload.parent_id,
    });
  },

  // Update Product (image[], name, description, price, quantities, categories[])
  updateProduct(productId, payload) {
    return Repository.patch(`product/${productId}`, payload);
  },

  // Update Bill
  updateBill(billId, payload) {
    return Repository.patch(`bill/${billId}`, {
      status: payload.status,
    });
  },

  /* METHOD DELETE */
  // Delete Category
  deleteCategory(categoryId) {
    return Repository.delete(`category/${categoryId}`);
  },

  // Delete Product
  deleteProduct(productId) {
    return Repository.delete(`product/${productId}`);
  },
};
