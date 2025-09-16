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
              @click="logout"
              class="px-4 py-2 bg-dark-blue text-white text-sm font-main font-medium rounded-md cursor-pointer">
              Log out
            </button>
            <h1 class="mt-8 text-sm font-medium font-main text-dark-blue">Hi Léonie :)</h1>
          </div>
        </div>
      </header>

      <main class="space-y-8">
        <!-- Page Title -->
        <section>
          <h2 class="text-xl font-medium font-main text-dark-blue">Add a waste collection</h2>
        </section>

        <!-- Collection Form -->
        <section>
          <h3 class="sr-only">Waste collection quantities form</h3>
          <form class="space-y-4" @submit.prevent="handleSubmit">

            <!-- Location select -->
            <div>
              <label for="location" class="block text-sm font-main text-dark-blue">City</label>
              <select id="location" v-model="locationId" required
                class="w-full px-4 py-2 border border-light-grey rounded-lg bg-white font-main text-sm text-dark-blue focus:outline-none focus:ring-2 focus:ring-dark-blue focus:border-transparent">
                <option value="" disabled>Select a city</option>
                <option v-for="loc in locations" :key="loc.id" :value="loc.id">
                  {{ loc.city }}
                </option>
              </select>
            </div>

            <!-- Metal -->
            <div class="bg-white rounded-lg p-4 shadow-sm border border-light-grey">
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-3">
                  <img src="../assets/icons/metal_icon_light_green.png" alt="" class="w-8 h-8">
                  <label for="metal-input" class="text-sm font-main font-medium text-dark-blue">Metal</label>
                </div>
                <div class="flex items-center space-x-2">
                  <input id="metal-input" v-model="collections.metal_waste" type="number" min="0"
                    class="w-16 px-2 py-1 text-sm font-main text-dark-blue text-right border-0 bg-transparent focus:outline-none focus:ring-1 focus:ring-dark-blue rounded">
                  <span class="text-sm font-main text-dark-blue">kg</span>
                </div>
              </div>
            </div>

            <!-- Glass -->
            <div class="bg-white rounded-lg p-4 shadow-sm border border-light-grey">
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-3">
                  <img src="../assets/icons/glass_icon_light_green.png" alt="" class="w-8 h-8">
                  <label for="glass-input" class="text-sm font-main font-medium text-dark-blue">Glass</label>
                </div>
                <div class="flex items-center space-x-2">
                  <input id="glass-input" v-model="collections.glass" type="number" min="0"
                    class="w-16 px-2 py-1 text-sm font-main text-dark-blue text-right border-0 bg-transparent focus:outline-none focus:ring-1 focus:ring-dark-blue rounded">
                  <span class="text-sm font-main text-dark-blue">kg</span>
                </div>
              </div>
            </div>

            <!-- Plastic -->
            <div class="bg-white rounded-lg p-4 shadow-sm border border-light-grey">
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-3">
                  <img src="../assets/icons/plastic_icon_light_green.png" alt="" class="w-8 h-8">
                  <label for="plastic-input" class="text-sm font-main font-medium text-dark-blue">Plastic</label>
                </div>
                <div class="flex items-center space-x-2">
                  <input id="plastic-input" v-model="collections.plastic" type="number" min="0"
                    class="w-16 px-2 py-1 text-sm font-main text-dark-blue text-right border-0 bg-transparent focus:outline-none focus:ring-1 focus:ring-dark-blue rounded">
                  <span class="text-sm font-main text-dark-blue">kg</span>
                </div>
              </div>
            </div>

            <!-- Electronic -->
            <div class="bg-white rounded-lg p-4 shadow-sm border border-light-grey">
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-3">
                  <img src="../assets/icons/electronic_icon_light_green.png" alt="" class="w-8 h-8">
                  <label for="electronic-input" class="text-sm font-main font-medium text-dark-blue">Electronic</label>
                </div>
                <div class="flex items-center space-x-2">
                  <input id="electronic-input" v-model="collections.electronic_waste" type="number" min="0"
                    class="w-16 px-2 py-1 text-sm font-main text-dark-blue text-right border-0 bg-transparent focus:outline-none focus:ring-1 focus:ring-dark-blue rounded">
                  <span class="text-sm font-main text-dark-blue">kg</span>
                </div>
              </div>
            </div>

            <!-- Cigarettes -->
            <div class="bg-white rounded-lg p-4 shadow-sm border border-light-grey">
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-3">
                  <img src="../assets/icons/cigarette_icon_light_green.png" alt="" class="w-8 h-8">
                  <label for="cigarettes-input" class="text-sm font-main font-medium text-dark-blue">Cigarettes</label>
                </div>
                <div class="flex items-center space-x-2">
                  <input id="cigarettes-input" v-model="collections.cigarettes" type="number" min="0"
                    class="w-16 px-2 py-1 text-sm font-main text-dark-blue text-right border-0 bg-transparent focus:outline-none focus:ring-1 focus:ring-dark-blue rounded">
                  <span class="text-sm font-main text-dark-blue">kg</span>
                </div>
              </div>
            </div>

            <!-- Other -->
            <div class="bg-white rounded-lg p-4 shadow-sm border border-light-grey">
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-3">
                  <img src="../assets/icons/other_icon_light_green.png" alt="" class="w-8 h-8">
                  <label for="other-input" class="text-sm font-main font-medium text-dark-blue">Other</label>
                </div>
                <div class="flex items-center space-x-2">
                  <input id="other-input" v-model="collections.others" type="number" min="0"
                    class="w-16 px-2 py-1 text-sm font-main text-dark-blue text-right border-0 bg-transparent focus:outline-none focus:ring-1 focus:ring-dark-blue rounded">
                  <span class="text-sm font-main text-dark-blue">kg</span>
                </div>
              </div>
            </div>

            <!-- Messages success or failed-->
            <div v-if="success" class="text-light-green text-sm font-main font-medium">
              Your collection has been registered
            </div>
            <div v-if="error" class="text-dark-red text-sm font-main font-medium">
              Your registration failed
            </div>

            <!-- Submit Button -->
            <div class="pt-4">
              <button type="submit"
                class="w-full flex justify-center items-center py-3 px-4 bg-dark-blue text-white text-sm font-main font-medium rounded-md focus:outline-none cursor-pointer">
                <span class="mr-2">Add</span>
                <span class="text-lg">+</span>
              </button>
            </div>
          </form>
        </section>

        <!-- Navigation -->
        <nav class="pt-4">
          <button 
            type="button" 
            @click="goBack"
            class="flex items-center text-sm font-main text-dark-blue hover:underline focus:outline-none focus:underline curson-pointer">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
            Back to homepage
          </button>
        </nav>
      </main>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';

const auth = useAuthStore();
const router = useRouter();
const collections = ref({
  metal_waste: '',
  glass: '',
  plastic: '',
  electronic_waste: '',
  cigarettes: '',
  others: ''
});

const locations = ref([]);   
const locationId = ref('');
const error = ref('');
const success = ref('');

const logout = () => {
  auth.logout();
};


const goBack = () => {
  router.push('/volunteer/collection');
};

onMounted(async () => {
  try {
    const response = await fetch("http://localhost:8000/location", {
      headers: {
        "Authorization": `Bearer ${auth.token}`,
        "Accept": "application/json"
      }
    });

    const data = await response.json();
    console.log("Locations API response:", data);

    if (Array.isArray(data)) {
      locations.value = data;
    }
    else if (data.success && Array.isArray(data.data)) {
      locations.value = data.data;
    }
  } catch (e) {
    console.error("Failed to load locations :", e);
  }
});

const handleSubmit = async () => {
  error.value = '';
  success.value = '';

  try {
    const wasteItems = Object.entries(collections.value)
      .filter(([_, amount]) => amount && amount > 0)
      .map(([type, amount]) => ({
        waste_type: type,
        amount: parseFloat(amount)
      }));

    const response = await fetch("http://localhost:8000/waste/collection", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${auth.token}`
      },
      body: JSON.stringify({
        user_id: auth.userId,
        location_id: locationId.value,
        waste_items: wasteItems
      })
    });

    const data = await response.json();
    console.log("API response:", data);

    if (!response.ok) {
      throw new Error(data.message || "Failed to create collection");
    }

    success.value = "Waste collection created successfully!";
    console.log("Collection created :", data);

  } catch (e) {
    error.value = e.message;
  }
};
</script>