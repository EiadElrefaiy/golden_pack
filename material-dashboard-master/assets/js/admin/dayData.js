window.onload = function () { 
    var login = localStorage.getItem("login");
    if(login == 0){
        window.location.replace("../../../golden-hr-dash/material-dashboard-master/pages/sign-in.html");
    }else{
        var date = new Date();
        showData(date.getDate() , date.getMonth() + 1 , date.getFullYear());    
    }
}       
window.onload();

function showData(day , month , year){
    fetch("http://127.0.0.1:8000/api/v1/admins/get-day", {
        method: 'POST',
        body: JSON.stringify({
            day : day,
            month : month,
            year : year,
        }),
        headers: {
            "Content-Type": "application/json;charset=UTF-8"
        }
    })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            document.getElementById("day").value = day;
            document.getElementById("month").value = month;
            document.getElementById("year").value = year;        
            console.log(data); 
            $("#attendanceNode").empty();
            $("#attendanceNode").append('<tr> <td class="text-uppercase text-secondary text-lg font-weight-bolder ">الموظف</td> <td class="text-uppercase text-secondary text-lg font-weight-bolder ">الراتب اليومي</td> <td class="text-uppercase text-secondary text-lg font-weight-bolder ">من</td> <td class="text-uppercase text-secondary text-lg font-weight-bolder ">الى</td></tr> ');
            for(var n = 0; n < data["attendaces"].length; n++){
                var employee_name = data["attendaces"][n]["employee_name"];
                $("#attendanceNode").append('<tr class="attendance_tr"> <td class="id" style="display:none;">'+data["attendaces"][n]["id"]+'</td><td><h6 class="mb-0 text-sm">'+employee_name+'</h6></td><td> <h6 class="mb-0 text-sm attendance">'+data["attendaces"][n]["money"]+'</h6> </td> <td> <h6 class="mb-0 text-sm">'+data["attendaces"][n]["from"]+'</h6> </td> <td> <h6 class="mb-0 text-sm">'+data["attendaces"][n]["to"]+'</h6> </td></tr>')
            }
            
            $("#absenceNode").empty();
            $("#absenceNode").append('<tr> <td class="text-uppercase text-secondary text-lg font-weight-bolder ">الموظف</td> <td class="text-uppercase text-secondary text-lg font-weight-bolder ">الراتب اليومي</td></tr> ');
            for(var n = 0; n < data["absences"].length; n++){
                var employee_name = data["absences"][n]["employee_name"];
                $("#absenceNode").append('<tr class="absence_tr"> <td class="id" style="display:none;">'+data["absences"][n]["id"]+'</td> <td> <h6 class="mb-0 text-sm">'+employee_name+'</h6> </td> <td> <h6 class="mb-0 text-sm absence">'+data["absences"][n]["money"]+'</h6> </td></tr>')
            }

            $("#loanNode").empty();
            $("#loanNode").append('<tr> <td class="text-uppercase text-secondary text-lg font-weight-bolder ">الموظف</td> <td class="text-uppercase text-secondary text-lg font-weight-bolder ">المبلغ</td></tr> ');
            for(var n = 0; n < data["loans"].length; n++){
                var employee_name = data["loans"][n]["employee_name"];
                $("#loanNode").append('<tr class="loan_tr"> <td class="id" style="display:none;">'+data["loans"][n]["id"]+'</td> <td> <h6 class="mb-0 text-sm">'+employee_name+'</h6> </td> <td> <h6 class="mb-0 text-sm loan">'+data["loans"][n]["money"]+' جنيه</h6> </td>  </tr>')
            }

            $("#minceNode").empty();
            $("#minceNode").append('<tr> <td class="text-uppercase text-secondary text-lg font-weight-bolder ">الموظف</td> <td class="text-uppercase text-secondary text-lg font-weight-bolder ">المبلغ</td></tr> ');
            for(var n = 0; n < data["minces"].length; n++){
                var employee_name = data["minces"][n]["employee_name"];
                $("#minceNode").append('<tr class="mince_tr"><td class="id" style="display:none;">'+data["minces"][n]["id"]+'</td> <td> <h6 class="mb-0 text-sm">'+employee_name+'</h6> </td> <td> <h6 class="mb-0 text-sm mince">'+data["minces"][n]["money"]+' جنيه</h6> </td>  </tr>')
            }

            $("#overNode").empty();
            $("#overNode").append('<tr> <td class="text-uppercase text-secondary text-lg font-weight-bolder ">الموظف</td> <td class="text-uppercase text-secondary text-lg font-weight-bolder ">المبلغ</td></tr> ');
            for(var n = 0; n < data["overs"].length; n++){
                var employee_name = data["overs"][n]["employee_name"];
                $("#overNode").append('<tr class="over_tr"><td class="id" style="display:none;">'+data["overs"][n]["id"]+'</td> <td> <h6 class="mb-0 text-sm">'+employee_name+'</h6> </td> <td> <h6 class="mb-0 text-sm over">'+data["overs"][n]["money"]+' جنيه</h6> </td>  </tr>')
            }

            $("#incomeNode").empty();
            $("#incomeNode").append('<tr> <td class="text-uppercase text-secondary text-lg font-weight-bolder ">المبلغ</td> <td class="text-uppercase text-secondary text-lg font-weight-bolder ">الوصف</td> <td class="text-secondary opacity-7"></td> </tr>');
            for(var n = 0; n < data["incomes"].length; n++){
                $("#incomeNode").append('<tr class="income_tr"> <td class="id" style="display:none;">'+data["incomes"][n]["id"]+'</td><td> <h6 class="mb-0 text-sm income">'+data["incomes"][n]["money"]+' جنيه</h6> </td> <td> <h6 class="mb-0 text-sm">'+data["incomes"][n]["description"]+'</h6> </td> <td> <a href="javascript:;" class="text-secondary font-weight-bold text-xs" data-toggle="tooltip" data-original-title="بيانات الموظف user"> <span onclick="'+"showDeleteForm("+data["incomes"][n]["id"]+" , "+"'income'"+");"+'"   class="badge badge-sm bg-gradient-danger">حذف العملية</span> <span onclick="editIncomeForm('+data["incomes"][n]["id"]+');" class="badge badge-sm bg-gradient-warning">تعديل العملية</span> </a> </td> </tr>')
            }
            $("#outcomeNode").empty();
            $("#outcomeNode").append('<tr> <td class="text-uppercase text-secondary text-lg font-weight-bolder ">المبلغ</td> <td class="text-uppercase text-secondary text-lg font-weight-bolder ">الوصف</td> <td class="text-secondary opacity-7"></td> </tr>');
            for(var n = 0; n < data["outcomes"].length; n++){
                $("#outcomeNode").append('<tr class="outcome_tr"> <td class="id" style="display:none;">'+data["outcomes"][n]["id"]+'</td><td> <h6 class="mb-0 text-sm outcome">'+data["outcomes"][n]["money"]+' جنيه</h6> </td> <td> <h6 class="mb-0 text-sm">'+data["outcomes"][n]["description"]+'</h6> </td> <td> <a href="javascript:;" class="text-secondary font-weight-bold text-xs" data-toggle="tooltip" data-original-title="بيانات الموظف user"> <span onclick="'+"showDeleteForm("+data["outcomes"][n]["id"]+" , "+"'outcome'"+");"+'"   class="badge badge-sm bg-gradient-danger">حذف العملية</span> <span onclick="editOutcomeForm('+data["outcomes"][n]["id"]+');" class="badge badge-sm bg-gradient-warning">تعديل العملية</span> </a> </td> </tr>')
            }

            sumLoans();
            sumMinces();
            sumOvers();
            sumIncomes();
            sumOutcomes();
            sumAttendance();
            sumAbsence();
        });    
}

function sumAttendance(){
    var sum = 0;
    $('.attendance_tr').each(function() {
         sum = sum + 1;
    });
    $('#total_attendance').text(sum);
}

function sumAbsence(){
    var sum = 0;
    $('.absence_tr').each(function() {
         sum = sum + 1;
    });
    $('#total_absences').text(sum);
}

function sumLoans(){
    var sum = 0;
    $('.loan').each(function() {
         sum += parseFloat($(this).text().match(/\d/g).join(""));
    });
    $('#total_loans').text(sum);
}

function sumLoans(){
    var sum = 0;
    $('.loan').each(function() {
         sum += parseFloat($(this).text().match(/\d/g).join(""));
    });
    $('#total_loans').text(sum);
}

function sumMinces(){
    var sum = 0;
    $('.mince').each(function() {
         sum += parseFloat($(this).text().match(/\d/g).join(""));
    });
    $('#total_minces').text(sum);
}

function sumOvers(){
    var sum = 0;
    $('.over').each(function() {
         sum += parseFloat($(this).text().match(/\d/g).join(""));
    });
    $('#total_overs').text(sum);
}

function sumIncomes(){
    var sum = 0;
    $('.income').each(function() {
         sum += parseFloat($(this).text().match(/\d/g).join(""));
    });
    $('#total_incomes').text(sum);
}

function sumOutcomes(){
    var sum = 0;
    $('.outcome').each(function() {
         sum += parseFloat($(this).text().match(/\d/g).join(""));
    });
    $('#total_outcomes').text(sum);
}



function showAddIncomeForm(){
    document.getElementById("incomeMoney").value = "";
    document.getElementById("incomeDescription").value = "";
    $("#addIncomeForm").fadeIn(100);
} 

function cancelShowAddIncomeForm(){
    $("#addIncomeForm").fadeOut(100);
}

function addIncome(){
   var day = document.getElementById("day").value;
   var month = document.getElementById("month").value;
   var year = document.getElementById("year").value;        
    fetch("http://127.0.0.1:8000/api/v1/admins/add-income", {
        method: 'POST',
        body: JSON.stringify({
            money : document.getElementById("incomeMoney").value,
            description : document.getElementById("incomeDescription").value,
            date: day+"-"+month+"-"+year
        }),
        headers: {
            "Content-Type": "application/json;charset=UTF-8"
        }
    })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);
            $("#addIncomeForm").fadeOut(100);
            setTimeout(function(){
    
                alert("تم اضافة العملية");
    
            }, 100);     
    
            $("#incomeNode").append('<tr class="income_tr"> <td class="id" style="display:none;">'+data["id"]+'</td><td> <h6 class="mb-0 text-sm income">'+document.getElementById("incomeMoney").value+' جنيه</h6> </td> <td> <h6 class="mb-0 text-sm">'+document.getElementById("incomeDescription").value+'</h6> </td> <td> <a href="javascript:;" class="text-secondary font-weight-bold text-xs" data-toggle="tooltip" data-original-title="بيانات الموظف user"> <span onclick="'+"showDeleteForm("+data["id"]+" , "+"'income'"+");"+'"   class="badge badge-sm bg-gradient-danger">حذف العملية</span> <span onclick="editIncomeForm('+data["id"]+');" class="badge badge-sm bg-gradient-warning">تعديل العملية</span> </a> </td> </tr>');
            sumIncomes();
        });
}


var income_id = 0;
function editIncomeForm(id){
    income_id = id;
    var trs = $('.income_tr');
    var chkdName = "id";

    var money = $(trs).find("."+chkdName+':contains('+income_id+')').parent().eq(0).find('td:eq(1)').text();
    var description = $(trs).find("."+chkdName+':contains('+income_id+')').parent().eq(0).find('td:eq(2)').text();


    document.getElementById("editIncomeMoney").value = money.match(/\d/g).join("");
    document.getElementById("editIncomeDescription").value = description;

    $("#editIncomeForm").fadeIn(100);
} 

function cancelShowEditIncomeForm(){
    $("#editIncomeForm").fadeOut(100);
}

function editIncome(){
    fetch("http://127.0.0.1:8000/api/v1/admins/update-income", {
        method: 'POST',
        body: JSON.stringify({
            id : income_id,
            money : document.getElementById("editIncomeMoney").value,
            description : document.getElementById("editIncomeDescription").value,
        }),
        headers: {
            "Content-Type": "application/json;charset=UTF-8"
        }
    })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);
            $("#editIncomeForm").fadeOut(100);
            setTimeout(function(){
    
                alert("تم تعديل العملية");
    
            }, 100);     
            var trs = $('.income_tr');
            var chkdName = "id";        
            $(trs).find("."+chkdName+':contains('+income_id+')').parent().eq(0).find('td:eq(1)').find('h6').text(document.getElementById("editIncomeMoney").value + " جنيه");
            $(trs).find("."+chkdName+':contains('+income_id+')').parent().eq(0).find('td:eq(2)').find('h6').text(document.getElementById("editIncomeDescription").value);
            sumIncomes();
        });






}
function showAddOutcomeForm(){
    document.getElementById("outcomeMoney").value = "";
    document.getElementById("outcomeDescription").value = "";
    $("#addOutcomeForm").fadeIn(100);
} 

function cancelShowAddOutcomeForm(){
    $("#addOutcomeForm").fadeOut(100);
}

function addOutcome(){
    var day = document.getElementById("day").value;
    var month = document.getElementById("month").value;
    var year = document.getElementById("year").value;         
    fetch("http://127.0.0.1:8000/api/v1/admins/add-outcome", {
        method: 'POST',
        body: JSON.stringify({
            money : document.getElementById("outcomeMoney").value,
            description : document.getElementById("outcomeDescription").value,
            date: day+"-"+month+"-"+year
        }),
        headers: {
            "Content-Type": "application/json;charset=UTF-8"
        }
    })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);
            $("#addOutcomeForm").fadeOut(100);
            setTimeout(function(){
    
                alert("تم اضافة العملية");
    
            }, 100);     
    
            $("#outcomeNode").append('<tr class="outcome_tr"> <td class="id" style="display:none;">'+data["id"]+'</td><td> <h6 class="mb-0 text-sm outcome">'+document.getElementById("outcomeMoney").value+' جنيه</h6> </td> <td> <h6 class="mb-0 text-sm">'+document.getElementById("outcomeDescription").value+'</h6> </td> <td> <a href="javascript:;" class="text-secondary font-weight-bold text-xs" data-toggle="tooltip" data-original-title="بيانات الموظف user"> <span onclick="'+"showDeleteForm("+data["id"]+" , "+"'outcome'"+");"+'"   class="badge badge-sm bg-gradient-danger">حذف العملية</span> <span onclick="editOutcomeForm('+data["id"]+');" class="badge badge-sm bg-gradient-warning">تعديل العملية</span> </a> </td> </tr>');
            sumOutcomes();
        });
}


var outcome_id = 0;
function editOutcomeForm(id){
    outcome_id = id;
    var trs = $('.outcome_tr');
    var chkdName = "id";

    var money = $(trs).find("."+chkdName+':contains('+outcome_id+')').parent().eq(0).find('td:eq(1)').text();
    var description = $(trs).find("."+chkdName+':contains('+outcome_id+')').parent().eq(0).find('td:eq(2)').text();


    document.getElementById("editOutcomeMoney").value = money.match(/\d/g).join("");
    document.getElementById("editOutcomeDescription").value = description;

    $("#editOutcomeForm").fadeIn(100);
} 

function cancelShowEditOutcomeForm(){
    $("#editOutcomeForm").fadeOut(100);
}

function editOutcome(){
    fetch("http://127.0.0.1:8000/api/v1/admins/update-outcome", {
        method: 'POST',
        body: JSON.stringify({
            id : outcome_id,
            money : document.getElementById("editOutcomeMoney").value,
            description : document.getElementById("editOutcomeDescription").value,
        }),
        headers: {
            "Content-Type": "application/json;charset=UTF-8"
        }
    })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);
            $("#editOutcomeForm").fadeOut(100);
            setTimeout(function(){
    
                alert("تم تعديل العملية");
    
            }, 100);     
            var trs = $('.outcome_tr');
            var chkdName = "id";        
            $(trs).find("."+chkdName+':contains('+outcome_id+')').parent().eq(0).find('td:eq(1)').find('h6').text(document.getElementById("editOutcomeMoney").value + " جنيه");
            $(trs).find("."+chkdName+':contains('+outcome_id+')').parent().eq(0).find('td:eq(2)').find('h6').text(document.getElementById("editOutcomeDescription").value);
            sumOutcomes();
        });
}


id_delete = 0;
kind_delete = "";
function showDeleteForm(id , kind){
    id_delete = id;
    kind_delete = kind;
    $("#deleteForm").fadeIn(100);
} 
function cancelShowDeleteForm(){
    $("#deleteForm").fadeOut(100);
}
function deleteItem(){
    if(kind_delete == "income"){
        fetch("http://127.0.0.1:8000/api/v1/admins/delete-income", {
            method: 'POST',
            body: JSON.stringify({
                id : id_delete,
            }),
            headers: {
                "Content-Type": "application/json;charset=UTF-8"
            }
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data);
                $("#deleteForm").fadeOut(100);
                setTimeout(function(){
        
                    alert("تم حذف العملية");
        
                }, 100);     
                var trs = $('.income_tr');
                var chkdName = "id";        
                trs = $(trs).find("."+chkdName+':contains('+id_delete+')').parent().eq(0);
                $(trs).find('.income').removeClass("income");
                $(trs).hide();
                sumIncomes();
        });    
    }
    if(kind_delete == "outcome"){
        fetch("http://127.0.0.1:8000/api/v1/admins/delete-outcome", {
            method: 'POST',
            body: JSON.stringify({
                id : id_delete,
            }),
            headers: {
                "Content-Type": "application/json;charset=UTF-8"
            }
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data);
                $("#deleteForm").fadeOut(100);
                setTimeout(function(){
        
                    alert("تم حذف العملية");
        
                }, 100);     
                var trs = $('.outcome_tr');
                var chkdName = "id";        
                trs = $(trs).find("."+chkdName+':contains('+id_delete+')').parent().eq(0);
                $(trs).find('.outcome').removeClass("outcome");
                $(trs).hide();
                sumOutcomes();
        });    
    }
}





