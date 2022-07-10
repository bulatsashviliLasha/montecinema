<template>
  <main>
    <div class="main-text">
      <span>Ahoy you!</span>
      <span>Care to register?</span>
    </div>
    <div class="form-box">
      <form @submit.prevent="submitForm();handleSubmit()">
        <label>email</label>
        <input class="desktop" v-model="state.email" placeholder="Something ending with monterail.com" type="email">
        <input class="mobile" v-model="state.email" placeholder="Something ending with..." type="email">
        <div class="error-messages" v-if="v$.email.$error">{{v$.email.$errors[0].$message}}</div>
        <label class="password-label">password</label>
        <div class="control-eye">
          <input v-model="state.password" class="password-input" placeholder="Enter your password" type="password">
          <svg @click="showOrHidePassword" class="eye" width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.5001 9.25102C12.4691 9.18302 8.30007 12 5.67907 14.885C5.40396 15.1905 5.25171 15.587 5.25171 15.998C5.25171 16.4091 5.40396 16.8056 5.67907 17.111C8.24307 19.935 12.4001 22.817 16.5001 22.748C20.6001 22.817 24.7581 19.935 27.3241 17.111C27.5992 16.8056 27.7514 16.4091 27.7514 15.998C27.7514 15.587 27.5992 15.1905 27.3241 14.885C24.7001 12 20.5311 9.18302 16.5001 9.25102Z" stroke="#5D5D67" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M20.25 16C20.2498 16.7417 20.0297 17.4666 19.6175 18.0831C19.2054 18.6997 18.6196 19.1802 17.9344 19.4639C17.2491 19.7475 16.4952 19.8217 15.7678 19.6768C15.0404 19.532 14.3723 19.1748 13.848 18.6503C13.3237 18.1258 12.9666 17.4576 12.822 16.7302C12.6774 16.0028 12.7517 15.2489 13.0355 14.5637C13.3194 13.8786 13.8001 13.293 14.4167 12.8809C15.0334 12.4689 15.7584 12.249 16.5 12.249C16.9926 12.2489 17.4804 12.3458 17.9355 12.5343C18.3905 12.7228 18.804 12.9991 19.1523 13.3474C19.5006 13.6958 19.7768 14.1094 19.9651 14.5645C20.1535 15.0196 20.2503 15.5074 20.25 16Z" stroke="#5D5D67" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <ul>
          <li :class="state.password.length>=8  ? 'success-color' : state.password.length===0 ? 'gray-color' : 'warning-color' ">At least 8 characters</li>
          <li :class="/[a-zA-Z]/.test(state.password)  ? 'success-color' : state.password.length===0 ? 'gray-color' : 'warning-color' ">At least one letter</li>
          <li :class="/\d/.test(state.password)  ? 'success-color' : state.password.length===0 ? 'gray-color' : 'warning-color' ">At least one digit</li>
        </ul>
        <div class="form-buttons">
          <a href="#">Log in instead</a><button type="submit" >Next step</button>
        </div>
      </form>
    </div>
  </main>
</template>

<script setup>
import {onMounted, reactive} from "vue";
import { useRouter } from 'vue-router'
import useVuelidate from "@vuelidate/core";
import {required, email, minLength, helpers} from "@vuelidate/validators";

import { useUserStore } from '../store/user'

const router = useRouter();

const store = useUserStore();

const mustBeMonterail = (value) => value.includes("monterail")

const state = reactive({
  email: "",
  password: "",
})
const rules ={
  email: { required , mustBeMonterail: helpers.withMessage("Email should include monterail", mustBeMonterail), email},
  password: { required, minLength: minLength(8) }
}

const handleSubmit = () => {
  store.changeEmail(state.email);
}

const showOrHidePassword = () => {
  const inputAttribute = document.querySelector(".password-input");
  const eye = document.querySelector(".eye");

  if (inputAttribute.getAttribute("type") === "password") {
    inputAttribute.setAttribute("type", "text");
    eye.style.opacity = "0.5";
  } else {
    inputAttribute.setAttribute("type", "password");
    eye.style.opacity = "1";
  }
}

const v$ = useVuelidate(rules, state)

const submitForm = async () => {
  const result = await v$.value.$validate();
  result ? await router.push('/second-step') : null;
}

</script>

<style lang="scss">
.danger-border{
    &:focus{
      background: #F7F7F7;
      padding: 16.5px 23px;
      border: 1px solid #EC1115;
    }
}
.mobile{
  display: none;
}
.warning-color{
  color: #EC1115 !important;
}
.success-color{
  color: #27AE60 !important;
}
.gray-color{
  color: #343541;
}
main{
  display: flex;
  align-items: center;
  flex-direction: column;

  .main-text{
    margin-top: 124px;
    margin-bottom: 40px;
    font-family: 'Eczar';
    font-style: normal;
    font-weight: 600;
    font-size: 80px;
    line-height: 82px;
    letter-spacing: -0.01em;
    span{
      display: block;
      &:first-child{
        color: #343541;
      }
      &:last-child{
        color: #85868D;
      }
    }
  }
  .error-messages{
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 24px;
    letter-spacing: 0.04em;
    color: #EC1115;
  }
  ul{
    display: flex;
    flex-direction: column;
    padding: 2px;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 24px;
    letter-spacing: 0.04em;
    color: #343541;
    li{
      list-style: none;
    }
  }

  .form-box{
    box-shadow: 0px 4px 22px rgba(52, 53, 65, 0.15);
    border-radius: 24px;
    max-width: 600px;
    width: 100%;
    padding: 64px;
    margin-bottom: 338px;
    form{
      display: flex;
      flex-direction: column;
      .password-label{
        margin-top: 24px;
      }
      .control-eye{
        position: relative;
        input{
          width: 100%;
        }
        svg{
          position: absolute;
          top: 8px;
          right: 5px;
        }
      }
      label{
        font-family: 'Roboto Mono';
        font-style: normal;
        font-weight: 700;
        font-size: 14px;
        line-height: 18px;
        text-transform: uppercase;
        color: #F47073;
        margin-bottom: 12px;
      }
      input{
        padding: 17.5px 24px;
        background-color: #F7F7F7;
        border-radius: 8px;
        border: none;
        outline: none;
        &::placeholder{
          font-family: 'Roboto';
          font-style: normal;
          font-weight: 400;
          font-size: 18px;
          line-height: 21px;
          color: #85868D;
          border: none;
        }
        &:hover{
          background-color:#E5E5E5;
        }
        &:focus{
          background: rgba(47, 128, 237, 0.1);
          padding: 16.5px 23px;
          border: 1px solid #2F80ED;
        }
      }
      .form-buttons{
        display: flex;
        justify-content: space-between;
        margin-top: 40px;
        font-family: 'Roboto Mono';
        font-style: normal;
        font-weight: 500;
        font-size: 18px;
        line-height: 100%;
        display: flex;
        align-items: center;
        text-align: center;
        letter-spacing: 0.015em;
        a{
          color: #EC1115;
          text-decoration: none;
        }
        button{
          color: #FFFFFF;
          padding: 19px 64px;
          background: #EC1115;
          border-radius: 64px;
          border: none;
          cursor: pointer;
          font-size: inherit;
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
}

@media (max-width: 768px) {
  .mobile{
    display: block;
  }
  .desktop{
    display: none;
  }
  .form-box{
    padding: 0 24px !important;
    box-shadow: none !important;
    margin-bottom: 0 !important;
    max-width: 400px !important;
  }
  .main-text{
    font-size: 40px !important;
    line-height: 50px !important;
    margin-top: 50px !important;
    text-align: center;
  }
  .form-buttons{
    flex-direction: column-reverse;
    button{
      margin-bottom: 20px;
    }
  }
}
</style>