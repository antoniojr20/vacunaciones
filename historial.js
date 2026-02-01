const URL = "https://script.google.com/macros/s/AKfycbyuirVAIz6ldiDMKtCYBF9Vr4_yCLmd7-B-HVV7xelgTHxU15mw750yRLD9MVV7BBMs/exec?accion=historial";

document.addEventListener("DOMContentLoaded", () => {

  fetch(URL)
    .then(res => res.json())
    .then(data => {

      const tbody = document.getElementById("tablaHistorial");
      tbody.innerHTML = "";

      if (!data || data.length === 0) {
        tbody.innerHTML = `
          <tr>
            <td colspan="8" class="text-center p-4 text-gray-500">
              No hay registros aún
            </td>
          </tr>`;
        return;
      }

      data.forEach(row => {

        const fechaFormateada = row.fecha_registro
          ? new Date(row.fecha_registro).toLocaleString("es-SV", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit"
            })
          : "";

        const tr = document.createElement("tr");

        tr.innerHTML = `
          <td class="border p-2">${fechaFormateada}</td>
          <td class="border p-2">${row.ubicacion || ""}</td>
          <td class="border p-2 capitalize">${row.tipo_mascota || ""}</td>
          <td class="border p-2">${row.nombre_mascota || ""}</td>
          <td class="border p-2">${row.responsable || ""}</td>
        `;

        tbody.appendChild(tr);
      });

    })
    .catch(error => {
      console.error("Error al cargar historial:", error);
      alert(" Error al cargar el historial");
    });

});
