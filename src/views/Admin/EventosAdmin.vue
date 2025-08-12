<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Gerenciar Eventos</h1>
      <button @click="mostrarFormEvento(null)"
        class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Adicionar Evento
      </button>
    </div>

    <!-- Mensagem de sucesso -->
    <div v-if="successMessage" class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
      {{ successMessage }}
    </div>

    <!-- Filtro de categorias -->
    <div class="flex flex-wrap mb-6 gap-2 px-2">
      <button v-for="categoria in categorias" :key="categoria" @click="filtroAtual = categoria" :class="[
        'px-3 py-1 md:px-4 md:py-2 rounded-full text-sm md:text-base transition-colors',
        filtroAtual === categoria
          ? 'bg-blue-600 text-white'
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
      ]">
        {{ categoria }}
      </button>
    </div>

    <!-- Lista de eventos -->
    <div class="grid grid-cols-1 gap-6">
      <div v-for="evento in eventosFiltrados" :key="evento.id" class="bg-white p-6 rounded-lg shadow-lg">
        <div class="flex items-start justify-between">
          <div class="flex-1">
            <h2 class="text-xl font-bold mb-2">
              {{ evento.titulo }}
              <span v-if="isEventoEncerrado(evento)"
                class="ml-2 px-2 py-1 bg-red-200 text-red-800 text-xs rounded font-semibold align-middle">
                Encerrado
              </span>
            </h2>
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
            <img v-if="evento.imagem" :src="evento.imagem" :alt="evento.titulo" class="w-32 h-auto rounded" />
            <div v-else class="w-32 h-24 bg-gray-200 rounded flex items-center justify-center text-gray-500 text-sm">
              Sem imagem
            </div>
          </div>
        </div>
        <div class="flex justify-end mt-4">
          <button @click="mostrarFormEvento(evento)"
            class="mr-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded text-sm focus:outline-none focus:shadow-outline">
            Editar
          </button>
          <button @click="confirmarExclusao(evento.id)"
            class="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-3 rounded text-sm focus:outline-none focus:shadow-outline">
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
            <input v-model="formEvento.titulo" type="text"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required>
          </div>

          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2">Categoria</label>
            <select v-model="formEvento.categoria"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required>
              <option v-for="categoria in categoriaOptions" :key="categoria" :value="categoria">{{ categoria }}</option>
            </select>
          </div>

          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2">Data</label>
            <input v-model="formEvento.data" type="date" :min="hoje"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required>
          </div>

          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2">Horário</label>
            <input v-model="formEvento.horario" type="time"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required>
          </div>

          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2">Local</label>
            <input v-model="formEvento.local" type="text"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required>
          </div>

          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2">Imagem</label>
            <input type="file" accept="image/*" @change="onImagemSelecionada"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            <div v-if="formEvento.imagem" class="mt-2">
              <img :src="formEvento.imagem" alt="Pré-visualização" class="w-32 h-auto rounded border" />
              <p class="text-xs text-gray-500 mt-1">Pré-visualização da imagem</p>
            </div>
            <div v-if="imagemUploadCarregando" class="text-sm text-gray-600 mt-1">
              Processando imagem...
            </div>
          </div>

          <div class="mb-4 md:col-span-2">
            <label class="block text-gray-700 text-sm font-bold mb-2">Descrição</label>
            <textarea v-model="formEvento.descricao" rows="3"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required></textarea>
          </div>
        </div>

        <div class="flex justify-end">
          <button @click="showEventoModal = false"
            class="mr-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Cancelar
          </button>
          <button @click="salvarEvento"
            class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            :disabled="loading || imagemUploadCarregando">
            <span v-if="loading">Salvando...</span>
            <span v-else>Salvar</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Modal para confirmação de exclusão -->
    <ConfirmModal :show="showConfirmModal" :title="'Confirmar exclusão'"
      :message="'Tem certeza que deseja excluir este evento? Esta ação não pode ser desfeita.'"
      @confirm="confirmarExclusaoEvento" @cancel="cancelarExclusao" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { db } from '../../firebase/config';
import {
  collection, doc, getDocs, addDoc, updateDoc, deleteDoc,
  query, where
} from 'firebase/firestore';
import ConfirmModal from '../../components/ConfirmModal.vue';

const filtroAtual = ref("Todos");
const categorias = ["Todos", "Cultos", "Jovens", "Família"];
const categoriaOptions = ["Cultos", "Jovens", "Família"];
const eventos = ref([]);
const loading = ref(false);
const successMessage = ref('');
const showEventoModal = ref(false);
const eventoEmEdicao = ref(null);
const showConfirmModal = ref(false);
const itemIdParaExcluir = ref(null);

// Estado de upload de imagem
const imagemUploadCarregando = ref(false);

// Função para obter a data de hoje no formato yyyy-mm-dd
function getHoje() {
  const hoje = new Date();
  const yyyy = hoje.getFullYear();
  const mm = String(hoje.getMonth() + 1).padStart(2, '0');
  const dd = String(hoje.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}
const hoje = getHoje();

// Função para comparar datas no formato yyyy-mm-dd
function isDataAnterior(data) {
  // data pode vir como yyyy-mm-dd ou dd/mm/yyyy
  if (!data) return false;
  if (data.includes('/')) {
    // dd/mm/yyyy para yyyy-mm-dd
    const [dd, mm, yyyy] = data.split('/');
    data = `${yyyy}-${mm}-${dd}`;
  }
  return data < hoje;
}

// Função para verificar se o evento está encerrado
function isEventoEncerrado(evento) {
  // evento.data pode ser yyyy-mm-dd ou dd/mm/yyyy
  if (!evento.data) return false;
  let dataEvento = evento.data;
  if (dataEvento.includes('/')) {
    // dd/mm/yyyy para yyyy-mm-dd
    const [dd, mm, yyyy] = dataEvento.split('/');
    dataEvento = `${yyyy}-${mm}-${dd}`;
  }
  // Se a data do evento for menor que hoje, está encerrado
  return dataEvento < hoje;
}

// Form para adicionar/editar evento
const formEvento = ref({
  titulo: '',
  descricao: '',
  data: '',
  horario: '',
  local: '',
  categoria: 'Cultos',
  imagem: ''
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
    // Se a data estiver no formato dd/mm/yyyy, converter para yyyy-mm-dd para o input date
    if (formEvento.value.data && formEvento.value.data.includes('/')) {
      const [dd, mm, yyyy] = formEvento.value.data.split('/');
      formEvento.value.data = `${yyyy}-${mm}-${dd}`;
    }
  } else {
    eventoEmEdicao.value = null;
    formEvento.value = {
      titulo: '',
      descricao: '',
      data: '',
      horario: '',
      local: '',
      categoria: 'Cultos',
      imagem: ''
    };
  }
  showEventoModal.value = true;
}

async function salvarEvento() {
  loading.value = true;
  try {
    // Validação extra: não permitir datas anteriores ao dia atual
    if (formEvento.value.data && formEvento.value.data < hoje) {
      mostrarMensagemSucesso('A data do evento não pode ser anterior ao dia de hoje.');
      loading.value = false;
      return;
    }

    // Salvar a data no formato dd/mm/yyyy para manter compatibilidade com o restante do sistema
    let dataParaSalvar = formEvento.value.data;
    if (dataParaSalvar && dataParaSalvar.includes('-')) {
      // yyyy-mm-dd para dd/mm/yyyy
      const [yyyy, mm, dd] = dataParaSalvar.split('-');
      dataParaSalvar = `${dd}/${mm}/${yyyy}`;
    }

    const eventoParaSalvar = {
      ...formEvento.value,
      data: dataParaSalvar
    };

    if (eventoEmEdicao.value) {
      // Atualizar evento existente
      const eventoRef = doc(db, 'eventos', eventoEmEdicao.value.id);
      await updateDoc(eventoRef, eventoParaSalvar);

      // Atualizar na lista local
      const index = eventos.value.findIndex(e => e.id === eventoEmEdicao.value.id);
      if (index !== -1) {
        eventos.value[index] = { id: eventoEmEdicao.value.id, ...eventoParaSalvar };
      }

      mostrarMensagemSucesso('Evento atualizado com sucesso!');
    } else {
      // Adicionar novo evento
      const docRef = await addDoc(collection(db, 'eventos'), eventoParaSalvar);
      eventos.value.push({ id: docRef.id, ...eventoParaSalvar });
      mostrarMensagemSucesso('Evento adicionado com sucesso!');
    }

    showEventoModal.value = false;
  } catch (error) {
    console.error('Erro ao salvar evento:', error);
  } finally {
    loading.value = false;
  }
}

// Converter imagem para Base64, redimensionando para 600x400 antes de armazenar no Firestore
async function onImagemSelecionada(event) {
  const file = event.target.files && event.target.files[0];
  if (!file) return;

  // Verificar se é uma imagem válida
  if (!file.type.startsWith('image/')) {
    mostrarMensagemSucesso('Por favor, selecione apenas arquivos de imagem.');
    return;
  }

  // Não limitar o tamanho do arquivo aqui, pois vamos redimensionar depois

  try {
    imagemUploadCarregando.value = true;

    // Redimensionar a imagem para 600x400 e converter para Base64
    const base64 = await redimensionarImagemParaBase64(file, 600, 400);

    // Definir a imagem no formulário
    formEvento.value.imagem = base64;

    imagemUploadCarregando.value = false;
    mostrarMensagemSucesso('Imagem carregada e redimensionada com sucesso!');

  } catch (error) {
    console.error('Erro ao processar imagem:', error);
    mostrarMensagemSucesso('Erro ao processar a imagem. Tente novamente.');
    imagemUploadCarregando.value = false;
  }
}

// Função auxiliar para redimensionar imagem para 600x400 e converter para Base64
function redimensionarImagemParaBase64(file, largura, altura) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = function (e) {
      const img = new window.Image();
      img.onload = function () {
        // Criar canvas com tamanho 600x400
        const canvas = document.createElement('canvas');
        canvas.width = largura;
        canvas.height = altura;
        const ctx = canvas.getContext('2d');

        // Preencher fundo branco (caso a imagem tenha transparência)
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, largura, altura);

        // Calcular escala para manter proporção e centralizar
        const ratio = Math.min(largura / img.width, altura / img.height);
        const newWidth = img.width * ratio;
        const newHeight = img.height * ratio;
        const offsetX = (largura - newWidth) / 2;
        const offsetY = (altura - newHeight) / 2;

        ctx.drawImage(img, offsetX, offsetY, newWidth, newHeight);

        // Converter para Base64
        const base64 = canvas.toDataURL('image/jpeg', 0.85); // qualidade 85%
        resolve(base64);
      };
      img.onerror = reject;
      img.src = e.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// Confirmar exclusão de evento
const confirmarExclusao = (id) => {
  itemIdParaExcluir.value = id;
  showConfirmModal.value = true;
};

const confirmarExclusaoEvento = async () => {
  if (itemIdParaExcluir.value) {
    await excluirEvento(itemIdParaExcluir.value);
    showConfirmModal.value = false;
    itemIdParaExcluir.value = null;
  }
};

const cancelarExclusao = () => {
  showConfirmModal.value = false;
  itemIdParaExcluir.value = null;
};

// Excluir evento
const excluirEvento = async (id) => {
  try {
    await deleteDoc(doc(db, 'eventos', id));
    await carregarEventos();
    mostrarMensagemSucesso('Evento excluído com sucesso!');
  } catch (error) {
    console.error('Erro ao excluir evento:', error);
  }
};

function mostrarMensagemSucesso(mensagem) {
  successMessage.value = mensagem;
  setTimeout(() => {
    successMessage.value = '';
  }, 3000);
}
</script>