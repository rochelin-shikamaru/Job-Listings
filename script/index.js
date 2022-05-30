let data = [];
let count = 0;
let newData = [];
let newArr = [];


const fetchData = async () =>{
    const response = await fetch('../../data.json');
    data = await response.json();
    showUser(data);
}
fetchData().catch(e => console.log("look your network"));

const showUser = (data) =>{
    data.map(item =>{
        const {id, company, logo, New, featured, position, role, level, postedAt, contract, location, languages,tools} = item;
        const aside = document.createElement("aside");
        document.querySelector("section").appendChild(aside);

        
        aside.innerHTML = 
            `   
            <div class="logoInformation">
                <div class="logoInformation__logo">
                    <img src=${logo} alt=${company}>
                </div>
                <div class="logoInformation__information">
                     <p>
                       <span class="logoInformation__information--company">${company}</span>${New ? `<span class="logoInformation__information--new">NEW!</span>`: ""}${featured ? `<span class="logoInformation__information--featured">FEATURED</span>`:""}<br>
                       <span class="logoInformation__information--position">${position}</span><br>
                       <span class="logoInformation__information--postedAt">${postedAt} -</span><span class="logoInformation__information--contract">${contract} -</span><span class="logoInformation__information--location">${location}</span>
                    </p>
                </div>
            </div>
            <div class="mini-border"></div>
            <div class="skills">
                <span onclick="openFilter(event)">${level}</span><span onclick="openFilter(event)">${role}</span>
            </div>
                
          `
        insertSpan(languages);
        insertSpan (tools);
    });
    const featured =  document.querySelectorAll(".logoInformation__information--featured");
    featured.forEach(item =>{
        item.parentElement.parentElement.parentElement.parentElement.style.borderLeft = "8px solid #2e9a9a";
    })
       

}
// function to insert a span in the bloc element skills
const insertSpan = (data) =>{
    data.map(item => {
        const span = document.createElement("span");
        const all = document.querySelectorAll(".skills");
        span.setAttribute("onclick", "openFilter(event)");
        span.innerHTML = item;
        all.forEach(item =>{
             item.appendChild(span);
         });
        })
}

// open filter bars

/// first display the search bars to block
/// second display all children of section to none
/// also filtering data


const openFilter = (e)=>{
    document.querySelector(".searchBar").style.display = "block";

    for(let i = 0; i < document.querySelector("section").children.length; i++){
        document.querySelector("section").children[i].style.display = "none";
    }

    if(count == 0){
        newData = data.filter(item => item.languages.includes(e.target.innerText) || item.tools.includes(e.target.innerText) || item.level == e.target.innerText || item.role == e.target.innerText);
        newArr.push(newData);

        showUser(newData);
        count = 1;
    }else{
        newData = newData.filter(item => item.languages.includes(e.target.innerText) || item.tools.includes(e.target.innerText) || item.level == e.target.innerText || item.role == e.target.innerText);
        newArr.push(newData);
        console.log(newArr);
        
        showUser(newData);
        count ++;
    }
    
    console.log(newData);
    
    addElementFilter(e.target.innerText);

    
}

// close filter bars

const handleRemove = () =>{
    document.querySelector(".searchBar").style.display = "none";

    for(let i = 0; i < document.querySelector(".searchBar__container--filter").children.length; i++){
        document.querySelector(".searchBar__container--filter").children[i].style.display = "none";
    }
    for(let i = 0; i < document.querySelector("section").children.length; i++){
        document.querySelector("section").children[i].style.display = "none";
    }
    showUser(data);
    count = 0;
    newArr = [];
}

// function to put an element inside the filter
const addElementFilter = (el) =>{
    if(!document.querySelector(".searchBar__container--filter").innerText.includes(el)){
        const span = document.createElement("span");
        span.classList.add("searchBar__container__element");
        document.querySelector(".searchBar__container--filter").appendChild(span);
        span.innerHTML = `${el}<i onclick="handleCross(event)" class="fa-solid fa-xmark"></i>`;
    }else{
        
        newArr = newArr.slice(0, newArr.length - 1);
    }
}

// function to close element filter


const handleCross = (e)=>{
    e.target.parentElement.remove();

    for(let i = 0; i < document.querySelector("section").children.length; i++){
        document.querySelector("section").children[i].style.display = "none";
    }

    if(document.querySelector(".searchBar__container--filter").children.length > 0){
        newArr = newArr.slice(0, newArr.length - 1);
        newData = newArr[newArr.length - 1];
        console.log(newArr);
        showUser(newArr[newArr.length - 1]);
        count--;
    }else{
        showUser(data);
        newArr = [];
        count = 0;
    }
    
}

