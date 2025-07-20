var beneficiarios = [];

const mensagens = {
    camposInvalidos: "Preencha CPF e Nome.",
    cpfInvalido: "Preencha com um CPF Válido!",
    cpfRepetido: "Já existe um beneficiário com esse CPF vinculado a esse cliente."
};


$(document).ready(function () {
    const idDoCampoPrincipal = 'CPF';

    $('#formCadastro').submit(function (e) {
        e.preventDefault();
        $.ajax({
            url: urlPost,
            method: "POST",
            data: {
                "NOME": $(this).find("#Nome").val(),
                "CEP": $(this).find("#CEP").val(),
                "Email": $(this).find("#Email").val(),
                "Sobrenome": $(this).find("#Sobrenome").val(),
                "Nacionalidade": $(this).find("#Nacionalidade").val(),
                "Estado": $(this).find("#Estado").val(),
                "Cidade": $(this).find("#Cidade").val(),
                "Logradouro": $(this).find("#Logradouro").val(),
                "Telefone": $(this).find("#Telefone").val(),
                "CPF": $(this).find("#CPF").val()
            },
            error:
            function (response) {
                if (response.status == 400)
                    ModalDialog("Ocorreu um erro", response.responseJSON);
                else if (response.status == 500)
                    ModalDialog("Ocorreu um erro", "Ocorreu um erro interno no servidor.");
            },
            success:
            function (response) {
                ModalDialog("Sucesso!", response)
                $("#formCadastro")[0].reset();
            }
        });
    })

    mascaraDeCPF(idDoCampoPrincipal);
    abreModalBeneficiarios();
})

function ModalDialog(titulo, texto) {
    var random = Math.random().toString().replace('.', '');
    var texto = '<div id="' + random + '" class="modal fade">                                                               ' +
        '        <div class="modal-dialog">                                                                                 ' +
        '            <div class="modal-content">                                                                            ' +
        '                <div class="modal-header">                                                                         ' +
        '                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>         ' +
        '                    <h4 class="modal-title">' + titulo + '</h4>                                                    ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-body">                                                                           ' +
        '                    <p>' + texto + '</p>                                                                           ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-footer">                                                                         ' +
        '                    <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>             ' +
        '                                                                                                                   ' +
        '                </div>                                                                                             ' +
        '            </div><!-- /.modal-content -->                                                                         ' +
        '  </div><!-- /.modal-dialog -->                                                                                    ' +
        '</div> <!-- /.modal -->                                                                                        ';

    $('body').append(texto);
    $('#' + random).modal('show');
}

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

function abreModalBeneficiarios() {
    $('#beneficiario').on('click', function (e) {
        var urlBeneficiarios = "/Cliente/Beneficiarios";

        $.ajax({
            url: urlBeneficiarios,
            method: "POST",
            data: {
                CpfCliente: $('#CPF').val()
            },
            error:
                function (response) {
                    if (response.status == 400)
                        ModalDialog("Ocorreu um erro", response.responseJSON);
                    else if (response.status == 500)
                        ModalDialog("Ocorreu um erro", "Ocorreu um erro interno no servidor.");
                },
            success:
                function (response) {
                    const idDoCpfDoModal = 'CpfBeneficiario';

                    $('body').append(response);
                    $('#modalBeneficiarios').modal('show');
                    mascaraDeCPF(idDoCpfDoModal);
                    adicionarBeneficiario();
                }
        });
    })
}

function adicionarBeneficiario() {
    $('#incluir').on('click', function () {
        const cpf = $("#CpfBeneficiario").val();
        const nome = $("#NomeBeneficiario").val();

        if (!cpf || !nome) {
            alert(mensagens.camposInvalidos);
            return;
        }

        if (!validaCPF(cpf)) {
            alert(mensagens.cpfInvalido);
            return;
        }

        if (cpfExiste(cpf)) {
            alert(mensagens.cpfRepetido);
            return;
        }

        beneficiarios.push({
            Id: null,
            CPF: cpf,
            Nome: nome,
            IdCliente: 0
        });

        atualizarGrid();
        limparCampos();
    })
}

function cpfExiste(cpf) {
    return beneficiarios.some(b => b.cpf === cpf);
}

function atualizarGrid() {
    const $tbody = $("#beneficiariosBody");
    $tbody.empty();

    if (beneficiarios.length === 0) {
        $tbody.append("<tr><td colspan='3'>Nenhum beneficiário cadastrado.</td></tr>");
    } else {
        beneficiarios.forEach(b => {
            const linha = `
                        <tr>
                            <td>${b.CPF}</td>
                            <td>${b.Nome}</td>
                            <td>
                                <button type="button" class="btn btn-primary btn-sm" data-cpf="${b.CPF}">Alterar</button>
                                <button class="btn btn-danger btn-sm btn-excluir" data-cpf="${b.CPF}">Excluir</button>
                            </td>
                        </tr>
                    `;
            $tbody.append(linha);
        });
    }
}

function limparCampos() {
    $("#CpfBeneficiario").val("");
    $("#NomeBeneficiario").val("");
}

function validaCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, '');
    const cpfLength = 11;

    if (cpf.length !== cpfLength || /^(\d)\1{10}$/.test(cpf)) return false;

    const digitos = cpf.split('').map(Number);

    let soma = 0;
    for (let i = 0; i < 9; i++) {
        soma += digitos[i] * (10 - i);
    }
    let primeiroDigito = 11 - (soma % 11);
    if (primeiroDigito >= 10) primeiroDigito = 0;
    if (digitos[9] !== primeiroDigito) return false;

    soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += digitos[i] * (11 - i);
    }
    let segundoDigito = 11 - (soma % 11);
    if (segundoDigito >= 10) segundoDigito = 0;

    return digitos[10] === segundoDigito;
}