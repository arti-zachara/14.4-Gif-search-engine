// API variables:
var GIPHY_API_URL = "https://api.giphy.com";
var GIPHY_PUB_KEY = "LJvJkg6M86Lh1D68H5qJg7JvXrjsajTa";

App = React.createClass({
  // initial state
  getInitialState() {
    return {
      loading: false,
      searchingText: "",
      gif: {}
    };
  },
  // handle search
  handleSearch: function(searchingText) {
    // start loading - loading state
    this.setState({
      loading: true
    });
    this.getGif(
      searchingText,
      function(gif) {
        // dziwi mnie takie wywołanie
        this.setState({
          // stop loading - loading state
          loading: false,
          gif: gif,
          searchingText: searchingText
        });
      }.bind(this)
    );
  },
  // get gif with parameter: typed text and a callback function that will return gif
  getGif: function(searchingText, callback) {
    var url =
      GIPHY_API_URL +
      "/v1/gifs/random?api_key=" +
      GIPHY_PUB_KEY +
      "&tag=" +
      searchingText;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.onload = function() {
      if (xhr.status === 200) {
        var data = JSON.parse(xhr.responseText).data;
        var gif = {
          url: data.fixed_width_downsampled_url,
          sourceUrl: data.url
        };
        // callback function with gif parameters
        callback(gif);
      }
    };
    xhr.send();
  },

  render: function() {
    var styles = {
      margin: "0 auto",
      textAlign: "center",
      width: "90%"
    };

    return (
      <div style={styles}>
        <h1>Wyszukiwarka GIFow!</h1>
        <p>
          Znajdź gifa na <a href="http://giphy.com">giphy</a>. Naciskaj enter,
          aby pobrać kolejne gify.
        </p>
        <Search onSearch={this.handleSearch} />
        <Gif
          loading={this.state.loading}
          url={this.state.gif.url}
          sourceUrl={this.state.gif.sourceUrl}
        />
      </div>
    );
  }
});
