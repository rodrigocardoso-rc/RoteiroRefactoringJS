class ServicoCalculoFatura {
    constructor(repo) {
        this.repo = repo;
    }

    getPeca(apre) {
        return this.repo.getPeca(apre);
    }

    calcularCredito(apre) {
        let creditos = 0;
        creditos += Math.max(apre.audiencia - 30, 0);
        if (this.repo.getPeca(apre).tipo === "comedia")
            creditos += Math.floor(apre.audiencia / 5);
        return creditos;
    }

    calcularTotalCreditos(apresentacoes) {
        let creditos = 0;
        for (let apre of apresentacoes) {
            creditos += this.calcularCredito(apre)
        }
        return creditos
    }

    calcularTotalApresentacao(peca, apre) {
        let total = 0;

        switch (peca.tipo) {
            case "tragedia":
                total = 40000;
                if (apre.audiencia > 30) {
                    total += 1000 * (apre.audiencia - 30);
                }
                break;
            case "comedia":
                total = 30000;
                if (apre.audiencia > 20) {
                    total += 10000 + 500 * (apre.audiencia - 20);
                }
                total += 300 * apre.audiencia;
                break;
            default:
                throw new Error(`Peça desconhecia: ${peca.tipo}`);
        }
        return total
    }

    calcularTotalFatura(apresentacoes) {
        let totalFatura = 0;
        for (let apre of apresentacoes) {
            let total = this.calcularTotalApresentacao(this.repo.getPeca(apre), apre);
            totalFatura += total;
        }
        return totalFatura
    }
}

module.exports = ServicoCalculoFatura;