import { socket } from '@/app/context/socket.context'
import { PluginEnum } from '@/app/types/plugin.enum'
import  { useEffect } from 'react'

export const RoomPlugin = () => {

    

    useEffect(() => {
        socket.on(PluginEnum.ROOM, ({memberJoined, joinedGroup}) => {
            if(memberJoined){
              
              return;
            }
        })
    }, [])
  return (
    <div>RoomPlugin</div>
  )
}
