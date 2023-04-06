//Starts reading onReady function once Document is loaded
$(document).ready(onReady);

//Global Variables
let monthlyBudget = '0.00';
let EmployeeArray = [];


//Setting Global Variable that converts a given number
//  US Currency
let USDollar = Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});


function onReady() { //Sourced and working
    
    //Set variable to hold location of id=monthly-Budget
    let budget = $('#monthly-Budget');
    //Confirm the location is emptied out
    budget.empty();
    //Send monthlyBudget variable to the DOM
    budget.append(USDollar.format(monthlyBudget));

    //Create listener for click even on submit button
    //  Calls on function to add Employee Info to
    //  the table on the DOM
    $('#Submit-Employee-Info').on('click',appendEmployeeInfo);

    //Create listener for click event on delete button
    //  Calls on function to remove that line's 
    //      employee data from the table
    //  Reruns the MonthlyBudgetRemaining function
    //      this effectively adds the removed employee's
    //      salary back into the available pool
    $('#Employee-Data').on('click', 
        '.Delete_EmployeeData', removeEmployeeInfo);

} //End onReady


//Function that gathers employee data from Form to
//  ultimately display on the DOM inside of table.
//Also calls upon function to calculate remaining
//  budget.
function appendEmployeeInfo(event) {

    //Disable default handler for submit event on
    //  form element
    event.preventDefault();

    //Wrap everything in an if statement that requires all
    //  form data fields to be filled before processing more
    //  of this function.
    if ($('#first-Name').val() != '' && $('#last-Name').val() != '' &&
        $('#ID-Number').val() != '' && $('#job-Title').val() != '' &&
        $('#Annual-Salary').val() != '') {
          
        //Create object to hold captured employee data
        let nextEmployee = {
            firstName: $('#first-Name').val(),
            lastName: $('#last-Name').val(),
            ID_Number: $('#ID-Number').val(),
            jobTitle: $('#job-Title').val(),
            AnnualSalary: Number($('#Annual-Salary').val()), // Change to number
        };

        //Store nextEmployee data in EmployeeArray to later
        //  call upon and place inside of table on DOM
        EmployeeArray.push(nextEmployee);

        //Reset input fields on form to placeholder text
        $('#first-Name').val('');
        $('#last-Name').val('');
        $('#ID-Number').val('');
        $('#job-Title').val('');
        $('#Annual-Salary').val('');

        //Call function to calculate remaining budget
        MonthlyBudgetRemaining();

        //Place Employee data on the DOM
        ShowEmployees();
    } //End if Form not complete

} //End appendEmployeeInfo


//Function to calculate remaining budget and
//  dynamically adjust the Total Monthly on DOM.
function MonthlyBudgetRemaining() {

    //Creates a variable to store total of all
    //  employee salaries
    let sumAllSalaries = 0;

    //For each employee, add their salary to the
    //  total sum
    for (const employee of EmployeeArray) {
        sumAllSalaries += employee.AnnualSalary;
    }//End for...of loop

    //Create variable to hold data from monthlyBudget - sumAllSalaries
    //  divided by 12 (months in the year)
    let TotalMonthlyBudget = (sumAllSalaries/12);

    //Set variable to hold location of id=monthly-budget
    let budgetData = $('#monthly-Budget');
    //Confirm the location is emptied out
    budgetData.empty();

    //If TotalMonthlyBudget is greater than $20000
    //  set background-color to red
    if (TotalMonthlyBudget > 20000) {
        $('.budget').css('background-color', '#FF0000')
    }

    //If remainingMonthlyBudget is less than or equal to $20000
    //  set background-color to default
    if (TotalMonthlyBudget <= 20000) {
        $('.budget').css('background-color', '')
    }

    //Update location with remainingMonthlyBudget.
    //  toFixed is used to convert to string with
    //  2 decimal places.
    budgetData.append(USDollar.format(TotalMonthlyBudget))

} //End MonthlyBudgetRemaining


function ShowEmployees() {
    
    //Set variable to hold location of id=Employee-Data
    //  this is in the tbody element
    let EmployeeInfo = $('#Employee-Data');
    //Confirm the location is emptied out
    EmployeeInfo.empty();

    //Loop through EmployeesArray, create a new line
    //  with each employee's data.
    //Creates a delete button after each employees data.
    for (const employee of EmployeeArray) {
        EmployeeInfo.append(`
            <tr data-firstName="${employee.firstName}"
              data-lastName="${employee.lastName}"
              data-ID="${employee.ID_Number}"
              data-job="${employee.jobTitle}"
              data-salary="${Intl.NumberFormat().format(employee.AnnualSalary)}">
                <td>${employee.firstName}</td>
                <td>${employee.lastName}</td>
                <td>${employee.ID_Number}</td>
                <td>${employee.jobTitle}</td>
                <td class="right salary">${USDollar.format(employee.AnnualSalary)}</td>
                <td>
                    <button class="Delete_EmployeeData">Delete</button>
                </td>
            </tr>
        `);
    }//End for...of loop

    //Intended to add bottom line back in for aesthetics
    EmployeeInfo.append(`
        <tr class="empty">
            <td class="empty"></td>
            <td class="empty"></td>
            <td class="empty"></td>
            <td class="empty"></td>
            <td class="empty"></td>
            <td class="empty"></td>
        </tr>
    `)

} //End ShowEmployees


function removeEmployeeInfo(){

    //Grab data from what was just deleted.
    //  Target this, then go up 2 levels, reorder to match
    //      order of array we will be comparing to
    //  Create a new variable set the that value.
    let removedData = (
        Object.values(($(this).parent().parent()).data()).reverse())
    
    //If there is are commas in removedData for annual salary
    //  remove all the commas
    removedData[4] = String(removedData[4]).replaceAll(',','')

    //Remove Employee's data from EmployeeArray and update
    //  DOM to reflect budget change.
    //Use for...of loop to cycle through array and remove employee
    //  data that matches removedData (removed employee).
    for (let i = 0; i < EmployeeArray.length; i++) {
        const element = EmployeeArray[i];

        if (element.firstName == removedData[0] && element.lastName == removedData[1]
            && element.ID_Number == removedData [2] && element.jobTitle == removedData[3]
            && element.AnnualSalary == removedData[4]) {

            EmployeeArray.splice(i, 1);

            break
        }

    } // End for loop

    //Update Total Monthly Budget based on updated EmployeeArray
    //  Updated EmployeeArray no longer includes removed employee
    MonthlyBudgetRemaining()

    //Update the DOM to remove the employee from the table
    $(this).parent().parent().remove();

} //End removeEmployeeInfo