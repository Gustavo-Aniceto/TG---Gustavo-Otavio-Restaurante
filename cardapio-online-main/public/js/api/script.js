$(document).ready(function () {
    cardapio.eventos.init();
});

var cardapio = {};

var MEU_CARRINHO = [];
var MEU_ENDERECO = null;

var VALOR_CARRINHO = 0;
var VALOR_ENTREGA = 5;

var CELULAR_EMPRESA = '5511958705804';

cardapio.eventos = {
    init: function () {
        this.obterItensCardapio();
        this.carregarBotaoLigar();
        this.carregarBotaoReserva();
        this.carregarBotaoWhatsapp();
    },

    obterItensCardapio: function (categoria = 'burgers', vermais = false) {
        var filtro = MENU[categoria];

        if (!vermais) {
            $("#itensCardapio").html('');
            $("#btnVerMais").removeClass('hidden');
        }

        $.each(filtro, function (i, e) {
            let temp = cardapio.templates.item
                .replace(/\${img}/g, e.img)
                .replace(/\${name}/g, e.name)
                .replace(/\${price}/g, e.price.toFixed(2).replace('.', ','))
                .replace(/\${id}/g, e.id);

            if (vermais && i >= 8 && i < 12) {
                $("#itensCardapio").append(temp);
            }

            if (!vermais && i < 8) {
                $("#itensCardapio").append(temp);
            }
        });

        $(".container-menu a").removeClass('active');
        $("#menu-" + categoria).addClass('active');
    },

    verMais: function () {
        var ativo = $(".container-menu a.active").attr('id').split('menu-')[1];
        this.obterItensCardapio(ativo, true);
        $("#btnVerMais").addClass('hidden');
    },

    diminuirQuantidade: function (id) {
        let qntdAtual = parseInt($("#qntd-" + id).text());
        if (qntdAtual > 0) {
            $("#qntd-" + id).text(qntdAtual - 1);
        }
    },

    aumentarQuantidade: function (id) {
        let qntdAtual = parseInt($("#qntd-" + id).text());
        $("#qntd-" + id).text(qntdAtual + 1);
    },

    adicionarAoCarrinho: function (id) {
        let qntdAtual = parseInt($("#qntd-" + id).text());

        if (qntdAtual > 0) {
            var categoria = $(".container-menu a.active").attr('id').split('menu-')[1];
            let filtro = MENU[categoria];

            let item = $.grep(filtro, function (e) { return e.id == id; });

            if (item.length > 0) {
                let existe = $.grep(MEU_CARRINHO, function (elem) { return elem.id == id; });

                if (existe.length > 0) {
                    let objIndex = MEU_CARRINHO.findIndex(obj => obj.id == id);
                    MEU_CARRINHO[objIndex].qntd += qntdAtual;
                } else {
                    item[0].qntd = qntdAtual;
                    MEU_CARRINHO.push(item[0]);
                }

                this.mensagem('Item adicionado ao carrinho', 'green');
                $("#qntd-" + id).text(0);
                this.atualizarBadgeTotal();
            }
        }
    },

    atualizarBadgeTotal: function () {
        var total = 0;

        $.each(MEU_CARRINHO, function (i, e) {
            total += e.qntd;
        });

        if (total > 0) {
            $(".botao-carrinho").removeClass('hidden');
            $(".container-total-carrinho").removeClass('hidden');
        } else {
            $(".botao-carrinho").addClass('hidden');
            $(".container-total-carrinho").addClass('hidden');
        }

        $(".badge-total-carrinho").html(total);
    },

    abrirCarrinho: function (abrir) {
        if (abrir) {
            $("#modalCarrinho").removeClass('hidden');
            this.carregarCarrinho();
        } else {
            $("#modalCarrinho").addClass('hidden');
        }
    },

    carregarEtapa: function (etapa) {
        if (etapa == 1) {
            $('#lblTituloEtapa').text('Seu carrinho:');
            $('#itensCarrinho').removeClass('hidden');
            $('#localEntrega').addClass('hidden');
            $('#resumoCarrinho').addClass('hidden');

            $('.etapa').removeClass('active');
            $('.etapa1').addClass('active');

            $('#btnEtapaPedido').removeClass('hidden');
            $('#btnEtapaEndereco').addClass('hidden');
            $('#btnEtapaResumo').addClass('hidden');
            $('#btnVoltar').addClass('hidden');
        }

        if (etapa == 2) {
            $('#lblTituloEtapa').text('Endereço de entrega:');
            $('#itensCarrinho').addClass('hidden');
            $('#localEntrega').removeClass('hidden');
            $('#resumoCarrinho').addClass('hidden');

            $('.etapa').removeClass('active');
            $('.etapa1').addClass('active');
            $('.etapa2').addClass('active');

            $('#btnEtapaPedido').addClass('hidden');
            $('#btnEtapaEndereco').removeClass('hidden');
            $('#btnEtapaResumo').addClass('hidden');
            $('#btnVoltar').removeClass('hidden');
        }

        if (etapa == 3) {
            $('#lblTituloEtapa').text('Resumo do pedido');
            $('#itensCarrinho').addClass('hidden');
            $('#localEntrega').addClass('hidden');
            $('#resumoCarrinho').removeClass('hidden');

            $('.etapa').removeClass('active');
            $('.etapa1').addClass('active');
            $('.etapa2').addClass('active');
            $('.etapa3').addClass('active');

            $('#btnEtapaPedido').addClass('hidden');
            $('#btnEtapaEndereco').addClass('hidden');
            $('#btnEtapaResumo').removeClass('hidden');
            $('#btnVoltar').removeClass('hidden');
        }
    },

    voltarEtapa: function () {
        let etapa = $('.etapa.active').length;
        this.carregarEtapa(etapa - 1);
    },

    carregarCarrinho: function () {
        this.carregarEtapa(1);

        if (MEU_CARRINHO.length > 0) {
            $("#itensCarrinho").html('');

            $.each(MEU_CARRINHO, function (i, e) {
                let temp = cardapio.templates.itemCarrinho
                    .replace(/\${img}/g, e.img)
                    .replace(/\${name}/g, e.name)
                    .replace(/\${price}/g, e.price.toFixed(2).replace('.', ','))
                    .replace(/\${id}/g, e.id)
                    .replace(/\${qntd}/g, e.qntd);

                $("#itensCarrinho").append(temp);

                if ((i + 1) == MEU_CARRINHO.length) {
                    cardapio.metodos.carregarValores();
                }
            });
        } else {
            $("#itensCarrinho").html('<p class="carrinho-vazio"><i class="fa fa-shopping-bag"></i> Seu carrinho está vazio.');
            this.carregarValores();
        }
    },

    diminuirQuantidadeCarrinho: function (id) {
        let qntdAtual = parseInt($("#qntd-carrinho-" + id).text());
        if (qntdAtual > 1) {
            $("#qntd-carrinho-" + id).text(qntdAtual - 1);
            this.atualizarCarrinho(id, qntdAtual - 1);
        } else {
            this.removerItemCarrinho(id);
        }
    },

    aumentarQuantidadeCarrinho: function (id) {
        let qntdAtual = parseInt($("#qntd-carrinho-" + id).text());
        $("#qntd-carrinho-" + id).text(qntdAtual + 1);
        this.atualizarCarrinho(id, qntdAtual + 1);
    },

    removerItemCarrinho: function (id) {
        MEU_CARRINHO = $.grep(MEU_CARRINHO, function (e) { return e.id != id; });
        this.carregarCarrinho();
        this.atualizarBadgeTotal();
    },

    atualizarCarrinho: function (id, qntd) {
        let objIndex = MEU_CARRINHO.findIndex(obj => obj.id == id);
        MEU_CARRINHO[objIndex].qntd = qntd;

        this.atualizarBadgeTotal();
        this.carregarValores();
    },

    carregarValores: function () {
        VALOR_CARRINHO = 0;

        $('#lblSubTotal').text('R$ 0,00');
        $('#lblValorEntrega').text('+ R$ 0,00');
        $('#lblValorTotal').text('R$ 0,00');

        $.each(MEU_CARRINHO, function (i, e) {
            VALOR_CARRINHO += e.price * e.qntd;
        });

        $('#lblSubTotal').text('R$ ' + VALOR_CARRINHO.toFixed(2).replace('.', ','));
        $('#lblValorEntrega').text('+ R$ ' + VALOR_ENTREGA.toFixed(2).replace('.', ','));
        $('#lblValorTotal').text('R$ ' + (VALOR_CARRINHO + VALOR_ENTREGA).toFixed(2).replace('.', ','));
    },

    carregarBotaoLigar: function () {
        $('#btnLigar').on('click', function () {
            window.location.href = 'tel:' + CELULAR_EMPRESA;
        });
    },

    carregarBotaoWhatsapp: function () {
        $('#btnWhatsapp').on('click', function () {
            window.open('https://wa.me/' + CELULAR_EMPRESA, '_blank');
        });
    },

    carregarBotaoReserva: function () {
        $('#btnReserva').on('click', function () {
            window.location.href = 'reserva.html';
        });
    },

    mensagem: function (msg, cor) {
        $('#mensagem').removeClass('hidden');
        $('#mensagem').text(msg);
        $('#mensagem').removeClass('green red').addClass(cor);

        setTimeout(function () {
            $('#mensagem').addClass('hidden');
        }, 3000);
    }
};

cardapio.templates = {
    item: '<div class="item-cardapio">' +
        '<img src="${img}" alt="${name}">' +
        '<div class="info-item">' +
        '<h3>${name}</h3>' +
        '<p>R$ ${price}</p>' +
        '<button onclick="cardapio.eventos.adicionarAoCarrinho(${id})">Adicionar</button>' +
        '<button onclick="cardapio.eventos.diminuirQuantidade(${id})">-</button>' +
        '<span id="qntd-${id}">0</span>' +
        '<button onclick="cardapio.eventos.aumentarQuantidade(${id})">+</button>' +
        '</div>' +
        '</div>',
    itemCarrinho: '<div class="item-carrinho">' +
        '<img src="${img}" alt="${name}">' +
        '<div class="info-item">' +
        '<h3>${name}</h3>' +
        '<p>R$ ${price} x <span id="qntd-carrinho-${id}">${qntd}</span></p>' +
        '<button onclick="cardapio.eventos.diminuirQuantidadeCarrinho(${id})">-</button>' +
        '<button onclick="cardapio.eventos.aumentarQuantidadeCarrinho(${id})">+</button>' +
        '<button onclick="cardapio.eventos.removerItemCarrinho(${id})">Remover</button>' +
        '</div>' +
        '</div>'
};
