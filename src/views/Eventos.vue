<template>
  <div class="bg-white">
    <!-- Hero Section -->
    <div class="relative h-[300px]">
      <img
        src="https://res.cloudinary.com/dgbo657qq/image/upload/v1742229774/Galeria2_mwlkpy.png"
        alt="Eventos da Igreja"
        class="w-full h-100 object-cover"
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
              class="w-full h-70 object-cover"
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
import { ref, computed } from "vue";
import { CalendarIcon, ClockIcon, MapPinIcon } from "@heroicons/vue/24/outline";

const filtroAtual = ref("Todos");
const categorias = ["Todos", "Cultos", "Jovens", /* , "Família" */];

const eventos = [
  {
    id: 1,
    titulo: "Culto de Celebração",
    descricao:
      "Venha celebrar conosco neste domingo especial com muita adoração e palavra.",
    data: "Todos os Domingos",
    horario: "18:00",
    local: "Templo Principal",
    categoria: "Cultos",
    imagem:
      "https://res.cloudinary.com/dgbo657qq/image/upload/v1742229075/2_jbq7n7.png",
  },
  {
    id: 2,
    titulo: "Culto Máscaras",
    descricao:
      "Uma noite especial para juventude com louvor, dinâmicas e muito mais.",
    data: "29/03/2024",
    horario: "19:00",
    local: "Rua: Cel. Adão Ferreira da Silva Cabral, 178 - Danúbio Azul",
    categoria: "Jovens",
    imagem:
      "https://res.cloudinary.com/dgbo657qq/image/upload/v1742229075/3_wfquuo.png",
  },
  /*   {
    id: 3,
    titulo: "Retiro de Famílias",
    descricao: "Um fim de semana especial para fortalecer os laços familiares.",
    data: "20/04/2024",
    horario: "08:00",
    local: "Chácara Recanto",
    categoria: "Família",
    imagem: "https://placehold.co/600x400",
  }, */
];

const eventosFiltrados = computed(() => {
  if (filtroAtual.value === "Todos") {
    return eventos;
  }
  return eventos.filter((evento) => evento.categoria === filtroAtual.value);
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
