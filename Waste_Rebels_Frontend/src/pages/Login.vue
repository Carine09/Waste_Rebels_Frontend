<template>
  <div class="min-h-screen flex flex-col items-center justify-center px-4 py-12">
    <div class="w-full max-w-sm space-y-12">
      
      <!-- Header Section -->
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

      <!-- Login Form Section -->
      <main class="space-y-8">
        <form class="space-y-6" aria-label="Login form">
          <!-- Email Field -->
          <div class="space-y-2">
            <label for="email" class="block text-sm font-main text-dark-blue">Email address</label>
            <input 
              id="email" 
              type="email" 
              required 
              class="block w-full px-0 py-3 border-0 border-b border-dark-blue bg-transparent text-sm text-dark-blue font-main focus:outline-none focus:ring-0"
            >
          </div>
          
          <!-- Password Field -->
          <div class="space-y-2">
            <label for="password" class="block text-sm font-main text-dark-blue">Password</label>
            <input 
              id="password" 
              type="password"
              required 
              class="block w-full px-0 py-3 border-0 border-b border-dark-blue bg-transparent text-sm text-dark-blue font-main focus:outline-none focus:ring-0"
            >
          </div>
        </form>
        
        <!-- Submit Button -->
        <div class="mt-16">
        <button 
          type="submit" 
          class="w-full flex justify-center py-3 px-4 border border-transparent rounded-md bg-dark-blue cursor-pointer text-sm font-bold font-main text-white"
        >
          <span>LOGIN</span>
        </button>
        </div>
      </main>
      
    </div>
  </div>
</template>

<script setup>
</script>