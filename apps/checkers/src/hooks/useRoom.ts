import { useContext } from 'react';

import { RoomContext } from '../context';

export const useRoom = () => useContext(RoomContext);
