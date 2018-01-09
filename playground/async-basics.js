console.log('starting app');

setTimeout( () => {
    console.log('Inside of callback');
}, 3000);

setTimeout(function() {
    console.log('second')
}, 0);
console.log('finishing up');