<template>
  <div v-if="userLoaded" class="min-h-screen bg-gray-50">
    <!-- Top Bar -->
    <div class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <h1 class="text-xl font-semibold text-gray-900">IEAB Central - Admin</h1>
          </div>
          <div class="flex items-center">
            <router-link v-if="$route.path !== '/admin'" to="/admin"
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 mr-2">
              <svg class="h-5 w-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Dashboard
            </router-link>
            <button @click="logout"
              class="inline-flex cursor-pointer items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
              Sair
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Dashboard Cards (mostrado apenas na rota principal) -->
      <div v-if="$route.path === '/admin'">
        <!-- Grid de 3 cards principais -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- Card Sobre -->
          <router-link to="/admin/sobre"
            class="block p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
            <div class="flex items-center">
              <div class="flex-shrink-0 bg-blue-100 rounded-md p-3">
                <svg class="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div class="ml-4">
                <h3 class="text-lg font-medium text-gray-900">Sobre a Igreja</h3>
                <p class="mt-1 text-sm text-gray-500">Gerenciar história e líderes</p>
              </div>
            </div>
          </router-link>

          <!-- Card Eventos -->
          <router-link to="/admin/eventos"
            class="block p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
            <div class="flex items-center">
              <div class="flex-shrink-0 bg-green-100 rounded-md p-3">
                <svg class="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div class="ml-4">
                <h3 class="text-lg font-medium text-gray-900">Eventos</h3>
                <p class="mt-1 text-sm text-gray-500">Gerenciar eventos e programações</p>
              </div>
            </div>
          </router-link>

          <!-- Card Galeria -->
          <router-link to="/admin/galeria"
            class="block p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
            <div class="flex items-center">
              <div class="flex-shrink-0 bg-purple-100 rounded-md p-3">
                <svg class="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div class="ml-4">
                <h3 class="text-lg font-medium text-gray-900">Galeria</h3>
                <p class="mt-1 text-sm text-gray-500">Gerenciar fotos e categorias</p>
              </div>
            </div>
          </router-link>
        </div>

        <!-- Card Site Oficial centralizado -->
        <div class="mt-8 flex justify-center">
          <a href="/" target="_blank"
            class="w-full md:w-1/3 p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
            <div class="flex items-center justify-center">
              <div class="flex-shrink-0 bg-red-100 rounded-md p-3">
                <svg class="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <div class="ml-4">
                <h3 class="text-lg font-medium text-gray-900">Site Oficial</h3>
                <p class="mt-1 text-sm text-gray-500">Visualizar o site da igreja</p>
              </div>
            </div>
          </a>
        </div>
      </div>

      <!-- Conteúdo das rotas filhas -->
      <router-view v-else></router-view>
    </div>
  </div>
  <div v-else class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="animate-pulse text-gray-500">Carregando...</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { auth } from '../../firebase/config';
import { onAuthStateChanged, signOut } from 'firebase/auth';

const router = useRouter();
const userLoaded = ref(false);

onMounted(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    userLoaded.value = true;
    if (!user) {
      router.push('/admin/login');
    }
  });

  return () => unsubscribe();
});

const logout = async () => {
  try {
    await signOut(auth);
    router.push('/admin/login');
  } catch (error) {
    console.error('Erro ao fazer logout:', error);
  }
};
</script>