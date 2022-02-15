import React from "react";
import "./App.css";
import Particles from "react-tsparticles";
import Navigation from "./container/Navigation/Navigation";
import Signin from "./container/Signin/Signin";
import Register from "./container/Register/Register";
import Logo from "./container/Logo/Logo";
import Rank from "./container/Rank/Rank";
import ImageLinkForm from "./container/ImageLinkForm/ImageLinkForm";
import FaceRecognition from "./container/FaceRecognition/FaceRecognition";

const particlesOptions = {
  fps_limit: 60,
  interactivity: {
    detect_on: "canvas",
    events: {
      onclick: { enable: false, mode: "push" },
      onhover: {
        enable: false,
        mode: "attract",
        parallax: { enable: false, force: 60, smooth: 10 },
      },
      resize: true,
    },
    modes: {
      push: { quantity: 4 },
      attract: { distance: 200, duration: 0.4, factor: 5 },
    },
  },
  particles: {
    color: { value: "#ffffff" },
    line_linked: {
      color: "#ffffff",
      distance: 150,
      enable: true,
      opacity: 0.4,
      width: 1,
    },
    move: {
      attract: { enable: false, rotateX: 600, rotateY: 1200 },
      bounce: false,
      direction: "none",
      enable: true,
      out_mode: "out",
      random: false,
      speed: 2,
      straight: false,
    },
    number: { density: { enable: true, value_area: 800 }, value: 80 },
    opacity: {
      anim: { enable: false, opacity_min: 0.1, speed: 1, sync: false },
      random: false,
      value: 0.5,
    },
    shape: {
      character: {
        fill: false,
        font: "Verdana",
        style: "",
        value: "*",
        weight: "400",
      },
      image: {
        height: 100,
        replace_color: true,
        src: "images/github.svg",
        width: 100,
      },
      polygon: { nb_sides: 5 },
      stroke: { color: "#000000", width: 0 },
      type: "circle",
    },
    size: {
      anim: { enable: false, size_min: 0.1, speed: 40, sync: false },
      random: true,
      value: 5,
    },
  },
  polygon: {
    draw: { enable: false, lineColor: "#ffffff", lineWidth: 0.5 },
    move: { radius: 10 },
    scale: 1,
    type: "none",
    url: "",
  },
  retina_detect: true,
};

const initialState = {
  input: "",
  imageUrl: "",
  box: {},
  route: "signin",
  user: {
    id: "",
    name: "",
    email: "",
    entries: "",
    joined: "",
  },
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;

    this.onInputChange = this.onInputChange.bind(this);
    this.onPictureSubmit = this.onPictureSubmit.bind(this);
    this.calcFaceBoxLoc = this.calcFaceBoxLoc.bind(this);
    this.displayFaceBox = this.displayFaceBox.bind(this);
    this.onRouteChange = this.onRouteChange.bind(this);
    this.loadUser = this.loadUser.bind(this);
    this.updateEntries = this.updateEntries.bind(this);
  }

  calcFaceBoxLoc(boundingBox) {
    // console.log(boundingBox, " from calcFaceBoxLoc ");
    const img = document.querySelector("#inputImg");
    const width = img.width;
    const height = img.height;
    return {
      topRow: boundingBox.top_row * height,
      leftCol: boundingBox.left_col * width,
      bottomRow: height - boundingBox.bottom_row * height,
      rightCol: width - boundingBox.right_col * width,
    };
  }

  displayFaceBox(faceBoxLoc) {
    this.setState({ box: faceBoxLoc });
  }

  onInputChange(event) {
    this.setState({ input: event.target.value });
  }

  onPictureSubmit() {
    this.setState({ imageUrl: this.state.input });
    // console.log(this.state.input);
    fetch("https://pure-anchorage-01379.herokuapp.com/apiCall", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: this.state.input,
      }),
    })
      .then((response) => response.json())
      .then(
        (response) => {
          // console.log(response);
          if (response) {
            this.updateEntries();
          }

          const boundingBox =
            response.outputs[0].data.regions[0].region_info.bounding_box;
          // console.log(boundingBox);
          const faceBoxLoc = this.calcFaceBoxLoc(boundingBox);
          this.displayFaceBox(faceBoxLoc);
        },
        function (error) {
          console.log(error);
        }
      );
  }

  onRouteChange(route) {
    if (route === "signin") {
      this.setState(initialState);
    } else {
      this.setState({ route: route });
    }
  }

  loadUser(user) {
    this.setState({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        entries: user.entries,
        joined: user.joined,
      },
    });
    // console.log(this.state);
  }

  updateEntries() {
    // console.log("this.updateEntries");
    // console.log(this.state.user);
    fetch("https://pure-anchorage-01379.herokuapp.com/image", {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: this.state.user.id,
      }),
    })
      .then((response) => response.json())
      .then((count) => {
        this.setState(Object.assign(this.state.user, { entries: count }));
      });
  }

  // componentDidMount() {
  //   fetch("http://localhost:3000/")
  //     .then((response) => response.json())
  //     .then((data) => console.log(data));
  // }

  render() {
    return (
      <div className="App">
        <Particles className="particles" params={particlesOptions} />
        <Logo />
        {this.state.route === "home" ? (
          <div>
            <Navigation onRouteChange={this.onRouteChange} />
            <Rank
              userName={this.state.user.name}
              userEntries={this.state.user.entries}
            />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onPictureSubmit={this.onPictureSubmit}
            />
            <FaceRecognition
              imageUrl={this.state.imageUrl}
              box={this.state.box}
            />
          </div>
        ) : this.state.route === "signin" ? (
          <Signin onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
        ) : (
          <Register
            onRouteChange={this.onRouteChange}
            loadUser={this.loadUser}
          />
        )}
      </div>
    );
  }
}

export default App;
