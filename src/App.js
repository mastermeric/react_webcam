import React from 'react';
import './App.css';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlaying : false ,
      hasDOMError : false
    };
  }

  componentDidCatch(error, info) {    
    this.setState({ hasDOMError: true });
    alert("BEKLENMEYEN HATA OLUŞTU - 1");
   }

   
  render(){    
  //const [isPlaying, setPlayingFlag] = useState(false);
  const HEIGHT = 500;
  const WIDTH = 500;

  if(this.state.hasDOMError) 
  {
    alert("BEKLENMEYEN HATA OLUŞTU - 2");
  }


  const startVideo = () => {
    try {      
      //setPlayingFlag(true);
      this.setState({isPlaying: true});
      navigator.getUserMedia(
        {
          video: true,
        },
        (stream) => {
          let video = document.getElementsByClassName('app_videoFeed')[0];
          if (video) {
            video.srcObject = stream;
          }
        },
        (err) => alert("Anlık bir Sorun Oluştu. Video meşgul olabilir."+"\n\n\n"+err)
      );
    } catch (error) {
      alert("ERROR at startVideo=> " + error)
    }
  };

  const stopVideo = () => {
    try {

      if(this.state.hasDOMError) 
      {
        alert("DOM ERROR !");
      }
  
      
      //setPlayingFlag(false);
      this.setState({isPlaying: false});
      let video = document.getElementsByClassName('app_videoFeed')[0];
      video.srcObject.getTracks()[0].stop();
    } catch (error) {
      alert(error);
    }
  };

  
  return (
    <div className="app">
      <div className='app_container'>
        <video
          height={HEIGHT}
          width={WIDTH}
          muted
          autoPlay
          className="app_videoFeed">
        </video>
      </div>
      <div className='app_input'>
        {this.state.isPlaying ? (<button onClick={stopVideo}>STOP</button>) :
          (<button onClick={startVideo}>START</button>)
        }
      </div>
    </div>
  );
  }
}


export default App;
