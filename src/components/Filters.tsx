import React, {useState} from "react";
import data from './../data/data.json';
import InputAutocomplete from "./InputAutocomplete";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {end} from "@popperjs/core";
import {convertDate, convertDateJSToString} from "../utils/date";

const Filters = ({setPersons, persons}) => {
    const [filterNombres, setFilterNombres] = useState("");
    const [filterRangoFecha, setFilterRangoFecha] = useState([null, null]);
    const [startDate, endDate] = filterRangoFecha;

    const actionClear = () => {
        setPersons(data);
        setFilterRangoFecha([null, null]);
        setFilterNombres("");
    };

    const actionSearch = () => {
        if(filterNombres && startDate && endDate){

            let result = data.filter((p) => {
                let fecha = new Date(`${p.fecha} `);
                return fecha >= startDate && fecha <= endDate;
            }).filter((p) => {
                return (`${p.nombres.toLowerCase()} ${p.apellidos.toLowerCase()}`) === filterNombres.toLowerCase()
            });
            setPersons(result);

        }else if(filterNombres){
            console.log('aa: ', filterNombres)
            let result = data.filter((p) => {
                return (`${p.nombres.toLowerCase()} ${p.apellidos.toLowerCase()}`) === filterNombres.toLowerCase()
            });
            setPersons(result);

        }else if(startDate && endDate){
            let result = data.filter((p) => {
                let fecha = new Date(`${p.fecha} `);
                return fecha >= startDate && fecha <= endDate;
            });
            setPersons(result);
        }
    };

    return (
        <>
            <form className="row g-3 filters">
                <div className="col-4">
                    <label htmlFor="inputEmail4" className="form-label">Nombres y Apellidos</label>
                    <InputAutocomplete data={data} setValueField={setFilterNombres} valueField={filterNombres} />
                </div>
                <div className="col-4">
                    <label htmlFor="inputPassword4" className="form-label">Rango de Fecha</label>
                    <DatePicker
                        className="form-control"
                        dateFormat="dd/MM/yyyy"
                        selectsRange={true}
                        startDate={startDate}
                        endDate={endDate}
                        onChange={(update) => {
                            setFilterRangoFecha(update);
                        }}
                        isClearable={true}
                    />
                </div>
                <div className="col-4">
                    <button type="button" className="btn btn-success search-btn mx-2" onClick={actionSearch}>Buscar</button>
                    <button type="button" className="btn btn-danger search-btn" onClick={actionClear}>Limpiar</button>
                </div>
            </form>
        </>
    );
};

export default Filters;