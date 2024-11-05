document.addEventListener('DOMContentLoaded', function () {
    const dropdownButton = document.getElementById('dropdownMenuButton1');
    const dropdownMenu = document.getElementById('dropdownMenu');

    if (dropdownButton && dropdownMenu) {
        dropdownButton.addEventListener('click', function () {
            if (dropdownMenu.style.display === 'block') {
                dropdownMenu.style.display = 'none';
            } else {
                dropdownMenu.style.display = 'block';
                adjustDropdownPosition();
            }
        });

        document.addEventListener('click', function (event) {
            if (!dropdownButton.contains(event.target) && !dropdownMenu.contains(event.target)) {
                dropdownMenu.style.display = 'none';
            }
        });

        window.addEventListener('resize', adjustDropdownPosition);

        function adjustDropdownPosition() {
            dropdownMenu.style.right = '20px';
            dropdownMenu.style.top = '127px';
        }
    }

    document.querySelectorAll('.icono-eliminar').forEach(form => {
        form.onsubmit = confirmDelete;
    });

    function confirmDelete() {
        return confirm('¿Estás seguro de que deseas eliminar este producto? Esta acción no se puede deshacer.');
    }

    let elementoAcordeon = document.getElementsByClassName("acordeon");
    for (let i = 0; i < elementoAcordeon.length; i++) {
        elementoAcordeon[i].addEventListener("click", function () {
            this.classList.toggle("active");
            let panel = this.nextElementSibling;
            panel.style.display = (panel.style.display === "block") ? "none" : "block";
        });
    }
});
