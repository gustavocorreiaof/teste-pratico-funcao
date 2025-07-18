using System.ComponentModel.DataAnnotations;
using System.Linq;

public class CpfValidationAttribute : ValidationAttribute
{
    private const int CPF_LENGTH = 11;

    public CpfValidationAttribute() : base("CPF inválido.") { }

    protected override ValidationResult IsValid(object value, ValidationContext validationContext)
    {
        if (value == null)
            return new ValidationResult(ErrorMessage);

        var cpf = new string(value.ToString().Where(char.IsDigit).ToArray());

        if (cpf.Length != CPF_LENGTH || !ValidaCPF(cpf))
            return new ValidationResult(ErrorMessage);

        return ValidationResult.Success;
    }

    private bool ValidaCPF(string cpf)
    {
        if (cpf.All(caractere => caractere == cpf[0])) return false;

        var digitos = cpf.Select(caractere => int.Parse(caractere.ToString())).ToArray();

        int somaPrimeiroDigitoVerificador = 0;
        for (int i = 0; i < 9; i++)
            somaPrimeiroDigitoVerificador += digitos[i] * (10 - i);

        int primeiroDigitoVerificador = 11 - somaPrimeiroDigitoVerificador % 11;
        if (primeiroDigitoVerificador >= 10) primeiroDigitoVerificador = 0;
        if (digitos[9] != primeiroDigitoVerificador) return false;

        int somaSegundoDigitoVerificador = 0;
        for (int i = 0; i < 10; i++)
            somaSegundoDigitoVerificador += digitos[i] * (11 - i);

        int segundoDigitoVerificador = 11 - somaSegundoDigitoVerificador % 11;
        if (segundoDigitoVerificador >= 10) segundoDigitoVerificador = 0;

        return digitos[10] == segundoDigitoVerificador;
    }
}