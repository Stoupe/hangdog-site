import React, {useState} from 'react'

const HomePage = () => {

  const [count, setCount] = useState(0);

  return <div>
    <div>{count}</div>
    <button onClick={() => setCount((c) => c+1)}>+</button>
    </div>
}

export default HomePage