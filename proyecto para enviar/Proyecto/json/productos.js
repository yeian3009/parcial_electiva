//Definición de variables
const url = 'http://localhost:3000/api/productos/'
const contenedor = document.querySelector('tbody')
let resultados = ''

const modalArticulo = new bootstrap.Modal(document.getElementById('modalArticulo'))
const formArticulo = document.querySelector('form')
const nombreproducto = document.getElementById('descripcion')
const precio = document.getElementById('precio')
const estado = document.getElementById('stock')
var opcion = ''

btnCrear.addEventListener('click', ()=>{
    nombreproducto.value = ''
    precio.value = ''
    estado.value = ''
    modalArticulo.show()
    opcion = 'crear'
})

//funcion para mostrar los resultados
const mostrar = (productos) => {
    productos.forEach(producto => {
        resultados += `<tr>
                            <td>${producto.idproducto}</td>
                            <td>${producto.nombreproducto}</td>
                            <td>${producto.precio}</td>
                            <td>${producto.estado}</td>
                            <td class="text-center"><a class="btnEditar btn btn-primary">Editar</a><a class="btnBorrar btn btn-danger">Borrar</a></td>
                       </tr>
                    `    
    })
    contenedor.innerHTML = resultados
    
}

//Procedimiento Mostrar
fetch(url)
    .then( response => response.json() )
    .then( data => mostrar(data) )
    .catch( error => console.log(error))

  
const on = (element, event, selector, handler) => {
    //console.log(element)
    //console.log(event)
    //console.log(selector)
    //console.log(handler)
    element.addEventListener(event, e => {
        if(e.target.closest(selector)){
            handler(e)
        }
    })
}

//Procedimiento Borrar
on(document, 'click', '.btnBorrar', e => {
    const fila = e.target.parentNode.parentNode
    const idproducto = fila.firstElementChild.innerHTML
    alertify.confirm("This is a confirm dialog.", 
    function  (){
        fetch(url+idproducto, {
            method: 'DELETE'
        })
        .then( res => res.json() )
        .then( ()=> location.reload())
        //alertify.success('Ok')
    },
    function(){
        alertify.error('Cancel')
    })
})

//Procedimiento Editar
let idForm = 0
on(document, 'click', '.btnEditar', e => {    
    const fila = e.target.parentNode.parentNode
    idForm = fila.children[0].innerHTML
    const nombreproductoForm = fila.children[1].innerHTML
    const precioForm = fila.children[2].innerHTML
    const estadoForm = fila.children[3].innerHTML
    nombreproducto.value =  nombreproductoForm
    precio.value =  precioForm
    estado.value =  estadoForm
    opcion = 'editar'
    modalArticulo.show()
     
})

//Procedimiento para Crear y Editar
formArticulo.addEventListener('submit', (e)=>{
    e.preventDefault()
    if(opcion=='crear'){        
        //console.log('OPCION CREAR')
        fetch(url, {
            method:'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                nombreproducto:nombreproducto.value,
                precio:precio.value,
                estado:estado.value
            })
        })
        .then( response => response.json() )
        .then( data => {
            const nuevoArticulo = []
            nuevoArticulo.push(data)
            mostrar(nuevoArticulo)
        })
    }
    if(opcion=='editar'){    
        //console.log('OPCION EDITAR')
        fetch(url+idForm,{
            method: 'PUT',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                nombreproducto:nombreproducto.value,
                precio:precio.value,
                estado:estado.value
            })
        })
        .then( response => response.json() )
        .then( response => location.reload() )
    }
    modalArticulo.hide()
})
