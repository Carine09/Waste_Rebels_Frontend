<template>
  <div class="min-h-screen bg-gray-50 px-4 py-6">
    <div class="w-full max-w-sm mx-auto space-y-8">
      
      <!-- Header Section -->
      <header class="space-y-6">
        <!-- Top section with logo and logout -->
        <div class="flex justify-between items-center">
          <img src="../assets/logos/waste_rebels_logo.png" alt="Waste Rebels Logo" class="w-30 h-30">
          <div class="flex flex-col items-end space-y-2">
            <button 
              type="button" 
              class="px-4 py-2 bg-dark-blue text-white text-sm font-main font-medium rounded-md cursor-pointer"
            >
              Log out
            </button>
            <h1 class="mt-8 text-sm font-medium font-main text-dark-blue">Hi Léonie :)</h1>
          </div>
        </div>
      </header>

      <main class="space-y-8">
        <!-- Page Title -->
        <section>
          <h2 class="text-xl font-medium font-main text-dark-blue">Waste collection details</h2>
        </section>

        <!-- Collection Details -->
        <section>
          <h3 class="sr-only">Waste collection amounts</h3>
          <div class="space-y-4">
            
            <!-- Metal -->
            <div class="bg-white rounded-lg p-4 shadow-sm border border-light-grey">
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-3">
                  <img src="../assets/icons/metal_icon_light_green.png" alt="" class="w-8 h-8">
                  <span class="text-sm font-main font-medium text-dark-blue">Metal</span>
                </div>
                <div class="flex items-center space-x-2">
                  <span class="text-sm font-main text-dark-blue">100</span>
                  <span class="text-sm font-main text-dark-blue">kg</span>
                </div>
              </div>
            </div>

            <!-- Glass -->
            <div class="bg-white rounded-lg p-4 shadow-sm border border-light-grey">
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-3">
                  <img src="../assets/icons/glass_icon_light_green.png" alt="" class="w-8 h-8">
                  <span class="text-sm font-main font-medium text-dark-blue">Glass</span>
                </div>
                <div class="flex items-center space-x-2">
                  <span class="text-sm font-main text-dark-blue">200</span>
                  <span class="text-sm font-main text-dark-blue">kg</span>
                </div>
              </div>
            </div>

            <!-- Plastic -->
            <div class="bg-white rounded-lg p-4 shadow-sm border border-light-grey">
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-3">
                  <img src="../assets/icons/plastic_icon_light_green.png" alt="" class="w-8 h-8">
                  <span class="text-sm font-main font-medium text-dark-blue">Plastic</span>
                </div>
                <div class="flex items-center space-x-2">
                  <span class="text-sm font-main text-dark-blue">150</span>
                  <span class="text-sm font-main text-dark-blue">kg</span>
                </div>
              </div>
            </div>

            <!-- Electronic -->
            <div class="bg-white rounded-lg p-4 shadow-sm border border-light-grey">
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-3">
                  <img src="../assets/icons/electronic_icon_light_green.png" alt="" class="w-8 h-8">
                  <span class="text-sm font-main font-medium text-dark-blue">Electronic</span>
                </div>
                <div class="flex items-center space-x-2">
                  <span class="text-sm font-main text-dark-blue">90</span>
                  <span class="text-sm font-main text-dark-blue">kg</span>
                </div>
              </div>
            </div>

            <!-- Cigarettes -->
            <div class="bg-white rounded-lg p-4 shadow-sm border border-light-grey">
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-3">
                  <img src="../assets/icons/cigarette_icon_light_green.png" alt="" class="w-8 h-8">
                  <span class="text-sm font-main font-medium text-dark-blue">Cigarettes</span>
                </div>
                <div class="flex items-center space-x-2">
                  <span class="text-sm font-main text-dark-blue">10</span>
                  <span class="text-sm font-main text-dark-blue">kg</span>
                </div>
              </div>
            </div>

            <!-- Other -->
            <div class="bg-white rounded-lg p-4 shadow-sm border border-light-grey">
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-3">
                  <img src="../assets/icons/other_icon_light_green.png" alt="" class="w-8 h-8">
                  <span class="text-sm font-main font-medium text-dark-blue">Other</span>
                </div>
                <div class="flex items-center space-x-2">
                  <span class="text-sm font-main text-dark-blue">40</span>
                  <span class="text-sm font-main text-dark-blue">kg</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Navigation -->
        <nav class="pt-4">
          <button 
            type="button"
            @click="goBack"
            class="flex items-center text-sm font-main text-dark-blue hover:underline focus:outline-none focus:underline cursor-pointer"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
            </svg>
            Back to homepage
          </button>
        </nav>
      </main>
      
    </div>
  </div>
</template>

<script setup>
// Methods
const goBack = () => {
  // Navigate back to homepage
  // router.go(-1) or router.push('/')
  console.log('Navigate back to homepage');
};
</script>