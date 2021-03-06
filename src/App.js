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

  omit = (obj, keyToOmit) => {
    return Object.entries(obj).reduce(
      (newObj, [key, value]) =>
          key === keyToOmit ? newObj : {...newObj, [key]: value},
      {}
    );
  }


  handleDelete = (cardId) => {
    const { lists, allCards} = this.state.store;
    const newList = lists.map(list => { list.cardIds = list.cardIds.filter(id => id !== cardId);
      console.log(list.cardIds, list.id);
    return list;
  });

  const newCardList = this.omit(this.state.store.allCards, cardId);

  this.setState({
    store: {
      lists: newList,
      allCards: newCardList
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
  const { lists, allCards} = this.state.store;
  const newCard = this.newRandomCard();
  const newList = lists.map(i =>{
    if(i.id === id){
      i.cardIds.push(newCard.id);
      allCards[newCard.id] = newCard;
    }
    return i;
  });
  
  this.setState({
    store:{
      lists: newList,
      allCards: allCards
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
