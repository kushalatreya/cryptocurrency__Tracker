import React, { Component } from 'react';
import './App.css';

//Mount, Updating , unMounting phases
// Some component life cycles are depricated or change

const Coins = props => {
  const coins = props.coins != null
    ? props.coins.map(coin => {
      return (
        <div key={coin.id} className="coin">
          <div>{coin.rank}</div>
          <div>{coin.name}</div>
          <div>{Number(coin.price_usd).toFixed(2)}</div>
          
          <div>{coin.symbol}</div>
        </div>
      );
    })
    : <div> <h1>Loading.....</h1></div>;

  return coins;
};


class App extends Component {
  state = {
    coins: null,
  };
  componentWillMount() {
    console.log('log will mount');
  }
  componentDidMount() {
    const url = 'https://api.coinmarketcap.com/v1/ticker/?limit=200';
    fetch(url).then(response => response.json()).then(coins => {
      this.setState({
        coins: coins,
      });
    });
    console.log('Component did mount log');
  }

  render() {
    const coins = this.state.coins;
    console.log(coins);
    // console.log (coins.length);

    console.log('Loging from render method');
    return (
      <div className="App">
        <h1 id = 'heading-text'>Cryptocurrency can change your life . . .</h1>
        <div className="coins">
          <Coins coins={coins} />;

        </div>

      </div>
    );
  }
}

export default App;