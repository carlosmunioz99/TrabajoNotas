"use strict";
var oNotas = new Notas();

// Manejadores de eventos.
let registrarUsuario = () => {
  let bError = false;

  let sIdUsuario = frmRegistro.txtIdUsuario.value.trim();
  let oPatron = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ]{5,10}$/;

  if (!oPatron.test(sIdUsuario)) {
    let $smallError=frmRegistro.txtIdUsuario.nextElementSibling;
    $smallError.textContent="- El id debe estar compuesta por números o letras, entre 5 y 10 caracteres.";
    bError = true;
  }else{
    let $smallError=frmRegistro.txtIdUsuario.nextElementSibling;
    $smallError.textContent="";
  }


  let sNombre = frmRegistro.txtNombre.value.trim();
  oPatron = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,50}$/;

  if (!oPatron.test(sNombre)) {
    let $smallError=frmRegistro.txtNombre.nextElementSibling;
    $smallError.textContent="- Formato de nombre incorrecto.";
    bError = true;
  }else{
    let $smallError=frmRegistro.txtNombre.nextElementSibling;
    $smallError.textContent="";
  }

  let sEmail = frmRegistro.txtMail.value.trim();
  oPatron = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/;
  if (!oPatron.test(sEmail)) {
    let $smallError=frmRegistro.txtMail.nextElementSibling;
    $smallError.textContent="- Formato de email incorrecto";
    bError = true;
  }else{
    let $smallError=frmRegistro.txtMail.nextElementSibling;
    $smallError.textContent="";
  }

  let sPasword = frmRegistro.txtContraseña.value;
  oPatron = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ]{6,10}$/;
  if (!oPatron.test(sPasword)) {
    let $smallError=frmRegistro.txtContraseña.nextElementSibling;
    $smallError.textContent="- La contraseña debe estar compuesta por números o letras, entre 6 y 10 caracteres.";
    bError = true;
  }else{
    let $smallError=frmRegistro.txtContraseña.nextElementSibling;
    $smallError.textContent="";
  }

  if (!bError) {

    let oUsuario = new Usuario(sIdUsuario,sPasword,sEmail,sNombre);
    let $mensaje=frmRegistro.firstElementChild;

    $mensaje.classList.remove("ocultar");
    if(oNotas.registrarUsuario(oUsuario)){
      $mensaje.textContent="Registrado correctamente.";
      $mensaje.classList.remove("alert-danger");
      $mensaje.classList.add("alert-success");
    }else{
      $mensaje.textContent="Nombre de usuario o email ya existen";
      $mensaje.classList.remove("alert-success");
      $mensaje.classList.add("alert-danger");
    }

  } 

}


let limpiarRegistro =()=>{
  
  frmRegistro.reset();
  let vSmallErrores=document.querySelectorAll("#modalRegistro small,#modalRegistro form> div:first-child");
  
  vSmallErrores[0].classList.add("ocultar");
  for(let i=0;i<vSmallErrores.length;i++){
    vSmallErrores[i].textContent="";
  }
}

let iniciarSesion=()=>{
  
  let sInfo="";
  let $mensaje=frmLogin.querySelector(".alert");
  $mensaje.textContent="";
  let bError = false;
  let vError=[];

  let sNombreUsuario=frmLogin.txtNombreUsuario.value.trim();

  let oPatron = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ]{5,10}$/;
   

  
  if (!oPatron.test(sNombreUsuario)) {
    vError.push("- Formato de nombre de usuario incorrecto.");
    
    bError = true;
  }

  let sPasword = frmLogin.txtContraseña.value;
  oPatron = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ]{6,10}$/;
  
  if (!oPatron.test(sPasword)) {
    
    vError.push("- Formato de contraseña incorrecto.");
    
    bError = true;
  }
  
  if(!bError){
    if(oNotas.buscarUsuario(sNombreUsuario,sPasword)){

      frmLogin.submit(); 
  
    }else{
      vError.push("- Nombre de usuario o contraseña incorrectos.");
      
      bError=true;
    }
  }

  if(bError){
    vError.forEach(i=>{
      let $p=document.createElement("p");
      $p.textContent=i;
      $mensaje.appendChild($p);
    });
    $mensaje.classList.remove("ocultar");
    $mensaje.classList.add("alert-danger");
  }
  
  
}

let limpiarLogin=()=>{
  let $mensaje=frmLogin.querySelector(".alert");
  $mensaje.textContent="";
  $mensaje.classList.add("ocultar");
  frmLogin.reset();
}

//EVENTOS

//REGISTRO
let $btnRegistrar = document.getElementById("btnRegistrarUsuario");

$btnRegistrar.addEventListener("click", registrarUsuario);

let $btnCerrarRegistro=document.querySelector("#modalRegistro button");

$btnCerrarRegistro.addEventListener("click", limpiarRegistro);


//LOGIN
let $btnEntrarLogin = document.getElementById("btnModalLogin");

$btnEntrarLogin.addEventListener("click", iniciarSesion);

let $btnCerrarLogin = document.getElementById("btnCerrarModalLogin");

$btnCerrarLogin.addEventListener("click", limpiarLogin);