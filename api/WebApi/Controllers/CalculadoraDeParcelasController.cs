using System.Collections.Generic;
using System.Web.Http;
using MatematicaFinanceira.Lib;

namespace WebApi.Controllers
{
    public class CalculadoraDeParcelasController: ApiController
    {
        [Route("api/calcularParcelas"), HttpGet]
        public IHttpActionResult Calcular(string sistemaDeAmortizacao, decimal entrada, decimal saldoDevedor, decimal taxaDeJuros, int prazo)
        {
            IReadOnlyList<Parcela> parcelas = null;
            var saldoDevedorSemEntrada = saldoDevedor - entrada;

            switch (sistemaDeAmortizacao)
            {
                case "Price":
                    parcelas = SistemaDeAmortizacaoPrice.CalcularParcelas(saldoDevedorSemEntrada, taxaDeJuros, prazo);
                    break;
                case "SAC":
                    parcelas = SistemaDeAmortizacaoConstante.CalcularParcelas(saldoDevedorSemEntrada, taxaDeJuros, prazo);
                    break;
                case "SAM":
                    parcelas = SistemaDeAmortizacaoMisto.CalcularParcelas(saldoDevedorSemEntrada, taxaDeJuros, prazo);
                    break;
            }

            return Ok(parcelas);
        }
    }
}