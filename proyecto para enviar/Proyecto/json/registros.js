var divtabla=document.getElementById('cuadro_registros')// cuadro dentro de la tabla
var i=1;//contadora
var botonenviar=document.getElementById('btnagregar')
var botoneditar=document.getElementById('btneditar')
botoneditar.disabled = true;//no habilitado editar



var infoForm={}; //variable tipo
function enviar() {
//calcula y agrega a la fila de la tabla

var identificacion=document.getElementById('identificacion').value
var nombre=document.getElementById('nombre').value
var apellido=document.getElementById('apellido').value
var usuario=document.getElementById('usuario').value
var contraseña=document.getElementById('contraseña').value
var fecha=document.getElementById('fecha').value

/////localstorage
localStorage.setItem("id:", i++)
localStorage.setItem("identificacion:", identificacion)
localStorage.setItem("nombre:", nombre)
localStorage.setItem("apellido:", apellido)
localStorage.setItem("usuario:", usuario)
localStorage.setItem("contraseña:", contraseña)
localStorage.setItem("fecha:", fecha)

///validacion de campos requeridos
if(identificacion=="" || nombre=="" || apellido=="" || usuario=="" ||  contraseña==""   ||  fecha==""    ){ 
    alert("¡Error! ->Debe rellenar todos los campos, por favor intente nuevamente.<-")
}else{
    
 alert("Datos enviados correctamente")
 //////////////////  cambio de formato

 infoForm ["id"]= i++;
 infoForm ["identificacion"]= identificacion;
 infoForm ["nombre"]= nombre;
 infoForm ["apellido"]= apellido;
 infoForm ["usuario"]= usuario;
 infoForm ["contraseña"]= contraseña;
 infoForm ["fecha"]= fecha;
////////////////



/////////////// insertar a la tabla
var tabla = document.getElementById("mitabla");
    var nuevaFila = tabla.insertRow(tabla.lenght);

    cell1 = nuevaFila.insertCell(0);
    cell1.innerHTML = infoForm.id;

    cell2 = nuevaFila.insertCell(1);
    cell2.innerHTML = infoForm.identificacion;

    cell3 = nuevaFila.insertCell(2);
    cell3.innerHTML = infoForm.nombre;

    cell4 = nuevaFila.insertCell(3);
    cell4.innerHTML = infoForm.apellido;

    cell5 = nuevaFila.insertCell(4);
    cell5.innerHTML = infoForm.usuario;

    cell6 = nuevaFila.insertCell(5);
    cell6.innerHTML = infoForm.contraseña;

    cell7 = nuevaFila.insertCell(6);
    cell7.innerHTML = infoForm.fecha;

    cell8 = nuevaFila.insertCell(7);
    cell8.innerHTML =   `<a class="btn btn-warning mx-5 " onClick="onEdit(this)">Edit</a>
    <a class= "btn btn-danger " onClick="onDelete(this)">Delete</a>`;

//////////////
 ///limpia el formulario
 document.getElementById("miFormulario").reset();
 divtabla.style.display=''; /// mostrar la tabla
///muestra la yabla ya que por lo menos se tiene un registro

}
}
//////editar
function onEdit(td){
    ///cambio de botones
    botoneditar.disabled = false;
    botonenviar.disabled = true;
    selectedRow = td.parentElement.parentElement;
    document.getElementById("identificacion").value = selectedRow.cells[1].innerHTML;
    document.getElementById("nombre").value = selectedRow.cells[2].innerHTML;
    document.getElementById("apellido").value = selectedRow.cells[3].innerHTML;
    document.getElementById("usuario").value = selectedRow.cells[4].innerHTML;
    document.getElementById("contraseña").value = selectedRow.cells[5].innerHTML;
    document.getElementById("fecha").value = selectedRow.cells[6].innerHTML;
    

}

/////// actualizar datos
function editar() {
    identificacion=document.getElementById('identificacion').value
    nombre=document.getElementById('nombre').value
    apellido=document.getElementById('apellido').value
    usuario=document.getElementById('usuario').value
    contraseña=document.getElementById('contraseña').value
    fecha=document.getElementById('fecha').value
    
    if(identificacion=="" || nombre=="" || apellido=="" || usuario==""  || contraseña==""   || fecha==""      ){
    alert("¡Error! - Debe ingresar la informacion en todos los campos, por favor intente nuevamente.")
    
    }else{

        


        infoForm ["identificacion"]= identificacion;
        infoForm ["nombre"]= nombre;
        infoForm ["apellido"]= apellido;
        infoForm ["usuario"]= usuario;
        infoForm ["contraseña"]= contraseña;
        infoForm ["fecha"]= fecha;


        selectedRow.cells[1].innerHTML = infoForm.identificacion;
        selectedRow.cells[2].innerHTML = infoForm.nombre;
        selectedRow.cells[3].innerHTML = infoForm.apellido;
        selectedRow.cells[4].innerHTML = infoForm.usuario;
        selectedRow.cells[5].innerHTML = infoForm.contraseña;
        selectedRow.cells[6].innerHTML = infoForm.fecha;


        botoneditar.disabled = true;
        botonenviar.disabled = false;
        alert("Fila editada exitosamente");
        document.getElementById("miFormulario").reset();

    }
           
}
//////////////

/////////eliminar
function onDelete(td){

    if (confirm('¿Estas seguro que deseas elimar los datos? ¡Si lo borras, perderas la informacion!.')){
        
        row = td.parentElement.parentElement;
        document.getElementById("mitabla").deleteRow(row.rowIndex);
        ///borrarForm();
        
        var num = document.getElementById('mitabla').rows.length;
       // alert(num)
        if(num==1){
            divtabla.style.display='none'; // ocultar
        }
    }



}