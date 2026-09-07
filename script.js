// Preenchimento Automático do CEP (ViaCEP)
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
                    alert('CEP não encontrado.');
                    document.getElementById('cidade').value = '';
                    document.getElementById('endereco').value = '';
                }
            })
            .catch(() => {
                alert('Erro ao buscar o CEP.');
                document.getElementById('cidade').value = '';
                document.getElementById('endereco').value = '';
            });
    }
});

// Ação ao clicar no botão: Salva os dados e redireciona para o link gerado no App BB
document.getElementById('checkout-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const nome = document.getElementById('nome').value;
    alert(`Tudo certo, ${nome}! Redirecionando para o ambiente seguro do Banco do Brasil...`);

    // COLE AQUI O LINK DO SEU BB PAY QUE VOCÊ GEROU NO APP DO BANCO DO BRASIL:
    window.location.href = "https://cole-o-seu-link-do-bb-pay-aqui.com";
});
