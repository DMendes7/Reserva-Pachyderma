function trocarConteudo(componenteAntigo, componenteNovo) {
  componenteAntigo.classList.add('fade-out');

  setTimeout(() => {
    componenteAntigo.classList.add('hidden');
    componenteAntigo.classList.remove('fade-out');

    componenteNovo.classList.remove('hidden');
    // NÃO adiciona mais nenhuma animação aqui
    // A animação de entrada (slide-fade-in) é aplicada diretamente em quem precisa
  }, 500);
}

function selecionarAnimal(animal) {
  const selecao = document.getElementById('selecao-animais');
  const btnVoltar = document.getElementById('voltar-btn');
  const container = document.getElementById('formulario-alimentacao');
  const topo = document.getElementById('topo-logo');

  topo.classList.add('hidden');
  document.getElementById('elefante-img').style.display = 'none';
  document.getElementById('hipopotamo-img').style.display = 'none';

  trocarConteudo(selecao, container);
  btnVoltar.classList.remove('hidden');

  // NOVO FORMULÁRIO COM 3 INPUTS
  const titulo = animal === 'hipopotamo' ? 'Hipopótamo' : 'Elefante';
  const analisarFn = animal === 'hipopotamo' ? 'analisarHipopotamo()' : 'analisarElefante()';

  container.innerHTML = `
    <h2>Alimentação do ${titulo}</h2>
    <form id="form-${animal}" class="formulario-animal">
      <div class="grupo">
        <h3>Forragem (feno de capim)</h3>
        <input type="number" id="forragem" placeholder="kg consumido">
      </div>
      <div class="grupo">
        <h3>Leguminosa (feno de alfafa)</h3>
        <input type="number" id="leguminosa" placeholder="kg consumido">
      </div>
      <div class="grupo">
        <h3>Ração</h3>
        <input type="number" id="racao" placeholder="kg consumido">
      </div>

      <div class="botoes-analise">
        <button type="button" id="btn-analisar" onclick="${analisarFn}">Analisar Alimentação</button>
      </div>
    </form>
    <p class="informativo-sal">🧂 Sal à vontade (não contabilizado)</p>
  `;

  // animação dos blocos
  setTimeout(() => {
    const grupos = container.querySelectorAll('.grupo');
    grupos.forEach((grupo, index) => {
      grupo.classList.add('grupo-animado');
      grupo.style.animationDelay = `${index * 0.2}s`;
    });

    const btn = container.querySelector('#btn-analisar');
    if (btn) {
      btn.classList.add('grupo-animado');
      btn.style.animationDelay = `${grupos.length * 0.2}s`;
    }
  }, 50);
}

function voltarParaSelecao() {
  const selecao = document.getElementById('selecao-animais');
  const btnVoltar = document.getElementById('voltar-btn');
  const container = document.getElementById('formulario-alimentacao');
  const topo = document.getElementById('topo-logo');
  const referencias = document.getElementById('referencias-container');

  // Oculta e limpa as referências, se visíveis
  if (referencias) {
    referencias.classList.add('hidden');
    referencias.innerHTML = '';
  }

  // Volta com o topo
  topo.classList.remove('hidden');

  // Traz de volta os animais
  const elefanteImg = document.getElementById('elefante-img');
  const hipopotamoImg = document.getElementById('hipopotamo-img');

  elefanteImg.style.display = 'inline-block';
  hipopotamoImg.style.display = 'inline-block';

  elefanteImg.classList.remove('animal-selecionado');
  hipopotamoImg.classList.remove('animal-selecionado');

  // Troca visual de volta para seleção
  trocarConteudo(container, selecao);
  btnVoltar.classList.add('hidden');

  // Limpa conteúdo anterior
  container.innerHTML = '';

  // Aplica animação nos animais com leve delay
  setTimeout(() => {
    elefanteImg.classList.add('animal-animado');
    hipopotamoImg.classList.add('animal-animado');
    elefanteImg.style.animationDelay = '0.1s';
    hipopotamoImg.style.animationDelay = '0.3s';

    // Remove a classe depois para permitir reanimação futura
    setTimeout(() => {
      elefanteImg.classList.remove('animal-animado');
      hipopotamoImg.classList.remove('animal-animado');
      elefanteImg.style.animationDelay = '';
      hipopotamoImg.style.animationDelay = '';
    }, 1000);
  }, 100);
}
  
function analisarHipopotamo() {
  const valores = {
    forragem: parseFloat(document.getElementById('forragem').value) || 0,
    leguminosa: parseFloat(document.getElementById('leguminosa').value) || 0,
    racao: parseFloat(document.getElementById('racao').value) || 0,
  };

  const ideais = {
    forragem: 99,
    leguminosa: 13,
    racao: 19
  };

  const resultadoContainer = document.getElementById('formulario-alimentacao');
  resultadoContainer.innerHTML = `
    <h2>Resultado da Avaliação: Hipopótamo</h2>
    <div class="resultado">
      <ul id="avaliacao-hipopotamo"></ul>
    </div>
    <canvas id="grafico-hipopotamo"></canvas>
    <div class="botoes-analise">
      <button onclick="voltarParaSelecao()">🔙 Voltar</button>
      <button onclick="selecionarAnimal('hipopotamo')">✏️ Alterar Valores</button>
    </div>
    <p class="informativo-sal">🧂 Sal à vontade (não contabilizado)</p>
  `;

  const ul = document.getElementById('avaliacao-hipopotamo');

  for (let item in valores) {
    const consumido = valores[item];
    const ideal = ideais[item];
    const diff = consumido - ideal;

    let classe = '';
    let mensagem = '';

    if (diff >= -2 && diff <= 2) {
      classe = 'ok';
      mensagem = `✅ Quantidade adequada (${consumido.toFixed(2)} kg)`;
    } else if (diff < -2) {
      classe = 'baixo';
      mensagem = `⚠️ Quantidade insuficiente (${Math.abs(diff.toFixed(2))} kg a menos - ${consumido.toFixed(2)} kg)`;
    } else {
      classe = 'alto';
      mensagem = `⛔ Quantidade excessiva (${diff.toFixed(2)} kg a mais - ${consumido.toFixed(2)} kg)`;
    }

    const li = document.createElement('li');
    li.className = `resultado-item ${classe}`;
    li.textContent = `${formatarNome(item)}: ${mensagem}`;
    ul.appendChild(li);
  }

  gerarGraficoHipopotamo(valores);
}

  function refazerAnaliseHipopotamo() {
    selecionarAnimal('hipopotamo');
  }
    
  function gerarGraficoHipopotamo(valores) {
  const ctx = document.getElementById('grafico-hipopotamo').getContext('2d');
  new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['Forragem', 'Leguminosa', 'Ração'],
      datasets: [{
        data: [
          valores.forragem,
          valores.leguminosa,
          valores.racao
        ],
        backgroundColor: ['#4CAF50', '#FFA500', '#09324B'],
        borderColor: '#0f3d21',
        borderWidth: 2
      }]
    },
    options: {
      plugins: {
        legend: {
          labels: {
            color: '#FFD700',
            font: { size: 14 }
          }
        }
      }
    }
  });
}
  
  function formatarNome(item) {
    switch(item) {
      case 'racao': return 'Ração de Cavalo';
      case 'manga': return 'Manga';
      case 'melancia': return 'Melancia';
      case 'banana': return 'Banana';
      case 'capim': return 'Capim';
      case 'couve': return 'Couve';
      case 'alface': return 'Alface';
      case 'feijao': return 'Feijão';
      case 'feno': return 'Feno';
      default: return item;
    }
  }  

  function analisarElefante() {
  const valores = {
    forragem: parseFloat(document.getElementById('forragem').value) || 0,
    leguminosa: parseFloat(document.getElementById('leguminosa').value) || 0,
    racao: parseFloat(document.getElementById('racao').value) || 0,
  };

  const ideais = {
    forragem: 92,
    leguminosa: 29,
    racao: 10
  };

  const resultadoContainer = document.getElementById('formulario-alimentacao');
  resultadoContainer.innerHTML = `
    <h2>Resultado da Avaliação: Elefante</h2>
    <div class="resultado">
      <ul id="avaliacao-elefante"></ul>
    </div>
    <canvas id="grafico-elefante"></canvas>
    <div class="botoes-analise">
      <button onclick="voltarParaSelecao()">🔙 Voltar</button>
      <button onclick="selecionarAnimal('elefante')">✏️ Alterar Valores</button>
    </div>
    <p class="informativo-sal">🧂 Sal à vontade (não contabilizado)</p>
  `;

  const ul = document.getElementById('avaliacao-elefante');

  for (let item in valores) {
    const consumido = valores[item];
    const ideal = ideais[item];
    const diff = consumido - ideal;

    let classe = '';
    let mensagem = '';

    if (diff >= -2 && diff <= 2) {
      classe = 'ok';
      mensagem = `✅ Quantidade adequada (${consumido.toFixed(2)} kg)`;
    } else if (diff < -2) {
      classe = 'baixo';
      mensagem = `⚠️ Quantidade insuficiente (${Math.abs(diff.toFixed(2))} kg a menos - ${consumido.toFixed(2)} kg)`;
    } else {
      classe = 'alto';
      mensagem = `⛔ Quantidade excessiva (${diff.toFixed(2)} kg a mais - ${consumido.toFixed(2)} kg)`;
    }

    const li = document.createElement('li');
    li.className = `resultado-item ${classe}`;
    li.textContent = `${formatarNome(item)}: ${mensagem}`;
    ul.appendChild(li);
  }

  gerarGraficoElefante(valores);
}
  
  function refazerAnaliseElefante() {
    selecionarAnimal('elefante');
  }
  
  function gerarGraficoElefante(valores) {
  const ctx = document.getElementById('grafico-elefante').getContext('2d');
  new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['Forragem', 'Leguminosa', 'Ração'],
      datasets: [{
        data: [
          valores.forragem,
          valores.leguminosa,
          valores.racao
        ],
        backgroundColor: ['#4CAF50', '#FFA500', '#09324B'],
        borderColor: '#0f3d21',
        borderWidth: 2
      }]
    },
    options: {
      plugins: {
        legend: {
          labels: {
            color: '#FFD700',
            font: { size: 14 }
          }
        }
      }
    }
  });
}

function exibirReferencias() {
  const topo = document.getElementById('topo-logo');
  const selecao = document.getElementById('selecao-animais');
  const container = document.getElementById('referencias-container');
  const btnVoltar = document.getElementById('voltar-btn');

  // Esconde logo e seleção
  topo.classList.add('hidden');
  selecao.classList.add('hidden');

  // Mostra botão de voltar e container
  btnVoltar.classList.remove('hidden');
  container.classList.remove('hidden');

  // Insere conteúdo
  container.innerHTML = `
    <div class="referencias-bloco">
      <h2>📘 Referências Nutricionais</h2>

      <p><strong>Hipopótamo (≈132kg):</strong></p>
      <ul>
        <li>Forragem (feno de capim): ≈99 kg</li>
        <li>Leguminosa (feno de alfafa): ≈13 kg</li>
        <li>Ração: ≈19 kg</li>
        <li>Sal à vontade</li>
      </ul>

      <p><strong>Elefante (≈100kg):</strong></p>
      <ul>
        <li>Forragem (feno de capim): ≈92 kg</li>
        <li>Leguminosa (feno de alfafa): ≈29 kg</li>
        <li>Ração: ≈10 kg</li>
        <li>Sal à vontade</li>
      </ul>

      <h3>📚 Fontes consultadas:</h3>
      <p><strong>Elefante:</strong></p>
      <ul>
        <li>Mellor, D. J., Hunt, S. & Gusset, M. (2015). <em>Caring for Wildlife: The World Zoo and Aquarium Animal Welfare Strategy</em>. WAZA Executive Office.</li>
        <li>Olson, D. (2011). <em>Elephant Husbandry Resource Guide</em>. AZA Elephant Taxon Group.</li>
        <li>Bolechova, P. et al. (2023). <em>EAZA Best Practice Guidelines for Elephants - Second Edition</em>. European Association of Zoos and Aquariums.</li>
      </ul>

      <p><strong>Hipopótamo:</strong></p>
      <ul>
        <li>Houwald, F. et al. (2020). <em>EAZA Best Practice Guidelines for the Pygmy Hippopotamus</em>. EAZA.</li>
        <li>Altrak, G. (2012). <em>Nutrição e Manejo de Animais Silvestres e Exóticos em Zoológicos</em>. Florianópolis.</li>
      </ul>

      <p><em>Todos os dados são estimativas fornecidas pelo grupo de Medicina Veterinária da UNI BH para fins de simulação didática.</em></p>
    </div>
  `;
}



  