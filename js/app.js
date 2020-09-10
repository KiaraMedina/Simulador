//Constructor para Seguro
function Seguro(marca, anio, tipo) {
    this.marca = marca;
    this.anio = anio;
    this.tipo = tipo;
}

Seguro.prototype.cotizarSeguro = function() {
    /*
         1 = americano 1.15
         2 = asiatico 1.05
         3 = europeo 1.35
   */

    let cantidad;
    const base = 2000;

    switch (this.marca) {
        case '1':
            cantidad = base * 1.15;
            break;
        case '2':
            cantidad = base * 1.05;
            break;
        case '3':
            cantidad = base * 1.35;
            break;
    }

    // Leer el año
    const diferencia = new Date().getFullYear() - this.anio;
    cantidad -= ((diferencia * 3) * cantidad) / 100;
    /*
         Si el seguro es básico se múltiplica por 30% mas
         Si el seguro es completo 50% mas
    */

    if (this.tipo === 'basico') {
        cantidad *= 1.30;
    } else {
        cantidad *= 1.50;
    }

    return cantidad;

};


function Interfaz() {
    //Mensaje que se imprime ene le html
    Interfaz.prototype.mostrarMensaje = function(mensaje, tipo) {

        const div = document.createElement('div');

        if (tipo === 'error') {
            div.classList.add('mensaje', 'error');

            setTimeout(function() {
                document.querySelector('.mensaje').remove();
            }, 3000);

        } else {

            setTimeout(function() {
                document.querySelector('.mensaje').remove();
            }, 2000);

            div.classList.add('mensaje', 'correcto');
        }

        div.innerHTML = `${mensaje}`;
        formulario.insertBefore(div, document.querySelector('.contenido_formulario'));
    };


}

//Imprime el resultado de la cotizacion
Interfaz.prototype.mostrarResultado = function(seguro, total) {
    const resultado = document.getElementById('resultado');
    let marca;
    switch (seguro.marca) {
        case '1':
            marca = 'Americano';
            break;

        case '2':
            marca = 'Asiatico';
            break;

        case '3':
            marca = 'Europeo';
            break;
    }
    //crear un div
    const div = document.createElement('div');
    //insertar la informacion
    div.innerHTML = `
          <p class="header">Tu Resumen:</p>
          <p>Marca: ${marca}<p>
          <p>Año: ${seguro.anio}<p>
          <p>Tipo: ${seguro.tipo}<p>
          <p>total: $ ${total}<p>

     `;

    const spinner = document.querySelector('#cargando img');
    spinner.style.display = 'block';
    setTimeout(function() {
        spinner.style.display = 'none';
        resultado.appendChild(div);
    }, 2000);


};




//EventListeners
const formulario = document.getElementById('cotizar-seguro');
formulario.addEventListener('submit', function(e) {
    e.preventDefault();

    //leer la marca seleccionada 
    const marca = document.getElementById('marca');
    const marcaSeleccionada = marca.options[marca.selectedIndex].value;

    //leer el anio seleccionado
    const anio = document.getElementById('anio');
    const anioSeleccionado = anio.options[anio.selectedIndex].value;

    //leer el tipo
    const tipo = document.querySelector('input[name="tipo"]:checked').value;



    //CREAR INSTANCIA DE INTERFAS
    const interfaz = new Interfaz();

    //revisamos que los campos no esten vacios
    if (marcaSeleccionada == '' || anioSeleccionado == '' || tipo == "") {

        //interfaz imprimiendo un erros   
        interfaz.mostrarMensaje('Faltan datos, revisar el formulario y prueba de nuevo', 'error');

    } else {

        //Limpiando resultados
        const resultados = document.querySelector('#resultado div')
        if (resultados != null) {
            resultados.remove();
        }


        const seguro = new Seguro(marcaSeleccionada, anioSeleccionado, tipo);
        //Cotizar Seguro

        const cantidad = seguro.cotizarSeguro(seguro);
        // Mostrar el resultado
        interfaz.mostrarResultado(seguro, cantidad);

        //Mostrar mensaje
        interfaz.mostrarMensaje('Cotizando ...', 'exito');
    }

});



//PARA EL SELECT Y APARESCA LOS ANIOS
const max = new Date().getFullYear();
min = max - 20;
const selectAnios = document.getElementById('anio');
for (let i = min; i < max; i++) {
    let option = document.createElement('option');
    option.value = i;
    option.innerHTML = i;
    selectAnios.appendChild(option);

}