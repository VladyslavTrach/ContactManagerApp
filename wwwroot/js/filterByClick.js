$(document).ready(function () {
    // Initial sort column (you can change this to match your default sorting)
    let currentSortColumn = 'Name';
    let isAscending = true; // Initially, sort in ascending order

    // Function to sort the table
    function sortTable(column) {
        let rows = $('#userTable tbody tr').toArray();

        rows.sort(function (a, b) {
            let aValue = $(a).find('td[data-field="' + column + '"]').text();
            let bValue = $(b).find('td[data-field="' + column + '"]').text();

            if (column === 'DateOfBirth') {
                // Parse Date of Birth as a date for sorting
                aValue = new Date(aValue);
                bValue = new Date(bValue);
            } else if (column === 'Salary') {
                // Parse Salary as a number for sorting
                aValue = parseFloat(aValue.replace('$', '').replace(',', ''));
                bValue = parseFloat(bValue.replace('$', '').replace(',', ''));
            }

            if (isAscending) {
                return aValue > bValue ? 1 : -1;
            } else {
                return aValue < bValue ? 1 : -1;
            }
        });

        $('#userTable tbody').empty().append(rows);
    }

    // Add click event handlers to the sortable headers
    $('.sortable').click(function () {
        let clickedColumn = $(this).data('sort');
        if (clickedColumn === currentSortColumn) {
            // Toggle sorting direction
            isAscending = !isAscending;
        } else {
            // Set the new sorting column
            currentSortColumn = clickedColumn;
            isAscending = true;
        }

        // Update the sort icon
        $('.sortable i').removeClass('fa-sort-up fa-sort-down');
        $(this).find('i').addClass(isAscending ? 'fa-sort-up' : 'fa-sort-down');

        // Sort the table
        sortTable(currentSortColumn);
    });

    // Initial sort
    sortTable(currentSortColumn);
});
