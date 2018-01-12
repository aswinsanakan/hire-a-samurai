var Samurais = React.createClass({
  getInitialState: function(){
    return({
      samurais: []
    });
  },
  render: function(){
    var samurais = this.state.samurais;
    samurais = samurais.map((samurai, index) => {
      console.log(samurai);
      return(
        <li key={index}>
          <span className={samurai.available}></span>
          <span className='name'>{samurai.name}</span>
          <span className='rank'>{samurai.rank}</span>
          <span className='dist'>{Math.floor(samurai.dist.calculated / 1000)} km</span>
        </li>
      );
    });
    return(
      <div id='samurai-container'>
        <form id='search' onSubmit={this.handleSubmit}>
          <label>Enter your longitude :</label>
          <input type='text' ref='lng' placeholder='longitude' required />
          <label>Enter your latitude :</label>
          <input type='text' ref='lat' placeholder='latitude' required />
          <input type='submit' value='Find samurai' />
        </form>
        <ul>{samurais}</ul>
      </div>
    );
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var lng = this.refs.lng.value;
    var lat = this.refs.lat.value;
    fetch('/api/samurais?lng=' + lng + '&lat=' + lat).then(function(data){
      return data.json();
    }).then((jsonData) => {
      this.setState({
        samurais: jsonData
      });
      console.log(jsonData);
    });
  }
});

ReactDOM.render(<Samurais />, document.getElementById('samurais'));