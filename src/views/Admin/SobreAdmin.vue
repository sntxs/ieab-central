<template>
  <div>
    <h1 class="text-2xl font-bold mb-6">Gerenciar Página Sobre</h1>

    <!-- Abas de navegação -->
    <div class="flex mb-6 border-b">
      <button 
        @click="activeTab = 'historia'" 
        :class="[
          'py-2 px-4 font-medium',
          activeTab === 'historia' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'
        ]"
      >
        História da Igreja
      </button>
      <button 
        @click="activeTab = 'lideres'" 
        :class="[
          'py-2 px-4 font-medium',
          activeTab === 'lideres' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'
        ]"
      >
        Líderes
      </button>
    </div>

    <!-- Mensagem de sucesso -->
    <div v-if="successMessage" class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
      {{ successMessage }}
    </div>

    <!-- Editar história -->
    <div v-if="activeTab === 'historia'" class="bg-white p-6 rounded-lg shadow-md">
      <h2 class="text-xl font-bold mb-4">História da Igreja</h2>
      
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2">Título</label>
        <input
          v-model="historiaData.titulo"
          type="text"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
      </div>
      
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2">Parágrafo 1</label>
        <textarea
          v-model="historiaData.paragrafo1"
          rows="3"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        ></textarea>
      </div>
      
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2">Parágrafo 2</label>
        <textarea
          v-model="historiaData.paragrafo2"
          rows="3"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        ></textarea>
      </div>
      
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2">URL da Imagem</label>
        <input
          v-model="historiaData.imagemUrl"
          type="text"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
      </div>
      
      <button 
        @click="salvarHistoria" 
        class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        :disabled="loading"
      >
        <span v-if="loading">Salvando...</span>
        <span v-else>Salvar Alterações</span>
      </button>
    </div>

    <!-- Gerenciar líderes -->
    <div v-if="activeTab === 'lideres'" class="bg-white p-6 rounded-lg shadow-md">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-bold">Líderes da Igreja</h2>
        <button 
          @click="mostrarFormLider(null)" 
          class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Adicionar Líder
        </button>
      </div>

      <!-- Filtro de Igreja -->
      <div class="flex flex-wrap justify-start gap-4 mb-8">
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
      <div class="flex flex-wrap mb-8 gap-2 px-2">
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

      <!-- Lista de líderes -->
      <div class="overflow-x-auto">
        <table class="min-w-full bg-white">
          <thead>
            <tr>
              <th class="py-2 px-4 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Nome</th>
              <th class="py-2 px-4 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Cargo</th>
              <th class="py-2 px-4 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Categoria</th>
              <th class="py-2 px-4 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="lider in lideresFilterados" :key="lider.id" class="border-b">
              <td class="py-2 px-4">{{ lider.nome }}</td>
              <td class="py-2 px-4">{{ lider.cargo }}</td>
              <td class="py-2 px-4">{{ lider.categoria }}</td>
              <td class="py-2 px-4">
                <button 
                  @click="mostrarFormLider(lider)" 
                  class="mr-2 text-blue-600 hover:text-blue-800"
                >
                  Editar
                </button>
                <button 
                  @click="confirmarExclusao(lider.id)" 
                  class="text-red-600 hover:text-red-800"
                >
                  Excluir
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal para adicionar/editar líder -->
    <div v-if="showLiderModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 class="text-xl font-bold mb-4">{{ liderEmEdicao ? 'Editar' : 'Adicionar' }} Líder</h2>
        
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2">Nome</label>
          <input
            v-model="formLider.nome"
            type="text"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
        </div>
        
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2">Cargo</label>
          <input
            v-model="formLider.cargo"
            type="text"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
        </div>
        
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2">Igreja</label>
          <select
            v-model="formLider.igreja"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option v-for="igreja in igrejas" :key="igreja" :value="igreja">{{ igreja }}</option>
          </select>
        </div>
        
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2">Categoria</label>
          <select
            v-model="formLider.categoria"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option v-for="categoria in categorias" :key="categoria" :value="categoria">{{ categoria }}</option>
          </select>
        </div>
        
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2">URL da Foto</label>
          <input
            v-model="formLider.foto"
            type="text"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
        </div>
        
        <div class="flex justify-end">
          <button 
            @click="showLiderModal = false" 
            class="mr-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Cancelar
          </button>
          <button 
            @click="salvarLider" 
            class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>

    <!-- Modal para confirmação de exclusão -->
    <ConfirmModal
      :show="showConfirmModal"
      :title="'Confirmar exclusão'"
      :message="'Tem certeza que deseja excluir este líder? Esta ação não pode ser desfeita.'"
      @confirm="confirmarExclusaoLider"
      @cancel="cancelarExclusao"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { db } from '../../firebase/config';
import { 
  collection, doc, getDocs, addDoc, updateDoc, deleteDoc, 
  query, where, getDoc, setDoc 
} from 'firebase/firestore';
import ConfirmModal from '../../components/ConfirmModal.vue';

const activeTab = ref('historia');
const loading = ref(false);
const successMessage = ref('');
const showLiderModal = ref(false);
const liderEmEdicao = ref(null);
const showConfirmModal = ref(false);
const itemIdParaExcluir = ref(null);

// História da igreja
const historiaData = ref({
  titulo: 'Nossa História',
  paragrafo1: 'Fundada em 1990, nossa igreja nasceu do sonho de criar um espaço acolhedor onde pessoas pudessem encontrar esperança e propósito através da fé em Cristo.',
  paragrafo2: 'Ao longo dos anos, crescemos de um pequeno grupo de fiéis para uma comunidade vibrante e diversificada, sempre mantendo nossos valores fundamentais de amor, compaixão e serviço ao próximo.',
  imagemUrl: 'https://res.cloudinary.com/dgbo657qq/image/upload/v1742229075/1_clr136.png'
});

// Líderes
const igrejas = ["IEAB CG - Central", "IEAB CG - Norte"];
const igrejaAtual = ref("IEAB CG - Central");
const categorias = ["Pastoreio", "Presbitério", "Missionários", "Líderes", "Diaconia"];
const categoriaAtual = ref("Pastoreio");
const lideres = ref([]);

// Form para adicionar/editar líder
const formLider = ref({
  nome: '',
  cargo: '',
  categoria: 'Pastoreio',
  igreja: 'IEAB CG - Central',
  foto: 'https://placehold.co/200x200'
});

const lideresFilterados = computed(() => {
  return lideres.value.filter(
    (lider) => lider.categoria === categoriaAtual.value && lider.igreja === igrejaAtual.value
  );
});

// Carregar dados iniciais
onMounted(async () => {
  await carregarHistoria();
  await carregarLideres();
});

// Funções para gerenciar a história
async function carregarHistoria() {
  try {
    const historiaDoc = await getDoc(doc(db, 'sobre', 'historia'));
    if (historiaDoc.exists()) {
      historiaData.value = historiaDoc.data();
    }
  } catch (error) {
    console.error('Erro ao carregar história:', error);
  }
}

async function salvarHistoria() {
  loading.value = true;
  try {
    await setDoc(doc(db, 'sobre', 'historia'), historiaData.value);
    mostrarMensagemSucesso('História atualizada com sucesso!');
  } catch (error) {
    console.error('Erro ao salvar história:', error);
  } finally {
    loading.value = false;
  }
}

// Funções para gerenciar líderes
async function carregarLideres() {
  try {
    const lideresSnapshot = await getDocs(collection(db, 'lideres'));
    lideres.value = lideresSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Erro ao carregar líderes:', error);
  }
}

function mostrarFormLider(lider) {
  if (lider) {
    liderEmEdicao.value = lider;
    formLider.value = { ...lider };
  } else {
    liderEmEdicao.value = null;
    formLider.value = {
      nome: '',
      cargo: '',
      categoria: categoriaAtual.value,
      igreja: igrejaAtual.value,
      foto: 'https://placehold.co/200x200'
    };
  }
  showLiderModal.value = true;
}

async function salvarLider() {
  try {
    if (liderEmEdicao.value) {
      // Atualizar líder existente
      const liderRef = doc(db, 'lideres', liderEmEdicao.value.id);
      await updateDoc(liderRef, formLider.value);
      
      // Atualizar na lista local
      const index = lideres.value.findIndex(l => l.id === liderEmEdicao.value.id);
      if (index !== -1) {
        lideres.value[index] = { id: liderEmEdicao.value.id, ...formLider.value };
      }
      
      mostrarMensagemSucesso('Líder atualizado com sucesso!');
    } else {
      // Adicionar novo líder
      const docRef = await addDoc(collection(db, 'lideres'), formLider.value);
      lideres.value.push({ id: docRef.id, ...formLider.value });
      mostrarMensagemSucesso('Líder adicionado com sucesso!');
    }
    
    showLiderModal.value = false;
  } catch (error) {
    console.error('Erro ao salvar líder:', error);
  }
}

// Confirmar exclusão do líder
const confirmarExclusao = (id) => {
  itemIdParaExcluir.value = id;
  showConfirmModal.value = true;
};

const confirmarExclusaoLider = async () => {
  if (itemIdParaExcluir.value) {
    await excluirLider(itemIdParaExcluir.value);
    showConfirmModal.value = false;
    itemIdParaExcluir.value = null;
  }
};

const cancelarExclusao = () => {
  showConfirmModal.value = false;
  itemIdParaExcluir.value = null;
};

// Excluir líder
const excluirLider = async (id) => {
  try {
    await deleteDoc(doc(db, 'lideres', id));
    await carregarLideres();
    mostrarMensagemSucesso('Líder excluído com sucesso!');
  } catch (error) {
    console.error('Erro ao excluir líder:', error);
  }
};

function mostrarMensagemSucesso(mensagem) {
  successMessage.value = mensagem;
  setTimeout(() => {
    successMessage.value = '';
  }, 3000);
}
</script> 