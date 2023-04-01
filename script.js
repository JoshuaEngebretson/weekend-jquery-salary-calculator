//Starts reading onReady function once Document is loaded
$(document).ready(onReady);

//Global Variables
let monthlyBudget = '20000.00';
let EmployeeArray = [];


function onReady() { //Sourced and working
    
    //Set variable to hold location of id=monthly-Budget
    let budget = $('#monthly-Budget');
    //Confirm the location is emptied out
    budget.empty();
    //Send monthlyBudget variable to the DOM
    budget.append(monthlyBudget);

    //Create listener for submit button
    //  Calls on function to add Employee Info
    //  to the table on the DOM
    $('#Submit-Employee-Info').on('click', appendEmployeeInfo);


} //End onReady


//Function that gathers employee data from Form to
//  ultimately display on the DOM inside of table.
//Also calls upon function to calculate remaining
//  budget.
function appendEmployeeInfo(event) {

    //Disable default handler for form element
    event.preventDefault();
    console.log('In appendEmployeeInfo');

    //Create object to hold captured employee data
    let nextEmployee = {
        firstname: $('#first-Name').val(),
        lastName: $('#last-Name').val(),
        ID_Number: $('#ID-Number').val(),
        jobTitle: $('#job-Title').val(),
        AnnualSalary: Number($('#Annual-Salary').val()), // Change to number
    };
    console.log(nextEmployee);

    //Store nextEmployee data in EmployeeArray to later
    //  call upon and place inside of table on DOM
    EmployeeArray.push(nextEmployee);
    console.log(EmployeeArray);

    //Reset input fields on form to placeholder text
    $('#first-Name').val('');
    $('#last-Name').val('');
    $('#ID-Number').val('');
    $('#job-Title').val('');
    $('#Annual-Salary').val('');

    //Call function to calculate remaining budget
    MonthlyBudgetRemaining();

    //Place Employee data on the DOM


} //End appendEmployeeInfo

//Function to calculate remaining budget and
//  dynamically adjust the Total Monthly on DOM.
function MonthlyBudgetRemaining() {

    //Creates a variable to store total of all
    //  employee salaries
    let sumAllSalaries = 0;
    console.log('in MonthlyBudgetRemaining');

    //For each employee, add their salary to the
    //  total sum
    for (const employee of EmployeeArray) {
        sumAllSalaries += employee.AnnualSalary;
    }//End for

    //Create variable to hold data from monthly-sumAll
    let remainingMonthlyBudget = (monthlyBudget-sumAllSalaries);

    //Set variable to hold location of id=monthly-budget
    let budgetData = $('#monthly-Budget');
    //Confirm the location is emptied out
    budgetData.empty();
    //Update location with remainingMonthlyBudget.
    //  toFixed is used to convert to string with
    //  2 decimal places.
    budgetData.append(remainingMonthlyBudget.toFixed(2))


} //End MonthlyBudgetRemaining
