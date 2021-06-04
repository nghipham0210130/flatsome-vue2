<template>
    <div class="order-list">
        <h2 class="order-list__title">Order List</h2>
        <div class="order-list__item title">
            <p>ID</p>
            <p>Date Delivery</p>
            <p>Description</p>
            <p>Price</p>
            <p>Delivery status</p>
        </div>
        <div class="order-list__item">
            <p class="item__id">23</p>
            <p class="item__date-delivery-expected">03/02/2021</p>
            <p class="item__description">Pellentesque habitant morbi tristique senectus et netus et malesuada
            fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae,
            ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam
            egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleigend
            leo.</p>
            <p class="item__price">$300</p>
            <p class="item__delivery-status">Successful delivery</p>
        </div>
        <div class="order-list__item">
            <p class="item__id">23</p>
            <p class="item__date-delivery-expected">03/02/2021</p>
            <p class="item__description">Pellentesque habitant morbi tristique senectus et netus et malesuada
            fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae,
            ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam
            egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleigend
            leo.</p>
            <p class="item__price">$300</p>
            <p class="item__delivery-status">Successful delivery</p>
        </div>
        <div class="order-list__item">
            <p class="item__id">23</p>
            <p class="item__date-delivery-expected">03/02/2021</p>
            <p class="item__description">Pellentesque habitant morbi tristique senectus et netus et malesuada
            fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae,
            ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam
            egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleigend
            leo.</p>
            <p class="item__price">$300</p>
            <p class="item__delivery-status">Successful delivery</p>
        </div>
        <div class="order-list__item">
            <p class="item__id">23</p>
            <p class="item__date-delivery-expected">03/02/2021</p>
            <p class="item__description">Pellentesque habitant morbi tristique senectus et netus et malesuada
            fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae,
            ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam
            egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleigend
            leo.</p>
            <p class="item__price">$300</p>
            <p class="item__delivery-status">Successful delivery</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "OrderList",
        components: {
        },
    }
</script>

<style lang="scss" scoped>
.order-list {
    display: flex;
    flex-wrap: wrap;
    padding-top: 176px;
    font-size: 1.4em; 
    h2 {
        color: rgb(16, 46, 143);
        margin-bottom: 36px;
    }
    .order-list__item {
        border: 1px solid rgb(131, 131, 131);
        padding-left: 15px;
        padding-right: 15px;
        width: 100%;
        height: 82px;
        display: grid;
        grid-template-columns: 10% 10% 52% 10% 10%;
        column-gap: 2%;
        &.title {
            font-weight: bold;
            color: rgb(0,117,232);
        }
        p {
            margin: auto 0;
        }
        .item__id {
            color: rgb(0,117,232);
        }
    }
    .order-list__item:not(:last-child) {
        border-bottom: none;
    }
}
</style>