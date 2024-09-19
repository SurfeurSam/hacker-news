import style from "./NewsItem.module.css"

export default function NewsItem(props) {
    
    return (
        <div className={style.container}>
            <a className={style.link} href="example.com">{props.title}</a>
        <div className={style.info}>
            <div className={style.userData}>
                <span>{props.username}</span>
                <span>{props.date}</span>
            </div>

            <div className={style.score}>
            {props.score}
            </div>
        </div>
            
        </div>
    )
}