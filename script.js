/**
 * EVO Fitness Center - Centro, Florianópolis
 * Script Interativo: Simulador de Treino, Filtro de Programas, FAQ & WhatsApp Link Builder
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initHeaderScroll();
  initProgramTabs();
  initSimulator();
  initFaqAccordion();
  initSmoothScroll();
});

/* -------------------------------------------------------------
 * 1. Menu Mobile
 * ------------------------------------------------------------- */
function initMobileNav() {
  const toggleBtn = document.getElementById('nav-toggle');
  const nav = document.getElementById('header-nav');

  if (!toggleBtn || !nav) return;

  toggleBtn.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('active');
    toggleBtn.setAttribute('aria-expanded', isOpen);
    const icon = toggleBtn.querySelector('i');
    if (icon) {
      if (isOpen) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-xmark');
      } else {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
      }
    }
  });

  // Fechar menu ao clicar em qualquer link
  nav.querySelectorAll('.nav-anchor').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('active');
      toggleBtn.setAttribute('aria-expanded', 'false');
      const icon = toggleBtn.querySelector('i');
      if (icon) {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
      }
    });
  });
}

/* -------------------------------------------------------------
 * 2. Header Scroll Effect
 * ------------------------------------------------------------- */
function initHeaderScroll() {
  const header = document.getElementById('site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
}

/* -------------------------------------------------------------
 * 3. Filtro de Abas de Programas
 * ------------------------------------------------------------- */
function initProgramTabs() {
  const tabButtons = document.querySelectorAll('#program-tabs .tab-btn');
  const programCards = document.querySelectorAll('#programs-grid .program-card');

  if (!tabButtons.length || !programCards.length) return;

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Alternar classe active no botão
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-tab');

      programCards.forEach(card => {
        const cat = card.getAttribute('data-cat');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
          card.style.animation = 'fadeInCard 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* -------------------------------------------------------------
 * 4. Simulador de Treino & Recomendador Personalizado
 * ------------------------------------------------------------- */
function initSimulator() {
  const perfilPills = document.querySelectorAll('#sim-perfil .sim-pill');
  const metaPills = document.querySelectorAll('#sim-meta .sim-pill');
  const freqPills = document.querySelectorAll('#sim-freq .sim-pill');
  const horarioSelect = document.getElementById('sim-horario-select');
  const nomeInput = document.getElementById('sim-aluno-nome');

  // Elementos do painel de recomendação
  const recPerfilVal = document.getElementById('rec-perfil-val');
  const recProgVal = document.getElementById('rec-prog-val');
  const recMetaVal = document.getElementById('rec-meta-val');
  const recFreqVal = document.getElementById('rec-freq-val');
  const recHorarioVal = document.getElementById('rec-horario-val');
  const recNomeVal = document.getElementById('rec-nome-val');
  const btnSendWpp = document.getElementById('btn-send-sim-evo');

  let state = {
    perfil: 'Mulheres Iniciantes / Recomeço',
    programa: 'Programa Mulher em Movimento (Treino Leve & Adaptado)',
    meta: 'Ganhar Força, Autonomia & Disposição',
    freq: '3 vezes por semana (Ideal e Sustentável)',
    horario: 'Meio da Manhã (09:00 às 11:30)',
    nome: ''
  };

  function updateDisplayAndLink() {
    if (recPerfilVal) recPerfilVal.textContent = state.perfil;
    if (recProgVal) recProgVal.textContent = state.programa;
    if (recMetaVal) recMetaVal.textContent = state.meta;
    if (recFreqVal) recFreqVal.textContent = state.freq;
    if (recHorarioVal) recHorarioVal.textContent = state.horario;
    if (recNomeVal) {
      recNomeVal.textContent = state.nome.trim() ? state.nome.trim() : 'A informar no WhatsApp';
    }

    if (btnSendWpp) {
      const alunoText = state.nome.trim() ? `Meu nome é *${state.nome.trim()}*.` : 'Gostaria de me apresentar.';
      const msg = 
`Olá, equipe EVO Fitness Center! 🌿
Vim pelo site e fiz a simulação do meu treino ideal:

👤 *Aluno(a):* ${state.nome.trim() || 'Não informado'}
🎯 *Perfil:* ${state.perfil}
🏆 *Programa Recomendado:* ${state.programa}
✨ *Objetivo Principal:* ${state.meta}
📅 *Frequência Preferida:* ${state.freq}
⏰ *Melhor Horário:* ${state.horario}

${alunoText} Gostaria de agendar a minha *Aula Experimental Gratuita* com professor na unidade da Rua Antônio Dib Mussi! Como podemos combinar o dia?`;

      btnSendWpp.href = `https://wa.me/5548988690851?text=${encodeURIComponent(msg)}`;
    }
  }

  // Listener para Perfil
  perfilPills.forEach(pill => {
    pill.addEventListener('click', () => {
      perfilPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      state.perfil = pill.getAttribute('data-perfil') || pill.textContent.trim();
      state.programa = pill.getAttribute('data-rec') || 'Treino Personalizado EVO';
      updateDisplayAndLink();
    });
  });

  // Listener para Meta
  metaPills.forEach(pill => {
    pill.addEventListener('click', () => {
      metaPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      state.meta = pill.getAttribute('data-meta') || pill.textContent.trim();
      updateDisplayAndLink();
    });
  });

  // Listener para Frequência
  freqPills.forEach(pill => {
    pill.addEventListener('click', () => {
      freqPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      state.freq = pill.getAttribute('data-freq') || pill.textContent.trim();
      updateDisplayAndLink();
    });
  });

  // Listener para Horário
  if (horarioSelect) {
    horarioSelect.addEventListener('change', (e) => {
      state.horario = e.target.value;
      updateDisplayAndLink();
    });
  }

  // Listener para Nome
  if (nomeInput) {
    nomeInput.addEventListener('input', (e) => {
      state.nome = e.target.value;
      updateDisplayAndLink();
    });
  }

  // Inicializar estado e URL
  updateDisplayAndLink();
}

/* -------------------------------------------------------------
 * 5. Accordion de Perguntas Frequentes (FAQ)
 * ------------------------------------------------------------- */
function initFaqAccordion() {
  const accItems = document.querySelectorAll('#evo-accordion .acc-item');

  accItems.forEach(item => {
    const header = item.querySelector('.acc-header');
    const body = item.querySelector('.acc-body');

    if (!header || !body) return;

    header.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');

      // Fechar outros itens (comportamento harmônico de acordeom)
      accItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          const otherHeader = otherItem.querySelector('.acc-header');
          if (otherHeader) otherHeader.setAttribute('aria-expanded', 'false');
          const otherBody = otherItem.querySelector('.acc-body');
          if (otherBody) otherBody.style.maxHeight = null;
        }
      });

      // Alternar o item atual
      if (isOpen) {
        item.classList.remove('active');
        header.setAttribute('aria-expanded', 'false');
        body.style.maxHeight = null;
      } else {
        item.classList.add('active');
        header.setAttribute('aria-expanded', 'true');
        body.style.maxHeight = body.scrollHeight + 'px';
      }
    });
  });
}

/* -------------------------------------------------------------
 * 6. Smooth Scroll para links internos
 * ------------------------------------------------------------- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}
