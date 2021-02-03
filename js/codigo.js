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
  let oPatron = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ]{5,30}$/;

  if (!oPatron.test(sIdUsuario)) {
    let $smallError=frmRegistro.txtIdUsuario.nextElementSibling;
    $smallError.textContent="- El id debe estar compuesta por números o letras entre 5 y 30 caracteres.";
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
  oPatron = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ]{6,15}$/;
  if (!oPatron.test(sPasword)) {
    let $smallError=frmRegistro.txtContraseña.nextElementSibling;
    $smallError.textContent="- La contraseña debe estar compuesta por números o letras, entre 6 y 15 caracteres.";
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


let limpiarRegistro =()=>{
  
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


    let oGrupo = new Grupo(txtNombreGrupo, oListadoObjetosUsuario);


    let mensaje=frmAñadirGrupo.firstElementChild;
    mensaje.classList.remove("ocultar");
    if(oNotas.altaGrupo(oGrupo))
    {
      mensaje.textContent="Grupo creado correctamente.";
      mensaje.classList.remove("alert-danger");
      mensaje.classList.add("alert-success");
      generarTablaGrupos();
      frmAñadirGrupo.reset();
    }
    else
    {
      mensaje.textContent="Ese grupo ya esta en nuestra plataforma";
      mensaje.classList.remove("alert-success");
      mensaje.classList.add("alert-danger");
    }
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
    row1.insertCell(-1).textContent="NOMBRE DEL GRUPO";
    row1.insertCell(-1).textContent="MIEMBROS DEL GRUPO";
    row1.insertCell(-1).textContent="EDITAR";
    row1.insertCell(-1).textContent="ELIMINAR";
  
    //cuerpo de la tabla
    let tbody=tabla.createTBody();
  
    oNotas.generarFilasGrupos(tbody);
  

    let contGrupos=document.getElementById("contenedor-grupos");
  
  
    contGrupos.insertBefore(tabla,contGrupos.lastElementChild);
  }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*NOTAS*/
/**RELLENAR COMBO MULTIPLE DE USUARIOS PARA NOTAS*/
oLista = document.querySelector("#usuarioPropietario");
listaUsuarios = oNotas.getUsuarios();
//console.log(listaUsuarios);
for(let i=0;i<listaUsuarios.length;i++)
{
  let oOpcion = document.createElement('option');
  oOpcion.textContent = listaUsuarios[i].usuario;
  oLista.appendChild(oOpcion);
}

function validarNota()
{
  let bValido = true;
  let txtTituloNota = document.querySelector("#txtTituloNota");
  let regExp = /[a-zA-Z0-9\s]{4,50}/;

  if(!regExp.test(txtTituloNota.value))
  {
    bValido = false;
    let smallError=frmNuevaNota.txtTituloNota.nextElementSibling;
    smallError.textContent= "Formato de título incorrecto, entre 4 y 50 caracteres";
  }
  else
  {
    let smallError=frmNuevaNota.txtTituloNota.nextElementSibling;
    smallError.textContent= "";
  }


  let txtContenidoNota = document.querySelector("#contenidoNota");
  if(txtContenidoNota.value == "")
  {
    bValido = false;
    let smallError=frmNuevaNota.contenidoNota.nextElementSibling;
    smallError.textContent= "Introduzca algún contenido en la nota";
  }
  else
  {
    let smallError=frmNuevaNota.contenidoNota.nextElementSibling;
    smallError.textContent= "";
  }


  let usuarioPropietario = document.querySelector("#usuarioPropietario");
  if(usuarioPropietario.selectedIndex == 0)
  {
    bValido = false;
    let smallError=frmNuevaNota.usuarioPropietario.nextElementSibling;
    smallError.textContent= "Seleccione un usuario para la nota";
  }
  else
  {
    let smallError=frmNuevaNota.contenidoNota.nextElementSibling;
    smallError.textContent= "";
  }

  let radioPrioridad = frmNuevaNota.radio.value;


  if(bValido)
  {
    let oListadoUsuarios = oNotas.getUsuarios();
    let numero = random(10, 10000)
    let usuarioABuscar = oListadoUsuarios.find(oU => oU.usuario == usuarioPropietario.value)
    let oNota = new Nota(numero, txtTituloNota.value, txtContenidoNota.value, radioPrioridad, usuarioABuscar);


    let mensaje=frmNuevaNota.firstElementChild;
    mensaje.classList.remove("ocultar");
    if(oNotas.altaNota(oNota))
    {
      mensaje.textContent="Nota creada correctamente.";
      mensaje.classList.remove("alert-danger");
      mensaje.classList.add("alert-success");
      generarTablaGrupos();
      frmNuevaNota.reset();
    }
    else
    {
      mensaje.textContent="Error al crear la nota, intentelo de nuevo";
      mensaje.classList.remove("alert-success");
      mensaje.classList.add("alert-danger");
    }
  }

  function random(min, max) 
  {
    return Math.floor((Math.random() * (max - min + 1)) + min);
  }

}


function generarNotas()
  {
    let txtUsuarioAbuscar = document.querySelector("#txtUsuarioABuscar");
    //console.log(txtUsuarioAbuscar);
    let oListadoUsuarios = oNotas.getUsuarios();
    let usuarioABuscar = oListadoUsuarios.find(oU => oU.usuario == txtUsuarioAbuscar.value)
    if(!usuarioABuscar)
    {
      let smallError=txtUsuarioAbuscar.nextElementSibling;
      smallError.textContent= "El usuario introducido no existe";
    }
    else
    {
      let smallError=txtUsuarioAbuscar.nextElementSibling;
      smallError.textContent= "";

      
      for(let i=0;i<usuarioABuscar.notas.length;i++)
      {
        Nota.contenidoNota(usuarioABuscar.notas[i]);
      }
      //console.log(usuarioABuscar.notas);


    }
  }





//EVENTOS

//registrar usuario
let $btnRegistrar = document.getElementById("btnRegistrarUsuario");

$btnRegistrar.addEventListener("click", registrarUsuario);

let $btnCerrarRegistro=document.querySelector("#modalRegistroUsuario button");

$btnCerrarRegistro.addEventListener("click", limpiarRegistro);

//borrar usuario
let $contenedorUsuario=document.getElementById("contenedor-usuarios");
$contenedorUsuario.addEventListener("click",borrarUsuario);

//LOGIN
let $btnEntrarLogin = document.getElementById("btnModalLogin");

$btnEntrarLogin.addEventListener("click", iniciarSesion);

let $btnCerrarLogin = document.getElementById("btnCerrarModalLogin");

$btnCerrarLogin.addEventListener("click", limpiarLogin);

//GRUPOS//
let btnAñadirGrupo = document.querySelector("#btnCrearGrupos");
btnAñadirGrupo.addEventListener("click", validarGrupos);
 
let btnGenerarTablaGrupos = document.querySelector("#generarTablaGrupos");
btnGenerarTablaGrupos.addEventListener("click", generarTablaGrupos);



//NOTAS//
let btnCrearNota = document.querySelector("#btnCrearNota");
btnCrearNota.addEventListener("click", validarNota);


let btnNotasPorUsuario = document.querySelector("#btnBuscarNotas");
btnNotasPorUsuario.addEventListener("click", generarNotas);