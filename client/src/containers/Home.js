import React, { Component }   from 'react';
import { Switch, Route }      from 'react-router-dom'
import About                  from '../Components/Home/About';
import Contact                from '../Components/Home/Contact';
import Footer                 from '../Components/Home/Footer';
import Header                 from '../Components/Home/Header';
import Jumbotron              from '../Components/Home/Jumbotron';
import Portfolio              from '../Components/Home/Portfolio';
// import Market                 from '../Components/Home/Market';
import Testimonials           from '../Components/Home/Testimonials';
import ChatWidget             from '../Components/Home/Widget';

class Home extends Component {
    constructor(props){
      super(props);
      this.state = {
        portfolioData: {},
        profile: {}
      }
    }

    
  componentWillMount() {
    //this function sets the user information if they are logged in
    const { userProfile, getProfile } = this.props.auth;
    getProfile((err, profile) => {
      this.setState({ profile });
    });
  }
    

  //render each component of the home page
  render() {
    return (
      <div>
        <div className="App">      
          <Jumbotron data={this.props.data.main} />
          <About data={this.props.data.main} />
          {/* <Market data={this.props.data.market} /> */}
          <Portfolio data={this.props.data.portfolio} />
          <Testimonials  data={this.props.data.testimonials} />
          <Contact data={this.props.data.main} />
        </div>
        <ChatWidget />
      </div>
    );
  }
}

export default Home;