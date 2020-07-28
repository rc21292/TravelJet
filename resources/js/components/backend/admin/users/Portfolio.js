import React from 'react';
class Portfolio extends React.Component {
  constructor() {
    super();
    this.state = {
      user:{},
      portfolioData : [],
    };
  }


  componentDidMount(){
  let stateqq = localStorage["appState"];
    if (stateqq) {
      let AppState = JSON.parse(stateqq);
       this.setState({user:AppState.user,name:AppState.user.name,email:AppState.user.email,phone:AppState.user.phone});
      axios.get('/api/users/getProfilePortfolio/'+AppState.user.id)
      .then(response=>{
        this.setState({portfolioData:response.data});
      });
    }  
  }

  render() {
      return (
        <div className="row">
        {  
          this.state.portfolioData.map((portfolio, idx) => {  
          return <div className="col-md-4 p-2" key={idx}>
            <a className="  gallery__item" href={portfolio.id} target="_blank">
              <img width="400" className="gallery__img" src={'/uploads/users/portfolios/'+this.state.user.id+'/'+portfolio.image} />
            </a> 
          </div>
          })
        }
      </div>
      );
  }
}

export default Portfolio