import Sidebar from '../components/Sidebar'
import styles from '../styles/Dashboard.module.css'
const products = ["Microsoft", "Linux", "Mac", "ChromeOS"]
export default function Dashboard() {
    return (
        <div className={styles.grid}>
            { 
                products.map(data => {
                   return <div className={styles.card}>
                        <h2>
                            {data}
                        </h2>
                        <p>Click to view the Vulnerabilities.</p>
                    </div>
                })
            }
        </div>
    )
}
