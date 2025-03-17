<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Navbar -->
    <nav class="bg-white shadow-lg fixed w-full z-50">
      <div class="max-w-7xl mx-auto px-4">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center">
            <a href="/">
              <img
                src="../src/assets/ieab-logo.png"
                alt="IEAB - Central"
                class="h-15 w-15 ml-2 text-xl font-bold text-gray-800"
              />
            </a>
          </div>

          <!-- Menu Desktop -->
          <div class="hidden md:flex items-center space-x-4">
            <router-link
              v-for="(link, index) in menuLinks"
              :key="index"
              :to="link.to"
              class="px-3 py-2 rounded-md text-sm font-medium text-gray-700 transition-all duration-200 ease-in-out hover:text-blue-600 hover:bg-blue-50 hover:scale-105"
              :class="{ 'text-blue-600 bg-blue-50': $route.path === link.to }"
            >
              {{ link.text }}
            </router-link>
          </div>

          <!-- Menu Mobile -->
          <div class="md:hidden">
            <button @click="toggleMenu" class="text-gray-600">
              <Bars3Icon v-if="!isMenuOpen" class="h-6 w-6" />
              <XMarkIcon v-else class="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      <!-- Menu Mobile Dropdown -->
      <div
        v-if="isMenuOpen"
        class="md:hidden fixed w-full bg-white border-t border-gray-200 transition-all duration-300 ease-in-out"
        :class="
          isMenuOpen
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 -translate-y-full'
        "
      >
        <div class="px-4 py-2 space-y-2">
          <router-link
            v-for="(link, index) in menuLinks"
            :key="index"
            :to="link.to"
            class="block px-4 py-3 rounded-md text-base font-medium text-gray-700 transition-all duration-200 ease-in-out hover:text-blue-600 hover:bg-blue-50"
            :class="{ 'text-blue-600 bg-blue-50': $route.path === link.to }"
            @click="toggleMenu"
          >
            {{ link.text }}
          </router-link>
        </div>
      </div>
    </nav>

    <!-- Conteúdo Principal -->
    <main class="pt-16">
      <router-view></router-view>
    </main>

    <!-- Footer -->
    <footer class="bg-gradient-to-b from-gray-800 to-gray-900 text-white">
      <div class="max-w-7xl mx-auto px-4 py-12">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div class="text-center md:text-left">
            <h3 class="text-2xl font-bold mb-4 text-blue-400">
              IEAB - Central
            </h3>
            <p class="text-gray-300 leading-relaxed">
              Unidos em fé e amor, construindo uma comunidade que transforma
              vidas através do evangelho de Cristo.
            </p>
          </div>
          <div class="text-center md:text-left">
            <h3 class="text-xl font-bold mb-4 text-blue-400">Menus</h3>
            <ul class="space-y-2">
              <li>
                <a
                  href="/eventos"
                  class="text-gray-300 hover:text-white transition-colors duration-200"
                  >Eventos</a
                >
              </li>
              <li>
                <a
                  href="https://wa.me/5567991137181?text=Ol%C3%A1%2C%20Pastore%20Jocemiro%2C%20estou%20entrando%20em%20contato%2C%20pois%20eu%20gostaria%20de%20fazer%20uma%20doa%C3%A7%C3%A3o.
"
                  class="text-gray-300 hover:text-white transition-colors duration-200"
                  target="_blank"
                  >Doações</a
                >
              </li>
              <li>
                <a
                  href="https://wa.me/5567991137181?text=Ol%C3%A1%2C%20Pastore%20Jocemiro%2C%20estou%20entrando%20em%20contato%2C%20pois%20eu%20gostaria%20de%20servir.
"
                  class="text-gray-300 hover:text-white transition-colors duration-200"
                  target="_blank"
                  >Voluntariado</a
                >
              </li>
            </ul>
          </div>
          <div class="text-center md:text-left">
            <h3 class="text-xl font-bold mb-4 text-blue-400">Contato</h3>
            <div class="space-y-3">
              <p
                class="text-gray-300 flex items-center justify-center md:justify-start"
              >
                <PhoneIcon class="h-5 w-5 mr-3 text-blue-400" />
                (67) 99113-7181
              </p>
              <p
                class="text-gray-300 flex items-center justify-center md:justify-start"
              >
                <EnvelopeIcon class="h-5 w-5 mr-3 text-blue-400" />
                <a
                  href="mailto:ieabcentral@gmail.com"
                  class="text-gray-300 hover:text-white transition-colors duration-200"
                  >ieabcentral@gmail.com</a
                >
              </p>
              <p
                class="text-gray-300 flex items-center justify-center md:justify-start"
              >
                <MapPinIcon class="h-8 w-8 mr-3 text-blue-400" />
                Rua 14 de Julho, 1152 - Centro - Campo Grande - MS
              </p>
              <p
                class="text-gray-300 flex items-center justify-center md:justify-start"
              >
                <MapPinIcon class="h-14 w-14 mr-3 text-blue-400" />
                Rua Cel. Adão Ferreira da Silva Cabral, 178 - Vila Danubio Azul
                - Campo Grande - MS
              </p>
            </div>
          </div>

          <div class="text-center md:text-left">
            <h3 class="text-xl font-bold text-blue-400">Redes Sociais</h3>
            <p class="text-gray-300 mb-4">Nos siga em nossas midias sociais</p>
            <div class="flex justify-center md:justify-start space-x-4">
              <!-- Facebook -->
              <a
                href="https://www.facebook.com/share/1BHCryRw7a/"
                class="p-2 rounded-full"
                target="_blank"
              >
                <svg
                  id="faceIcon"
                  class="h-8 w-8"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5V334.2H141.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287V510.1C413.8 494.8 512 386.9 512 256h0z"
                  />
                </svg>
              </a>
              <!-- Instagram -->
              <a
                href="https://www.instagram.com/ieabcgcentral"
                class="p-2 rounded-full"
                target="_blank"
              >
                <svg
                  id="instaIcon"
                  class="h-8 w-8"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <path
                    d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div class="border-t border-gray-700 mt-12 pt-8 text-center">
          <p class="text-sm text-gray-400">
            &copy; 2025 IEAB - Central. Todos os direitos reservados.
          </p>
          <p class="text-gray-500 text-xs">
            Desenvolvido por
            <a
              href="https://nata-portifolio.vercel.app"
              target="_blank"
              class="hover:text-[#FFF] transition-colors"
              >© {{ currentYear }} NR.dev</a
            >
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from "vue";
import {
  Bars3Icon,
  XMarkIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
} from "@heroicons/vue/24/outline";

const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const menuLinks = [
  { text: "INÍCIO", to: "/" },
  { text: "SOBRE NÓS", to: "/sobre" },
  { text: "EVENTOS", to: "/eventos" },
  { text: "GALERIA", to: "/galeria" },
  { text: "LOCALIZAÇÃO", to: "/localizacao" },
  { text: "CONTATO", to: "/contato" },
];
</script>
<style scoped>
#faceIcon {
  fill: #1877f2;
  transition: fill 0.3s ease, transform 0.3s ease;
}

#faceIcon:hover {
  transform: scale(1.1);
  fill: #1077ff;
}

#instaIcon {
  fill: #e1306c;
  transition: fill 0.3s ease, transform 0.3s ease;
}

#instaIcon:hover {
  transform: scale(1.1);
  fill: #ff0055;
}
</style>
