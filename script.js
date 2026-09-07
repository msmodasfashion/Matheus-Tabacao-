// Função chamada ao clicar em "Comprar Agora" em qualquer produto do cardápio.
// Ela pega o nome e o preço do item e joga o cliente direto para a página de checkout rústica.
function selecionarProduto(nome, preco) {
    window.location.href = `pagamento.html?produto=${encodeURIComponent(nome)}&preco=${preco}`;
}

// Interceptador para links internos caso queira garantir rolagem suave ou ações extras no futuro
document.addEventListener('DOMContentLoaded', () => {
    // Sistema pronto e carregado
    console.log("Matheus Tabacão - Sistema carregado com sucesso!");
});
