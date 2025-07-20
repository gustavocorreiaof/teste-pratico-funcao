CREATE PROCEDURE ListarBeneficiariosDeUmClientePorCpf
    @CpfCliente VARCHAR(14)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        B.Id,
        B.Cpf AS CPF,
        B.Nome,
        B.IdCliente
    FROM
        BENEFICIARIOS B
    INNER JOIN
        CLIENTES C ON B.IdCliente = C.Id
    WHERE
        C.Cpf = @CpfCliente;
END