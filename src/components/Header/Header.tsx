import './style.module.css'
import Image from 'next/image'
import { useRouter } from 'next/router'

export default function Header(){
    const router = useRouter()
    return(
        <>
            <header onClick={()=>{
                router.push('/')
            }}>
                <Image src="/Logo.png"
                width={150}
                height={40}
                alt='Logo' />
            </header>
            <hr />

        </>
    )
}