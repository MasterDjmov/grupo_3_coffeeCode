document.addEventListener('DOMContentLoaded', function () {
    const dropdownButton = document.getElementById('dropdownMenuButton1');
    const dropdownMenu = document.getElementById('dropdownMenu');

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
        const rect = dropdownButton.getBoundingClientRect();
        dropdownMenu.style.top = `${rect.bottom + window.scrollY}px`;
        dropdownMenu.style.left = `${Math.min(rect.left + window.scrollX, window.innerWidth - dropdownMenu.offsetWidth)}px`;
    }
});
