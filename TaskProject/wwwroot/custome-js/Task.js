
 count=0;

    $('#addNewItem').on("click", function () {
        count++;
       
      //  document.getElementById("counte").value++;
        let container = document.getElementById("container");
        console.log(count);
        container.innerHTML += `



                                     <div class="repeater-wrapper" id="wrapper_${count}" data-repeater-item>
                                            <div class="row" id="inputRow">
                                                <div class="col-12 d-flex product-details-border position-relative pe-0">
                                                    <div class="row w-100 pe-lg-0 pe-1 py-2">
                                                        <div class="col-lg-5 col-12 mb-lg-0 mb-2 mt-lg-0 mt-2">
                                                            <p class="card-text col-title mb-md-50 mb-0">Item</p>
                                                            <select class="form-select " name="invoiceItem[]" id="selector_${count}" >
                                                                
                                                                <option disable value=" " selected>please enter item</option>

                                                                       

                                                           </select>

                                                        </div>
                                                        <div class="col-lg-3 col-12 my-lg-0 my-2">
                                                            <p class="card-text col-title mb-md-2 mb-0">Cost</p>
                                                            <input type="text" class="form-control" name="invoiceCost[]"   placeholder="24" />

                                                        </div>
                                                        <div class="col-lg-2 col-12 my-lg-0 my-2">
                                                            <p class="card-text col-title mb-md-2 mb-0">Qty</p>
                                                            <input type="number" class="form-control" name="invoiceQty[]"  placeholder="1" />
                                                        </div>
                                                        <div class="col-lg-2 col-12 mt-lg-0 mt-2">
                                                            <p class="card-text col-title mb-md-50 mb-0">Price</p>
                                                             <input type="hidden" id="countt" />
                                                            <p class="card-text mb-0">${ count}</p>
                                                        </div>
                                                    </div>

                                                    <i onclick="deleteItemee(${count})"  class="cursor-pointer font-medium-3" >
                                                       ${feather.icons['x'].toSvg({ class: 'font-small-4 me-50' })}
                                                    </i>

                                                </div>
                                            </div>

                                        </div>

`
        var sel = document.querySelector(`#selector_${count}`);
        products.forEach(item => {
            let opt = document.createElement('option');
            opt.value = item.id;
            
            opt.textContent += item.name_EN // or opt.innerHTML += user.name
            sel.appendChild(opt);
        });

      

       

    });

function deleteItemee(counte) {

    document.getElementById(`wrapper_${counte}`).remove() ;
  //  count = count - 1;
    //document.getElementById("counte").value--;

};

function addInvoiceToDb() {
    var payment_method = document.getElementById("paymentselection").value;
    //var inc = [];
    //var invoices = $("input[name^=invoice]").each(function () {
    //    inc.push(this.name);
    //});
    //  var count = document.getElementById("counte").value;

    var container = document.getElementById("container");
    var rows = container.querySelectorAll('#inputRow');
   
    var data = [];
   
    for (var i = 0; i < rows.length; i++) {
        var inputs = rows[i].querySelectorAll('input');
        var selectItem = rows[i].querySelectorAll('select')[0];
        var object = {
            ProductId: selectItem.options[selectItem.selectedIndex].value,
            Qty: inputs[1].value,
            Price: inputs[0].value

        };
        data.push(
           
            object
        );
    }
        var Invoice = {
            PaymentMethod: payment_method,
            Invoices:data
    };
    console.log(JSON.stringify({ 'addInvoice': Invoice } ));
    $.ajax({
        type: "POST",
        url: "/add",

        data: { 'addInvoice': data, 'paymentMethod': payment_method },
        dataType: "json",
        success: function (result) {
            if (result == 1) {
                console.log("88")
              //  alert("rr");
                location.href = "/Invoice";
            }else{
                alert("something went wrong");
            }
        }
        })

    
}





function editUser(row) {

    window.location.href = `/edit/user/${row}`;
   

}

function deleteUser(row) {
    
    $.ajax({
        url: "/deletUser/" + row,
        type: "GET",

    }).done(function (data) {
        if (data == 1) {
            DataTable.ajax.reload();

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


        ],
       
            dom: '<"card-header border-bottom p-1"<"head-label"><"dt-action-buttons text-end"B>><"d-flex justify-content-between align-items-center mx-0 row"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6"f>>t<"d-flex justify-content-between mx-0 row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
            displayLength: 7,
            lengthMenu: [7, 10, 25, 50, 75, 100],
            buttons: [
                {
                    extend: 'collection',
                    className: 'btn btn-outline-secondary dropdown-toggle me-2',
                    text: feather.icons['share'].toSvg({ class: 'font-small-4 me-50' }) + 'Export',
                    buttons: [
                        {
                            extend: 'print',
                            text: feather.icons['printer'].toSvg({ class: 'font-small-4 me-50' }) + 'Print',
                            className: 'dropdown-item',
                            exportOptions: { columns: [1, 2, 3, 4, 5, 6] }
                        },
                        {
                            extend: 'csv',
                            text: feather.icons['file-text'].toSvg({ class: 'font-small-4 me-50' }) + 'Csv',
                            className: 'dropdown-item',
                            exportOptions: { columns: [1, 2, 3, 4, 5, 6] }
                        },
                        {
                            extend: 'excel',
                            text: feather.icons['file'].toSvg({ class: 'font-small-4 me-50' }) + 'Excel',
                            className: 'dropdown-item',
                            exportOptions: { columns: [1, 2, 3, 4, 5, 6] }
                        },
                        {
                            extend: 'pdf',
                            text: feather.icons['clipboard'].toSvg({ class: 'font-small-4 me-50' }) + 'Pdf',
                            className: 'dropdown-item',
                            exportOptions: { columns: [1,2,3, 4, 5, 6] }
                        },
                        {
                            extend: 'copy',
                            text: feather.icons['copy'].toSvg({ class: 'font-small-4 me-50' }) + 'Copy',
                            className: 'dropdown-item',
                            exportOptions: { columns: [1, 2, 3, 4, 5, 6] }
                        }
                    ]
                },
                {
                    text: feather.icons['plus'].toSvg({ class: 'me-50 font-small-4' }) + 'Add New User',
                    className: 'create-new btn btn-primary',
                    attr: {
                        'data-bs-toggle': 'modal',
                        'data-bs-target': '#editUser'
                    },
                    init: function (api, node, config) {
                        $(node).removeClass('btn-secondary');
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
            { "data": "id" },
            { "data":"paymentMethod"},
            { "data": "createdAt" },
            { "data": "updatedAt" }
           


        ],
        dom: '<"card-header border-bottom p-1"<"head-label"><"dt-action-buttons text-end"B>><"d-flex justify-content-between align-items-center mx-0 row"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6"f>>t<"d-flex justify-content-between mx-0 row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
        buttons: [
            {
                text: feather.icons['plus'].toSvg({ class: 'me-50 font-small-4' }) + 'Add New Inoice',
                className: 'create-new btn btn-primary',
                //attr: {
                //    'data-bs-toggle': 'modal',
                //    'data-bs-target': '#editUser'
                //},
                action: function (e, dt, node, config) {
                    window.location.href = "/invoice/create";
                },
                init: function (api, node, config) {
                    $(node).removeClass('btn-secondary');
                }
            }
            ]
    });

    $("#AddUserBtn").on("click", function () {

        $("#editUser").modal("show");
    });


    

});



