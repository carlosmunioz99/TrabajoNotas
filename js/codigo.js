"use strict";
var oNotas = new Notas();

// Manejadores de eventos.
let registrarUsuario = () => {
  let vErrores = [];
  let bError = false;

  let sIdUsuario = frmRegistro.txtIdUsuario.value.trim();
  let oPatron = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ]{5,10}$/;

  if (!oPatron.test(sIdUsuario)) {
    vErrores.push("- Formato de nombre de usuario incorrecto");
    bError = true;
  }


  let sNombre = frmRegistro.txtNombre.value.trim();
  oPatron = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ]{2,50}$/;

  if (!oPatron.test(sNombre)) {
    vErrores.push("- Formato de nombre incorrecto");
    bError = true;
  }

  let sEmail = frmRegistro.txtMail.value.trim();
  oPatron = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/;
  if (!oPatron.test(sEmail)) {
    vErrores.push("- Formato de email incorrecto");
    bError = true;
  }

  let sPasword = frmRegistro.txtContraseña.value;
  oPatron = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ]{6,10}$/;
  if (!oPatron.test(sPasword)) {
    vErrores.push("- Formato de password incorrecto");
    bError = true;
  }

  if (!bError) {

    let oUsuario = new Usuario(sIdUsuario,sPasword,sEmail,sNombre);
    
    if(oNotas.registrarUsuario(oUsuario)){
        vErrores.push("Se ha registrado correctamente.");
    }else{
        vErrores.push("No se ha podido registrar");
    }

  } 

  let $cuerpoModal=document.querySelector("#modalError .modal-body");

  for(let i=0;i<vErrores.length;i++){
    let $nuevoP=document.createElement("p");
    $nuevoP.textContent=vErrores[i];

    $cuerpoModal.appendChild($nuevoP);
  }
 

  $("#modalRegistro").hide();


  $("#modalError").show();
}


//eventos
let $btnRegistrar = document.getElementById("btnRegistrarUsuario");

$btnRegistrar.addEventListener("click", registrarUsuario);

let $btnEntrarLogin = document.getElementById("");