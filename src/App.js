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
          <div>${Number(coin.price_usd).toFixed(2)}</div>
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
    searchKey: ''
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

  searchEventHandler = (e) => {
    this.setState({ searchKey: e.target.value })
  }

  searchResult = (searchKeyword) => { // search coins that includes the search key word		
    return this.state.coins.filter(coin => coin.name.toLowerCase().includes(searchKeyword.toLowerCase()));

  }

  componentDidUpdate() {
    console.log(this.searchResult(this.state.searchKey));
  }

  render() {
    const coins = this.state.coins;
    let key = this.state.searchKey;
    const filterCoins = () => {
      console.log("key coming?", key);
      let filterdcoins = this.searchResult(key).map(coin => {
        console.log("filtered coin", coin)
        return <div key={coin.id} className="coin">
          <div>{coin.rank}</div>
          <div>{coin.name}</div>
          <div>${Number(coin.price_usd).toFixed(7)}</div>
          <div>{coin.symbol}</div>
        </div>
      })
      return filterdcoins;
    }

    const displayResult = (key) ? <div>{filterCoins()}</div> : <Coins coins={coins} />;
    //console.log(coins);
    // console.log (coins.length);

    console.log('Loging from render method');
    return (
      <div className="App">
        <h1 id='heading-text'>Cryptocurrency can change your life . . .</h1>
        <div className="search-input-div">
          <input onChange={this.searchEventHandler} value={this.state.searchKey} className="search-input" type="text" placeholder="search . . ." />
        </div>
        <div className="coins">
        </div>
        {displayResult}
      </div>
    );
  }
}

export default App;