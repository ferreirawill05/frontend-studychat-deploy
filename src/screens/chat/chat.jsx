import React, { Component } from 'react';
import css from './chat.css'
import logo from '../../assets/logo.png'
import api from '../../services/api'
import '../home//home_style.css'
import { Link } from 'react-router-dom'

import Bar from '../../assets/bars.svg'


export default class SimpleForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      materia: '',
      sentimento: '',
      questionarios: [],
      questoes: [],
      questao: 0,
      isLoading: false,
    };
  }

  

  ListaQuestoesQuestionario(q){


    api.get('api/questoes/' + q.idQuestionario)

      .then(resposta => {
        if (resposta.status === 200) {
          this.setState({ questoes: resposta.data});
          console.log(this.state.questoes);
          console.log(this.state.questao);
        }
      })
      .catch(() => {
        console.log('algo deu ruim ');
      })
  }

  mostrarquest = () => {
    var containerMsg = document.getElementById('mensagens');

    if (this.state.questoes.length >= this.state.questao) {
      var numero = this.state.questao - 1          
      containerMsg.innerHTML = containerMsg.innerHTML +'<p class="enunciado">' + this.state.questao + ' - ' + this.state.questoes[numero].enunciado + '</p>'
      containerMsg.innerHTML = containerMsg.innerHTML +'<p class="alternativa"> <b> A) </b> ' + this.state.questoes[numero].alternativaA + '</p>'
      containerMsg.innerHTML = containerMsg.innerHTML +'<p class="alternativa" ><b> B) </b>' + this.state.questoes[numero].alternativaB + '</p>'
      containerMsg.innerHTML = containerMsg.innerHTML +'<p class="alternativa" ><b> C) </b>' + this.state.questoes[numero].alternativaC + '</p>'
      containerMsg.innerHTML = containerMsg.innerHTML +'<p class="alternativa"><b> D) </b>' + this.state.questoes[numero].alternativaD + '</p>'
    }else{
      containerMsg.innerHTML = containerMsg.innerHTML +'<p class="resultado"> Formulario respondido</p>'
    }    
  }

  salvarQuestionarios = () => {

    const token = {
      headers: {
         Authorization: "Bearer " + localStorage.getItem('usuario-login')
      }
   }

    api.get('api/questionarios', token)

      .then(resposta => {
        if (resposta.status === 200) {
          this.setState({ questionarios: resposta.data});
          console.log(this.state.questionarios);
        }
      })
      .catch(() => {
        console.log('algo deu ruim ');
      })
  }



  componentDidMount(){
    this.salvarQuestionarios()
    document.getElementById('form').addEventListener('submit', () => {
      this.state.questao = this.state.questao + 1
      console.log(this.state.questao);
    } )
  }
  
  render() {
    return ( 
      <>

          <header className='header-Home'>
              <nav className='container-header-home'>
                  <Link to ="/"> <img className='logo-header' src={logo} alt="Logo" /> </Link> 
                  
                  <img className='img-menu' onClick={() => {
                    var menu = document.getElementById("nav-bar-responsivo");
                    if (menu.style.display === "flex") {
                        menu.style.display = "none"
                    } else{
                        menu.style.display = "flex"
                    }
                  }} src={Bar} alt="botão menu" />
  
                  <div id='nav-bar'>
                      <a className='laranja titulo-home' href="#">Como funciona?</a>
                      <a className='vinho titulo-home' href="#">Sobre nós</a>
                      <Link to="/meuschats" className='ciano titulo-home'>Chats</Link>
                  </div>
  
                  <div id='nav-bar-responsivo'>
                      <a className='laranja titulo-home' href="#">Como funciona?</a>
                      <a className='vinho titulo-home' href="#">Sobre nós</a>
                      <Link to="/meuschats" className='ciano titulo-home'>Chats</Link>
                  </div> 
  
              </nav>
          </header>
        <div className="container-questionarios">
          {
            
            this.state.questionarios.map((q) => {
              return(
                <button onClick={() => {
                  this.ListaQuestoesQuestionario(q)
                  this.state.questao = 0;
                  var containerMsg = document.getElementById('mensagens');
                  containerMsg.innerHTML = '';
                 
                  containerMsg.innerHTML = containerMsg.innerHTML +'<p class="titulo-msg">' + 'Iniciando o questionario: ' + q.materia + ' - ' + q.assunto + '</p>'
                
                }}  className='btn-questionario'>{q.materia} - {q.assunto}</button>
              )
            })
          }
        </div>

        <div className="chat">
          <div id="mensagens" >
            <p className='titulo-msg'>Escolha um questionario acima</p>
          </div>
          <form id='form' onSubmit={(event) => {
              event.preventDefault();
              var msg = document.getElementById('msg');
              var containerMsg = document.getElementById('mensagens');

              containerMsg.innerHTML = containerMsg.innerHTML +' <div class="direita-chat"> <p class="msg-enviada">' + msg.value + '</p> </div>'
              
              this.mostrarquest()
              msg.value = ""
            }} className="input-mensagem">
            <input id='msg' type="text" />
            <button className='btn-chat' >Enviar</button>
          </form>
        </div>


      
        
        
      </>
    );
  }
}
//ideia fixar o numero de questões assim teriamos um fluxo construido alterando apenas os enunciados e questoes
