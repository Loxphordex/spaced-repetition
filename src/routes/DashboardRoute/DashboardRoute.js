import React, { Component } from 'react'
import LanguageService from '../../services/language-service'
import UserContext from '../../contexts/UserContext';
import './DashboardRoute.css'

class DashboardRoute extends Component {
  state = {
    language: {},
    words: [],
  }

  static contextType = UserContext;

  componentDidMount() {
    LanguageService.getAll()
      .then(res => {
        this.setState({
            language: res.language,
            words: res.words
          });
      }).catch(e => {
        if (e.error === 'Unauthorized request') {
            this.context.processLogout();
            this.props.history.push('/login');
        }
      });

    this.props.setOffLanding()
  }

  render() {
    console.log(this.props)
    return (
      <section className='dashboard-area'>
        <h2>{'Total correct answers: ' + this.state.language.total_score}</h2>

        <a className='start-practicing' href='/learn'>Start Practicing</a>

        <h3>Words to practice</h3>

        <ul className='practice-list'>
          {this.state.words.length && this.state.words.map(word => {
            return(
              <li key={word.id} className="dashboard-word">
                <div className='dw-container'>
                  <h4>{word.original}</h4>
                </div>
                <div className='score-container'>
                  <div className='correct'>{word.correct_count}</div>
                  <div className='incorrect'>{word.incorrect_count}</div>
                </div>
              </li>
            )
          })}
        </ul>
      </section>
    );
  }
}

export default DashboardRoute
