console.log(window.location.search)

const parametros = new URLSearchParams(window.location.search)

const id = parametros.get("id")

const detalhes = document.getElementById("detalhes-peca")


if (!id) {
     detalhes.innerHTML = "<h2>ID não informado.</h2>"
}else {



fetch (`http://localhost:3000/pecas/${id}`)
    .then(res => res.json())
    .then(dados => {

    if (!dados.id) {
        detalhes.innerHTML = "<h2>Peça não encontrada.</h2>"
        return
    }

    detalhes.innerHTML = `

        <div class="mx-auto" style = "max-width: 500px">
            <div class= "card mb-3 shadow">

                <img src="${dados.imagem}" class =" mb-3 card-img-top img-fluid">
                <div class= "card-body text-center">
                    <h3 class = "card-title">${dados.nome}</h3>
                    <p class = "card-text fw-bold text-success">${dados.preco}</p>
                    <p>${dados.descricaoCompleta}</p>
                    <p><strong>Categoria: </strong> ${dados.categoria}</p>

                    <ul>
                        ${dados.tags.map(tag => `<li>${tag}</li>`).join("")}
                    </ul>
         </div>
     </div>

`

    })
}
