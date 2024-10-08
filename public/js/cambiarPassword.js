function cambiarPassword() {
    const passInput = document.getElementById('pass1');
    const ojoAbierto = document.getElementById('pass-ojo-abierto');
    const ojoCerrado = document.getElementById('pass-ojo-cerrado');

    if (passInput.type === 'password') {
        passInput.type = 'text'; 
        ojoAbierto.style.display = 'none'; 
        ojoCerrado.style.display = 'inline'; 
    } else {
        passInput.type = 'password'; 
        ojoAbierto.style.display = 'inline';
        ojoCerrado.style.display = 'none';
    }
}

function cambiarPassword2(){
    const passInput2 = document.getElementById('pass2')
    const ojoAbierto1 = document.getElementById('pass-ojo-abierto1');
    const ojoCerrado1 = document.getElementById('pass-ojo-cerrado1');

    if (passInput2.type === 'password') {
        passInput2.type = 'text'; 
        ojoAbierto1.style.display = 'none'; 
        ojoCerrado1.style.display = 'inline'; 
    } else {
        passInput2.type = 'password'; 
        ojoAbierto1.style.display = 'inline';
        ojoCerrado1.style.display = 'none';
    }
}

function borrar() {
    document.getElementById('pass1').value = '';
    
}

function borrar2(){
    document.getElementById('pass2').value = ''
}