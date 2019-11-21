import React from 'react'

const Item = ({ index, item, onClickItem }) => {
  return <div onClick={onClickItem(index)}>{item}</div>
}

export default Item
