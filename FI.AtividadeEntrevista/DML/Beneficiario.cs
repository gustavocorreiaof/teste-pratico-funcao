namespace FI.AtividadeEntrevista.DML
{
    /// <summary>
    /// Classe de Beneficiario que representa o registo na tabela Beneficiario do Banco de Dados
    /// </summary>
    public class Beneficiario
    {
        public Beneficiario(string cPF, string nome, long idCliente)
        {
            CPF = cPF;
            Nome = nome;
            IdCliente = idCliente;
        }
        public Beneficiario()
        {
            
        }

        /// <summary>
        /// Id
        /// </summary>
        public long Id { get; set; }

        /// <summary>
        /// CPF
        /// </summary>
        public string CPF { get; set; }

        /// <summary>
        /// Nome
        /// </summary>
        public string Nome { get; set; }

        /// <summary>
        /// IdCliente
        /// </summary>
        public long IdCliente { get; set; }       
    }    
}
