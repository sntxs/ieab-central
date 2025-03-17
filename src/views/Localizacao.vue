<template>
  <div class="bg-white">
    <!-- Hero Section -->
    <div class="relative w-full overflow-hidden">
      <img
        src="https://res.cloudinary.com/dgbo657qq/image/upload/v1742229774/Galeria4_x6qhjc.png"
        alt="Nossa Localização"
        class="w-full h-auto max-w-full object-contain"
      />
    </div>

    <!-- Filtros de Localização -->
    <div class="max-w-7xl mx-auto px-4 py-8">
      <div class="flex flex-wrap justify-center gap-4 mb-8">
        <button
          v-for="local in locais"
          :key="local"
          @click="localAtual = local"
          :class="[
            'px-4 py-2 rounded-full transition-colors',
            localAtual === local
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
          ]"
        >
          {{ local }}
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
        <!-- Informações de Localização -->
        <div>
          <h2 class="text-3xl font-bold mb-6 text-gray-800">
            Nossos Endereços
          </h2>

          <div class="space-y-6">
            <div class="flex items-start space-x-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="{1.5}"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z"
                />
              </svg>

              <div>
                <h3 class="font-bold text-gray-800 mb-1">Endereço</h3>
                <template v-if="localAtual === 'IEAB CG - Central'">
                  <p class="text-gray-600">- Rua 14 de Julho, 1152</p>
                  <p class="text-gray-600">- Bairro Centro</p>
                  <p class="text-gray-600">- Campo Grande - MS</p>
                  <p class="text-gray-600">- CEP: 79004-390</p>
                </template>
                <template v-else>
                  <p class="text-gray-600">
                    - R. Cel. Adão Ferreira da Silva Cabral, 178
                  </p>
                  <p class="text-gray-600">- Bairro Norte</p>
                  <p class="text-gray-600">- Campo Grande - MS</p>
                  <p class="text-gray-600">- CEP: 79034-061</p>
                </template>
              </div>
            </div>
            <div class="flex items-start space-x-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="{1.5}"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                />
              </svg>

              <div>
                <h3 class="font-bold text-gray-800 mb-1">Estacionamento</h3>
                <template v-if="localAtual === 'IEAB CG - Central'">
                  <p class="text-gray-600">- Estacionamento gratuito</p>
                </template>
                <template v-else>
                  <p class="text-gray-600">- Estacionamento livre na rua</p>
                </template>
              </div>
            </div>
          </div>
        </div>

        <!-- Mapa -->
        <div class="h-[500px] bg-gray-100 rounded-lg overflow-hidden shadow-lg">
          <iframe
            class="w-full h-full max-w-full object-contain"
            :src="mapaAtual"
            width="600"
            height="450"
            style="border: 0"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          >
          </iframe>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const locais = ["IEAB CG - Central", "IEAB CG - Norte"];
const localAtual = ref("IEAB CG - Central");

const mapaAtual = computed(() => {
  if (localAtual.value === "IEAB CG - Central") {
    return "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3737.8718161767883!2d-54.618226324894145!3d-20.470457355365387!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9486e61bfcb261f7%3A0x65837184a4649607!2sRua%2014%20de%20Julho%2C%201152%20-%20Centro%2C%20Campo%20Grande%20-%20MS%2C%2079004-390!5e0!3m2!1spt-BR!2sbr!4v1742235292440!5m2!1spt-BR!2sbr";
  } else {
    return "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2643.7727890366896!2d-54.5504044455806!3d-20.429869051360097!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9486e909de3f2d4d%3A0x2e4f5363d60f4eeb!2sR.%20Cel.%20Ad%C3%A3o%20Ferreira%20da%20Silva%20Cabral%2C%20178%20-%20Vila%20Danubio%20Azul%2C%20Campo%20Grande%20-%20MS%2C%2079034-061!5e0!3m2!1spt-BR!2sbr!4v1742234966525!5m2!1spt-BR!2sbr";
  }
});
</script>
