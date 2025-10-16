// js/toast.js
(function (global) {
  const DEFAULT_DURATION = 3000;

  function createContainer() {
    let c = document.getElementById("toast-container");
    if (!c) {
      c = document.createElement("div");
      c.id = "toast-container";
      c.style.position = "fixed";
      c.style.top = "20px";
      c.style.right = "20px";
      c.style.display = "flex";
      c.style.flexDirection = "column";
      c.style.gap = "10px";
      c.style.zIndex = "9999";
      document.body.appendChild(c);
    }
    return c;
  }

  function getColor(type) {
    switch (type) {
      case "success":
        return "#10b981";
      case "error":
        return "#ef4444";
      case "info":
        return "#2563eb";
      case "warning":
        return "#f59e0b";
      default:
        return "#2563eb";
    }
  }

  function getIcon(type) {
    switch (type) {
      case "success":
        return "check-circle";
      case "error":
        return "exclamation-circle";
      case "warning":
        return "exclamation-triangle";
      default:
        return "info-circle";
    }
  }

  function showToast(message, type = "success", duration = DEFAULT_DURATION) {
    const container = createContainer();
    const toast = document.createElement("div");
    toast.className = "app-toast " + type;
    toast.innerHTML = `
      <i class="fas fa-${getIcon(type)}"></i>
      <span>${message}</span>
      <button class="toast-close" aria-label="Fechar">&times;</button>
    `;
    Object.assign(toast.style, {
      background: getColor(type),
      color: "#fff",
      padding: "0.9rem 1.1rem",
      borderRadius: "10px",
      boxShadow: "0 10px 25px rgba(0,0,0,0.25)",
      display: "flex",
      alignItems: "center",
      gap: "0.6rem",
      opacity: "0",
      transform: "translateY(-10px)",
      transition: "opacity .2s ease, transform .2s ease",
      maxWidth: "360px",
      fontWeight: "600",
      letterSpacing: ".2px",
    });
    const btnClose = toast.querySelector(".toast-close");
    Object.assign(btnClose.style, {
      background: "transparent",
      border: "none",
      color: "#fff",
      fontSize: "1.1rem",
      marginLeft: "6px",
      cursor: "pointer",
      lineHeight: "1",
    });
    container.appendChild(toast);
    requestAnimationFrame(() => {
      toast.style.opacity = "1";
      toast.style.transform = "translateY(0)";
    });
    btnClose.addEventListener("click", () => dismiss(toast));
    const timer = setTimeout(() => dismiss(toast), duration);
    toast.addEventListener("mouseenter", () => clearTimeout(timer));
    toast.addEventListener("mouseleave", () => {
      setTimeout(() => dismiss(toast), 800);
    });
    return toast;
  }

  function dismiss(toast) {
    if (!toast) return;
    toast.style.opacity = "0";
    toast.style.transform = "translateY(-10px)";
    setTimeout(() => toast.remove(), 200);
  }

  function showToastFromQuery() {
    const p = new URLSearchParams(window.location.search);
    const msg = p.get("toast");
    if (!msg) return;
    const type = p.get("type") || "success";
    const dur = parseInt(p.get("dur") || "3000", 10);
    showToast(msg, type, dur);
    const url = new URL(window.location.href);
    p.delete("toast");
    p.delete("type");
    p.delete("dur");
    url.search = p.toString();
    window.history.replaceState({}, "", url);
  }

  global.showToast = showToast;
  global.dismissToast = dismiss;
  global.showToastFromQuery = showToastFromQuery;
})(window);
