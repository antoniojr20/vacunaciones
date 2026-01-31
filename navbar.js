document.addEventListener("DOMContentLoaded", () => {
  fetch("navbar.html")
    .then(res => res.text())
    .then(html => {
      document.getElementById("navbar").innerHTML = html;

      // Marcar enlace activo
      const links = document.querySelectorAll(".nav-link");
      const currentPage = location.pathname.split("/").pop();

      links.forEach(link => {
        if (link.getAttribute("href") === currentPage) {
          link.classList.add("bg-gray-950/50", "text-white");
          link.classList.remove("text-gray-300");
        }
      });
    })
    .catch(err => console.error("Error cargando navbar:", err));
});
