import React from 'react';
import './App.css';
import firebase from './Conn';
import { Link } from 'react-router-dom';

export default class FormCadastro extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      name: '',
      cpf: '',
      pontos: '',
      formEmail: '',
      formSenha: '',      
      userUid: 0,
    }    
    this.cadastrar = this.cadastrar.bind(this);
    this.handleChange = this.handleChange.bind(this); 
    this.saveUser = this.saveUser.bind(this);

    //Logout
    firebase.auth().signOut();

  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  saveUser(){
    if(this.state.userUid !== 0){
      firebase.database().ref('users').child(this.state.userUid).set({
        name: this.state.name,
        cpf: this.state.cpf,
        pontos: this.state.pontos,
      }); 

      let state = this.state;
      state.name = '';
      state.cpf = '';
      state.pontos = '';
      state.formEmail = '';
      state.formSenha = '';
      state.userUid = 0;
      this.setState(state);

      firebase.auth().signOut();

      alert("Usuário inserido com sucesso!");
    }
    
  }
  


  cadastrar(e){
    e.preventDefault();
    if(
      this.state.name != null &&
      this.state.formEmail != null &&
      this.state.formSenha != null){

    firebase.auth().onAuthStateChanged((user)=>{
      if(user){
        let state = this.state;
        state.userUid = user.uid;
        this.setState(state);
        this.saveUser();
      }
    });

  
    firebase.auth().createUserWithEmailAndPassword(this.state.formEmail, this.state.formSenha)
    .catch((error) => {
        alert(error);
      });
  } 
}
      

  render(){
    return(
      <div className="container">
        <form className="form-container">          
        <h1> Cadastrar novo cliente</h1>

          <input className="input" placeholder="Nome" type="text" name="name" value={this.state.name}  onChange={this.handleChange}
          />
          <input className="input" placeholder="Cpf" type="text" name="cpf" value={this.state.cpf}  onChange={this.handleChange}
          />
          <input className="input" placeholder="Pontos" type="text" name="pontos" value={this.state.pontos}  onChange={this.handleChange}
          />
          <input className="input" placeholder="Email" type="email" name="formEmail" value={this.state.formEmail}  onChange={this.handleChange}
          />

          <input className="input" placeholder="Senha" type="password"name="formSenha" value={this.state.formSenha}  onChange={this.handleChange}
          />

        <button className="btn" onClick={this.cadastrar}> Cadastrar </button>
        <Link to="/">Ir para a página de login de usuário</Link>
        </form>
      </div>
    );
  }
}