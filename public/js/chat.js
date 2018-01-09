var socket = io();
socket.on('connect', function () {
    var params = jQuery.deparam(window.location.search);
    socket.emit('join', params, function (err) {
        if (err) {
            alert(err);
            window.location.href = '/';
        } else {
            console.log('No error found');
        }
    });
});


function scrollToBottom() {
    var messages = jQuery('#messages');
    var newMessage = messages.children('li:last-child');

    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if (clientHeight + scrollTop + lastMessageHeight + newMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    }
}


jQuery('#message-form').on('submit', function (ev) {
    ev.preventDefault();
    socket.emit('createMessage', {
        to: 'Everyone',
        text: jQuery('[name=message]').val()
    }, function (msg) {
        console.log(msg);
    });
    $("#message_box").val("");

});

// document.getElementById('#message-form').on('submit', function() {


// });

socket.on('newMessage', function (message) {
    console.log('listening to new message event');
    console.log('new Message', message);
    $('#messages').append('<li>' + message.text + '</li>');
    scrollToBottom();

});

socket.on('updateUserList', function(users) {
    var ol = jQuery('<ol></ol>');
    users.forEach(function(user) {
        ol.append(jQuery('<li></li>').text(user));
    });
    jQuery('#users').html(ol);
});

socket.on('disconnect', function () {
    console.log('disconnected from server');
})
