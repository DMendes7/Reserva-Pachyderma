function selecionarAnimal(animal) {
    const selecao = document.querySelector('.animal-selection');
    const btnVoltar = document.getElementById('voltar-btn');
    const container = document.getElementById('formulario-alimentacao');
    const topo = document.getElementById('topo-logo');
  
    topo.classList.add('escondido');
  
    const elefanteImg = document.getElementById('elefante-img');
    const hipopotamoImg = document.getElementById('hipopotamo-img');
  
    if (animal === 'elefante') {
      elefanteImg.classList.add('animal-selecionado');
      hipopotamoImg.style.display = 'none';
    } else {
      hipopotamoImg.classList.add('animal-selecionado');
      elefanteImg.style.display = 'none';
    }
  
    selecao.classList.add('fade-out');
  
    setTimeout(() => {
      selecao.style.display = 'none';
      btnVoltar.classList.remove('escondido');
  
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
      
            <button type="button" onclick="analisarHipopotamo()">Analisar Alimentação</button>
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
      
            <button type="button" onclick="analisarElefante()">Analisar Alimentação</button>
          </form>
          <div id="resultado" class="resultado"></div>
        `;
      }      
  
      container.classList.remove('escondido');
    }, 500);
  }    

  function voltarParaSelecao() {
    const selecao = document.querySelector('.animal-selection');
    const btnVoltar = document.getElementById('voltar-btn');
    const container = document.getElementById('formulario-alimentacao');
    const topo = document.getElementById('topo-logo');
  
    // Volta a exibir a logo e a seleção
    topo.classList.remove('escondido');
    selecao.style.display = 'flex';
    selecao.classList.remove('fade-out');
    btnVoltar.classList.add('escondido');
    container.classList.add('escondido');
    container.innerHTML = '';
  
    // Limpa estado das imagens
    document.getElementById('elefante-img').classList.remove('animal-selecionado');
    document.getElementById('hipopotamo-img').classList.remove('animal-selecionado');
    document.getElementById('elefante-img').style.display = 'inline';
    document.getElementById('hipopotamo-img').style.display = 'inline';
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
  
    const ideais = {
      racao: 49.5,
      manga: 38.72,
      melancia: 38.72,
      banana: 38.72,
      capim: 73.92,
      couve: 73.92,
      alface: 73.92
    };
  
    let resultadoHTML = `<h3>Resultado da Avaliação:</h3><ul>`;
  
    for (let item in valores) {
      const consumido = valores[item];
      const ideal = ideais[item];
      const diff = consumido - ideal;
      let classe = '';
      let mensagem = '';
  
      if (diff >= -5 && diff <= 5) {
        classe = 'ok';
        mensagem = '✔ Quantidade ideal';
      } else if (diff < -5) {
        classe = 'baixo';
        mensagem = `⚠ Está comendo pouco (-${Math.abs(diff.toFixed(2))} kg)`;
      } else {
        classe = 'alto';
        mensagem = `⛔ Está comendo demais (+${diff.toFixed(2)} kg)`;
      }
  
      resultadoHTML += `<li class="${classe}">${formatarNome(item)}: ${mensagem}</li>`;
    }
  
    resultadoHTML += `</ul>`;
    document.getElementById('resultado').innerHTML = resultadoHTML;
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
  
    const ideais = {
      racao: 16,
      manga: 13.33,
      melancia: 13.33,
      banana: 13.33,
      feijao: 24,
      capim: 60,
      feno: 60
    };
  
    let resultadoHTML = `<h3>Resultado da Avaliação:</h3><ul>`;
  
    for (let item in valores) {
      const consumido = valores[item];
      const ideal = ideais[item];
      const diff = consumido - ideal;
      let classe = '';
      let mensagem = '';
  
      if (diff >= -5 && diff <= 5) {
        classe = 'ok';
        mensagem = '✔ Quantidade ideal';
      } else if (diff < -5) {
        classe = 'baixo';
        mensagem = `⚠ Está comendo pouco (-${Math.abs(diff.toFixed(2))} kg)`;
      } else {
        classe = 'alto';
        mensagem = `⛔ Está comendo demais (+${diff.toFixed(2)} kg)`;
      }
  
      resultadoHTML += `<li class="${classe}">${formatarNome(item)}: ${mensagem}</li>`;
    }
  
    resultadoHTML += `</ul>`;
    document.getElementById('resultado').innerHTML = resultadoHTML;
  }
  
  