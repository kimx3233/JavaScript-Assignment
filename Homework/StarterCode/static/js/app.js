// from data.js
var tableData = data;

// YOUR CODE HERE!
var tbody = d3.select("tbody");

function generateOption(key){
    var keyList = [...new Set(tableData.map(entry => entry[key]))]; 
    keyList.push("");

    var dropDown = d3.select("#"+key+"-dropdown");
    //generate the options in the dropdown menu
    keyList.forEach(uniqueKey =>  dropDown.append("option").text(uniqueKey) );
    console.log(keyList.length)
}

//generate options for shape and state dropdown menus
generateOption("shape")
generateOption("state")

//select filter and select button
var filterBtn = d3.select("#filter-btn");
var resetBtn = d3.select("#reset-btn");

//function used to fill table
function fillTable(dataTable){
    dataTable.forEach(entry => 
        {let row = tbody.append("tr");
            Object.entries(entry).forEach(
                ([key,value]) =>{
                    let cell = row.append("td");
                    cell.text(value)
                });
        });
}


// function which display default(unfiltered) data when "reset" button is clicked
function resetTable(){
    d3.event.preventDefault();
    //remove table contents first
    tbody.selectAll("tr").remove();
    //reset table with default(unfiltered) data
    fillTable(tableData);
};

// function used to filter data, dataEntry=entries of data from data.js, e.g. 'datetime','city'. While userInput=user input on the corresponding forms, 
// if user input is empty, then nothing is filtered, otherwise we filter according to user input
function checkContent(dataEntry,userInput){
    return (dataEntry === userInput) ||  (userInput === "");
}

//function which filter table data by criterion
function filterTable(){
    //same as resetTable, when filter button is clicked, prevent page from refresh and clean up table content
    d3.event.preventDefault();
    tbody.selectAll("tr").remove();

    //get input values for filters
    var dateInputValue = d3.select("#datetime-form").property("value");
    var cityInputValue = d3.select("#city-form").property("value");
    var stateInputValue = d3.select("#state-dropdown").property("value");
    var countryInputValue = d3.select("#country-form").property("value");
    var shapeInputValue = d3.select("#shape-dropdown").property("value");
    
    
    filteredTableData = tableData.filter(
        entry => ( checkContent(entry['datetime'], dateInputValue) &&
                   checkContent(entry['city'], cityInputValue) && 
                   checkContent(entry['state'], stateInputValue) &&
                   checkContent(entry['country'], countryInputValue) &&
                   checkContent(entry['shape'], shapeInputValue)
        ));
    console.log(filteredTableData);

    fillTable(filteredTableData);

};


resetBtn.on("click", resetTable);
filterBtn.on("click", filterTable);