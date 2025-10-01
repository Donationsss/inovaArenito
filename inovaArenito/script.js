/* script.js
   - Theme toggles
   - Profile loading
   - Projects management (+ undo)
   - Modal confirm + add project
   - Contact: CSRF token fetch, validation, spinner, toast, file upload, fallback local
*/
(function(){
  const $ = s => document.querySelector(s);
  const $$ = s => Array.from(document.querySelectorAll(s));
  const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2,7);

  /* THEME */
  function initTheme() {
    const saved = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', saved);
    $$('.icon-btn').forEach(btn => btn.addEventListener('click', toggleTheme));
    function toggleTheme() {
      const cur = document.documentElement.getAttribute('data-theme') || 'dark';
      const next = cur === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
    }
  }

  /* TOASTS */
  function toast(message, options = {}) {
    // options: timeout(ms), action {label, onClick}
    const container = document.getElementById('toastContainer');
    if (!container) return alert(message);
    const t = document.createElement('div');
    t.className = 'toast';
    t.innerHTML = `<div class="toast-body">${escapeHtml(message)}</div>`;
    if (options.action) {
      const btn = document.createElement('button');
      btn.className = 'toast-action';
      btn.textContent = options.action.label || 'Ação';
      btn.addEventListener('click', () => {
        options.action.onClick && options.action.onClick();
        container.removeChild(t);
      });
      t.appendChild(btn);
    }
    container.appendChild(t);
    const timeout = options.timeout || 5000;
    if (options.action) {
      // keep if action provided (still auto-remove)
      setTimeout(()=> { try { if (container.contains(t)) container.removeChild(t); } catch(e){} }, timeout+1000);
    } else {
      setTimeout(()=> { try { if (container.contains(t)) container.removeChild(t); } catch(e){} }, timeout);
    }
  }

  /* UTIL */
  function escapeHtml(s){ return (s||'').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }

  /* PROFILE */
  function loadProfileToUI() {
    const data = JSON.parse(localStorage.getItem('portfolioData') || '{}');
    if (!data || Object.keys(data).length === 0) return;
    if ($('#perfilFoto') && data.imagem) $('#perfilFoto').src = data.imagem;
    if ($('#nomeUser') && data.nome) $('#nomeUser').textContent = data.nome;
    if ($('#tituloUser') && data.titulo) $('#tituloUser').textContent = data.titulo;
    if ($('#descricaoDinamica')) {
      const base = data.descricao || '';
      const phrases = [base, 'Desenvolvedor Full Stack', 'Interfaces limpas e acessíveis', 'Aprendizado contínuo'];
      startTypingEffect($('#descricaoDinamica'), phrases);
    }
  }

  function startTypingEffect(el, phrases = [], delay = 1200) {
    let pi = 0, ch = 0, deleting = false;
    function step(){
      const str = phrases[pi];
      if (!deleting) {
        ch++;
        el.textContent = str.slice(0, ch);
        if (ch === str.length) { deleting = true; setTimeout(step, delay); return; }
      } else {
        ch--;
        el.textContent = str.slice(0, ch);
        if (ch === 0) { deleting = false; pi = (pi+1)%phrases.length; }
      }
      setTimeout(step, deleting ? 80 : 120);
    }
    step();
  }

  /* PROJECTS */
  function loadProjects(){ return JSON.parse(localStorage.getItem('projetos') || '[]'); }
  function saveProjects(v){ localStorage.setItem('projetos', JSON.stringify(v)); }

  let currentToDeleteId = null;

  function renderProjects() {
    const grid = $('#projetosGrid');
    if (!grid) return;
    const arr = loadProjects();
    grid.innerHTML = '';
    if (arr.length === 0) { grid.innerHTML = `<div class="proj-empty muted">Nenhum projeto — adicione um!</div>`; return; }
    arr.forEach(p => {
      const card = document.createElement('div');
      card.className = 'proj-card';
      card.innerHTML = `
        <h3>${escapeHtml(p.name)}</h3>
        <p class="muted">${escapeHtml(p.desc || '')}</p>
        <div class="proj-actions">
          ${p.type==='file' ? `<button class="btn small open-file" data-id="${p.id}">Abrir</button>` : `<a class="btn small" href="${p.url}" target="_blank" rel="noopener">Abrir</a>`}
          <button class="btn ghost small remove-proj" data-id="${p.id}">Remover</button>
        </div>
      `;
      grid.appendChild(card);
    });
    $$('.open-file').forEach(b => b.addEventListener('click', e => {
      const id = e.currentTarget.dataset.id; openStoredFile(id);
    }));
    $$('.remove-proj').forEach(b => b.addEventListener('click', e => {
      currentToDeleteId = e.currentTarget.dataset.id;
      $('#confirmModal').setAttribute('aria-hidden','false');
    }));
  }

  function confirmDeleteSetup() {
    $('#confirmYes') && $('#confirmYes').addEventListener('click', () => {
      const arr = loadProjects();
      const idx = arr.findIndex(x => x.id === currentToDeleteId);
      if (idx === -1) { $('#confirmModal').setAttribute('aria-hidden','true'); return; }
      const [removed] = arr.splice(idx,1);
      saveProjects(arr);
      // store last removed for undo
      localStorage.setItem('lastRemovedProject', JSON.stringify(removed));
      renderProjects();
      $('#confirmModal').setAttribute('aria-hidden','true');
      toast('Projeto removido', {
        timeout: 8000,
        action: {
          label: 'Desfazer',
          onClick: () => {
            const last = JSON.parse(localStorage.getItem('lastRemovedProject') || 'null');
            if (last) {
              const cur = loadProjects();
              cur.unshift(last);
              saveProjects(cur);
              localStorage.removeItem('lastRemovedProject');
              renderProjects();
              toast('Remoção desfeita', { timeout: 3000 });
            }
          }
        }
      });
    });
    $('#confirmNo') && $('#confirmNo').addEventListener('click', () => {
      currentToDeleteId = null;
      $('#confirmModal').setAttribute('aria-hidden','true');
    });
  }

  function openStoredFile(id) {
    const arr = loadProjects();
    const p = arr.find(x => x.id === id);
    if (!p || !p.dataUrl) return toast('Arquivo inválido ou não encontrado', { timeout: 4000 });
    const blob = dataURLtoBlob(p.dataUrl);
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
    setTimeout(()=> URL.revokeObjectURL(url), 20000);
  }
  function dataURLtoBlob(dataurl) {
    const parts = dataurl.split(','), mime = parts[0].match(/:(.*?);/)[1];
    const bstr = atob(parts[1]);
    let n=bstr.length, u8=new Uint8Array(n);
    while(n--) u8[n]=bstr.charCodeAt(n);
    return new Blob([u8], {type:mime});
  }

  /* ADD modal */
  function initAddModal() {
    const modal = $('#modalAdd');
    if (!modal) return;
    $('#btnAddProjeto').addEventListener('click', ()=> modal.setAttribute('aria-hidden','false'));
    $('#modalClose').addEventListener('click', ()=> modal.setAttribute('aria-hidden','true'));
    modal.addEventListener('click', e => { if (e.target === modal) modal.setAttribute('aria-hidden','true'); });

    $('#ghFetchBtn').addEventListener('click', async () => {
      const user = $('#ghUserInput').value.trim();
      const results = $('#ghResults'); results.innerHTML = 'Buscando...';
      if (!user) { results.innerHTML = 'Digite um username.'; return; }
      try {
        const res = await fetch(`https://api.github.com/users/${encodeURIComponent(user)}/repos?per_page=100`);
        if (!res.ok) throw new Error('Erro GitHub');
        const repos = await res.json();
        results.innerHTML = '';
        repos.forEach(r => {
          const el = document.createElement('div');
          el.className = 'gh-item';
          el.innerHTML = `<div><strong>${escapeHtml(r.name)}</strong><div class="muted small">${escapeHtml(r.description || '')}</div></div>
            <div><button class="btn small gh-import" data-url="${escapeHtml(r.html_url)}">Importar</button></div>`;
          results.appendChild(el);
        });
        $$('.gh-import').forEach(b => b.addEventListener('click', (ev) => {
          addProject({ id: uid(), name: ev.currentTarget.dataset.url.split('/').pop(), url: ev.currentTarget.dataset.url, type: 'link', desc: 'Importado do GitHub' });
          modal.setAttribute('aria-hidden','true');
        }));
      } catch (err) {
        console.error(err); results.innerHTML = 'Erro ao buscar repositórios.';
      }
    });

    $('#projFileInput').addEventListener('change', e => {
      const f = e.target.files[0]; if (!f) return;
      const reader = new FileReader();
      reader.onload = ev => {
        addProject({ id: uid(), name: f.name, type: 'file', desc: `Arquivo: ${f.type}`, dataUrl: ev.target.result });
        modal.setAttribute('aria-hidden','true');
        $('#projFileInput').value = '';
      };
      reader.readAsDataURL(f);
    });

    $('#projCreateBtn').addEventListener('click', () => {
      const name = $('#projNameInput').value.trim(); const link = $('#projLinkInput').value.trim();
      if (!name || !link) return toast('Preencha nome e link do projeto', { timeout: 3000 });
      addProject({ id: uid(), name, url: link, type: 'link', desc: 'Criado manualmente' });
      modal.setAttribute('aria-hidden','true');
      $('#projNameInput').value = $('#projLinkInput').value = '';
    });
  }

  function addProject(obj) {
    const arr = loadProjects();
    arr.unshift(obj);
    saveProjects(arr);
    renderProjects();
    toast('Projeto adicionado', { timeout: 2500 });
  }

  /* CONTACT */
  async function initContactPage() {
    const form = $('#contactForm'); if (!form) return;
    // fetch CSRF token from server
    try {
      const res = await fetch('csrf_token.php');
      if (res.ok) {
        const j = await res.json();
        if (j && j.csrf_token) {
          $('#csrfTokenField').value = j.csrf_token;
        }
      }
    } catch(err){ console.warn('Não foi possível buscar CSRF token', err); }

    form.addEventListener('submit', async e => {
      e.preventDefault();
      const nome = $('#contNome').value.trim();
      const email = $('#contEmail').value.trim();
      const assunto = $('#contAssunto').value.trim();
      const mensagem = $('#contMensagem').value.trim();
      const anexo = $('#contAnexo').files[0];
      const csrf = $('#csrfTokenField').value;

      // simple UI validation
      if (!nome) return markError($('#contNome'),'Preencha seu nome');
      if (!validateEmail(email)) return markError($('#contEmail'),'Email inválido');
      if (!mensagem) return markError($('#contMensagem'),'Escreva a mensagem');

      clearError($('#contNome')); clearError($('#contEmail')); clearError($('#contMensagem'));

      // prepare FormData
      const fd = new FormData();
      fd.append('nome', nome);
      fd.append('email', email);
      fd.append('assunto', assunto || 'Contato via site');
      fd.append('mensagem', mensagem);
      if (anexo) fd.append('anexo', anexo);
      if (csrf) fd.append('csrf_token', csrf);

      const btn = $('#btnEnviar'); const spinner = $('#sendSpinner');
      btn.disabled = true; btn.classList.add('sending'); spinner.style.display = 'inline-block';

      try {
        const res = await fetch('send_email.php', { method: 'POST', body: fd });
        const j = await res.json();
        if (res.ok && j.success) {
          toast('Mensagem enviada com sucesso!', { timeout: 4000 });
          // save local copy as sent
          saveLocalMessage({ nome, email, assunto, mensagem, data: new Date().toLocaleString(), sent: true });
          form.reset();
        } else {
          console.error('send_email error', j);
          toast('Servidor não conseguiu enviar. Salvando localmente.', { timeout: 5000 });
          saveLocalMessage({ nome, email, assunto, mensagem, data: new Date().toLocaleString(), sent: false });
        }
      } catch(err) {
        console.error(err);
        toast('Erro ao enviar. Salvando localmente.', { timeout: 5000 });
        saveLocalMessage({ nome, email, assunto, mensagem, data: new Date().toLocaleString(), sent: false });
      } finally {
        btn.disabled = false; btn.classList.remove('sending'); spinner.style.display = 'none';
      }
    });

    $('#verMensagens') && $('#verMensagens').addEventListener('click', renderMensagens);

    function saveLocalMessage(obj) {
      const arr = JSON.parse(localStorage.getItem('mensagens') || '[]');
      arr.unshift(obj);
      localStorage.setItem('mensagens', JSON.stringify(arr));
    }
    function renderMensagens() {
      const msgsDiv = $('#mensagensList'); if (!msgsDiv) return;
      const arr = JSON.parse(localStorage.getItem('mensagens') || '[]');
      if (!arr.length) { msgsDiv.innerHTML = `<div class="muted">Nenhuma mensagem ainda.</div>`; return; }
      msgsDiv.innerHTML = arr.map(m => `
        <div class="msg-item">
          <strong>${escapeHtml(m.nome)}</strong> <span class="muted small">${escapeHtml(m.data)}</span>
          <div class="muted small">${escapeHtml(m.email)} ${m.assunto ? '• '+escapeHtml(m.assunto):''}</div>
          <p>${escapeHtml(m.mensagem)}</p>
          <div class="muted small">${m.sent ? 'Enviado ao servidor' : 'Somente local'}</div>
        </div>
      `).join('');
    }
  }

  function validateEmail(e){ return /^\S+@\S+\.\S+$/.test(e); }
  function markError(el, msg){ if(!el) return; el.classList.add('input-error'); el.focus(); toast(msg || 'Campo inválido', { timeout: 2500 }); }
  function clearError(el){ if(!el) return; el.classList.remove('input-error'); }

  /* INIT */
  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    loadProfileToUI();
    renderProjects();
    initAddModal();
    confirmDeleteSetup();
    initContactPage();
    const y = new Date().getFullYear(); if ($('#year')) $('#year').textContent = y;
  });
})();
