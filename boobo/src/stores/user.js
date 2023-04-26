import { ref } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';

export const useUserStore = defineStore('user', () => {

    const loggedIn = ref(false);
    const hasError = ref(false);
    const error = ref("");

    function login({ email, password }) {
        return axios.post("/api/login", { email, password }).then(
            (response) => {
                console.log(response);
                loggedIn = true;
            }, (response) => {
                hasError.value = true;
                error.value = response.response.data.msg;
                return hasError;
            });
    }

    function logout() {
        return axios.get("/api/logout").then(() => {
            loggedIn = false;
        });
    }

    return { loggedIn, error, hasError, login, logout };
});