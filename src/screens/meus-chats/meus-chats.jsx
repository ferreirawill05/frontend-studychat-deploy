import React from "react";
import css from "./meus-chats.css"
import api from '../../services/api'
import Logo from '../../assets/logo.png'
import LinhaEsquerda from '../../assets/linha-esquerda.png'
import LinhaDireita from '../../assets/linha-direita.png'
import { Component } from 'react';
import { Link } from 'react-router-dom';
import { parseJWT, usuarioAutenticacao } from '../../services/auth';
import { render } from "@testing-library/react";


export default class MeusChats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      materia: '',
      assunto: '',
      idSerie: 0,
      enunciado: '',
      alternativaA: '',
      alternativaB: '',
      alternativaC: '',
      alternativaD: '',
      alternativaCorreta: '',
      series: [],
      questionarios: [],
      idQuestionario: 0,
      isLoading: false
    }
  };

  nivelAcesso = () => {
    if (parseJWT().TipoUsuario !== "1" ) {
      console.log("este usuario n é professor");
    }
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

  salvarQuestionarios = (event) => {

    api.get('api/questionarios/todos')

      .then(resposta => {
        if (resposta.status === 200) {
          this.setState({ questionarios: resposta.data});
        }
      })
      .catch(() => {
        console.log('algo deu ruim ');
      })
  }

  cadastrarFormulario = (e) => {
    api.post('/api/questionarios', {
      materia: this.state.materia,
      idSerie: this.state.idSerie,
      assunto: this.state.assunto,
    })
  }

  cadastrarquestao = (e) => {
    api.post('/api/questoes', {
      idQuestionario: this.state.idQuestionario,
      enunciado: this.state.enunciado,
      alternativaA: this.state.alternativaA,
      alternativaB: this.state.alternativaB,
      alternativaC: this.state.alternativaC,
      alternativaD: this.state.alternativaD,
      alternativaCorreta: this.state.alternativaCorreta,
    })
  }
 
  atualizaStateCampo = (campo) => {
    this.setState({ [campo.target.name]: campo.target.value })
    console.log([campo.target.name] + ' : ' + campo.target.value)
  }

  componentDidMount(){
    this.listarSerie()
    this.salvarQuestionarios()
    this.nivelAcesso()
  }

  render() {
    if (usuarioAutenticacao()) {
      
    
      if (parseJWT().TipoUsuario === "1") {
        
      
      return (
        <>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-iYQeCzEYFbKjA/T2uDLTpkwGzCiq6soy8tYaI1GyVh/UjpbCx/TYkiZhlZB6+fzT" crossorigin="anonymous"></link>
          <header className="header-meusChats">
            <Link to="/home"> <img src={Logo} alt="Logo" className="logo-header" /> </Link> 
          </header>

          <main className="main-meusChats">
              <section className="container-titulo">
                  <img src={LinhaEsquerda} alt="linha Esquerda decorativa" className="linha" />
                  <h1 className="titulo">Meus Chats</h1>
                  <img src={LinhaDireita} alt="Linha Direita decorativa" className="linha" />
              </section>

              <section className="centralizar">
                <h1 className="tit">Cadastre um Questionario</h1>
                <form className="mb-3 questionario centralizar" onSubmit={this.cadastrarFormulario}>
                    <input className="form-control" type="text" placeholder="Materia"
                    name="materia"
                    value={this.state.materia}
                    onChange={this.atualizaStateCampo} />

                    <select className="form-select" onChange={this.atualizaStateCampo} name="idSerie" required>
                        <option value="0">Selecione uma sala</option>
                        {this.state.series.map(s => {
                            return (
                                <option value={s.idSerie}>{s.sala}</option>
                            )
                        })}
                    </select>

                    <input className="form-control" type="text" placeholder="Assunto"
                    name="assunto"
                    value={this.state.assunto}
                    onChange={this.atualizaStateCampo} />

                    <button className="btn btn-estilo btn-primary" type="submit">Cadastrar</button>
                </form>

                <h1 className="tit">Cadastre Questões</h1>
                <form className="mb-3 questionario centralizar" onSubmit={this.cadastrarquestao}>
                    <input className="form-control" type="text" placeholder="Enunciado"
                    name="enunciado"
                    value={this.state.enunciado}
                    onChange={this.atualizaStateCampo} />

                    <input className="form-control" type="text" placeholder="Alternativa A"
                    name="alternativaA"
                    value={this.state.alternativaA}
                    onChange={this.atualizaStateCampo} />

                    <input className="form-control" type="text" placeholder="Alternativa B"
                    name="alternativaB"
                    value={this.state.alternativaB}
                    onChange={this.atualizaStateCampo} />

                    <input className="form-control" type="text" placeholder="Alternativa C"
                    name="alternativaC"
                    value={this.state.alternativaC}
                    onChange={this.atualizaStateCampo} />

                    <input className="form-control" type="text" placeholder="Alternativa D"
                    name="alternativaD"
                    value={this.state.alternativaD}
                    onChange={this.atualizaStateCampo} />

                    <select className="form-select" onChange={this.atualizaStateCampo} name="alternativaCorreta" required>
                        <option value="0">Selecione a alternativa correta para a questão</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="D">D</option>
                    </select>

                    <select className="form-select"  onChange={this.atualizaStateCampo}  name="idQuestionario" required>
                        <option value="0">Selecione o questionario </option>
                        {this.state.questionarios.map(q => {
                            return (
                                <option value={q.idQuestionario}>{q.assunto}</option>
                            )
                        })}
                    </select>

                    

                    <button className="btn btn-estilo btn-primary" type="submit">Cadastrar</button>
                </form>

              </section>
          </main>

        </>
      );
      }
      else{
        return(
          window.location.href = '/home'
        );
      }
    }
    else{
      return(
        window.location.href = '/'
      );
    }
  }
}
