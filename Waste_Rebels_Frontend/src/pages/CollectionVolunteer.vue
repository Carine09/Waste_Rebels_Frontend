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

      <!-- Navigation Tabs -->
      <nav class="border-b-1 border-light-grey">
        <div class="flex justify-between items-center pb-3">
          <button 
            @click="activeTab = 'dashboard'"
            :class="activeTab === 'dashboard' ? 'text-dark-blue' : 'text-light-blue'"
            class="font-medium font-main flex items-center space-x-2 cursor-pointer"
          >
            <img 
              v-if="activeTab === 'dashboard'"
              src="../assets/icons/dashboard_icon_dark_blue.png" 
              alt="Dashboard icon" 
              class="w-8 h-8"
            >
            <img 
              v-else
              src="../assets/icons/dashboard_icon_light_blue.png" 
              alt="Dashboard icon" 
              class="w-8 h-8"
            >
            <span class="text-sm">Dashboard</span>
          </button>
          <button 
            @click="activeTab = 'waste-collection'"
            :class="activeTab === 'waste-collection' ? 'text-dark-blue' : 'text-light-blue'"
            class="font-medium font-main flex items-center space-x-2 cursor-pointer"
          >
            <img 
              v-if="activeTab === 'waste-collection'"
              src="../assets/icons/waste_collection_management_icon_dark_blue.png" 
              alt="Waste collection icon" 
              class="w-8 h-8"
            >
            <img 
              v-else
              src="../assets/icons/waste_collection_management_icon_light_blue.png" 
              alt="Waste collection icon" 
              class="w-8 h-8"
            >
            <span class="text-sm">Waste collection management</span>
          </button>
        </div>
      </nav>

      <main id="admin-panel" class="space-y-6">

        <!-- Dashboard Content -->
        <section v-if="activeTab === 'dashboard'">
          <h2 class="sr-only">Waste collection statistics by category</h2>
          <div class="grid grid-cols-2 gap-4">
           
            <!-- Metal -->
            <article class="bg-white rounded-lg p-4 shadow-sm border border-light-grey">
              <div class="flex items-center space-x-3">
                <img src="../assets/icons/metal_icon_light_green.png" alt="Metal icon" class="w-10 h-10">
                <div>
                  <h3 class="text-sm font-main font-medium text-dark-blue">Metal</h3>
                  <p class="text-xs font-main text-dark-grey">4000 kg</p>
                </div>
              </div>
            </article>

            <!-- Electronic -->
            <article class="bg-white rounded-lg p-4 shadow-sm border border-light-grey">
              <div class="flex items-center space-x-3">
                <img src="../assets/icons/electronic_icon_light_green.png" alt="Electronic icon" class="w-10 h-10">
                <div>
                  <h3 class="text-sm font-main font-medium text-dark-blue">Electronic</h3>
                  <p class="text-xs font-main text-dark-grey">3000 kg</p>
                </div>
              </div>
            </article>

            <!-- Glass -->
            <article class="bg-white rounded-lg p-4 shadow-sm border border-light-grey">
              <div class="flex items-center space-x-3">
                <img src="../assets/icons/glass_icon_light_green.png" alt="Glass icon" class="w-10 h-10">
                <div>
                <h3 class="text-sm font-main font-medium text-dark-blue">Glass</h3>
                <p class="text-xs font-main text-dark-grey">6000 kg</p>
                </div>
              </div>
            </article>

            <!-- Cigarette -->
            <article class="bg-white rounded-lg p-4 shadow-sm border border-light-grey">
              <div class="flex items-center space-x-3">
                <img src="../assets/icons/cigarette_icon_light_green.png" alt="Cigarette icon" class="w-10 h-10">
                <div>
                  <h3 class="text-sm font-main font-medium text-dark-blue">Cigarette</h3>
                  <p class="text-xs font-main text-dark-grey">3000 kg</p>
                </div>
              </div>
            </article>

            <!-- Plastic -->
            <article class="bg-white rounded-lg p-4 shadow-sm border border-light-grey">
              <div class="flex items-center space-x-3">
                <img src="../assets/icons/plastic_icon_light_green.png" alt="Plastic icon" class="w-10 h-10">
                <div>
                  <h3 class="text-sm font-main font-medium text-dark-blue">Plastic</h3>
                  <p class="text-xs font-main text-dark-grey">3000 kg</p>
                </div>
              </div>
            </article>

            <!-- Other -->
            <article class="bg-white rounded-lg p-4 shadow-sm border border-light-grey">
              <div class="flex items-center space-x-3">
                <img src="../assets/icons/other_icon_light_green.png" alt="Other icon" class="w-8 h-8">
                <div>
                  <h3 class="text-sm font-main font-medium text-dark-blue">Other</h3>
                  <p class="text-xs font-main text-dark-grey">4000 kg</p>
                </div>
              </div>
            </article>

          </div>
        </section>

<!-- Waste Collection Content -->
<section v-else-if="activeTab === 'waste-collection'" aria-labelledby="collections-heading">
  <div class="space-y-4">
          <button 
          type="submit" 
          class="w-full flex justify-center py-3 px-4 border border-transparent rounded-md bg-dark-blue cursor-pointer text-sm font-medium font-main text-white"
        >
          <span>Add a collection +</span>
        </button>
    <!-- Total Collections-->
      <h2 id="collections-heading" class="text-sm font-main font-medium text-dark-blue">
        Total number of waste collections : 6
      </h2>

    <!-- Collections List -->
      <h3 class="sr-only">List of waste collections</h3>
      <ul class="space-y-3" role="list">
        <!-- Collection 1 -->
        <li>
          <article class="bg-white rounded-lg p-4 shadow-sm border border-light-grey flex justify-between items-center">
            <div>
              <h4 class="text-sm font-main font-medium text-dark-blue">Collection 1</h4>
              <p class="text-xs font-main text-light-grey">
                <span class="sr-only">Location:</span>Lyon - 
                <time datetime="2025-05-31">05/31/2025</time>
              </p>
            </div>
            <button 
              type="button"
              class="p-2 rounded-md cursor-pointer"
              aria-label="View details for Collection 1"
            >
            <img src="../assets/icons/see_collection_icon_dark_blue.png" alt="Other icon" class="w-6 h-6">
            </button>
          </article>
        </li>

        <!-- Collection 2 -->
        <li>
          <article class="bg-white rounded-lg p-4 shadow-sm border border-light-grey flex justify-between items-center">
            <div>
              <h4 class="text-sm font-main font-medium text-dark-blue">Collection 2</h4>
              <p class="text-xs font-main text-light-grey">
                <span class="sr-only">Location:</span>Paris - 
                <time datetime="2025-06-17">06/17/2025</time>
              </p>
            </div>
            <button 
              type="button"
              class="p-2 rounded-md cursor-pointer"
              aria-label="View details for Collection 2"
            >
            <img src="../assets/icons/see_collection_icon_dark_blue.png" alt="Other icon" class="w-6 h-6">
            </button>
          </article>
        </li>

        <!-- Collection 3 -->
        <li>
          <article class="bg-white rounded-lg p-4 shadow-sm border border-light-grey flex justify-between items-center">
            <div>
              <h4 class="text-sm font-main font-medium text-dark-blue">Collection 3</h4>
              <p class="text-xs font-main text-light-grey">
                <span class="sr-only">Location:</span>Marseille - 
                <time datetime="2025-07-14">07/14/2025</time>
              </p>
            </div>
            <button 
              type="button"
              class="p-2 rounded-md cursor-pointer"
              aria-label="View details for Collection 3"
            >
            <img src="../assets/icons/see_collection_icon_dark_blue.png" alt="Other icon" class="w-6 h-6">
            </button>
          </article>
        </li>

        <!-- Collection 4 -->
        <li>
          <article class="bg-white rounded-lg p-4 shadow-sm border border-light-grey flex justify-between items-center">
            <div>
              <h4 class="text-sm font-main font-medium text-dark-blue">Collection 4</h4>
              <p class="text-xs font-main text-light-grey">
                <span class="sr-only">Location:</span>Lyon - 
                <time datetime="2025-09-12">09/12/2025</time>
              </p>
            </div>
            <button 
              type="button"
              class="p-2 rounded-md cursor-pointer"
              aria-label="View details for Collection 4"
            >
            <img src="../assets/icons/see_collection_icon_dark_blue.png" alt="Other icon" class="w-6 h-6">
            </button>
          </article>
        </li>

        <!-- Collection 5 -->
        <li>
          <article class="bg-white rounded-lg p-4 shadow-sm border border-light-grey flex justify-between items-center">
            <div>
              <h4 class="text-sm font-main font-medium text-dark-blue">Collection 5</h4>
              <p class="text-xs font-main text-light-grey">
                <span class="sr-only">Location:</span>Lyon - 
                <time datetime="2025-08-15">08/15/2025</time>
              </p>
            </div>
            <button 
              type="button"
              class="p-2 rounded-md cursor-pointer"
              aria-label="View details for Collection 5"
            >
            <img src="../assets/icons/see_collection_icon_dark_blue.png" alt="Other icon" class="w-6 h-6">
            </button>
          </article>
        </li>

        <!-- Collection 6 -->
        <li>
          <article class="bg-white rounded-lg p-4 shadow-sm border border-light-grey flex justify-between items-center">
            <div>
              <h4 class="text-sm font-main font-medium text-dark-blue">Collection 6</h4>
              <p class="text-xs font-main text-light-grey">
                <span class="sr-only">Location:</span>Paris - 
                <time datetime="2025-11-21">11/21/2025</time>
              </p>
            </div>
            <button 
              type="button"
              class="p-2 rounded-md cursor-pointer"
              aria-label="View details for Collection 6"
            >
        <img src="../assets/icons/see_collection_icon_dark_blue.png" alt="Other icon" class="w-6 h-6">
            </button>
          </article>
        </li>
      </ul>
  </div>
</section>
      </main>
      
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Reactive data
const activeTab = ref('dashboard');
const selectedCity = ref('');
</script>