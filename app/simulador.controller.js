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
