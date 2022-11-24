export function convertDate(date: any){
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`;
}

function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
}

export function convertDateJSToString(date: any){
    return `${padTo2Digits(date.getDate())}/${padTo2Digits(date.getMonth() + 1)}/${date.getFullYear()}`;
}