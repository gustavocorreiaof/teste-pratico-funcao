using System.Collections.Generic;
using FI.AtividadeEntrevista.DML;
using FI.AtividadeEntrevista.DAL.Beneficiarios;

namespace FI.AtividadeEntrevista.BLL
{
    public class BoBeneficiario
    {
        /// <summary>
        /// Inclui um novo Beneficiario
        /// </summary>
        /// <param name="beneficiario">Objeto de Beneficiario</param>
        public long Incluir(Beneficiario beneficiario)
        {
            DaoBeneficiario dao = new DaoBeneficiario();
            return dao.Incluir(beneficiario);
        }

        /// <summary>
        /// Altera um Beneficiario
        /// </summary>
        /// <param name="beneficiario">Objeto de Beneficiario</param>
        public void Alterar(Beneficiario beneficiario)
        {
            DaoBeneficiario dao = new DaoBeneficiario();
            dao.Alterar(beneficiario);
        }

        /// <summary>
        /// Verifica se já existe um Beneficiario com o CPF informado para o cliente informado
        /// </summary>
        /// <param name="cpfBeneficiario">cpf do beneficiário que está sendo adicionado</param>
        /// <param name="cpfCliente">cpf do cliente ao qual tentaremos vincular o beneficiário</param>
        public bool ExisteBeneficiarioParaCliente(string cpfBeneficiario, string cpfCliente)
        {
            DaoBeneficiario dao = new DaoBeneficiario();
            return dao.ExisteBeneficiarioParaCliente(cpfBeneficiario, cpfCliente);
        }

        /// <summary>
        /// Excluir o Beneficiario pelo id
        /// </summary>
        /// <param name="id">id do Beneficiario</param>
        /// <returns></returns>
        public void Excluir(long id)
        {
            DaoBeneficiario dao = new DaoBeneficiario();
            dao.Excluir(id);
        }

        /// <summary>
        /// Lista os Beneficiarios de um cliente pelo CPF do cliente
        /// </summary>
        public List<Beneficiario> ListarBeneficiariosDeUmClientePorCpf(string cpfCliente)
        {
            DaoBeneficiario dao = new DaoBeneficiario();
            return dao.ListarBeneficiariosDeUmClientePorCpf(cpfCliente);
        }
    }
}
