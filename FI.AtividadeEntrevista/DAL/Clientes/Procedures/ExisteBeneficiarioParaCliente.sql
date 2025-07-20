CREATE PROCEDURE ExisteBeneficiarioParaCliente
    @CpfBeneficiario VARCHAR(14),
    @IdCliente BIGINT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 1
    FROM Beneficiarios
    WHERE Cpf = @CpfBeneficiario
      AND IdCliente = @IdCliente;
END
