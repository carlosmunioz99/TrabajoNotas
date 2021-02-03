"use strict";
var oNotas = new Notas();
//usuarios de prueba
let u1 = new Usuario("pepe123", "idvacs", "pepe@gmail", "Pepe");
let u2 = new Usuario("juan23", "sftref", "juan@gmail", "Juanito");
let u3 = new Usuario("tostada2", "idvagfddfgcs", "tostada2@gmail", "tostada");
let u4 = new Usuario("tostadora43", "dfgef", "sech@gmail", "tostadora");
let u5 = new Usuario("fulanito25", "cmr99d", "carlos@gmail", "fulano");

oNotas.registrarUsuario(u1);
oNotas.registrarUsuario(u2);
oNotas.registrarUsuario(u3);
oNotas.registrarUsuario(u4);
oNotas.registrarUsuario(u5);


//grupos de prueba
let g1 = new Grupo("grupo1");
let g2 = new Grupo("grupo2");
let g3 = new Grupo("grupo3");
let g4 = new Grupo("grupo4");

oNotas.altaGrupo(g1);
oNotas.altaGrupo(g2);
oNotas.altaGrupo(g3);
oNotas.altaGrupo(g4);


oNotas.altaUsuarioGrupo(g1, [u1, u3, u2]);
oNotas.altaUsuarioGrupo(g2, [u1, u5]);
oNotas.altaUsuarioGrupo(g3, [u3, u4]);
oNotas.altaUsuarioGrupo(g4, [u2, u1, u3, u4]);

// Manejadores de eventos.
let registrarUsuario = () => {
    let bError = false;

    let sIdUsuario = frmRegistro.txtIdUsuario.value.trim();
    let oPatron = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ]{5,10}$/;

    if (!oPatron.test(sIdUsuario)) {
        let $smallError = frmRegistro.txtIdUsuario.nextElementSibling;
        $smallError.textContent = "- El id debe estar compuesta por números o letras entre 5 y 10 caracteres.";
        bError = true;
    } else {
        let $smallError = frmRegistro.txtIdUsuario.nextElementSibling;
        $smallError.textContent = "";
    }


    let sNombre = frmRegistro.txtNombre.value.trim();
    oPatron = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,50}$/;

    if (!oPatron.test(sNombre)) {
        let $smallError = frmRegistro.txtNombre.nextElementSibling;
        $smallError.textContent = "- Formato de nombre incorrecto.";
        bError = true;
    } else {
        let $smallError = frmRegistro.txtNombre.nextElementSibling;
        $smallError.textContent = "";
    }

    let sEmail = frmRegistro.txtMail.value.trim();
    oPatron = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/;
    if (!oPatron.test(sEmail)) {
        let $smallError = frmRegistro.txtMail.nextElementSibling;
        $smallError.textContent = "- Formato de email incorrecto";
        bError = true;
    } else {
        let $smallError = frmRegistro.txtMail.nextElementSibling;
        $smallError.textContent = "";
    }

    let sPasword = frmRegistro.txtContraseña.value;
    oPatron = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ]{6,10}$/;
    if (!oPatron.test(sPasword)) {
        let $smallError = frmRegistro.txtContraseña.nextElementSibling;
        $smallError.textContent = "- La contraseña debe estar compuesta por números o letras, entre 6 y 10 caracteres.";
        bError = true;
    } else {
        let $smallError = frmRegistro.txtContraseña.nextElementSibling;
        $smallError.textContent = "";
    }

    if (!bError) {

        let oUsuario = new Usuario(sIdUsuario, sPasword, sEmail, sNombre);
        let $mensaje = frmRegistro.firstElementChild;

        $mensaje.classList.remove("ocultar");
        if (oNotas.registrarUsuario(oUsuario)) {
            $mensaje.textContent = "Registrado correctamente.";
            $mensaje.classList.remove("alert-danger");
            $mensaje.classList.add("alert-success");
            generarTablaUsuarios();
            frmRegistro.reset();
            /*AÑADIR USUARIO AL COMBO MULTIPLE DE GRUPOS*/
            let oLista = document.querySelector("#usuariosGrupos");
            let oOpcion = document.createElement('option');
            oOpcion.textContent = oUsuario.usuario;
            oLista.appendChild(oOpcion);

        } else {
            $mensaje.textContent = "Nombre de usuario o email ya existen";
            $mensaje.classList.remove("alert-success");
            $mensaje.classList.add("alert-danger");
        }

    }

}


let limpiarRegistroUsuario = () => {

    frmRegistro.reset();
    let vSmallErrores = document.querySelectorAll("#modalRegistroUsuario small,#modalRegistroUsuario form> div:first-child");

    vSmallErrores[0].classList.add("ocultar");
    for (let i = 0; i < vSmallErrores.length; i++) {
        vSmallErrores[i].textContent = "";
    }
}

let borrarUsuario = (e) => {
    if (e.target.getAttribute("class") == "fondo-eliminar") {
        let sNombreUsuario = e.target.getAttribute("data-id");
        oNotas.bajaUsuario(sNombreUsuario);
        generarTablaUsuarios();
    }
}

let copiarUsuarioModalEditar = (e) => {
    if (e.target.getAttribute("class") == "fondo-editar") {
        let sNombreUsuario = e.target.getAttribute("data-id");

        let oUsuario = oNotas.buscarUsuario(sNombreUsuario);
        if (oUsuario != undefined) {
            let vCampos = frmEdicion.getElementsByTagName("input");
            vCampos[0].value = oUsuario.nombre;
            vCampos[1].value = oUsuario.usuario;
            vCampos[2].value = oUsuario.email;
            vCampos[3].value = oUsuario.contraseña;
        }

    }
}


let editarUsuario = () => {
    let bError = false;
    let sIdUsuario = frmEdicion.txtIdUsuario.value;


    let sNombre = frmEdicion.txtNombre.value.trim();
    let oPatron = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,50}$/;

    if (!oPatron.test(sNombre)) {
        let $smallError = frmEdicion.txtNombre.nextElementSibling;
        $smallError.textContent = "- Formato de nombre incorrecto.";
        bError = true;
    } else {
        let $smallError = frmEdicion.txtNombre.nextElementSibling;
        $smallError.textContent = "";
    }

    let sEmail = frmEdicion.txtMail.value.trim();
    oPatron = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/;
    if (!oPatron.test(sEmail)) {
        let $smallError = frmEdicion.txtMail.nextElementSibling;
        $smallError.textContent = "- Formato de email incorrecto";
        bError = true;
    } else {
        let $smallError = frmEdicion.txtMail.nextElementSibling;
        $smallError.textContent = "";
    }

    let sPasword = frmEdicion.txtContraseña.value;
    oPatron = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ]{6,10}$/;
    if (!oPatron.test(sPasword)) {
        let $smallError = frmEdicion.txtContraseña.nextElementSibling;
        $smallError.textContent = "- La contraseña debe estar compuesta por números o letras, entre 6 y 10 caracteres.";
        bError = true;
    } else {
        let $smallError = frmEdicion.txtContraseña.nextElementSibling;
        $smallError.textContent = "";
    }

    if (!bError) {

        let oUsuario = new Usuario(sIdUsuario, sPasword, sEmail, sNombre);
        let $mensaje = frmEdicion.firstElementChild;

        $mensaje.classList.remove("ocultar");



        if (oNotas.modificarUsuario(oUsuario)) {
            $mensaje.textContent = "Modificado correctamente.";
            $mensaje.classList.remove("alert-danger");
            $mensaje.classList.add("alert-success");
            generarTablaUsuarios();
            frmEdicion.reset();
        } else {
            $mensaje.textContent = "Email ya existe";
            $mensaje.classList.remove("alert-success");
            $mensaje.classList.add("alert-danger");
        }

    }
}


let limpiarEdicionUsuario = () => {
    frmEdicion.reset();
    let vSmallErrores = document.querySelectorAll("#modalEditarUsuario small,#modalEditarUsuario form> div:first-child");

    vSmallErrores[0].classList.add("ocultar");
    for (let i = 0; i < vSmallErrores.length; i++) {
        vSmallErrores[i].textContent = "";
    }
}

let generarTablaUsuarios = () => {

    //vaciar tablas si es q hay
    let $posibleTabla = document.querySelector("#contenedor-usuarios table");
    if ($posibleTabla != null) {
        $posibleTabla.remove();
    }

    //creación de tabla
    let $tabla = document.createElement("TABLE");
    $tabla.classList.add("table");

    let $thead = $tabla.createTHead();
    let $row1 = $thead.insertRow(-1);
    $row1.insertCell(-1).textContent = "ID";
    $row1.insertCell(-1).textContent = "NOMBRE";
    $row1.insertCell(-1).textContent = "EMAIL";
    $row1.insertCell(-1).textContent = "CONTRASEÑA";
    $row1.insertCell(-1).textContent = "EDITAR";
    $row1.insertCell(-1).textContent = "ELIMINAR";

    //cuerpo de la tabla
    let $tbody = $tabla.createTBody();

    oNotas.generarFilasUsuarios($tbody);


    let $contUsuarios = document.getElementById("contenedor-usuarios");


    $contUsuarios.insertBefore($tabla, $contUsuarios.lastElementChild);
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
for (let i = 0; i < listaUsuarios.length; i++) {
    let oOpcion = document.createElement('option');

    oOpcion.textContent = listaUsuarios[i].usuario;
    oLista.appendChild(oOpcion);
}
/*****************************************/


function validarGrupos() {
    let bValido = true;
    let txtNombreGrupo = frmAñadirGrupo.txtNombreGrupo.value.trim();
    //console.log(txtNombreGrupo);
    let regExp = /^[0-9a-zA-Z]{5,50}$/;

    if (!regExp.test(txtNombreGrupo)) {
        bValido = false;
        let smallError = frmAñadirGrupo.txtNombreGrupo.nextElementSibling;
        smallError.textContent = "Formato del grupo incorrecto. (De 5-50 caracteres)";
    } else {
        let smallError = frmAñadirGrupo.txtNombreGrupo.nextElementSibling;
        smallError.textContent = "";
    }

    let oListadoUsuarios = frmAñadirGrupo.usuariosGrupos;
    let oSeleccionado = oListadoUsuarios.selectedOptions;
    let nombreSeleccionado = []


    if (oSeleccionado.length == 0) {
        bValido = false;
        let smallError = frmAñadirGrupo.usuariosGrupos.nextElementSibling;
        smallError.textContent = "Incluya algún usuario en el grupo";
    } else {
        let smallError = frmAñadirGrupo.usuariosGrupos.nextElementSibling;
        smallError.textContent = "";
        for (let i = 0; i < oSeleccionado.length; i++) {
            nombreSeleccionado.push(oSeleccionado[i].textContent);
        }
    }

    if (bValido) {

        let oListadoUsuarios = oNotas.getUsuarios();
        let oListadoObjetosUsuario = [];
        //CREO UN ARRAY QUE BUSQUE LOS USUARIOS QUE SE HAN SELECCIONADO EN EL ARRAY DE USUARIO, SI LO ENCUENTRA METE EL OBJETO DE USUARIO//
        for (let i = 0; i < oListadoUsuarios.length; i++) {
            let nombreAEncontrar = oListadoUsuarios.find(oU => oU.usuario == nombreSeleccionado[i])
            if (nombreAEncontrar) {

                oListadoObjetosUsuario.push(nombreAEncontrar);
            }
        }


        let oGrupo = new Grupo(txtNombreGrupo);
        oNotas.altaUsuarioGrupo(oGrupo, oListadoObjetosUsuario);

        let mensaje = frmAñadirGrupo.firstElementChild;
        mensaje.classList.remove("ocultar");
        oNotas.altaGrupo(oGrupo)

        mensaje.textContent = "Grupo creado correctamente.";
        mensaje.classList.remove("alert-danger");
        mensaje.classList.add("alert-success");
        generarTablaGrupos();
        frmAñadirGrupo.reset();

    }
}


function generarTablaGrupos() {

    //vaciar tablas si es q hay
    let posibleTabla = document.querySelector("#contenedor-grupos table");
    if (posibleTabla != null) {
        posibleTabla.remove();
    }

    //creación de tabla
    let tabla = document.createElement("TABLE");
    tabla.classList.add("table");

    let thead = tabla.createTHead();
    let row1 = thead.insertRow(-1);
    row1.insertCell(-1).textContent = "Id";
    row1.insertCell(-1).textContent = "Nombre del Grupo";
    row1.insertCell(-1).textContent = "Lista de usuarios";
    row1.insertCell(-1).textContent = "Editar";
    row1.insertCell(-1).textContent = "Eliminar";

    //cuerpo de la tabla
    let tbody = tabla.createTBody();

    oNotas.generarFilasGrupos(tbody);


    let contGrupos = document.getElementById("contenedor-grupos");


    contGrupos.insertBefore(tabla, contGrupos.lastElementChild);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*NOTAS*/
/**RELLENAR COMBO MULTIPLE DE USUARIOS PARA NOTAS*/
oLista = document.querySelector("#usuarioPropietario");
listaUsuarios = oNotas.getUsuarios();
//console.log(listaUsuarios);
for (let i = 0; i < listaUsuarios.length; i++) {
    let oOpcion = document.createElement('option');
    oOpcion.textContent = listaUsuarios[i].usuario;
    oLista.appendChild(oOpcion);
}

function validarNota() {
    let bValido = true;
    let txtTituloNota = document.querySelector("#txtTituloNota");
    let regExp = /[a-zA-Z0-9\s]{4,50}/;

    if (!regExp.test(txtTituloNota)) {
        bValido = false;
        let smallError = frmNuevaNota.txtTituloNota.nextElementSibling;
        smallError.textContent = "Formato de título incorrecto, entre 4 y 50 caracteres";
    } else {
        let smallError = frmNuevaNota.txtTituloNota.nextElementSibling;
        smallError.textContent = "";
    }


    let txtContenidoNota = document.querySelector("#contenidoNota");
    if (txtContenidoNota.value == "") {
        bValido = false;
        let smallError = frmNuevaNota.contenidoNota.nextElementSibling;
        smallError.textContent = "Introduzca algún contenido en la nota";
    } else {
        let smallError = frmNuevaNota.contenidoNota.nextElementSibling;
        smallError.textContent = "";
    }


    let usuarioPropietario = document.querySelector("#usuarioPropietario");
    if (usuarioPropietario.selectedIndex == 0) {
        bValido = false;
        let smallError = frmNuevaNota.usuarioPropietario.nextElementSibling;
        smallError.textContent = "Seleccione un usuario para la nota";
    } else {
        let smallError = frmNuevaNota.contenidoNota.nextElementSibling;
        smallError.textContent = "";
    }
    let divPrioridad = document.querySelector("#rbPrioridad");
    let radioPrioridad = frmNuevaNota.radio.value;
    if (radioPrioridad == "") {
        bValido = false;
        let smallError = divPrioridad.nextElementSibling;
        smallError.textContent = "Seleccione una prioridad";
    } else {
        let smallError = divPrioridad.nextElementSibling;
        smallError.textContent = "";
    }
    if (bValido) {
        let oListadoUsuarios = oNotas.getUsuarios();

        let usuarioABuscar = oListadoUsuarios.find(oU => oU.usuario == usuarioPropietario.value)
        let oNota = new Nota(txtTituloNota.value, txtContenidoNota.value, radioPrioridad);

        usuarioABuscar.agregarNota(oNota);
        oNotas.altaNota(oNota);

        let mensaje = frmNuevaNota.firstElementChild;
        mensaje.classList.remove("ocultar");


        mensaje.textContent = "Nota creada correctamente.";
        mensaje.classList.remove("alert-danger");
        mensaje.classList.add("alert-success");

        frmNuevaNota.reset();

    }


}

function generarNotas() {
    let txtUsuarioAbuscar = document.querySelector("#txtUsuarioABuscar");
    //console.log(txtUsuarioAbuscar);
    let oListadoUsuarios = oNotas.getUsuarios();
    let usuarioABuscar = oListadoUsuarios.find(oU => oU.usuario == txtUsuarioAbuscar.value);


    if (!usuarioABuscar) {
        let smallError = txtUsuarioAbuscar.nextElementSibling;
        smallError.textContent = "El usuario introducido no existe";
    } else {
        let smallError = txtUsuarioAbuscar.nextElementSibling;
        smallError.textContent = "";

        let contenedor = document.querySelector("#imprimeNotas");

        let numHijos = contenedor.children;
        for (let i = 0; i < numHijos.length; i++) {
            contenedor.removeChild(numHijos[i])
        }

        let oNotasDeUsuario = usuarioABuscar.notas.slice(0);
        let listaGruposUsuario = oNotas._usuarioGrupos.filter(oUG => usuarioABuscar.usuario == oUG.idUsuario);

        //buscar las notas del grupo al q pertenezca el usuario.
        for (let i = 0; i < listaGruposUsuario.length; i++) {
            let oNotaAbuscar = oNotas._notas.find(oNot => oNot.id == listaGruposUsuario[i].idNota);

            if (oNotaAbuscar != undefined) {
                oNotasDeUsuario.push(oNotaAbuscar);
            }

        }

        for (let i = 0; i < oNotasDeUsuario.length; i++) {
            Nota.contenidoNota(oNotasDeUsuario[i], usuarioABuscar.usuario);
        }
    }
}

function borrarNota() {
    let oContenedorNota = document.querySelector(".card");
    let oBotonBorrar = document.getElementById("botonEliminarNota");
    let padre = oBotonBorrar.parentElement.parentElement;
    let idNotaABorrar = oContenedorNota.dataset.idNota
    let idUsuario = oContenedorNota.dataset.idUsuario;
    console.log(idUsuario);
    let divPrincipal = document.querySelector("#imprimeNotas");
    if (oNotas.eliminarNota(idNotaABorrar, idUsuario)) {
        divPrincipal.removeChild(padre)
    }

}





//EVENTOS

//registrar usuario
let $btnRegistrar = document.getElementById("btnRegistrarUsuario");

$btnRegistrar.addEventListener("click", registrarUsuario);

let $btnCerrarRegistro = document.querySelector("#modalRegistroUsuario button");

$btnCerrarRegistro.addEventListener("click", limpiarRegistroUsuario);

//borrar usuario
let $contenedorUsuario = document.getElementById("contenedor-usuarios");
$contenedorUsuario.addEventListener("click", borrarUsuario);

//editar usuario
$contenedorUsuario.addEventListener("click", copiarUsuarioModalEditar);

let $btnModificarUsuario = document.getElementById("btnModificarUsuario");
$btnModificarUsuario.addEventListener("click", editarUsuario);

let $btnCerrarModificarUsuario = $btnModificarUsuario.nextElementSibling;
$btnCerrarModificarUsuario.addEventListener("click", limpiarEdicionUsuario);

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