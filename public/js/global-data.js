function financialDetailsPartA(){
    let userData = JSON.parse(sessionStorage.getItem('userData'));
    userData.basicSalary = (parseFloat(userData.basicSalary)) || 0 ;
    userData.basicSalary=0.00;
    userData.dearnessAllowance = (parseFloat(userData.dearnessAllowance)) || 0 ;
}