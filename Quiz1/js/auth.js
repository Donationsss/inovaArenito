const API = (p) => `backend/routes/${p}`;

function setError(id, msg) {
  const el = document.getElementById(id);
  if (el) el.textContent = msg || "";
}

// Registro
const formRegister = document.getElementById("form-register");
if (formRegister) {
  formRegister.addEventListener("submit", async (e) => {
    e.preventDefault();
    setError("register-errors", "");
    const fd = new FormData(formRegister);
    if (fd.get("password") !== fd.get("confirm_password")) {
      setError("register-errors", "Senhas não coincidem");
      return;
    }
    if (fd.get("password").length < 8) {
      setError("register-errors", "Senha deve ter pelo menos 8 caracteres");
      return;
    }
    const r = await fetch(API("auth_register.php"), {
      method: "POST",
      body: fd,
      credentials: "include",
    });
    const d = await r.json().catch(() => ({}));
    if (!r.ok) {
      setError("register-errors", d.error || "Erro");
      return;
    }
    location.href = "login.php";
  });
}

// Login
const formLogin = document.getElementById("form-login");
if (formLogin) {
  formLogin.addEventListener("submit", async (e) => {
    e.preventDefault();
    setError("login-errors", "");
    const fd = new FormData(formLogin);
    const r = await fetch(API("auth_login.php"), {
      method: "POST",
      body: fd,
      credentials: "include",
    });
    const d = await r.json().catch(() => ({}));
    if (!r.ok) {
      setError("login-errors", d.error || "Erro");
      return;
    }
    location.href = "index.php";
  });
}

// Forgot -> Reset
const formForgot = document.getElementById("form-forgot");
if (formForgot) {
  formForgot.addEventListener("submit", async (e) => {
    e.preventDefault();
    setError("forgot-errors", "");
    const fd = new FormData(formForgot);
    const r = await fetch(API("auth_forgot.php"), { method: "POST", body: fd });
    if (!r.ok) {
      setError("forgot-errors", "Erro ao enviar código");
      return;
    }
    document.getElementById("reset_email").value = formForgot.email.value;
    document.getElementById("step-email").hidden = true;
    document.getElementById("step-reset").hidden = false;
  });
}
const formReset = document.getElementById("form-reset");
if (formReset) {
  formReset.addEventListener("submit", async (e) => {
    e.preventDefault();
    setError("reset-errors", "");
    const fd = new FormData(formReset);
    if (fd.get("new_password") !== fd.get("confirm_password")) {
      setError("reset-errors", "Senhas não coincidem");
      return;
    }
    const r = await fetch(API("auth_reset.php"), { method: "POST", body: fd });
    const d = await r.json().catch(() => ({}));
    if (!r.ok) {
      setError("reset-errors", d.error || "Erro");
      return;
    }
    location.href = "login.php";
  });
}
