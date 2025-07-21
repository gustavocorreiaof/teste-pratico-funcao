using FI.AtividadeEntrevista.DML;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

namespace FI.AtividadeEntrevista.DAL.Beneficiarios
{
    /// <summary>
    /// Classe de acesso a dados de Beneficiario
    /// </summary>
    internal class DaoBeneficiario : AcessoDados
    {
        /// <summary>
        /// Inclui um novo Beneficiario
        /// </summary>
        /// <param name="beneficiario">Objeto de Beneficiario</param>
        internal long Incluir(Beneficiario beneficiario)
        {
            List<SqlParameter> parametros = new List<SqlParameter>();

            parametros.Add(new SqlParameter("Nome", beneficiario.Nome));
            parametros.Add(new SqlParameter("CPF", beneficiario.CPF));
            parametros.Add(new SqlParameter("IdCliente", beneficiario.IdCliente));

            DataSet dataSet = base.Consultar("FI_SP_AdicionaBeneficiario", parametros);
            long ret = 0;
            if (dataSet.Tables[0].Rows.Count > 0)
                long.TryParse(dataSet.Tables[0].Rows[0][0].ToString(), out ret);
            return ret;
        }

        /// <summary>
        /// Verifica se já existe um Beneficiario com o CPF informado para o cliente informado
        /// </summary>
        /// <param name="cpfBeneficiario">cpf do beneficiário que está sendo adicionado</param>
        /// <param name="cpfCliente">cpf do cliente ao qual tentaremos vincular o beneficiário</param>
        internal bool ExisteBeneficiarioParaCliente(string cpfBeneficiario, string cpfCliente)
        {
            List<SqlParameter> parametros = new List<SqlParameter>();

            parametros.Add(new SqlParameter("CpfBeneficiario", cpfBeneficiario));
            parametros.Add(new SqlParameter("CpfCliente", cpfCliente));

            DataSet ds = base.Consultar("ExisteBeneficiarioParaCliente", parametros);

            return ds.Tables[0].Rows.Count > 0;
        }

        /// <summary>
        /// Lista todos os Beneficiarios de um cliente pelo CPF do cliente
        /// </summary>
        /// <param name="cpfCliente">Cpf do cliente para buscar todos os beneficiários vinculados a ele</param>
        internal List<Beneficiario> ListarBeneficiariosDeUmClientePorCpf(string cpfCliente)
        {
            List<SqlParameter> parametros = new List<SqlParameter>();

            parametros.Add(new SqlParameter("CpfCliente", cpfCliente));

            DataSet ds = base.Consultar("ListarBeneficiariosDeUmClientePorCpf", parametros);
            List<Beneficiario> cli = Converter(ds);

            return cli;
        }

        /// <summary>
        /// Altera um Beneficiario já existente
        /// </summary>
        /// <param name="beneficiario">Objeto de Beneficiario</param>
        internal void Alterar(Beneficiario beneficiario)
        {
            List<SqlParameter> parametros = new List<SqlParameter>();

            parametros.Add(new SqlParameter("Nome", beneficiario.Nome));
            parametros.Add(new SqlParameter("CPF", beneficiario.CPF));
            parametros.Add(new SqlParameter("ID", beneficiario.Id));

            base.Executar("FI_SP_AltBeneficiario", parametros);
        }


        /// <summary>
        /// Excluir Beneficiario pelo Id
        /// </summary>
        /// <param name="id">id do beneficiário a ser excluido</param>
        internal void Excluir(long id)
        {
            List<SqlParameter> parametros = new List<SqlParameter>();

            parametros.Add(new SqlParameter("Id", id));

            base.Executar("FI_SP_DelBeneficiario", parametros);
        }

        private List<Beneficiario> Converter(DataSet ds)
        {
            List<Beneficiario> lista = new List<Beneficiario>();
            if (ds != null && ds.Tables != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
            {
                foreach (DataRow row in ds.Tables[0].Rows)
                {
                    Beneficiario cli = new Beneficiario();
                    cli.Id = row.Field<long>("Id");                    
                    cli.CPF = row.Field<string>("CPF");
                    cli.Nome = row.Field<string>("Nome");
                    cli.IdCliente = row.Field<long>("IdCliente");
                    lista.Add(cli);
                }
            }

            return lista;
        }
    }
}
