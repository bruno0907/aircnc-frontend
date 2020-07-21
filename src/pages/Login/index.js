import React, { useState } from 'react'
import api from '../../services/api';

export default function Login({ history }) {
    // vetor de objetos da DOM do React. Servem para manipular os valores do campo
    const [ email, setEmail ] = useState('')

    async function handleSubmit(e) {
      e.preventDefault();
      
      //capturando o email e despachando pela API
      const response = await api.post('/sessions', { email })

      // extraindo o id do usuário da resposta
      const { _id } = response.data;
        
      // armazenando no localStorage para persistir por toda a aplicação
      localStorage.setItem('user', _id);

      // direcionando o usuário
      history.push('/dashboard');
    }
    return (
        <>
            <p>
            Ofereça <strong>spots</strong> para programadores e encontre <strong>talentos</strong> para sua empresa.
            </p>

            <form onSubmit={handleSubmit}>
            <label htmlFor="email">E-mail*</label>
            <input 
                type="email" 
                name="email" 
                id="emai" 
                placeholder="Seu melhor e-mail" 
                // inline function para dizer ao campo value do JSX que o seu valor é o target.value do evento (onChange) e armazenando no setEmail
                onChange={e => setEmail(e.target.value)}
                // recebendo dinamicamente o valor pro campo via onChange
                value={email}
            />
            <button className="btn" type="submit">Entrar</button>
            </form>
        </>
    )
}
