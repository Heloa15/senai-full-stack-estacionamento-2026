const prisma = require("../data/prisma");

const cadastrarAutomovel = async (req, res) => {
    try {
        const data = req.body;

        const novo = await prisma.automovel.create({
           data
        });

        return res.status(201).json(novo);
    } catch (err) {
        return res.status(500).json({ erro: err.message });
    }
};

const listarAutomovel = async (req, res) => {
    try {
        const lista = await prisma.automovel.findMany({
            orderBy: {
                proprietario: "asc"
            }
        });

        res.status(200).json(lista);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao listar automóveis" });
    }
};

const buscarAutomovel = async (req, res) => {
    try {
        const { placa } = req.params;

        const item = await prisma.automovel.findUnique({
            where: { placa }
        });

        if (!item) {
            return res.status(404).json({ mensagem: "Automóvel não encontrado" });
        }

        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao buscar automóvel" });
    }
};

const atualizarAutomovel = async (req, res) => {
    try {
        const { placa } = req.params;
        const dados = req.body;

        if (dados.ano) {
            dados.ano = Number(dados.ano);
        }

        const item = await prisma.automovel.update({
            where: { placa },
            data: dados
        });

        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao atualizar automóvel" });
    }
};

const deletarAutomovel = async (req, res) => {
    try {
        const { placa } = req.params;

        await prisma.automovel.delete({
            where: { placa }
        });

        res.status(200).json({ mensagem: "Automóvel excluído com sucesso" });
    } catch (error) {
        res.status(500).json({ erro: "Erro ao excluir automóvel" });
    }
};

module.exports = {
    cadastrarAutomovel,
    listarAutomovel,
    buscarAutomovel,
    atualizarAutomovel,
    deletarAutomovel
};