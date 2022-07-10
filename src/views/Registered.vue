<template>
  <div class="registration-view">
    <div class="registration-view--box">
      <h3>Good job {{store.user.name}}!</h3>
      <p>We have sent you an email to <span>{{store.user.email}}</span>. <br>
        Make sure to click the link from the message to activate your account. </p>
      <router-link to="/" class="btn">Go to homepage</router-link>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '../store/user'
const store = useUserStore();
</script>

<style lang="scss" scoped>
.registration-view{
  display: flex;
  justify-content: center;
  &--box{
    margin-top: 338px;
    display: flex;
    flex-direction: column;
    align-items: center;
    h3{
      font-family: 'Eczar';
      font-style: normal;
      font-weight: 600;
      font-size: 80px;
      line-height: 82px;
      margin-bottom: 48px;
      letter-spacing: -0.01em;
      color: #343541;
      text-align: center;
    }
    p{
      font-family: 'Roboto';
      font-style: normal;
      font-weight: 400;
      font-size: 18px;
      line-height: 21px;
      text-align: center;
      color: #292A33;
      margin-bottom: 48px;
      span{
        font-weight: bold;
      }
    }
    .btn{
      color: #FFFFFF;
      padding: 19px 64px;
      background: #EC1115;
      border-radius: 64px;
      border: none;
      cursor: pointer;
      font-size: inherit;
      text-decoration: none;
      &:hover{
        background-color: #A60C0E;
      }
      &:active{
        border: 5px solid #F47073;
        padding: 14px 59px;
      }

    }
  }
}

@media (max-width: 768px) {
  .registration-view{
    padding: 0 24px;
    &--box{
      margin-top: 50px;
      h3{
        font-size: 40px;
        margin-bottom: 10px;
      }
      p{
        span{
        }
      }
      .btn{
        color: #FFFFFF;
        padding: 19px 64px;
        background: #EC1115;
        border-radius: 64px;
        border: none;
        cursor: pointer;
        font-size: inherit;
        text-decoration: none;
        &:hover{
          background-color: #A60C0E;
        }
        &:active{
          border: 5px solid #F47073;
          padding: 14px 59px;
        }

      }
    }
  }
}
@media (max-width: 375px) {
      .btn {
        width: 100%;
        text-align: center;
      }
}
</style>