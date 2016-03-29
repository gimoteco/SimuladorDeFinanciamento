angular.module('app', []).controller('SimuladorController', function($http) {
  var vm = this;

  vm.simular = function(parametrosDaSimulacao) {
    var parametros = "?sistemaDeAmortizacao=" parametrosDaSimulacao.sistemaDeAmortizacao +
      "&saldoDevedor=" + parametrosDaSimulacao.saldoDevedor +
      "&taxaDeJuros=" + parametrosDaSimulacao.taxaDeJuros +
      "&prazo=" + parametrosDaSimulacao.numeroDeParcelas;

    $http.get('www.calculadoradefinanciamento.com.br/api/calcularParcelas' + parametros).then(function(resposta) {
        vm.parcelas = resposta.data;
    });
  };

  return vm;
});
