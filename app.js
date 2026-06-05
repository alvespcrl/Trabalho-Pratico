fetch("http://localhost:3000/pecas")
.then(response => response.json())
.then(dados => {

const lista = document.getElementById("lista-pecas")
const destaques = dados.filter(peca => peca.destaque)

let indiceAtual = 0;

mostrarSlide()

const btnNext = document.getElementById("next-button")
const btnPrev = document.getElementById("prev-button")

function mostrarSlide() {
    slide.innerHTML = `
        <div class="card shadow">
            <img src="${destaques[indiceAtual].imagemPrincipal}"
            class="card-img-top" 
            style="height: 300px; object-fit: cover;">

            <div class="card-body text-center">
                <h3>${destaques[indiceAtual].nome}</h3>
                <p>${destaques[indiceAtual].descricaoCurta}</p>
                <a href="detalhes.html?id=${destaques[indiceAtual].id}"
                class="btn btn-dark">Ver detalhes</a>
            </div>
        </div>
    `;
}

btnPrev.addEventListener("click", () => {
    indiceAtual--

    if (indiceAtual < 0){
        indiceAtual =  destaques.length - 1
    }

    console.log(indiceAtual)

    mostrarSlide()
})

btnNext.addEventListener("click", () => {
    indiceAtual++

    if (indiceAtual >= destaques.length){
        indiceAtual = 0
    }
    console.log(indiceAtual)

    mostrarSlide()
})

console.log(document.getElementById("next-button"))

function mostrarCards() {

    lista.innerHTML = ""

    const tres = dados.slice(0, quantidade)

    const pecasMostrar = dados.slice(0, quantidade)
    
    pecasMostrar.forEach((pecas) => {

     lista.innerHTML += `
    
    <div class="col-md-6 col-lg-4 col-12 ">
        <div class="card h-100 shadow">

            <img src="${pecas.imagemPrincipal}" class="card-img-top">

            <div class="card-body">
                <h5>${pecas.nome}</h5>
                <p>${pecas.preco}</p>
                <p>${pecas.descricaoCurta}</p>

                <a class="btn btn-dark"
                   href="detalhes.html?id=${pecas.id}">
                   Ver detalhes
                </a>
            </div>

        </div>
    </div>
    
    `
    })
}


let quantidade = 3

mostrarCards()

const btnMais = document.getElementById("mstMais")

btnMais.addEventListener("click", () => {

    quantidade += 3

    mostrarCards()

    if (quantidade >= dados.length) {
        btnMais.style.display = "none"
    }

})
})