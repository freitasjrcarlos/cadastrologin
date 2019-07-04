import React from 'react';
import './App.css';
import firebase from './Conn';
import { Link } from 'react-router-dom';

export default class FormLogin extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      formEmail: '',
      formSenha: '',
    }    
    this.logar = this.logar.bind(this);
    this.handleChange = this.handleChange.bind(this);

  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  logar(e) {
    e.preventDefault();
    firebase.auth().signInWithEmailAndPassword(this.state.formEmail, this.state.formSenha).then((u)=>{
    }).catch((error) => {
        console.log(error);
      });
  }
      

  render(){
    return(
      <div className="container">
        <form className="form-container">          
        <h1> Login de Usuário </h1>
          <input className="input" placeholder="Email" type="email" name="formEmail" value={this.state.formEmail}  onChange={this.handleChange}
          />

          <input className="input" placeholder="Senha" type="password"name="formSenha" value={this.state.formSenha}  onChange={this.handleChange}
          />

        <button type="submit" className="btn" onClick={this.logar}> Logar </button>

        <Link to="/FormCadastro">Ir para a página de cadastro</Link>
                  
        </form>
      </div>
    );
  }
}