$(document).ready(function () {
    // Get a reference to the table
    var table = $('#userTable');

    // Event handler for the filter input boxes
    $('#filterName, #filterDoB, #filterMarried, #filterPhone, #filterSalary').on('input', function () {
        console.log('Input event triggered'); // Check if this is logged
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

        // Loop through the table rows
        $('tbody tr', table).each(function () {
            var row = $(this);
            var name = $('td:eq(0)', row).text().toLowerCase();
            var dob = $('td:eq(1)', row).text().toLowerCase();
            var married = $('td:eq(2)', row).text().toLowerCase();
            var phone = $('td:eq(3)', row).text().toLowerCase();
            var salary = $('td:eq(4)', row).text().toLowerCase();

            // Check if the row matches the filter criteria
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
