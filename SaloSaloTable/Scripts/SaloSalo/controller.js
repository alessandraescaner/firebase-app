app.controller("LoginController", function ($scope, EmployeeService) {

    $scope.username = "";
    $scope.password = "";


    $scope.getUsername = function () {

        EmployeeService.getUsernameFunc()

            .then(function (returnedData) {

                $scope.username =
                    returnedData.data;

            })

            .catch(function (error) {

                console.error(
                    "Get Username Error:",
                    error
                );

            });

    };


    $scope.loginFunc = function () {

        if (!$scope.username || !$scope.password) {

            Swal.fire({
                icon: "warning",
                title: "Missing Fields",
                text: "Please enter your username and password.",
                confirmButtonColor: "#8d6e63"
            });
            return;
        }


        EmployeeService.loginFunc(
            $scope.username,
            $scope.password
        )

            .then(function (returnedData) {
                if (returnedData.data.success) {
                    window.location.href =
                        returnedData.data.redirect;

                }

                else {

                    Swal.fire({
                        icon: "error",
                        title: "Login Failed",
                        text:                            returnedData.data.message,
                        confirmButtonColor: "#8d6e63"
                    });

                }

            })

            .catch(function (error) {

                console.error(
                    "Login Error:",
                    error
                );

            });

    };

    $scope.clearLogin = function () {

        $scope.username = "";

        $scope.password = "";

    };

});


app.controller(
    "RegistrationController",
    function ($scope, EmployeeService) {



        $scope.createEmptyEmployee = function () {
            return {
                employeeId: "",
                firstName: "",
                lastName: "",
                position: "",
                email: "",
                contactNumber: "",
                username: "",
                password: "",
                confirmPassword: "",
                address: ""
            };

        };


        $scope.employees = [];
        $scope.registrationEmployee =
            $scope.createEmptyEmployee();
        $scope.editMode = false;
        $scope.editIndex = -1;




        $scope.loadEmployees = function () {
            EmployeeService.getEmployeesFunc()
                .then(function (returnedData) {
                    $scope.employees =
                        returnedData.data;
                })

                .catch(function (error) {

                    console.error(
                        "Load Employees Error:",
                        error
                    );

                });

        };

        $scope.saveEmployee = function () {


            // FORM VALIDATION

            if (
                !$scope.registrationForm ||
                $scope.registrationForm.$invalid
            ) {

                Swal.fire({
                    icon: "warning",
                    title: "Incomplete Form",
                    text:
                        "Please complete all required fields correctly.",
                    confirmButtonColor: "#8d6e63",
                    confirmButtonText: "Okay"

                });

                return;

            }


            // PASSWORD VALIDATION

            if (
                $scope.registrationEmployee.password !==
                $scope.registrationEmployee.confirmPassword
            ) {

                Swal.fire({
                    icon: "error",
                    title: "Passwords Don't Match",
                    text:
                        "Please make sure both passwords are the same.",
                    confirmButtonColor: "#8d6e63",
                    confirmButtonText: "Try Again"
                });

                return;

            }

            // UPDATE EMPLOYEE

            if ($scope.editMode) {

                EmployeeService.updateEmployeeFunc(
                    $scope.registrationEmployee
                )

                    .then(function (returnedData) {
                        if (returnedData.data.success) {
                            Swal.fire({
                                icon: "success",
                                title: "Employee Updated!",
                                text:
                                    "The employee record has been updated successfully.",
                                confirmButtonColor: "#8d6e63",
                                confirmButtonText: "Done"
                            });
                            $scope.loadEmployees();
                            $scope.clearForm();
                        }

                    })

                    .catch(function (error) {
                        console.error(
                            "Update Employee Error:",
                            error
                        );

                    });

            }



            // REGISTER EMPLOYEE

            else {

                EmployeeService.saveEmployeeFunc(
                    $scope.registrationEmployee
                )

                    .then(function (returnedData) {
                        if (returnedData.data.success) {
                            Swal.fire({
                                icon: "success",
                                title: "Welcome to the Team!",
                                text:
                                    "The employee has been registered successfully.",
                                confirmButtonColor: "#8d6e63",
                                confirmButtonText: "Done"

                            });

                            $scope.loadEmployees();
                            $scope.clearForm();

                        }

                    })

                    .catch(function (error) {

                        console.error(
                            "Save Employee Error:",
                            error
                        );

                    });

            }

        };



        // EDIT EMPLOYEE
        $scope.editEmployee = function (index) {

            $scope.registrationEmployee =
                angular.copy(
                    $scope.employees[index]
                );

            $scope.editIndex = index;

            $scope.editMode = true;


            window.scrollTo({
                top: 0,
                behavior: "smooth"

            });


            Swal.fire({
                icon: "info",
                title: "Editing Employee",
                text:
                    "You can now update the employee information.",
                confirmButtonColor: "#8d6e63",
                confirmButtonText: "Okay"

            });

        };



        // DELETE EMPLOYEE

        $scope.deleteEmployee = function (index) {

            var employee =
                $scope.employees[index];


            var employeeName =
                employee.firstName +
                " " +
                employee.lastName;


            Swal.fire({
                title: "Delete Employee?",
                text:
                    "Are you sure you want to remove " +
                    employeeName +
                    "?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#8b3a3a",
                cancelButtonColor: "#8d6e63",
                confirmButtonText: "Yes, Delete",
                cancelButtonText: "Cancel"

            })

                .then(function (result) {

                    if (result.isConfirmed) {

                        EmployeeService.deleteEmployeeFunc(
                            employee.employeeId
                        )

                            .then(function (returnedData) {

                                if (returnedData.data.success) {
                                    Swal.fire({
                                        icon: "success",
                                        title: "Deleted!",
                                        text:
                                            employeeName +
                                            " has been removed from the employee list.",
                                        confirmButtonColor: "#8d6e63",
                                        confirmButtonText: "Done"

                                    });
                                    $scope.loadEmployees();
                                    $scope.clearForm();

                                }

                            })

                            .catch(function (error) {

                                console.error(
                                    "Delete Employee Error:",
                                    error
                                );

                            });

                    }

                });

        };



        // CLEAR FORM

        $scope.clearForm = function () {

            $scope.registrationEmployee =
                $scope.createEmptyEmployee();

            $scope.editMode = false;

            $scope.editIndex = -1;

        };


        // LOAD EMPLOYEES WHEN PAGE OPENS

        $scope.loadEmployees();

    }
);