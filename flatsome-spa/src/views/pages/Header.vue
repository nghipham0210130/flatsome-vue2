<template>
  <header>
    <div class="header">
      <div class="header__logo">
        <img src="../../assets/img/logo-light.png" alt="Logo" />
      </div>
      <nav>
        <input class="menu__btn" type="checkbox" id="menu__btn" />
        <label class="menu__icon" for="menu__btn"
          ><span class="navicon"></span
        ></label>
        <ul class="menu">
          <li class="nav__account"><a href="/">Login</a></li>
          <li class="nav__card"><a href="/">Card/$0,00</a><span>0</span></li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: "appHeader",
};
</script>

<style lang="scss" scoped>
template {
  font-size: 62.5%;
}
header {
  position: fixed;
  width: 100%;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 86px;
    padding-left: 15px;
    padding-right: 15px;
    background-color: rgb(13, 13, 13);
    .header__logo {
      display: block;
      float: left;
      img {
        width: 197px;
        color: #ffff;
      }
      @media only screen and (max-width: 900px) {
        float: center;
      }
    }
    nav {
      .menu__btn {
        display: none;
        &:hover {
          @media only screen and (max-width: 900px) {
            background-color: #f4f4f4;
            cursor: pointer;
          }
        }
        &:checked {
          .menu {
            @media only screen and (max-width: 900px) {
              max-height: 240px;
            }
          }
          .menu-icon {
            .navicon {
              @media only screen and (max-width: 900px) {
                background: transparent;
              }
              &:before {
                @media only screen and (max-width: 900px) {
                  transform: rotate(-45deg);
                }
              }
              &:after {
                @media only screen and (max-width: 900px) {
                  transform: rotate(45deg);
                }
              }
            }
          }
        }
      }
      .menu__icon {
        display: none;
        @media only screen and (max-width: 900px) {
          display: inline-block;
          float: right;
          cursor: pointer;
          padding: 28px 20px;
          position: relative;
          user-select: none;
        }
        .navicon {
          @media only screen and (max-width: 900px) {
            background: #333;
            display: block;
            height: 2px;
            position: relative;
            transition: background 0.2s ease-out;
            width: 18px;
          }
          &::before,
          &::after {
            @media only screen and (max-width: 900px) {
              background: #333;
              content: "";
              display: block;
              height: 100%;
              position: absolute;
              transition: all 0.2s ease-out;
              width: 100%;
            }
          }
          &::before {
            @media only screen and (max-width: 900px) {
              top: 5px;
            }
          }
          &::after {
            @media only screen and (max-width: 900px) {
              top: -5px;
            }
          }
        }
      }
      ul {
        @media only screen and (max-width: 900px) {
          margin: 0;
          padding: 0;
          list-style: none;
          overflow: hidden;
        }

        .menu {
          //   clear: none;
          //   float: right;
          //   max-height: none;
          @media only screen and (max-width: 900px) {
            clear: both;
            max-height: 0;
            transition: max-height 0.2s ease-out;
          }

          li {
            padding: 0 15px;
            display: inline-block;
            &.nav__card {
              position: relative;
              a {
                border-left: 1px solid rgba(37, 37, 37);
              }
              span {
                color: #ffff;
                font-weight: bold;
                border-radius: 0;
                margin: 0.4em 0;
                border: 2px solid #fff;
                position: relative;
                display: inline-block;
                vertical-align: middle;
                text-align: center;
                width: 1.85em;
                height: 1.85em;
                font-size: 1.3em;
                line-height: 1.9em;

                &::after {
                  content: "";
                  top: -0.6em;
                  margin-bottom: 0;
                  height: 4px;
                  width: 10px;
                  left: 5px;
                  position: absolute;
                  pointer-events: none;
                  border: 2px solid #fff;
                  border-top-left-radius: 99px;
                  border-top-right-radius: 99px;
                  border-bottom: 0;
                }
              }
            }
            a {
              color: #ffff;
              text-decoration: none;
              font-size: 1.3em;
              text-transform: uppercase;
              font-weight: bold;
              display: block;
              padding: 20px 20px;
              &:hover {
                @media only screen and (max-width: 900px) {
                background-color: #f4f4f4;
                }
              }
              @media only screen and (max-width: 900px) {
                display: block;
                padding: 20px 20px;
                border-right: 1px solid #f4f4f4;
                text-decoration: none;
              }
            }
            img {
              width: 28px;
            }
          }
        }
      }
    }
  }
}
</style>
