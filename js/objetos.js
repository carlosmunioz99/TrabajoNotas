'use strict';
class Notas {
    constructor() {
        this._notas = [];
        this._usuarios = [];
        this._usuarioGrupos = [];
        this._grupos = [];
    }

    getUsuarios() {
        return this._usuarios;
    }

    getGrupos() {
        return this._grupos;
    }

    getNotas() {
        return this._notas;
    }

    getUsuariosGrupos() {
        return this._usuarioGrupos;
    }
    registrarUsuario(oUsuario) {
        let bResultado = true;

        if (this._usuarios.some(oU => (oU.usuario == oUsuario.usuario || oU.email == oUsuario.email))) {
            bResultado = false;
        } else {
            this._usuarios.push(oUsuario);
        }
        return bResultado;

    }





    buscarUsuario(sNombreUsuario) {


        let oUsuario = this._usuarios.find(oUser => oUser.usuario == sNombreUsuario);

        return oUsuario;
    }

    modificarUsuario(oUsuario) {
        //comprobar que el email no exista. 
        let bModificado = true;

        if (this._usuarios.some(oU => (oU.email == oUsuario.email) && (oUsuario.usuario != oU.usuario))) {
            bModificado = false;
        } else {
            let oRefeUsuario = this.buscarUsuario(oUsuario.usuario);

            oRefeUsuario.email = oUsuario.email;
            oRefeUsuario.nombre = oUsuario.nombre;
            oRefeUsuario.contraseña = oUsuario.contraseña;
        }

        return bModificado;
    }

    bajaUsuario(sNombreUsuario) {
        let iPosUsuario = this._usuarios.findIndex(oUsuario => oUsuario.usuario == sNombreUsuario);
        let oUsuario = this._usuarios.splice(iPosUsuario, 1)[0];

        //notas de usuario

        for (let i = 0; i < oUsuario.notas.length; i++) {

            let iPos = this._notas.findIndex(oN => oN.id == oUsuario.notas[i].id);
            this._notas.splice(iPos, 1);
        }


        let vPosGrupoUsuario = [];
        for (let i = this._usuarioGrupos.length - 1; i >= 0; i--) {

            if (this._usuarioGrupos[i].idUsuario == sNombreUsuario) {
                vPosGrupoUsuario.push(i);
            }
        }


        for (let pos of vPosGrupoUsuario) {
            this._usuarioGrupos.splice(pos, 1);
        }

    }

    bajaGrupo(iIdGrupo) {

        let iPosGrupo = this._grupos.findIndex(oGru => oGru.id == iIdGrupo);
        this._grupos.splice(iPosGrupo, 1);

        let vIndices = [];


        for (let i = 0; i < this._usuarioGrupos.length; i++) {
            if (this._usuarioGrupos[i].idGrupo == iIdGrupo) {
                vIndices.push(i);
            }
        }
        vIndices.sort((a, b) => b - a);

        //en notas
        if (vIndices.length > 0) {

            let vNotas = this._usuarioGrupos[vIndices[0]].notas;

            for (let i = 0; i < vNotas.length; i++) {
                let iPos = this._notas.findIndex(oN => oN.id == vNotas[i].id);
                this._notas.splice(iPos, 1);
            }
        }


        for (let i = 0; i < vIndices.length; i++) {
            this._usuarioGrupos.splice(vIndices[i], 1);
        }



    }

    generarFilasUsuarios($tbody) {

        for (let u of this._usuarios) {
            let $row = $tbody.insertRow(-1);
            $row.insertCell(-1).textContent = u.usuario;
            $row.insertCell(-1).textContent = u.nombre;
            $row.insertCell(-1).textContent = u.email;
            $row.insertCell(-1).textContent = u.contraseña;



            let $editar = document.createElement("div");
            $editar.classList.add("fondo-editar");
            $editar.dataset.id = u.usuario;
            $editar.dataset.toggle = "modal";
            $editar.dataset.target = "#modalEditarUsuario";

            $row.insertCell(-1).appendChild($editar);

            let $eliminar = document.createElement("div");
            $eliminar.classList.add("fondo-eliminar");
            $eliminar.dataset.id = u.usuario;
            $row.insertCell(-1).appendChild($eliminar);
        }
    }



    altaNota(oNota, sIdUsuario) {
        let oUsuario = this._usuarios.find(oU => oU.usuario == sIdUsuario);
        oUsuario.notas.push(oNota);
        this._notas.push(oNota);
    }

    altaNotaGrupo(oNota, listaGrupoUsuario) {
        for (let i = 0; i < listaGrupoUsuario.length; i++) {
            listaGrupoUsuario[i].notas.push(oNota);
        }

        this._notas.push(oNota);
    }



    eliminarNota(idNota, idUsuario) {
        let notaABuscar = this._notas.find(oN => oN.idNota == idNota);
        let usuarioABuscar = this._usuarios.find(oU => oU.usuario == idUsuario);

        let notaABuscarDelUsuario = usuarioABuscar.notas.find(oN => oN.idNota == idNota);

        removeItemFromArr(usuarioABuscar.notas, notaABuscarDelUsuario);

        removeItemFromArr(this._notas, notaABuscar);

        function removeItemFromArr(arr, item) {
            var i = arr.indexOf(item);
            arr.splice(i, 1);
        }
        return true;

    }

    altaGrupo(oGrupo) {
        let bResultado = true;

        if (this._grupos.some(oG => (oG.nombreGrupo == oGrupo.sNombreGrupo))) {
            bResultado = false;
        } else {
            this._grupos.push(oGrupo);
        }
        return bResultado;

    }



    bajaNotaUsuario(sIdUsuario, sNotaId) {
        //borrar array global
        let iPosNota = this._notas.findIndex(oN => oN.id == sNotaId);

        this._notas.splice(iPosNota, 1);

        //borrar array notas de usuario
        let oUsuario = this.buscarUsuario(sIdUsuario);

        iPosNota = oUsuario.notas.findIndex(oN => oN.id == sNotaId);

        oUsuario.notas.splice(iPosNota, 1);

    }

    bajaNotaGrupo(sIdGrupo, sNotaIdGrupo) {
        let iPosNota = this._notas.findIndex(oN => oN.id == sNotaIdGrupo);

        this._notas.splice(iPosNota, 1);

        //borrar objeto notagrupo
        let oListaUsuariosGrupos = this._usuarioGrupos.filter(oUg => oUg.idGrupo == sIdGrupo);

        for (let i = 0; i < oListaUsuariosGrupos.length; i++) {
            let iPosNota = oListaUsuariosGrupos[i].notas.findIndex(oN => oN.id == sNotaIdGrupo);
            oListaUsuariosGrupos[i].notas.splice(iPosNota, 1);
        }

    }

    generarFilasGrupos(tBody) {

        for (let g of this._grupos) {
            // busca todos los usuarios de un grupo
            let listaGruposUsuario = this._usuarioGrupos.filter(oUsuGru => g.id == oUsuGru.idGrupo);
            let oUsuarios = [];
            for (let i = 0; i < listaGruposUsuario.length; i++) {
                let oUsuario = this.buscarUsuario(listaGruposUsuario[i].idUsuario);
                if (oUsuario != undefined) {
                    oUsuarios.push(oUsuario);
                }

            }
            if (oUsuarios.length > 0) {

                let $row = tBody.insertRow(-1);
                $row.insertCell(-1).textContent = g.id;
                $row.insertCell(-1).textContent = g.nombreGrupo;

                let oLista = document.createElement("ul");




                for (let i = 0; i < oUsuarios.length; i++) {
                    let oElementoList = document.createElement("li");
                    oElementoList.textContent = oUsuarios[i].usuario;
                    oLista.appendChild(oElementoList);
                }

                $row.insertCell(-1).appendChild(oLista);


                let $eliminar = document.createElement("div");
                $eliminar.classList.add("fondo-eliminar");
                $eliminar.dataset.id = g.id;
                $row.insertCell(-1).appendChild($eliminar);
            }
        }

    }

    altaUsuarioGrupo(oGrupo, oListadoObjetosUsuario) {

        for (let oU of oListadoObjetosUsuario) {
            this._usuarioGrupos.push(new UsuarioGrupo(oU.usuario, oGrupo.id));
        }

    }
}

class Usuario {
    constructor(sUsuario, sContraseña, sEMail, sNombre) {
        this.usuario = sUsuario;
        this.contraseña = sContraseña;
        this.email = sEMail;
        this.nombre = sNombre;
        this.notas = [];
    }


    agregarNota(oNota) {
        this.notas.push(oNota);
    }
}

class Nota {
    constructor(sTitulo, sContenido, sPrioridad) {
        if (Nota.contador == undefined) {
            Nota.contador = 1;
        } else {
            Nota.contador++;
        }

        this.id = Nota.contador;
        this.titulo = sTitulo;
        this.contenido = sContenido;
        this.prioridad = sPrioridad;
    }
    static contenidoNota(oNota, idUsuario) {
        let oDivNota = document.createElement('div');
        oDivNota.setAttribute("class", "card");



        let notaContenido = document.createElement('div');
        notaContenido.setAttribute("class", "card-body");
        let oEncabezado = document.createElement('h4');
        oEncabezado.setAttribute("class", "card-title");
        oEncabezado.textContent = oNota.titulo;

        let oContenido = document.createElement('p');
        oContenido.setAttribute("class", "card-text")
        oContenido.textContent = oNota.contenido;

        oDivNota.style.width = "18rem";

        oDivNota.style.height = "300px";
        oDivNota.style.margin = "50px";
        oDivNota.style.float = "left";

        let oBoton = document.createElement("button");
        oBoton.setAttribute("type", "button");
        oBoton.setAttribute("class", "btn btn-primary");

        oBoton.dataset.idNota = oNota.id;
        oBoton.dataset.idUsuario = idUsuario;

        oBoton.style.borderColor = "#000000";
        oBoton.style.color = "#000000";
        oBoton.style.position = "absolute";
        oBoton.style.bottom = "5px";
        oBoton.style.left = "5px";


        //oBoton.style.right="0";


        oBoton.classList.add("nota-borrar");


        if (oNota.prioridad == "alta") {
            oDivNota.style.backgroundColor = "#ff5555";
            oBoton.style.backgroundColor = "#ff5555";
        }
        if (oNota.prioridad == "media") {
            oDivNota.style.backgroundColor = "#ffd88a";
            oBoton.style.backgroundColor = "#ffd88a";
        }
        if (oNota.prioridad == "baja") {
            oDivNota.style.backgroundColor = "#b7ff8a";
            oBoton.style.backgroundColor = "#b7ff8a";
        }
        let oContenedor = document.querySelector("#imprimeNotas");

        oContenedor.appendChild(oDivNota);
        oDivNota.appendChild(notaContenido);
        notaContenido.appendChild(oEncabezado)
        notaContenido.appendChild(oContenido);
        notaContenido.appendChild(oBoton)
    }

    static contenidoNotaGrupo(oNota, idGrupo) {
        let oDivNota = document.createElement('div');
        oDivNota.setAttribute("class", "card");



        let notaContenido = document.createElement('div');
        notaContenido.setAttribute("class", "card-body");
        let oEncabezado = document.createElement('h4');
        oEncabezado.setAttribute("class", "card-title");
        oEncabezado.textContent = oNota.titulo;

        let oContenido = document.createElement('p');
        oContenido.setAttribute("class", "card-text")
        oContenido.textContent = oNota.contenido;

        oDivNota.style.width = "18rem";

        oDivNota.style.height = "300px";
        oDivNota.style.margin = "50px";
        oDivNota.style.float = "left";

        let oBoton = document.createElement("button");
        oBoton.setAttribute("type", "button");
        oBoton.setAttribute("class", "btn btn-primary");

        oBoton.dataset.idNota = oNota.id;
        oBoton.dataset.idGrupo = idGrupo;


        oBoton.style.borderColor = "#000000";
        oBoton.style.color = "#000000";
        oBoton.style.position = "absolute";
        oBoton.style.bottom = "5px";
        oBoton.style.left = "5px";


        //oBoton.style.right="0";

        oBoton.classList.add("nota-borrar");


        if (oNota.prioridad == "alta") {
            oDivNota.style.backgroundColor = "#ff5555";
            oBoton.style.backgroundColor = "#ff5555";
        }
        if (oNota.prioridad == "media") {
            oDivNota.style.backgroundColor = "#ffd88a";
            oBoton.style.backgroundColor = "#ffd88a";
        }
        if (oNota.prioridad == "baja") {
            oDivNota.style.backgroundColor = "#b7ff8a";
            oBoton.style.backgroundColor = "#b7ff8a";
        }
        let oContenedor = document.querySelector("#imprimeNotas");

        oContenedor.appendChild(oDivNota);
        oDivNota.appendChild(notaContenido);
        notaContenido.appendChild(oEncabezado)
        notaContenido.appendChild(oContenido);
        notaContenido.appendChild(oBoton)
    }
}

class Grupo {
    constructor(sNombreGrupo) {
        if (Grupo.contador == undefined) {
            Grupo.contador = 1;
        } else {
            Grupo.contador++;
        }
        this.id = Grupo.contador;
        this.nombreGrupo = sNombreGrupo;

    }
}


class UsuarioGrupo {
    constructor(sIdUsuario, sIdGrupo) {
        this.idUsuario = sIdUsuario;
        this.idGrupo = sIdGrupo;
        this.notas = [];
    }
}