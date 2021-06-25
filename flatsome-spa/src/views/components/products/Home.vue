<template>
  <main class="home">
    <h2 class="home__title">Welcome To Home Page</h2>
    <div class="home__link">
      <router-link :to="{ name: 'shopLink' }"
        >Click here to go shopping
      </router-link>
    </div>
  </main>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
h2 {
  font-weight: 600;
  font-size: 5em;
  text-align: center;
  text-transform: uppercase;
  color: rgb(12, 32, 97);
}
div {
  text-align: center;

  .home__link {
    font-size: 2em;
    font-weight: 600;
    text-transform: uppercase;
    a {
        color: rgb(231, 61, 18);
        &:hover{
            color: rgb(27, 14, 218);
        }
    }
  }
}
</style>