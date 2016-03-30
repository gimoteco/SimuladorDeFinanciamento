angular.module('app', []).controller('SimuladorController', function($http, $scope) {
  var vm = this;

  vm.parcelas = [];

  vm.simular = function(parametrosDaSimulacao) {
    var parametros = "?sistemaDeAmortizacao=" + parametrosDaSimulacao.sistemaDeAmortizacao +
      "&saldoDevedor=" + parametrosDaSimulacao.saldoDevedor +
      "&taxaDeJuros=" + (parametrosDaSimulacao.taxaDeJuros / 100) +
      "&prazo=" + parametrosDaSimulacao.numeroDeParcelas;

    $http.get('http://simuladordefinanciamento.azurewebsites.net/api/calcularParcelas' + parametros).then(function(resposta) {
        vm.parcelas = resposta.data;
    });
  };

  return vm;
});
