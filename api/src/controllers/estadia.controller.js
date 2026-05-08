const prisma = require("../data/prisma");

const cadastrarEstadia = async (req, res) => {
    try {
        const { placa, valorHora } = req.body;

        const veiculo = await prisma.automovel.findUnique({
            where: { placa }
        });

        if (!veiculo) {
            return res.status(404).json({ mensagem: "Veículo não encontrado" });
        }

        const item = await prisma.estadia.create({
            data: {
                placa,
                valorHora: Number(valorHora)
            }
        });

        res.status(201).json(item);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao cadastrar estadia" });
    }
};

const listarEstadia = async (req, res) => {
    try {
        const lista = await prisma.estadia.findMany({
            orderBy: {
                entrada: "desc"
            }
        });

        res.status(200).json(lista);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao listar estadias" });
    }
};

const buscarEstadia = async (req, res) => {
    try {
        const { id } = req.params;

        const item = await prisma.estadia.findUnique({
            where: { id: Number(id) }
        });

        if (!item) {
            return res.status(404).json({ mensagem: "Estadia não encontrada" });
        }

        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao buscar estadia" });
    }
};

const atualizarEstadia = async (req, res) => {
    try {
        const { id } = req.params;
        const dados = req.body;

        const estadia = await prisma.estadia.findUnique({
            where: { id: Number(id) }
        });

        if (!estadia) {
            return res.status(404).json({ mensagem: "Estadia não encontrada" });
        }

        if (dados.saida) {
            const saida = new Date(dados.saida);
            const entrada = new Date(estadia.entrada);

            const horas = (saida - entrada) / (1000 * 60 * 60);
            dados.valorTotal = horas * estadia.valorHora;
            dados.saida = saida;
        }

        const item = await prisma.estadia.update({
            where: { id: Number(id) },
            data: dados
        });

        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao atualizar estadia" });
    }
};

const deletarEstadia = async (req, res) => {
    try {
        const { id } = req.params;

        await prisma.estadia.delete({
            where: { id: Number(id) }
        });

        res.status(200).json({ mensagem: "Estadia excluída com sucesso" });
    } catch (error) {
        res.status(500).json({ erro: "Erro ao excluir estadia" });
    }
};

module.exports = {
    cadastrarEstadia,
    listarEstadia,
    buscarEstadia,
    atualizarEstadia,
    deletarEstadia
};