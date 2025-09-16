<template>
  <div class="min-h-screen bg-gray-50 px-4 py-6">
    <div class="w-full max-w-sm mx-auto space-y-8">
      
      <!-- Header Section -->
      <header class="space-y-6">
        <div class="flex justify-between items-center">
          <img src="../assets/logos/waste_rebels_logo.png" alt="Waste Rebels Logo" class="w-30 h-30">
          <div class="flex flex-col items-end space-y-2">
            <button 
              type="button" 
              @click="logout"
              class="px-4 py-2 bg-dark-blue text-white text-sm font-main font-medium rounded-md cursor-pointer"
            >
              Log out
            </button>
            <h1 class="mt-8 text-sm font-medium font-main text-dark-blue">Hi Admin :)</h1>
          </div>
        </div>
      </header>

      <main class="space-y-8" v-if="collection">
        <!-- Page Title -->
        <section>
          <h2 class="text-xl font-medium font-main text-dark-blue">
            Waste collection details (#{{ collection.id }})
          </h2>
        </section>

        <!-- Collection Details -->
        <section>
          <h3 class="sr-only">Waste collection amounts</h3>
          <div class="space-y-4">
            <div 
              v-for="item in collection.waste_items" 
              :key="item.id"
              class="bg-white rounded-lg p-4 shadow-sm border border-light-grey"
            >
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-3">
                  <img 
                    :src="icons[item.waste_type.value] || icons['default']" 
                    :alt="item.waste_type.value + ' icon'" 
                    class="w-8 h-8"
                  >
                  <span class="text-sm font-main font-medium text-dark-blue">
                    {{ formatLabel(item.waste_type.value) }}
                  </span>
                </div>
                <div class="flex items-center space-x-2">
                  <span class="text-sm font-main text-dark-blue">{{ item.amount }}</span>
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
      <p v-else class="text-center text-sm text-dark-blue">Loading waste collection details...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useAuthStore } from "../stores/auth";
import { useRoute, useRouter } from "vue-router";

import iconMetal from '../assets/icons/metal_icon_light_green.png';
import iconElectronic from '../assets/icons/electronic_icon_light_green.png';
import iconGlass from '../assets/icons/glass_icon_light_green.png';
import iconCigarette from '../assets/icons/cigarette_icon_light_green.png';
import iconPlastic from '../assets/icons/plastic_icon_light_green.png';
import iconOther from '../assets/icons/other_icon_light_green.png';

const auth = useAuthStore();
const router = useRouter();
const route = useRoute();

const logout = () => auth.logout();
const goBack = () => router.push("/admin/collection");

// mapping des icônes
const icons = {
  glass: iconGlass,
  cigarettes: iconCigarette,
  metal_waste: iconMetal,
  electronic_waste: iconElectronic,
  plastic: iconPlastic,
  others: iconOther,
  default: iconOther,
};

// labels plus jolis
function formatLabel(value) {
  switch (value) {
    case "glass": return "Glass";
    case "cigarettes": return "Cigarettes";
    case "metal_waste": return "Metal";
    case "electronic_waste": return "Electronic";
    case "plastic": return "Plastic";
    case "others": return "Other";
    default: return value;
  }
}

const collection = ref(null);

onMounted(async () => {
  const id = route.query.id;
  if (!id) return;

  try {
    const res = await fetch(`http://localhost:8000/waste/collection/${id}`, {
      headers: {
        Authorization: `Bearer ${auth.token}`,
        Accept: "application/json",
      },
    });
    const payload = await res.json();
    if (payload.success) {
      collection.value = payload.data;
    } else {
      console.error("API Error :", payload.message);
    }
  } catch (e) {
    console.error("Failed to load collection :", e);
  }
});
</script>
