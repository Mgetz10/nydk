import React from 'react';
import { sameObj } from '../helpers';
class Search extends React.Component {
  state = {
    profiles: {},
    activeFilter: 'Name'
  };

  componentDidUpdate(prevProps) {
    if (!sameObj(this.props.profiles, prevProps.profiles))
      this.setState({ profiles: Object.assign({}, this.props.profiles) });
  }

  handleChange = event => {
    const query = event.currentTarget.value;
    const profiles = this.props.profiles;
    const activeFilter = this.state.activeFilter;
    const filteredProfiles = Object.keys(profiles)
      .filter(key =>
        profiles[key][activeFilter].toUpperCase().includes(query.toUpperCase())
      )
      .reduce((obj, key) => {
        obj[key] = Object.assign({}, profiles[key]);
        return obj;
      }, {});
    this.setState({ profiles: filteredProfiles });
  };
  handleFilter = event =>
    this.setState({ activeFilter: event.currentTarget.innerText });

  render() {
    console.log(this.state.profiles);
    return (
      <div className="search">
        <input type="text" name="filter" onChange={this.handleChange} />
        {this.props.categories &&
          this.props.categories.map(key => (
            <button className="filters" onClick={this.handleFilter} key={key}>
              {key}
            </button>
          ))}
        {Object.keys(this.state.profiles).map(key => (
          <p className="name" key={key}>
            {key}
          </p>
        ))}
      </div>
    );
  }
}
export default Search;
