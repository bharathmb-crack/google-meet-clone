import Image from "next/image";
import { useSocket } from "@/context/socket";
import { useEffect } from "react";
import usePeer from "@/hooks/usePeer";

export default function Home() {
  const socket = useSocket();
  usePeer();
  useEffect(() => {
    socket?.on("connect", () => {
      console.log(socket.id);
    })
  },[socket])

  return <h1>Welcome</h1>;
}
