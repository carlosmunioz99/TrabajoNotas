"use strict";
var oNotas= new Notas();


//eventos
let $btnEntrarLogin=document.getElementById("btnLogin");

$btnLogin.addEventListener("click",registrarUsuario);























// Manejadores de eventos.
let registrarUsuario=()=>{

    let sErrores="";
    let bError=false;

    let sNombre = frmRegistro.txtNombre.value.trim();
    let oPatron=/^[a-zA-ZáéíóúÁÉÍÓÚñÑ]{2,50}$/;

    if(!oPatron.test()){
        sErrores+="Error en el nombre de usuario";
        bError=true;
    }


    let sEmail = frmRegistro.txtMail.value.trim();
    oPatron=/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/;
    if(!oPatron.test()){
        sErrores+="Error en el email";
        bError=true;
    }




    let sPasword = frmRegistro.txtContraseña.value.trim();
    oPatron=/^[a-zA-Z]$/;
    if(!oPatron.test()){
        sErrores+="Error en el email";
        bError=true;
    }
    


    return b
}