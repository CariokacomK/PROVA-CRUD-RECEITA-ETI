
import { useCallback, useEffect, useState } from 'react';
import './App.css'

const API = "http://localhost:3001";

function App() {
  const [view, setView] = useState('receita');

  const [receita, setReceita] = useState([]);
  const [formReceita, setFormReceita] = useState({ id: null, nome: '', tempoPreparo: '', custoAproximado: '' });

  const [ingrediente, setIngrediente] = useState([]);
  const [formIngrediente, setFormIngrediente] = useState({ id: null, nome: '', receita_id: '' });

  const fetchReceita = useCallback(async () => {
    const res = await fetch(`${API}/receita`);
    const data = await res.json();
    setReceita(data.message);
  }, []);

  const fetchIngrediente = useCallback(async () => {
    const res = await fetch(`${API}/ingrediente`);
    const data = await res.json();
    setIngrediente(data.message);
  }, []);

  useEffect(() => {
    fetchReceita(),
      fetchIngrediente()
  }, [fetchReceita, fetchIngrediente]);

  const saveReceita = async () => {
    if (!formReceita.nome || !formReceita.tempoPreparo) return alert("Complete todos os campos");

    const method = formReceita.id ? 'PUT' : 'POST';
    const URL = method === "PUT" ? `${API}/receita/${formReceita.id}` : `${API}/receita`

    const res = await fetch(URL, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome: formReceita.nome,
        tempoPreparo: Number(formReceita.tempoPreparo),
        custoAproximado: Number(formReceita.custoAproximado)
      })
    })

    if (!res.ok) return alert("não foi possivel criar receita");
    setFormReceita({ id: null, nome: '', tempoPreparo: '', custoAproximado: '' })
    fetchReceita();
  }

  const saveIngrediente = async () => {
    console.log(formIngrediente);
    
    if (!formIngrediente.nome || !formIngrediente.receita_id) return alert("Complete todos os campos");

    const method = formIngrediente.id ? 'PUT' : 'POST';
    const URL = method === "PUT" ? `${API}/ingrediente/${formIngrediente.id}` : `${API}/ingrediente`

    const res = await fetch(URL, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome: formIngrediente.nome,
        receita_id: formIngrediente.receita_id
      })
    })

    if (!res.ok) return alert("não foi possivel criar ingrediente");
    setFormIngrediente({ id: null, nome: '', receita_id: formIngrediente.receita_id })
    fetchIngrediente();
  }

  const deleteReceita = async (id) => {
    const res = await fetch(`${API}/receita/${id}`, { method: 'DELETE' })

    if (!res.ok) return alert("Não foi possivel deletar a receita");
    fetchReceita();
    fetchIngrediente();
  }

  const deleteIngrediente = async (id) => {
    const res = await fetch(`${API}/ingrediente/${id}`, { method: 'DELETE' })

    if (!res.ok) return alert("Não foi possivel deletar o ingrediente");
    fetchIngrediente();
  }

  return (
    <div>
      <nav>
        <button onClick={() => setView('receita')}>Receitas</button>
        <button onClick={() => setView('ingrediente')}>Ingredientes</button>
      </nav>
      {view === "receita" ? (
        <div className='receita'>
          <div className='forms'>
            <label>
              Nome
              <input
                type="text"
                placeholder='Nome da receita'
                value={formReceita.nome}
                onChange={(e) => setFormReceita({ ...formReceita, nome: e.target.value })}
              />
            </label>
            <label>
              Tempo p/ Preparo
              <input
                type="number"
                placeholder='Tempo de preparo'
                min={0}
                value={formReceita.tempoPreparo}
                onChange={(e) => setFormReceita({ ...formReceita, tempoPreparo: e.target.value })}
              />
            </label>
            <label>
              Custo Aproximado
              <input
                type="number"
                placeholder='Custo Aproximado'
                min="1.00"
                step="0.010"
                value={formReceita.custoAproximado}
                onChange={(e) => setFormReceita({ ...formReceita, custoAproximado: e.target.value })}
              />
            </label>

            <button type='button' onClick={() => saveReceita()}>{formReceita.id ? 'Atualizar' : 'Criar'}</button>
            {formReceita.id && (
              <button type='button' onClick={() => setFormReceita({ id: null, nome: '', tempoPreparo: '', custoAproximado: '' })}>Cancelar</button>
            )}
          </div>
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Tempo de Preparo</th>
                <th>Custo Aproximado</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(receita) && receita.map((r) => (
                <tr key={r.id}>
                  <td>{r.nome}</td>
                  <td>{r.tempoPreparo}</td>
                  <td>{r.custoAproximado}</td>
                  <td>
                    <button onClick={() => setFormReceita({ id: r.id, nome: r.nome, tempoPreparo: r.tempoPreparo, custoAproximado: r.custoAproximado })}>Editar</button>
                    <button onClick={() => deleteReceita(r.id)}>Deletar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className='ingrediente'>
          <div className='forms'>
            <label>
              Nome
              <input
                type="text"
                placeholder='Nome do ingrediente'
                value={formIngrediente.nome}
                onChange={(e) => setFormIngrediente({ ...formIngrediente, nome: e.target.value })}
              />
            </label>
            <label>
              Receitas
              <select onChange={(e) => setFormIngrediente({ ...formIngrediente, receita_id: e.target.value })}>
                <option>Selecione a receita</option>
                {Array.isArray(receita) && receita.map((r) => (
                  <option key={r.id} value={r.id}>{r.nome}</option>
                ))}
              </select>
            </label>

            <button type='button' onClick={() => saveIngrediente()}>{formIngrediente.id ? 'Atualizar' : 'Criar'}</button>
            {formIngrediente.id && (
              <button type='button' onClick={() => setFormIngrediente({ id: null, nome: '', receita_id: '' })}>Cancelar</button>
            )}
          </div>
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Receita</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(ingrediente) && ingrediente.map((i) => (
                <tr key={i.id}>
                  <td>{i.nome}</td>
                  <td>{i.receita.nome}</td>
                  <td>
                    <button onClick={() => setFormIngrediente({ id: i.id, nome: i.nome, receita_id: i.receita_id })}>Editar</button>
                    <button onClick={() => deleteIngrediente(i.id)}>Deletar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default App
