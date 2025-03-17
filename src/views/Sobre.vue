<template>
  <div class="bg-white">
    <!-- Hero Section -->
    <div class="relative w-full overflow-hidden">
      <img
        src="https://res.cloudinary.com/dgbo657qq/image/upload/v1742229774/Galeria1_cg3cht.png"
        alt="Igreja"
        class="w-full h-auto max-w-full object-contain"
      />
    </div>

    <!-- História -->
    <section class="py-16">
      <div class="max-w-7xl mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 class="text-3xl font-bold mb-6 text-gray-800">
              Nossa História
            </h2>
            <p class="text-gray-600 mb-4">
              Fundada em 1990, nossa igreja nasceu do sonho de criar um espaço
              acolhedor onde pessoas pudessem encontrar esperança e propósito
              através da fé em Cristo.
            </p>
            <p class="text-gray-600 mb-4">
              Ao longo dos anos, crescemos de um pequeno grupo de fiéis para uma
              comunidade vibrante e diversificada, sempre mantendo nossos
              valores fundamentais de amor, compaixão e serviço ao próximo.
            </p>
          </div>
          <div class="relative w-full overflow-hidden rounded-lg">
            <img
              src="https://res.cloudinary.com/dgbo657qq/image/upload/v1742229075/1_clr136.png"
              alt="História da Igreja"
              class="w-full h-auto max-w-full object-contain"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Valores -->
    <section class="py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12 text-gray-800">
          Nossos Valores
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-white p-6 rounded-lg shadow-md text-center">
            <div class="flex justify-center mb-4">
              <HeartIcon class="h-12 w-12 text-blue-600" />
            </div>
            <h3 class="text-xl font-bold mb-3 text-gray-800">Amor</h3>
            <p class="text-gray-600">
              Acreditamos que o amor é a base de tudo o que fazemos, seguindo o
              exemplo de Cristo.
            </p>
          </div>

          <div class="bg-white p-6 rounded-lg shadow-md text-center">
            <div class="flex justify-center mb-4">
              <UserGroupIcon class="h-12 w-12 text-blue-600" />
            </div>
            <h3 class="text-xl font-bold mb-3 text-gray-800">Comunidade</h3>
            <p class="text-gray-600">
              Valorizamos a união e o apoio mútuo entre todos os membros de
              nossa igreja.
            </p>
          </div>

          <div class="bg-white p-6 rounded-lg shadow-md text-center">
            <div class="flex justify-center mb-4">
              <HandRaisedIcon class="h-12 w-12 text-blue-600" />
            </div>
            <h3 class="text-xl font-bold mb-3 text-gray-800">Serviço</h3>
            <p class="text-gray-600">
              Dedicamo-nos a servir a Deus e ao próximo com humildade e
              dedicação.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Liderança -->
    <section class="py-16">
      <div class="max-w-7xl mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12 text-gray-800">
          Nossa Liderança
        </h2>

        <!-- Filtro de Igreja -->
        <div class="flex flex-wrap justify-center gap-4 mb-8">
          <button
            v-for="igreja in igrejas"
            :key="igreja"
            @click="igrejaAtual = igreja"
            :class="[
              'px-4 py-2 rounded-full transition-colors',
              igrejaAtual === igreja
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
            ]"
          >
            {{ igreja }}
          </button>
        </div>

        <!-- Filtro de Liderança -->
        <div class="flex flex-wrap justify-center mb-8 gap-2 px-2">
          <button
            v-for="categoria in categorias"
            :key="categoria"
            @click="categoriaAtual = categoria"
            :class="[
              'px-3 py-1 md:px-4 md:py-2 rounded-full text-sm md:text-base transition-colors',
              categoriaAtual === categoria
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
            ]"
          >
            {{ categoria }}
          </button>
        </div>

        <!-- Grid de Líderes -->
        <TransitionGroup
          name="fade"
          tag="div"
          class="grid grid-cols-1 md:grid-cols-3 gap-8"
          :class="{ 'place-items-center': lideresFilterados.length === 1 }"
        >
          <div
            v-for="(lider, index) in lideresFilterados"
            :key="lider.nome"
            class="text-center"
            :class="{ 'md:col-start-2': lideresFilterados.length === 1 }"
          >
            <div class="relative w-48 h-48 mx-auto mb-4">
              <img
                :src="lider.foto"
                :alt="lider.nome"
                class="w-full h-full object-cover rounded-full"
              />
            </div>
            <h3 class="text-xl font-bold mb-2 text-gray-800">
              {{ lider.nome }}
            </h3>
            <p class="text-gray-600">{{ lider.cargo }}</p>
          </div>
        </TransitionGroup>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import {
  HeartIcon,
  UserGroupIcon,
  HandRaisedIcon,
} from "@heroicons/vue/24/outline";

const igrejas = ["IEAB CG - Central", "IEAB CG - Norte"];
const igrejaAtual = ref("IEAB CG - Central");
const categorias = [
  "Pastoreio",
  "Presbitério",
  "Missionários",
  "Líderes",
  "Diaconia",
];
const categoriaAtual = ref("Pastoreio");

const liderescentral = [
  {
    nome: "Jocemiro Aparecido da Silva",
    cargo: "Pastor Principal",
    foto: "https://placehold.co/200x200",
    categoria: "Pastoreio",
  },
  {
    nome: "Dilson Júnior Machado",
    cargo: "Presbítero",
    foto: "https://placehold.co/200x200",
    categoria: "Presbitério",
  },
  {
    nome: "Arthur Lima da Costa",
    cargo: "Presbítero",
    foto: "https://placehold.co/200x200",
    categoria: "Presbitério",
  },

  // Líderes
  {
    nome: "Arthur Lima da Costa",
    cargo: "Assessor de Música",
    foto: "https://placehold.co/200x200",
    categoria: "Líderes",
  },
  {
    nome: "Dilson Júnior Machado",
    cargo: "Assessor de Adultos",
    foto: "https://placehold.co/200x200",
    categoria: "Líderes",
  },
  {
    nome: "Claudia Cristina",
    cargo: "Assessora de Adultos",
    foto: "https://placehold.co/200x200",
    categoria: "Líderes",
  },

  {
    nome: "Leonardo Zampiva",
    cargo: "Assessor de Jovens",
    foto: "https://placehold.co/200x200",
    categoria: "Líderes",
  },
  {
    nome: "Luciana Zampiva",
    cargo: "Assessora de Jovens",
    foto: "https://placehold.co/200x200",
    categoria: "Líderes",
  },

  // Missionário
/*   {
    nome: " ",
    cargo: "Missionária",
    foto: "https://placehold.co/200x200",
    categoria: "Missionários",
  }, */

  // Diaconia
  {
    nome: "Juvaldo",
    cargo: "Lider de Diaconia",
    foto: "https://placehold.co/200x200",
    categoria: "Diaconia",
  },
  {
    nome: "Rogério",
    cargo: "Diácono",
    foto: "https://placehold.co/200x200",
    categoria: "Diaconia",
  },
  {
    nome: "Ednil",
    cargo: "Diácono",
    foto: "https://placehold.co/200x200",
    categoria: "Diaconia",
  },
];

const lideresnorte = [
  {
    nome: "Luis",
    cargo: "Pastor Principal",
    foto: "https://placehold.co/200x200",
    categoria: "Pastoreio",
  },
  {
    nome: "Thamiris Veloso",
    cargo: "Missionária",
    foto: "https://placehold.co/200x200",
    categoria: "Missionários",
  },
];

const lideresFilterados = computed(() => {
  const lideresDaIgreja =
    igrejaAtual.value === "IEAB CG - Central" ? liderescentral : lideresnorte;
  return lideresDaIgreja.filter(
    (lider) => lider.categoria === categoriaAtual.value
  );
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
