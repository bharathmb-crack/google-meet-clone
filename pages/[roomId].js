import dynamic from 'next/dynamic'

import usePeer from "@/hooks/usePeer";
import { useSocket } from "@/context/socket";
import useMediaStream from "@/hooks/useMediaStream";
import { useEffect } from 'react';

const Player = dynamic(() => import("@/component/player/Player"), { ssr: false })

const Room = () => {
  const socket = useSocket();
  const { peer, myId } = usePeer();

  const { stream } = useMediaStream();
  console.log("this is triggered")

  useEffect(() => {
    if (!socket || !peer || !stream) return;
    const handleUserConnected = (newUser) => {
      console.log(`user connected in room with userId ${newUser}`);

      const call = peer.call(newUser, stream);

      call.on("answer", (incomingStream) => {
        console.log(`incoming stream from ${newUser}`);
      });
    };
    socket.on("user-connected", handleUserConnected);

    return () => {
      socket.off("user-connected", handleUserConnected);
    };
  }, [peer, socket, stream]);

  
  useEffect(() => {
    if(!peer || !stream){
      peer?.on('call' ,(call) => {
        const {peer: callerId}  = call;
        call.answer(stream)

        call?.on('stream', (incomingStream) => {
          console.log(`incoming stream from ${callerId}`)
        })
      })
    }
    }, [peer, stream]);

  return <><Player url={stream} muted playing playerId={myId}  /></>;
};

export default Room;
