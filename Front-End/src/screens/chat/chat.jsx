import React from "react";
import logo from '../../assets/logo.png'
import icon from '../../assets/bot-icone.png'
import butao from '../../assets/aviao-icone.png'
import $ from "jquery";
import css from './chat_style.css'
import api from '../../services/api'
import { Component } from 'react';
import { Link } from 'react-router-dom'
import { render } from "react-dom";

export default class Chat extends Component{

render()
{
    return(
    <div className="body-chat">
    <div className="header">
    <img className="logo" src={logo}  alt="logo" />
    </div>

    <div class="chat_window">
      <div class="top_menu">
      <div class="title">Chat</div>
    </div>

    <ul class="messages"></ul>
      <div class="bottom_wrapper clearfix">
      <div class="message_input_wrapper">
      <input class="message_input" placeholder="Escreva sua resposta aqui..." />
    </div>

    <div class="send_message">
      <div class="icon"></div>
      <div class="text">Enviar</div>
      </div>
    </div>

    </div>
    
    <div class="message_template">
      <li class="message">
      <div class="avatar"></div>
      <div class="text_wrapper">
      <div class="text"></div>
    </div>

    </li>
      <button className="botao-sair" >DESISTIR</button>
    </div>
    </div>
    )
}

function () {
    var Message;
    Message = function (arg) {
        this.text = arg.text;
        this.message_side = arg.message_side;
        this.draw = function (_this) {
            return function () {
                var $message;
                $message = $($('.message_template').clone().html());
              $message.addClass(_this.message_side).find('.text').html(_this.text);
              $('.messages').append($message);
              return setTimeout(function () {
                  return $message.addClass('appeared');
              }, 0); 
          };
      }(this);
      return this;
  };
  $(function () {
      var getMessageText, message_side, sendMessage;
      message_side = 'right';
      getMessageText = function () {
          var $message_input;
          $message_input = $('.message_input');
          return $message_input.val();
      };
      sendMessage = function (text) {
          var $messages, message;
          if (text.trim() === '') {
              return;
          }
          $('.message_input').val('');
          $messages = $('.messages');
          message_side = message_side === 'left' ? 'right' : 'left';
          message = new Message({
              text: text,
              message_side: message_side 
          });
          message.draw();
          return $messages.animate({ scrollTop: $messages.prop('scrollHeight') }, 300);
      };
      $('.send_message').click(function (e) {
          return sendMessage(getMessageText());
      });
      $('.message_input').keyup(function (e) {
          if (e.which === 13) {
              return sendMessage(getMessageText());
          }
      });
      sendMessage('Hello Philip! :)');
      setTimeout(function () {
          return sendMessage('Hi Sandy! How are you?');
      }, 1000);
      return setTimeout(function () {
          return sendMessage('I\'m fine, thank you!');
      }, 2000);
  });
}

}



















