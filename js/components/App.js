// API variables:
const GIPHY_API_URL = "https://api.giphy.com";
const GIPHY_PUB_KEY = "LJvJkg6M86Lh1D68H5qJg7JvXrjsajTa";

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
    this.getGif(searchingText)
      .then(response =>
        this.setState({
          // stop loading - loading state
          loading: false,
          gif: response,
          searchingText: searchingText
        })
      )
      .catch(error => console.error("Error has occurred", error));
  },

  // get gif with parameter: typed text and a callback function that will return gif
  getGif: function(searchingText) {
    // promise
    return new Promise(function(resolve, reject) {
      const url =
        GIPHY_API_URL +
        "/v1/gifs/random?api_key=" +
        GIPHY_PUB_KEY +
        "&tag=" +
        searchingText;
      const xhr = new XMLHttpRequest();

      xhr.onload = function() {
        if (xhr.status === 200) {
          const data = JSON.parse(xhr.responseText).data;
          const gif = {
            url: data.fixed_width_downsampled_url,
            sourceUrl: data.url
          };
          // no errors -> resolve
          resolve(gif);
        } else {
          // errors - > reject with reason
          reject(new Error(`XMLHttpRequest Error: ${this.statusText}`));
        }
      };
      xhr.open("GET", url);
      xhr.send();
    });
  },

  render: function() {
    const styles = {
      margin: "0 auto",
      textAlign: "center",
      width: "90%"
    };

    return (
      <div style={styles}>
        <h1>Simple GIF search!</h1>
        <p>
          Find your gif on <a href="http://giphy.com">giphy</a>. Press enter to
          get another gif.
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
