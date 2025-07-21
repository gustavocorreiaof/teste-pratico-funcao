CREATE PROCEDURE FI_SP_AltBeneficiario
    @Nome VARCHAR(50),
    @CPF  VARCHAR(14),
    @ID   BIGINT
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE BENEFICIARIOS
    SET
        NOME = @Nome,
        CPF  = @CPF
    WHERE
        ID = @ID;
END;
GO
