<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Gerenciar Galeria</h1>
      <button 
        @click="mostrarFormFoto(null)" 
        class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Adicionar Imagem
      </button>
    </div>

    <!-- Mensagem de sucesso -->
    <div v-if="successMessage" class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
      {{ successMessage }}
    </div>

    <!-- Gerenciar Categorias da Galeria -->
    <div class="mb-8 bg-white p-6 rounded-lg shadow-md">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-bold">Categorias da Galeria</h2>
        <button 
          @click="mostrarFormCategoria" 
          class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded text-sm focus:outline-none focus:shadow-outline"
        >
          Adicionar Categoria
        </button>
      </div>
      
      <div class="overflow-x-auto">
        <table class="min-w-full bg-white">
          <thead>
            <tr>
              <th class="py-2 px-4 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Nome da Categoria</th>
              <th class="py-2 px-4 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(categoria, index) in categorias" :key="index" class="border-b">
              <td class="py-2 px-4">{{ categoria }}</td>
              <td class="py-2 px-4">
                <button 
                  @click="editarCategoria(index)" 
                  class="mr-2 text-blue-600 hover:text-blue-800"
                >
                  Editar
                </button>
                <button 
                  @click="excluirCategoria(index)" 
                  class="text-red-600 hover:text-red-800"
                  :disabled="categoria === 'Todos'"
                >
                  Excluir
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Filtro de categorias -->
    <div class="flex flex-wrap justify-center gap-4 mb-8">
      <button
        v-for="categoria in categorias"
        :key="categoria"
        @click="categoriaAtual = categoria"
        :class="[
          'px-4 py-2 rounded-full transition-colors',
          categoriaAtual === categoria
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
        ]"
      >
        {{ categoria }}
      </button>
    </div>

    <!-- Grid de Imagens -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <div
        v-for="(foto, index) in fotosFiltradas"
        :key="foto.id"
        class="relative group bg-white p-2 rounded-lg shadow-md"
      >
        <div class="aspect-square overflow-hidden rounded-lg">
          <img
            :src="foto.url"
            :alt="foto.titulo"
            class="w-full h-full object-cover"
          />
        </div>
        <div class="p-2">
          <h3 class="font-bold text-gray-800 truncate">{{ foto.titulo }}</h3>
          <p class="text-sm text-gray-600">{{ foto.data }}</p>
        </div>
        <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
          <button 
            @click="mostrarFormFoto(foto)" 
            class="mx-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded text-sm focus:outline-none focus:shadow-outline"
          >
            Editar
          </button>
          <button 
            @click="excluirFoto(foto.id)" 
            class="mx-1 bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-3 rounded text-sm focus:outline-none focus:shadow-outline"
          >
            Excluir
          </button>
        </div>
      </div>
    </div>

    <!-- Mensagem se não houver fotos -->
    <div v-if="fotosFiltradas.length === 0" class="text-center py-10">
      <p class="text-gray-600">Nenhuma imagem encontrada para esta categoria.</p>
    </div>

    <!-- Modal para adicionar/editar foto -->
    <div v-if="showFotoModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 class="text-xl font-bold mb-4">{{ fotoEmEdicao ? 'Editar' : 'Adicionar' }} Imagem</h2>
        
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2">Título</label>
          <input
            v-model="formFoto.titulo"
            type="text"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          >
        </div>
        
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2">URL da Imagem</label>
          <input
            v-model="formFoto.url"
            type="text"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          >
        </div>
        
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2">Descrição</label>
          <textarea
            v-model="formFoto.descricao"
            rows="2"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          ></textarea>
        </div>
        
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2">Data</label>
          <input
            v-model="formFoto.data"
            type="text"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Ex: Março 2024"
          >
        </div>
        
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2">Categoria</label>
          <select
            v-model="formFoto.categoria"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          >
            <option v-for="categoria in categorias.filter(c => c !== 'Todos')" :key="categoria" :value="categoria">
              {{ categoria }}
            </option>
          </select>
        </div>
        
        <div class="flex justify-end">
          <button 
            @click="showFotoModal = false" 
            class="mr-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Cancelar
          </button>
          <button 
            @click="salvarFoto" 
            class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            :disabled="loading"
          >
            <span v-if="loading">Salvando...</span>
            <span v-else>Salvar</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Modal para adicionar/editar categoria -->
    <div v-if="showCategoriaModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 class="text-xl font-bold mb-4">{{ categoriaEmEdicao !== null ? 'Editar' : 'Adicionar' }} Categoria</h2>
        
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2">Nome da Categoria</label>
          <input
            v-model="formCategoria"
            type="text"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          >
        </div>
        
        <div class="flex justify-end">
          <button 
            @click="showCategoriaModal = false" 
            class="mr-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Cancelar
          </button>
          <button 
            @click="salvarCategoria" 
            class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Salvar
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
  query, where, getDoc, setDoc
} from 'firebase/firestore';

const categoriaAtual = ref("Todos");
const categorias = ref(["Todos", "Cultos", "Eventos", "Jovens", "Família", "Missões"]);
const fotos = ref([]);
const loading = ref(false);
const successMessage = ref('');

// Modal para fotos
const showFotoModal = ref(false);
const fotoEmEdicao = ref(null);
const formFoto = ref({
  titulo: '',
  url: 'https://placehold.co/800x800',
  descricao: '',
  data: '',
  categoria: 'Cultos'
});

// Modal para categorias
const showCategoriaModal = ref(false);
const categoriaEmEdicao = ref(null);
const formCategoria = ref('');

const fotosFiltradas = computed(() => {
  if (categoriaAtual.value === "Todos") {
    return fotos.value;
  }
  return fotos.value.filter(foto => foto.categoria === categoriaAtual.value);
});

// Carregar dados do Firebase
onMounted(async () => {
  await carregarCategorias();
  await carregarFotos();
});

async function carregarCategorias() {
  try {
    const categoriasDoc = await getDoc(doc(db, 'galeria', 'categorias'));
    if (categoriasDoc.exists()) {
      // Certifique-se de que 'Todos' é sempre a primeira categoria
      const cats = categoriasDoc.data().lista;
      if (!cats.includes('Todos')) {
        cats.unshift('Todos');
      }
      categorias.value = cats;
    }
  } catch (error) {
    console.error('Erro ao carregar categorias:', error);
  }
}

async function carregarFotos() {
  try {
    const fotosSnapshot = await getDocs(collection(db, 'fotos'));
    fotos.value = fotosSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Erro ao carregar fotos:', error);
  }
}

// Funções para gerenciar fotos
function mostrarFormFoto(foto) {
  if (foto) {
    fotoEmEdicao.value = foto;
    formFoto.value = { ...foto };
  } else {
    fotoEmEdicao.value = null;
    formFoto.value = {
      titulo: '',
      url: 'https://placehold.co/800x800',
      descricao: '',
      data: '',
      categoria: categorias.value.filter(c => c !== 'Todos')[0] || 'Cultos'
    };
  }
  showFotoModal.value = true;
}

async function salvarFoto() {
  loading.value = true;
  try {
    if (fotoEmEdicao.value) {
      // Atualizar foto existente
      const fotoRef = doc(db, 'fotos', fotoEmEdicao.value.id);
      await updateDoc(fotoRef, formFoto.value);
      
      // Atualizar na lista local
      const index = fotos.value.findIndex(f => f.id === fotoEmEdicao.value.id);
      if (index !== -1) {
        fotos.value[index] = { id: fotoEmEdicao.value.id, ...formFoto.value };
      }
      
      mostrarMensagemSucesso('Imagem atualizada com sucesso!');
    } else {
      // Adicionar nova foto
      const docRef = await addDoc(collection(db, 'fotos'), formFoto.value);
      fotos.value.push({ id: docRef.id, ...formFoto.value });
      mostrarMensagemSucesso('Imagem adicionada com sucesso!');
    }
    
    showFotoModal.value = false;
  } catch (error) {
    console.error('Erro ao salvar foto:', error);
  } finally {
    loading.value = false;
  }
}

async function excluirFoto(id) {
  if (confirm('Tem certeza que deseja excluir esta imagem?')) {
    try {
      await deleteDoc(doc(db, 'fotos', id));
      fotos.value = fotos.value.filter(foto => foto.id !== id);
      mostrarMensagemSucesso('Imagem excluída com sucesso!');
    } catch (error) {
      console.error('Erro ao excluir foto:', error);
    }
  }
}

// Funções para gerenciar categorias
function mostrarFormCategoria() {
  categoriaEmEdicao.value = null;
  formCategoria.value = '';
  showCategoriaModal.value = true;
}

function editarCategoria(index) {
  if (categorias.value[index] === 'Todos') return; // Não permitir editar a categoria 'Todos'
  
  categoriaEmEdicao.value = index;
  formCategoria.value = categorias.value[index];
  showCategoriaModal.value = true;
}

async function salvarCategoria() {
  if (!formCategoria.value.trim()) return;
  
  try {
    // Clonar o array para manipulação
    const novasCategorias = [...categorias.value];
    
    if (categoriaEmEdicao.value !== null) {
      // Atualizar categoria existente
      novasCategorias[categoriaEmEdicao.value] = formCategoria.value;
      
      // Também precisa atualizar a categoria em todas as fotos que a usam
      const categoriaAntiga = categorias.value[categoriaEmEdicao.value];
      for (const foto of fotos.value) {
        if (foto.categoria === categoriaAntiga) {
          const fotoRef = doc(db, 'fotos', foto.id);
          await updateDoc(fotoRef, { categoria: formCategoria.value });
          foto.categoria = formCategoria.value;
        }
      }
      
      mostrarMensagemSucesso('Categoria atualizada com sucesso!');
    } else {
      // Adicionar nova categoria
      novasCategorias.push(formCategoria.value);
      mostrarMensagemSucesso('Categoria adicionada com sucesso!');
    }
    
    // Salvar as categorias no Firestore
    await setDoc(doc(db, 'galeria', 'categorias'), { lista: novasCategorias });
    categorias.value = novasCategorias;
    
    showCategoriaModal.value = false;
  } catch (error) {
    console.error('Erro ao salvar categoria:', error);
  }
}

async function excluirCategoria(index) {
  const categoriaParaExcluir = categorias.value[index];
  
  if (categoriaParaExcluir === 'Todos') return; // Não permitir excluir a categoria 'Todos'
  
  // Verificar se existem fotos com esta categoria
  const fotosComCategoria = fotos.value.filter(foto => foto.categoria === categoriaParaExcluir);
  
  if (fotosComCategoria.length > 0) {
    if (!confirm(`Existem ${fotosComCategoria.length} imagens com esta categoria. Ao excluir, estas imagens serão movidas para a primeira categoria disponível. Deseja continuar?`)) {
      return;
    }
    
    // Definir categoria alternativa (primeira categoria que não é 'Todos' e não é a categoria a ser excluída)
    const categoriaAlternativa = categorias.value.find(c => c !== 'Todos' && c !== categoriaParaExcluir);
    
    // Atualizar todas as fotos com a categoria excluída
    for (const foto of fotosComCategoria) {
      const fotoRef = doc(db, 'fotos', foto.id);
      await updateDoc(fotoRef, { categoria: categoriaAlternativa });
      foto.categoria = categoriaAlternativa;
    }
  } else if (!confirm('Tem certeza que deseja excluir esta categoria?')) {
    return;
  }
  
  try {
    // Remover a categoria
    const novasCategorias = categorias.value.filter((_, i) => i !== index);
    
    // Salvar as categorias no Firestore
    await setDoc(doc(db, 'galeria', 'categorias'), { lista: novasCategorias });
    categorias.value = novasCategorias;
    
    mostrarMensagemSucesso('Categoria excluída com sucesso!');
  } catch (error) {
    console.error('Erro ao excluir categoria:', error);
  }
}

function mostrarMensagemSucesso(mensagem) {
  successMessage.value = mensagem;
  setTimeout(() => {
    successMessage.value = '';
  }, 3000);
}
</script> 