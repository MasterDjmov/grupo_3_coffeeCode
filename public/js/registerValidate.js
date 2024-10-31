document.addEventListener('DOMContentLoaded', function () {
  const validator = new JustValidate('#registro', {
    validateOnInput: true,  
  });

  let inputApellido = document.querySelector('input[name="apellido"]');
  let inputNombre = document.querySelector('input[name="nombre"]');
  let inputEmail = document.querySelector('input[name="email"]');
  let inputTelefono = document.querySelector('input[name="telefono"]');
  let inputPass1 = document.querySelector('input[name="clave"]');
  let inputPass2 = document.querySelector('input[name="clave2"]');

  inputApellido.focus();

  // Realiza la validación en tiempo real
  inputApellido.addEventListener('input', () => validator.revalidateField('input[name="apellido"]'));
  inputNombre.addEventListener('input', () => validator.revalidateField('input[name="nombre"]'));
  inputEmail.addEventListener('input', () => validator.revalidateField('input[name="email"]'));
  inputTelefono.addEventListener('input', () => validator.revalidateField('input[name="telefono"]'));
  inputPass1.addEventListener('input', () => validator.revalidateField('input[name="clave"]'));
  inputPass2.addEventListener('input', () => validator.revalidateField('input[name="clave2"]'));

  let debounceTimer;
  const debounceFetch = (callback, delay) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(callback, delay);
  };

  validator
    .addField('input[name="apellido"]', [
      { rule: 'required', errorMessage: 'El apellido es obligatorio' },
      { rule: 'minLength', value: 2, errorMessage: 'Debe tener al menos 2 caracteres' }
    ])
    .addField('input[name="nombre"]', [
      { rule: 'required', errorMessage: 'El nombre es obligatorio' },
      { rule: 'minLength', value: 2, errorMessage: 'Debe tener al menos 2 caracteres' }
    ])
    .addField('input[name="telefono"]', [
      {
        validator: (value) => {
          if (value.trim() === '') return true; // Si el teléfono está vacío, no valida
          const regex = /^[0-9]{6,20}$/; // Valida entre 6 y 20 dígitos numéricos
          return regex.test(value);
        },
        errorMessage: 'Debe contener solo números y entre 6 y 20 caracteres',
      }
    ])
    .addField('input[name="email"]', [
      { rule: 'required', errorMessage: 'El email es obligatorio' },
      { rule: 'email', errorMessage: 'Ingresa un email válido' },
      {
        validator: (value) => {
          return new Promise((resolve) => {
            debounceFetch(() => {
              fetch(`/user/control_email?email=${encodeURIComponent(value)}`)
                .then(response => resolve(response.status !== 409)) // Resuelve solo si el email no está registrado
                .catch(() => resolve(false));
            }, 500);  
          });
        },
        errorMessage: 'El email ya está registrado',
      }
    ])
    .addField('input[name="clave"]', [
      { rule: 'required', errorMessage: 'La contraseña es obligatoria' },
      { rule: 'minLength', value: 8, errorMessage: 'Debe tener al menos 8 caracteres'},
      { rule: 'strongPassword', errorMessage: 'Por ejemplo: Abcd@1234'}
    ])
    .addField('input[name="clave2"]', [
      { rule: 'required', errorMessage: 'Debe confirmar la contraseña' },
      {
        validator: (value, fields) => value === fields['input[name="clave"]'].elem.value,
        errorMessage: 'Las contraseñas no coinciden'
      }
    ])
    .onSuccess((event) => {
      event.target.submit();
    });
});
