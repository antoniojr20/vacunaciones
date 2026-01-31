document.addEventListener("DOMContentLoaded", () => {

  const msg = document.getElementById("mensaje-ok");
  if (msg) {
    setTimeout(() => {
      msg.style.transition = "opacity 0.5s";
      msg.style.opacity = "0";
      setTimeout(() => msg.remove(), 500);
    }, 5000);

  }

  const opciones = {
    rural: ["Cantón Valle Alegre", "Caserío las Pozas", "Caserio los herreras", "Canton los Ejidos", "Caserio la Estancia"],
    urbano: ["Barrio el calvario", "Colonia la paz", "Barrio san pedro", "Barrio la Esperanza", "Barrio santa ana"]
  };

  document.querySelectorAll('input[name="zona"]').forEach(radio => {
    radio.addEventListener("change", e => {
      cambiarOpciones(e.target.value);
    });
  });

  // elegir ubicacion
  function cambiarOpciones(tipo) {
    const select = document.getElementById("ubicacion");
    select.innerHTML = "";
    select.disabled = false;

    const placeholder = document.createElement("option");
    placeholder.textContent = "Seleccione una opción";
    placeholder.value = "";
    placeholder.selected = true;
    placeholder.disabled = true;

    select.appendChild(placeholder);

    opciones[tipo].forEach(texto => {
      const opt = document.createElement("option");
      opt.value = texto.toLowerCase();
      opt.textContent = texto;
      select.appendChild(opt);
    });
  }

  /// crear los input de los perros
  const cantidadMascotas = document.getElementById("cantidadPerros");
  const contenedor = document.getElementById("inputsPerros");

  if (cantidadMascotas && contenedor) {
    cantidadMascotas.addEventListener("input", () => {
      contenedor.innerHTML = "";

      const cantidad = parseInt(cantidadMascotas.value);

      if (!cantidad || cantidad < 1) return;

      for (let i = 1; i <= cantidad; i++) {
        crearInput(`Nombre del perro ${i}`, "nombre_perros[]");
      }
    });
  }

  function crearInput(label, name) {
    const div = document.createElement("div");

    const l = document.createElement("label");
    l.textContent = label;
    l.className = "block text-xs font-bold text-gray-600 mb-1";

    const input = document.createElement("input");
    input.type = "text";
    input.name = name;
    input.required = true;
    input.className = "w-full border rounded px-3 py-2 mb-2";

    div.appendChild(l);
    div.appendChild(input);
    contenedor.appendChild(div);
  }

   /// crear los input de los Gatos
  const cantidadMasGatos = document.getElementById("cantidadGatos");
  const contenedorGa = document.getElementById("inputsGatos");

  if (cantidadMasGatos && contenedorGa) {
    cantidadMasGatos.addEventListener("input", () => {
      contenedorGa.innerHTML = "";

      const cantidad = parseInt(cantidadMasGatos.value);

      if (!cantidad || cantidad < 1) return;

      for (let i = 1; i <= cantidad; i++) {
        crearInputG(`Nombre del Gato ${i}`, "nombre_gatos[]");
      }
    });
  }

  function crearInputG(label, name) {
    const div = document.createElement("div");

    const l = document.createElement("label");
    l.textContent = label;
    l.className = "block text-xs font-bold text-gray-600 mb-1";

    const input = document.createElement("input");
    input.type = "text";
    input.name = name;
    input.required = true;
    input.className = "w-full border rounded px-3 py-2 mb-2";

    div.appendChild(l);
    div.appendChild(input);
    contenedorGa.appendChild(div);
  }

  const form = document.querySelector("form");
  const btn = document.getElementById("btnGuardar");

  if (form && btn) {
    btn.addEventListener("click", () => {

      btn.disabled = true;
      btn.textContent = "Guardando...";

      const formData = new FormData(form);

      fetch(form.action, {
        method: "POST",
        body: formData
      })
      .then(res => res.text())
      .then(() => {
        alert("✅ Registro guardado correctamente");
        form.reset();
        document.getElementById("inputsPerros").innerHTML = "";
        document.getElementById("inputsGatos").innerHTML = "";

        const ahora = new Date();
        fechaInput.value = ahora.getFullYear() + "-" +
          String(ahora.getMonth() + 1).padStart(2, "0") + "-" +
          String(ahora.getDate()).padStart(2, "0") + " " +
          String(ahora.getHours()).padStart(2, "0") + ":" +
          String(ahora.getMinutes()).padStart(2, "0") + ":" +
          String(ahora.getSeconds()).padStart(2, "0");
      })
      .catch(() => {
        alert("❌ Error al guardar");
      })
      .finally(() => {
        btn.disabled = false;
        btn.textContent = "Guardar";
      });

    });
  }

  const fechaInput = document.getElementById("fechaRegistro");

  if (fechaInput) {
    const ahora = new Date();

    // formato: YYYY-MM-DD HH:MM:SS
    const fechaFormateada = ahora.getFullYear() + "-" +
      String(ahora.getMonth() + 1).padStart(2, "0") + "-" +
      String(ahora.getDate()).padStart(2, "0") + " " +
      String(ahora.getHours()).padStart(2, "0") + ":" +
      String(ahora.getMinutes()).padStart(2, "0") + ":" +
      String(ahora.getSeconds()).padStart(2, "0");

    fechaInput.value = fechaFormateada;
  }

});
