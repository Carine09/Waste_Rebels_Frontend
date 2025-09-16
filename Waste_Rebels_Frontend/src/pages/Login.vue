<template>
  <div class="min-h-screen flex flex-col items-center justify-center px-4 py-12">
    <div class="w-full max-w-sm space-y-12">
      
      <!-- Header -->
      <header class="text-center space-y-6">
        <div class="flex justify-center mb-8">
          <img src="../assets/logos/waste_rebels_logo.png" alt="Waste Rebels Logo" class="w-40 h-40">
        </div>
        <div class="space-y-4">
          <h1 class="text-4xl font-extrabold font-main text-dark-blue">Welcome</h1>
          <p class="text-sm font-main text-dark-blue leading-relaxed">
            Thank you for fighting the good fight.<br>
            You are part of the change.
          </p>
        </div>
      </header>

      <!-- Login Form -->
      <main class="space-y-8">
        <form class="space-y-6" @submit.prevent="login">
          <!-- Email -->
          <div class="space-y-2">
            <label for="email" class="block text-sm font-main text-dark-blue">Email address</label>
            <input 
              v-model="email" 
              id="email" 
              type="email" 
              required
              :class="[
                'block w-full px-0 py-3 border-0 border-b bg-transparent text-sm font-main focus:outline-none focus:ring-0',
                error ? 'border-red-500 text-red-600' : 'border-dark-blue text-dark-blue'
              ]"
            >
          </div>

          <!-- Password -->
          <div class="space-y-2">
            <label for="password" class="block text-sm font-main text-dark-blue">Password</label>
            <input 
              v-model="password" 
              id="password" 
              type="password" 
              required
              :class="[
                'block w-full px-0 py-3 border-0 border-b bg-transparent text-sm font-main focus:outline-none focus:ring-0',
                error ? 'border-red-500 text-red-600' : 'border-dark-blue text-dark-blue'
              ]"
            >
          </div>

          <!-- Error Message -->
          <p v-if="error" class="text-red-500 text-sm text-center">
            Invalid email or password.
          </p>

          <!-- Submit Button -->
          <div class="mt-16">
            <button type="submit" 
              class="w-full flex justify-center py-3 px-4 border border-transparent rounded-md bg-dark-blue cursor-pointer text-sm font-bold font-main text-white">
              LOGIN
            </button>
          </div>
        </form>
      </main>
      
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../stores/auth';
import router from '../router';

const auth = useAuthStore();
const email = ref('');
const password = ref('');
const error = ref(false); // pour gérer l'état d'erreur

const login = async () => {
  error.value = false; // reset erreur avant tentative
  try {
    const response = await fetch("http://localhost:8000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify({ email: email.value, password: password.value })
    });

    if (!response.ok) {
      error.value = true;
      return;
    }

    const data = await response.json();
    console.log("🔍 Réponse API:", data);

    // Stockage dans le store
    auth.setToken(data.token);
    auth.setUserId(data.user.id);
    auth.setDisplayName(data.user.firstname);
    auth.setRole(data.user.role[0]);

    console.log("Store après login:", {
    token: auth.token,
    userId: auth.userId,
    displayName: auth.displayName,
    role: auth.role
    });

    // Redirection selon le rôle
    if (auth.isAdmin) {
      router.push("/admin/collection");
    } else if (auth.isVolunteer) {
      router.push("/volunteer/collection");
    } else {
      router.push("/login");
    }

  } catch (e) {
    error.value = true;
  }
};
</script>
