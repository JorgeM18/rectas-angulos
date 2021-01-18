import Scale from './Components/Scale.jsx';
import {useState, useEffect} from 'react';

import './App.css';

function App() {
  
  // Variables
  let angles = [];

  for (let i = 20; i<=180; i+=10) {
      angles.push(i)
  }

  // States
  const [solutions, setSolutions] = useState({
    name: '',
    type: '',
    measure: '',
  })

  const [level, setLevel] = useState(1);
  const [angle, setAngle] = useState('');
  const [angleLetters, setAngleLetters] = useState('');
  const [angleName, setAngleName] = useState('');
  const [angleType, setAngleType] = useState('...');
  const [angleMeasure, setAngleMeasure] = useState('');

  //Functions

  const loadData = (angles) => {
    
    let index = Math.floor(Math.random()*angles.length);
    setAngle(angles[index]);

    let result = '';
    let letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (let i = 0; i < 3; i++){
      result += letters.charAt(Math.floor(Math.random()*letters.length));
    } 
    setAngleLetters(result)

    setSolutions({
      name: result,
      reverseName: result.split('').reverse().join(''),
      type: angles[index] < 90 ? 'Agudo' : angles[index] > 90 ? 'Obtuso' : 'Recto',
      measure: angles[index] 
    })
  }

  // Handlers
  const handleName = (e) => {
      setAngleName(e.target.value)
  }

  const handleType = (e) => {
    setAngleType(e.value)
  }

  const handleMeasure = (e) => {
    setAngleMeasure(e.target.value)
  }

  const handleClick = () => {
    console.log('DENTRO DEL HANDLER CLICK')
    console.log(solutions)
    console.log(angleName, angleType)
    
    if (level === 1){
      
      if ((solutions.name === angleName || solutions.reverseName === angleName) && angleType === solutions.type) {
        alert('CORRECTO!, FELICIDADES');
        loadData(angles)
      }
      else alert('INCORRECTO, INTENTELO DE NUEVO')
    }
    if (level === 2){
      if (solutions.measure === angleMeasure) alert('CORRECTO!, FELICIDADES')
      else {
        alert('INCORRECTO, INTENTELO DE NUEVO')
        setAngleMeasure('');
      }
    }
  }

  console.log('angle: ', angle);
  console.log('angle name', angleLetters);
  console.log('Name del Input: ', angleName);
  console.log('Type del Input: ', angleType);
  console.log(solutions)

  useEffect(()=>{
      loadData(angles)
  },[]);
  console.log('SOLUCIONES')
  console.log(solutions)
  return (
    <div className="App">
      <div className='level'><h1>Nivel {level}</h1></div>
      <div className='game'>
        <Scale
          level={level}
          angles={angles}
          angle={angle}
          setAngle={setAngle}
          handleName={handleName}
          angleType={angleType}
          angleLetters={angleLetters}
          handleType={handleType}
          setAngleLetters={setAngleLetters}
          handleMeasure={handleMeasure}   
          handleClick={handleClick}
        />
      </div>
    </div>
  );
}

export default App;
