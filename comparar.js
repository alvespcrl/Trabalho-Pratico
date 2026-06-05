const categoria = document.getElementById("categoria")
const peca1 = document.getElementById("peca1")
const peca2 = document.getElementById("peca2")
const btnComparar = document.getElementById("compararbtn")
const resultado = document.getElementById("resultadoComparacao")

let todasPecas = []

fetch("http://localhost:3000/pecas")
    .then(res => res.json())
    .then(dados => {

        todasPecas = dados

        categoria.addEventListener("change", () => {

            peca1.innerHTML = ""
            peca2.innerHTML = ""

            const filtrada = todasPecas.filter(
                peca => peca.categoria === categoria.value
            )

            peca1.innerHTML = '<option value="">Selecione a peça</option>'
            peca2.innerHTML = '<option value="">Selecione a peça</option>'

            filtrada.forEach(peca => {
                peca1.innerHTML += `
                <option value="${peca.id}">
                    ${peca.nome}
                    </option>
            `
                peca2.innerHTML += `
                <option value="${peca.id}">
                    ${peca.nome}
                    </option>
            `

            })
        })

        let grafico = null

        btnComparar.addEventListener("click", () => {

            const item1 = todasPecas.find(
                peca => peca.id == peca1.value
            )

            const item2 = todasPecas.find(
                peca => peca.id == peca2.value
            )

            if (!item1 || !item2) {
                alert("Selecione duas peças para comparar")
                return
            }
            criarGrafico(item1, item2)

            mostrarTabela(item1, item2)
        })


        function criarGrafico(item1, item2) {

            const ctx = document.getElementById("grafico")

            if (grafico) {
                grafico.destroy()
            }

            grafico = new Chart(ctx, {
                type: "bar",

                data: {

                    labels: [
                        "Desempenho",
                        "Custo Benefício",
                        "Consumo"
                    ],

                    datasets: [

                        {
                            label: item1.nome,

                            data: [
                                item1.graficos.desempenho,
                                item1.graficos.custoBeneficio,
                                item1.graficos.consumo
                            ]
                        },

                        {
                            label: item2.nome,

                            data: [
                                item2.graficos.desempenho,
                                item2.graficos.custoBeneficio,
                                item2.graficos.consumo
                            ]
                        }

                    ]
                },

                options: {
                    responsive: true
                }
            })
        }

        function mostrarTabela(item1, item2) {

            resultado.innerHTML = `

    <div class="card mt-4 shadow">

        <div class="card-body">

            <h3 class="text-center mb-4">
                Comparação
            </h3>

            <table class="table table-striped"> 

                <thead>

                    <tr>
                        <th>Característica</th>
                        <th>${item1.nome}</th>
                        <th>${item2.nome}</th>
                    </tr>

                </thead>
                
                <tbody>

                    <tr>
                        <td>Preço</td>
                        <td>${item1.preco}</td>
                        <td>${item2.preco}</td>
                    </tr>

                    <tr>
                        <td>Desempenho</td>
                        <td>${item1.graficos.desempenho}</td>
                        <td>${item2.graficos.desempenho}</td>
                    </tr>

                    <tr>
                        <td>Custo Benefício</td>
                        <td>${item1.graficos.custoBeneficio}</td>
                        <td>${item2.graficos.custoBeneficio}</td>
                    </tr>

                    <tr>
                        <td>Consumo</td>
                        <td>${item1.graficos.consumo}</td>
                        <td>${item2.graficos.consumo}</td>
                    </tr>

                    <tr>
                        <td>Categoria</td>
                        <td>${item1.categoria}</td>
                        <td>${item2.categoria}</td>
                    </tr>

                    <tr>
                        <td>Lançamento</td>
                        <td>${item1.dataLancamento}</td>
                        <td>${item2.dataLancamento}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    `
        }
    })

