<template>
    <div class="app__sidebar">
        <nav class="sidebar__nav">
            <ul>
                <li><h4>Browse</h4></li>
                <li><router-link  to="/products/bags">Bags</router-link></li>
                <li><router-link  to="/products/bookings">Booking</router-link></li>
            </ul>
        </nav>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
.app__sidebar {
    display: block;
    float: left;
    .sidebar__nav {
        ul {
            li {
                display: block;
                font-size: 36px;
            }
        }
    }
}
    
</style>