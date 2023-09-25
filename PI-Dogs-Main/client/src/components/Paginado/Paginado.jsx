import styles from "./Paginado.module.css"

const Paginado = ({breedsPerPage, allbreeds, paginado}) => {
    const pageNumbers = [];

    for (let i=1; i<=Math.ceil(allbreeds/breedsPerPage);i++ ){
        pageNumbers.push(i);
    }

    return(
        <nav>
            <ul className={styles.pagination}>
                {pageNumbers &&
                pageNumbers.map(number=>{
                    return(
                        <li className={styles.number} key={number}>
                            <button className={styles.paginationBtn} onClick={()=>paginado(number)}>{number}</button>
                        </li>
                    )
                    
                })
                }
            </ul>
        </nav>
    )
}

export default Paginado;