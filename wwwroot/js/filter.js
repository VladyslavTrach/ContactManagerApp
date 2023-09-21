$(document).ready(function () {
    var table = $('#userTable');

    $('#filterName, #filterDoB, #filterMarried, #filterPhone, #filterSalary').on('input', function () {
        console.log('Input event triggered');
        var filterName = $('#filterName').val().toLowerCase();
        var filterDoB = $('#filterDoB').val().toLowerCase();
        var filterMarried = $('#filterMarried').val().toLowerCase();
        var filterPhone = $('#filterPhone').val().toLowerCase();
        var filterSalary = $('#filterSalary').val().toLowerCase();

        console.log('Name filter:', filterName);
        console.log('DoB filter:', filterDoB);
        console.log('Married filter:', filterMarried);
        console.log('Phone filter:', filterPhone);
        console.log('Salary filter:', filterSalary);


        $('tbody tr', table).each(function () {
            var row = $(this);
            var name = $('td:eq(0)', row).text().toLowerCase();
            var dob = $('td:eq(1)', row).text().toLowerCase();
            var married = $('td:eq(2)', row).text().toLowerCase();
            var phone = $('td:eq(3)', row).text().toLowerCase();
            var salary = $('td:eq(4)', row).text().toLowerCase();

            if (
                name.includes(filterName) &&
                dob.includes(filterDoB) &&
                married.includes(filterMarried) &&
                phone.includes(filterPhone) &&
                salary.includes(filterSalary)
            ) {
                row.show();
            } else {
                row.hide();
            }
        });
    });
});
