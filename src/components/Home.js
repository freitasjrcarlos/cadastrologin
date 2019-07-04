import React from 'react';
import firebase from './Conn';

export default class Home extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      name: '',
      cpf: '',
      pontos: '',
      newPontos: '',
      newCPF: '',
      userUid: 0,
    }

    this.sair = this.sair.bind(this);
    this.pontos = this.pontos.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.pesquisar = this.pesquisar.bind(this);

    firebase.auth().onAuthStateChanged((user)=> {
      if(user){  
  
        firebase.database().ref('users').child(user.uid).on('value', (snapshot)=> {
          let state = this.state;
          state.userUid = user.uid;
          state.name = snapshot.val().name;
          state.cpf = snapshot.val().cpf;
          state.pontos = snapshot.val().pontos;
          this.setState(state);
        });
      } 
    });

    

  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

sair(){
  firebase.auth().signOut();
}

pontos(){
    if(this.state.userUid !== 0){
      firebase.database().ref('users').child(this.state.userUid).update({
        pontos: this.state.newPontos,
     }); 
    }

    alert('Pontos Alterados');
}

pesquisar(){
  let cpf = this.state.newCPF;  

  firebase.database().ref('users').orderByChild('cpf').equalTo(cpf).on('child_added', (snapshot)=>{
    if(snapshot.val().cpf === cpf){
          let state = this.state;
          state.name = snapshot.val().name;
          state.cpf = snapshot.val().cpf;
          state.pontos = snapshot.val().pontos;
          state.userUid = snapshot.val().uid;
          this.setState(state);
    }else {
      alert('Cpf não é igual');
    }
});
}


  render(){
    return(
      <div className="container-home">
        <h1> Pesquisar usuário </h1>

        <input className="input" type="text" name="newCPF" value={this.state.newCPF} onChange={this.handleChange} placeholder="Digite o cpf"></input>
        <button className="btn" onClick={this.pesquisar}> Pesquisar </button>

        <p>Nome: {this.state.name}</p>
        <p>Cpf: {this.state.cpf}</p>

        <button className="btn" onClick={this.sair}> Sair </button>
      </div>
    );
  }
}
