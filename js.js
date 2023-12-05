document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.form');
    const print = document.querySelector('.print')

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        let data = getFormData(form);
        changeValues(data);
    })
    
    print.addEventListener('click', printElement);

});


function getFormData(form){

    const formData = {};
    for(const input of form.querySelectorAll('input, textarea'))
    {
        const {name, value} = input;
        formData[name] = value
    }
   
    return formData
}


function changeValues(data){

    let iterator = Object.entries(data)

    for([key, value] of iterator)
    {
        let element = document.getElementById(key);
        if(key != 'valor')
        {
            element.textContent = value;
        }

    }


    let date = new Date();
    let element = document.getElementById('data');
    
    let day = date.getDate().toString().padStart(2, '0')
    let month = date.getMonth().toString().padStart(2, '0')
    let year = date.getFullYear().toString()
    let hour = date.getHours().toString().padStart(2, '0')
    let minutes = date.getMinutes().toString().padStart(2, '0')
    let seconds = date.getSeconds().toString().padStart(2, '0')


    element.textContent = `${day}/${month}/${year} ${hour}:${minutes}:${seconds}`;

    setTax(data.valor)

    return showElement()
}

function setTax(value)
{
    console.log(value)

    let total = document.getElementById('valor_total');
    let iss = document.getElementById('iss');
    let basis = document.getElementById('valor');

    let iss_value = parseFloat(value) * 0.05
    let value_string = value.toString().replace('.', ',')
    
    total.textContent  = 'R$' +  value_string;
    basis.textContent  = 'R$' +  value_string;
    iss.textContent = 'R$' + iss_value.toFixed(2).replace('.', ',');

}

function showElement()
{
    let element = document.querySelector('.nota-fiscal');
    element.style.display = 'block'
    element.scrollIntoView({behavior: "smooth", block: "center"});
}

function printElement()
{
    window.print()
}