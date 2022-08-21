import React, {useState, useEffect} from 'react';
import { IEntity } from '../models';

const BaseURL = "http://localhost:8000"

interface EntityProps {
    entity: IEntity
}

export function Entity({ entity }: EntityProps) {
    return (
        <div 
            className="entity border w-8 h-8 bg-orange-300 rounded-full text-center transition-all ease-linear duration-1000 absolute"
            style={{top: entity.position.top, left: entity.position.left}}
        >
            <p>{ entity.id }</p>
        </div>
    )
}