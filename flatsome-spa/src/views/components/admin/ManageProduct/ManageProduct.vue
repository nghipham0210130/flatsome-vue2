<template>
    <div class="manage__product">
        <div class="manage__product__nav">
            <button type="button" class="nav__add">Add Product</button>
            <button type="button" class="nav__manage">Manage Product</button>
        </div>
        <router-view></router-view>
        <div class="manage__product__content">
            <h4>Manage User</h4>
            <div class="title">
                <p>ID</p>
                <p>Name</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Description</p>
                <p>Action</p>
            </div>
            <div class="product__list" v-for="(product, index) in products" :key="index">
                <p class="product__index">{{index + 1}}</p>
                <p class="product__name">{{product.name}}</p>
                <p class="product__price">{{product.price}}</p>
                <p class="product__quantities">{{product.quantities}}</p>
                <p class="product__description">{{product.description}}</p>
                <div class="product__actions">
                    <router-link :to="{name: 'editProduct', params: { productId: product.id}}" class="actions__edit">Edit</router-link>
                    <a href="#" class="actions__delete">Delete</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions} from "vuex";
    export default {
        name: "manageProduct",
        data() {
            return{
                numberProductPerPage: 70,
                products: {},
            };
        },
        created() {
            this.getProduct();
        },
        mounted() {
            this.products = this.productsFromStore;
        },
        computed: {
            ...mapState("ADMIN", {
                productsFromStore: "products",
            })
        },
        methods: {
            ...mapActions("ADMIN", {
                getProductFromStore: "getProducts",
            }
            ),
            async getProduct() {
                await this.getProductFromStore(this.numberProductPerPage);
            },
        }
    }
</script>
<style lang="scss" scoped>
.manage__product {
    padding-top: 51px;
    height: 100vh;
    margin-left: 60px;
    .manage__product__nav{
        
    margin-bottom: 60px;
        button {
            font-size: 2em;
            background-color: rgb(68, 96, 132);
            color: rgb(251,251,251);
            padding: 10px 15px;
            &:not(:last-child) {
                margin-right: 30px;
            }
        }
    }
    .manage__product__content {
        font-size: 1.4em;
        h4 {
            margin-bottom: 60px;
            font-weight: 600;
        }
        .title {
            display: grid;
            grid-template-columns: 5% 20% 10% 10% 30% 25%;
            font-weight: 600;
            column-gap: 5px;
            text-align: center;
            background-color: rgb(68, 96, 132);
            border: 1px solid rgb(0, 0, 0);
        }
        .product__list {
            display: grid;
            grid-template-columns: 5% 20% 10% 10% 30% 25%;
            column-gap: 5px;
            border: 1px solid rgb(0,0,0);
            .product__index, .product__price, .product__quantities, .product__actions {
                text-align: center;
            }
            .product__actions {
                font-weight: 600;
                margin: auto auto;
                .actions__edit {
                    color:rgb(23, 92, 23);
                    margin-right: 2em;
                }
                .actions__delete {
                    color: rgb(196, 19, 19);
                }
            }
        }
    }
}
</style>