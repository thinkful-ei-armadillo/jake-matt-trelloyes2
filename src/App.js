import React, { Component } from 'react';
import List from './List'
import './App.css';
import STORE from './STORE'

class App extends Component {
  static defaultProps = {
    store: {
      lists: [],
      allCards: {},
    }
  };

  state = {
    store: STORE
  }


  handleDelete = (cardId) => {
    const { lists, allCards} = this.state.store;
    const newList = lists.map(list => { list.cardIds = list.cardIds.filter(id => id !== cardId);
      console.log(list.cardIds, list.id);
    return list;
  });

  delete allCards[cardId];

  this.setState({
    store: {
      lists: newList,
      allCards
    }
  })
};

  render() {
    const {store}=this.state
    return (
      <main className='App'>
        <header className='App-header'>
          <h1>Trelloyes!</h1>
        </header>
        <div className='App-list'>
          {store.lists.map(list => (
            <List
              id={list.id}
              key={list.id}
              header={list.header}
              cards={list.cardIds.map(id => store.allCards[id])}
              handleItemDelete= {this.handleDelete}
            />
          ))}
        </div>
      </main>
    );
  }
}

export default App;
