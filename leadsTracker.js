let myLead = []

const inputEl = document.getElementById('input-el')
const inputBtn = document.getElementById('input-btn')
const deleteBtn = document.getElementById('delete-btn')
const saveBtn = document.getElementById('save-btn')
const ulEl = document.getElementById('ul-el')

// getting localStorage items
let  leadsFromLocalStorage = JSON.parse(localStorage.getItem('myLead'))

// check if leadsfromlocalstorage is truthy
if (leadsFromLocalStorage){
    myLead = leadsFromLocalStorage
    render(myLead)
}

// const tab = [{
//     url : 'wwww.go.ke'
// }]

saveBtn.addEventListener('click',function(){

    // async function getCurrentTab() {
    //   let queryOptions = { active: true, lastFocusedWindow: true };
    //   // `tab` will either be a `tabs.Tab` instance or `undefined`.

    //   // SAVING MY LEADS TO LOCALSTORAGE
    //     localStorage.setItem('myLead',JSON.stringify(myLead))

    //     render(myLead)
    //     // for(let i = 0; i<tab.length;i++){
    //     //     console.log(tab[0].url)
    //     // }

    //   let [tab] = await chrome.tabs.query(queryOptions);
    //   return tab;
    // }

    chrome.tabs.query({active: true, currentWindow: true},function(tabs){
        myLead.push(tabs[0].url)

        // SAVING MY LEADS TO LOCALSTORAGE
        localStorage.setItem('myLead',JSON.stringify(myLead))

        render(myLead)
        // for(let i = 0; i<tab.length;i++){
        //     console.log(tab[0].url)
        // }
    })


})

function render(j){
    let listItems = ''

    for ( let i = 0; i< j.length ; i++){
        listItems += `<li>
                            <a target='_blank' href='${j[i]}'>${j[i]}</a>
                    </li>`
        // ulEl.innerHTML += "<li>"+myLead[i] + "</li>"
        // console.log(listItems)

    }
    ulEl.innerHTML =listItems
}

deleteBtn.addEventListener('dblclick',function(){
    localStorage.clear()
    myLead = []
    render(myLead)

})
console.log(leadsFromLocalStorage)


inputBtn.addEventListener('click',function (){


    myLead.push(inputEl.value)
    inputEl.value=''
    // SAVING MY LEADS TO LOCALSTORAGE
    localStorage.setItem('myLead',JSON.stringify(myLead))

    render(myLead)

    console.log(localStorage.getItem("myLead"))
})



