import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';

export const useUserStore = defineStore('user', () => {

    let loggedIn = ref(false);
    
    function login({ email, password }) {
        return axios.post("/api/login", { email, password }).then(() => {
            loggedIn = true;
        });
    }
    
    function logout() {
        return axios.get("/api/logout").then(() => {
            loggedIn = false;
        });
    }

    return { loggedIn, login, logout };

});