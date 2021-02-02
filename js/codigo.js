"use strict";
var oNotas = new Notas();
//usuarios de prueba
oNotas.registrarUsuario(new Usuario("pepe123","idvacs","pepe@gmail","Pepe"));
oNotas.registrarUsuario(new Usuario("juan23","sfef","pepe@gmail","Jaunito"));
oNotas.registrarUsuario(new Usuario("elmidas2","idvagfddfgcs","elmmidas@gmail","Mid"));
oNotas.registrarUsuario(new Usuario("estesech","dfg","sech@gmail","Sech"));
oNotas.registrarUsuario(new Usuario("carlos","cmr99","carlos@gmail","cmr1234"));

// Manejadores de eventos.
let registrarUsuario = () => {
  let bError = false;

  let sIdUsuario = frmRegistro.txtIdUsuario.value.trim();
  let oPatron = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ]{5,10}$/;

  if (!oPatron.test(sIdUsuario)) {
    let $smallError=frmRegistro.txtIdUsuario.nextElementSibling;
    $smallError.textContent="- El id debe estar compuesta por números o letras entre 5 y 10 caracteres.";
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
      generarTablaUsuarios();
      frmRegistro.reset();
      /*AÑADIR USUARIO AL COMBO MULTIPLE DE GRUPOS*/
      let oLista = document.querySelector("#usuariosGrupos");
      let oOpcion = document.createElement('option');
      oOpcion.textContent = oUsuario.usuario;
      oLista.appendChild(oOpcion);

    }else{
      $mensaje.textContent="Nombre de usuario o email ya existen";
      $mensaje.classList.remove("alert-success");
      $mensaje.classList.add("alert-danger");
    }

  } 

}


let limpiarRegistroUsuario =()=>{
  
  frmRegistro.reset();
  let vSmallErrores=document.querySelectorAll("#modalRegistroUsuario small,#modalRegistroUsuario form> div:first-child");
  
  vSmallErrores[0].classList.add("ocultar");
  for(let i=0;i<vSmallErrores.length;i++){
    vSmallErrores[i].textContent="";
  }
}

let borrarUsuario=(e)=>{
  if(e.target.getAttribute("class")=="fondo-eliminar"){
    let sNombreUsuario=e.target.getAttribute("data-id");
    oNotas.bajaUsuario(sNombreUsuario);
    generarTablaUsuarios();
  }
}

let copiarUsuarioModalEditar=(e)=>{
  if(e.target.getAttribute("class")=="fondo-editar"){
    let sNombreUsuario=e.target.getAttribute("data-id");
    
    let oUsuario=oNotas.buscarUsuario(sNombreUsuario);
    if(oUsuario!=undefined){
      let vCampos=frmEdicion.getElementsByTagName("input");
      vCampos[0].value=oUsuario.nombre;
      vCampos[1].value=oUsuario.usuario;
      vCampos[2].value=oUsuario.email;
      vCampos[3].value=oUsuario.contraseña;
    }
    
  }
}


let editarUsuario=()=>{
  let bError = false;
  let sIdUsuario=frmEdicion.txtIdUsuario.value;


  let sNombre = frmEdicion.txtNombre.value.trim();
  let oPatron = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,50}$/;

  if (!oPatron.test(sNombre)) {
    let $smallError=frmEdicion.txtNombre.nextElementSibling;
    $smallError.textContent="- Formato de nombre incorrecto.";
    bError = true;
  }else{
    let $smallError=frmEdicion.txtNombre.nextElementSibling;
    $smallError.textContent="";
  }

  let sEmail = frmEdicion.txtMail.value.trim();
  oPatron = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/;
  if (!oPatron.test(sEmail)) {
    let $smallError=frmEdicion.txtMail.nextElementSibling;
    $smallError.textContent="- Formato de email incorrecto";
    bError = true;
  }else{
    let $smallError=frmEdicion.txtMail.nextElementSibling;
    $smallError.textContent="";
  }

  let sPasword = frmEdicion.txtContraseña.value;
  oPatron = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ]{6,10}$/;
  if (!oPatron.test(sPasword)) {
    let $smallError=frmEdicion.txtContraseña.nextElementSibling;
    $smallError.textContent="- La contraseña debe estar compuesta por números o letras, entre 6 y 10 caracteres.";
    bError = true;
  }else{
    let $smallError=frmEdicion.txtContraseña.nextElementSibling;
    $smallError.textContent="";
  }

  if (!bError) {

    let oUsuario = new Usuario(sIdUsuario,sPasword,sEmail,sNombre);
    let $mensaje=frmEdicion.firstElementChild;

    $mensaje.classList.remove("ocultar");
    
    

    if(oNotas.modificarUsuario(oUsuario)){
      $mensaje.textContent="Modificado correctamente.";
      $mensaje.classList.remove("alert-danger");
      $mensaje.classList.add("alert-success");
      generarTablaUsuarios();
      frmEdicion.reset();
    }else{
      $mensaje.textContent="Email ya existe";
      $mensaje.classList.remove("alert-success");
      $mensaje.classList.add("alert-danger");
    }

  } 
}


let limpiarEdicionUsuario=()=>{
  frmEdicion.reset();
  let vSmallErrores=document.querySelectorAll("#modalEditarUsuario small,#modalEditarUsuario form> div:first-child");
  
  vSmallErrores[0].classList.add("ocultar");
  for(let i=0;i<vSmallErrores.length;i++){
    vSmallErrores[i].textContent="";
  }
}

let generarTablaUsuarios=()=>{
  
  //vaciar tablas si es q hay
  let $posibleTabla=document.querySelector("#contenedor-usuarios table");
  if($posibleTabla!=null){
    $posibleTabla.remove();
  }

  //creación de tabla
  let $tabla=document.createElement("TABLE");
  $tabla.classList.add("table");

  let $thead=$tabla.createTHead();
  let $row1=$thead.insertRow(-1);
  $row1.insertCell(-1).textContent="ID";
  $row1.insertCell(-1).textContent="NOMBRE";
  $row1.insertCell(-1).textContent="EMAIL";
  $row1.insertCell(-1).textContent="CONTRASEÑA";
  $row1.insertCell(-1).textContent="EDITAR";
  $row1.insertCell(-1).textContent="ELIMINAR";

  //cuerpo de la tabla
  let $tbody=$tabla.createTBody();

  oNotas.generarFilasUsuarios($tbody);


  let $contUsuarios=document.getElementById("contenedor-usuarios");


  $contUsuarios.insertBefore($tabla,$contUsuarios.lastElementChild);
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*GRUPOS*/

/**RELLENAR COMBO MULTIPLE DE USUARIOS PARA GRUPOS*/

let oLista = document.querySelector("#usuariosGrupos");
let listaUsuarios = oNotas.getUsuarios();
//console.log(listaUsuarios);
for(let i=0;i<listaUsuarios.length;i++)
{
  let oOpcion = document.createElement('option');
  
  oOpcion.textContent = listaUsuarios[i].usuario;
  oLista.appendChild(oOpcion);
}
/*****************************************/


function validarGrupos()
{
  let bValido = true;
  let txtNombreGrupo = frmAñadirGrupo.txtNombreGrupo.value.trim();
  //console.log(txtNombreGrupo);
  let regExp = /^[0-9a-zA-Z]{5,50}$/;

  if(!regExp.test(txtNombreGrupo))
  {
    bValido = false;
    let smallError=frmAñadirGrupo.txtNombreGrupo.nextElementSibling;
    smallError.textContent= "Formato del grupo incorrecto. (De 5-50 caracteres)";
  }
  else
  {
    let smallError=frmAñadirGrupo.txtNombreGrupo.nextElementSibling;
    smallError.textContent= "";
  }
  
  let oListadoUsuarios = frmAñadirGrupo.usuariosGrupos;
  let oSeleccionado = oListadoUsuarios.selectedOptions;
  let nombreSeleccionado = []


  if(oSeleccionado.length == 0)
  {
    bValido = false;
    let smallError=frmAñadirGrupo.usuariosGrupos.nextElementSibling;
    smallError.textContent= "Incluya algún usuario en el grupo";
  }
  else
  {
    let smallError=frmAñadirGrupo.usuariosGrupos.nextElementSibling;
    smallError.textContent= "";
    for (let i=0;i<oSeleccionado.length;i++)
    {
      nombreSeleccionado.push(oSeleccionado[i].textContent);
    }
  }

  if(bValido)
  {

    let oListadoUsuarios = oNotas.getUsuarios();
    let oListadoObjetosUsuario = [];
//CREO UN ARRAY QUE BUSQUE LOS USUARIOS QUE SE HAN SELECCIONADO EN EL ARRAY DE USUARIO, SI LO ENCUENTRA METE EL OBJETO DE USUARIO//
    for(let i=0;i<oListadoUsuarios.length;i++)
    {
      let nombreAEncontrar = oListadoUsuarios.find(oU => oU.usuario == nombreSeleccionado[i])
      if(nombreAEncontrar)
      {
        
        oListadoObjetosUsuario.push(nombreAEncontrar);
      }
    }


    let oGrupo = new Grupo(txtNombreGrupo);
    oNotas.altaUsuarioGrupo(oGrupo,oListadoObjetosUsuario);

    let mensaje=frmAñadirGrupo.firstElementChild;
    mensaje.classList.remove("ocultar");
    oNotas.altaGrupo(oGrupo)
    
      mensaje.textContent="Grupo creado correctamente.";
      mensaje.classList.remove("alert-danger");
      mensaje.classList.add("alert-success");
      generarTablaGrupos();
      frmAñadirGrupo.reset();
    
  }
}


  function generarTablaGrupos()
  {
  
    //vaciar tablas si es q hay
    let posibleTabla=document.querySelector("#contenedor-grupos table");
    if(posibleTabla!=null)
    {
      posibleTabla.remove();
    }
  
    //creación de tabla
    let tabla=document.createElement("TABLE");
    tabla.classList.add("table");
  
    let thead=tabla.createTHead();
    let row1=thead.insertRow(-1);
    row1.insertCell(-1).textContent="Id";
    row1.insertCell(-1).textContent="Nombre del Grupo";
    row1.insertCell(-1).textContent="Lista de usuarios";
    row1.insertCell(-1).textContent="Editar";
    row1.insertCell(-1).textContent="Eliminar";

    //cuerpo de la tabla
    let tbody=tabla.createTBody();
  
    oNotas.generarFilasGrupos(tbody);
  

    let contGrupos=document.getElementById("contenedor-grupos");
  
  
    contGrupos.insertBefore(tabla,contGrupos.lastElementChild);
  }








//EVENTOS

//registrar usuario
let $btnRegistrar = document.getElementById("btnRegistrarUsuario");

$btnRegistrar.addEventListener("click", registrarUsuario);

let $btnCerrarRegistro=document.querySelector("#modalRegistroUsuario button");

$btnCerrarRegistro.addEventListener("click", limpiarRegistroUsuario);

//borrar usuario
let $contenedorUsuario=document.getElementById("contenedor-usuarios");
$contenedorUsuario.addEventListener("click",borrarUsuario);

//editar usuario
$contenedorUsuario.addEventListener("click",copiarUsuarioModalEditar);

let $btnModificarUsuario=document.getElementById("btnModificarUsuario");
$btnModificarUsuario.addEventListener("click",editarUsuario);

let $btnCerrarModificarUsuario=$btnModificarUsuario.nextElementSibling;
$btnCerrarModificarUsuario.addEventListener("click",limpiarEdicionUsuario);

//GRUPOS//
let btnAñadirGrupo = document.querySelector("#btnCrearGrupos");
btnAñadirGrupo.addEventListener("click", validarGrupos);
 
let btnGenerarTablaGrupos = document.querySelector("#generarTablaGrupos");
btnGenerarTablaGrupos.addEventListener("click", generarTablaGrupos);
