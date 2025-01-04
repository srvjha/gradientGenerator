import { useState } from 'react';
import ColorPicker, { Color } from '@rc-component/color-picker';
import '@rc-component/color-picker/assets/index.css';
import './assets/index.less';

function App() {
    const [value, setValue] = useState(new Color('rgba(255,0,0,0)'));
    const [colors,setColors] = useState(new Array(6).fill(''));
    console.log({colors})
    const [selectedColor, setSelectedColor] = useState(new Array(6).fill(false));
    
    

    const handleChange = (nextValue) => {
        
        console.log('Next Value:', nextValue.toRgbString());

        if (value.a === 0) {
            nextValue = nextValue.setA(1); // Ensuring alpha value is set
        }
        setValue(nextValue);

    };

    for(let i=0;i<6;i++){
      const randColorCode = Math.random().toString(16).slice(2, 8);
      if(selectedColor[i] === true){
        console.log(value.toHexString());
        colors[i] = value.toHexString();
        console.log(colors[i]);
      }
      //else if(colors[i]===)
      else if(colors[i] === "") {
        colors[i] = `#${randColorCode}`;
      }
        
    }
    console.log({colors})

    return (
        <div className='bg-white min-h-screen p-2 bg-scroll'>
            <div className="  flex flex-col items-center justify-center">
                <div className="text-[24px] font-extrabold mb-6 -ml-[1230px]">
                  <img 
                  src="https://www.shutterstock.com/image-vector/smooth-color-gradient-icon-logo-600nw-589145633.jpg" 
                  alt="icon" 
                  className="w-10 h-10 inline-block mr-2"
                  />
                  Gradient Generator
                  </div>
                <div className=' shadow-xl w-full rounded-lg h-[320px] ' style={{ backgroundImage:`linear-gradient(to right, ${colors.join(', ')}`}}></div>
                <div className="flex flex-row justify-center space-x-5 mt-4">
                    <ColorPicker
                        style={{ width: '500px',height:"290px" }}
                        value={value}
                        onChange={handleChange}
                    />
               
                <br />
                <div className="flex flex-col">
                <div
                    className="flex flex-row space-x-3 p-4 border border-gray-300 rounded-xl -mt-1 "
                    style={{ width: '530px',height:'100px' }}
                >
                    <div className='flex flex-col '>  
                      <div className='bg-white p-3 w-[100px] rounded-lg border border-gray-300  font-semibold'>{value.toHexString()}</div>
                      <div className='ml-9 font-bold text-gray-700'>HEX</div>

                    </div>
                    <div className='flex flex-col '>  
                      <div className='bg-white p-3 w-[135px] rounded-lg border border-gray-300  font-semibold'>{value.toRgbString().split(",").map((rgb)=>(rgb.slice(0,4))).join(',')}</div>
                      <div className='ml-14 font-bold text-gray-700'>RGB</div>

                    </div>
                    <div className='flex flex-col '>  
                      <div className='bg-white p-3 w-[230px] rounded-lg border border-gray-300  font-semibold'>{value.toHsbString()}</div>
                      <div className='ml-24 font-bold text-gray-700'>HSB</div>

                    </div>
                    

                </div>
                <div className='text-center text-sm font-bold text-gray-500 mt-2'>HEX</div>
                <div className="grid grid-cols-3 gap-2 rounded-lg h-[180px] justify-center mt-4">
                  {colors.map((color,index)=>{
                    return(
                     <div>
                     <div className='flex flex-col space-y-1  mr-[0px]'>  
                         
                         <div>
                         <div className='flex flex-row space-x-2'>
                         <div 
                         className={`${selectedColor[index] === true ?"border-blue-400":"border-white"}  border-4 hover:outline-2 cursor-pointer hover:outline-sky-600 rounded-lg w-14`} style={{ backgroundColor:`${color}` }}
                         onClick={()=>{
                            setSelectedColor(new Array(6).fill(false));
                            setSelectedColor(selectedColor.map((item,idx)=>(idx===index?true:false)));
                            
                         }}
                         >
                         
                         </div>
                         <input type="text" value={color} className='bg-white p-3 w-[120px] rounded-lg border border-gray-300  font-semibold' />
                         
                         </div>
   
                        
                         </div>
   
                       </div>
                     </div>
                  )})}
                 
                </div>
                </div>
                
                </div>
                
            </div>
        </div>
    );
}

export default App;
