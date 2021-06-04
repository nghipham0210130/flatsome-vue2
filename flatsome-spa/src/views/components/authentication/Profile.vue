<template>
  <main class="user__profile">
    <header class="header">
      <h3>
        <strong>My account</strong>
      </h3>
      <h5>Account details</h5>
    </header>
    <div class="sidebar">
      <div class="sidebar__content">
        <div class="user__title" style="background-image: url('../../../assets/img/avatar__empty.jpg')">
          <img class="user__avatar" src="../../../assets/img/avatar__empty.jpg" alt="Avatar empty">
          <p class="user__name">zenmatsu93 <span>#10963</span></p>
        </div>
        <div class="user__information">
          <div class="information__link">Dashboard</div>
          <div class="information__link">Order</div>
          <div class="information__link">Download</div>
          <div class="information__link">Address</div>
          <div class="information__link">Account details</div>
          <div class="information__link">Wishlist</div>
          <div class="information__link">Logout</div>
        </div>
      </div>
    </div>
    <div class="main">
      <form action="" class="user__update">
        <div class="first__name">
          <label for="fname">First name</label>
          <input type="text">
        </div>
      </form>
      <button>SAVE CHANGES</button>
    </div>
  </main>
</template>

<script>
export default {
  name: "Profile",
  components: {
  },
  computed: {
    // currentUser() {
    //   return this.$store.state.auth.user;
    // }
  },
  mounted() {
    // if (!this.currentUser) {
    //   this.$router.push('/login');
    // }
  },
};
</script>