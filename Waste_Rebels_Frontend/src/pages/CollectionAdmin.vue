<template>
  <div class="min-h-screen bg-gray-50 px-4 py-6">
    <div class="w-full max-w-sm mx-auto space-y-8">
      <!-- Header Section -->
      <header class="space-y-6">
        <div class="flex justify-between items-center">
          <img src="../assets/logos/waste_rebels_logo.png" alt="Waste Rebels Logo" class="w-30 h-30">
          <div class="flex flex-col items-end space-y-2">
            <button @click="logout"
              class="px-4 py-2 bg-dark-blue text-white text-sm font-main font-medium rounded-md cursor-pointer">
              Log out
            </button>
            <h1 class="mt-8 text-sm font-medium font-main text-dark-blue">Hi Admin :)</h1>
          </div>
        </div>
      </header>

      <!-- Navigation Tabs -->
      <nav class="border-b-1 border-light-grey">
        <div class="flex justify-between items-center pb-3">
          <button @click="activeTab = 'dashboard'"
            :class="activeTab === 'dashboard' ? 'text-dark-blue' : 'text-light-blue'"
            class="font-medium font-main flex items-center space-x-2 cursor-pointer">
            <img v-if="activeTab === 'dashboard'" src="../assets/icons/dashboard_icon_dark_blue.png"
              alt="Dashboard icon" class="w-8 h-8">
            <img v-else src="../assets/icons/dashboard_icon_light_blue.png" alt="Dashboard icon" class="w-8 h-8">
            <span class="text-sm">Dashboard</span>
          </button>
          <button @click="activeTab = 'waste-collection'"
            :class="activeTab === 'waste-collection' ? 'text-dark-blue' : 'text-light-blue'"
            class="font-medium font-main flex items-center space-x-2 cursor-pointer">
            <img v-if="activeTab === 'waste-collection'"
              src="../assets/icons/waste_collection_management_icon_dark_blue.png" alt="Waste collection icon"
              class="w-8 h-8">
            <img v-else src="../assets/icons/waste_collection_management_icon_light_blue.png"
              alt="Waste collection icon" class="w-8 h-8">
            <span class="text-sm">Waste collection management</span>
          </button>
        </div>
      </nav>

      <main id="admin-panel" class="space-y-6">
        <!-- City Filter -->
        <section id="filter-section">
          <h2 id="filter-heading" class="sr-only">Filter collection data by city</h2>
          <div class="space-y-2">
            <label for="city-filter" class="block text-dark-blue font-medium text-sm">Filter by city:</label>
            <select id="city-filter" name="city" v-model="selectedCity" @change="calculateTotals"
              class="w-full px-4 py-2 border border-light-grey rounded-lg bg-white font-main text-sm text-dark-blue focus:outline-none focus:ring-2 focus:ring-dark-blue focus:border-transparent">
              <option value="">All cities</option>
              <option v-for="c in cities" :key="c" :value="c">{{ c }}</option>
            </select>
          </div>
        </section>

        <!-- Dashboard Content -->
        <section v-if="activeTab === 'dashboard'">
          <h2 class="sr-only">Waste collection statistics by category</h2>
          <div class="grid grid-cols-2 gap-4">
            <!-- 6 cartes dynamiques -->
            <article v-for="type in displayOrder" :key="type"
              class="bg-white rounded-lg p-4 shadow-sm border border-light-grey">
              <div class="flex items-center space-x-3">
                <img :src="TYPES[type].icon" :alt="TYPES[type].label + ' icon'" class="w-10 h-10">
                <div>
                  <h3 class="text-sm font-main font-medium text-dark-blue">{{ TYPES[type].label }}</h3>
                  <p class="text-xs font-main text-dark-grey">{{ formatKg(totalsByType[type]) }} kg</p>
                </div>
              </div>
            </article>
          </div>

          <!-- Camembert graphique -->
          <div class="bg-white rounded-lg p-4 shadow-sm border border-light-grey mt-6">
            <h3 class="text-sm font-main font-medium text-dark-blue mb-4">Waste distribution</h3>
            <div class="h-64">
              <Pie :data="chartData" :options="chartOptions" />
            </div>
          </div>

          <!-- Graphique bars -->
          <div class="bg-white rounded-lg p-4 shadow-sm border border-light-grey mt-6">
            <h3 class="text-sm font-main font-medium text-dark-blue mb-4">Number of collections by city</h3>
            <div class="h-64">
              <Bar :data="barData" :options="barOptions" />
            </div>
          </div>
        </section>



        <!-- Waste Collection Content -->
        <section v-else-if="activeTab === 'waste-collection'" aria-labelledby="collections-heading">
          <div class="space-y-4">
            <!-- Total -->
            <h2 id="collections-heading" class="text-sm font-main font-medium text-dark-blue">
              Total number of waste collections : {{ filteredCollections.length }}
            </h2>

            <!-- Liste -->
            <h3 class="sr-only">List of waste collections</h3>
            <ul class="space-y-3" role="list">
              <li v-for="col in filteredCollections" :key="col.id">
                <article
                  class="bg-white rounded-lg p-4 shadow-sm border border-light-grey flex justify-between items-center">
                  <div>
                    <h4 class="text-sm font-main font-medium text-dark-blue">
                      Collection #{{ col.id }}
                    </h4>
                    <p class="text-xs font-main text-light-grey">
                      <span class="sr-only">Location:</span>
                      {{ col.location?.city || 'Unknown' }} –
                      <time :datetime="col.created_at">
                        {{ new Date(col.created_at).toLocaleDateString() }}
                      </time>
                    </p>
                  </div>
                  <button type="button" @click="goToViewCollection(col.id)" class="p-2 rounded-md cursor-pointer" aria-label="View details">
                    <img src="../assets/icons/see_collection_icon_dark_blue.png" alt="See icon" class="w-6 h-6">
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
import iconMetal from '../assets/icons/metal_icon_light_green.png';
import iconElectronic from '../assets/icons/electronic_icon_light_green.png';
import iconGlass from '../assets/icons/glass_icon_light_green.png';
import iconCigarette from '../assets/icons/cigarette_icon_light_green.png';
import iconPlastic from '../assets/icons/plastic_icon_light_green.png';
import iconOther from '../assets/icons/other_icon_light_green.png';

import { ref, onMounted } from 'vue';
import { useAuthStore } from '../stores/auth';
import { computed } from 'vue';

import { Pie, Bar } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js';

import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

ChartJS.register(Title, Tooltip, Legend, ArcElement, BarElement, CategoryScale, LinearScale);

const auth = useAuthStore();
const logout = () => auth.logout();

const activeTab = ref('dashboard');
const selectedCity = ref('');
const collections = ref([]);
const collectionId = route.query.id;


const TYPES = {
  glass: { label: 'Glass', icon: iconGlass },
  cigarettes: { label: 'Cigarettes', icon: iconCigarette },
  metal_waste: { label: 'Metal', icon: iconMetal },
  electronic_waste: { label: 'Electronic', icon: iconElectronic },
  plastic: { label: 'Plastic', icon: iconPlastic },
  others: { label: 'Other', icon: iconOther },
};
const displayOrder = ['glass', 'cigarettes', 'metal_waste', 'electronic_waste', 'others', 'plastic'];

const totalsByType = ref(Object.fromEntries(Object.keys(TYPES).map(k => [k, 0])));
const cities = ref([]);


const chartData = ref({
  labels: [],
  datasets: [{
    data: [],
    backgroundColor: ['#4f6d7a', '#56a3a6', '#c0d6df', '#dbe9ee', '#7fb685', '#dad873']
  }]
});

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: 'bottom' },
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

// Bar chart data
const barData = ref({
  labels: [],
  datasets: [{
    label: 'Collections',
    data: [],
    backgroundColor: ['#9CA3AF', '#10B981', '#1E3A8A', '#F59E0B', '#9333EA']
  }]
});

const barOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: true, position: 'top' }
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: { stepSize: 1 }
    }
  }
};

function formatKg(n) {
  const v = Number(n || 0);
  return v % 1 === 0 ? v.toString() : v.toFixed(1);
}

function calculateTotals() {
  const base = Object.fromEntries(Object.keys(TYPES).map(k => [k, 0]));
  const filtered = selectedCity.value
    ? collections.value.filter(c => c.location.city === selectedCity.value)
    : collections.value;

  // Totals per type
  for (const col of filtered) {
    for (const item of col.waste_items) {
      const key = item.waste_type.value;
      if (key in base) base[key] += Number(item.amount) || 0;
    }
  }
  totalsByType.value = base;

  // Update Pie chart
  chartData.value = {
    labels: displayOrder.map(k => TYPES[k].label),
    datasets: [{
      data: displayOrder.map(k => Number(base[k].toFixed(2))),
      backgroundColor: ['#4f6d7a', '#56a3a6', '#c0d6df', '#dbe9ee', '#7fb685', '#dad873']
    }]
  };

  // Update Bar chart -> totals per city
  const counts = {};
  for (const col of filtered) {
    const city = col.location?.city || 'Unknown';
    counts[city] = (counts[city] || 0) + 1;
  }

  barData.value = {
    labels: Object.keys(counts),
    datasets: [{
      label: 'Collections',
      data: Object.values(counts),
      backgroundColor: ['#9CA3AF', '#10B981', '#1E3A8A', '#F59E0B', '#9333EA']
    }]
  };
}

const filteredCollections = computed(() => {
  return selectedCity.value
    ? collections.value.filter(c => c.location?.city === selectedCity.value)
    : collections.value;
});

const goToViewCollection = (id) => {
  router.push({
    path: '/admin/collection/view',
    query: { id }
  });
};

onMounted(async () => {
  try {
    const res = await fetch('http://localhost:8000/waste/collection', {
      headers: {
        Authorization: `Bearer ${auth.token}`,
        Accept: 'application/json'
      }
    });

    const payload = await res.json();
    console.log("Payload reçu :", payload);

    // Ici on prend payload.data, pas payload
    const list = Array.isArray(payload.data) ? payload.data : [];
    console.log("Collections extraites :", list);

    collections.value = list;
    cities.value = [...new Set(list.map(c => c.location?.city).filter(Boolean))];
    calculateTotals();
  } catch (e) {
    console.error('Error loading collections:', e);
  }
});
</script>
