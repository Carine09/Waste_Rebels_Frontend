<template>
  <div class="min-h-screen bg-gray-50 px-4 py-6">
    <div class="w-full max-w-sm mx-auto space-y-8">
      
      <!-- Header Section -->
      <header class="space-y-6">
        <div class="flex justify-between items-center">
          <img src="../assets/logos/waste_rebels_logo.png" alt="Waste Rebels Logo" class="w-30 h-30">
          <div class="flex flex-col items-end space-y-2">
            <button 
              @click="logout"
              class="px-4 py-2 bg-dark-blue text-white text-sm font-main font-medium rounded-md cursor-pointer"
            >
              Log out
            </button>
            <h1 class="mt-8 text-sm font-medium font-main text-dark-blue">Hi {{ auth.displayName }} :)</h1>
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

      <main id="volunteer-panel" class="space-y-6">

        <!-- Dashboard Content -->
        <section v-if="activeTab === 'dashboard'">
          <h2 class="sr-only">Waste collection statistics by category</h2>
          <div class="grid grid-cols-2 gap-4">
            <article v-for="type in displayOrder" :key="type"
              class="bg-white rounded-lg p-4 shadow-sm border border-light-grey">
              <div class="flex items-center space-x-3">
                <img :src="TYPES[type].icon" :alt="TYPES[type].label + ' icon'" class="w-10 h-10">
                <div>
                  <h3 class="text-sm font-main font-medium text-dark-blue">{{ TYPES[type].label }}</h3>
                  <p class="text-xs font-main text-dark-grey">{{ totals[type] }} kg</p>
                </div>
              </div>
            </article>
          </div>
        </section>

          <!-- Pie chart with consistent sizing -->
          <div class="bg-white rounded-lg p-4 shadow-sm border border-light-grey mt-6">
            <h3 class="text-sm font-main font-medium text-dark-blue mb-4">Waste distribution</h3>
            <div class="h-64">
              <Pie :data="chartData" :options="chartOptions" />
            </div>
          </div>
        </section>

        <!-- Waste Collection Content -->
        <section v-else-if="activeTab === 'waste-collection'" aria-labelledby="collections-heading">
          <div class="space-y-4">
            <button 
              @click="goToAddCollection"
              class="w-full flex justify-center py-3 px-4 border border-transparent rounded-md bg-dark-blue cursor-pointer text-sm font-medium font-main text-white"
            >
              <span>Add a collection +</span>
            </button>

            <!-- Total Collections-->
            <h2 id="collections-heading" class="text-sm font-main font-medium text-dark-blue">
              Total number of waste collections : {{ userCollections.length }}
            </h2>

            <!-- Collections List -->
            <h3 class="sr-only">List of waste collections</h3>
            <ul class="space-y-3" role="list">
              <li v-for="col in userCollections" :key="col.id">
                <article class="bg-white rounded-lg p-4 shadow-sm border border-light-grey flex justify-between items-center">
                  <div>
                    <h4 class="text-sm font-main font-medium text-dark-blue">Collection #{{ col.id }}</h4>
                    <p class="text-xs font-main text-light-grey">
                      <span class="sr-only">Location:</span>{{ col.location?.city || 'Unknown' }} - 
                      <time :datetime="col.created_at">{{ new Date(col.created_at).toLocaleDateString() }}</time>
                    </p>
                  </div>
                  <button 
                    type="button"
                    class="p-2 rounded-md cursor-pointer"
                    :aria-label="`View details for Collection ${col.id}`"
                    @click="goToViewCollection(col.id)"
                  >
                    <img src="../assets/icons/see_collection_icon_dark_blue.png" alt="View icon" class="w-6 h-6">
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
import { ref, onMounted, computed } from 'vue';
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';
import { Pie } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

import iconMetal from '../assets/icons/metal_icon_light_green.png';
import iconElectronic from '../assets/icons/electronic_icon_light_green.png';
import iconGlass from '../assets/icons/glass_icon_light_green.png';
import iconCigarette from '../assets/icons/cigarette_icon_light_green.png';
import iconPlastic from '../assets/icons/plastic_icon_light_green.png';
import iconOther from '../assets/icons/other_icon_light_green.png';

const auth = useAuthStore();
const router = useRouter();
const logout = () => auth.logout();

const activeTab = ref('dashboard');
const userCollections = ref([]);
// Use the same structure as admin for consistency
const TYPES = {
  glass: { label: 'Glass', icon: iconGlass },
  cigarettes: { label: 'Cigarettes', icon: iconCigarette },
  metal_waste: { label: 'Metal', icon: iconMetal },
  electronic_waste: { label: 'Electronic', icon: iconElectronic },
  others: { label: 'Other', icon: iconOther },
  plastic: { label: 'Plastic', icon: iconPlastic },
};

// Same order as admin to maintain color consistency
const displayOrder = ['glass', 'cigarettes', 'metal_waste', 'electronic_waste', 'others', 'plastic'];

const totals = ref(Object.fromEntries(Object.keys(TYPES).map(k => [k, 0])));

const icons = {
  metal: iconMetal,
  electronic: iconElectronic,
  glass: iconGlass,
  cigarettes: iconCigarette,
  plastic: iconPlastic,
  other: iconOther,
};

// Graph data with consistent color mapping
const chartData = computed(() => {
  const labels = displayOrder.map(k => TYPES[k].label);
  const values = displayOrder.map(k => totals.value[k]);
  const total = values.reduce((sum, v) => sum + v, 0);

  return {
    labels: labels,
    datasets: [
      {
        data: values,
        backgroundColor: ['#3d405b', '#6577b5', '#98a2c4', '#3e5c4d', '#709985', '#b0cdbf']
      }
    ]
  };
});

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { 
      position: 'bottom',
      labels: {
        generateLabels: function(chart) {
          const data = chart.data;
          if (data.labels.length && data.datasets.length) {
            const dataset = data.datasets[0];
            const total = dataset.data.reduce((a, b) => a + b, 0);
            
            return data.labels.map((label, i) => {
              const value = dataset.data[i];
              const percent = total > 0 ? ((value / total) * 100).toFixed(1) : 0;
              
              return {
                text: `${label}: ${percent}%`,
                fillStyle: dataset.backgroundColor[i],
                strokeStyle: 'transparent',
                lineWidth: 0,
                hidden: false,
                index: i
              };
            });
          }
          return [];
        },
        usePointStyle: true,
        padding: 20,
        boxWidth: 12,
        font: {
          size: 11
        }
      },
      maxWidth: 400,
      align: 'center',
      layout: {
        padding: {
          top: 10
        }
      }
    },
    tooltip: {
      callbacks: {
        label: function (context) {
          const value = context.raw;
          const total = context.dataset.data.reduce((a, b) => a + b, 0);
          const percent = total > 0 ? ((value / total) * 100).toFixed(1) : 0;
          return `${value} kg (${percent}%)`;
        }
      }
    }
  }
};

onMounted(async () => {
  try {
    const response = await fetch("http://localhost:8000/waste/collection", {
      headers: {
        "Authorization": `Bearer ${auth.token}`,
        "Accept": "application/json"
      }
    });
    const data = await response.json();

    if (data.success) {
      // On ne garde que les collectes du volunteer connecté
      userCollections.value = data.data.filter(c => c.user.id === auth.userId);

      // Calculate totals using same structure as admin
      const base = Object.fromEntries(Object.keys(TYPES).map(k => [k, 0]));
      
      userCollections.value.forEach(col => {
        col.waste_items.forEach(item => {
          const key = item.waste_type.value;
          if (key in base) {
            base[key] += Number(item.amount) || 0;
          }
        });
      });
      
      totals.value = base;
    }
  } catch (e) {
    console.error("Impossible de charger les waste collections :", e);
  }
});

const goToAddCollection = () => {
  router.push('/volunteer/collection/add');
};

const goToViewCollection = (id) => {
  router.push({
    path: '/volunteer/collection/view',
    query: { id }
  });
};
</script>