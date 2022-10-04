import { Component } from 'react';
import { Link } from 'react-router-dom'
import '../screens/home/home_style.css'

export default class Footer extends Component {
  
  render() {
    return (
      <>
        <footer>
            <span className="texto-footer">Copyright © 2022 - Todos os direitos reservados.</span>
        </footer>
      
      </>
    );
  }
}