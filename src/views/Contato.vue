<template>
  <div class="bg-white">
    <!-- Hero Section -->
    <div class="relative h-[300px]">
      <img src="https://placehold.co/1920x600" alt="Entre em Contato" class="w-full h-full object-cover" />
      <div class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <h1 class="text-4xl md:text-5xl text-white font-bold">Entre em Contato</h1>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 py-16">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
        <!-- Informações de Contato -->
        <div>
          <h2 class="text-3xl font-bold mb-8 text-gray-800">Fale Conosco</h2>

          <div class="space-y-6 mb-8">
            <div class="flex items-center space-x-4">
              <PhoneIcon class="h-6 w-6 text-blue-600" />
              <div>
                <h3 class="font-bold text-gray-800">Telefone</h3>
                <p class="text-gray-600">(67) 99113-7181</p>
              </div>
            </div>

            <div class="flex items-center space-x-4">
              <EnvelopeIcon class="h-6 w-6 text-blue-600" />
              <div>
                <h3 class="font-bold text-gray-800">E-mail</h3>
                <p class="text-gray-600">ieabcentral@gmail.com</p>
              </div>
            </div>

            <div class="flex items-center space-x-4">
              <ChatBubbleLeftIcon class="h-6 w-6 text-blue-600" />
              <div>
                <h3 class="font-bold text-gray-800">WhatsApp</h3>
                <p class="text-gray-600">(67) 99113-7181</p>
              </div>
            </div>
          </div>
          <!-- Redes Sociais -->
          <div>
            <h3 class="text-xl font-bold mb-4 text-gray-800">Redes Sociais</h3>
            <div class="flex space-x-4">

              <!-- Facebook -->
              <a href="https://www.facebook.com/share/1BHCryRw7a/" class="p-2 rounded-full" target="_blank">
                <svg id="facebookIcon" class="h-8 w-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path
                    d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5V334.2H141.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287V510.1C413.8 494.8 512 386.9 512 256h0z" />
                </svg>
              </a>

              <!-- Instagram -->
              <a href="https://www.instagram.com/ieabcgcentral" class="p-2 rounded-full" target="_blank">
                <svg id="instagramIcon" class="h-8 w-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                  <path
                    d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <!-- Formulário de Contato -->
        <div class="bg-gray-50 p-8 rounded-lg shadow-lg">
          <h3 class="text-2xl font-bold mb-6 text-gray-800">Envie sua Mensagem</h3>
          <form @submit.prevent="enviarMensagem" class="space-y-6">
            <div>
              <label for="nome" class="block text-sm font-medium text-gray-700 mb-1">Nome</label>
              <input type="text" id="nome" v-model="form.nome"
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required />
            </div>

            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
              <input type="email" id="email" v-model="form.email"
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required />
            </div>

            <div>
              <label for="telefone" class="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
              <input type="tel" id="telefone" v-model="form.telefone"
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
            </div>

            <div>
              <label for="assunto" class="block text-sm font-medium text-gray-700 mb-1">Assunto</label>
              <select id="assunto" v-model="form.assunto"
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required>
                <option value="">Selecione um assunto</option>
                <option value="informacoes">Informações Gerais</option>
                <option value="oracao">Pedido de Oração</option>
                <option value="visita">Agendar Visita</option>
                <option value="outros">Outros</option>
              </select>
            </div>

            <div>
              <label for="mensagem" class="block text-sm font-medium text-gray-700 mb-1">Mensagem</label>
              <textarea id="mensagem" v-model="form.mensagem" rows="4"
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required></textarea>
            </div>

            <button type="submit"
              class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
              Enviar Mensagem
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import {
  PhoneIcon,
  EnvelopeIcon,
  ChatBubbleLeftIcon
} from '@heroicons/vue/24/outline'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const form = ref({
  nome: '',
  email: '',
  telefone: '',
  assunto: '',
  mensagem: ''
})

const enviarMensagem = () => {
  // Aqui você implementará a lógica para enviar a mensagem
  console.log('Mensagem enviada:', form.value)
  // Resetar formulário após envio
  form.value = {
    nome: '',
    email: '',
    telefone: '',
    assunto: '',
    mensagem: ''
  }
  alert('Mensagem enviada com sucesso!')
}
</script>

<style scoped>
#facebookIcon {
  fill: #1877F2;
  transition: fill 0.3s ease, transform 0.3s ease;
}

#facebookIcon:hover {
  transform: scale(1.1);
  fill: #052e63;
}

#instagramIcon {
  fill: #E1306C;
  transition: fill 0.3s ease, transform 0.3s ease;
}

#instagramIcon:hover {
  transform: scale(1.1);
  fill: #7e0e33;
}
</style>