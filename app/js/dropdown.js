window.onload = function () {
    var address = document.getElementById('address');
    function search() {
        alert(address.value);
    }

    address.addEventListener('change', search);
};
