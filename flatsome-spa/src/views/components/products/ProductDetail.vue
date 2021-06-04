<template>
  <main class="product-detail">
    <div class="product-detail__image">
      <div class="image__main">
        <img src="../../../assets/img/products/T_7_front.jpeg" alt="" />
        <span class="icon">
          <font-awesome-icon icon="expand-alt" />
        </span>
      </div>
      <div class="image__option">
        <div class="option__front">
          <img src="../../../assets/img/products/T_7_front.jpeg" alt="" />
        </div>
        <div class="option__back">
          <img src="../../../assets/img/products/T_7_back.jpg" alt="" />
        </div>
      </div>
    </div>
    <div class="product-detail__infomation">
      <div class="information__link">
        <h5>HOME / SHOP/ CLOTHING / HOODIES</h5>
        <div class="link__transform">
          <span class="arrow left"></span>
          <span class="arrow right"></span>
        </div>
      </div>
      <h3 class="infomation__title">Happy Ninja</h3>
      <h3 class="infomation__price">$35,00</h3>
      <p class="infomation__detail">
        Pellentesque habitant morbi tristique senectus et netus et malesuada
        fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae,
        ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam
        egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleigend
        leo.
      </p>
      <div class="information__cart">
        <div class="quantity">
          <span class="minus">-</span>
          <input type="text" value="1" inputmode="numberic" />
          <span class="plus">+</span>
        </div>
        <button class="btn btn__add-to-cart">Add to cart</button>
      </div>
      <p class="infomation__category">
        Categories: <span>Clothing, Hoodies</span>
      </p>
    </div>
  </main>
</template>

<script>
export default {
  name: "ProductDetail",
  components: {
  },
  mounted() {
    this.$nextTick(function () {
      document.document.getElementsByClassName("minus")[0].click(function () {
        var input = this.parent().find(".input");
        var count = parseInt(input.val()) - 1;
        count = count < 1 ? 1 : count;
        input.val(count);
        input.change();
        return false;
      });
      document.getElementsByClassName("plus")[0].click(function () {
        var input = this.parent().find(".input");
        input.val(parseInt(input.val()) + 1);
        input.change();
        return false;
      });
    });
  },
};
</script>


<style lang="scss" scoped>
.product-detail {
  padding-top: 125px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 25px;
  img {
    width: 100%;
  }
  .product-detail__image {
    .image__main {
      position: relative;
      margin-bottom: 15px;
      .icon {
        width: 39px;
        height: 39px;
        color: rgb(192, 192, 192);
        position: absolute;
        left: 18px;
        bottom: 18px;
        border-radius: 50%;
        border: 2px solid rgb(192, 192, 192);
        svg {
          margin-left: 8px;
          margin-top: 7px;
          &.svg-inline--fa {
            &.fa-w-14 {
              font-size: 20px;
            }
          }
        }
        &:hover {
            cursor: pointer;
        }
      }
    }
    .image__option {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      column-gap: 20px;
      div:hover {
        cursor: pointer;
        border: 2px solid rgb(204, 204, 204);
      }
    }
  }
  .product-detail__infomation {
    .information__link {
      position: relative;
      color: rgb(148, 148, 148);
      h5 {
        font-size: 1.6em;
        text-transform: uppercase;
      }
      .link__transform {
        position: absolute;
        right: 10px;
        top: 0;
        span {
          position: relative;
          &.arrow {
            border: solid;
            border-width: 0 2px 2px 0;
            display: inline-block;
            padding: 3px;
            margin-left: 30px;
            &.left {
              transform: rotate(135deg);
              -webkit-transform: rotate(135deg);
            }
            &.right {
              transform: rotate(-45deg);
              -webkit-transform: rotate(-45deg);
            }
          }
        }
        &::after {
          content: "";
          width: 28px;
          height: 28px;
          position: absolute;
          border-radius: 50%;
          border: 2px solid rgb(192, 192, 192);
          left: 19px;
          top: -6px;
          
        }
        &::before {
          content: "";
          width: 28px;
          height: 28px;
          position: absolute;
          border-radius: 50%;
          border: 2px solid rgb(192, 192, 192);
          left: 59px;
          top: -6px;
        }
        &:hover {
            cursor: pointer;
        }
      }
    }
    h3 {
      &.infomation__title {
        text-transform: uppercase;
        font-weight: 600;
        color: rgb(119, 119, 119);
        line-height: 35px;
        position: relative;
        &::after {
          content: "";
          position: absolute;
          top: 31px;
          left: 0;
          width: 30px;
          border-bottom: 3px solid rgba(119, 119, 119, 0.5);
        }
      }
    }
    p {
      font-size: 1.4em;
      color: rgb(131, 131, 131);
      margin-bottom: 20px;
      width: 100%;
      &.infomation__category {
        padding-top: 6px;
        border-top: 1px dotted rgb(131, 131, 131);
        span {
          color: rgb(55, 76, 101);
        }
      }
    }
    .information__cart {
      display: flex;
      flex-direction: row;
      margin-bottom: 37px;
      .quantity {
        margin-right: 20px;
        span {
          cursor: pointer;
          &.minus,
          &.plus {
            width: 20px;
            height: 40px;
            background: #f2f2f2;
            padding: 8px 5px 8px 5px;
            border: 1px solid #ddd;
            display: inline-block;
            vertical-align: middle;
            text-align: center;
          }
        }

        input {
          height: 40px;
          width: 40px;
          text-align: center;
          font-size: 1.4em;
          border: 1px solid #ddd;
          display: inline-block;
          vertical-align: middle;
        }
      }
      .btn {
        color: #ffff;
        text-transform: uppercase;
        font-weight: bold;
        background-color: rgb(74, 216, 255);
        padding: 0.375rem 1.25rem;
        border-radius: 0;
        &:hover {
            opacity: 0.8;
        }
      }
    }
  }
}
</style>