$(document).ready(onReady);

let monthlyBudget = '20000.00';
let EmployeeArray = [];

function onReady() { // Sourced and working
    
    // Set variable to hold location of id=monthly-Budget
    let budget = $('#monthly-Budget');
    // Confirm the location is emptied out
    budget.empty();
    // Send monthlyBudget variable to the DOM
    budget.append(monthlyBudget);

    // Create listener for submit button
        // Calls on function to add Employee Info
        // to the table on the DOM
    $('#Submit-Employee-Info').on('click', appendEmployeeInfo);


} // End onReady

function appendEmployeeInfo(event) {
    // Disable default handler for form element
    event.preventDefault();
    console.log('In appendEmployeeInfo');

    // Create object to hold captured employee data
    let nextEmployee = {
        firstname: $('#first-Name').val(),
        lastName: $('#last-Name').val(),
        ID_Number: $('#ID-Number').val(),
        jobTitle: $('#job-Title').val(),
        AnnualSalary: Number($('#Annual-Salary').val()), // Change to number
    };
    console.log(nextEmployee);

    // Store nextEmployee data in EmployeeArray to later
        // call upon and place inside of table on DOM
    EmployeeArray.push(nextEmployee);
    console.log(EmployeeArray);
    

} // End appendEmployeeInfo
