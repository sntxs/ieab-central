<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Gerenciar Eventos</h1>
      <button 
        @click="mostrarFormEvento(null)" 
        class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Adicionar Evento
      </button>
    </div>

    <!-- Mensagem de sucesso -->
    <div v-if="successMessage" class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
      {{ successMessage }}
    </div>

    <!-- Filtro de categorias -->
    <div class="flex flex-wrap mb-6 gap-2 px-2">
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

    <!-- Lista de eventos -->
    <div class="grid grid-cols-1 gap-6">
      <div 
        v-for="evento in eventosFiltrados" 
        :key="evento.id" 
        class="bg-white p-6 rounded-lg shadow-lg"
      >
        <div class="flex items-start justify-between">
          <div class="flex-1">
            <h2 class="text-xl font-bold mb-2">{{ evento.titulo }}</h2>
            <div class="flex items-center mb-2">
              <div class="text-sm text-gray-600 mr-4">
                <span class="font-bold">Data:</span> {{ evento.data }}
              </div>
              <div class="text-sm text-gray-600">
                <span class="font-bold">Horário:</span> {{ evento.horario }}
              </div>
            </div>
            <div class="text-sm text-gray-600 mb-2">
              <span class="font-bold">Local:</span> {{ evento.local }}
            </div>
            <div class="text-sm text-gray-600 mb-2">
              <span class="font-bold">Categoria:</span> {{ evento.categoria }}
            </div>
            <p class="text-gray-600 mt-2">{{ evento.descricao }}</p>
          </div>
          <div class="ml-4">
            <img 
              :src="evento.imagem" 
              :alt="evento.titulo" 
              class="w-32 h-auto rounded"
            />
          </div>
        </div>
        <div class="flex justify-end mt-4">
          <button 
            @click="mostrarFormEvento(evento)" 
            class="mr-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded text-sm focus:outline-none focus:shadow-outline"
          >
            Editar
          </button>
          <button 
            @click="excluirEvento(evento.id)" 
            class="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-3 rounded text-sm focus:outline-none focus:shadow-outline"
          >
            Excluir
          </button>
        </div>
      </div>
    </div>

    <!-- Mensagem se não houver eventos -->
    <div v-if="eventosFiltrados.length === 0" class="text-center py-10">
      <p class="text-gray-600">Nenhum evento encontrado para esta categoria.</p>
    </div>

    <!-- Modal para adicionar/editar evento -->
    <div v-if="showEventoModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 w-full max-w-2xl">
        <h2 class="text-xl font-bold mb-4">{{ eventoEmEdicao ? 'Editar' : 'Adicionar' }} Evento</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2">Título</label>
            <input
              v-model="formEvento.titulo"
              type="text"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            >
          </div>
          
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2">Categoria</label>
            <select
              v-model="formEvento.categoria"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            >
              <option v-for="categoria in categoriaOptions" :key="categoria" :value="categoria">{{ categoria }}</option>
            </select>
          </div>
          
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2">Data</label>
            <input
              v-model="formEvento.data"
              type="text"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Ex: 10/06/2024 ou Todos os Domingos"
              required
            >
          </div>
          
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2">Horário</label>
            <input
              v-model="formEvento.horario"
              type="text"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Ex: 19:00"
              required
            >
          </div>
          
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2">Local</label>
            <input
              v-model="formEvento.local"
              type="text"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            >
          </div>
          
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2">URL da Imagem</label>
            <input
              v-model="formEvento.imagem"
              type="text"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            >
          </div>
          
          <div class="mb-4 md:col-span-2">
            <label class="block text-gray-700 text-sm font-bold mb-2">Descrição</label>
            <textarea
              v-model="formEvento.descricao"
              rows="3"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            ></textarea>
          </div>
        </div>
        
        <div class="flex justify-end">
          <button 
            @click="showEventoModal = false" 
            class="mr-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Cancelar
          </button>
          <button 
            @click="salvarEvento" 
            class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            :disabled="loading"
          >
            <span v-if="loading">Salvando...</span>
            <span v-else>Salvar</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { db } from '../../firebase/config';
import { 
  collection, doc, getDocs, addDoc, updateDoc, deleteDoc,
  query, where 
} from 'firebase/firestore';

const filtroAtual = ref("Todos");
const categorias = ["Todos", "Cultos", "Jovens", "Família"];
const categoriaOptions = ["Cultos", "Jovens", "Família"];
const eventos = ref([]);
const loading = ref(false);
const successMessage = ref('');
const showEventoModal = ref(false);
const eventoEmEdicao = ref(null);

// Form para adicionar/editar evento
const formEvento = ref({
  titulo: '',
  descricao: '',
  data: '',
  horario: '',
  local: '',
  categoria: 'Cultos',
  imagem: 'https://placehold.co/600x400'
});

const eventosFiltrados = computed(() => {
  if (filtroAtual.value === "Todos") {
    return eventos.value;
  }
  return eventos.value.filter(evento => evento.categoria === filtroAtual.value);
});

// Carregar eventos do Firebase
onMounted(async () => {
  await carregarEventos();
});

async function carregarEventos() {
  try {
    const eventosSnapshot = await getDocs(collection(db, 'eventos'));
    eventos.value = eventosSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Erro ao carregar eventos:', error);
  }
}

function mostrarFormEvento(evento) {
  if (evento) {
    eventoEmEdicao.value = evento;
    formEvento.value = { ...evento };
  } else {
    eventoEmEdicao.value = null;
    formEvento.value = {
      titulo: '',
      descricao: '',
      data: '',
      horario: '',
      local: '',
      categoria: 'Cultos',
      imagem: 'https://placehold.co/600x400'
    };
  }
  showEventoModal.value = true;
}

async function salvarEvento() {
  loading.value = true;
  try {
    if (eventoEmEdicao.value) {
      // Atualizar evento existente
      const eventoRef = doc(db, 'eventos', eventoEmEdicao.value.id);
      await updateDoc(eventoRef, formEvento.value);
      
      // Atualizar na lista local
      const index = eventos.value.findIndex(e => e.id === eventoEmEdicao.value.id);
      if (index !== -1) {
        eventos.value[index] = { id: eventoEmEdicao.value.id, ...formEvento.value };
      }
      
      mostrarMensagemSucesso('Evento atualizado com sucesso!');
    } else {
      // Adicionar novo evento
      const docRef = await addDoc(collection(db, 'eventos'), formEvento.value);
      eventos.value.push({ id: docRef.id, ...formEvento.value });
      mostrarMensagemSucesso('Evento adicionado com sucesso!');
    }
    
    showEventoModal.value = false;
  } catch (error) {
    console.error('Erro ao salvar evento:', error);
  } finally {
    loading.value = false;
  }
}

async function excluirEvento(id) {
  if (confirm('Tem certeza que deseja excluir este evento?')) {
    try {
      await deleteDoc(doc(db, 'eventos', id));
      eventos.value = eventos.value.filter(evento => evento.id !== id);
      mostrarMensagemSucesso('Evento excluído com sucesso!');
    } catch (error) {
      console.error('Erro ao excluir evento:', error);
    }
  }
}

function mostrarMensagemSucesso(mensagem) {
  successMessage.value = mensagem;
  setTimeout(() => {
    successMessage.value = '';
  }, 3000);
}
</script> 