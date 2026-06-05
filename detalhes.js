console.log(window.location.search)

const parametros = new URLSearchParams(window.location.search)

const id = parametros.get("id")

const detalhes = document.getElementById("detalhes-peca")

const galeria = document.getElementById("galeria")


if (!id) {
     detalhes.innerHTML = "<h2>ID não informado.</h2>"
}else {



fetch (`http://localhost:3000/pecas/${id}`)
    .then(res => res.json())
    .then(dados => {

    let listaEspecificacoes = ""
        
    for(let chave in dados.especificacoes){
        listaEspecificacoes += `
            <li class="list-group-item">
            <strong>${chave}:</strong> ${dados.especificacoes[chave]}</li>
        `
    }

    if (!dados.id) {
        detalhes.innerHTML = "<h2>Peça não encontrada.</h2>"
        return
    }

    console.log(dados.especificacoes)

    detalhes.innerHTML = `

        <div class="mx-auto" style = "max-width: 800px">
            <div class= "card mb-3 shadow">

                <img src="${dados.imagemPrincipal}" class =" mb-3 card-img-top img-fluid">
                <div class= "card-body text-center">
                    <h3 class = "card-title">${dados.nome}</h3>
                    <p class = "card-text fw-bold text-success">${dados.preco}</p>
                    <p>${dados.descricaoCompleta}</p>
                    <p><strong>Categoria: </strong> ${dados.categoria}</p>
                    <p><strong>Data do Lançamento: </strong>${dados.dataLancamento}</p>
                    <h4 class="mt-4">Especificações Técnicas</h4>
                    <ul class="list-group list-unstyled mb-3">${listaEspecificacoes}</ul>

                    <p>
                    ${dados.tags.map(tag =>
                        `<span class="badge bg-secondary me-1">${tag}</span>`
                    ).join("")}
                    </p>
         </div>
     </div>

`

    
    dados.galeria.forEach(foto => {
            galeria.innerHTML += `
                <div class= "col-md-4 col-6 mb-3">
                    <div class="card h-100">
                        <img src= "${foto.imagem}" class="card-img-top" style="height: 150px; object-fit: cover">
                        <div class="card-body">
                            <h5>${foto.titulo}</h5>
                        </div>                        
                    </div>
                </div>
            `;
        })
    })
}
