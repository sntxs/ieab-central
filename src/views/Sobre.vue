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
              {{ historia.titulo }}
            </h2>
            <p class="text-gray-600 mb-4">
              {{ historia.paragrafo1 }}
            </p>
            <p class="text-gray-600 mb-4">
              {{ historia.paragrafo2 }}
            </p>
          </div>
          <div class="relative w-full overflow-hidden rounded-lg">
            <img
              :src="historia.imagemUrl"
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
import { ref, computed, onMounted } from "vue";
import {
  HeartIcon,
  UserGroupIcon,
  HandRaisedIcon,
} from "@heroicons/vue/24/outline";
import { db } from '../firebase/config';
import { collection, doc, getDocs, getDoc } from 'firebase/firestore';

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

// História da Igreja
const historia = ref({
  titulo: "Nossa História",
  paragrafo1: "Fundada em 1990, nossa igreja nasceu do sonho de criar um espaço acolhedor onde pessoas pudessem encontrar esperança e propósito através da fé em Cristo.",
  paragrafo2: "Ao longo dos anos, crescemos de um pequeno grupo de fiéis para uma comunidade vibrante e diversificada, sempre mantendo nossos valores fundamentais de amor, compaixão e serviço ao próximo.",
  imagemUrl: "https://res.cloudinary.com/dgbo657qq/image/upload/v1742229075/1_clr136.png"
});

// Líderes
const lideres = ref([]);

// Carregar dados do Firebase
onMounted(async () => {
  try {
    // Carregar história
    const historiaDoc = await getDoc(doc(db, 'sobre', 'historia'));
    if (historiaDoc.exists()) {
      historia.value = historiaDoc.data();
    }
    
    // Carregar líderes
    const lideresSnapshot = await getDocs(collection(db, 'lideres'));
    lideres.value = lideresSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Erro ao carregar dados:', error);
  }
});

const lideresFilterados = computed(() => {
  return lideres.value.filter(
    (lider) => 
      lider.categoria === categoriaAtual.value && 
      lider.igreja === igrejaAtual.value
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
