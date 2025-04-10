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

  // Oculta o topo e os animais
  topo.classList.add('hidden');
  document.getElementById('elefante-img').style.display = 'none';
  document.getElementById('hipopotamo-img').style.display = 'none';

  trocarConteudo(selecao, container);
  btnVoltar.classList.remove('hidden');

  // Define o conteúdo com base no animal
  if (animal === 'hipopotamo') {
    container.innerHTML = `
      <h2>Alimentação do Hipopótamo</h2>
      <form id="form-hipopotamo" class="formulario-animal">
        <div class="grupo">
          <h3>Ração de Cavalo</h3>
          <input type="number" id="racao" placeholder="kg consumido">
        </div>
        <div class="grupo">
          <h3>Frutas</h3>
          <input type="number" id="manga" placeholder="Manga (kg)">
          <input type="number" id="melancia" placeholder="Melancia (kg)">
          <input type="number" id="banana" placeholder="Banana (kg)">
        </div>
        <div class="grupo">
          <h3>Verduras</h3>
          <input type="number" id="capim" placeholder="Capim (kg)">
          <input type="number" id="couve" placeholder="Couve (kg)">
          <input type="number" id="alface" placeholder="Alface (kg)">
        </div>
        <button type="button" id="btn-analisar" onclick="analisarHipopotamo()">Analisar Alimentação</button>
      </form>
      <div id="resultado" class="resultado"></div>
    `;
  } else if (animal === 'elefante') {
    container.innerHTML = `
      <h2>Alimentação do Elefante</h2>
      <form id="form-elefante" class="formulario-animal">
        <div class="grupo">
          <h3>Ração de Cavalo</h3>
          <input type="number" id="racao" placeholder="kg consumido">
        </div>
        <div class="grupo">
          <h3>Frutas</h3>
          <input type="number" id="manga" placeholder="Manga (kg)">
          <input type="number" id="melancia" placeholder="Melancia (kg)">
          <input type="number" id="banana" placeholder="Banana (kg)">
        </div>
        <div class="grupo">
          <h3>Leguminosas</h3>
          <input type="number" id="feijao" placeholder="Feijão (kg)">
        </div>
        <div class="grupo">
          <h3>Gramíneas</h3>
          <input type="number" id="capim" placeholder="Capim (kg)">
          <input type="number" id="feno" placeholder="Feno (kg)">
        </div>
        <button type="button" id="btn-analisar" onclick="analisarElefante()">Analisar Alimentação</button>
      </form>
      <div id="resultado" class="resultado"></div>
    `;
  }

  // Animação em cascata dos grupos
  setTimeout(() => {
    const grupos = container.querySelectorAll('.grupo');
    grupos.forEach((grupo, index) => {
      grupo.classList.add('grupo-animado');
      grupo.style.animationDelay = `${index * 0.2}s`;
    });

    // Anima também o botão final
    const btn = container.querySelector('#btn-analisar');
    if (btn) {
      btn.classList.add('grupo-animado'); // reaproveitando a mesma animação
      btn.style.animationDelay = `${grupos.length * 0.2}s`;
    }
  }, 50);
}

function voltarParaSelecao() {
  const selecao = document.getElementById('selecao-animais');
  const btnVoltar = document.getElementById('voltar-btn');
  const container = document.getElementById('formulario-alimentacao');
  const topo = document.getElementById('topo-logo');

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
    racao: parseFloat(document.getElementById('racao').value) || 0,
    manga: parseFloat(document.getElementById('manga').value) || 0,
    melancia: parseFloat(document.getElementById('melancia').value) || 0,
    banana: parseFloat(document.getElementById('banana').value) || 0,
    capim: parseFloat(document.getElementById('capim').value) || 0,
    couve: parseFloat(document.getElementById('couve').value) || 0,
    alface: parseFloat(document.getElementById('alface').value) || 0,
  };

  const totais = {
    frutas: valores.manga + valores.melancia + valores.banana,
    verduras: valores.capim + valores.couve + valores.alface,
    racao: valores.racao
  };

  const ideais = {
    racao: 49.5,
    manga: 38.72,
    melancia: 38.72,
    banana: 38.72,
    capim: 73.92,
    couve: 73.92,
    alface: 73.92
  };

  const resultadoContainer = document.getElementById('formulario-alimentacao');
  resultadoContainer.innerHTML = `
    <div class="resultado-container">
      <h2 class="resultado-titulo">Resultado da Avaliação: Hipopótamo</h2>

      <div class="resultado-conteudo">
        <div class="resultado">
          <ul id="avaliacao-hipopotamo"></ul>
        </div>

        <div class="grafico-area">
          <canvas id="grafico-hipopotamo" width="300" height="300"></canvas>
        </div>
      </div>

      <div class="botoes-analise">
        <button onclick="voltarParaSelecao()">🔙 Voltar</button>
        <button onclick="refazerAnaliseHipopotamo()">✏️ Alterar Valores</button>
      </div>
    </div>
  `;

  const ul = document.getElementById('avaliacao-hipopotamo');
  let index = 0;

  for (let item in valores) {
    const consumido = valores[item];
    const ideal = ideais[item];
    const diff = consumido - ideal;

    let classe = '';
    let mensagem = '';

    if (diff >= -5 && diff <= 5) {
      classe = 'ok';
      mensagem = `✔ Quantidade ideal (${consumido.toFixed(2)} kg)`;
    } else if (diff < -5) {
      classe = 'baixo';
      mensagem = `⚠ Está comendo pouco (${Math.abs(diff.toFixed(2))} kg a menos - ${consumido.toFixed(2)} kg)`;
    } else {
      classe = 'alto';
      mensagem = `⛔ Está comendo demais (${diff.toFixed(2)} kg a mais - ${consumido.toFixed(2)} kg)`;
    }

    const li = document.createElement('li');
    li.className = `resultado-item ${classe}`;
    li.textContent = `${formatarNome(item)}: ${mensagem}`;
    li.style.animationDelay = `${index * 0.2}s`;
    ul.appendChild(li);
    index++;
  }

  requestAnimationFrame(() => {
    const canvas = document.getElementById('grafico-hipopotamo');
    if (canvas) {
      gerarGraficoHipopotamo(totais);
    }
  });
}

  function refazerAnaliseHipopotamo() {
    selecionarAnimal('hipopotamo');
  }
    
  function gerarGraficoHipopotamo(valores) {
    const ctx = document.getElementById('grafico-hipopotamo').getContext('2d');
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Frutas', 'Verduras', 'Ração'],
        datasets: [{
          data: [
            valores.frutas,
            valores.verduras,
            valores.racao
          ],
          backgroundColor: ['#FFB347', '#4CAF50', '#09324B'],
          borderColor: '#0f3d21',
          borderWidth: 2
        }]
      },
      options: {
        plugins: {
          legend: {
            labels: {
              color: '#FFD700',
              font: {
                size: 14
              }
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
      racao: parseFloat(document.getElementById('racao').value) || 0,
      manga: parseFloat(document.getElementById('manga').value) || 0,
      melancia: parseFloat(document.getElementById('melancia').value) || 0,
      banana: parseFloat(document.getElementById('banana').value) || 0,
      feijao: parseFloat(document.getElementById('feijao').value) || 0,
      capim: parseFloat(document.getElementById('capim').value) || 0,
      feno: parseFloat(document.getElementById('feno').value) || 0,
    };
  
    const totais = {
      frutas: valores.manga + valores.melancia + valores.banana,
      leguminosas: valores.feijao,
      gramineas: valores.capim + valores.feno,
      racao: valores.racao,
    };
  
    const ideais = {
      racao: 16,
      manga: 13.33,
      melancia: 13.33,
      banana: 13.33,
      feijao: 24,
      capim: 60,
      feno: 60
    };
  
    const resultadoContainer = document.getElementById('formulario-alimentacao');
    resultadoContainer.innerHTML = `
    <div class="resultado-container">
      <h2 class="resultado-titulo">Resultado da Avaliação: Elefante</h2>

      <div class="resultado-conteudo">
        <div class="resultado">
          <ul id="avaliacao-elefante"></ul>
        </div>

        <div class="grafico-area">
          <canvas id="grafico-elefante" width="300" height="300"></canvas>
        </div>
      </div>

      <div class="botoes-analise">
        <button onclick="voltarParaSelecao()">🔙 Voltar</button>
        <button onclick="refazerAnaliseElefante()">✏️ Alterar Valores</button>
      </div>
    </div>
  `;
  
    const ul = document.getElementById('avaliacao-elefante');
  
    let index = 0;
    for (let item in valores) {
      const consumido = valores[item];
      const ideal = ideais[item];
      const diff = consumido - ideal;
  
      let classe = '';
      let mensagem = '';
  
      if (diff >= -5 && diff <= 5) {
        classe = 'ok';
        mensagem = `✔ Quantidade ideal (${consumido.toFixed(2)} kg)`;
      } else if (diff < -5) {
        classe = 'baixo';
        mensagem = `⚠ Está comendo pouco (${Math.abs(diff.toFixed(2))} kg a menos - ${consumido.toFixed(2)} kg)`;
      } else {
        classe = 'alto';
        mensagem = `⛔ Está comendo demais (${diff.toFixed(2)} kg a mais - ${consumido.toFixed(2)} kg)`;
      }
  
      const li = document.createElement('li');
      li.className = `resultado-item ${classe}`;
      li.textContent = `${formatarNome(item)}: ${mensagem}`;
      li.style.animationDelay = `${index * 0.2}s`;
      ul.appendChild(li);
      index++;
    }
  
    requestAnimationFrame(() => {
      const canvas = document.getElementById('grafico-elefante');
      if (canvas) {
        gerarGraficoElefante(totais);
      }
    });
  }
  
  function refazerAnaliseElefante() {
    selecionarAnimal('elefante');
  }
  
  function gerarGraficoElefante(valores) {
    const ctx = document.getElementById('grafico-elefante')?.getContext('2d');
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Frutas', 'Leguminosas', 'Gramíneas', 'Ração'],
        datasets: [{
          data: [
            valores.frutas,
            valores.leguminosas,
            valores.gramineas,
            valores.racao
          ],
          backgroundColor: ['#FFB347', '#D97D54', '#1d5a30', '#09324B'],
          borderColor: '#0f3d21',
          borderWidth: 2
        }]
      },
      options: {
        plugins: {
          legend: {
            labels: {
              color: '#FFD700',
              font: {
                size: 14
              }
            }
          }
        }
      }
    });
  }  
  