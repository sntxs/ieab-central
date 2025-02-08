<template>
  <div>
    <!-- Hero Section -->
    <div class="relative h-[600px]">
      <swiper :modules="modules" :slides-per-view="1" :loop="true" :autoplay="{
        delay: 3000,
        disableOnInteraction: false
      }" :pagination="{ clickable: true }" :navigation="true">
        <swiper-slide v-for="(slide, index) in slides" :key="index">
          <div class="relative h-[600px]">
            <img :src="slide.image" :alt="slide.title" class="absolute inset-0 w-full h-full object-cover" />
            <div class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-center">
              <div class="text-white">
                <h1 class="text-4xl md:text-6xl font-bold mb-4">{{ slide.title }}</h1>
                <p class="text-xl md:text-2xl">{{ slide.description }}</p>
              </div>
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>


    <!-- Calendário Mensal -->
    <section class="py-8 md:py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4">
        <h2 class="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-800">
          Programação Semanal
        </h2>
        <div class="bg-white rounded-lg shadow-lg p-4 md:p-6">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            <div v-for="evento in eventosRecorrentes" :key="evento.id" class="border-l-4 border-blue-600 pl-4">
              <!-- Titulo -->
              <h3 class="text-base md:text-lg font-bold text-gray-800 mb-2">{{ evento.titulo }}</h3>
              <!-- Data -->
              <div class="flex items-center mb-1">
                <CalendarIcon class="h-4 w-4 text-gray-600 mr-2" />
                <span class="text-xs md:text-sm text-gray-600">{{ evento.frequencia }}</span>
              </div>
              <!-- Endereço -->
              <div class="flex items-center mb-1">
                <MapIcon class="h-4 w-4 text-gray-600 mr-2" />
                <span class="text-xs md:text-sm text-gray-600">{{ evento.endereco }}</span>

              </div>
              <!-- Horario -->
              <div class="flex items-center">
                <ClockIcon class="h-4 w-4 text-gray-600 mr-2" />
                <span class="text-xs md:text-sm text-gray-600">{{ evento.horario }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination, Navigation, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { CalendarIcon, MapIcon, ClockIcon } from '@heroicons/vue/24/outline'


const modules = [Pagination, Navigation, Autoplay]

const slides = [
  {
    image: 'https://placehold.co/800x800',
    title: 'Bem-vindo à nossa Igreja',
    description: 'Um lugar de fé, amor e comunhão'
  },
  {
    image: 'https://placehold.co/800x800',
    title: 'Venha nos Conhecer',
    description: 'Cultos todos os domingos às 18h'
  },
  {
    image: 'https://placehold.co/800x800',
    title: 'Faça Parte da Nossa Família',
    description: 'Unidos em Cristo'
  }
]

const eventos = [
  {
    image: 'https://placehold.co/400x300',
    title: 'Culto de Celebração',
    description: 'Venha celebrar conosco neste domingo especial',
    date: '10/04/2024'
  },
  {
    image: 'https://placehold.co/400x300',
    title: 'Encontro de Jovens',
    description: 'Uma noite de louvor e comunhão',
    date: '15/04/2024'
  },
  {
    image: 'https://placehold.co/400x300',
    title: 'Escola Bíblica',
    description: 'Aprenda mais sobre a palavra de Deus',
    date: '20/04/2024'
  }
]

const eventosRecorrentes = [
  {
    id: 1,
    titulo: 'Culto de Celebração',
    endereco: 'Rua 14 de Julho, 1152',
    frequencia: 'Todos os domingos',
    horario: '18:00'
  },
  {
    id: 2,
    titulo: 'Culto de Oração',
    endereco: 'Rua 14 de Julho, 1152',
    frequencia: 'Todas as quartas',
    horario: '7:30 às 10:00'
  },
  {
    id: 3,
    titulo: 'Estudo Bíblico',
    endereco: 'Rua 14 de Julho, 1152',
    frequencia: 'Todas as quartas',
    horario: '19:30'
  },

  {
    id: 4,
    titulo: 'Reunião de Jovens',
    endereco: 'Rua 14 de Julho, 1152',
    frequencia: 'Todos os sábados',
    horario: '19:00'
  },


  {
    id: 5,
    titulo: 'Célula Monte Castelo',
    endereco: 'Rua Presidente Dutra, 33',
    frequencia: 'Todas as terças',
    horario: '19:30'
  },
  {
    id: 6,
    titulo: 'Célula Vila Almeida',
    endereco: 'Rua Fluminense, 101',
    frequencia: 'Todas as sextas',
    horario: '19:30'



  },

]
</script>