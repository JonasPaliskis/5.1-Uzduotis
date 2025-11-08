"use strict";

///////////////////////////////////////////////
console.log("////////////////////////////"); 

console.log(""); 

////////////////////////////////////////////////////// 1

// let div = document.createElement("div");
// document.body.appendChild(div);

const products_name = "products";
let products      = JSON.parse(localStorage.getItem(products_name));
console.log(products);


const pr_id       = document.getElementById('pr_id');
const pr_name     = document.getElementById('pr_name');
const pr_quantity = document.getElementById('pr_quantity');
const pr_attributes = {};

// const products      = [];
// products.concat(JSON.parse(localStorage.getItem(products_name)));

const new_item =    document.getElementById("new_item");
const edit_item =   document.getElementById("edit_item");
const delete_item = document.getElementById("delete_item");

const table_1_place = "table_1";


function to_string(arr_of_obj){
  // console.log("to_string", products);
  arr_of_obj.sort((a, b) => Number(a.id) - Number(b.id));

  return JSON.stringify(arr_of_obj);
}

function print_table(arr_of_obj, table_place_in_thml){
      
      console.log(table_place_in_thml , "print_table ---------");
      console.log(table_place_in_thml, arr_of_obj);

      const table_place = document.getElementById(table_place_in_thml);
      const delete_table = table_place.querySelector("table");
      if(delete_table){
      delete_table.remove();
      console.log(table_place_in_thml, "remove table");
      }


      const table = document.createElement('table');
      table.classList="table table-bordered border-black bg-transparent";
      const thead = document.createElement('thead');
      const thead_tr = document.createElement('tr');

      const th_id       = document.createElement("th");
      const th_name     = document.createElement("th");
      const th_quantity = document.createElement("th");

      th_id.textContent       = "Product Code";
      th_id.scope="col";
      th_name.textContent     = "Product Name";
      th_name.scope="col";
      th_quantity.textContent = "Product Quantity";
      th_name.scope="col";


      table_place.appendChild(table);
      table.appendChild(thead);
      thead.appendChild(thead_tr);
      // table.appendChild(thead_tr);
      thead_tr.appendChild(th_id );
      thead_tr.appendChild(th_name);
      thead_tr.appendChild(th_quantity);
      
      for (const product of arr_of_obj) {

        console.log(table_place_in_thml, "print_row");

        let tr = document.createElement('tr');

        let td_id       = document.createElement('td');
        td_id.scope="row";
        let td_name     = document.createElement('td');
        let td_quantity = document.createElement('td');

        td_id.textContent       = product.id;
        td_name.textContent     = product.name;
        td_quantity.textContent = product.quantity;

        table.appendChild(tr);
        tr.appendChild(td_id);
        tr.appendChild(td_name);
        tr.appendChild(td_quantity);
      }
}
print_table(products, table_1_place);

function is_id_in_array(pr_id, arr_of_obj){
  const is_id_in = arr_of_obj.some((pr) => Number(pr.id) === Number(pr_id));
  // console.log("did found a reapeat", is_id_in);
  return is_id_in; 
}

function delete_element_html(error_place, error_type){
  const id_error_place = document.getElementById(error_place);
  const p_id_error = id_error_place.querySelector(error_type);
    if(p_id_error){
    p_id_error.remove();
    }
}

//////////////////////////////////////

// naujas objektas kuriamas
new_item.addEventListener("click", () => {
  event.preventDefault();
  products = JSON.parse(localStorage.getItem(products_name));
  console.log("new_item");

  pr_attributes.id = pr_id.value;
  pr_attributes.name = pr_name.value;
  pr_attributes.quantity = pr_quantity.value;

  

  if(is_id_in_array(pr_attributes.id, products)){  /// tikrina ar yra jau yra toks productas

    console.log("reapeat id");
    const id_error_place = document.getElementById("div_id");

    delete_element_html("div_id", "p"); /// istrina jei yra rodoma klaida
    
    const id_error = document.createElement("p");
    id_error.textContent = "*that id already exists";
    id_error.id = "id_error";
    id_error.style.color = "red";

    id_error_place.appendChild(id_error);
    print_table(products, table_1_place);

  } else {

    delete_element_html("div_id", "p");

    console.log(pr_attributes);
    products.push(pr_attributes);
    localStorage.setItem(products_name, to_string(products));
    products = JSON.parse(localStorage.getItem(products_name));
    print_table(products, table_1_place);
  }
});

edit_item.addEventListener("click", () => {
  event.preventDefault();
  products = JSON.parse(localStorage.getItem(products_name));
  console.log("edit_item");

  pr_attributes.id = pr_id.value;
  pr_attributes.name = pr_name.value;
  pr_attributes.quantity = pr_quantity.value;


    delete_element_html("div_id", "p");

    products = products.filter(product => product.id !== pr_attributes.id);

    console.log(pr_attributes);
    products.push(pr_attributes);
    localStorage.setItem(products_name, to_string(products));
    print_table(products, table_1_place);
  
});

delete_item.addEventListener("click", () => {
  event.preventDefault();
  products = JSON.parse(localStorage.getItem(products_name));
  console.log("edit_item");

  pr_attributes.id = pr_id.value;


    delete_element_html("div_id", "p");
   
    products = products.filter(product => product.id !== pr_attributes.id);

    console.log(pr_attributes);
    localStorage.setItem(products_name, to_string(products));
    print_table(products, table_1_place);
  
});

//////////////////////////////////////

const find_pr_id     = document.getElementById("find_pr_id");
const select_from_ls = document.getElementById("select_from_ls");
const table_2_place = "table_2";


select_from_ls.addEventListener("click", () => {
  event.preventDefault();
  console.log("select_from_ls");

  products = JSON.parse(localStorage.getItem(products_name));
  const pr_arr = [];
  
  if(is_id_in_array(find_pr_id.value, products)){  /// tikrina ar yra jau yra toks productas

    delete_element_html("find_div_id", "p");

    products = products.forEach( product => {
      if(product.id === find_pr_id.value){
        
        // console.log("find: ",product);
        pr_arr.push(product);
      }
    });    
    print_table(pr_arr, table_2_place);

  } else {

    console.log("reapeat id");
    const id_error_place = document.getElementById("find_div_id");

    delete_element_html("find_div_id", "p"); /// istrina jei yra rodoma klaida
    
    const id_error = document.createElement("p");
    id_error.textContent = "*that id doesn't exists";
    id_error.id = "id_";
    id_error.style.color = "red";

    id_error_place.appendChild(id_error);
    print_table(pr_arr, table_2_place);
  }
});
