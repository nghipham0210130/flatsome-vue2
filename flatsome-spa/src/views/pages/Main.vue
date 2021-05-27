<template>
    <div class="main">
        <router-view></router-view>
    </div>
</template>

<script>

    export default {
        name: "Main",
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