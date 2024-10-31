document.addEventListener('DOMContentLoaded', function () {
    const validation = new JustValidate('#login', {
        validateOnInput: true,  
    });

    const inputEmail = document.querySelector('input[name="email"]');
    const inputPassword = document.querySelector('input[name="clave"]');

    inputEmail.focus();

    inputEmail.addEventListener('input', () => validation.revalidateField('input[name="email"]'));
    inputPassword.addEventListener('input', () => validation.revalidateField('input[name="clave"]'));

    let debounceTimer;
    const debounceFetch = (callback, delay) => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(callback, delay);
    };

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
                    return new Promise((resolve) => {
                        debounceFetch(() => {
                            fetch(`/user/control_email?email=${value}`)
                                .then(response => resolve(response.status === 200))
                                .catch(() => resolve(false));
                        }, 500);  
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
        });
});
