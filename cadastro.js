const botao = document.getElementById("cadastro")

botao.addEventListener("click", () => {
    const nome = document.getElementById("nome").value
    const preco = document.getElementById("preco").value
    const descricao = document.getElementById("descricao").value
    const imagem = document.getElementById("imagem").value

    fetch ("http://localhost:3000/pecas", {

        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
        nome: nome,
        preco: preco,
        descricao: descricao,
        imagem: imagem
        })  
    })
})