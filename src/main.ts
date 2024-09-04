import './style.css'
//GET
//gifts endpoint
let results : Array<Object> = await FetchGifts() as any;
const app : HTMLDivElement = document.querySelector<HTMLDivElement>('#app')!;
let allDiv : HTMLDivElement = document.createElement("div") as HTMLDivElement;
let h1 : HTMLHeadingElement = document.createElement("h1") as HTMLHeadingElement;
h1.innerHTML = "/gifts";
allDiv.appendChild(h1);
CreateTableWithData(results, allDiv, "all");
app.appendChild(allDiv);
//gift endpoint
let customDiv : HTMLDivElement = document.createElement("div") as HTMLDivElement;
let select : HTMLSelectElement = document.createElement("select") as HTMLSelectElement;
for (let i : number = 0; i < results.length; i++)
{
    let option : HTMLOptionElement = document.createElement("option") as HTMLOptionElement;
    option.innerHTML = Object.values(results[i])[0];
    option.value = Object.values(results[i])[0];
    option.addEventListener("click", function()
    {
        DataQuery(option.value, customDiv)
    });
    select.append(option);
}
h1 = document.createElement("h1") as HTMLHeadingElement;
h1.innerHTML = "/gift?id=";
h1.append(select);
customDiv.appendChild(h1);
app.appendChild(customDiv);

//OTHER METHODS
let otherMethodsDiv : HTMLDivElement = document.createElement("div") as HTMLDivElement;
h1 = document.createElement("h1") as HTMLHeadingElement;
h1.innerHTML = "/gift - POST, DELETE, PUT";
let response : any;
//POST
let postButton : HTMLButtonElement = document.createElement("button") as HTMLButtonElement;
postButton.innerHTML = "POST example"
let postExampleData = {
    name: "LG TV",
    price: 3000000,
    avaiable: true
}
let postOption = {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify(postExampleData)
}
postButton.addEventListener("click", async () => 
{
    response = await fetch("http://127.0.0.1:5555/gift", postOption).then(response => response.json()).then(data => Object.values(data));
})
//DELETE
let deleteButton : HTMLButtonElement = document.createElement("button") as HTMLButtonElement;
deleteButton.innerHTML = "DELETE example";
let deleteOption = {
    method: "DELETE"
}
deleteButton.addEventListener("click", async () => 
{
    response = await fetch("http://127.0.0.1:5555/gift?id=3", deleteOption).then(response => response.json()).then(data => Object.values(data));
})
//PUT
let putButton : HTMLButtonElement = document.createElement("button") as HTMLButtonElement;
putButton.innerHTML = "PUT example";
let putExampleData = {
    name: "XBOX SERIES-Y",
    price: 400,
    avaiable: true
}
let putOption = {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    method: "PUT",
    body: JSON.stringify(putExampleData)
}
putButton.addEventListener("click", async () => 
{
    response = await fetch("http://127.0.0.1:5555/gift?id=2", putOption).then(response => response.json()).then(data => Object.values(data));
})
let responseDiv : HTMLDivElement = document.createElement("div") as HTMLDivElement;
responseDiv.innerHTML = response;
otherMethodsDiv.append(h1);
otherMethodsDiv.append(postButton);
otherMethodsDiv.append(deleteButton);
otherMethodsDiv.append(putButton);
app.append(otherMethodsDiv);
app.append(responseDiv);

async function FetchGifts()
{
    let results : Array<Object> = await fetch("http://127.0.0.1:5555/gifts").then(response => response.json()).then(data => {return data;});
    return results;
}

async function DataQuery(value : string, appendPlace : HTMLDivElement)
{
    document.getElementById("custom")?.remove();
    if (value != "")
    {
        try 
        {
            let result : Array<Object> = await fetch("http://127.0.0.1:5555/gift?id=" + value).then(response => response.json()).then(data => {return data;});
            CreateTableWithData(result, appendPlace, "custom");
        } 
        catch (error) 
        {
            alert("Nincs ilyen adat az adatbázisban");
        }
    }
}

function CreateTableWithData(data : Array<Object>, appendPlace : HTMLDivElement, tableId : string)
{
    let table : HTMLTableElement = document.createElement("table") as HTMLTableElement;
    table.id = tableId;
    appendPlace.appendChild(table);
    let tr : HTMLTableRowElement = document.createElement("tr") as HTMLTableRowElement;
    table.appendChild(tr);
    for (let i : number = 0; i < Object.keys(data[0]).length; i++)
    {
        let th : HTMLTableCellElement = document.createElement("th") as HTMLTableCellElement;
        th.innerHTML = Object.keys(data[0])[i] as string;
        tr.appendChild(th);
    }
    for (let i : number = 0; i < data.length; i++)
    {
        let tr : HTMLTableRowElement = document.createElement("tr") as HTMLTableRowElement;
        table.appendChild(tr);
        console.log(Object.values(data[i]))
        for (let y : number = 0; y < Object.values(data[i]).length; y++)
        {
            let td : HTMLTableCellElement = document.createElement("td") as HTMLTableCellElement;
            if (y != 3)
            {
                td.innerHTML = Object.values(data[i])[y] as string;
            }
            else if (y == 3)
            {
                td.innerHTML = Object.values(data[i])[y] as string;
            }
            tr.appendChild(td);
        }
    }
}

/*
function UpdateTable(data : Array<Object>, tableId : string)
{
    let table : HTMLTableElement = document.getElementById(tableId) as HTMLTableElement;
    RemoveAllChildrenOfAnElement(table);
    let tr : HTMLTableRowElement = document.createElement("tr") as HTMLTableRowElement;
    table.appendChild(tr);
    for (let i : number = 0; i < Object.keys(data[0]).length; i++)
    {
        let th : HTMLTableCellElement = document.createElement("th") as HTMLTableCellElement;
        th.innerHTML = Object.keys(data[0])[i] as string;
        tr.appendChild(th);
    }
    for (let i : number = 0; i < data.length; i++)
    {
        let tr : HTMLTableRowElement = document.createElement("tr") as HTMLTableRowElement;
        table.appendChild(tr);
        for (let y : number = 0; y < Object.values(data[i]).length; y++)
        {
            let td : HTMLTableCellElement = document.createElement("td") as HTMLTableCellElement;
            td.innerHTML = Object.values(data[i])[y] as string;
            tr.appendChild(td);
        }
    }
}

function RemoveAllChildrenOfAnElement(element : HTMLElement)
{
    while (element.lastChild)
    {
        element.removeChild(element.lastChild);
    }
}
*/