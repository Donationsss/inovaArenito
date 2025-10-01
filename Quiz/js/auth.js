// js/auth.js
const API = (path) => `./backend/routes/${path}`;

function setError(el, msg){
  if(!el) return;
  el.textContent = msg || '';
  if(msg){ el.classList.add('show'); } else { el.classList.remove('show'); }
}

async function postForm(url, form){
  const fd = new FormData(form);
  const res = await fetch(url, { method:'POST', body: fd, credentials: 'include' });
  const data = await res.json().catch(()=>({}));
  if(!res.ok){ throw data?.error || 'Erro inesperado'; }
  return data;
}

// Registro
const formRegister = document.getElementById('form-register');
if(formRegister){
  const err = document.getElementById('register-errors');
  formRegister.addEventListener('submit', async (e)=>{
    e.preventDefault();
    setError(err,'');
    try{
      const data = await postForm(API('auth_register.php'), formRegister);
      // Redireciona para login
      location.href = './login.html';
    }catch(ex){
      setError(err, String(ex));
    }
  });
}

// Login
const formLogin = document.getElementById('form-login');
if(formLogin){
  const err = document.getElementById('login-errors');
  formLogin.addEventListener('submit', async (e)=>{
    e.preventDefault();
    setError(err,'');
    try{
      const data = await postForm(API('auth_login.php'), formLogin);
      // Vai para home
      location.href = './index.html';
    }catch(ex){
      setError(err, String(ex));
    }
  });
}

// Esqueci a senha - Passo 1
const formForgot = document.getElementById('form-forgot');
if(formForgot){
  const err = document.getElementById('forgot-errors');
  const stepEmail = document.getElementById('step-email');
  const stepReset = document.getElementById('step-reset');
  const resetEmailInput = document.getElementById('reset_email');

  formForgot.addEventListener('submit', async (e)=>{
    e.preventDefault();
    setError(err,'');
    try{
      const data = await postForm(API('auth_forgot.php'), formForgot);
      // Mostra passo 2
      resetEmailInput.value = formForgot.email.value;
      stepEmail.style.display = 'none';
      stepReset.style.display = 'block';
    }catch(ex){
      setError(err, String(ex));
    }
  });
}

// Esqueci a senha - Passo 2 (reset)
const formReset = document.getElementById('form-reset');
if(formReset){
  const err = document.getElementById('reset-errors');
  formReset.addEventListener('submit', async (e)=>{
    e.preventDefault();
    setError(err,'');
    try{
      const data = await postForm(API('auth_reset.php'), formReset);
      // Vai para login
      location.href = './login.html';
    }catch(ex){
      setError(err, String(ex));
    }
  });
}
