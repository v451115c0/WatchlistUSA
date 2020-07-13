var today = new Date();
var dd = today.getDate();

var mm = today.getMonth()+1; 
var yyyy = today.getFullYear();
if(dd<10) 
{
    dd='0'+dd;
} 

if(mm<10) 
{
    mm='0'+mm;
} 
today = yyyy + "" + mm;

var idsponsor = 14960100;

$(document).ready(function() {
    //Autocomplete
    $(function() {
        $.ajax({
            type: 'GET',
            url: '/data',
            data: {idsponsor: idsponsor, period: today},
            success: function(response) {
                var partners = response;
                var genealogy = {};
                for (var i = 0; i < partners.length; i++) {
                    genealogy[partners[i].associateid + " " + partners[i].associatename] = null;
                }
                $('input.autocomplete').autocomplete({
                    data: genealogy,
                });
            }
        });
    });

    // Load initial config to table of report
    $(function(){
        $.ajax({
            type: 'GET',
            url: '/loadInitConf',
            data: {sponsorid: idsponsor},
            success: function(Response) {
                var table = $('#example').DataTable();
                if(Response[0].Line_Number == 'true '){
                    $("#line_number").prop('checked', true)
                }
                else{
                    var col = table.column(1);
                    col.visible(!col.visible());
                }
                if(Response[0].Levels == 'true '){
                    $("#levels").prop('checked', true)
                }
                else{
                    var col = table.column(2);
                    col.visible(!col.visible());
                }
                if(Response[0].alternative_phone == 'true '){
                    $("#alternative_num").prop('checked', true)
                }
                else{
                    var col = table.column(7);
                    col.visible(!col.visible());
                }
                if(Response[0].consultant_id == 'true '){
                    $("#consultant_id").prop('checked', true)
                }
                else{
                    var col = table.column(4);
                    col.visible(!col.visible());
                }
                if(Response[0].country == 'true '){
                    $("#country").prop('checked', true)
                }
                else{
                    var col = table.column(8);
                    col.visible(!col.visible());
                }
                if(Response[0].distributor_status == 'true '){
                    $("#distributor_status").prop('checked', true)
                }
                else{
                    var col = table.column(10);
                    col.visible(!col.visible());
                }
                if(Response[0].email_address == 'true '){
                    $("#email").prop('checked', true)
                }
                else{
                    var col = table.column(5);
                    col.visible(!col.visible());
                }
                if(Response[0].inactive_months == 'true '){
                    $("#inactive_months").prop('checked', true)
                }
                else{
                    var col = table.column(11);
                    col.visible(!col.visible());
                }
                if(Response[0].mobile_phone == 'true '){
                    $("#mobile_number").prop('checked', true)
                }
                else{
                    var col = table.column(6);
                    col.visible(!col.visible());
                }
                if(Response[0].pay_rank == 'true '){
                    $("#pay_rank").prop('checked', true)
                }
                else{
                    var col = table.column(9);
                    col.visible(!col.visible());
                }
                if(Response[0].renewal_date == 'true '){
                    $("#renewal_date").prop('checked', true)
                }
                else{
                    var col = table.column(12);
                    col.visible(!col.visible());
                }
                if(Response[0].period_1 == 'true '){
                    $("#period1").prop('checked', true)
                }
                else{
                    hideShowPeriod1();
                }
                if(Response[0].period_2 == 'true '){
                    $("#period2").prop('checked', true)
                }
                else{
                    hideShowPeriod2();
                }
                if(Response[0].period_3 == 'true '){
                    $("#period3").prop('checked', true)
                }
                else{
                    hideShowPeriod3();
                }
            }
        });
    });

    // Datatatable Initialization
    $('#example').DataTable({
        columnDefs: [{
            targets: [ 0, 1, 2 ],
            className: 'mdl-data-table__cell--non-numeric'
        }]
    });
    reloadReportW();
});

function showToast2(message) {
    //show message
    M.toast({html: message, classes: 'rounded'});
}

$(function(){
    // Save associate
    $('#addAsoc').submit(function(e){
        var _token = $("#_token").val();
        var associateid = $("#associated").val();
        var associated = $("#associated").val();
        associateid = associateid.split(" ");
        var tam = associateid.length;
        if(tam <= 1){
            showToast2('THE ABI CODE DOES NOT CORRESPOND TO YOUR GENEALOGY!!');
        }
        else{
            associateid = associateid[0];
            var idAssoc = {_token: _token, associated: associateid, idsponsor: idsponsor};
            $.ajax({
                type: 'GET',
                url: 'addAsoc',
                data: idAssoc,
                success: function(Response){
                    if(Response){
                        $('#addAsoc').trigger('reset');
                        showToast2(associated + ' ADDED CORRECTLY!!');
                    }
                    else{
                        showToast2('THE ASSOCIATE IS ALREADY ADDED!!');
                        $("#associated").focus();
                    }
                }
            })
        }
        e.preventDefault();
    })
});

function number_format(number, decimals, dec_point, thousands_point) {
    if (number == null || !isFinite(number)) {
        throw new TypeError("number is not valid");
    }
    if (!decimals) {
        var len = number.toString().split('.').length;
        decimals = len > 1 ? len : 0;
    }
    if (!dec_point) {
        dec_point = '.';
    }
    if (!thousands_point) {
        thousands_point = ',';
    }
    number = parseFloat(number).toFixed(decimals);
    number = number.replace(".", dec_point);
    var splitNum = number.split(dec_point);
    splitNum[0] = splitNum[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousands_point);
    number = splitNum.join(dec_point);
    return number;
}

function reloadReportW(){
    // Clear and reload Table of report
    var period = today;

    var table = $('#example').DataTable({
        destroy: true,
        //ajax: "http://mynikkentest.nikkenlatam.com/accountinquiry/watchlist/reloadtabw/?idsponsor=" + idsponsor + "&period=" + period,
        ajax: "/reloadtabw?idsponsor=" + idsponsor + "&period=" + period,
        deferRender: true,
        processing: true,
        columns: [
            {
                data: null,
                className: "center",
                defaultContent: '<a href="javascript:void(0)" onclick="deleteRow(this.parentNode.parentNode.id)">' + 
                    '<img src="https://cdn0.iconfinder.com/data/icons/shift-symbol/32/Incorrect_Symbol-512.png" width="15px"/>' + 
                '</a>'
            },
            { data: 'Line' },
            { data: 'Level' },
            { data: 'associatename' },
            { data: 'associateid' },
            { data: 'email' },
            { data: 'mobile_number' },
            { data: 'alternative_number' },
            { data: 'country' },
            { data: 'PayRank' },
            { data: 'Distributor_status' },
            { data: 'InactiveMonths' },
            { data: 'RenewalDate' },
            {
                data: 'PV',
                "render": function(ata, type, row){
                    var pv = number_format(row.PV, 2, '.', ',');
                    return pv;
                }
            },
            {
                data: 'GV',
                "render": function(ata, type, row){
                    var GV = number_format(row.GV, 2, '.', ',');
                    return GV;
                }
            },
            {
                data: 'OV',
                "render": function(data, type, row){
                    var OV = number_format(row.OV, 2, '.', ',');
                    return OV
                }
            },
            {
                data: 'QOVOPL',
                "render": function(data, type, row){
                    var QOVOPL = number_format(row.QOVOPL, 2, '.', ',');
                    return QOVOPL
                }
            },
            {
                data: 'QOVOPSL',
                "render": function(data, type, row){
                    var QOVOPSL = number_format(row.QOVOPSL, 2, '.', ',');
                    return QOVOPSL
                }
            },

            {
                data: 'PV_1',
                "render": function(data, type, row){
                    var PV_1 = number_format(row.PV_1, 2, '.', ',');
                    return PV_1
                }
            },
            {
                data: 'GV_1',
                "render": function(data, type, row){
                    var GV_1 = number_format(row.GV_1, 2, '.', ',');
                    return GV_1
                }
            },
            {
                data: 'OV_1',
                "render": function(data, type, row){
                    var GV_1 = number_format(row.GV_1, 2, '.', ',');
                    return GV_1
                }
            },
            {
                data: 'QOVOPL_1',
                "render": function(data, type, row){
                    var QOVOPL_1 = number_format(row.QOVOPL_1, 2, '.', ',');
                    return QOVOPL_1
                }
            },
            {
                data: 'QOVOPSL_1',
                "render": function(data, type, row){
                    var QOVOPSL_1 = number_format(row.QOVOPSL_1, 2, '.', ',');
                    return QOVOPSL_1
                }
            },
            
            {
                data: 'PV_2',
                "render": function(data, type, row){
                    var PV_2 = number_format(row.PV_2, 2, '.', ',');
                    return PV_2
                }
            },
            {
                data: 'GV_2',
                "render": function(data, type, row){
                    var GV_2 = number_format(row.GV_2, 2, '.', ',');
                    return GV_2
                }
            },
            {
                data: 'OV_2',
                "render": function(data, type, row){
                    var OV_2 = number_format(row.OV_2, 2, '.', ',');
                    return OV_2
                }
            },
            {
                data: 'QOVOPL_2',
                "render": function(data, type, row){
                    var QOVOPL_2 = number_format(row.QOVOPL_2, 2, '.', ',');
                    return QOVOPL_2
                }
            },
            {
                data: 'QOVOPSL_2',
                "render": function(data, type, row){
                    var QOVOPSL_2 = number_format(row.QOVOPSL_2, 2, '.', ',');
                    return QOVOPSL_2
                }
            },
        ],
        rowId: function(a) {
            return a.associateid;
        },
        select: true,
        dom: 'Bfrtip',
        lengthMenu: [
            [ 10, 25, 50, -1 ],
            [ '10 rows', '25 rows', '50 rows', 'Show all' ]
        ],
        buttons: [
            'pageLength',
            {
                extend: 'print',
                text: 'Print Report',
                autoPrint: false,
                exportOptions: {
                    columns: ':visible',
                },
                customize: function (win) {
                    $(win.document.body).find('table').addClass('display').css('font-size', '9px');
                    $(win.document.body).find('tr:nth-child(odd) td').each(function(index){
                        $(this).css('background-color','#D0D0D0');
                    });
                    $(win.document.body).find('h1').css('text-align','center');
                }
            },
        ]
    });
}

function deleteRow(element){
    // Sweet alert to ask for delete the row selected
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })
      
    swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
    })
    .then((result) => {
        if (result.value) {
            /*swalWithBootstrapButtons.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
            )*/
            $.ajax({
                type: 'GET',
                url: currentURL + '/delAsoc',
                data: { id: element, idsponsor: idsponsor },
                success: function(Response) {
                    if(Response){
                        showToast2(element + ' DELETED CORRECTLY!!');
                        reloadReportW();
                    }
                }
            });
        } 
        else if (result.dismiss === Swal.DismissReason.cancel){
          swalWithBootstrapButtons.fire(
            'Cancelled',
            '',
            'error'
          )
        }
    })
}

$('.list_view input[type="checkbox"]').on('change', function(e) {
    // Show or hide the column in the table of report
    var table = $('#example').DataTable(); 
    var col = table.column($(this).attr('data-target'));
    col.visible(!col.visible());
});

$("input:checkbox").click(function(){
    if($(this).prop('checked')){
        var shcolumn = "." + $(this).attr("name");
        $(shcolumn).show();
    }
    else{
        var shcolumn = "." + $(this).attr("name");
        $(shcolumn).hide();
    }
    
});

function hideShowPeriod1(){
    var table = $('#example').DataTable(); 
    var col = table.column(13);
    col.visible(!col.visible());
    var col = table.column(14);
    col.visible(!col.visible());
    var col = table.column(15);
    col.visible(!col.visible());
    var col = table.column(16);
    col.visible(!col.visible());
    var col = table.column(17);
    col.visible(!col.visible());
}

function hideShowPeriod2(){
    var table = $('#example').DataTable();
    var col = table.column(18);
    col.visible(!col.visible());
    var col = table.column(19);
    col.visible(!col.visible());
    var col = table.column(20);
    col.visible(!col.visible());
    var col = table.column(21);
    col.visible(!col.visible());
    var col = table.column(22);
    col.visible(!col.visible());
}

function hideShowPeriod3(){
    var table = $('#example').DataTable(); 
    var col = table.column(23);
    col.visible(!col.visible());
    var col = table.column(24);
    col.visible(!col.visible());
    var col = table.column(25);
    col.visible(!col.visible());
    var col = table.column(26);
    col.visible(!col.visible());
    var col = table.column(27);
    col.visible(!col.visible());
}

function saveTableConf(){
    var idsponsor = 'idsponsor';
    var line_number = 'false';
    var levels = 'false';
    var name = 'false';
    var consultant_id = 'false';
    var email = 'false';
    var mobile_number = 'false';
    var alternative_num = 'false';
    var country = 'false';
    var pay_rank = 'false';
    var distributor_status = 'false';
    var inactive_months = 'false';
    var renewal_date = 'false';
    var period1 = 'false';
    var period2 = 'false';
    var period3 = 'false';

    if($('#line_number').is(':checked')){
        line_number = 'true';
    }
    if($('#levels').is(':checked')){
        levels = 'true';
    }
    if($('#name').is(':checked')){
        name = 'true';
    }
    if($('#consultant_id').is(':checked')){
        consultant_id = 'true';
    }
    if($('#email').is(':checked')){
        email = 'true';
    }
    if($('#mobile_number').is(':checked')){
        mobile_number = 'true';
    }
    if($('#alternative_num').is(':checked')){
        alternative_num = 'true';
    }
    if($('#country').is(':checked')){
        country = 'true';
    }
    if($('#pay_rank').is(':checked')){
        pay_rank = 'true';
    }
    if($('#distributor_status').is(':checked')){
        distributor_status = 'true';
    }
    if($('#inactive_months').is(':checked')){
        inactive_months = 'true';
    }
    if($('#renewal_date').is(':checked')){
        renewal_date = 'true';
    }
    if($('#period1').is(':checked')){
        period1 = 'true';
    }
    if($('#period2').is(':checked')){
        period2 = 'true';
    }
    if($('#period3').is(':checked')){
        period3 = 'true';
    }

    var data = {
        idsponsor: idsponsor,
        line_number: line_number,
        levels: levels,
        name: name,
        consultant_id: consultant_id,
        email: email,
        mobile_number: mobile_number,
        alternative_num: alternative_num,
        country: country,
        pay_rank: pay_rank,
        distributor_status: distributor_status,
        inactive_months: inactive_months,
        renewal_date: renewal_date,
        period1: period1,
        period2: period2,
        period3: period3,
    };

    console.log(data);

    $.ajax({
        type: 'GET',
        url: '/saveTableConf',
        data: data,
        success: function(Response) {
            if(Response){
                showToast2('CONFIGURATION SAVED CORRECTLY');
            }
            else{
                showToast2('ERROR SAVING THE CONFIGURATION');
            }
        }
    });
}