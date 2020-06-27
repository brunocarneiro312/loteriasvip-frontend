import axios from "axios";

/**
 * ---------------------------------
 * Concentra todas as chamadas à API
 * ---------------------------------
 * @author bruno.carneiro
 */

const endpoint = process.env.VUE_APP_API + '/api/v1';
const authEndpoint = process.env.VUE_APP_API + '/auth';
const refreshEndpoint = process.env.VUE_APP_API + '/refresh';

const root = {
    api: {
        cliente: {
            list: {
                clientes: `${endpoint}/clientes`,
                compradores: `${endpoint}/clientes/compradores`
            },
            save: `${endpoint}/clientes`,
            importar: `${endpoint}/clientes/importar`,
        },
        file: {
            upload: {
                compradores: `${endpoint}/upload/compradores`,
                jogos: {
                    lotofacil: `${endpoint}/upload/lotofacil`,
                    lotomania: `${endpoint}/upload/lotomania`,
                    megasena: `${endpoint}/upload/megasena`
                }
            }
        },
        dashboard: {
            resumo: `${endpoint}/resumo`
        },
        jogos: {
            list: `${endpoint}/jogos`,
            lotofacil: `${endpoint}/jogos/lotofacil`,
            lotomania: `${endpoint}/jogos/lotomania`,
            cliente: `${endpoint}/jogos/cliente`,
            fazerJogo: `${endpoint}/jogos/fazerJogo`,
            distribuirJogos: `${endpoint}/jogos/distribuirJogos`,
            distJogos: `${endpoint}/distribuicao`,
            exportarDistribuicao: `${endpoint}/distribuicao/exportar`,
            listarJogosSemDono: `${endpoint}/jogos/listarJogosSemDono`,
            distribuirJogosSemDono: `${endpoint}/jogos/distribuirJogosSemDono`,
            distribuirJogosSemDonoAvulso: `${endpoint}/jogos/distribuirJogosSemDonoAvulso/{qtd}`,
            solicitarSequencia: `${endpoint}/jogos/solicitarSequencia`
        },
        notificacao: {
            list: `${endpoint}/notificacao`,
            get: `${endpoint}/notificacao/{id}`,
            save: `${endpoint}/notificacao`,
            update: `${endpoint}/notificacao`,
            count: `${endpoint}/notificacao/count`,
            countByCliente: `${endpoint}/notificacao/count/cliente`,
            getNotificacaoByCliente: `${endpoint}/notificacao/cliente`,
            marcar: `${endpoint}/notificacao/marcar`
        },
        user: {
            save: `${endpoint}/user`,
            resetPassword: `${endpoint}/resetpassword`
        },
        auth: {
            login: authEndpoint,
            refresh: refreshEndpoint,
            cadastrar: authEndpoint + '/cadastrar'
        }
    }
};

const listarClientes = () => {
    return axios.get(root.api.cliente.list.clientes, {
        headers: {
            'Authorization': `Bearer ${getToken()}`
        }
    });
};

const listarCompradores = () => {
    return axios.get(root.api.cliente.list.compradores, {
        headers: {
            'Authorization': `Bearer ${getToken()}`
        }
    });
};

const salvarCliente = (cliente) => {
    return axios.post(root.api.cliente.save, cliente, {
        headers: {
            'Authorization': `Bearer ${getToken()}`
        }
    });
};

const importarClientes = (file) => {
    return axios.post(root.api.cliente.importar, file, {
        headers: {
            'Authorization': `Bearer ${getToken()}`
        }
    });
};

const uploadCompradores = (formData) => {
    return axios.post(root.api.file.upload.compradores, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${getToken()}`
        }
    })
};

const uploadJogosLotofacil = (file) => {
    return axios.post(root.api.file.upload.jogos.lotofacil, file, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${getToken()}`
        }
    })
};

const uploadJogosLotomania = (formData) => {
    return axios.post(root.api.file.upload.jogos.lotomania, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${getToken()}`
        }
    })
};

const uploadJogosMegasena = (formData) => {
    return axios.post(root.api.file.upload.jogos.megasena, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${getToken()}`
        }
    })
};

const listNotificacao = () => {
    return axios.get(root.api.notificacao.list, {
        headers: {
            'Authorization': `Bearer ${getToken()}`
        }
    })
};

const findNotificacao = () => {
    return axios.get(root.api.notificacao.get, {
        headers: {
            'Authorization': `Bearer ${getToken()}`
        }
    })
};

const saveNotificacao = (notificacao) => {
    return axios.post(root.api.notificacao.save, notificacao, {
        headers: {
            'Authorization': `Bearer ${getToken()}`
        }
    })
};

const updateNotificacao = (notificacao) => {
    return axios.put(root.api.notificacao.save, notificacao, {
        headers: {
            'Authorization': `Bearer ${getToken()}`
        }
    })
};

const countNotificacao = () => {
    return axios.get(root.api.notificacao.count, {
        headers: {
            'Authorization': `Bearer ${getToken()}`
        }
    })
};

const countNotificacaoByCliente = () => {
    return axios.get(root.api.notificacao.countByCliente, {
        headers: {
            'Authorization': `Bearer ${getToken()}`
        }
    })
};

const getNotificacaoByCliente = () => {
    return axios.get(root.api.notificacao.getNotificacaoByCliente, {
        headers: {
            'Authorization': `Bearer ${getToken()}`
        }
    })
};

const marcarNotificacaoVista = (id) => {
    return axios.get(root.api.notificacao.marcar + "/" + id, {
        headers: {
            'Authorization': `Bearer ${getToken()}`
        }
    })
}

const getResumo = () => {
    return axios.get(root.api.dashboard.resumo, {
        headers: {
            'Authorization': `Bearer ${getToken()}`
        }
    });
};

const listJogos = () => {
    return axios.get(root.api.jogos.list, {
        headers: {
            'Authorization': `Bearer ${getToken()}`
        }
    });
};

const listJogosLotofacil = () => {
    return axios.get(root.api.jogos.lotofacil, {
        headers: {
            'Authorization': `Bearer ${getToken()}`
        }
    })
};

const listJogosLotomania = () => {
    return axios.get(root.api.jogos.lotomania, {
        headers: {
            'Authorization': `Bearer ${getToken()}`
        }
    })
};

const getJogosCliente = () => {
    return axios.get(root.api.jogos.cliente, {
        headers: {
            'Authorization': `Bearer ${getToken()}`
        }
    })
};

const fazerJogo = (jogo) => {
    return axios.post(root.api.jogos.fazerJogo, jogo, {
        headers: {
            'Authorization': `Bearer ${getToken()}`
        }
    })
};

const distribuirJogos = (distribuicao) => {
    return axios.post(root.api.jogos.distribuirJogos, distribuicao, {
        headers: {
            'Authorization': `Bearer ${getToken()}`
        }
    })
};

const distribuicao = (distribuicao) => {
    return axios.post(root.api.jogos.distJogos, distribuicao, {
        headers: {
            'Authorization': `Bearer ${getToken()}`
        }
    })
};

const exportarDistribuicao = (distribuicao) => {
    return axios.post(root.api.jogos.exportarDistribuicao, distribuicao, {
        headers: {
            'Authorization': `Bearer ${getToken()}`,
            'Content-Disposition': "attachment; filename=distribuicao.xlsx",
        },
        responseType: 'arraybuffer',
    })
};

const listarJogosSemDono = () => {
    return axios.get(root.api.jogos.listarJogosSemDono, {
        headers: {
            'Authorization': `Bearer ${getToken()}`
        }
    })
};

const distribuirJogosSemDono = () => {
    return axios.post(root.api.jogos.distribuirJogosSemDono, undefined, {
        headers: {
            'Authorization': `Bearer ${getToken()}`
        }
    })
};

const distribuirJogosSemDonoAvulso = (qtdJogosPorCliente) => {
    return axios.post(root.api.jogos.distribuirJogosSemDono + '/' + qtdJogosPorCliente, undefined, {
        headers: {
            'Authorization': `Bearer ${getToken()}`
        }
    })
};

const solicitarSequencia = () => {
    return axios.get(root.api.jogos.solicitarSequencia, {
        headers: {
            'Authorization': `Bearer ${getToken()}`
        }
    })
};

const login = (credentials) => {
    return axios.post(root.api.auth.login, credentials);
};

const refreshToken = () => {
    return axios.get(root.api.auth.refresh);
};

const cadastrar = (cliente) => {
    return axios.post(root.api.auth.cadastrar, cliente);
};

const getToken = () => {
    return localStorage.getItem('tokenData');
}

export default {
    listarClientes: listarClientes,
    listarCompradores: listarCompradores,
    salvarCliente: salvarCliente,
    importarClientes: importarClientes,
    uploadCompradores: uploadCompradores,
    uploadJogosLotofacil: uploadJogosLotofacil,
    uploadJogosLotomania: uploadJogosLotomania,
    uploadJogosMegasena: uploadJogosMegasena,
    getResumo: getResumo,
    listNotificacao: listNotificacao,
    findNotificacao: findNotificacao,
    saveNotificacao: saveNotificacao,
    updateNotificacao: updateNotificacao,
    countNotificacao: countNotificacao,
    countNotificacaoByCliente: countNotificacaoByCliente,
    getNotificacaoByCliente: getNotificacaoByCliente,
    marcarNotificacaoVista: marcarNotificacaoVista,
    listJogos: listJogos,
    listJogosLotofacil: listJogosLotofacil,
    listJogosLotomania: listJogosLotomania,
    getJogosCliente: getJogosCliente,
    fazerJogo: fazerJogo,
    distribuirJogos: distribuirJogos,
    distribuicao: distribuicao,
    exportarDistribuicao: exportarDistribuicao,
    listarJogosSemDono: listarJogosSemDono,
    distribuirJogosSemDono: distribuirJogosSemDono,
    distribuirJogosSemDonoAvulso: distribuirJogosSemDonoAvulso,
    solicitarSequencia: solicitarSequencia,
    login: login,
    refreshToken: refreshToken,
    cadastrar: cadastrar
}
