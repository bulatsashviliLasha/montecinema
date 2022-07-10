<template>
  <main>
    <div class="main-text">
      <span>Great!</span>
      <span>Now your name</span>
    </div>
    <div class="form-box">
      <form @submit.prevent="submitForm();handleSubmit()">
        <label>first name</label>
        <input v-model="state.name" placeholder="e.g. Jessica" type="text">
        <div class="error-messages" v-if="v$.name.$error">First name required</div>
        <br>
        <label>last name</label>
        <input v-model="state.lastName" placeholder="e.g. Walton" type="text">
        <div class="error-messages" v-if="v$?.lastName?.$error">Last name required</div>
        <br>
        <label>date of birth</label>
        <input v-model="state.birthday"  type="date" required min="1890-01-01" max="2020-01-01" style="text-transform: uppercase">
        <div class="minimum18" :class=" underAgeValidate(state.birthday) ? 'success-color' : state.birthday === '' ? 'gray-color' : 'warning-color' ">You should be minimum 18 years old</div>
        <div class="privacy">
          <input type="checkbox" v-model="state.acceptTerms">
          <span>I accept <a href="#">Privacy Policy</a></span>
        </div>
        <div class="error-messages" v-if="!state.acceptTerms">Accept terms required</div>
        <div class="form-buttons">
          <a href="#">Log in instead</a><button class="btn" type="submit" >Next step</button>
        </div>
      </form>
    </div>
  </main>
</template>

<script setup>
import { useUserStore } from '../store/user'
const store = useUserStore();
import {  reactive } from "vue";
import { useRouter } from 'vue-router'
import useVuelidate from "@vuelidate/core";
import {required, minLength, } from "@vuelidate/validators";

const router = useRouter();

const state = reactive({
  name: "",
  lastName: "",
  acceptTerms: null,
  birthday: "",
})
const underAgeValidate = (birthday) => {
  const optimizedBirthday = birthday.replace(/-/g, "/");
  const myBirthday = new Date(optimizedBirthday);
  const currentDate = new Date().toJSON().slice(0,10)+' 01:00:00';
  const myAge = ~~((Date.now(currentDate) - myBirthday) / (31557600000));
  if(myAge < 18) {
    return false;
  }else{
    return true;
  }
}

const rules ={
  name: { required , minLength: minLength(2)},
  lastName: { required, minLength: minLength(2) },
  acceptTerms: {required},
  birthday: {required}
}


const handleSubmit = () => {
  store.changeName(state.name);
}

const v$ = useVuelidate(rules, state)

const submitForm = async () => {
  const result = await v$.value.$validate();
  underAgeValidate(state.birthday)
  if(result && underAgeValidate(state.birthday) ){
   await router.push('/registered');
  }
}

</script>
<style lang="scss" scoped>

.privacy{
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 21px;
  color: #292A33;
  padding-left: 4px;
  input{
    transform: scale(1.5);
    margin-right: 10px;
  }
  span{
    a{
      color: inherit;
    }
  }
}
label{
  margin-bottom: 12px;
}
.minimum18{
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  margin: 8px 0 25.5px;
  letter-spacing: 0.04em;
  color: #343541;
  padding: 2px;

}
.form-buttons{
  margin-bottom: 20px !important;
}
</style>