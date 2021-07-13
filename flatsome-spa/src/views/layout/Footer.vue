<template>
  <footer>
    <div class="contact">
      <ul class="contact__payment">
        <li class="contact__payment__item">
          <a class="item__link"
            ><font-awesome-icon class="icon" :icon="['fab', 'cc-visa']"
          /></a>
        </li>
        <li class="contact__payment__item">
          <a class="item__link"
            ><font-awesome-icon class="icon" :icon="['fab', 'cc-paypal']"
          /></a>
        </li>
        <li class="contact__payment__item">
          <a class="item__link"
            ><font-awesome-icon class="icon" :icon="['fab', 'cc-stripe']"
          /></a>
        </li>
        <li class="contact__payment__item">
          <a class="item__link"
            ><a class="item__link"
              ><font-awesome-icon
                class="icon"
                :icon="['fab', 'cc-mastercard']" /></a
          ></a>
        </li>
        <li class="contact__payment__item">
          <a class="item__link"
            ><font-awesome-icon class="icon" :icon="['fab', 'cc-discover']"
          /></a>
        </li>
      </ul>
      <ul class="contact__address">
        <li class="contact__address__item"><a class="item__link">about</a></li>
        <li class="contact__address__item">
          <a class="item__link">our stores</a>
        </li>
        <li class="contact__address__item"><a class="item__link">blog</a></li>
        <li class="contact__address__item">
          <a class="item__link">contact</a>
        </li>
        <li class="contact__address__item"><a class="item__link">faq</a></li>
      </ul>
      <p class="contact__copyright">Copyright 2021 © <span>UX Themes</span></p>
    </div>
  </footer>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
footer {
  background-color: rgb(0, 0, 0);
  margin: 0;
  display: fixed;
  width: 100%;
  z-index: 1;
  left: 0;
  bottom: 0;
  .contact {
    padding-top: 25px;
    padding-bottom: 5px;
    color: rgb(153, 153, 153);
    text-align: center;
    font-size: 1.8em;
    ul {
      list-style-type: none;
      overflow: hidden;
      margin-bottom: 15px;
      padding-left: 0;
      margin-top: 0;
      li {
        display: inline-block;
      }
      &.contact__payment {
        li {
          font-size: 2.8em;
          a {
            svg {
              path {
                color: rgb(153, 153, 153);
                background-color: rgb(41, 40, 40);
              }
            }
          }
          &:not(:last-child) {
            margin-right: 5px;
          }
        }
      }
      &.contact__address {
        text-transform: uppercase;
        color: rgb(138, 136, 136);
        li {
          &:not(:last-child) {
            margin-right: 7px;
          }
        }
      }
    }
    .contact__copyright {
      margin-bottom: 0;
      span {
        font-weight: 600;
      }
    }
  }
}
</style>