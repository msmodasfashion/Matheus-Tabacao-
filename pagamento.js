// Pega os dados que vieram da URL (ex: pagamento.html?produto=Zomo&preco=11)
const urlParams = new URLSearchParams(window.location.search);
const nomeProd = urlParams.get('produto') || "Essência Tabacaria";
const precoProd = parseFloat(urlParams.get('preco')) || 11.00;

// Atualiza o visual da caixinha com o produto selecionado
document.getElementById('resumo-produto-nome').innerText = nomeProd;
document.getElementById('resumo-produto-preco').innerText = `R$ ${precoProd.toFixed(2).replace('.', ',')}`;

// ViaCEP automático
document.getElementById('pag-cep').addEventListener('blur', function() {
    let cep = this.value.replace(/\D/g, '');
    if (cep.length === 8) {
        document.getElementById('pag-endereco').value = 'Buscando endereço...';

        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(response => response.json())
            .then(data => {
                if (!data.erro) {
                    document.getElementById('pag-endereco').value = `${data.logradouro}, ${data.bairro} - Guará/SP`;
                } else {
                    alert('CEP não encontrado.');
                    document.getElementById('pag-endereco').value = '';
                }
            })
            .catch(() => {
                document.getElementById('pag-endereco').value = '';
            });
    }
});

// Gera o Pix Fake com cara de Gateway Profissional
function gerarPagamentoFakeSite() {
    const nome = document.getElementById('pag-nome').value;
    const cep = document.getElementById('pag-cep').value;
    const endereco = document.getElementById('pag-endereco').value;

    if (!nome || !cep || !endereco) {
        alert('Por favor, preencha todos os campos de Nome, CEP e Endereço!');
        return;
    }

    // Hash aleatório simulando um payload de Pix legítimo
    const hashAleatorio = '00020126580014br.gov.bcb.pix0136' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + '5204000053039865802BR5925Matheus Tabacao Tabacaria6009Guaratinguete62070503***6304' + Math.floor(1000 + Math.random() * 9000);
    
    document.getElementById('pix-copia-cola').value = hashAleatorio;
    document.getElementById('qrcode-img').src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(hashAleatorio)}`;

    // Mostra a área do Pix
    document.getElementById('pix-gateway-area').style.display = 'block';

    // Monta o link para o seu WhatsApp com o aviso de pagamento
    const precoFormatado = `R$ ${precoProd.toFixed(2).replace('.', ',')}`;
    const mensagem = `Salve, Matheus! Fiz o Pix de ${precoFormatado} referente ao produto *${nomeProd}*.\n\n` +
                     `👤 *Cliente:* ${nome}\n` +
                     `📍 *Endereço:* ${endereco} (CEP: ${cep})\n\n` +
                     `Segue o comprovante do pagamento!`;

    const urlZap = `https://wa.me/5512991362201?text=${encodeURIComponent(mensagem)}`;
    const btnZap = document.getElementById('btn-enviar-zap');
    btnZap.href = urlZap;
    btnZap.style.display = 'flex';

    document.getElementById('pix-gateway-area').scrollIntoView({ behavior: 'smooth' });
}

// Copiar Pix Copia e Cola
function copiarPixFakeSite() {
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

