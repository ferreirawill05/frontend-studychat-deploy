import React from 'react'
import logo from '../../assets/logo.png'
import banner from '../../assets/banner-cadastro-fundo.png'
import img from '../../assets/undraw-cadastro.png'
import './cadastro_style.css'
import api from '../../services/api'
import { Component } from 'react';
import { Link } from 'react-router-dom'
import { parseJWT, usuarioAutenticacao } from '../../services/auth';
// import '../css/Reset.css'
// import './css/Forms.css';

export default class Cadastro extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      idSerie: 0, 
      series: [],
      nome: '',
      email: '',
      senha: '',
      materia: '',
      erroMensagem: "",
      idUsuario: 0,
      tipoUser: 0,
    };
  };

  cadastrarAluno = (event) => {
    event.preventDefault();

    this.setState({ erroMensagem: "", isLoading: true })

    api.post('/api/Estudantes', {
      nome: this.state.nome,
      idSerie: this.state.idSerie,
      idUsuarioNavigation: {
        email: this.state.email,
        senha: this.state.senha,
      }
      
    })

      .then(resposta => {
        if (resposta.status === 201) {
          this.setState({ isLoading: false });
          this.setState({ erroMensagem: "Cadastrado com sucesso" });

          this.props.history.push("/")
        }
      })
      .catch((error) => {
        this.setState({ erroMensagem: error.response.data, isLoading: false });
      })
  }

  cadastrarProfessor = (event) => {
    event.preventDefault();

    this.setState({ erroMensagem: "", isLoading: true })

    api.post('/api/Professores', {
      nome: this.state.nome,
      materia: this.state.materia,
      idUsuarioNavigation: {
        email: this.state.email,
        senha: this.state.senha,
      }
      
    })
    
      .then(resposta => {
        if (resposta.status === 201) {
          this.setState({ isLoading: false });
          this.setState({ erroMensagem: "Cadastrado com sucesso" });

          this.props.history.push("/")
        }
      })
      .catch((error) => {
        console.log(error.response.data);
        this.setState({ erroMensagem: error.response.data, isLoading: false });
      })
  }

  listarSerie = (e) => {
    api.get('/api/series')
    .then(resposta => {
      if (resposta.status === 200) {
        this.setState({ series: resposta.data});
        console.log(this.state.series);
      }
    })
    
  }


  atualizaStateCampo = (campo) => {
    this.setState({ [campo.target.name]: campo.target.value })
    console.log([campo.target.name] + ' : ' + campo.target.value)
  }

  limparCampos = () => {
    this.setState({
      nome: '',
      email: '',
      senha: '',
      materia: '',
      erroMensagem: "",
      materia: '',
      idSerie: 0, 
    })
  };

  componentDidMount(){
    this.listarSerie()
  }

  render() {
    if (!usuarioAutenticacao()) {
      return (
        <div className='box-body'>
          <div className="esquerda">
              <img className='logo' src={logo} alt= "logo"/>
            <div className="esquerda-form">

              <h1 className="h1-login">Cadastro</h1>

              <div className='imput-choose' >
              <button onClick={() => {
                this.limparCampos()
                var alunoInput = document.getElementById("aluno");
                var professorInput = document.getElementById("professor");
                var btnProfessor = document.getElementById("btn-professor");
                var btnAluno = document.getElementById("btn-aluno");

                  alunoInput.style.display = "none"
                  professorInput.style.display = "flex"

                  btnAluno.style.border = "unset"
                  btnProfessor.style.border = "solid 2px #000000"
                
              }} id='btn-professor' className='btn-choose' >Professor</button>

              <button onClick={() => {
                this.limparCampos()
                var alunoInput = document.getElementById("aluno");
                var btnAluno = document.getElementById("btn-aluno");
                var professorInput = document.getElementById("professor");
                var btnProfessor = document.getElementById("btn-professor");
                  
                  alunoInput.style.display = "flex"
                  professorInput.style.display = "none"

                  btnProfessor.style.border = "unset"
                  btnAluno.style.border = "solid 2px #000000"
          
              }} id="btn-aluno" className='btn-choose' >Aluno</button>
              </div>

              <form id='aluno' className='formulario' action="submit" onSubmit={this.cadastrarAluno}>


                <input type="text" placeholder="Nome"
                  name='nome'
                  onChange={this.atualizaStateCampo}
                  value={this.state.nome}
                />

                <select className="select-classe" onChange={this.atualizaStateCampo} name="idSerie" required>
                  <option value="0">Selecione uma sala</option>
                  {this.state.series.map(s => {
                      return (
                          <option value={s.idSerie}>{s.sala}</option>
                      )
                  })}
                </select>

                <input type="email" placeholder="Email"
                  name='email'
                  onChange={this.atualizaStateCampo}
                  value={this.state.email}
                />

                <input type="password" placeholder="Senha"
                  name='senha'
                  onChange={this.atualizaStateCampo}
                  value={this.state.senha}
                />

                <p style={{ color: 'red' }}>{this.state.erroMensagem}</p>

              <button type="submit" className="btn-form">Cadastrar</button>
              <div className="conta"> 
              <Link to="/">Já possuo conta</Link>
              </div>
              </form>

              <form id='professor' className='formulario' action="submit" onSubmit={this.cadastrarProfessor}>


                <input type="text" placeholder="Nome"
                  name='nome'
                  onChange={this.atualizaStateCampo}
                  value={this.state.nome}
                />

                <select className="select-classe" onChange={this.atualizaStateCampo} name="materia" required>
                  <option value="0">Selecione uma materia</option>
                          <option value="Matematica">Matemática</option>
                          <option value="Lingua Portuguesa">Língua Portuguesa</option>
                          <option value="Biologia">Biologia</option>
                          <option value="Quimica">Química</option>
                          <option value="Fisica">Física</option>
                          <option value="Educacao Fisica">Educação Fisica</option>
                          <option value="Ingles">Inglês</option>
                          <option value="Historia">História</option>
                          <option value="Geografia">Geografia</option>
                          <option value="Sociologia">Sociologia</option>
                          <option value="Filosofia">Filosofia</option>
                          <option value="Arte">Arte</option>
                          <option value="Programacao e Robotica">Programação e Robótica</option>
                          <option value="Eixo">Eixo</option>
                </select>

                <input type="email" placeholder="Email"
                  name='email'
                  onChange={this.atualizaStateCampo}
                  value={this.state.email}
                />

                <input type="password" placeholder="Senha"
                  name='senha'
                  onChange={this.atualizaStateCampo}
                  value={this.state.senha}
                />

                <p style={{ color: 'red' }}>{this.state.erroMensagem}</p>

              <button type="submit" className="btn-form">Cadastrar</button>
              <div className="conta"> 
              <Link to="/">Já possuo conta</Link>
              </div>
              </form>
            </div>
            
          </div>
  
          <div className="direita">
              <img className='logo-reg' src={logo} alt= "logo"/>
              <img className='banner-direita' src={img} alt="undraw-cadastro"/>
          </div>
        </div>
      );
    }
    else{
      return(
        window.location.href = '/home'
      );
    }
    
  }
}