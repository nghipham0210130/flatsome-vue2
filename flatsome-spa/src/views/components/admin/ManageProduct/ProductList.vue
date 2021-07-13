<template>
  <div class="manage__product__list" :key="componentKey">
    <h4>Product List</h4>
    <div class="card__header">
      <p>ID</p>
      <p>Name</p>
      <p>Price</p>
      <p>Quantity</p>
      <p>Description</p>
      <p>Action</p>
    </div>
    <div
      class="card__body"
      v-for="(product, index) in pageOfItems "
      :key="index"
    >
      <p class="product__index">{{ product.id }}</p>
      <p class="product__name">{{ product.name }}</p>
      <p class="product__price">{{ product.price }}</p>
      <p class="product__quantities">{{ product.quantities }}</p>
      <p class="product__description">{{ product.description | abbreviate }}</p>
      <div class="product__actions">
        <router-link
          :to="{ name: 'editProduct', params: { productId: product.id } }"
          class="actions__edit"
          >Edit</router-link
        >
        <a href="#" class="actions__delete" @click="deleteProduct(product.id)"
          >Delete</a
        >
      </div>
    </div>
    <div class="cart__footer">
      <jw-pagination :items="products" @changePage="onChangePage" :styles="customStyles" :labels="customLabels"></jw-pagination>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

const customLabels = {
    first: '<<',
    last: '>>',
    previous: '<',
    next: '>'
};

const customStyles = {
    ul: {
        justifyContent: 'center'
    },
    li: {
        display: 'inline-block',
        border: '2px solid rgb(68, 96, 132)'
    },
    a: {
        color: 'rgb(68, 96, 132)'
    },
};

export default {
  data() {
    return {
      componentKey: 0,
      numberProductPerPage: 68,
      products: [],
      pageOfItems : [],
      customStyles,
      customLabels,
    };
  },
  async created() {
    await this.getProducts();
    this.products = this.productsFromStore;
  },
  computed: {
    ...mapState("ADMIN", {
      productsFromStore: "products",
    }),
  },
  mouted() {
    // console.log(this.productsFromStore.length);
  },
  filters: {
    abbreviate(text) {
      return text && text.slice(0, 50);
    },
  },
  methods: {

    ...mapActions("ADMIN", {
      getProductsFromStore: "getProducts",
      deleteProductFromStore: "deleteProduct",
    }),

    // Get products
    async getProducts() {
      await this.getProductsFromStore(this.productsFromStore.length);
    },

    // Delete Product by Id
    async deleteProduct(id) {
      await this.deleteProductFromStore(id);
      location.reload();
      this.componentKey++;
    },

    // Change page
    onChangePage(pageOfProducts) {
      /// update page of items
      this.pageOfItems  = pageOfProducts;
    }
  },
  async beforeRouteUpdate(to, from, next) {
    // Set products null to create new products (avoid new products push to current products)
    this.products = null;
    next();
  },
};
</script>

<style lang="scss" scoped>
.manage__product__list {
  font-size: 1.4em;
  h4 {
    font-size: 1.8em;
    font-weight: 600;
  }
  .card__header {
    display: grid;
    grid-template-columns: 5% 20% 10% 10% 30% 25%;
    font-weight: 600;
    column-gap: 5px;
    text-align: center;
    background-color: rgb(68, 96, 132);
    border: 1px solid rgb(0, 0, 0);
  }
  .card__body {
    display: grid;
    grid-template-columns: 5% 20% 10% 10% 30% 20%;
    column-gap: 1%;
    border: 1px solid rgb(0, 0, 0);
    .product__index,
    .product__price,
    .product__quantities,
    .product__actions {
      text-align: center;
    }
    .product__actions {
      font-weight: 600;
      margin: auto auto;
      @media only screen and (max-width: 900px) {
        display: flex;
        flex-direction: column;
      }
      .actions__edit {
        color: rgb(23, 92, 23);
        margin-right: 2em;
        @media only screen and (max-width: 900px) {
          margin-right: 0;
          margin-bottom: 1em;
        }
      }
      .actions__delete {
        color: rgb(196, 19, 19);
        @media only screen and (max-width: 900px) {
          margin-bottom: 0;
        }
      }
    }
    &:nth-of-type(2n) {
      background-color: rgb(211, 206, 206);
    }
    :last-child {
      margin-bottom: 30px;;
    }
  }
  .cart__footer {
    margin-top: 30px;
    text-align: center;
    @media only screen and (max-width: 900px) {
      bottom: 0;
    }
  }
}
</style>