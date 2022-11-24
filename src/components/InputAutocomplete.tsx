import { useState } from 'react';
import Autosuggest from 'react-autosuggest';

const InputAutocomplete = ({data, valueField, setValueField}) => {
    const[sugerencias, setSugerencias]= useState(data);
    const[value, setValue]= useState("");

    const onSuggestionsFetchRequested=({value})=>{
        setSugerencias(filtrarSugerencia(value));
    }

    const filtrarSugerencia=(value)=>{
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;
        var filtrado = data.filter((d)=>{
            var textoCompleto = d.nombres + " " +d.apellidos;
            if(textoCompleto.toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .includes(inputValue)){
                return d;
            }
        });
        return inputLength === 0 ? [] : filtrado;
    }

    const onSuggestionsClearRequested = () =>{
        setSugerencias([]);
    }

    const getSuggestionValue=(suggestion)=>{
        return `${suggestion.nombres} ${suggestion.apellidos}`;
    }

    const renderSuggestion=(suggestion)=>(
        <div className='sugerencia' onClick={()=>seleccionarSugerencia(suggestion)}>
            {`${suggestion.nombres} ${suggestion.apellidos}`}
        </div>
    );

    const seleccionarSugerencia=(value)=>{
        setValueField(value);
    }

    const onChange=(e, {newValue})=>{
        setValueField(newValue);
    }

    const inputProps={
        placeholder:"Ingrese nombre",
        value: valueField,
        onChange
    };

    const eventEnter=(e)=>{
        if(e.key == "Enter"){
            var split = e.target.value.split('-');
            var suge ={
                presidente: split[0].trim(),
                pais: split[1].trim(),
            };
            seleccionarSugerencia(suge);
        }
    }

    const theme = {
        container: 'autosuggest',
        input: 'form-control',
        suggestionsContainer: 'dropdown',
        suggestionsList: `dropdown-menu ${sugerencias.length ? 'show' : ''}`,
        suggestion: 'dropdown-item',
        suggestionHighlighted: 'active'
    };

    return (
        <Autosuggest
            suggestions={sugerencias}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
            onSuggestionSelected={eventEnter}
            theme={theme}
        />
    );
}

export default InputAutocomplete;