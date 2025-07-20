function mascaraDeCPF(idDoCampo) {

    $('#' + idDoCampo).on('input', function () {
        let value = $(this).val().replace(/\D/g, '');

        value = value.substring(0, 11);

        if (value.length > 9) {
            value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
        } else if (value.length > 6) {
            value = value.replace(/(\d{3})(\d{3})(\d{1,3})/, '$1.$2.$3');
        } else if (value.length > 3) {
            value = value.replace(/(\d{3})(\d{1,3})/, '$1.$2');
        }

        $(this).val(value);
    });
}