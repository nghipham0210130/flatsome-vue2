import adminRepository from "../adminRepository";

export default {
    
  /*METHOD OF ADMIN*/
  /* METHOD POST */
  // Create Category
  // Input image, name, parent_id
  createCategory(payload) {
    return adminRepository.post(`category`, {
      image: payload.image,
      name: payload.name,
      parent_id: payload.parent_id,
    });
  },

  // Create Product
  // Input image[], name, description, price, quantites, categories[]
  createProduct(payload) {
    return adminRepository.post(`product`, {
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
    return adminRepository.post(`file/import`, {
      filePath: payload.filePath,
    });
  },

  // Search category
  searchCategory(payload) {
    return adminRepository.post(`category/search`, {
      word: payload.word,
    });
  },

  // Search product
  searchProduct(payload) {
    return adminRepository.post(`product/search`, {
      word: payload.word,
    });
  },

  // Search bill
  searchBill(payload) {
    return adminRepository.post(`bill/search`, {
      word: payload.word,
    });
  },

  /* METHOD GET */
  // Get Categories
  showCategories(numberCategoryPerPage) {
    return adminRepository.get(
      `category?perPage=${numberCategoryPerPage}&with=subCategory`
    );
  },

  // Get Products
  showProducts(numberProductPerPage) {
    return adminRepository.get(
      `product?perPage=${numberProductPerPage}&with=categories,productImages`
    );
  },

  // Get Bills
  showBills(numberBillPerPage) {
    return adminRepository.get(`bill?perPage=${numberBillPerPage}`);
  },

  // Get Category
  getCategory(categoryId) {
    return adminRepository.get(`category/${categoryId}`);
  },

  // Get Product
  getProduct(productId) {
    return adminRepository.get(`product/${productId}`);
  },

  // Get Bill
  getBill(billId) {
    return adminRepository.get(`bill/${billId}`);
  },

  // Export Bill csv
  exportBillCsv(fileName) {
    return adminRepository.get(`export?${fileName}=test.csv`);
  },

  // Get statistic Bill top 10 product
  getBillTopTenProduct() {
    return adminRepository.get(`statistic`);
  },

  /* METHOD PATCH */
  // Update Category
  updateCategory(categoryId, payload) {
    return adminRepository.patch(`category/${categoryId}`, {
      image: payload.image,
      name: payload.name,
      parent_id: payload.parent_id,
    });
  },

  // Update Product (image[], name, description, price, quantities, categories[])
  updateProduct(productId, payload) {
    return adminRepository.patch(`product/${productId}`, payload);
  },

  // Update Bill
  updateBill(billId, payload) {
    return adminRepository.patch(`bill/${billId}`, {
      status: payload.status,
    });
  },

  /* METHOD DELETE */
  // Delete Category
  deleteCategory(categoryId) {
    return adminRepository.delete(`category/${categoryId}`);
  },

  // Delete Product
  deleteProduct(productId) {
    return adminRepository.delete(`product/${productId}`);
  },
}