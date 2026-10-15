app.service("EmployeeService", function ($http) {


    this.loginFunc = function (username, password) {

        return $http.post("/Account/Login", {

            username: username,
            password: password

        });

    };


    this.getUsernameFunc = function () {

        return $http.get("/Account/GetUsername");

    };

    this.getEmployeesFunc = function () {

        return $http.get("/Account/GetEmployees");

    };

    this.saveEmployeeFunc = function (employee) {

        return $http.post(
            "/Account/SaveEmployee",
            employee
        );

    };

    this.updateEmployeeFunc = function (employee) {

        return $http.post(
            "/Account/UpdateEmployee",
            employee
        );

    };

    this.deleteEmployeeFunc = function (employeeId) {

        return $http.post(
            "/Account/DeleteEmployee",
            {
                employeeId: employeeId
            }
        );

    };

});