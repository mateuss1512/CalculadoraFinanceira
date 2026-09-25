#include <stdio.h>
#include <math.h>

// Função para calcular a primeira fórmula
float calcularFormula1(float i, float n) {
    if (i <= 0 || n <= 0) {
        printf("A taxa de juros e o numero de periodos devem ser numeros positivos.\n");
        return -1.0;
    }

    if (fabs(1 - i * n) < 1e-9) {
        printf("Divisao por zero. Escolha valores diferentes.\n");
        return 0.0;
    }

    return i / (1 - i * n);
}

// Função para calcular a segunda fórmula
float calcularFormula2(float i, float n) {
    if (i <= 0 || n <= 0) {
        printf("A taxa de juros e o numero de periodos devem ser numeros positivos.\n");
        return -1.0;
    }

    if (fabs(1 + i * n) < 1e-9) {
        printf("Divisao por zero. Escolha valores diferentes.\n");
        return 0.0;
    }

    return i / (1 + i * n);
}

int main() {
    int escolha;
    float i, n, resultado;

    do {
        // Exibir o menu
        printf("Menu:\n");
        printf("1. Calcular i / (1 - i * n)\n");
        printf("2. Calcular i / (1 + i * n)\n");
        printf("3. Sair\n");

        // Ler a escolha do usuário
        printf("Escolha uma opcao: ");
        scanf("%d", &escolha);

        // Executar a opção escolhida
        switch (escolha) {
            case 1:
            case 2:
                // Ler valores de i e n
                printf("Digite o valor de i: ");
                scanf("%f", &i);

                printf("Digite o valor de n: ");
                scanf("%f", &n);

                // Calcular e exibir o resultado
                resultado = (escolha == 1) ? calcularFormula1(i, n) : calcularFormula2(i, n);
                if (resultado != -1.0) {
                    printf("Resultado: %f\n", resultado);
                }
                break;

            case 3:
                // Sair do programa
                printf("Saindo...\n");
                break;

            default:
                printf("Opcao invalida. Tente novamente.\n");
        }
    } while (escolha != 3);

    return 0;
}