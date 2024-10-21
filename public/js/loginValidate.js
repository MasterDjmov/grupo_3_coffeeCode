document.addEventListener('DOMContentLoaded', function () {
    const validation = new JustValidate('#login');

    validation
        .addField('input[name="email"]', [
            {
                rule: 'required',
                errorMessage: 'El Email es Obligatorio',
            },
            {
                rule: 'email',
                errorMessage: 'Por favor, ingresa un correo electrónico válido',
            },
            {
                
                validator: (value) => {
                    return fetch(`/user/control_email?email=${value}`)
                        .then(response => {
                            return response.status === 200;
                        });
                },
                errorMessage: 'El email no está registrado',
            },
        ])
        .addField('input[name="clave"]', [
            {
                rule: 'required',
                errorMessage: 'La Contraseña es obligatoria',
            },
        ])
        .onSuccess((event) => {
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
});
