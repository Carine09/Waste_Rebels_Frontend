import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
    state: () => ({
        user: {
            displayName: null,
        }
    }),

    actions: {
        setUser(user) {
            this.user.displayName = user.display_name;
        },
    }
});