// Crear la instancia de JustValidate
const validator = new window.JustValidate('#form-crear-producto');

// Añadir reglas de validación para cada campo
validator
    .addField('#nombre_producto', [
        {
            rule: 'required',
            errorMessage: 'El nombre del producto es obligatorio',
        },
        {
            rule: 'minLength',
            value: 5,
            errorMessage: 'El nombre debe tener al menos 5 caracteres',
        }
    ])
    .addField('#descripcion_corta', [
        {
            rule: 'required',
            errorMessage: 'El origen es obligatorio',
        },
        {
            rule: 'minLength',
            value: 5,
            errorMessage: 'El origen debe tener al menos 5 caracteres',
        }
    ])
    .addField('#descripcion_larga', [
        {
            rule: 'required',
            errorMessage: 'La descripción del producto es obligatoria',
        },
        {
            rule: 'minLength',
            value: 20,
            errorMessage: 'La descripción debe tener al menos 20 caracteres',
        }
    ])
    .addField('#precio', [
        {
            rule: 'required',
            errorMessage: 'El precio es obligatorio',
        },
        {
            rule: 'number',
            errorMessage: 'Debe ser un número válido',
        },
    ])
    .addField('#cantidad', [
        {
            rule: 'required',
            errorMessage: 'La cantidad es obligatoria',
        },
        {
            rule: 'number',
            errorMessage: 'Debe ser un número válido',
        },
    ])
    .addField('#idunidad_medida', [
        {
            rule: 'required',
            errorMessage: 'Debe seleccionar una unidad de medida',
        },
    ])
    .addField('#imagen_principal', [
        {
            rule: 'required',
            errorMessage: 'Debe subir una imagen principal',
        },
        {
            rule: 'files',
            value: {
                files: {
                    extensions: ['jpeg', 'jpg', 'png'],
                    maxSize: 200000, // tamaño máximo en bytes
                    minSize: 10000, // tamaño mínimo en bytes
                },
            },
            errorMessage: 'Tipos soportados: JPEG, JPG y PNG. El tamaño debe estar entre 10KB y 200KB.',
        },
    ])
    .addField('#imagen_secundaria', [
        {
            rule: 'required',
            errorMessage: 'Debe subir una imagen secundaria',
        },
        {
            rule: 'files',
            value: {
                files: {
                    extensions: ['jpeg', 'jpg', 'png'],
                    maxSize: 200000, // tamaño máximo en bytes
                    minSize: 10000, // tamaño mínimo en bytes
                },
            },
            errorMessage: 'Tipos soportados: JPEG, JPG y PNG. El tamaño debe estar entre 10KB y 200KB.',
        },
    ])
    .addField('#idproductor', [
        {
            rule: 'required',
            errorMessage: 'Debe seleccionar un productor',
        },
    ])
    .addField('#id_pais', [
        {
            rule: 'required',
            errorMessage: 'Debe seleccionar un país',
        },
    ])
    .addField('#region', [
        {
            rule: 'required',
            errorMessage: 'La región es obligatoria',
        },
        {
            rule: 'minLength',
            value: 3,
            errorMessage: 'La región debe tener al menos 3 caracteres',
        }
    ])
    .addField('#altitud', [
        {
            rule: 'required',
            errorMessage: 'La altitud es obligatoria',
        },
        {
            rule: 'number',
            errorMessage: 'La altitud debe ser un número válido',
        },
    ])
    .addField('#procesamiento_natural', [
        {
            rule: 'required',
            errorMessage: 'El procesamiento natural es obligatorio',
        },
        {
            rule: 'minLength',
            value: 3,
            errorMessage: 'El procesamiento natural debe tener al menos 3 caracteres',
        }
    ])
    .addField('#procesamiento_lavado', [
        {
            rule: 'required',
            errorMessage: 'El procesamiento lavado es obligatorio',
        },
        {
            rule: 'minLength',
            value: 3,
            errorMessage: 'El procesamiento lavado debe tener al menos 3 caracteres',
        }
    ])
    .onSuccess((event) => {
        // Enviar el formulario al ser válido
        event.target.submit();
    });
