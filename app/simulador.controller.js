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
        desenharGrafico(vm.parcelas);
    });
  };

  function desenharGrafico(parcelas) {
    var dados = [['Parcela', 'Amortização', 'Juros', 'Saldo devedor']];

    for (var i = 1; i < parcelas.length; i++) {
      dados.push([i, parcelas[i].Amortizacao, parcelas[i].Juros, parcelas[i].SaldoDevedor]);
    }

    var data = google.visualization.arrayToDataTable(dados);

    var options = {
      title: 'Gráfico do Financiamento',
      hAxis: {title: 'Nº da parcela'},
      vAxis: {minValue: 0, title: 'Valor'}
    };

    var chart = new google.visualization.AreaChart(document.getElementById('chart_div'));
    chart.draw(data, options);
  }

  function calcularValoresTotais(parcelas) {
    var totais = {
      Amortizacao : 0,
      Juros : 0,
      Prestacao: 0
    };

    for (var i = 1 ; i < parcelas.length ; i++) {
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
