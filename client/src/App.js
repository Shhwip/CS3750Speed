import logo from './logo.svg';
import clubs2 from './png/2_of_clubs.png'
import Image from 'react-bootstrap/Image';

function FluidExample() {
  return <Image src="holder.js/100px250" fluid />;
}


// Adding comment to test git commit/push
function App() {
  return (
    <div className="App">
      <Image src={clubs2} fluid />
    </div>
  );
}

export default App;
