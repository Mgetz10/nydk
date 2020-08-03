import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Names from './Names';
import Search from './Search';
import '../css/App.css';

class App extends React.Component {
  state = {
    profiles: {}
  };
  categories;
  componentDidMount() {
    fetch(
      'https://spreadsheets.google.com/feeds/cells/1UrZT2ECoh93_zULpxcDjGPFGDkVXr1fj7qZzE7okZg4/1/public/full?alt=json'
    )
      .then(blob => blob.json())
      .then(data => {
        const cells = data.feed.entry
          .map(cell => cell.gs$cell)
          .map(cell => ({
            content: cell.$t,
            row: cell.row,
            col: cell.col
          }));

        // const names = getColOrRow(cells, 'col', '1', '1');

        const infoCategories = getColOrRow(cells, 'row', '1').reduce(
          (obj, { content, row, col }) => {
            obj[content] = getColOrRow(cells, 'col', col, '1');
            return obj;
          },
          {}
        );
        const names = infoCategories[Object.keys(infoCategories)[0]];
        const profiles = names.reduce((obj, nameCell) => {
          const name = nameCell.content;
          const row = nameCell.row;
          obj[name] = Object.keys(infoCategories).reduce((infoObj, cat) => {
            infoObj[cat] = infoCategories[cat].find(item => item.row === row);
            if (infoObj[cat]) infoObj[cat] = infoObj[cat].content;
            return infoObj;
          }, {});
          return obj;
        }, {});

        const categories = Object.keys(infoCategories);
        this.categories = categories;

        this.setState({
          profiles
        });

        function getColOrRow(cells, type, number, excludeNumber = '0') {
          const oppositeType = type === 'col' ? 'row' : 'col';
          return cells.filter(
            cell =>
              cell[type] === number && cell[oppositeType] !== excludeNumber
          );
        }
      });
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route
              exact
              path="/"
              render={() => <Names names={this.state.profiles}></Names>}
            />
            <Route
              path="/search"
              render={() => (
                <Search
                  profiles={this.state.profiles}
                  categories={this.categories}
                ></Search>
              )}
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
