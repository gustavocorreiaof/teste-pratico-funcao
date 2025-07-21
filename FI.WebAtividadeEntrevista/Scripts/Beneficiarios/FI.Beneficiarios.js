var beneficiarios = [];

const mensagens = {
    camposInvalidos: "Preencha CPF e Nome.",
    cpfInvalido: "Preencha com um CPF Válido!",
    cpfRepetido: "Já existe um beneficiário com esse CPF vinculado a esse cliente."
};

function abreModalBeneficiarios() {
    $('#btnBeneficiarios').on('click', function (e) {
        var urlBeneficiarios = "/Cliente/ListarBeneficiariosDeUmCliente";

        $.ajax({
            url: urlBeneficiarios,
            method: "POST",
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
                    inicializarFuncoes();

                    defineIdParaCadaBeneficiario();
                }
        });
    })
}

function adicionarBeneficiario() {
    $('#incluir').off('click').on('click', function () {
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

        var index = beneficiarios.findIndex(b => b.IdTemp === $('#CpfBeneficiario').data('idTemp'));

        if (index === -1) {
            if (beneficiarios.length > 0 && cpfExiste(cpf)) {
                alert(mensagens.cpfRepetido);
                return;
            }

            novoBeneficiario = {
                IdTemp: Date.now(),
                Id: null,
                CPF: cpf,
                Nome: nome,
                IdCliente: 0
            }

            beneficiarios.push(novoBeneficiario);
        }
        else {
            beneficiarios[index].CPF = cpf;
            beneficiarios[index].Nome = nome;
        }

        atualizarGrid();
        limparCampos();
    })
}

function cpfExiste(cpf) {
    return beneficiarios.some(beneficiario => beneficiario.CPF === cpf);
}

function atualizarGrid() {
    const $tbody = $("#beneficiariosBody");
    $tbody.empty();

    if (beneficiarios.length === 0) {
        $tbody.append("<tr><td colspan='3'>Nenhum beneficiário cadastrado.</td></tr>");
    } else {
        beneficiarios.forEach(beneficiario => {
            const linha = `
                        <tr>
                            <td>${beneficiario.CPF}</td>
                            <td>${beneficiario.Nome}</td>
                            <td>
                                <button type="button" class="btn btn-primary btn-sm btn-alterar"  data-cpf="${beneficiario.cpf}"  data-id="${beneficiario.Id}" data-idTemp="${beneficiario.IdTemp}"">Alterar</button>
                                <button class="btn btn-primary btn-sm btn-excluir"                data-cpf="${beneficiario.cpf}"  data-id="${beneficiario.Id}" data-idTemp="${beneficiario.IdTemp}"">Excluir</button>
                            </td>
                        </tr>
                    `;
            $tbody.append(linha);
        });
    }

    alterarBeneficiario();
    excluirBeneficiario()
}

function limparCampos() {
    $("#CpfBeneficiario").val("");
    $("#NomeBeneficiario").val("");
    $("#CpfBeneficiario").val("").removeData("idTemp");
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

function alterarBeneficiario() {
    $('#beneficiariosBody').on('click', '.btn-alterar', function (event) {
        var idTemp = Number(event.target.dataset.idtemp);
        var beneficiario = beneficiarios.find(b => b.IdTemp === idTemp);

        if (beneficiario) {
            $('#CpfBeneficiario').val(beneficiario.CPF).data('idTemp', idTemp);
            $('#NomeBeneficiario').val(beneficiario.Nome);
        }
    });
}

function excluirBeneficiario() {
    $('#beneficiariosBody').on('click', '.btn-excluir', function (event) {
        var idTemp = Number(event.target.dataset.idtemp);
        beneficiarios = beneficiarios.filter(b => b.IdTemp !== idTemp);
        atualizarGrid();
    });
}

function inicializarFuncoes() {
    adicionarBeneficiario()
    alterarBeneficiario()
    excluirBeneficiario()
}

function defineIdParaCadaBeneficiario() {
    beneficiarios.forEach(b => {
        if (!b.IdTemp) {
            b.IdTemp = Number(Date.now().toString() + Math.floor(Math.random() * 1000));
        }
    });
    atualizarGrid();
}