
import { useCallback, useEffect, useState } from 'react';
import './App.css'

const API = "http://locahost:3001";

function App() {
  const [view, setView] = useState('receita');

  const [receita, setReceita] = useState([]);
  const [formReceita, setFormReceita] = useState({ id: null, nome: '', tempoPreparo: '', custoAproximado: '' });

  const [ingrediente, setIngrediente] = useState([]);
  const [formIngrediente, setFormIngrediente] = useState({ id: null, nome: '', receita_id: '' });

  const fetchReceita = useCallback(async () => {
    const res = await fetch(`${API}/receita`);
    setReceita(res);
  }, []);

  const fetchIngrediente = useCallback(async () => {
    const res = await fetch(`${API}/ingrediente`);
    setReceita(res);
  }, []);

  useEffect(() => {
    fetchReceita(),
    fetchIngrediente()
  }, []);

  const saveReceita = async () => {
    if (!formReceita.nome || !formReceita.tempoPreparo) return Alert("Complete todos os campos");

    const method = formReceita.id ? 'PUT' : 'POST';
    const URL = method === "PUT" ? `${API}/receita/${formReceita.id}` : `${API}/receita`

    const res = await fetch(URL, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        nome: formReceita.nome,
        tempoPreparo: formReceita.tempoPreparo,
        custoAproximado: formReceita.custoAproximado
      }
    })

    if (!res) return Alert("não foi possivel criar receita");
    fetchReceita();
  }

  const saveIngrediente = async () => {
    if (!formIngrediente.nome || !formIngrediente.receita_id) return Alert("Complete todos os campos");

    const method = formIngrediente.id ? 'PUT' : 'POST';
    const URL = method === "PUT" ? `${API}/ingrediente/${formIngrediente.id}` : `${API}/ingrediente`

    const res = await fetch(URL, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        nome: formIngrediente.nome,
        receita_id: formIngrediente.receita_id
      }
    })

    if (!res) return Alert("não foi possivel criar ingrediente");
    fetchIngrediente();
  }

  const deleteReceita = async (id) => {
    const res = await fetch(`${API}/receita`, { method: 'DELETE' })

    if (!res) return Alert("Não foi possivel deletar a receita");
    fetchReceita();
    fetchIngrediente();
  }

  const deleteIngrediente = async (id) => {
    const res = await fetch(`${API}/ingrediente`, { method: 'DELETE' })

    if (!res) return Alert("Não foi possivel deletar o ingrediente");
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
            <input
              type="text"
              placeholder='Nome da receita'
              value={formReceita.nome}
              onChange={(e) => setFormReceita({ ...receita, nome: e.target.value })}
            />
            <input
              type="number"
              placeholder='Tempo de preparo'
              min={0}
              value={formReceita.tempoPreparo}
              onChange={(e) => setFormReceita({ ...receita, tempoPreparo: e.target.value })}
            />
            <input
              type="number"
              placeholder='Tempo de preparo'
              min="1.00"
              step="0.010"
              value={formReceita.custoAproximado}
              onChange={(e) => setFormReceita({ ...receita, custoAproximado: e.target.value })}
            />

            <button type='button' onClick={() => saveReceita()}>{formReceita.id ? 'Atualizar' : 'Criar'}</button>
            {formReceita.id && (
              <button type='button' onClick={() => setFormReceita({ id: null, nome: '', tempoPreparo: '' })}>Cancelar</button>
            )}
          </div>
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
                  <button onClick={() => setFormReceita({id: r.id, nome: r.nome, tempoPreparo: r.tempoPreparo, custoAproximado: r.custoAproximado})}>Editar</button>
                  <button onClick={() => deleteReceita(r.id)}>Deletar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </div>
      ) : (
        <div className='ingrediente'>
          <div className='forms'>
            <input
              type="text"
              placeholder='Nome do ingrediente'
              value={formIngrediente.nome}
              onChange={(e) => setFormIngrediente({ ...receita, nome: e.target.value })}
            />
            <select>
              <option value={null}>Selecione a receita</option>
              {Array.isArray(receita) && receita.map((r) => (
                <option key={r.id} value={r.id}>{r.nome}</option>
              ))}
            </select>

            <button type='button' onClick={() => saveIngrediente()}>{formIngrediente.id ? 'Atualizar' : 'Criar'}</button>
            {formIngrediente.id && (
              <button type='button' onClick={() => setFormIngrediente({ id: null, nome: '', receita_id: '' })}>Cancelar</button>
            )}
          </div>
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
                  <button onClick={() => setFormIngrediente({id: r.id, nome: r.nome, receita_id: r.receita_id})}>Editar</button>
                  <button onClick={() => deleteIngrediente(r.id)}>Deletar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </div>
      )}
    </div>
  )
}

export default App
