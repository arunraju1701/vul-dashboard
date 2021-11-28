import { useState } from 'react';
import { FaBars } from "react-icons/fa";
import { RiLogoutBoxRLine } from 'react-icons/ri';
import styles from '../styles/Sidebar.module.css'
import { SideBarData } from './NavigationData'
import Link from 'next/Link'

export default function Sidebar({ children }) {
    const [sideBar, setSideBar] = useState(true);
    const toglleSideBar = () => {
        setSideBar(!sideBar)
    }

    return (
        <div className={`${styles['side-bar']} ${sideBar ? styles['side-bar-active'] : styles['side-bar-inactive']}`}>
            <div>
                <FaBars className={styles.btn} onClick={toglleSideBar} />
            </div>
            <ul class={styles['nav-list']}>
                {SideBarData.map((item, index) => {
                    return <li>
                        <Link href={item.path}>
                            <div className={styles.links}>
                                <i>{item.icon}</i>
                                <span className={item.cName}>{item.title}</span>
                            </div>
                        </Link>
                        <span className={styles.tooltip}>{item.title}</span>
                    </li>
                })}
            </ul>
            <div className={styles['profile-content']}>
                <div className={styles.profile}>
                    <div className={styles['profile-details']}>
                        <img src="/arun_raju.png" alt=" " id="profile-pic" />
                        <div className={styles['personal-detail']}>
                            <div className={styles.name}>Arun Raju</div>
                            <div className={styles.email}>arun@cybersafus.com</div>
                            <RiLogoutBoxRLine class={styles.logout} />
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
