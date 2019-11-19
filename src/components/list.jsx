import React from 'react'
import Item from './item'
const List = ({data, onClickItem}) => {
    return (
        <div>
            {data.map((item, index) => {
                return <Item index={index} key={index} item={item} onClickItem={onClickItem}/>
            })}
        </div>
    );
}

export default List;
