Search = React.createClass({
  // initial state
  getInitialState() {
    return {
      searchingText: ""
    };
  },

  // handle events changing the input value
  handleChange: function(event) {
    var searchingText = event.target.value;
    this.setState({ searchingText: searchingText });

    if (searchingText.length > 2) {
      this.props.onSearch(searchingText);
    }
  },
  // handle event of presing enter in input field
  handleKeyUp: function(event) {
    if (event.keyCode === 13) {
      this.props.onSearch(this.state.searchingText);
    }
  },

  render: function() {
    var styles = { fontSize: "1.5em", width: "90%", maxWidth: "350px" };

    return (
      <input
        type="text"
        // send to parent
        onChange={this.handleChange}
        onKeyUp={this.handleKeyUp}
        placeholder="Enter your search phrase here"
        style={styles}
        value={this.state.searchTerm} //searchingText?
      />
    );
  }
});
