import {reactive} from "vue";
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
    const user = reactive({
        name: null,
        email: null,
    });

    const changeName = (newName) => {
        user.name = newName;
    }

    const changeEmail = (newEmail) => {
        user.email = newEmail;
    }

    return{
        user,
        changeName,
        changeEmail
    }
})