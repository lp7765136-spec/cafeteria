// Carta organizada por categorías
const carta = [
  // Cafés
  { categoria:"cafes", nombre:"Espresso", descripcion:"Café concentrado, intenso y con crema perfecta.", precio:6000, img:"https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=800" },
  { categoria:"cafes", nombre:"Cappuccino", descripcion:"Espresso, leche vaporizada y espuma cremosa.", precio:9000, img:"https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=800" },
  { categoria:"cafes", nombre:"Latte Vainilla", descripcion:"Espresso suave con leche y toque de vainilla.", precio:11000, img:"https://images.unsplash.com/photo-1541167760496-1628856ab772?w=800" },
  { categoria:"cafes", nombre:"Mocaccino", descripcion:"Espresso, chocolate y leche, ideal para antojarse.", precio:12000, img:"https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=800" },
  // Bebidas Frías
  { categoria:"frias", nombre:"Frappé de Café", descripcion:"Café frío batido con hielo y crema.", precio:13000, img:"https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800" },
  { categoria:"frias", nombre:"Cold Brew", descripcion:"Café filtrado en frío por 12 horas, suave.", precio:12000, img:"https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=800" },
  { categoria:"frias", nombre:"Limonada de Maracuyá", descripcion:"Refrescante, natural y sin azúcar añadida.", precio:10000, img:"https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800" },
  { categoria:"frias", nombre:"Jugo de Naranja", descripcion:"Exprimido al momento, 100% natural.", precio:8000, img:"https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=800" },
  // Panadería
  { categoria:"panaderia", nombre:"Croissant", descripcion:"Hojaldre de mantequilla, horneado en la mañana.", precio:7000, img:"https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800" },
  { categoria:"panaderia", nombre:"Almojábana", descripcion:"Tradicional, suave y con queso campesino.", precio:5000, img:"https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800" },
  { categoria:"panaderia", nombre:"Brownie de Chocolate", descripcion:"Con nueces y chocolate oscuro, caliente.", precio:9000, img:"https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=800" },
  { categoria:"panaderia", nombre:"Pan de Queso", descripcion:"Crujiente por fuera, suave por dentro.", precio:6000, img:"https://images.unsplash.com/photo-1585478259715-876acc5be8eb?w=800" },
  // Desayunos
  { categoria:"desayunos", nombre:"Desayuno Aroma", descripcion:"Huevos, arepa, queso, café y jugo.", precio:18000, img:"https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=800" },
  { categoria:"desayunos", nombre:"Tostadas con Aguacate", descripcion:"Pan artesanal, aguacate, huevo y semillas.", precio:16000, img:"https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=800" },
  { categoria:"desayunos", nombre:"Pancakes con Miel", descripcion:"Con frutos rojos, miel y mantequilla.", precio:15000, img:"https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800" },
  { categoria:"desayunos", nombre:"Caldo de Costilla", descripcion:"Caldo caliente, papa, cilantro y arepa.", precio:14000, img:"https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800" }
];

const contenedorCarta = document.getElementById("contenedorCarta");

// Mostrar carta según pestaña
function mostrarCarta(categoria){
  let filtrados = carta.filter(item => item.categoria === categoria);
  contenedorCarta.innerHTML = "";
  filtrados.forEach(item => {
    contenedorCarta.innerHTML += `
      <div class="card">
        <img src="${item.img}" alt="${item.nombre}">
        <div class="card-body">
          <h3>${item.nombre}</h3>
          <p>${item.descripcion}</p>
          <p class="precio">$${item.precio.toLocaleString()} COP</p>
        </div>
      </div>
    `;
  });
}

// Pestañas (tabs) con JavaScript y clases CSS
document.querySelectorAll(".tab-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("activo"));
    btn.classList.add("activo");
    mostrarCarta(btn.dataset.tab);
  });
});
mostrarCarta("cafes");

// Indicador Abierto ahora / Cerrado con clase Date
function verificarHorario(){
  let ahora = new Date();
  let dia = ahora.getDay(); // 0 = Domingo, 6 = Sábado
  let hora = ahora.getHours() + ahora.getMinutes() / 60;

  let abierto = false;
  let horarioTexto = "";

  if(dia === 0){
    // Domingo: 8:00 a 18:00
    abierto = hora >= 8 && hora < 18;
    horarioTexto = "Domingo 8:00 a.m. - 6:00 p.m.";
  } else {
    // Lunes a Sábado: 7:00 a 20:00
    abierto = hora >= 7 && hora < 20;
    horarioTexto = "Lunes a Sábado 7:00 a.m. - 8:00 p.m.";
  }

  let indicador = document.getElementById("indicadorHorario");
  let estadoHero = document.getElementById("estadoHero");

  if(abierto){
    indicador.textContent = "● Abierto ahora";
    indicador.classList.add("abierto");
    indicador.classList.remove("cerrado");
    estadoHero.textContent = "● Abierto ahora - " + horarioTexto;
  } else {
    indicador.textContent = "● Cerrado";
    indicador.classList.add("cerrado");
    indicador.classList.remove("abierto");
    estadoHero.textContent = "● Cerrado ahora - " + horarioTexto;
  }
}
verificarHorario();

// Formulario de reserva con validación y resumen sin recargar
document.getElementById("formReserva").addEventListener("submit", function(e){
  e.preventDefault();

  let nombre = document.getElementById("nombre").value.trim();
  let correo = document.getElementById("correo").value.trim();
  let fecha = document.getElementById("fecha").value;
  let hora = document.getElementById("hora").value;
  let personas = parseInt(document.getElementById("personas").value);

  // Validación: campos obligatorios
  if(!nombre || !correo || !fecha || !hora || !personas){
    alert("Por favor completa todos los campos.");
    return;
  }

  // Validación: no permitir fechas pasadas con Date
  let hoy = new Date();
  hoy.setHours(0,0,0,0);
  let fechaReserva = new Date(fecha + "T00:00:00");
  if(fechaReserva < hoy){
    alert("No puedes reservar en una fecha pasada. Elige una fecha de hoy en adelante.");
    return;
  }

  // Validación: número de personas 1 a 10
  if(personas < 1 || personas > 10){
    alert("El número de personas debe ser entre 1 y 10.");
    return;
  }

  // Mostrar resumen en pantalla sin recargar
  let resumen = document.getElementById("resumenReserva");
  resumen.classList.remove("oculto");
  resumen.innerHTML = `
    <h3>✅ ¡Reserva confirmada!</h3>
    <p><b>Nombre:</b> ${nombre}</p>
    <p><b>Correo:</b> ${correo}</p>
    <p><b>Fecha:</b> ${fecha}</p>
    <p><b>Hora:</b> ${hora}</p>
    <p><b>Personas:</b> ${personas}</p>
    <p>Te esperamos en Aroma & Grano. Te confirmamos por WhatsApp.</p>
    <a href="https://wa.me/573146039495?text=${encodeURIComponent(`Hola Aroma & Grano, soy ${nombre}. Reservé para ${fecha} a las ${hora} para ${personas} personas.`)}" target="_blank" class="btn-whatsapp">Confirmar por WhatsApp</a>
  `;
  resumen.scrollIntoView({behavior:"smooth"});
});