const billDivideForm = document.getElementById('bill-divider-form');

billDivideForm.addEventListener('submit', billDividerHandler);

function billDividerHandler(event){
    event.preventDefault();

    const inputs = getInputs();

    showCalculatedOutput(inputs);
}

// Getting all inputs from the bill

function getInputs(){
    let subtotal = document.getElementById('subtotal').value;
    let tip = document.getElementById('tip').value;
    let noOfPerson = document.getElementById('no-of-person').value;
    return {subtotal, tip, noOfPerson};
}

// Culculate the bill

function showCalculatedOutput(input){
    billDivideForm.reset();

    let totalTip = parseFloat(input.tip);

    let totalAmount = parseFloat(input.subtotal) + totalTip;

    let tipPerPerson = totalTip / parseFloat(input.noOfPerson);

    let billPerPerson = totalAmount / parseFloat(input.noOfPerson);

    document.getElementById('total-bill').innerHTML = `₹ ${totalAmount.toFixed(2)}`;
    document.getElementById('bill-per-person').innerHTML = `₹ ${billPerPerson.toFixed(2)}`;
    document.getElementById('total-tip').innerHTML = `₹ ${totalTip.toFixed(2)}`;
    document.getElementById('tip-per-person').innerHTML = `₹ ${tipPerPerson.toFixed(2)}`;
}