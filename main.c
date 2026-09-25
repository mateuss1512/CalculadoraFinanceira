#include <locale.h>
#include <math.h>
#include <stdio.h>
#include <stdlib.h>


float converter_taxa_simples(float taxa, int periodo) {
    float fatores[] = {30.0, 4.0, 1.0, 0.5, (1.0/3.0), 0.25, (1.0/6.0), (1.0/12.0)};

    if (periodo >= 1 && periodo <= 8) {
        return taxa * fatores[periodo - 1];
    } else {
        return 0.0; 
    }
}


void capitalizacao_simples() {
  int operacao, tempo;
  float vp, vf, j, i, n;  //vf = valor final, vp = valor inicial, j = juros, i= taxa, n= tempo
  printf("\n1 Calcular Capital (VP)");
  printf("\n2 Calcular Montante (VF)");
  printf("\n3 Calcular Juros (J)");
  printf("\n4 Calcular Taxa (i)");
  printf("\n5 Calcular Tempo (n)");
  printf("\n\tQual conta deseja fazer? ");
  scanf("%d", &operacao);
  switch (operacao) {
  case 1:
    printf("\nEntre com os dados:");
    printf("\nMontante (VF): ");
    scanf("%f", &vf);
    printf("\nTaxa(i%%): ");
    scanf("%f", &i);
    do {
      printf("\nQual e o periodo da Taxa?");
      printf("\n1 Diario");
      printf("\n2 Semanal");
      printf("\n3 Mensal");
      printf("\n4 Bimestral");
      printf("\n5 Trimestral");
      printf("\n6 Quadrimestral");
      printf("\n7 Semestral");
      printf("\n8 Anual");
      printf("\nDigite a op: ");
      scanf("%d", &tempo);
      if (tempo < 1 || tempo > 8) {
        printf("\nERRO op invalida!");
        printf("\n");
      }
    } while (tempo < 1 || tempo > 8);
    i = converter_taxa_simples(i, tempo);
    printf("\nTempo(em meses): ");
    scanf("%f", &n);
    vp = vf / (1.0 + (i / 100.0) * n);
    printf("\nO resultado de(VP) eh:  R$%.2f", vp);
    printf("\n");
    break;
  case 2:
    printf("\nEntre com os dados:");
    printf("\nCapital(VP): ");
    scanf("%f", &vp);
    printf("\nTaxa(i%%): ");
    scanf("%f", &i);
    do {
      printf("\nQual e o periodo da Taxa?");
      printf("\n1 Diaria");
      printf("\n2 Semanal");
      printf("\n3 Mensal");
      printf("\n4 Bimestral");
      printf("\n5 Trimestral");
      printf("\n6 Quadrimestral");
      printf("\n7 Semestral");
      printf("\n8 Anual");
      printf("\nDigite a op: ");
      scanf("%d", &tempo);
      if (tempo < 1 || tempo > 8) {
        printf("\nErro op invalida!");
        printf("\n");
      }
    } while (tempo < 1 || tempo > 8);
    i = converter_taxa_simples(i, tempo);
    printf("\nTempo(em meses): ");
    scanf("%f", &n);
    vf = vp * (1.0 + (i / 100.0) * n);
    printf("\n O resultado(VF) eh:  R$%.2f", vf);
    printf("\n");
    break;
  case 3:
    printf("\nEntre com os dados:");
    printf("\nCapital(VP): ");
    scanf("%f", &vp);
    printf("\nTaxa(i%%): ");
    scanf("%f", &i);
    do {
      printf("\nQual e o periodo da Taxa");
      printf("\n1 Diaria");
      printf("\n2 Semanal");
      printf("\n3 Mensal");
      printf("\n4 Bimestral");
      printf("\n5 Trimestral");
      printf("\n6 Quadrimestral");
      printf("\n7 Semestral");
      printf("\n8 Anual");
      printf("\nDigite a op: ");
      scanf("%d", &tempo);
      if (tempo < 1 || tempo > 8) {
        printf("\nERRO OP invalida !");
        printf("\n");
      }
    } while (tempo < 1 || tempo > 8);
    i = converter_taxa_simples(i, tempo);
    printf("\nTempo(em meses): ");
    scanf("%f", &n);
    j = vp * (i / 100.0) * n;
    printf("\n juros(J) eh:  R$%.2f", j);
    printf("\n");
    break;
  case 4:
   
    printf("\nMontante: ");
    scanf("%f", &vf);
    printf("\nCapital: ");
    scanf("%f", &vp);
    printf("\nTempo(em meses): ");
    scanf("%f", &n);
    i = (vf / vp - 1.0) / n;
    printf("\nA taxa eh %.2f%% ao mes", i * 100);
    printf("\n");
    break;
  case 5:
    printf("\nEntre com os dados:");
    printf("\nMontante(VF): ");
    scanf("%f", &vf);
    printf("\nCapital(VP): ");
    scanf("%f", &vp);
    printf("\nTaxa(i%%): ");
    scanf("%f", &i);
    do {
      printf("\nQual e o periodo da taxa?");
      printf("\n1 Diaria");
      printf("\n2 Semanal");
      printf("\n3 Mensal");
      printf("\n4 Bimestral");
      printf("\n5 Trimestral");
      printf("\n6 Quadrimestral");
      printf("\n7 Semestral");
      printf("\n8 Anual");
      printf("\ndigite a op: ");
      scanf("%d", &tempo);
      if (tempo < 1 || tempo > 8) {
        printf("\nerro op invalida");
        printf("\n");
      }
    } while (tempo < 1 || tempo > 8);
    i = converter_taxa_simples(i, tempo);
    n = ((vf / vp) - 1.0) / (i / 100.0);
    printf("\nO resultado de(N) eh %.0f meses", n);
    printf("\n");
    break;
  default:
    printf("\n Op invalida...");
    printf("\n");
  }
}

float equivalencia_taxas(float taxa, int periodo) {
  float base, expoente;
  base = 1.0 + taxa;
  switch (periodo) {
  case 1:
    return pow(base, 30.0) - 1.0;
    break;
  case 2:
    return pow(base, 4.0) - 1.0;
    break;
  case 3:
    return taxa;
    break;
  case 4:
    expoente = 1.0 / 2.0;
    return pow(base, expoente) - 1.0;
    break;
  case 5:
    expoente = 1.0 / 3.0;
    return pow(base, expoente) - 1.0;
    break;
  case 6:
    expoente = 1.0 / 4.0;
    return pow(base, expoente) - 1.0;
    break;
  case 7:
    expoente = 1.0 / 6.0;
    return pow(base, expoente) - 1.0;
    break;
  case 8:
    expoente = 1.0 / 12.0;
    return pow(base, expoente) - 1.0;
    break;
  }






}

void capitalizacao_composta() {
  int opcao, tempo;
  float vp, vf, j, i, n, num, den;
  printf("\n1 Calcular Capital (VP)");
  printf("\n2 Calcular Montante (VF)");
  printf("\n3 Calcular Juros (J)");
  printf("\n4 Calcular Taxa (i)");
  printf("\n5 Calcular Tempo (n)");
  printf("\n\tQual conta vc deseja fazer ? ");
  scanf("%d", &opcao);
  switch (opcao) {
  case 1:
  
    printf("\nMontante: ");
    scanf("%f", &vf);
    printf("\nTaxa(%%): ");
    scanf("%f", &i);
    do {
      printf("\nQual e o periodo da taxa?");
      printf("\n1 Diaria");
      printf("\n2 Semanal");
      printf("\n3 Mensal");
      printf("\n4 Bimestral");
      printf("\n5 Trimestral");
      printf("\n6 Quadrimestral");
      printf("\n7 Semestral");
      printf("\n8 Anual");
      printf("\nDigite a op:");
      scanf("%d", &tempo);
      if (tempo < 1 || tempo > 8) {
        printf("\nErro tente novamente!");
        printf("\n");
      }
    } while (tempo < 1 || tempo > 8);
    i = equivalencia_taxas(i / 100, tempo);
    printf("\nTempo(em meses): ");
    scanf("%f", &n);
    vp = vf / pow((1.0 + i), n);
    printf("\nO valor eh R$%.2f", vp);
    printf("\n");
    break;
  case 2:
    printf("\nCapital: ");
    scanf("%f", &vp);
    printf("\nTaxa(%%): ");
    scanf("%f", &i);
    do {
      printf("\nQual e o periodo da Taxa?");
      printf("\n 1 Diaria");
      printf("\n 2 Semanal");
      printf("\n 3 Mensal");
      printf("\n 4 Bimestral");
      printf("\n 5 Trimestral");
      printf("\n 6 Quadrimestral");
      printf("\n 7 Semestral");
      printf("\n 8 Anual");
      printf("\n Entre com a Op: ");
      scanf("%d", &tempo);
      if (tempo < 1 || tempo > 8) {
        printf("\nErro op invalida!");
        printf("\n");
      }
    } while (tempo < 1 || tempo > 8);
    i = equivalencia_taxas(i / 100, tempo);
    printf("\nTempo(em meses): ");
    scanf("%f", &n);
    vf = vp * pow((1.0 + i), n);
    printf("\nO montante eh R$%.2f", vf);
    printf("\n");
    break;
  case 3:
    
        printf("\nCapital: ");
    scanf("%f", &vp);
    printf("\nTaxa(%%): ");
    scanf("%f", &i);
    do {
      printf("\nQual e o periodo da taxa?");
      printf("\n 1 Diaria");
      printf("\n 2 Semanal");
      printf("\n 3 Mensal");
      printf("\n 4 Bimestral");
      printf("\n 5 Trimestral");
      printf("\n 6 Quadrimestral");
      printf("\n 7 Semestral");
      printf("\n 8 Anual");
      printf("\nDigite a op: ");
      scanf("%d", &tempo);
      if (tempo < 1 || tempo > 8) {
        printf("\nOp ivalida!");
        printf("\n");
      }
    } while (tempo < 1 || tempo > 8);
    i = equivalencia_taxas(i / 100, tempo);
    printf("\nTempo(em meses): ");
    scanf("%f", &n);
    j = vp * (pow((1.0 + i), n) - 1.0);
    printf("\nOs juros eh R$%.2f", j);
    printf("\n");
    break;
  case 4:

    printf("\nMontante: ");
    scanf("%f", &vf);
    printf("\nCapital: ");
    scanf("%f", &vp);
    printf("\nTempo(em meses): ");
    scanf("%f", &n);
    i = pow((vf / vp), (1.0 / n)) - 1.0;
    printf("\nA taxa eh %.2f%% ao mes", i * 100);
    printf("\n");
    break;
  case 5:
    
    printf("\nMontante: ");
    scanf("%f", &vf);
    printf("\nCapital: ");
    scanf("%f", &vp);
    printf("\nTaxa(%%): ");
    scanf("%f", &i);
    do {
      printf("\nQual e o periodo da taxa?");
      printf("\n 1 Diaria");
      printf("\n 2 Semanal");
      printf("\n 3 Mensal");
      printf("\n 4 Bimestral");
      printf("\n 5 Trimestral");
      printf("\n 6 Quadrimestral");
      printf("\n 7 Semestral");
      printf("\n 8 Anual");
      printf("\nEntre com a Op: ");
      scanf("%d", &tempo);
      if (tempo < 1 || tempo > 8) {
        printf("\nOp invalida!");
        printf("\n");
      }
    } while (tempo < 1 || tempo > 8);
    i = equivalencia_taxas(i / 100, tempo);
    num = vf / vp;
    den = 1 + i;
    n = log(num) / log(den);
    printf("\nO tempo eh %.0f meses", n);
    printf("\n");
    break;
  default:
    printf("\nOp invalida retornando ao menu...");
    printf("\n");
  }
}


//Armotização


void calcularPMT(float vp, float i, float n){
  int numPrestacao;
  float pmt;
  printf("\nDigite o numero da prestação que deseja encontrar o valor: ");
  scanf("%d",&numPrestacao);
  pmt = vp / n * (1.0 + (n - numPrestacao + 1.0) * (i / 100.0));
  printf("O valor do PMT é: %f", pmt);
}

void calcularAmortizacao(float vp, float n){
   printf("A amortização no SAC é constante portanto o valor é: R$%.2f",(vp/n));
}

calcularJuros(float vp,float i, float n){
  float juros;
  int numPrestacao;
  printf("Digite o numero da prestação, que deseja saber o juros: \n");
  scanf("%d", &numPrestacao);
  juros = (vp / n) * (n - numPrestacao + 1.0) * (i / 100.0);
  printf("O valor do juros da prestação %d é: R$%.2f",numPrestacao,juros);
}

void calcularSaldoDevedor(float vp, float n){  
  int numPrestacao;
  float sd;
  printf("Digite o numero da prestação, que deseja saber o saldo devedor: \n");
  scanf("%d", &numPrestacao);
  sd = vp -((vp/n)*numPrestacao);
  printf("O valor do saldo devedor da prestação %d é: R$%.2f",numPrestacao,sd);
}

void amortizacao() {
    int opcao;
    float vp, i, n;
    printf("Digite as informações básicas a seguir: \n");
    printf("Digite o VP: \n");
    scanf("%f", &vp);

    printf("Taxa(Lembrando de sempre a taxa estar no mesmo tempo estarem na mesma medida, caso necessário converta na opção 5 do menu): \n");
    scanf("%f", &i);

    printf("Tempo(Lembrando de sempre a taxa estar no mesmo tempo estarem na mesma medida,caso necessário converta na opção 5 do menu): \n");
    scanf("%f", &n);

  do{
    printf("\n1) PMT");
    printf("\n2) Amortização");
    printf("\n3) Juros");
    printf("\n4) Saldo Devedor");
    printf("\n0) Sair para o Menu");
    printf("\n\tQual informação você deseja? ");
    scanf("%d", &opcao);

    switch (opcao) {
      case 1:
        calcularPMT(vp, i, n);
        break;
      case 2:
        calcularAmortizacao(vp, n);
        break;
      case 3:
        calcularJuros(vp, i, n);
        break;
      case 4:
        calcularSaldoDevedor(vp, n);
        break;
      case 0:
        printf("\nRetornando ao menu...\n");
        break;
      default:
        printf("\nOpção inválida!\n");
    }

  }while(opcao!=0);  
}






/////////////////////////////////////////////////////////////



void calc_vpl() {
  int j, n;
  float inv, i, vr, vpl, fd;
  printf("\nPrimeiro digite o investimento inicial: ");
  scanf("%f", &inv);
  printf("\nAgora a taxa de desconto(%%)(Certifique-se da taxa e do tempo "
         "estarem na mesma medida!): ");
  scanf("%f", &i);
  printf("\nDigite o tempo(Certifique-se da taxa e do tempo estarem na mesma "
         "medida!): ");
  scanf("%d", &n);
  printf("\nDigite o valor residual: ");
  scanf("%f", &vr);
  float fc[n];
  for (j = 0; j < n; j++) {
    printf("\nDigite o fluxo de caixa no período %d: ", j + 1);
    scanf("%f", &fc[j]);
  }
  vpl = -inv;
  for (j = 0; j < n; j++) {
    fd = pow(1.0 + (i / 100.0), j + 1.0);
    vpl += fc[j] / fd;
  }
  vpl += vr / pow(1.0 + (i / 100.0), (float)n);
  printf("\nVPL= R$%.2f", vpl);
  printf("\n");
}

float taxa_proporcional_ao_periodo(int tempo_taxa_nominal, int periodocapitalizacao, float taxa) {
  switch (tempo_taxa_nominal) {
  case 1:
    switch (periodocapitalizacao) {
    case 1:
      return taxa;
      break;
    case 2:
      return taxa / 0.142857;
      break;
    case 3:
      return taxa / 0.033333;
      break;
    case 4:
      return taxa / 0.016666;
      break;
    case 5:
      return taxa / 0.011111;
      break;
    case 6:
      return taxa / 0.008333;
      break;
    case 7:
      return taxa / 0.005555;
      break;
    case 8:
      return taxa / 0.002777;
      break;
    }
    break;
  case 2:
    switch (periodocapitalizacao) {
    case 1:
      return taxa / 7;
      break;
    case 2:
      return taxa;
      break;
    case 3:
      return taxa / 0.25;
      break;
    case 4:
      return taxa / 0.125;
      break;
    case 5:
      return taxa / 0.083;
      break;
    case 6:
      return taxa / 0.0625;
      break;
    case 7:
      return taxa / 0.038461;
      break;
    case 8:
      return taxa / 0.019230;
      break;
    }
    break;
  case 3:
    switch (periodocapitalizacao) {
    case 1:
      return taxa / 30;
      break;
    case 2:
      return taxa / 4;
      break;
    case 3:
      return taxa;
      break;
    case 4:
      return taxa / 0.5;
      break;
    case 5:
      return taxa / 0.33;
      break;
    case 6:
      return taxa / 0.25;
      break;
    case 7:
      return taxa / 0.16;
      break;
    case 8:
      return taxa / 0.083;
      break;
    }
    break;
  case 4:
    switch (periodocapitalizacao) {
    case 1:
      return taxa / 60.0;
      break;
    case 2:
      return taxa / 8.0;
      break;
    case 3:
      return taxa / 2.0;
      break;
    case 4:
      return taxa;
      break;
    case 5:
      return taxa / 0.66;
      break;
    case 6:
      return taxa / 0.5;
      break;
    case 7:
      return taxa / 0.33;
      break;
    case 8:
      return taxa / 0.16;
      break;
    }
    break;
  case 5:
    switch (periodocapitalizacao) {
    case 1:
      return taxa / 90.0;
      break;
    case 2:
      return taxa / 12.0;
      break;
    case 3:
      return taxa / 3.0;
      break;
    case 4:
      return taxa / 1.5;
      break;
    case 5:
      return taxa;
      break;
    case 6:
      return taxa / 0.75;
      break;
    case 7:
      return taxa / 0.5;
      break;
    case 8:
      return taxa / 0.25;
      break;
    }
    break;
  case 6:
    switch (periodocapitalizacao) {
    case 1:
      return taxa / 120.0;
      break;
    case 2:
      return taxa / 16.0;
      break;
    case 3:
      return taxa / 4.0;
      break;
    case 4:
      return taxa / 2.0;
      break;
    case 5:
      return taxa / 1.33;
      break;
    case 6:
      return taxa;
      break;
    case 7:
      return taxa / 0.66;
      break;
    case 8:
      return taxa / 0.33;
      break;
    }
    break;
  case 7:
    switch (periodocapitalizacao) {
    case 1:
      return taxa / 180.0;
      break;
    case 2:
      return taxa / 26.0;
      break;
    case 3:
      return taxa / 6.0;
      break;
    case 4:
      return taxa / 3.0;
      break;
    case 5:
      return taxa / 2.0;
      break;
    case 6:
      return taxa / 1.5;
      break;
    case 7:
      return taxa;
      break;
    case 8:
      return taxa / 0.5;
      break;
    }
    break;
  case 8:
    switch (periodocapitalizacao) {
    case 1:
      return taxa / 360.0;
      break;
    case 2:
      return taxa / 52.0;
      break;
    case 3:
      return taxa / 12.0;
      break;
    case 4:
      return taxa / 6.0;
      break;
    case 5:
      return taxa / 4.0;
      break;
    case 6:
      return taxa / 3.0;
      break;
    case 7:
      return taxa / 2.0;
      break;
    case 8:
      return taxa;
      break;
    }
    break;
  }
}

float equivalencia(float taxa_m, int tempo_f) {
  float base, exp;
  base = 1.0 + taxa_m;
  switch (tempo_f) {
  case 1:
    return pow(base, 1.0 / 30.0) - 1;
    break;
  case 2:
    return pow(base, 1.0 / 4.0) - 1;
    break;
  case 3:
    return taxa_m;
    break;
  case 4:
    return pow(base, 2.0) - 1;
    break;
  case 5:
    return pow(base, 3.0) - 1;
    break;
  case 6:
    return pow(base, 4.0) - 1;
    break;
  case 7:
    return pow(base, 6.0) - 1;
    break;
  case 8:
    return pow(base, 12.0) - 1;
    break;
  }
}

void descobrir_taxa() {
  int opcao, tempo, periodocapitalizacao, escolhaperiodo;
  float i, ic, ik, n, taxamensal, taxaequivalente;
  do {
    printf("\n1)Encontrar a Taxa de Juros Efetiva (Capitalização Simples)");
    printf("\n2)Encontrar Taxa de Desconto Comercial (Capitalização Simples)");
    printf("\n3)Encontrar Taxa Efetiva/Proporcional (Capitalização Composta)");
    printf("\n4)Encontrar Taxa Equivalente (Capitalização Composta)");
    printf("\n0)Voltar para o Menu");
    printf("\n\tSobre qual tipo de capitalização você deseja realizar o "
           "cálculo da taxa? ");
    scanf("%d", &opcao);
    switch (opcao) {
    case 1:
      printf("\nInforme a taxa de desconto comercial(%%): ");
      scanf("%f", &ic);
      do {
        printf("\nA taxa informada está em qual período de tempo?");
        printf("\n1)Diária");
        printf("\n2)Semanal");
        printf("\n3)Mensal");
        printf("\n4)Bimestral");
        printf("\n5)Trimestral");
        printf("\n6)Quadrimestral");
        printf("\n7)Semestral");
        printf("\n8)Anual");
        printf("\nDigite a opção correspondente: ");
        scanf("%d", &tempo);
        if (tempo < 1 || tempo > 8) {
          printf("\nPor favor, digite uma opção válida!");
          printf("\n");
        }
      } while (tempo < 1 || tempo > 8);
      ic = converter_taxa_simples(ic, tempo);
      ic = ic / 100;
      printf("\nInforme o tempo(em meses): ");
      scanf("%f", &n);
      i = ic / (1.0 - ic * n);
      printf("\nA taxa de juros efetiva é equivalente a %.2f%% ao mês", i);
      printf("\n");
      break;
    case 2:
      printf("\nInforme a taxa de juros efetiva(%%): ");
      scanf("%f", &i);
      do {
        printf("\nA taxa informada está em qual período de tempo?");
        printf("\n1)Diária");
        printf("\n2)Semanal");
        printf("\n3)Mensal");
        printf("\n4)Bimestral");
        printf("\n5)Trimestral");
        printf("\n6)Quadrimestral");
        printf("\n7)Semestral");
        printf("\n8)Anual");
        printf("\nDigite a opção correspondente: ");
        scanf("%d", &tempo);
        if (tempo < 1 || tempo > 8) {
          printf("\nPor favor, digite uma opção válida!");
          printf("\n");
        }
      } while (tempo < 1 || tempo > 8);
      i = converter_taxa_simples(i, tempo);
      i = i / 100;
      printf("\nInforme o tempo(em meses): ");
      scanf("%f", &n);
      ic = i / (1.0 + i * n);
      printf("\nA taxa de desconto comercial é equivalente a %.2f%% ao mês",
             ic);
      printf("\n");
      break;
    case 3:
      printf("\nDigite a taxa nominal(%%): ");
      scanf("%f", &ik);
      do {
        printf("\nA taxa informada está em qual período de tempo?");
        printf("\n1)Diária");
        printf("\n2)Semanal");
        printf("\n3)Mensal");
        printf("\n4)Bimestral");
        printf("\n5)Trimestral");
        printf("\n6)Quadrimestral");
        printf("\n7)Semestral");
        printf("\n8)Anual");
        printf("\nDigite a opção correspondente: ");
        scanf("%d", &tempo);
        if (tempo < 1 || tempo > 8) {
          printf("\nPor favor, digite uma opção válida!");
          printf("\n");
        }
      } while (tempo < 1 || tempo > 8);
      do {
        printf("\nA capitalização em questão é realizada em qual período de "
               "tempo?");
        printf("\n1)Diáriamente");
        printf("\n2)Semanalmente");
        printf("\n3)Mensalmente");
        printf("\n4)Bimestralmente");
        printf("\n5)Trimestralmente");
        printf("\n6)Quadrimestralmente");
        printf("\n7)Semestralmente");
        printf("\n8)Anualmente");
        printf("\nDigite a opção correspondente: ");
        scanf("%d", &periodocapitalizacao);
        if (periodocapitalizacao < 1 || periodocapitalizacao > 8) {
          printf("\nPor favor, digite uma opção válida!");
          printf("\n");
        }
      } while (periodocapitalizacao < 1 || periodocapitalizacao > 8);
      i = taxa_proporcional_ao_periodo(tempo, periodocapitalizacao, ik);
      printf("\nA taxa proporcional relativa ao período de capitalização "
             "informado é igual a %.2f%%",
             i);
      printf("\n");
      break;
    case 4:
      printf("\nCerto, você deseja encontrar uma taxa equivalente a(%%): ");
      scanf("%f", &i);
      do {
        printf("\nA taxa informada está em qual período de tempo?");
        printf("\n1)Diária");
        printf("\n2)Semanal");
        printf("\n3)Mensal");
        printf("\n4)Bimestral");
        printf("\n5)Trimestral");
        printf("\n6)Quadrimestral");
        printf("\n7)Semestral");
        printf("\n8)Anual");
        printf("\nDigite a opção correspondente: ");
        scanf("%d", &tempo);
        if (tempo < 1 || tempo > 8) {
          printf("\nPor favor, digite uma opção válida!");
          printf("\n");
        }
      } while (tempo < 1 || tempo > 8);
      taxamensal = equivalencia_taxas(i / 100, tempo);
      printf("TXM: %f", taxamensal);
      do {
        printf("\nE para qual período de tempo você deseja converter ela?");
        printf("\n1)Diária");
        printf("\n2)Semanal");
        printf("\n3)Mensal");
        printf("\n4)Bimestral");
        printf("\n5)Trimestral");
        printf("\n6)Quadrimestral");
        printf("\n7)Semestral");
        printf("\n8)Anual");
        printf("\nDigite a opção correspondente: ");
        scanf("%d", &escolhaperiodo);
        if (escolhaperiodo < 1 || escolhaperiodo > 8) {
          printf("\nPor favor, digite uma opção válida!");
          printf("\n");
        }
      } while (escolhaperiodo < 1 || escolhaperiodo > 8);
      taxaequivalente = equivalencia(taxamensal, escolhaperiodo);
      printf("\nA taxa equivalente a %.2f%% no tempo escolhido para conversão "
             "é igual a: %.2f%%",
             i, (taxaequivalente * 100));
      printf("\n");
      break;
    case 0:
      printf("\nRetornando ao menu...");
      printf("\n");
      break;
    default:
      printf("\nOpção inválida!\n");
    }
  } while (opcao != 0);
}

int main() {
  setlocale(LC_ALL, "");
  int opcao;
  do {
    printf("\n--------------------CALCULADORA FINANCEIRA--------------------");
    printf("\n1)Capitalização Simples");
    printf("\n2)Capitalização Composta");
    printf("\n3)Amortização (SAC)");
    printf("\n4)VPL");
    printf("\n5)Calcular Taxas");
    printf("\n0)Sair");
    printf("\n\tDigite o número da opção relativa a operação desejada: ");
    scanf("%d", &opcao);
    switch (opcao) {
    case 1:
      capitalizacao_simples();
      break;
    case 2:
      capitalizacao_composta();
      break;
    case 3:
      amortizacao();
      break;
    case 4:
      calc_vpl();
      break;
    case 5:
      descobrir_taxa();
      break;
    case 0:
      printf("\nFim do programa.");
      break;
    default:
      printf("\nOpção inválida!\n");
    }
  } while (opcao!= 0);
}
