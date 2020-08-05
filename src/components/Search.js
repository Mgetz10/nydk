import React from 'react';
import { sameObj } from '../helpers';
class Search extends React.Component {
  state = {
    profiles: {},
    activeFilter: 'Name'
  };

  componentDidUpdate(prevProps) {
    if (!sameObj(this.props.profiles, prevProps.profiles))
      this.setState({
        profiles: Object.assign({}, this.props.profiles)
      });
  }

  handleChange = event => {
    const query = event.currentTarget.value.toUpperCase();
    const profiles = this.props.profiles;
    const activeFilter = this.state.activeFilter;
    const filteredProfiles = Object.keys(profiles)
      .filter(
        key =>
          profiles[key][activeFilter] &&
          profiles[key][activeFilter].toUpperCase().includes(query)
      )
      .reduce((obj, key) => {
        obj[key] = Object.assign({}, profiles[key]);
        return obj;
      }, {});
    this.setState({
      profiles: filteredProfiles
    });
  };
  handleFilter = event => {
    const activeFilter = event.currentTarget.innerText;
    const profiles = this.props.profiles;
    const sortedProfiles = {};
    Object.keys(profiles)
      .filter(key => profiles[key][activeFilter])
      .sort((a, b) => {
        const item1 = profiles[a][activeFilter].toUpperCase();
        const item2 = profiles[b][activeFilter].toUpperCase();
        return item1 > item2 ? 1 : -1;
      })
      .concat(
        Object.keys(profiles)
          .filter(key => !profiles[key][activeFilter])
          .sort()
      )
      .forEach(key => {
        sortedProfiles[key] = profiles[key];
      });
    this.setState({
      activeFilter,
      profiles: sortedProfiles
    });
  };

  render() {
    return (
      <div className="search">
        <input type="text" name="filter" onChange={this.handleChange} />
        {this.props.categories &&
          this.props.categories.map(key => (
            <button
              className={
                key === this.state.activeFilter ? 'active filters' : 'filters'
              }
              onClick={this.handleFilter}
              key={key}
            >
              {key}
            </button>
          ))}
        {Object.keys(this.state.profiles).map(key => (
          <p className="name" key={key}>
            {key}{' '}
            {this.state.activeFilter !== 'Name'
              ? ' - ' +
                (this.state.profiles[key][this.state.activeFilter] === undefined
                  ? 'n/a'
                  : this.state.profiles[key][this.state.activeFilter])
              : ''}
          </p>
        ))}
      </div>
    );
  }
}
export default Search;
