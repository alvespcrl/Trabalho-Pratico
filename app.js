fetch("http://localhost:3000/pecas")
.then(response => response.json())
.then(dados => {

const lista = document.getElementById("lista-pecas")
console.log(lista)

dados.forEach((pecas) => {
    lista.innerHTML += `
    
    <div class="col-md-4 col-12">
        <div class= "card mb-3">

            <img src="${pecas.imagem}">
            <div class="card-body">

               <h5 class= "card-title">${pecas.nome}</h5>
    
                <p class="card-text">${pecas.preco}</p>

                <p class="card-text">${pecas.descricaoCurta}</p>

                <p><strong>Categoria: </strong> ${pecas.categoria}</p>

                <a class ="btn btn-dark" href="detalhes.html?id=${pecas.id}"> Ver detalhes </a>

            </div>
        </div>
    </div>

        `;
    });
})

