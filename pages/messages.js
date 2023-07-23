import Chat from "@/component/Chat";
import Header from "@/component/Header";
import Sidebar from "@/component/sidebar";
import style from "@/styles/Chat.module.css";

export default function Message() {
    return (
        <div>
            <Header />
            <Sidebar />
            <h2 className={style.header}>Messages</h2>
            <Chat />
        </div>
    )
}