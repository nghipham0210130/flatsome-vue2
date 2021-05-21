<template>
    <div class="main">
        <product-category></product-category>
    </div>
</template>

<script>
import ProductCategory from '../components/ProductCategory.vue'
    export default {
        name: "Main",
        components: {
            ProductCategory,
        },
    }
</script>

<style lang="scss" scoped>
    .main {
        padding-top: 176px;
        box-sizing: border-box;
        width: calc(100% - 300px);
        margin-left: 300px;
        position: relative;
    }
</style>