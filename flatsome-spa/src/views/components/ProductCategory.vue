<template>
    <div class="product__category">
        <div class="product__category__item" v-for="item in rootCategories" :key="item.idRootCategory">
            <img :src="getUrlImageCategory(item.idRootCategory)" alt="Category">
        </div> 
    </div>
</template>

<script>
import { rootCategories } from "../../data/Product";
export default {
    data() {
        return {
        rootCategories,
    };
  },
  methods: {
    // // analysis amount product follow input category
    // amountProductByColorID(category) {
    //   let amountProduct = 0;
    //   this.products.find(x => {
    //     if (x.idColor === idColor) {
    //       amountProduct = amountProduct + x.amountAvailable;
    //     }
    //   });
    //   return amountProduct;
    // },
    getUrlImageCategory: function(idRootCategory) {
        const tempUrlImage = this.rootCategories.find(x => x.idRootCategory === idRootCategory).urlImage;
        console.log(tempUrlImage);
        return tempUrlImage;
    }
  },
}
</script>

<style lang="scss" scoped>
.product__category {
    display: grid;
    grid-template-columns: repeat(3, calc((100% - 40px)/3));
    grid-template-rows: 1fr 1fr 1fr;
    gap: 20px;
    column-gap: 20px;
    .product__category__item {
        width: 100%;
    }
}
</style>