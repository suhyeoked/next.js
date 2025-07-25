import styles from './style.module.css'
import Image from 'next/image'
import { useRouter } from 'next/router'

export default function Header(){
    const router = useRouter()
    return(
        <>
            <header className={styles.header} onClick={()=>{
                router.push('/')
            }}>
                <Image className={styles.img} src="/Logo.png"
                width={150}
                height={40}
                alt='Logo' />
            </header>
            <hr className={styles.hr} />

        </>
    )
}