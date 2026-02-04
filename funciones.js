document.addEventListener("DOMContentLoaded", () => {

  const msg = document.getElementById("mensaje-ok");
  const contenedorCaserio = document.getElementById("contenedorCaserio");
  const selectCaserio = document.getElementById("caserio");

  const opciones = {
    rural: ["Canton Cercos de Piedras", "Canton San Pedro","Canton Hualama","Canton San Geronimo","Canton La Trinidad"],
    urbano: ["Colonia La Paz","Colonia La Presita","Colonia Guadalupe","Barrio Santa Ana","Barrio El Calvario","Barrio Santa Lucia","Barrio San Pedro"]
  };

  // ===== CASERÍOS POR CANTÓN =====
  const caserios = {
    "Canton Cercos de Piedras": [
      "Caserio la Cruz",
      "Caserio Las Guarumas",
      "Caserio El Picacho"
    ],
    "Canton San Pedro": [
      "Caserio El Jiote",
      "Caserio Pie de la Cuesta",
      "Caserio Los Carballos",
      "Caserio santa Rita",
      "Caserio Cacahuera",
      "Caserio Singaltique"
    ],
    "Canton Hualama": [
      "Caserio Hualama",
      "Caserio Tamera",
      "Caserio la Pista",
      "Caserio El Puente",
      "Caserio La Isla"
    ],
    "Canton San Geronimo": [
      "Caserio Potosi",
      "Caserio Crusero",
      "Caserio Santo Tomas",
      "Caserio San geronimo",
      "Caserio El Zuntulin"
    ],
    "Canton La Trinidad": [
      "Caserio Papalones",
      "Caserio El Rodeo",
      "Caserio Alto el Llano",
      "Caserio Los Amates",
      "Caserio Los Zelayas",
      "Caserio La Pavaya",
      "Caserio Corral Falso",
      "Caserio Talpetate",
      "Caserio La Trinidad"
    ]
  };

  // Cambiar opciones de ubicación según zona
  document.querySelectorAll('input[name="zona"]').forEach(radio => {
    radio.addEventListener("change", e => {
      cambiarOpciones(e.target.value);
      // Ocultar caseríos si cambia a urbano
      if (e.target.value === "urbano") {
        contenedorCaserio.classList.add("hidden");
        selectCaserio.removeAttribute("required");
        selectCaserio.value = "";
      }
    });
  });

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
      opt.value = texto;
      opt.textContent = texto;
      select.appendChild(opt);
    });
  }

  // ===== MOSTRAR CASERÍOS AL SELECCIONAR CANTÓN =====
  document.getElementById("ubicacion").addEventListener("change", function() {
    const ubicacionSeleccionada = this.value;
    const zonaSeleccionada = document.querySelector('input[name="zona"]:checked')?.value;

    // Solo mostrar caseríos si es zona rural Y es un cantón
    if (zonaSeleccionada === "rural" && caserios[ubicacionSeleccionada]) {
      contenedorCaserio.classList.remove("hidden");
      selectCaserio.setAttribute("required", "required");
      
      // Llenar opciones de caseríos
      selectCaserio.innerHTML = '<option value="" disabled selected>Seleccione un caserío</option>';
      caserios[ubicacionSeleccionada].forEach(caserio => {
        const opt = document.createElement("option");
        opt.value = caserio;
        opt.textContent = caserio;
        selectCaserio.appendChild(opt);
      });
    } else {
      contenedorCaserio.classList.add("hidden");
      selectCaserio.removeAttribute("required");
      selectCaserio.value = "";
    }
  });

  // ===== CREAR INPUTS DINÁMICOS PARA PERROS =====
  const cantidadPerros = document.getElementById("cantidadPerros");
  const contenedorPerros = document.getElementById("inputsPerros");

  if (cantidadPerros && contenedorPerros) {
    cantidadPerros.addEventListener("input", () => {
      contenedorPerros.innerHTML = "";

      const cantidad = parseInt(cantidadPerros.value);

      if (!cantidad || cantidad < 1) return;

      for (let i = 1; i <= cantidad; i++) {
        crearInput(contenedorPerros, `Perro ${i} - Nombre`, "nombre_perros[]");
      }
    });
  }

  // ===== CREAR INPUTS DINÁMICOS PARA GATOS =====
  const cantidadGatos = document.getElementById("cantidadGatos");
  const contenedorGatos = document.getElementById("inputsGatos");

  if (cantidadGatos && contenedorGatos) {
    cantidadGatos.addEventListener("input", () => {
      contenedorGatos.innerHTML = "";

      const cantidad = parseInt(cantidadGatos.value);

      if (!cantidad || cantidad < 1) return;

      for (let i = 1; i <= cantidad; i++) {
        crearInput(contenedorGatos, `Gato ${i} - Nombre`, "nombre_gatos[]");
      }
    });
  }

  // Función helper para crear inputs
  function crearInput(contenedor, label, name) {
    const div = document.createElement("div");

    const l = document.createElement("label");
    l.textContent = label;
    l.className = "block text-xs font-bold text-gray-600 mb-1";

    const input = document.createElement("input");
    input.type = "text";
    input.name = name;
    input.required = true;
    input.className = "w-full border rounded px-3 py-2 mb-2 focus:outline-none focus:border-blue-500";

    div.appendChild(l);
    div.appendChild(input);
    contenedor.appendChild(div);
  }

  // ===== ESTABLECER FECHA AUTOMÁTICA =====
  const fechaInput = document.getElementById("fechaRegistro");

  if (fechaInput) {
    const ahora = new Date();

    const fechaFormateada =
      ahora.getFullYear() + "-" +
      String(ahora.getMonth() + 1).padStart(2, "0") + "-" +
      String(ahora.getDate()).padStart(2, "0") + " " +
      String(ahora.getHours()).padStart(2, "0") + ":" +
      String(ahora.getMinutes()).padStart(2, "0") + ":" +
      String(ahora.getSeconds()).padStart(2, "0");

    fechaInput.value = fechaFormateada;
  }

  // ===== ENVÍO DEL FORMULARIO =====
  const form = document.querySelector("form");
  const btn = document.getElementById("btnGuardar");

  if (form && btn) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      btn.disabled = true;
      btn.textContent = "Guardando...";

      const formData = new FormData(form);

      fetch(form.action, {
        method: "POST",
        body: formData
      })
      .then(res => res.text())
      .then(() => {
        // Mostrar mensaje de éxito
        msg.classList.remove("hidden");

        setTimeout(() => {
          msg.classList.add("hidden");
        }, 5000);

        // GUARDAR valores que NO se deben limpiar
        const zonaSeleccionada = document.querySelector('input[name="zona"]:checked')?.value || "";
        const ubicacionSeleccionada = document.getElementById("ubicacion").value;
        const caserioGuardado = document.getElementById("caserio").value;
        const responsableGuardado = form.querySelector('[name="responsable"]').value;

        // Limpiar formulario
        form.reset();
        
        // RESTAURAR valores guardados
        if (zonaSeleccionada) {
          const radioZona = document.querySelector(`input[name="zona"][value="${zonaSeleccionada}"]`);
          if (radioZona) {
            radioZona.checked = true;
            // Recargar las opciones de ubicación
            cambiarOpciones(zonaSeleccionada);
            // Esperar un momento para que se carguen las opciones
            setTimeout(() => {
              document.getElementById("ubicacion").value = ubicacionSeleccionada;
              
              // Restaurar caserío si es rural
              if (zonaSeleccionada === "rural" && caserios[ubicacionSeleccionada]) {
                contenedorCaserio.classList.remove("hidden");
                selectCaserio.setAttribute("required", "required");
                selectCaserio.innerHTML = '<option value="" disabled>Seleccione un caserío</option>';
                caserios[ubicacionSeleccionada].forEach(caserio => {
                  const opt = document.createElement("option");
                  opt.value = caserio;
                  opt.textContent = caserio;
                  selectCaserio.appendChild(opt);
                });
                setTimeout(() => {
                  selectCaserio.value = caserioGuardado;
                }, 50);
              }
            }, 50);
          }
        }
        
        if (responsableGuardado) {
          form.querySelector('[name="responsable"]').value = responsableGuardado;
        }
        
        // Limpiar inputs dinámicos
        document.getElementById("cantidadPerros").value = "0";
        document.getElementById("cantidadGatos").value = "0";
        document.getElementById("gatosencontrados").value = "0";
        document.getElementById("perrosencontrados").value = "0";
        document.getElementById("inputsPerros").innerHTML = "";
        document.getElementById("inputsGatos").innerHTML = "";

        // Actualizar fecha
        if (fechaInput) {
          const ahora = new Date();
          const fechaFormateada =
            ahora.getFullYear() + "-" +
            String(ahora.getMonth() + 1).padStart(2, "0") + "-" +
            String(ahora.getDate()).padStart(2, "0") + " " +
            String(ahora.getHours()).padStart(2, "0") + ":" +
            String(ahora.getMinutes()).padStart(2, "0") + ":" +
            String(ahora.getSeconds()).padStart(2, "0");
          fechaInput.value = fechaFormateada;
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("❌ Error al guardar. Por favor intente nuevamente.");
      })
      .finally(() => {
        btn.disabled = false;
        btn.textContent = "Guardar";
      });
    });
  }

});