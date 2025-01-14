import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import ParticlesBg from 'particles-bg'
import Clarifai from 'clarifai';

//Behövs så att Clarifai apn fungerar som den ska
const app = new Clarifai.app({
apiKey: '73819cb0c7e640e8b82e30c4ecaf05d3'
});

class App extends Component {
constructor() {
    super();
    this.state = {
      input: ' ', 
      imageUrl: ''
      box: {},
    }
  }

  calculateFaceLocation = (data) => {
  //vi behöver printa ut bounding_box variabeln
const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box
const image = document.getElementById('inputimage');
const width = Number(image.width);
const height = Number(image.height);
return {
  leftCol: clarifaiFace.left_col * width,
  topRow: clarifaiFace.top_row * height,
  rightCol: width - (clarifaiFace.right_col * width),
  bottomRow: height - (clarifaiFace.bottom_row * height)
  }
}

displayFaceBox = (box) => {
  this.setState({box: box});
}

//Knappar som använts för att skicka in en bild och den ska läsas av
onInputChange = (event) => {
 this.setState({input: event.target.value});
  }

onButtonSubmit = () => {
this.setState({imageUrl: this.state.input});
  app.models
   //Läser specifikt av andras ansikten i en bild
  .predict(
    Clarifai.FACE_DETECT_MODEL,
    this.state.input)
     .then(response => this.displayFaceBox(this.calculateFaceLocation(response)));
    .catch(err => console.log(err));
}

  render() {
  return (
    <div className="App">
        <div>...</div>
        <ParticlesBg className='particles' type="circle" bg={true} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm 
        onInputChange={this.onInputChange}
        onButtonSubmit={this.onButtonSubmit} 
        />
        <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
    </div>
  );
  }
}
export default App;

