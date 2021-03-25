//init
const fluxLine = document.querySelectorAll(".fluxChart") 
const boilerLine = document.querySelector(".boilerChart")
const tempLine = document.querySelectorAll(".tempChart")
const doughnut = document.querySelector("#doughnutChart")

//Listeners 
fluxLine.forEach((item)=>{
    item.addEventListener('click', fluxChart)
})

boilerLine.addEventListener('click', boilerChart)

tempLine.forEach((item)=>{
    item.addEventListener('click', tempChart)
})


//Load data to ChartJs
function fluxChart(e) {
    const borderColor = {water:'rgb(99, 174, 255)',fuel:'rgb(128, 71, 6)'}
    const id = e.target.parentElement.parentElement.id
    this.removeEventListener('click', fluxChart)
    let parent = e.target.parentElement.parentElement
    parent.removeChild(e.target.parentElement)
    let data = []
    let labels = []
    
    const dataset = []
    let temp = {}
    temp.label = [`${id.toUpperCase()} CONSUPTION`]

    //load labels from localStorage
    if (localStorage.getItem('date')){
        temp.var = localStorage.getItem('date')
        labels = temp.var.split(';')
        labels.shift()
    }

    //load data from localStorage
    if (localStorage.getItem(`${id}`)) {
        temp.var = localStorage.getItem(`${id}`)
        data = temp.var.split(';')
        for (let i = 1; i < data.length-1; i++) {
            if((Number(data[i+1]) - Number(data[i]))<0) {
                let intire = data[i]%10
                let mil = Math.pow(10, intire)
                data[i] = (Number(data[i+1]) + mil) - Number(data[i])
            } else {
                data[i] = Number(data[i+1]) - Number(data[i])
                data[i] = data[i].toFixed(1)
            }
        }
        data.pop()
        temp.data = data
    }

    temp.backgroundColor= 'rgba(99, 135, 255, 0.2)',
    temp.borderColor= borderColor[`${id}`],
    temp.fill=false,
    temp.borderWidth= 3
    dataset.push(temp)
    const ctx = document.getElementById(`${id}Line`).getContext('2d')
    const options = {
        type: 'line',
        data: {
            labels: labels,
            datasets: dataset,
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        },
        hover: {
            mode: 'index',
            intersect: false
        },
        tooltips: {
            position: 'average',
            mode: 'index',
            intersect: false,
        }
    }
}
const chart = new Chart(ctx, options)
}   

//Load Boiler Data to ChartJs
function boilerChart(e) {
const borderColor = {boiler:'rgb(0, 89, 179)'}
const id = e.target.parentElement.parentElement.id
this.removeEventListener('click', boilerChart)
let parent = e.target.parentElement.parentElement
parent.removeChild(e.target.parentElement)
let data = []
let labels = []

const dataset = []
let temp = {}
temp.label = [`${id.toUpperCase()} CONSUPTION`]

//load labels from localStorage
if (localStorage.getItem('date')){
    temp.var = localStorage.getItem('date')
    labels = temp.var.split(';')
    labels.shift()
}

//load data from localStorage
if (localStorage.getItem(`${id}`)) {
    temp.var = localStorage.getItem(`${id}`)
    data = temp.var.split(';')
    for (let i = 1; i < data.length-1; i++) {
            data[i] = Number(data[i+1]) - Number(data[i])
            data[i] = data[i].toFixed(1)
        
    }
    data.pop()
    temp.data = data
}

temp.backgroundColor= 'rgba(99, 135, 255, 0.2)',
temp.borderColor= borderColor[`${id}`],
temp.fill=false,
temp.borderWidth= 3
dataset.push(temp)
const ctx = document.getElementById(`${id}Line`).getContext('2d')
const options = {
    type: 'line',
    data: {
        labels: labels,
        datasets: dataset,
},
options: {
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero: true
            }
        }]
    },
    hover: {
        mode: 'index',
        intersect: false
    },
    tooltips: {
        position: 'average',
        mode: 'index',
        intersect: false,
    }
}
}
const chart = new Chart(ctx, options)
}   

//Load Boiler Data to ChartJs
function tempChart(e) {
const borderColor = {waterCyl:'rgb(2, 45, 89)', exaustCyl:'rgb(89, 2, 2)'}
const id = e.target.parentElement.parentElement.id
this.removeEventListener('click', boilerChart)
let parent = e.target.parentElement.parentElement
parent.removeChild(e.target.parentElement)
let data = []
let labels = []

const dataset = []


//load labels from localStorage
if (localStorage.getItem('date')){
    labels = localStorage.getItem('date')
    labels = labels.split(';')
    labels.shift()
}

const arrKeys = Object.keys(localStorage)
arrKeys.sort()
//load data from localStorage
for (let i = 0; i < arrKeys.length; i++){
    let temp = {}
    data = []
    temp.type = 'bar'
    // temp.label = [`${id.toUpperCase()} TEMPERATURE`]
    temp.backgroundColor= 'rgba(99, 135, 255, 0.2)'
    temp.borderColor= borderColor[`${id}`]
    temp.fill=false
    temp.borderWidth= 3
    if(arrKeys[i].indexOf(id)!=-1) {
        temp.label = arrKeys[i]
        data = localStorage.getItem(arrKeys[i])
        data = data.split(';')
        data.shift()
        temp.data = data
        dataset.push(temp)
    }
}

const ctx = document.getElementById(`${id}Bar`).getContext('2d')
const options = {
    type: 'bar',
    data: {
        labels: labels,
        datasets: dataset,
    },
    options: {
        responsive: true,
        scales: {
            xAxes: [{
                display: true,
            }],
            yAxes: [{
                display: true,
                type: 'linear',
                ticks: {
                    beginAtZero: false
                }
            }]
        },
        hover: {
            mode: 'index',
            intersect: false
        },
        tooltips: {
            position: 'average',
            mode: 'index',
            intersect: false,
        }
    }
}
    const chart = new Chart(ctx, options)
}  

function doughnutChart(e) {
    const borderColor = '#FFFFFF'
    const id = e.target.parentElement.parentElement.id
    console.log(id)
    this.removeEventListener('click', boilerChart)
    let parent = e.target.parentElement.parentElement
    parent.removeChild(e.target.parentElement)
    let data = []
    // let labels = ['Lated', 'Atention', 'On Time']
    let labels = ['Completed', 'Current', 'Schedule']

    const dataset = []

    let config = {}
    config.backgroundColor= 'rbga(200,200,100,0.8)'
    config.fill=false
    config.label = 'On Time'
    config.data = [7, 3, 5]
    config.borderColor= '#00FF00'
    config.pointBackgroundColor= 'rgba(131,150,173,.1)'
    dataset.push(config)
   
    config = {}
    config.backgroundColor= '#ff0000ff'
    config.fill=false
    config.label = 'Lated'
    config.data = [1, 1, 1]
    config.borderColor= '#ff0000ff'
    config.pointBackgroundColor= 'rgba(131,150,173,.1)'
    dataset.push(config)
   
    config = {}
    config.backgroundColor= '#0000FF'
    config.borderColor= '#0000FF'
    config.fill=false
    config.label = 'Attention'
    config.data = [1, 5, 4]
    config.pointBackgroundColor= 'rgba(131,150,173,.1)'
    dataset.push(config)
    
    const ctx = document.getElementById(`tasksDoughnut`).getContext('2d')
    const options = {
        type: 'radar',
        data: {
            labels: labels,
            datasets: dataset,
        },
        options: {
            responsive: true,
            hover: {
                mode: 'index',
                intersect: false
            },
            tooltips: {
                position: 'average',
                mode: 'index',
                intersect: false,
            },
            title: {
                display: true,
                text: 'Example: Tasks Control Chart (not implemented)'
            },
            scale: {
                ticks: {
                    beginAtZero: true
                }
            }
        }
    }
    const chart = new Chart(ctx, options)
    }  
    
