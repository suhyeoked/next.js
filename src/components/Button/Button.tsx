import './style.module.css'


interface ButtonInterface {
    onClick : ()=>void
    children : React.ReactNode
}


export default function Button({children,onClick}:ButtonInterface){
    return (
        <>
            <button onClick={onClick}>
                {children}
            </button>
        </>
    )
}