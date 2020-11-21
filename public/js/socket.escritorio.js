// Commando establecer la conexión
var socket = io();

var searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}

var escritorio = searchParams.get('escritorio');
var label = $('small');

// console.log(escritorio);
$('h1').text('Escritorio ' + escritorio);

socket.on('estadoActual', function(data) {
    if (data.ultimos4.length === 0) {
        label.text('...');
        return;
    }
    label.text('Ticket ' + data.ultimos4[0].numero);
    // console.log(data);
});


$('button').on('click', function() {
    socket.emit('atenderTicket', { escritorio: escritorio }, function(res) {

        if (res === 'No Hay Tickets') {
            label.text(res);
            alert(res);
            return;
        }

        label.text('Ticket ' + res.numero);
        // console.log(res);


    });
});