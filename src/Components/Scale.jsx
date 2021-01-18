import React, {useState, useEffect} from 'react';
import Select from 'react-select';
import scale from '../media/img/angle-scale.png';
import arrow from '../media/img/arrow.png';
import './Scale.css';

const Scale = ({level, handleName,angleType, handleType, handleMeasure, angles, angle, angleLetters, handleClick}) => {
  
    const options = [
        { value: '...', label: '...'},
        { value: 'Agudo', label: 'Agudo'},
        { value: 'Recto', label: 'Recto'},
        { value: 'Obtuso', label: 'Obtuso'}
    ]
    const customStyles = {
        option: (provided, state) => ({
          borderBottom: '1px dotted pink',
          color: state.isSelected ? 'red' : 'blue',
          padding: 20,
        }),
        control: () => ({
          // none of react-select's styles are passed to <Control />
          width: 200,
        }),
        singleValue: (provided, state) => {
          const opacity = state.isDisabled ? 0.5 : 1;
          const transition = 'opacity 300ms';
      
          return { ...provided, opacity, transition };
        }
      } 
    const [positions, setPositions] = useState([]);
    const [degree, setDegree] = useState('');

    useEffect(()=>{
        for (let i = 0; i<angles.length; i++) {
            if (angles[i] === angle){
                if (angle != 180 && angle !=170 && angle != 100 && angle != 90){
                    if (angle>90){
                        setDegree(Math.round(angle*0.9875));
                    }
                    else {
                        if (angle >=70)
                        setDegree(Math.ceil(angle*1.025));
                        else {
                            setDegree(Math.ceil(angle*1.05));
                        }
                    }   
                }
                else {
                    setDegree(angle);
                }  
            }
        }
        switch(angle){
            case 180: setPositions(['84%','-5%']);
                break;
            case 170: setPositions(['68%','-3%']);
                break;
            case 160: setPositions(['55%','-2%']);
                break;
            case 150: setPositions(['36%','1%']);
                break;
            case 140: setPositions(['23%','7%']);
                break;
            case 130: setPositions(['10%','14%']);
                break;
            case 120: setPositions(['10%','22%']);
                break;
            case 110: setPositions(['0%','31%']);
                break;
            case 100: setPositions(['0%','40%']);
                break;
            case 90: setPositions(['0%','48%']);
                break;
            case 80: setPositions(['0%','58%']);
                break;
            case 70: setPositions(['0%','66%']);
                break;
            case 60: setPositions(['1%','75%']);
                break;
            case 50: setPositions(['11%','83%']);
                break;
            case 40: setPositions(['23%','89%']);
                break;
            case 30: setPositions(['38%','95%']);
                break;
            case 20: setPositions(['53%','98%']);
                break;
            default: break;
        }
    },[angle]);
    
    console.log('degree', degree);
    

    return (
        <>
            { degree ? 
            (<> 
                <div className='cont-scale'>
                    <img src={scale} alt="angle-scale.png" className='scale'/>
                    <img src={arrow} alt="arrow.png" className='fixed-arrow'/>
                    <img src={arrow} alt="arrow.png" className='loose-arrow' style={{transform: `rotate(-${degree}deg)`}} />
                    <div className='fixed-letter'><h1>{angleLetters[0]}</h1></div>
                    <div className='center-letter'><h1>{angleLetters[1]}</h1></div>
                    <div className='loose-letter' style={{top: positions[0], left: positions[1]}}><h1>{angleLetters[2]}</h1></div>
                </div>
                <div className='cont-inputs'>
                    {level === 1 ? 
                    (<>
                        <input type="text" placeholder='Nombre del ángulo...' className='angle-name' onChange={handleName} />
                        <Select 
                            options={options}
                            style={customStyles}
                            className='angle-type'
                            onChange={handleType}
                        />
                    </>)
                    : level === 2 ?
                    (<>
                        <input type="number" placeholder='Medida del ángulo...' className='angle-measure' onChange={handleMeasure} />
                    </>)
                    : null
                    }
                    <button className='validate-btn' onClick={()=>handleClick()}> Validar </button>  
                </div>
            </>) 
            :
            (
                <h1>Cargando...</h1>
            )
            }
        </>
    )
}

export default Scale;