import React from 'react'

type HelloProps = {}

const Hello: React.FC<HelloProps> = (props) => {
  return <div className="hello">Hello, World</div>
}

export default Hello
