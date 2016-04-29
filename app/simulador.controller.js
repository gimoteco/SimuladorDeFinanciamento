angular.module('app', ["ui.utils.masks", "blockUI"]).controller('SimuladorController', function($http, $scope, blockUI) {
  var vm = this;
  vm.parcelas = [];

  vm.simular = function(parametrosDaSimulacao) {
    var parametros = "?sistemaDeAmortizacao=" + parametrosDaSimulacao.sistemaDeAmortizacao +
      "&saldoDevedor=" + parametrosDaSimulacao.saldoDevedor +
      "&entrada=" + parametrosDaSimulacao.entrada +
      "&taxaDeJuros=" + parametrosDaSimulacao.taxaDeJuros +
      "&prazo=" + parametrosDaSimulacao.numeroDeParcelas;

    $http.get('http://simuladordefinanciamento.azurewebsites.net/api/calcularParcelas' + parametros).then(function(resposta) {
        vm.parcelas = resposta.data;
        calcularValoresTotais(vm.parcelas);
    });
  };

  function calcularValoresTotais(parcelas) {
    var totais = {
      Amortizacao : 0,
      Juros : 0,
      Prestacao: 0
    };

    for (var i = 0 ; i < parcelas.length ; i++) {
      totais.Amortizacao += parcelas[i].Amortizacao;
      totais.Juros += parcelas[i].Juros;
      totais.Prestacao += parcelas[i].Prestacao;
    }

    vm.totais = totais;
  }

  return vm;
});


angular.module('app').config(function(blockUIConfig) {
  // Change the default overlay message
  blockUIConfig.message = 'Calculando';
  // Change the default delay to 100ms before the blocking is visible
  blockUIConfig.delay = 100;
});
