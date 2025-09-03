import React, { useState } from "react";
import './Categorias.css';
import Button from "../../../Components/Button/button";
import { useNavigate } from "react-router-dom";

function Categorias(){
    const navigate = useNavigate();

    const [categorias, setCategorias] = useState([
        { id: 1, nome: "Restaurante", tipo: "Gasto" },
        { id: 2, nome: "Mercado", tipo: "Gasto" },
        { id: 3, nome: "Salário", tipo: "Receita" },
        { id: 4, nome: "Transporte", tipo: "Gasto" },
        { id: 5, nome: "Saúde", tipo: "Gasto" },
        { id: 6, nome: "Lazer", tipo: "Gasto" },
        { id: 7, nome: "Educação", tipo: "Gasto" },
        { id: 8, nome: "Investimentos", tipo: "Receita" },
        { id: 9, nome: "Aluguel", tipo: "Receita" },
        { id: 10, nome: "Outros", tipo: "Gasto" },
        { id: 11, nome: "Outros", tipo: "Gasto" },
        { id: 12, nome: "Outros", tipo: "Gasto" },
        { id: 13, nome: "Outros", tipo: "Gasto" },
        { id: 14, nome: "Outros", tipo: "Gasto" },
        { id: 15, nome: "Outros", tipo: "Gasto" },
        { id: 16, nome: "Outros", tipo: "Gasto" },
        { id: 17, nome: "Outros", tipo: "Gasto" },
    ]);

    const [selecionada, setSelecionada] = useState(null);
    
    const handleChange = (e) => {
        setSelecionada({
            ...selecionada,
            [e.target.name]: e.target.value
        });
    };

    const salvarCategoria = () => {
        if (selecionada) {
            setCategorias(categorias.map(c => 
                c.id === selecionada.id ? selecionada : c
            ));
        }
    };

    const novaCategoria = () => {
        const nova = { id: Date.now(), nome: "", tipo: "Gasto" };
        setCategorias([...categorias, nova]);
        setSelecionada(nova);
    };

    const excluirCategoria = (id) => {
        setCategorias(categorias.filter(c => c.id !== id));
        setSelecionada(null);
    };

    return (
        <div className="Card-Categorias">
            <div className="CC-card-central">
                
                {/* Lista à esquerda */}
                <div className="CC-card-esquerda">
                    <h2>Lista</h2>
                    <div className="lista-categorias">
                        {categorias.map(cat => (
                            <div 
                                key={cat.id} 
                                className={`item-categoria ${selecionada?.id === cat.id ? "ativo" : ""}`}
                                onClick={() => setSelecionada(cat)}
                            >
                                {cat.nome}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Formulário à direita */}
                <div className="CC-card-direita">
                    <h2>Detalhes</h2>
                    
                    {selecionada ? (
                        <>
                            <label>Nome</label>
                            <input 
                                type="text" 
                                name="nome"
                                value={selecionada.nome}
                                onChange={handleChange}
                            />

                            <label>Tipo</label>
                            <select 
                                name="tipo" 
                                value={selecionada.tipo}
                                onChange={handleChange}
                            >
                                <option value="Gasto">Gasto</option>
                                <option value="Receita">Receita</option>
                            </select>

                            <div className="botoes">
                                <Button children="Salvar" onClick={salvarCategoria} />
                                <Button children="Excluir" onClick={() => excluirCategoria(selecionada.id)} />
                            </div>
                        </>
                    ) : (
                        <p>Selecione uma categoria</p>
                    )}

                    <Button children="Nova Categoria" onClick={novaCategoria} />
                </div>
            </div>
        </div>
    );
}

export default Categorias;
