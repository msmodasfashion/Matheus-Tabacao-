// Variável para armazenar o produto selecionado
let produtoAtual = "Zomo Tobacco (50g)";
let precoAtual = "R$ 11,00";

// Função ao clicar em "Comprar Agora" em qualquer card do menu
function selecionarProduto(nome, preco) {
    produtoAtual = nome;
    precoAtual = `R$ ${preco.toFixed(2).replace('.', ',')}`;
    
    // Atualiza o card de resumo do checkout
    document.getElementById('product-name').innerText = produtoAtual;
    document.getElementById('product-price').innerText = precoAtual;

    // Rola a tela suavemente até a seção de checkout
    document.getElementById('checkout').scrollIntoView({ behavior: 'smooth' });
}

// Preenchimento Automático do Endereço via API ViaCEP
document.getElementById('cep').addEventListener('blur', function() {
    let cep = this.value.replace(/\D/g, '');

    if (cep.length === 8) {
        document.getElementById('cidade').value = 'Buscando...';
        document.getElementById('endereco').value = 'Buscando...';

        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(response => response.json())
            .then(data => {
                if (!data.erro) {
                    document.getElementById('cidade').value = `${data.localidade} - ${data.uf}`;
                    document.getElementById('endereco').value = `${data.logradouro}, ${data.bairro} - `;
                } else {
                    alert('CEP não encontrado. Verifique o número digitado.');
                    document.getElementById('cidade').value = 'Guaratinguetá - SP';
                    document.getElementById('endereco').value = '';
                }
            })
            .catch(() => {
                alert('Erro ao buscar o CEP.');
                document.getElementById('cidade').value = 'Guaratinguetá - SP';
                document.getElementById('endereco').value = '';
            });
    }
});

// Envio do Pedido formatado para o WhatsApp do Matheus Tabacão
document.getElementById('checkout-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const nome = document.getElementById('nome').value;
    const cpf = document.getElementById('cpf').value;
    const cep = document.getElementById('cep').value;
    const endereco = document.getElementById('endereco').value;
    const cidade = document.getElementById('cidade').value;

    const mensagem = `Salve, Matheus! Fiz um pedido pelo site do Parque do Sol:\n\n` +
                     `🛒 *Produto:* ${produtoAtual}\n` +
                     `💰 *Valor:* ${precoAtual}\n\n` +
                     `👤 *Nome:* ${nome}\n` +
                     `🆔 *CPF:* ${cpf}\n` +
                     `📍 *Endereço:* ${endereco} (CEP: ${cep}) - ${cidade}\n\n` +
                     `Já realizei o Pix na chave de telefone! Segue o comprovante:`;

    const telefoneMatheus = "5512991362201";
    const urlWhatsApp = `https://wa.me/${telefoneMatheus}?text=${encodeURIComponent(mensagem)}`;

    alert(`Pedido pronto, ${nome}! Redirecionando para o WhatsApp para enviar o comprovante Pix...`);
    
    window.location.href = urlWhatsApp;
});
