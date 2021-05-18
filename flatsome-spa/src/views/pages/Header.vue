<template>
  <header>
    <div class="header">
        <div class="header__logo">
            <img src="../../assets/img/brandi-logo.png" alt="Logo">
            <h3>Flatsome</h3>
        </div>
        <nav>
            <ul>
                <li><a href="/">My account</a></li>
                <li><a href="">Card/$0,00</a><img src="../../assets/img/brandi-logo.png" alt="Logo"></li>
            </ul>
        </nav>
    </div>
  </header>
</template>

<script>
export default {
    name: "appHeader"
};
</script>

<style lang="scss" scoped>
template {
    font-size: 62.5%;
}
header {
    .header {
        color: #ffff;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 86px;
        .header__logo {
            display: flex;
            img {
                width: 42px;
            }
            h3 { 
                text-transform: uppercase;
            }
        }
        nav {
            ul {
                li {
                 padding: 36px 15px 38px 15px;
                    display: inline-block;
                    a {
                        color: #ffff;
                        text-decoration: none;
                        font-size: 1.6em;
                    }
                    img {
                        width: 28px;
                    }
                }
            }
        }
    }
}
</style>
