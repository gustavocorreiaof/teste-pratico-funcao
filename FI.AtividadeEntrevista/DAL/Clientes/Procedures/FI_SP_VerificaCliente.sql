CREATE PROCEDURE FI_SP_VerificaCliente
    @CPF VARCHAR(14),
    @Id BIGINT
AS
BEGIN
    SELECT 
        1
    FROM 
        CLIENTES
    WHERE 
        CPF = @CPF
        AND (@Id IS NULL OR ID <> @Id);
END;
GO
