// Preenchimento Automático do Endereço pelo CEP via API ViaCEP
document.getElementById('cep').addEventListener('blur', function() {
    let cep = this.value.replace(/\D/g, ''); // Remove caracteres não numéricos

    if (cep.length === 8) {
        // Preenche campos informando que está buscando
        document.getElementById('cidade').value = 'Buscando...';
        document.getElementById('endereco').value = 'Buscando...';

        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(response => response.json())
            .then(data => {
                if (!data.erro) {
                    document.getElementById('cidade').value = `${data.localidade} - ${data.uf}`;
                    document.getElementById('endereco').value = `${data.logradouro}, ${data.bairro}`;
                } else {
                    alert('CEP não encontrado. Verifique o número digitado.');
                    document.getElementById('cidade').value = '';
                    document.getElementById('endereco').value = '';
                }
            })
            .catch(error => {
                console.error('Erro ao buscar o CEP:', error);
                document.getElementById('cidade').value = '';
                document.getElementById('endereco').value = '';
            });
    }
});

// Processamento e Envio do Formulário
document.getElementById('checkout-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const nome = document.getElementById('nome').value;
    const cpf = document.getElementById('cpf').value;
    const cep = document.getElementById('cep').value;

    alert(`Tudo certo, ${nome}! Redirecionando para o pagamento...`);
    
    // Insira o link de pagamento do seu gateway aqui (ex: Mercado Pago, Stripe, etc.):
    // window.location.href = "SEU_LINK_DE_PAGAMENTO_AQUI";
});
 
