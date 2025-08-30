import { useEffect, useState } from "react"

// interface CounterProps {
//     title?: string;
//     counterValue?: number;
// }


//props
const Counter = () => {

  const [counter, setCounter] =  useState(0);
  const [time, setTime] =  useState(0);
  const [callEffect, setCallEffect] =  useState(false);

  //2do hooks
  useEffect(() => {
    console.log('llamada al effect');

    if (callEffect) {
        console.log('El estado es true');
    }
    
    const intervalId = setInterval(() => {
        setTime(prev => prev + 1)
    }, 1000);

    return () => {
        clearInterval(intervalId)
    }
    
  }, [callEffect])
  
  const increaseBy = (valor: number = 1) => {
    const newCounter = counter + valor
    setCounter(newCounter)
  }

  const decreaseBy = (value: number = 1) => {
    if (counter > 0) {
        setCounter(counter - value)
    }
  }

  return (
    <>
        <div className="card w-96 bg-base-100 shadow-xl mx-auto my-8">
            <div className="card-body flex flex-col items-center gap-3">
                <h1 className="card-title text-3xl text-secondary text-center">Contador</h1>
                {/* && renderizado condicional simple en vez de ? sin else */}
                {counter > 0 ? (
                    <div className="">
                        <span className="text-4xl font-bold text-primary">Counter: { counter }</span>
                    </div>
                ) : (
                    <span>El contador desaparecio</span>
                )}
                
                <div className="flex gap-3">
                    {/* <button className="btn btn-primary" onClick={() => setCounter(counter + 1)}>+1</button> */}
                    <button className="btn btn-primary" onClick={() => increaseBy(1)}>+1</button>
                    <button className="btn btn-primary" onClick={() => setCounter(0)}>Reset</button>
                    <button className="btn btn-primary" onClick={() => counter > 0 ? setCounter(counter - 1) : null}>-1</button>
                    {/* <button className="btn btn-primary" onClick={() => decreaseBy()}>-1</button> */}
                </div>
            </div>
        </div>
        <div className="card w-96 bg-base-100 shadow-xl mx-auto my-8">
            <div className="card-body flex flex-col items-center gap-3">
                <div className="">
                    <span className="text-4xl font-bold text-primary">Tiempo: { time }s</span>
                </div>

                <div>
                    <button 
                        className="btn btn-secondary"
                        onClick={() => setCallEffect(!callEffect)}
                        >Disparar useEffect
                    </button>
                </div>
            </div>
        </div>
    </>
  )
}

export default Counter
