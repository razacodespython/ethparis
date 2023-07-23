import {Bar, Line, Scatter, Bubble} from "react-chartjs-2";
import style from "../styles/Dashboard.module.css";
import Sidebar from "@/component/sidebar";
import Header from "@/component/Header";

export default function Dashboard() {
    const giftCardsClaimed = 420;
    const numberOfCardsLeft = 69;
    const dailyUsage = 44;
    
    return (
        <>
        <Header />
        <Sidebar />
        <div className={style.dashboard}>
            <div className={style.dataRect}>
                <h2>Gift Cards Claimed</h2>
                <p>{giftCardsClaimed}</p>
            </div>
            <div className={style.dataRect}>
                <h2>Number of Cards Left</h2>
                <p>{numberOfCardsLeft}</p>
            </div>
            <div className={style.dataRect}>
                <h2>Daily Usage</h2>
                <p>{dailyUsage}</p>
            </div>
        </div>
        </>
    );
}