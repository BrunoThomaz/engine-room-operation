// Insert Probing Helpers
function initForming() {
    const insertProbing = document.querySelector("#insertProbing")
    insertProbing.addEventListener('click', showModal)
    
    const waterTreatment = document.querySelector("#waterTreatment")
    waterTreatment.addEventListener('click', showModal)

}

//ShowModal Function
function showModal(e) {
    e.preventDefault()
    const id = e.target.id
    const modal = document.querySelector(`#modal`)

    //loadContent from views folder
    const req = new XMLHttpRequest()
    req.open('GET', `./src/views/${id}.html`)
    req.onreadystatechange = ()=>{
        if(req.readyState === 4 && req.status === 200) {
            modal.innerHTML = req.responseText
            insertData()
            modal.style.display = "grid"
            const show = () =>{modal.style.opacity = "1"}
            setTimeout(show, 300)
        }
    const burger = document.querySelector('.burger')
        burger.click()
    }
    req.send()
}

function insertData() {
    const btnClose = document.querySelector("#close") 
    const formType = document.querySelectorAll('input[name="formType"]')
    const btnSave = document.querySelector('#save')
    const btnLoadData = document.querySelector("#data")
    const btnDownload = document.querySelector("#download")
    const fileInput = document.querySelector("input[type='file']")

    for(type of formType) {
        type.addEventListener('click', loadField)
    }
    btnSave.addEventListener('click', saveData)
    btnClose.addEventListener('click', closeModal)
    btnLoadData.addEventListener('click', uploadFile)
    fileInput.addEventListener('change', loadFile)
    btnDownload.addEventListener('click', download_csv)

    loadPlaceHolders()
    progressBar()
}

function loadPlaceHolders() {
    const dateField = document.querySelector("input[type='date']")
    dateField.addEventListener('change', loadPlaceHolders)

    //Initialize placeholders from last saved Data
    if(localStorage.getItem('date') && !dateField.value){
        let date = localStorage.getItem('date')
        let temp = date.split(';')
        temp.sort()
        temp = temp.pop()
        date = date.split(';')

        //Last Date Saved
        const lastSavedData = date.indexOf(temp)

        //Get All inputs and put the last value saved on value
        let inputs = document.querySelectorAll('form>div>input')
        for (let i = 0; i<inputs.length-1; i++){
            if (localStorage.getItem(inputs[i].name)) {
                let key = localStorage.getItem(inputs[i].name)
                key = key.split(';')
                if(key[lastSavedData]){
                    inputs[i].placeholder = key[lastSavedData]
                }
            }
        }
    }

    if(localStorage.getItem('date') && dateField.value){
        let date = localStorage.getItem('date')
        let temp = date.split(';')
        date = date.split(';')
        temp.sort()
        if(date.indexOf(dateField.value) != -1) {
            temp = dateField.value
        } else {
            temp = temp.pop()
        }
        //Last Date Saved
        const lastSavedData = date.indexOf(temp) 
        //Get All inputs and put the last value saved on value
        let inputs = document.querySelectorAll('form>div>input')
        for (let i = 0; i<inputs.length-1; i++){
            if (localStorage.getItem(inputs[i].name)) {
                let key = localStorage.getItem(inputs[i].name)
                key = key.split(';')
                if(key[lastSavedData]){
                    inputs[i].placeholder = key[lastSavedData]
                }
            }
        }
    }
}



//CloseModal Function
function closeModal(e) {
    e.preventDefault()
    const modal = document.querySelector('#modal')
    
    modal.style.opacity = '0'
    const close = ()=> {
        modal.style.display = 'none'
    }
    setTimeout(close, 300)
}

//Show fields according to state    
function loadField(event) {
    const selectedState = event.target.value
    const fields = document.querySelectorAll('form div')
    for (field of fields) {
        if(field.className.match(`${selectedState}`)) {
            field.style.display = 'flex'
        } 
        if(!field.className.match(`${selectedState}`)) {
            field.style.display = 'none'
        } 
    }
}

function saveData(e) {
    e.preventDefault()
    const data = document.querySelectorAll('form>div>input')
    const btnClose = document.querySelector("#close") 
    
    for (item of data) {
        if(item.type == 'date') {
            let store = ''
            if(localStorage[item.name]){
                store = localStorage[item.name]
            } 
            let value = new Date(item.valueAsNumber)
            console.log(value.toUTCString())
            localStorage.setItem(item.name, `${store};${item.value}`)
        }
        let store = ''
        if(localStorage[item.name]){
            store = localStorage[item.name]
        } 
        localStorage.setItem(item.name, `${store};${item.value}`)
    }
    alert('Data saved with success!')
    btnClose.click()
}


//Save the data to a CSV file.
function download_csv() {
    let csv = ''
    for(keys of Object.keys(localStorage)) {
        csv += `${keys};${localStorage.getItem(keys)}\n`
    }

    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
    hiddenElement.target = '_blank';
    hiddenElement.download = 'overview.csv';
    hiddenElement.click();

}

//Load File
function loadFile(event) {
    const label = document.querySelector("#fileLabel")
    if(event.target.files) {
        label.textContent = event.target.files[0].name
        
    }
}


//Upload data from a CSV File
function uploadFile (event) {
    event.preventDefault()
    const input = document.querySelector("input[name='data']")
    const btnClose = document.querySelector("#close") 
    const label = document.querySelector("#fileLabel")

    const reader = new FileReader()
    reader.readAsText(input.files[0])
    reader.onload = ((ev) => {
        let data = ''
        data = ev.target.result
        data = data.split('\n')
        for (item of data) {
            localStorage.setItem(item.slice(0, item.indexOf(";")), item.slice(item.indexOf(";"), item.length))
        }
    })
    alert('Data loaded!')
    label.textContent = 'Click to choose a file'
    btnClose.click()
}