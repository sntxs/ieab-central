<template>
  <div class="bg-white">
    <!-- Hero Section -->
    <div class="relative w-full overflow-hidden">
      <img
        src="https://res.cloudinary.com/dgbo657qq/image/upload/v1742229774/Galeria2_mwlkpy.png"
        alt="Eventos da Igreja"
        class="w-full h-auto max-w-full object-contain"
      />
    </div>

    <!-- Eventos em Destaque -->
    <section class="py-8 md:py-16">
      <div class="max-w-7xl mx-auto px-4">
        <h2
          class="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-800"
        >
          Próximos Eventos
        </h2>

        <!-- Filtro de Eventos -->
        <div class="flex flex-wrap justify-center mb-8 gap-2 px-2">
          <button
            v-for="categoria in categorias"
            :key="categoria"
            @click="filtroAtual = categoria"
            :class="[
              'px-3 py-1 md:px-4 md:py-2 rounded-full text-sm md:text-base transition-colors',
              filtroAtual === categoria
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
            ]"
          >
            {{ categoria }}
          </button>
        </div>

        <!-- Grid de Eventos -->
        <TransitionGroup
          name="fade"
          tag="div"
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8"
          :class="{ 'place-items-center': eventosFiltrados.length === 1 }"
        >
          <div
            v-for="evento in eventosFiltrados"
            :key="evento.id"
            class="bg-white rounded-lg shadow-lg overflow-hidden"
            :class="{
              'md:col-start-2 lg:col-start-2': eventosFiltrados.length === 1,
            }"
          >
            <img
              :src="evento.imagem"
              :alt="evento.titulo"
              class="w-full h-auto max-w-full object-contain"
            />
            <div class="p-4 md:p-6">
              <div class="flex items-center mb-2">
                <CalendarIcon
                  class="h-4 w-4 md:h-5 md:w-5 text-blue-600 mr-2"
                />
                <span class="text-xs md:text-sm text-gray-600">{{
                  evento.data
                }}</span>
              </div>
              <h3 class="text-lg md:text-xl font-bold mb-2 text-gray-800">
                {{ evento.titulo }}
              </h3>
              <p class="text-sm md:text-base text-gray-600 mb-4">
                {{ evento.descricao }}
              </p>
              <div class="flex items-center mb-2">
                <ClockIcon class="h-4 w-4 md:h-5 md:w-5 text-blue-600 mr-2" />
                <span class="text-xs md:text-sm text-gray-600">{{
                  evento.horario
                }}</span>
              </div>
              <div class="flex items-center mb-4">
                <MapPinIcon class="h-4 w-4 md:h-5 md:w-5 text-blue-600 mr-2" />
                <span class="text-xs md:text-sm text-gray-600">{{
                  evento.local
                }}</span>
              </div>
            </div>
          </div>
        </TransitionGroup>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { CalendarIcon, ClockIcon, MapPinIcon } from "@heroicons/vue/24/outline";
import { db } from '../firebase/config';
import { collection, getDocs } from 'firebase/firestore';

const filtroAtual = ref("Todos");
const categorias = ["Todos", "Cultos", "Jovens", "Família"];
const eventos = ref([]);

// Carregar eventos do Firebase
onMounted(async () => {
  try {
    const eventosSnapshot = await getDocs(collection(db, 'eventos'));
    eventos.value = eventosSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    // Atualizar categorias baseado nos eventos existentes
    const categoriasExistentes = ["Todos"];
    eventos.value.forEach(evento => {
      if (!categoriasExistentes.includes(evento.categoria)) {
        categoriasExistentes.push(evento.categoria);
      }
    });
    
    // Atualizar lista de categorias se houver novas
    if (categoriasExistentes.length > 1) {
      categorias.value = categoriasExistentes;
    }
  } catch (error) {
    console.error('Erro ao carregar eventos:', error);
  }
});

const eventosFiltrados = computed(() => {
  if (filtroAtual.value === "Todos") {
    return eventos.value;
  }
  return eventos.value.filter((evento) => evento.categoria === filtroAtual.value);
});
</script>

<style scoped>
.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.fade-leave-active {
  position: absolute;
}
</style>
