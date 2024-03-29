import React from 'react'
import logo from '../../assets/logo.png'
import astronauta from '../../assets/astronauta-home.png'
import './home_style.css'
import et from  '../../assets/et.png'
import menino from '../../assets/menino-home.png'
import dev1 from '../../assets/dev1.png'
import dev2 from '../../assets/dev2.png'
import dev3 from '../../assets/dev3.png'
import Bar from '../../assets/bars.svg'

import { parseJWT, usuarioAutenticacao } from '../../services/auth';
import Footer from '../../components/footer'
import api from '../../services/api'
import { Component } from 'react';
import { Link } from 'react-router-dom'

export default class Cadastro extends Component {

  render() {
    if (usuarioAutenticacao() ) {
      return (
        <>
          <header className='header-Home'>
              <nav className='container-header-home'>
                  <img className='logo-header' src={logo} alt="Logo" />
                  
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
  
          <main className='main-home'>
              <section className="container-banner-home">
              <span className="titulo-banner-home">BEM VINDO A NOSSA PLATAFORMA</span>
              <span className="titulo-banner-home">PARA ACESSAR SEUS CHATS</span>
              <Link to={ () => {
                console.log(parseJWT());
                if (parseJWT().TipoUsuario === "1") {
                  return '/meuschats'
                }
                else{
                  return '/chat'
                }
              }} className='btn-banner-home'>CLIQUE AQUI</Link>
              </section>
  
              <section className="como_funciona">
                  <h2 className="titulo-como_funciona">Como funciona?</h2>
                  <div className="container-como_funciona">
                      <p className="texto-como_funciona">Dentro da plataforma é possível que o professor crie tarefas e as disponibilize para os estudantes, que podem remotamente fazer o acesso desta atividade e executá-las</p>
                      <img className="astronauta" src={astronauta} alt="Astronauta" />
                  </div>
              </section>
  
              <section className="nuvem-azul">
                  <img className='et' src={et} alt="et" />
                  <p className="texto-nuvem-azul">De forma interativa, o chat funciona como uma conversa na qual é enviado a pergunta e as alternativas de resposta para os alunos. Ao escolherem uma das alternativas, o software analisa os resultados de forma ágil, e retorna sua assertividade.</p>
              </section>
   
              <section className="nuvem-amarela">
                <div className="box-nuvem-amarela">
                  <h2 className="sobre"> Sobre nós</h2>
                  <p className="texto-sobre">O StudyChat SESI-SP 113 foi desenvolvido por estudantes do 3º ano do Ensino Médio pelo método Scrum, através de um projeto iniciado nas aulas da disciplina de robótica</p>
                </div>
                <img src={menino} alt="" className="menino-nuvem-amarela" />
              </section>
  
              <section className="desenvolvedores">
                <h2 className="titulo-desenvolvedores"> Conheça nossos desenvolvedores</h2>
                <div className="container-desenvolvedores">
                  <img src={dev1} alt="Desenvolvedor" className="dev dev1" />
                  <img src={dev2} alt="Desenvolvedor" className="dev dev2" />
                  <img src={dev3} alt="Desenvolvedor" className="dev dev1" />
                </div>
              </section>
          </main>
          
          <Footer/>
        </>
      );
    }
    else{
      return(
        window.location.href = '/'
      );
    }
    
  }
}