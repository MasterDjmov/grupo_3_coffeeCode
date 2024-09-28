const btnActualizarPerfil = document.querySelector("#btnActualizarPerfil");

// Crear la instancia de JustValidate
const validator = new window.JustValidate('#perfil');

// Añadir campos de validación
validator
    .addField('#imagefile', [
        {
            rule: 'files',
            value: {
                files: {
                    extensions: ['jpeg', 'jpg', 'png'],
                    maxSize: 200000, // tamaño máximo en bytes
                    minSize: 10000, // tamaño mínimo en bytes
                    types: ['image/jpeg', 'image/jpg', 'image/png'],
                },
            },
            errorMessage: 'Tipos soportados: JPEG, JPG y PNG. El tamaño debe estar entre 10KB y 20KB.',
        },
    ])
    .addField('input[name="apellido"]', [
        {
            rule: 'required',
            errorMessage: 'El campo Apellidos es obligatorio.',
        },
    ])
    .addField('input[name="nombre"]', [
        {
            rule: 'required',
            errorMessage: 'El campo Nombres es obligatorio.',
        },
    ])
    .addField('input[name="email"]', [
        {
            rule: 'required',
            errorMessage: 'El campo Correo Electrónico es obligatorio.',
        },
        {
            rule: 'email',
            errorMessage: 'El formato del Correo Electrónico es inválido.',
        },
    ])
    .addField('input[name="telefono"]', [
        {
            rule: 'required',
            errorMessage: 'El campo Teléfono es obligatorio.',
        },
    ])
    .addField('input[name="dni"]', [
        {
            rule: 'required',
            errorMessage: 'El campo DNI es obligatorio.',
        },
    ])
    .addField('input[name="barrio"]', [
        {
            rule: 'required',
            errorMessage: 'El campo Barrio es obligatorio.',
        },
    ])
    .addField('input[name="calle"]', [
        {
            rule: 'required',
            errorMessage: 'El campo Calle es obligatorio.',
        },
    ])
    .addField('input[name="numero"]', [
        {
            rule: 'required',
            errorMessage: 'El campo Número es obligatorio.',
        },
    ])
    .addField('input[name="piso"]', [
        {
            rule: 'required',
            errorMessage: 'El campo Piso es obligatorio.',
        },
    ])
    .addField('input[name="cuil_t"]', [
        {
            rule: 'required',
            errorMessage: 'El campo CUIL/T es obligatorio.',
        },
    ])
    .addField('input[name="clave"]', [
        {
            rule: 'required',
            errorMessage: 'El campo Clave es obligatorio.',
        },
    ])
    .onSuccess((event) => {
        // Aquí puedes enviar el formulario
        event.target.submit();
    })
    .onError((fields) => {
        fields.forEach(field => {
            const errorField = document.querySelector(`#${field.id}Error`);
            if (errorField) {
                errorField.innerText = field.errorMessage;
            }
        });
    });
