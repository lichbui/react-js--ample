import React from 'react';
import logo from './logo.svg';
import './App.css';
import AddFrom from './components/addForm'
import List from './components/list'

class App extends React.Component {

  constructor (props) {
    super(props);

    this.state = {
      data: [],
      state: 0, // 0 : list , 1: add,
      currentEdit: -1,
    }
  }

  onClickItem = (index) => () => {
    this.setState({
      currentEdit: index,
      state: 1,
    })
  }

  saveData = (value) => {
    let { data, currentEdit} = this.state

    if (currentEdit >= 0) {
      data[currentEdit] = value
      this.setState({
        data,
        state: 0,
        currentEdit: -1
      })
    } else {
      data.push(value)
      this.setState({
        data,
        state: 0,
        currentEdit: -1
      })
    }
  }

  render() {
    const {state, data, currentEdit} = this.state
    return (
      <div className="App">
          <h1>Todo App</h1>
          <div>
            {state ? <AddFrom saveData={this.saveData} />: 
            (<>
              <button onClick={() => {
                this.setState({
                  state: 1,
                })
              }}>Add new</button>
              <List data={data} onClickItem={this.onClickItem}/>
            </>)
            }
          </div>
      </div>
    );
  }
}

export default App;
