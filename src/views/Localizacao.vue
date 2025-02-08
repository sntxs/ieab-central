<template>
  <div class="bg-white">
    <!-- Hero Section -->
    <div class="relative h-[300px]">
      <img src="https://placehold.co/1920x600" alt="Nossa Localização" class="w-full h-full object-cover" />
      <div class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <h1 class="text-4xl md:text-5xl text-white font-bold">Como Chegar</h1>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 py-16">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
        <!-- Informações de Localização -->
        <div>
          <h2 class="text-3xl font-bold mb-6 text-gray-800">Nosso Endereço</h2>

          <div class="space-y-6">
            <div class="flex items-start space-x-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                stroke="currentColor" class="size-6">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z" />
              </svg>

              <div>
                <h3 class="font-bold text-gray-800 mb-1">Endereço</h3>
                <p class="text-gray-600">- Rua 14 de Julho, 1152</p>
                <p class="text-gray-600">- Bairro Centro</p>
                <p class="text-gray-600">- Campo Grande - MS</p>
                <p class="text-gray-600">- CEP: 79004-390</p>
              </div>
            </div>
            <div class="flex items-start space-x-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                stroke="currentColor" class="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />

                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
              </svg>

              <div>
                <h3 class="font-bold text-gray-800 mb-1">Estacionamento</h3>
                <p class="text-gray-600">- Estacionamento gratuito</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Mapa -->
        <div class="h-[500px] bg-gray-100 rounded-lg overflow-hidden shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3046.754792069829!2d-54.618226325752964!3d-20.47046238104276!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9486e61bfcb261f7%3A0x65837184a4649607!2sRua%2014%20de%20Julho%2C%201152%20-%20Centro%2C%20Campo%20Grande%20-%20MS%2C%2079004-390!5e1!3m2!1spt-BR!2sbr!4v1739047467912!5m2!1spt-BR!2sbr"
            width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"
            referrerpolicy="no-referrer-when-downgrade">
          </iframe>
        </div>
      </div>
    </div>
  </div>
</template>
