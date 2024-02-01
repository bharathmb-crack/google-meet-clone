import { useRouter } from "next/navigation";
const uuid = require('uuid')  

import styles from "@/styles/home.module.css";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [roomId, setRoomId] = useState("");

  const createAndJoin = () => {
    const roomId = uuid.v4();
    router.push(`/${roomId}`);
  };

  const joinRoom = () => {
    if (roomId) router.push(`/${roomId}`);
    else {
      alert("please provide the valid roomId");
    }
  };
  return (
    <div className={styles.homeContainer}>
      <h1>Google Meet Clone</h1>
      <div className={styles.enterRoom}>
        <input
          placeholder="Paste Your Room Id"
          onChange={(e) => setRoomId(e?.target?.value)}
          value={roomId}
          type="text"
        />
        <button onClick={joinRoom}>Join Room</button>
      </div>
      <span className={styles.separatorText}>
        -----------------------Or---------------------
      </span>
      <button onClick={createAndJoin}>Create room</button>
    </div>
  );
}
