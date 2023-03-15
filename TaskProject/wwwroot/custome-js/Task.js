
function editUser(row) {

    window.location.href = `/edit/user/${row}`;
   

}

function deleteUser(row) {
    
    $.ajax({
        url: "/deletUser/" + row,
        type: "GET",

    }).done(function (data) {
        if (data == 1) {
            alert("user is deleted succfully");

        } else {
            alert("user can not be deleted ");
        }
    })

}


$(document).ready(function () {

    


    $("#basicTable").DataTable({


        ajax: {
            url: "/getUsers",
            dataSrc: '',
            type: "GET"

        },
        columns: [

            { "data": "Id" },
            { "data": "fullName" },
            { "data": "PhoneNumber" },
            { "data": "Email" },
            { "data": "UserName" },
            { "data": "IsAdmin", "width": "20px" },
            {
                "data": "Id", "render": function (data, type, row) {

                    var fs = JSON.stringify(row);
                    if (allowAction) {

                        return '<div class="d-inline-flex">' +
                            '<a class="pe-1 dropdown-toggle hide-arrow text-primary" data-bs-toggle="dropdown">' +
                            feather.icons['more-vertical'].toSvg({ class: 'font-small-4' }) +
                            '</a>' +
                            '<div class="dropdown-menu dropdown-menu-end">' +
                            '<a href="javascript:;" onclick="editUser(`' + data + '`)" id="editModal" class="dropdown-item">' +
                            feather.icons['edit'].toSvg({ class: 'font-small-4 me-50' }) +
                            'Edit</a>' +
                            
                            '<a href="javascript:;" onclick="deleteUser(`' + data + '`)" class="dropdown-item delete-record">' +
                            feather.icons['trash-2'].toSvg({ class: 'font-small-4 me-50' }) +
                            'Delete</a>' +
                            '</div>' +
                            '</div>'

                            ;
                    } else {
                        return '<a href="javascript:;"  class="item-edit">' +
                            feather.icons['x-circle'].toSvg({ class: 'font-small-4' }) +
                            '</a>';;
                    }
                }
            }


        ]
      

    });
    //$('#basicTable').on('click', '.item-edit', function (data, type, row) {
    //    console.log(data);
        
    //   // $("#editUser").modal("show");
    //})


    $("#basicTableInvoice").DataTable({
        ajax: {
            url: "/getInvoices",
            dataSrc: '',
            type: "GET"

        }, columns: [
            { "data": "InvoiceId" },
            { "data": "CreatedAt" },
            { "data": "UpdatedAt" }
           


        ]
    });

    $("#AddUserBtn").on("click", function () {

        $("#editUser").modal("show");
    });


    

});



//    console.log("eeee");




/**
 * DataTables Basic
 */







//$(function () {
//    'use strict';

//    var dt_basic_table = $('.datatables-basic'),
//        dt_date_table = $('.dt-date'),
//        dt_complex_header_table = $('.dt-complex-header'),
//        dt_row_grouping_table = $('.dt-row-grouping'),
//        dt_multilingual_table = $('.dt-multilingual'),
//        assetPath = '../../../app-assets/';

//    if ($('body').attr('data-framework') === 'laravel') {
//        assetPath = $('body').attr('data-asset-path');
//    }



//    // DataTable with buttons
//    // --------------------------------------------------------------------

//    if (dt_basic_table.length) {
//        var dt_basic = dt_basic_table.DataTable({

//            ajax: {
//                url: "/getUsers",
//                dataSrc: '',
//                type: "GET"

//            },



//            columns: [
//                { data: 'Id' },
//                { data: 'Id' },
//                { data: 'Id' }, // used for sorting so will hide this column
//                { data: 'fullName' },
//                { data: 'PhoneNumber' },
//                { data: 'Email' },
//                { data: 'UserName' },
//                { data: 'IsAdmin' },
//                { data: '' },

//            ],
//            columnDefs: [
//                {
//                    // For Responsive
//                    className: 'control',
//                    orderable: false,
//                    responsivePriority: 2,
//                    targets: 0
//                },
//                {
//                    // For Checkboxes
//                    targets: 1,
//                    orderable: false,
//                    responsivePriority: 3,
//                    render: function (data, type, full, meta) {
//                        return (
//                            '<div class="form-check"> <input class="form-check-input dt-checkboxes" type="checkbox" value="" id="checkbox' +
//                            data +
//                            '" /><label class="form-check-label" for="checkbox' +
//                            data +
//                            '"></label></div>'
//                        );
//                    },
//                    checkboxes: {
//                        selectAllRender:
//                            '<div class="form-check"> <input class="form-check-input" type="checkbox" value="" id="checkboxSelectAll" /><label class="form-check-label" for="checkboxSelectAll"></label></div>'
//                    }
//                },
//                {
//                    targets: 2,
//                    visible: false
//                },
//                {
//                    // Avatar image/badge, Name and post
//                    targets: 3,
//                    responsivePriority: 4,
//                    render: function (data, type, full, meta) {
//                        var $user_img = full['avatar'],
//                            $name = full['fullName'],
//                            $post = full['post'];
//                        if ($user_img) {
//                            // For Avatar image
//                            var $output =
//                                '<img src="' + assetPath + 'images/avatars/' + $user_img + '" alt="Avatar" width="32" height="32">';
//                        }
//                        else {
//                            // For Avatar badge
//                            var stateNum = full['status'];
//                            var states = ['success', 'danger', 'warning', 'info', 'dark', 'primary', 'secondary'];
//                            var $state = states[stateNum],
//                                $name = full['fullName'],
//                                $initials = $name.match(/\b\w/g) || [];
//                            $initials = (($initials.shift() || '') + ($initials.pop() || '')).toUpperCase();
//                            $output = '<span class="avatar-content">' + $initials + '</span>';
//                        }

//                        var colorClass = $user_img === '' ? ' bg-light-' + $state + ' ' : '';
//                        // Creates full output for row
//                        var $row_output =
//                            '<div class="d-flex justify-content-left align-items-center">' +
//                            '<div class="avatar ' +
//                            colorClass +
//                            ' me-1">' +
//                            $output +
//                            '</div>' +
//                            '<div class="d-flex flex-column">' +
//                            '<span class="emp_name text-truncate fw-bold">' +
//                            $name +
//                            '</span>' +
//                            '<small class="emp_post text-truncate text-muted">' +
//                            $post +
//                            '</small>' +
//                            '</div>' +
//                            '</div>';
//                        return $row_output;
//                    }
//                },
//                {
//                    responsivePriority: 1,
//                    targets: 4
//                },
//                {
//                    // Label
//                    targets: -2,
//                    render: function (data, type, full, meta) {
//                        var $status_number = full['status'];
//                        var $status = {
//                            1: { title: 'Current', class: 'badge-light-primary' },
//                            2: { title: 'Professional', class: ' badge-light-success' },
//                            3: { title: 'Rejected', class: ' badge-light-danger' },
//                            4: { title: 'Resigned', class: ' badge-light-warning' },
//                            5: { title: 'Applied', class: ' badge-light-info' }
//                        };
//                        if (typeof $status[$status_number] === 'undefined') {
//                            return data;
//                        }
//                        return (
//                            '<span class="badge rounded-pill ' +
//                            $status[$status_number].class +
//                            '">' +
//                            $status[$status_number].title +
//                            '</span>'
//                        );
//                    }
//                },
//                {
//                    // Actions
//                    targets: -1,
//                    title: 'Actions',
//                    orderable: false,
//                    render: function (data, type, full, meta) {

//                        return (
//                            '<div class="d-inline-flex">' +
//                            '<a class="pe-1 dropdown-toggle hide-arrow text-primary" data-bs-toggle="dropdown">' +
//                            feather.icons['more-vertical'].toSvg({ class: 'font-small-4' }) +
//                            '</a>' +
//                            '<div class="dropdown-menu dropdown-menu-end">' +
//                            '<a href="javascript:;" class="dropdown-item">' +
//                            feather.icons['file-text'].toSvg({ class: 'font-small-4 me-50' }) +
//                            'Details</a>' +
//                            '<a href="javascript:;" class="dropdown-item">' +
//                            feather.icons['archive'].toSvg({ class: 'font-small-4 me-50' }) +
//                            'Archive</a>' +
//                            '<a href="javascript:;" class="dropdown-item delete-record">' +
//                            feather.icons['trash-2'].toSvg({ class: 'font-small-4 me-50' }) +
//                            'Delete</a>' +
//                            '</div>' +
//                            '</div>' +
//                            '<a href="javascript:;"  class="item-edit">' +
//                            feather.icons['edit'].toSvg({ class: 'font-small-4' }) +
//                            '</a>'
//                        );
//                    }
//                }
//            ],
//            order: [[2, 'desc']],
//            dom: '<"card-header border-bottom p-1"<"head-label"><"dt-action-buttons text-end"B>><"d-flex justify-content-between align-items-center mx-0 row"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6"f>>t<"d-flex justify-content-between mx-0 row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
//            displayLength: 7,
//            lengthMenu: [7, 10, 25, 50, 75, 100],
//            buttons: [
//                {
//                    extend: 'collection',
//                    className: 'btn btn-outline-secondary dropdown-toggle me-2',
//                    text: feather.icons['share'].toSvg({ class: 'font-small-4 me-50' }) + 'Export',
//                    buttons: [
//                        {
//                            extend: 'print',
//                            text: feather.icons['printer'].toSvg({ class: 'font-small-4 me-50' }) + 'Print',
//                            className: 'dropdown-item',
//                            exportOptions: { columns: [3, 4, 5, 6, 7] }
//                        },
//                        {
//                            extend: 'csv',
//                            text: feather.icons['file-text'].toSvg({ class: 'font-small-4 me-50' }) + 'Csv',
//                            className: 'dropdown-item',
//                            exportOptions: { columns: [3, 4, 5, 6, 7] }
//                        },
//                        {
//                            extend: 'excel',
//                            text: feather.icons['file'].toSvg({ class: 'font-small-4 me-50' }) + 'Excel',
//                            className: 'dropdown-item',
//                            exportOptions: { columns: [3, 4, 5, 6, 7] }
//                        },
//                        {
//                            extend: 'pdf',
//                            text: feather.icons['clipboard'].toSvg({ class: 'font-small-4 me-50' }) + 'Pdf',
//                            className: 'dropdown-item',
//                            exportOptions: { columns: [3, 4, 5, 6, 7] }
//                        },
//                        {
//                            extend: 'copy',
//                            text: feather.icons['copy'].toSvg({ class: 'font-small-4 me-50' }) + 'Copy',
//                            className: 'dropdown-item',
//                            exportOptions: { columns: [3, 4, 5, 6, 7] }
//                        }
//                    ],
//                    init: function (api, node, config) {
//                        $(node).removeClass('btn-secondary');
//                        $(node).parent().removeClass('btn-group');
//                        setTimeout(function () {
//                            $(node).closest('.dt-buttons').removeClass('btn-group').addClass('d-inline-flex');
//                        }, 50);
//                    }
//                },
//                {
//                    text: feather.icons['plus'].toSvg({ class: 'me-50 font-small-4' }) + 'Add New Record',
//                    className: 'create-new btn btn-primary',
//                    attr: {
//                        'data-bs-toggle': 'modal',
//                        'data-bs-target': '#modals-slide-in'
//                    },
//                    init: function (api, node, config) {
//                        $(node).removeClass('btn-secondary');
//                    }
//                }
//            ],
//            responsive: {
//                details: {
//                    display: $.fn.dataTable.Responsive.display.modal({
//                        header: function (row) {
//                            var data = row.data();
//                            return 'Details of ' + data['fullName'];
//                        }
//                    }),
//                    type: 'column',
//                    renderer: function (api, rowIdx, columns) {
//                        var data = $.map(columns, function (col, i) {
//                            return col.title !== '' // ? Do not show row in modal popup if title is blank (for check box)
//                                ? '<tr data-dt-row="' +
//                                col.rowIdx +
//                                '" data-dt-column="' +
//                                col.columnIndex +
//                                '">' +
//                                '<td>' +
//                                col.title +
//                                ':' +
//                                '</td> ' +
//                                '<td>' +
//                                col.data +
//                                '</td>' +
//                                '</tr>'
//                                : '';
//                        }).join('');

//                        return data ? $('<table class="table"/>').append('<tbody>' + data + '</tbody>') : false;
//                    }
//                }
//            },
//            language: {
//                paginate: {
//                    // remove previous & next text from pagination
//                    previous: '&nbsp;',
//                    next: '&nbsp;'
//                }
//            }

//        });
//        $('div.head-label').html('<h6 class="mb-0">DataTable with Buttons</h6>');



//    }

//    // Flat Date picker
//    if (dt_date_table.length) {
//        dt_date_table.flatpickr({
//            monthSelectorType: 'static',
//            dateFormat: 'm/d/Y'
//        });
//    }

//    // Add New record
//    // ? Remove/Update this code as per your requirements ?
//    var count = 101;
//    $('.data-submit').on('click', function () {
//        var $new_name = $('.add-new-record .dt-full-name').val(),
//            $new_post = $('.add-new-record .dt-post').val(),
//            $new_email = $('.add-new-record .dt-email').val(),
//            $new_date = $('.add-new-record .dt-date').val(),
//            $new_salary = $('.add-new-record .dt-salary').val();

//        if ($new_name != '') {
//            dt_basic.row
//                .add({
//                    responsive_id: null,
//                    id: count,
//                    full_name: $new_name,
//                    post: $new_post,
//                    email: $new_email,
//                    start_date: $new_date,
//                    salary: '$' + $new_salary,
//                    status: 5
//                })
//                .draw();
//            count++;
//            $('.modal').modal('hide');
//        }
//    });

//    // Delete Record
//    $('.datatables-basic tbody').on('click', '.delete-record', function () {
//        dt_basic.row($(this).parents('tr')).remove().draw();
//    });

//    $('.datatables-basic tbody').on('click', '.item-edit', function (data, type, full, meta) {
//        $("#editUser").modal("show");
//        console.log(full['fullName']);
//    })


//});


