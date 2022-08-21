import axios from 'axios';
import React, {useEffect, useState} from 'react';
import { IEntity } from '../models';

const BaseURL = "http://localhost:8000"


export function useEntitys() {
  const [entitys, setEntitys] = useState<IEntity[]>([])

  async function fetchEntity() {
    const responce = await axios.get<IEntity[]>(BaseURL+'/entitys')
    setEntitys(responce.data)
  }

  useEffect(() => {
    fetchEntity()
  }, [])

  const updatePosition = (data: string) => {
      const parsedData = JSON.parse(data);
      setEntitys(parsedData.data)
    };

  useEffect(() => {
    const eventSource = new EventSource(`${BaseURL}/realtime-name`);
    eventSource.onmessage = (e) => updatePosition(e.data);
    return () => {
    eventSource.close();
    };
  }, []);

    return {entitys}
}