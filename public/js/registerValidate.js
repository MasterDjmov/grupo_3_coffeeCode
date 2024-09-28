const btnRegistrar = document.querySelector("#btnRegistrar");

// Crear la instancia de JustValidate
const validator = new window.JustValidate('#registro');

// Añadir campos de validación
validator
  .addField('#apellido', [
    {
      rule: 'required',
      errorMessage: 'El apellido es obligatorio',
    },
    {
      rule: 'minLength',
      value: 2,
      errorMessage: 'El apellido debe tener al menos 2 caracteres',
    }
  ])
  .addField('#nombre', [
    {
      rule: 'required',
      errorMessage: 'El nombre es obligatorio',
    },
    {
      rule: 'minLength',
      value: 2,
      errorMessage: 'El nombre debe tener al menos 3 caracteres',
    }
  ])
  .addField('#telefono', [
    {
      rule: 'maxLength',
      value: 20,
      errorMessage: 'El teléfono no puede tener más de 20 caracteres',
    },
  ])
  .addField('#email', [
    {
      rule: 'required',
      errorMessage: 'El email es obligatorio',
    },
    {
      rule: 'email',
      errorMessage: 'Ingrese un email válido',
    }
  ])
  .addField('#pass1', [
    {
      rule: 'required',
      errorMessage: 'La contraseña es obligatoria',
    },
    {
        rule: 'minLength',
        value: 8,
        errorMessage: 'El Clave debe tener al menos 8 caracteres',
    },
    {
        rule: 'strongPassword',
        errorMessage: 'La clave debe tener por ejemplo Abcd@123',
      },
    {
      rule: 'minLength',
      value: 8,
      errorMessage: 'La contraseña debe tener al menos 8 caracteres',
    },
  ])
  .addField('#pass2', [
    {
      rule: 'required',
      errorMessage: 'No puede estar vació',

    },
    {
      validator: (value, fields) => {
        if (
          fields['#pass1'] &&
          fields['#pass1'].elem
        ) {
          const repeatPasswordValue =
            fields['#pass1'].elem.value;

          return value === repeatPasswordValue;
        }

        return true;
      },
      errorMessage: 'La Clave debe ser la misma',
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


async function existeEmailEnBD(email) {
    const response = await fetch(`/user/control_email?email=${encodeURIComponent(email)}`);
    return response.status === 409;
}
