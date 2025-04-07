<template>
  <div class="bg-white">
    <!-- Hero Section -->
    <div class="relative w-full overflow-hidden">
      <img
        src="https://res.cloudinary.com/dgbo657qq/image/upload/v1742229774/Galeria3_uheogu.png"
        alt="Galeria de Fotos"
        class="w-full h-auto max-w-full object-contain"
      />
    </div>

    <!-- Filtros -->
    <div class="max-w-7xl mx-auto px-4 py-8">
      <div class="flex flex-wrap justify-center gap-4 mb-8">
        <button
          v-for="categoria in categorias"
          :key="categoria"
          @click="categoriaAtual = categoria"
          :class="[
            'px-4 py-2 rounded-full transition-colors',
            categoriaAtual === categoria
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
          ]"
        >
          {{ categoria }}
        </button>
      </div>

      <!-- Grid de Imagens -->
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
      >
        <div
          v-for="(foto, index) in fotosFiltradas"
          :key="index"
          @click="abrirModal(index)"
          class="relative group cursor-pointer overflow-hidden rounded-lg aspect-square"
        >
          <img
            :src="foto.url"
            :alt="foto.titulo"
            class="w-full h-full max-w-full object-contain transform transition-transform duration-300 group-hover:scale-110"
          />
          <div
            class="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-50 transition-opacity flex items-center justify-center"
          >
            <div
              class="text-white text-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <h3 class="text-lg font-bold">{{ foto.titulo }}</h3>
              <p class="text-sm">{{ foto.data }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de Visualização -->
    <div
      v-if="modalAberto"
      class="fixed inset-0 z-50 flex items-center justify-center bg-opacity-90"
      @click.self="fecharModal"
    >
      <button
        @click="fecharModal"
        class="absolute top-4 right-4 text-white hover:text-gray-300"
      >
        <XMarkIcon class="h-8 w-8" />
      </button>

      <button
        @click="imagemAnterior"
        class="absolute left-4 text-white hover:text-gray-300"
      >
        <ChevronLeftIcon class="h-8 w-8" />
      </button>

      <button
        @click="proximaImagem"
        class="absolute right-4 text-white hover:text-gray-300"
      >
        <ChevronRightIcon class="h-8 w-8" />
      </button>

      <div class="max-w-4xl mx-auto p-4">
        <img
          :src="fotosFiltradas[indiceAtual].url"
          :alt="fotosFiltradas[indiceAtual].titulo"
          class="max-h-[80vh] mx-auto"
        />
        <div class="text-white text-center mt-4">
          <h3 class="text-xl font-bold">
            {{ fotosFiltradas[indiceAtual].titulo }}
          </h3>
          <p class="text-sm mt-2">
            {{ fotosFiltradas[indiceAtual].descricao }}
          </p>
          <p class="text-sm mt-1">{{ fotosFiltradas[indiceAtual].data }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import {
  XMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/vue/24/outline";
import { db } from '../firebase/config';
import { collection, doc, getDocs, getDoc } from 'firebase/firestore';

const categorias = ref(["Todos", "Cultos", "Eventos", "Jovens", "Família", "Missões"]);
const categoriaAtual = ref("Todos");
const modalAberto = ref(false);
const indiceAtual = ref(0);
const fotos = ref([]);

// Carregar dados do Firebase
onMounted(async () => {
  try {
    // Carregar categorias
    const categoriasDoc = await getDoc(doc(db, 'galeria', 'categorias'));
    if (categoriasDoc.exists()) {
      const cats = categoriasDoc.data().lista;
      if (!cats.includes('Todos')) {
        cats.unshift('Todos');
      }
      categorias.value = cats;
    }
    
    // Carregar fotos
    const fotosSnapshot = await getDocs(collection(db, 'fotos'));
    fotos.value = fotosSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Erro ao carregar dados da galeria:', error);
  }

  // Adicionar eventos de teclado para navegação
  window.addEventListener("keydown", handleKeyDown);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeyDown);
});

const handleKeyDown = (e) => {
  if (!modalAberto.value) return;

  if (e.key === "Escape") fecharModal();
  if (e.key === "ArrowRight") proximaImagem();
  if (e.key === "ArrowLeft") imagemAnterior();
};

const fotosFiltradas = computed(() => {
  if (categoriaAtual.value === "Todos") {
    return fotos.value;
  }
  return fotos.value.filter((foto) => foto.categoria === categoriaAtual.value);
});

const abrirModal = (index) => {
  indiceAtual.value = index;
  modalAberto.value = true;
};

const fecharModal = () => {
  modalAberto.value = false;
};

const proximaImagem = () => {
  indiceAtual.value = (indiceAtual.value + 1) % fotosFiltradas.value.length;
};

const imagemAnterior = () => {
  indiceAtual.value =
    (indiceAtual.value - 1 + fotosFiltradas.value.length) %
    fotosFiltradas.value.length;
};
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
