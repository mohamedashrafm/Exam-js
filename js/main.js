let loading = document.getElementById("loading");
let search_name = document.querySelector(".search")

// SHOW AND CLOSE DRAWER
let drawer = document.querySelector(".drawer");
let drawer_btn_open = document.querySelector(".drawer_control .menu");
let drawerItems = document.querySelector(".drawer ul")
let drawerMode = true

drawer_btn_open.addEventListener("click", () => {
    drawer.classList.toggle("drawer_show")
    if (drawerMode) {
        drawerMode = false;
        drawer_btn_open.innerHTML = `<i class="fa-solid fa-x"></i>`;
        drawerItems.style.display = "block"
    } else {
        drawerMode = true;
        drawer_btn_open.innerHTML = `<i class="fa-solid fa-bars-staggered"></i>`;
        drawerItems.style.display = "none"
    }
})

// ==========
// GET DATA FROM API AND DESPLAYED THEM IN WEBSITE --> MAIN
let main = document.getElementById("main");
fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=")
    .then(res => {
        return res.json();
    })
    .then(data => {
        let items = ""
        if (data.meals) {
            for (let i = 0; i < data.meals.length; i++) {
                items += `
            <section onclick = "ShowSingleProduct(${data.meals[i].idMeal})">
                <img src="${data.meals[i].strMealThumb}" alt="">
                <div class="overlaw">
                    <h3 class="title">${data.meals[i].strMeal}</h3>
                </div>
            </section>
            `
            }
            main.innerHTML = items;
            loading.style.display = "none"
        } else {
            loading.style.display = "flex"
        }
    })

// ===============
// GET DATA FROM API AND DESPLAYED THEM IN WEBSITE--> SINGLE PRODUCT
let single_product = document.querySelector(".single_product");

function ShowSingleProduct(i) {
    drawer.classList.remove("drawer_show")
    drawer_btn_open.innerHTML = `<i class="fa-solid fa-bars-staggered"></i>`;
    // 
    search_container_results.style.display="none";
    // searchName.style.display = "none";
    search_name.classList.replace("d-flex","d-none");
    contact.classList.replace("d-flex","d-none");

    filter_all_Ingredients.style.display="none";

    single_product.style.display = "flex";
    all_categories.style.display = "none";
    main.style.display = "none"
    all_area.style.display = "none";
    filter_all_area.style.display="none";
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${i}`)
        .then(res => {
            return res.json();
        })
        .then(data => {
            single_product.innerHTML = `
        <div class="right">
            <div class="logo"><img loading="lazy" src="${data.meals[0].strMealThumb}" alt=""></div>
            <h1 class="title">${data.meals[0].strMeal}</h1>
        </div>
        <div class="left">
            <h1>Instructions</h1>
            <p class="describtion">${data.meals[0].strInstructions}</p>
            <p class="item"><b>Area : </b> ${data.meals[0].strArea} </p>
            <p class="item"><b>Category : </b> ${data.meals[0].strCategory} </p>
            <p class="item">Recipes :</p>
            <div class="recipes_items">
                <span>${data.meals[0].strMeasure1} ${data.meals[0].strIngredient1}</span>
                <span>${data.meals[0].strMeasure2} ${data.meals[0].strIngredient2}</span>
                <span>${data.meals[0].strMeasure3} ${data.meals[0].strIngredient3}</span>
                <span>${data.meals[0].strMeasure4} ${data.meals[0].strIngredient4}</span>
                <span>${data.meals[0].strMeasure5} ${data.meals[0].strIngredient5}</span>
                <span>${data.meals[0].strMeasure6} ${data.meals[0].strIngredient6}</span>
                <span>${data.meals[0].strMeasure7} ${data.meals[0].strIngredient7}</span>
                <span>${data.meals[0].strMeasure8} ${data.meals[0].strIngredient8}</span>
            </div>
            <p class="item">Tags :</p>
            <div class="tags_items">
                ${data.meals[0].strTags}
            </div>
            <div class="two_links">
                <a class="link1" href="${data.meals[0].strSource}">source</a>
                <a class="link2" href="${data.meals[0].strYoutube}">youtube</a>
            </div>
        </div>
    `
        })
}
// GET DATA FROM API AND DESPLAYED THEM IN WEBSITE --> all_area
let all_area = document.getElementById("all_area");
let filter_all_area = document.querySelector(".filter_all_area")

//======== show all area
function ShowAllArea(i) {
    loading.style.display = "flex"

    drawer.classList.remove("drawer_show")
    drawer_btn_open.innerHTML = `<i class="fa-solid fa-bars-staggered"></i>`;
    drawerMode = true
    // 
    all_area.style.display = "grid";
    single_area.style.display = "none";
    all_categories.style.display = "none";
    contact.classList.replace("d-flex","d-none");
    search_name.classList.replace("d-flex","d-none");
    filter_all_Ingredients.style.display="none";

     filter_all_area.style.display="none";
    single_product.style.display = "none";
    main.style.display = "none"
    //========= fetch
    fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=${i}`)
        .then(res => {
            return res.json();
        })
        .then(data => {
           
            let items = ""
            if (data.meals) {
                for (let i = 0; i < data.meals.length; i++) {
                    items += `
            <section onclick = "FilterAllArea('${data.meals[i].strArea}')">
                   <div class="icon">
                       <i class="fa-solid fa-house-laptop"></i>
                  </div>
                <div>
                    <h3>${data.meals[i].strArea}</h3>
                </div>
            </section>
            `
                }
                all_area.innerHTML = items;
                loading.style.display = "none"
            } else {
                loading.style.display = "flex"
            }
        })

}

//======== filter all area

function FilterAllArea(area) {
    loading.style.display = "flex"

    drawer.classList.remove("drawer_show")
    drawer_btn_open.innerHTML = `<i class="fa-solid fa-bars-staggered"></i>`;
    drawerMode = true
    // 
    single_area.style.display = "none";
    all_categories.style.display = "none";
    contact.classList.replace("d-flex","d-none");
    search_name.classList.replace("d-flex","d-none");
    filter_all_Ingredients.style.display="none";

    all_area.style.display = "none";
    filter_all_area.style.display = "grid";
    single_product.style.display = "none";
    main.style.display = "none"
    //========= fetch
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
        .then(res => {
            return res.json();
        })
        .then(data => {
            console.log(data);
            let items = ""
            if (data.meals) {
                for (let i = 0; i < data.meals.length; i++) {
                    items += `
                <section onclick = "ShowSingleArea(${data.meals[i].idMeal})">
                      <img src="${data.meals[i].strMealThumb}" alt="">
                     <div class="overlaw">
                         <h3 class="title">${data.meals[i].strMeal} </h3>
                     </div>
                </section>
                `
                }
                filter_all_area.innerHTML = items;
                loading.style.display = "none"
            } else {
                loading.style.display = "flex"
            }
        })

}


// GET DATA FROM API AND DESPLAYED THEM IN WEBSITE--> SINGLE AREA
let single_area = document.querySelector(".single_area");

function ShowSingleArea(i) {
    drawer.classList.remove("drawer_show")
    drawer_btn_open.innerHTML = `<i class="fa-solid fa-bars-staggered"></i>`;
    // 
    single_area.style.display = "flex";
    contact.classList.replace("d-flex","d-none");
    search_name.classList.replace("d-flex","d-none");
    filter_all_Ingredients.style.display="none";

    all_categories.style.display = "none";
    main.style.display = "none"
    all_area.style.display = "none";
    filter_all_area.style.display="none";
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${i}`)
        .then(res => {
            return res.json();
        })
        .then(data => {
            single_area.innerHTML = `
        <div class="right">
            <div class="logo"><img loading="lazy" src="${data.meals[0].strMealThumb}" alt=""></div>
            <h1 class="title">${data.meals[0].strMeal}</h1>
        </div>
        <div class="left">
            <h1>Instructions</h1>
            <p class="describtion">${data.meals[0].strInstructions}</p>
            <p class="item"><b>Area : </b> ${data.meals[0].strArea} </p>
            <p class="item"><b>Category : </b> ${data.meals[0].strCategory} </p>
            <p class="item">Recipes :</p>
            <div class="recipes_items">
                <span>${data.meals[0].strMeasure1} ${data.meals[0].strIngredient1}</span>
                <span>${data.meals[0].strMeasure2} ${data.meals[0].strIngredient2}</span>
                <span>${data.meals[0].strMeasure3} ${data.meals[0].strIngredient3}</span>
                <span>${data.meals[0].strMeasure4} ${data.meals[0].strIngredient4}</span>
                <span>${data.meals[0].strMeasure5} ${data.meals[0].strIngredient5}</span>
                <span>${data.meals[0].strMeasure6} ${data.meals[0].strIngredient6}</span>
                <span>${data.meals[0].strMeasure7} ${data.meals[0].strIngredient7}</span>
                <span>${data.meals[0].strMeasure8} ${data.meals[0].strIngredient8}</span>
            </div>
            <p class="item">Tags :</p>
            <div class="tags_items">
                ${data.meals[0].strTags}
            </div>
            <div class="two_links">
                <a class="link1" href="${data.meals[0].strSource}">source</a>
                <a class="link2" href="${data.meals[0].strYoutube}">youtube</a>
            </div>
        </div>
    `
        })
}
// GET DATA FROM API AND DESPLAYED THEM IN WEBSITE --> all_Ingredients
let all_Ingredients = document.getElementById("all_Ingredients");
let filter_all_Ingredients = document.querySelector(".filter_all_Ingredients")

//======== show all_Ingredients
function ShowAllIngredients(i) {
    loading.style.display = "flex"

    drawer.classList.remove("drawer_show")
    drawer_btn_open.innerHTML = `<i class="fa-solid fa-bars-staggered"></i>`;
    drawerMode = true
    // 
    all_area.style.display = "none";
    all_Ingredients.style.display = "grid";
    single_Ingredients.style.display = "none";
    single_area.style.display = "none";
    all_categories.style.display = "none";
    contact.classList.replace("d-flex","d-none");
    search_name.classList.replace("d-flex","d-none");

    filter_all_Ingredients.style.display="none";
     filter_all_area.style.display="none";
    single_product.style.display = "none";
    main.style.display = "none"
    //========= fetch
    fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=${i}`)
        .then(res => {
            return res.json();
        })
        .then(data => {
           
            let items = ""
            if (data.meals) {
                for (let i = 0; i < data.meals.length; i++) {
                    items += `
            <section onclick = "filterAllIngredients('${data.meals[i].strIngredient}')">
                   <div class="icon">
                       <i class="fa-solid fa-drumstick-bite"></i>
                  </div>
                <div>
                    <h3>${data.meals[i].strIngredient}</h3>
                    <p>${data.meals[i].strDescription}</p>
                </div>
            </section>
            `
                }
                all_Ingredients.innerHTML = items;
                loading.style.display = "none"
            } else {
                loading.style.display = "flex"
            }
        })

}

//======== filter all_Ingredients

function filterAllIngredients(ing) {
    loading.style.display = "flex"

    drawer.classList.remove("drawer_show")
    drawer_btn_open.innerHTML = `<i class="fa-solid fa-bars-staggered"></i>`;
    drawerMode = true
    // 
    single_Ingredients.style.display = "none";
    single_area.style.display = "none";
    all_area.style.display = "none";
    all_Ingredients.style.display = "none";
    all_categories.style.display = "none";
    filter_all_categories.style.display = "none";
    contact.classList.replace("d-flex","d-none");
    search_name.classList.replace("d-flex","d-none");

    all_area.style.display = "none";
    filter_all_Ingredients.style.display = "grid";
    filter_all_area.style.display = "none";
    single_product.style.display = "none";
    main.style.display = "none"
    //========= fetch
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ing}`)
        .then(res => {
            return res.json();
        })
        .then(data => {
            console.log(data);
            let items = ""
            if (data.meals) {
                for (let i = 0; i < data.meals.length; i++) {
                    items += `
                <section onclick = "ShowSingleIngredients(${data.meals[i].idMeal})">
                      <img src="${data.meals[i].strMealThumb}" alt="">
                     <div class="overlaw">
                         <h3 class="title">${data.meals[i].strMeal} </h3>
                     </div>
                </section>
                `
                }
                filter_all_Ingredients.innerHTML = items;
                loading.style.display = "none"
            } else {
                loading.style.display = "flex"
            }
        })

}


// GET DATA FROM API AND DESPLAYED THEM IN WEBSITE--> SINGLE all_Ingredients
let single_Ingredients = document.querySelector(".single_Ingredients");

function ShowSingleIngredients(i) {
    drawer.classList.remove("drawer_show")
    drawer_btn_open.innerHTML = `<i class="fa-solid fa-bars-staggered"></i>`;
    // 
    single_area.style.display = "none";
    single_Ingredients.style.display = "flex";
    filter_all_Ingredients.style.display="none";
    all_Ingredients.style.display = "none";
    contact.classList.replace("d-flex","d-none");
    search_name.classList.replace("d-flex","d-none");

    
    all_categories.style.display = "none";
    main.style.display = "none"
    all_area.style.display = "none";
    filter_all_area.style.display="none";

    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${i}`)
        .then(res => {
            return res.json();
        })
        .then(data => {
            single_Ingredients.innerHTML = `
        <div class="right">
            <div class="logo"><img loading="lazy" src="${data.meals[0].strMealThumb}" alt=""></div>
            <h1 class="title">${data.meals[0].strMeal}</h1>
        </div>
        <div class="left">
            <h1>Instructions</h1>
            <p class="describtion">${data.meals[0].strInstructions}</p>
            <p class="item"><b>Area : </b> ${data.meals[0].strArea} </p>
            <p class="item"><b>Category : </b> ${data.meals[0].strCategory} </p>
            <p class="item">Recipes :</p>
            <div class="recipes_items">
                <span>${data.meals[0].strMeasure1} ${data.meals[0].strIngredient1}</span>
                <span>${data.meals[0].strMeasure2} ${data.meals[0].strIngredient2}</span>
                <span>${data.meals[0].strMeasure3} ${data.meals[0].strIngredient3}</span>
                <span>${data.meals[0].strMeasure4} ${data.meals[0].strIngredient4}</span>
                <span>${data.meals[0].strMeasure5} ${data.meals[0].strIngredient5}</span>
                <span>${data.meals[0].strMeasure6} ${data.meals[0].strIngredient6}</span>
                <span>${data.meals[0].strMeasure7} ${data.meals[0].strIngredient7}</span>
                <span>${data.meals[0].strMeasure8} ${data.meals[0].strIngredient8}</span>
            </div>
            <p class="item">Tags :</p>
            <div class="tags_items">
                ${data.meals[0].strTags}
            </div>
            <div class="two_links">
                <a class="link1" href="${data.meals[0].strSource}">source</a>
                <a class="link2" href="${data.meals[0].strYoutube}">youtube</a>
            </div>
        </div>
    `
        })
}





// GET DATA FROM API AND DESPLAYED THEM IN WEBSITE --> all_categories
let all_categories = document.getElementById("all_categories");
let filter_all_categories = document.querySelector(".filter_all_categories")

//======== show all_categories
function ShowAllCategories(i) {
    loading.style.display = "flex"

    drawer.classList.remove("drawer_show")
    drawer_btn_open.innerHTML = `<i class="fa-solid fa-bars-staggered"></i>`;
    drawerMode = true
    // 
    filter_all_categories.style.display = "none";
    contact.classList.replace("d-flex","d-none");
    search_name.classList.replace("d-flex","d-none");
    single_Ingredients.style.display = "none";
    filter_all_Ingredients.style.display="none";
    all_Ingredients.style.display = "none";
    single_categories.style.display = "none";
    all_categories.style.display = "grid";
    all_area.style.display = "none";
     filter_all_area.style.display="none";
    single_product.style.display = "none";
    main.style.display = "none"
    //========= fetch
    fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
        .then(res => {
            return res.json();
        })
        .then(data => {
           
            let items = ""
            if (data.categories) {
                for (let i = 0; i < data.categories.length; i++) {
                    items += `
            <section onclick = "FilterAllCategories('${data.categories[i].strCategory}')">
            <img src="${data.categories[i].strCategoryThumb}"   alt="">
            <div class="overlaw">
                <h3 class="">${data.categories[i].strCategory}</h3>
                <p>${data.categories[i].strCategoryDescription}</p>
            </div>
         </section>
            `
                }
                all_categories.innerHTML = items;
                loading.style.display = "none"
            } else {
                loading.style.display = "flex"
            }
        })

}

//======== filter all categorise

function FilterAllCategories(cate) {
    loading.style.display = "flex"

    drawer.classList.remove("drawer_show")
    drawer_btn_open.innerHTML = `<i class="fa-solid fa-bars-staggered"></i>`;
    drawerMode = true
    // 
    single_categories.style.display = "none";
    contact.classList.replace("d-flex","d-none");
    search_name.classList.replace("d-flex","d-none");
    single_Ingredients.style.display = "none";
    filter_all_Ingredients.style.display="none";
    all_Ingredients.style.display = "none";
    all_area.style.display = "none";
    filter_all_categories.style.display = "grid";
    all_categories.style.display = "none";
    filter_all_area.style.display = "none";
    single_product.style.display = "none";
    main.style.display = "none"
    //========= fetch
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${cate}`)
        .then(res => {
            return res.json();
        })
        .then(data => {
            console.log(data);
            let items = ""
            if (data.meals) {
                for (let i = 0; i < data.meals.length; i++) {
                    items += `
                <section onclick = "ShowSingleCategories(${data.meals[i].idMeal})">
                      <img src="${data.meals[i].strMealThumb}" alt="">
                     <div class="overlaw">
                         <h3 class="title">${data.meals[i].strMeal} </h3>
                     </div>
                </section>
                `
                }
                filter_all_categories.innerHTML = items;
                loading.style.display = "none"
            } else {
                loading.style.display = "flex"
            }
        })

}

// GET DATA FROM API AND DESPLAYED THEM IN WEBSITE--> SINGLE categorise
let single_categories = document.querySelector(".single_categories");

function ShowSingleCategories(i) {
    drawer.classList.remove("drawer_show")
    drawer_btn_open.innerHTML = `<i class="fa-solid fa-bars-staggered"></i>`;
    // 
    single_categories.style.display = "flex";
    all_categories.style.display = "none";
    contact.classList.replace("d-flex","d-none");
    search_name.classList.replace("d-flex","d-none");
    single_Ingredients.style.display = "none";
    filter_all_Ingredients.style.display="none";
    all_Ingredients.style.display = "none";
    main.style.display = "none"
    all_area.style.display = "none";
    filter_all_categories.style.display="none";
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${i}`)
        .then(res => {
            return res.json();
        })
        .then(data => {
            single_categories.innerHTML = `
        <div class="right">
            <div class="logo"><img loading="lazy" src="${data.meals[0].strMealThumb}" alt=""></div>
            <h1 class="title">${data.meals[0].strMeal}</h1>
        </div>
        <div class="left">
            <h1>Instructions</h1>
            <p class="describtion">${data.meals[0].strInstructions}</p>
            <p class="item"><b>Area : </b> ${data.meals[0].strArea} </p>
            <p class="item"><b>Category : </b> ${data.meals[0].strCategory} </p>
            <p class="item">Recipes :</p>
            <div class="recipes_items">
                <span>${data.meals[0].strMeasure1} ${data.meals[0].strIngredient1}</span>
                <span>${data.meals[0].strMeasure2} ${data.meals[0].strIngredient2}</span>
                <span>${data.meals[0].strMeasure3} ${data.meals[0].strIngredient3}</span>
                <span>${data.meals[0].strMeasure4} ${data.meals[0].strIngredient4}</span>
                <span>${data.meals[0].strMeasure5} ${data.meals[0].strIngredient5}</span>
                <span>${data.meals[0].strMeasure6} ${data.meals[0].strIngredient6}</span>
                <span>${data.meals[0].strMeasure7} ${data.meals[0].strIngredient7}</span>
                <span>${data.meals[0].strMeasure8} ${data.meals[0].strIngredient8}</span>
            </div>
            <p class="item">Tags :</p>
            <div class="tags_items">
                ${data.meals[0].strTags}
            </div>
            <div class="two_links">
                <a class="link1" href="${data.meals[0].strSource}">source</a>
                <a class="link2" href="${data.meals[0].strYoutube}">youtube</a>
            </div>
        </div>
    `
        })
}

// ==========  search=========

let search_letter = document.querySelector(".searchLetter")
let searchByName = document.querySelector(".searchByName")





//======== show all_search
function ShowAllSearch() {

    loading.style.display = "none"

    drawer.classList.remove("drawer_show")
    drawer_btn_open.innerHTML = `<i class="fa-solid fa-bars-staggered"></i>`;
    drawerMode = true
    // 
    search_name.classList.replace("d-none","d-flex");
    contact.classList.replace("d-flex","d-none");

    single_categories.style.display = "none";
     
    all_area.style.display = "none";
     filter_all_area.style.display="none";
    single_product.style.display = "none";
    main.style.display = "none"
   

}



let search_container_results = document.querySelector(".search .search_container");
 

function search(id,val){
    search_container_results.style.display="grid";
    loading.style.display="flex";
    if(val !==""){
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${val}`)
        .then(res =>{return res.json();})
        .then(data =>{
            if(data.meals){
                let items= "";
                for(let i=0 ; i<data.meals.length ; i++){
                    items +=`
                    <section onclick = "ShowSingleProduct(${data.meals[i].idMeal})">
                        <img src="${data.meals[i].strMealThumb}" alt="">
                        <div class="overlaw">
                            <h3 class="title">${data.meals[i].strMeal}</h3>
                        </div>
                    </section>
                    `
                }
                search_container_results.innerHTML = items ;
                loading.style.display="none";
            }
        })
    }else{
        search_container_results.innerHTML = "" ;
        loading.style.display="none";
    }
}


let contact = document.querySelector(".contact")

function ShowAllContact() {

    loading.style.display = "none"

    drawer.classList.remove("drawer_show")
    drawer_btn_open.innerHTML = `<i class="fa-solid fa-bars-staggered"></i>`;
    drawerMode = true
    // 
    contact.classList.replace("d-none","d-flex");

    search_name.classList.replace("d-flex","d-none");

    single_categories.style.display = "none";
     
    all_area.style.display = "none";
     filter_all_area.style.display="none";
    single_product.style.display = "none";
    main.style.display = "none"
   

}

//============================
let alert_name = document.querySelector("#alert_name")
let nameInput = document.querySelector("#nameInput")

nameInput.addEventListener("change",validName)
function validName(){
    let regName = /^[a-zA-Z ]+$/
    if (regName.test(nameInput.value)){
        nameInput.classList.add("is-valid")
        nameInput.classList.remove("is-invalid")
        alert_name.classList.replace("d-block","d-none")

    }else{
        nameInput.classList.add("is-invalid")
        nameInput.classList.remove("is-valid")
        alert_name.classList.replace("d-none","d-block")
    }
}

//============================
let alert_input = document.querySelector("#alert_input")
let emailInput = document.querySelector("#emailInput")

nameInput.addEventListener("change",validEmail)
function validEmail(){
    let regName = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (regName.test(emailInput.value)){
        emailInput.classList.add("is-valid")
        emailInput.classList.remove("is-invalid")
        alert_input.classList.replace("d-block","d-none")

    }else{
        emailInput.classList.add("is-invalid")
        emailInput.classList.remove("is-valid")
        alert_input.classList.replace("d-none","d-block")
    }
}
//============================
let alert_phone = document.querySelector("#alert_phone")
let phoneInput = document.querySelector("#phoneInput")

nameInput.addEventListener("change",validPhone)
function validPhone(){
    let regName = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
    if (regName.test(phoneInput.value)){
        phoneInput.classList.add("is-valid")
        phoneInput.classList.remove("is-invalid")
        alert_phone.classList.replace("d-block","d-none")

    }else{
        phoneInput.classList.add("is-invalid")
        phoneInput.classList.remove("is-valid")
        alert_phone.classList.replace("d-none","d-block")
    }
}
//============================
let alert_age = document.querySelector("#alert_age")
let ageInput = document.querySelector("#ageInput")

nameInput.addEventListener("change",validAge)
function validAge(){
    let regName = /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/
    if (regName.test(ageInput.value)){
        ageInput.classList.add("is-valid")
        ageInput.classList.remove("is-invalid")
        alert_age.classList.replace("d-block","d-none")

    }else{
        ageInput.classList.add("is-invalid")
        ageInput.classList.remove("is-valid")
        alert_age.classList.replace("d-none","d-block")
    }
}
//============================
let alert_password = document.querySelector("#alert_password")
let passwordInput = document.querySelector("#passwordInput")

nameInput.addEventListener("change",validPassword)
function validPassword(){
    let regName = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/
    if (regName.test(passwordInput.value)){
        passwordInput.classList.add("is-valid")
        passwordInput.classList.remove("is-invalid")
        alert_password.classList.replace("d-block","d-none")

    }else{
        passwordInput.classList.add("is-invalid")
        passwordInput.classList.remove("is-valid")
        alert_password.classList.replace("d-none","d-block")
    }
}
//============================
let alert_repassword = document.querySelector("#alert_repassword")
let repasswordInput = document.querySelector("#repasswordInput")

nameInput.addEventListener("change",validPassword)
function validPassword(){
    let regName = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/
    if (regName.test(repasswordInput.value)){
        repasswordInput.classList.add("is-valid")
        repasswordInput.classList.remove("is-invalid")
        alert_repassword.classList.replace("d-block","d-none")

    }else{
        repasswordInput.classList.add("is-invalid")
        repasswordInput.classList.remove("is-valid")
        alert_repassword.classList.replace("d-none","d-block")
        return document.getElementById("repasswordInput").value == document.getElementById("passwordInput").value
        
    }
}
