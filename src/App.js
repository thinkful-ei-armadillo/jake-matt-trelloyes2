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

 newRandomCard = () => {
  const id = Math.random().toString(36).substring(2, 4)
    + Math.random().toString(36).substring(2, 4);
  return {
    id,
    title: `Random Card ${id}`,
    content: 'lorem ipsum',
  }
}

handleRandom = (id) =>{
  const newCard = this.newRandomCard;
  const newList = this.state.store.map(i =>{
    if(i.id === id)
      i.cardIds.push(newCard.id)
    return i;
  })
  this.setState({
    store:{
      lists: newList,
      // allCards: {...this.state.store.allCards, newCard.id}
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
              handleRandom = {this.handleRandom}
            />
          ))}
        </div>
      </main>
    );
  }
}

export default App;
