document.addEventListener("DOMContentLoaded", function() {
    carregarProdutos();
    configurarMenu();
    configurarCarrinho();
});

// Função para carregar produtos da API ou banco de dados
function carregarProdutos() {
    const containerProdutos = document.querySelector('.cardapio .grid');
    
    // Exemplo de dados mockados; substitua com uma chamada à API para buscar os produtos reais
    const produtos = [
        {
            id: 1,
            nome: 'Camiseta Básica',
            descricao: 'Preto',
            preco: '35,00',
            imagem: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg'
        },
        {
            id: 2,
            nome: 'Bolsa Hip Bag',
            descricao: 'Laranja Salmão',
            preco: '90,00',
            imagem: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg'
        }
    ];

    // Iterar sobre os produtos e gerar o HTML
    produtos.forEach(produto => {
        const produtoHTML = `
            <div class="group relative">
                <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                    <img src="${produto.imagem}" alt="${produto.descricao}" class="h-full w-full object-cover object-center lg:h-full lg:w-full">
                </div>
                <div class="mt-4 flex justify-between">
                    <div>
                        <h3 class="text-sm text-gray-700">
                            <a href="#">
                                <span aria-hidden="true" class="absolute inset-0"></span>
                                ${produto.nome}
                            </a>
                        </h3>
                        <p class="mt-1 text-sm text-gray-500">${produto.descricao}</p>
                    </div>
                    <p class="text-sm font-medium text-gray-900">R$${produto.preco}</p>
                </div>
            </div>
        `;
        containerProdutos.innerHTML += produtoHTML;
    });
}

// Função para configurar o menu de navegação
function configurarMenu() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('#navbarNavDropdown');

    navbarToggler.addEventListener('click', function() {
        navbarCollapse.classList.toggle('show');
    });
}

// Função para configurar o carrinho
function configurarCarrinho() {
    const carrinhoButton = document.querySelector('#btnCarrinho');
    const carrinhoCloseButton = document.querySelector('.carrinho .ml-3 button');

    carrinhoButton.addEventListener('click', function() {
        document.querySelector('.carrinho').classList.add('open');
    });

    carrinhoCloseButton.addEventListener('click', function() {
        document.querySelector('.carrinho').classList.remove('open');
    });
}
