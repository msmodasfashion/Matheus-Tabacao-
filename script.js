let produtoAtual = "Zomo Tobacco (50g)";
let precoAtual = "R$ 11,00";
let valorNumerico = 11.00;

function selecionarProduto(nome, preco) {
    produtoAtual = nome;
    valorNumerico = preco;
    precoAtual = `R$ ${preco.toFixed(2).replace('.', ',')}`;
    
    document.getElementById('product-name').innerText = produtoAtual;
    document.getElementById('product-price').innerText = precoAtual;

    document.getElementById('pix-gateway-area').style.display = 'none';
    document.getElementById('checkout').scrollIntoView({ behavior: 'smooth' });
}

// ViaCEP automático
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
                    document.getElementById('cidade').value = 'Guaratinguetá - SP';
                    document.getElementById('endereco').value = '';
                }
            })
            .catch(() => {
                document.getElementById('cidade').value = 'Guaratinguetá - SP';
                document.getElementById('endereco').value = '';
            });
    }
});

// Função que simula a geração do Pix Externo
function gerarPagamentoPix() {
    const nome = document.getElementById('nome').value;
    const cep = document.getElementById('cep').value;
    const endereco = document.getElementById('endereco').value;

    if (!nome || !cep || !endereco) {
        alert('Por favor, preencha todos os campos de Nome, CEP e Endereço antes de gerar o Pix!');
        return;
    }

    // Gera um identificador aleatório falso para parecer uma transação real de gateway
    const hashAleatorio = '00020126580014br.gov.bcb.pix0136' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + '5204000053039865802BR5925Matheus Tabacao Tabacaria6009Guaratinguete62070503***6304' + Math.floor(1000 + Math.random() * 9000);
    
    document.getElementById('pix-copia-cola').value = hashAleatorio;
    
    // Cria um QR Code falso usando uma API pública de imagem baseada no hash gerado
    document.getElementById('qrcode-img').src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(hashAleatorio)}`;

    // Exibe o painel do Pix simulado
    document.getElementById('pix-gateway-area').style.display = 'block';

    // Prepara o link do WhatsApp para o cliente enviar o comprovante após pagar o Pix fake
    const mensagem = `Salve, Matheus! Fiz o Pix de ${precoAtual} referente ao produto *${produtoAtual}*.\n\n` +
                     `👤 *Cliente:* ${nome}\n` +
                     `📍 *Endereço:* ${endereco} (CEP: ${cep})\n\n` +
                     `Segue o comprovante do pagamento!`;

    const urlZap = `https://wa.me/5512991362201?text=${encodeURIComponent(mensagem)}`;
    const btnZap = document.getElementById('btn-enviar-zap');
    btnZap.href = urlZap;
    btnZap.style.display = 'flex';

    document.getElementById('pix-gateway-area').scrollIntoView({ behavior: 'smooth' });
}

// Copiar código Pix Copia e Cola
function copiarPixFake() {
    const inputPix = document.getElementById('pix-copia-cola');
    inputPix.select();
    inputPix.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(inputPix.value);

    const btn = document.getElementById('btnCopyFake');
    btn.innerHTML = '<i class="fa-solid fa-check"></i> Código Pix Copiado!';
    btn.style.backgroundColor = '#25d366';
    btn.style.color = '#fff';
    
    setTimeout(() => {
        btn.innerHTML = '<i class="fa-solid fa-copy"></i> Copiar Código Pix';
        btn.style.backgroundColor = '';
        btn.style.color = '';
    }, 3000);
}
