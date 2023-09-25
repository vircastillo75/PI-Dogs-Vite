import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getallTemperaments } from "../../redux/actions";
import validate from "../../utils/validations";
import axios from "axios";

const FormPage = () => {

    const dispatch = useDispatch();
    const {temperaments} = useSelector(state => state);

    const [breedData, setBreedData] = useState({
        name:"",
        image:"",
        minHeight:0,
        maxHeight:0,
        minWeight:0,
        maxWeight:0,
        life_span:0,
        temperaments:[]
    })

    const [errors, setErrors] = useState({
        name:"",
        image:"",
        minHeight:"",
        maxHeight:"",
        minWeight:"",
        maxWeight:"",
        life_span:"",
        temperaments:[]
    })

    useEffect(()=>{
        dispatch(getallTemperaments());
    },[])

    const handleChange = (event) => {
        setBreedData({
            ...breedData,
            [event.target.name]: event.target.value,
        })
        setErrors(
            validate({
                ...breedData,
                [event.target.name]: event.target.value,
            })
        )
    }

    const handleChangeTemperaments = (event) => {
        if(event.target.checked){
            breedData.temperaments.push(event.target.value)
            const newArray = breedData.temperaments
            setBreedData({
                ...breedData,
                [event.target.name]: newArray,
            })
            setErrors(
                validate({
                    ...breedData,
                    [event.target.name]:newArray,
                })
            )
        }
        else{
            const filterArray = breedData.temperaments.filter(temperament=>temperament!==event.target.value)
            setBreedData({
                ...breedData,
                [event.target.name]: filterArray,
            })
            setErrors(
                validate({
                    ...breedData,
                    [event.target.name]: filterArray,
                })
            )
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        let arrayErrors = Object.entries(errors);

        if (arrayErrors.length === 0) {
            axios.post("http://localhost:3001/dogs",breedData)
            .then(res=>alert("Breed created"))
            const checkBoxes = document.querySelectorAll('input[type="checkbox"]');
            checkBoxes.forEach((checkbox)=>{
                checkbox.checked = false;
            })
            
            setBreedData({
                name:"",
                image:"",
                minHeight:0,
                maxHeight:0,
                minWeight:0,
                maxWeight:0,
                life_span:0,
                temperaments:[]
            });
            setErrors({
                name:"",
                image:"",
                minHeight:"",
                maxHeight:"",
                minWeight:"",
                maxWeight:"",
                life_span:"",
                temperaments:[]
            })
        }else{
            alert("Debe llenar todos los campos")
        }
    }

    return(
        <div className={styles.container}>
            <div className={styles.container2}>
                <h1 className={styles.title}>Create Dog</h1>
                <form className={styles.formContainer} onSubmit={handleSubmit} >
                        <div className={styles.inputContainer}>
                            <label className={styles.labelTitle} htmlFor="name">NOMBRE</label>
                            <input className={styles.inputText} name="name" type="text" value={breedData.name} placeholder="Ingrese el nombre del perro..." onChange={handleChange} />
                            {errors.name && <p className={styles.error}>{errors.name}</p>}
                        </div>
                        <div className={styles.inputContainer}>
                            <label className={styles.labelTitle} htmlFor="image">IMAGE URL</label>
                            <input className={styles.inputText} name="image" type="text" value={breedData.image} placeholder="Ingrese la url de la imagen..." onChange={handleChange}/>
                            {errors.image && <p className={styles.error}>{errors.image}</p>}
                        </div>
                        <div className={styles.inputContainer}>
                            <label className={styles.labelTitle} htmlFor="height">ALTURA</label>
                            <div className={styles.containerMinMax}>
                                <div className={styles.inputData}>
                                <label className={styles.labelText} htmlFor="minHeight">MIN </label>
                                <input className={styles.inputNumber} name="minHeight" type="number" value={breedData.minHeight} placeholder="Altura min..." onChange={handleChange} />
                                {errors.minHeight && <p className={styles.error}>{errors.minHeight}</p>}
                                </div>
                                <div className={styles.inputData}>
                                <label className={styles.labelText} htmlFor="maxHeight">MAX</label>
                                <input className={styles.inputNumber} name="maxHeight" type="number" value={breedData.maxHeight} placeholder="Altura max..." onChange={handleChange} />
                                {errors.maxHeight && <p className={styles.error}>{errors.maxHeight}</p>}
                                </div>
                            </div>    
                        </div>
                        <div className={styles.inputContainer}>
                            <label className={styles.labelTitle} htmlFor="weight">PESO</label>
                            <div className={styles.containerMinMax}>
                                <div className={styles.inputData}>
                                <label className={styles.labelText} htmlFor="minWeight">MIN</label>
                                <input className={styles.inputNumber} name="minWeight" type="number" value={breedData.minWeight} placeholder="Peso min..." onChange={handleChange} />
                                {errors.minWeight && <p className={styles.error}>{errors.minWeight}</p>}
                                </div>
                                <div className={styles.inputData}>
                                <label className={styles.labelText} htmlFor="maxWeight">MAX</label> 
                                <input className={styles.inputNumber} name="maxWeight" type="number" value={breedData.maxWeight} placeholder="Peso max..." onChange={handleChange} />
                                {errors.maxWeight && <p className={styles.error}>{errors.maxWeight}</p>}
                                </div>
                            </div>    
                        </div>
                        <div className={styles.inputContainer}>
                            <label className={styles.labelTitle} htmlFor="life_span">AÑOS DE VIDA</label>
                            <input className={styles.inputNumber} name="life_span" type="number" value={breedData.life_span} placeholder="Ingrese la esperanza de vida..." onChange={handleChange} />
                            {errors.life_span && <p className={styles.error}>{errors.life_span}</p>}
                        </div>
                    <div className={styles.inputContainer}>
                        <label className={styles.labelTitle} htmlFor="temperaments">TEMPERAMENTOS</label><br/>
                        <div className={styles.temperamentsContainer}>
                            {temperaments.map(temperament=>{
                                return(
                                    <div key={temperament.id} className={styles.temperament}>
                                        <label className={styles.containerCheckBox} >
                                            <input className={styles.checkBox} name="temperaments"  type="checkbox" value={temperament.name} onChange={handleChangeTemperaments} />
                                            <span class={styles.checkmark}></span>
                                            {temperament.name}
                                        </label>
                                    </div>
                                )
                            })}
                        </div>
                        {errors.temperaments && <p className={styles.error}>{errors.temperaments}</p>}
                    </div>
                    <div className={styles.btnContainer}>
                        <button className={styles.btnSubmit} type="submit">CREATE</button>
                    </div>
                    
                </form>
            </div>
        </div>
    )
}

export default FormPage; 