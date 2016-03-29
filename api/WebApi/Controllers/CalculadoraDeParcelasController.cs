using System.Collections.Generic;
using System.Web.Http;
using MatematicaFinanceira.Lib;

namespace WebApi.Controllers
{
    public class CalculadoraDeParcelasController: ApiController
    {
        [Route("api/calcularParcelas"), HttpGet]
        public IHttpActionResult Calcular(string sistemaDeAmortizacao, decimal saldoDevedor, decimal taxaDeJuros, int prazo)
        {
            IReadOnlyList<Parcela> parcelas = null;

            switch (sistemaDeAmortizacao)
            {
                case "Price":
                    parcelas = SistemaDeAmortizacaoPrice.CalcularParcelas(saldoDevedor, taxaDeJuros, prazo);
                    break;
                case "SAC":
                    parcelas = SistemaDeAmortizacaoConstante.CalcularParcelas(saldoDevedor, taxaDeJuros, prazo);
                    break;
                case "SAM":
                    parcelas = SistemaDeAmortizacaoMisto.CalcularParcelas(saldoDevedor, taxaDeJuros, prazo);
                    break;
            }

            return Ok(parcelas);
        }
    }
}