let carrinho = [];

// Função para adicionar produto ao carrinho
function adicionarAoCarrinho(produtoId) {
    const produto = produtos.find(p => p.id === produtoId);
    
    if (produto) {
        carrinho.push({ ...produto, quantidade: 1 });
        atualizarCarrinho();
    }
}

// Função para remover produto do carrinho
function removerDoCarrinho(produtoId) {
    carrinho = carrinho.filter(item => item.id !== produtoId);
    atualizarCarrinho();
}

// Função para atualizar o carrinho e recalcular o total
function atualizarCarrinho() {
    const carrinhoContainer = document.querySelector('.carrinho ul');
    const totalContainer = document.querySelector('.carrinho .total');

    carrinhoContainer.innerHTML = '';

    carrinho.forEach(item => {
        const itemHTML = `
            <li class="flex py-6">
                <div class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img src="${item.imagem}" alt="${item.descricao}" class="h-full w-full object-cover object-center">
                </div>
                <div class="ml-4 flex flex-1 flex-col">
                    <div class="flex justify-between text-base font-medium text-gray-900">
                        <h3>
                            <a href="#">${item.nome}</a>
                        </h3>
                        <p class="ml-4">R$${item.preco}</p>
                    </div>
                        <p class="text-gray-500">Qtd ${item.quantidade}</p>
                        <button type="button" class="font-medium text-indigo-600 hover:text-indigo-500" onclick="removerDoCarrinho(${item.id})">Remover</button>
                    </div>
                </div>
            </li>
        `;
        carrinhoContainer.innerHTML += itemHTML;
    });

    const total = carrinho.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
    totalContainer.textContent = `R$${total.toFixed(2)}`;
}
