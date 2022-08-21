import React from 'react';
import { Entity } from './components/Entity';
import { useEntitys } from './hooks/entitys';

function App() {
  const {entitys}  = useEntitys()
  return (
    <div className='container'>
      {entitys.map(entity => <Entity entity={entity} key={entity.id}/>)}
    </div>   
  );
}

export default App;
