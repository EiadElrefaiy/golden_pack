var id = localStorage.getItem("employeeId");
var day_money = 0;
window.onload = function () { 
    var login = localStorage.getItem("login");
    if(login == 0){
        window.location.replace("../../../golden-hr-dash/material-dashboard-master/pages/sign-in.html");
    }else{
        var date = new Date();
        showData(date.getMonth() + 1 , date.getFullYear());    
    }
}       
window.onload();


function showData(month , year){
    fetch("http://127.0.0.1:8000/api/v1/admins/get-employee-id", {
        method: 'POST',
        body: JSON.stringify({
            id : id,
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
            document.getElementById("month").value = month;
            document.getElementById("year").value = year;        
            console.log(data); 
            document.getElementById("get_name").innerHTML =  data["employee"]["name"];
            document.getElementById("get_phone").innerHTML =  data["employee"]["phone"];
            document.getElementById("get_money").innerHTML =  data["employee"]["money"];
            day_money = data["employee"]["money"];
            document.getElementById("get_address").innerHTML =  data["employee"]["address"];
            var start_date = data["employee"]["created_at"];
            document.getElementById("get_start_data").innerHTML =  start_date.substring(0 , 10);

            $("#attendanceNode").empty();
            $("#attendanceNode").append('<tr> <td class="text-uppercase text-secondary text-lg font-weight-bolder ">اليوم</td> <td class="text-uppercase text-secondary text-lg font-weight-bolder ">الراتب اليومي</td> <td class="text-uppercase text-secondary text-lg font-weight-bolder ">من</td> <td class="text-uppercase text-secondary text-lg font-weight-bolder ">الى</td></tr><td class="text-secondary opacity-7"></td>');
            for(var n = 0; n < data["empolyeeAttendance"].length; n++){
                var date = data["empolyeeAttendance"][n]["created_at"];
                $("#attendanceNode").append('<tr class="attendance_tr"> <td class="id" style="display:none;">'+data["empolyeeAttendance"][n]["id"]+'</td><td><h6 class="mb-0 text-sm">'+date.substring(0, 10)+'</h6></td><td> <h6 class="mb-0 text-sm attendance">'+data["empolyeeAttendance"][n]["money"]+'</h6> </td> <td> <h6 class="mb-0 text-sm">'+data["empolyeeAttendance"][n]["from"]+'</h6> </td> <td> <h6 class="mb-0 text-sm">'+data["empolyeeAttendance"][n]["to"]+'</h6> </td> <td> <a href="javascript:;" class="text-secondary font-weight-bold text-xs" data-toggle="tooltip" data-original-title="بيانات الموظف user"> <span onclick="'+"showDeleteForm("+data["empolyeeAttendance"][n]["id"]+" , "+"'attendance'"+");"+'"  class="badge badge-sm bg-gradient-danger">حذف الحضور</span> <span onclick="showEditAttendanceForm('+data["empolyeeAttendance"][n]["id"]+');" class="badge badge-sm bg-gradient-warning">تعديل الحضور</span> </a> </td> </tr>')
            }
            
            $("#absenceNode").empty();
            $("#absenceNode").append('<tr> <td class="text-uppercase text-secondary text-lg font-weight-bolder ">اليوم</td> <td class="text-uppercase text-secondary text-lg font-weight-bolder ">الراتب اليومي</td></tr><td class="text-secondary opacity-7"></td>');
            for(var n = 0; n < data["empolyeeAbsence"].length; n++){
                var date = data["empolyeeAbsence"][n]["created_at"];
                $("#absenceNode").append('<tr class="absence_tr"> <td class="id" style="display:none;">'+data["empolyeeAbsence"][n]["id"]+'</td> <td> <h6 class="mb-0 text-sm">'+date.substring(0, 10)+'</h6> </td> <td> <h6 class="mb-0 text-sm absence">'+data["empolyeeAbsence"][n]["money"]+'</h6> </td>  <td> <a href="javascript:;" class="text-secondary font-weight-bold text-xs" data-toggle="tooltip" data-original-title="بيانات الموظف user"> <span onclick="'+"showDeleteForm("+data["empolyeeAbsence"][n]["id"]+" , "+"'absence'"+");"+'" class="badge badge-sm bg-gradient-danger">حذف الغياب</span> </a> </td> </tr>')
            }

            $("#loanNode").empty();
            $("#loanNode").append('<tr> <td class="text-uppercase text-secondary text-lg font-weight-bolder ">اليوم</td> <td class="text-uppercase text-secondary text-lg font-weight-bolder ">المبلغ</td></tr> <td class="text-secondary opacity-7"></td>');
            for(var n = 0; n < data["empolyeeLoans"].length; n++){
                var date = data["empolyeeLoans"][n]["created_at"];
                $("#loanNode").append('<tr class="loan_tr"> <td class="id" style="display:none;">'+data["empolyeeLoans"][n]["id"]+'</td> <td> <h6 class="mb-0 text-sm">'+date.substring(0, 10)+'</h6> </td> <td> <h6 class="mb-0 text-sm loan">'+data["empolyeeLoans"][n]["money"]+' جنيه</h6> </td> <td> <a href="javascript:;" class="text-secondary font-weight-bold text-xs" data-toggle="tooltip" data-original-title="بيانات الموظف user"> <span onclick="'+"showDeleteForm("+data["empolyeeLoans"][n]["id"]+" , "+"'loan'"+");"+'"   class="badge badge-sm bg-gradient-danger">حذف السلفة</span> <span onclick="showEditLoanForm('+data["empolyeeLoans"][n]["id"]+');" class="badge badge-sm bg-gradient-warning">تعديل السلفة</span> </a> </td> </tr>')
            }

            $("#minceNode").empty();
            $("#minceNode").append('<tr> <td class="text-uppercase text-secondary text-lg font-weight-bolder ">اليوم</td> <td class="text-uppercase text-secondary text-lg font-weight-bolder ">المبلغ</td></tr> <td class="text-secondary opacity-7"></td>');
            for(var n = 0; n < data["empolyeeMinces"].length; n++){
                var date = data["empolyeeMinces"][n]["created_at"];
                $("#minceNode").append('<tr class="mince_tr"><td class="id" style="display:none;">'+data["empolyeeMinces"][n]["id"]+'</td> <td> <h6 class="mb-0 text-sm">'+date.substring(0, 10)+'</h6> </td> <td> <h6 class="mb-0 text-sm mince">'+data["empolyeeMinces"][n]["money"]+' جنيه</h6> </td> <td> <a href="javascript:;" class="text-secondary font-weight-bold text-xs" data-toggle="tooltip" data-original-title="بيانات الموظف user"> <span onclick="'+"showDeleteForm("+data["empolyeeMinces"][n]["id"]+" , "+"'mince'"+");"+'" class="badge badge-sm bg-gradient-danger">حذف الخصم</span> <span onclick="showEditMinceForm('+data["empolyeeMinces"][n]["id"]+');" class="badge badge-sm bg-gradient-warning">تعديل الخصم</span> </a> </td> </tr>')
            }

            $("#overNode").empty();
            $("#overNode").append('<tr> <td class="text-uppercase text-secondary text-lg font-weight-bolder ">اليوم</td> <td class="text-uppercase text-secondary text-lg font-weight-bolder ">المبلغ</td></tr> <td class="text-secondary opacity-7"></td>');
            for(var n = 0; n < data["empolyeeOver"].length; n++){
                var date = data["empolyeeOver"][n]["created_at"];
                $("#overNode").append('<tr class="over_tr"><td class="id" style="display:none;">'+data["empolyeeOver"][n]["id"]+'</td> <td> <h6 class="mb-0 text-sm">'+date.substring(0, 10)+'</h6> </td> <td> <h6 class="mb-0 text-sm over">'+data["empolyeeOver"][n]["money"]+' جنيه</h6> </td> <td> <a href="javascript:;" class="text-secondary font-weight-bold text-xs" data-toggle="tooltip" data-original-title="بيانات الموظف user"> <span onclick="'+"showDeleteForm("+data["empolyeeOver"][n]["id"]+" , "+"'over'"+");"+'" class="badge badge-sm bg-gradient-danger">حذف الزيادة</span> <span onclick="showEditOverForm('+data["empolyeeOver"][n]["id"]+');" class="badge badge-sm bg-gradient-warning">تعديل الزيادة</span> </a> </td> </tr>')
            }



            document.getElementById("attendance_count").innerHTML =  data["empolyeeAttendance"].length;
            document.getElementById("absences_count").innerHTML =  data["empolyeeAbsence"].length;
            sumAttendance();
            sumAbsence();
            sumLoans();
            sumMinces();
            sumOvers();
            getMonthMoney();
        });    
}


 function getMonthMoney(){
   var monthMoney = (totalAttendance + parseInt(document.getElementById("total_overs").innerHTML)) 
    - (totalAbsence + parseInt(document.getElementById("total_loans").innerHTML) + parseInt(document.getElementById("total_minces").innerHTML));
    document.getElementById("month_money").innerHTML = monthMoney;
 }
totalAttendance = 0
function sumAttendance(){
    var sum = 0;
    $('.attendance').each(function() {
         sum += parseFloat($(this).text().match(/\d/g).join(""));
    });
    totalAttendance = sum;
}

totalAbsence = 0
function sumAbsence(){
    var sum = 0;
    $('.absence').each(function() {
         sum += parseFloat($(this).text().match(/\d/g).join(""));
    });
    totalAbsence = sum;
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


function showEditEmployee(){
    var date = document.getElementById("get_start_data").innerHTML;
    var year = date.substring(0,4);
    var month = date.substring(5 , 7);
    var day = date.substring(8 ,10);

    var convertedDta = day + "/" + month + "/" + year;
    var myDate = convertedDta.split('/').reverse().join('-');
    let attendanceInput = document.getElementById("employee_start_date")
    attendanceInput.value = myDate;



    document.getElementById("name").value = document.getElementById("get_name").innerHTML;
    document.getElementById("phone").value = document.getElementById("get_phone").innerHTML;
    document.getElementById("address").value = document.getElementById("get_address").innerHTML;
    document.getElementById("money").value = document.getElementById("get_money").innerHTML;
    $("#editEmployeeForm").fadeIn(100);
} 

function cancelEditEmployee(){
    $("#editEmployeeForm").fadeOut(100);
    document.getElementById("name").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("address").value = "";
    document.getElementById("money").value = "";
}

function editEmployee(){
    var name = document.getElementById("name").value;
    var phone = document.getElementById("phone").value;
    var address = document.getElementById("address").value;
    var money = document.getElementById("money").value;
    var start_date = document.getElementById("employee_start_date").value;
    fetch("http://127.0.0.1:8000/api/v1/admins/update-employee", {
        method: 'POST',
        body: JSON.stringify({
        id , id,
        name : name,
        phone : phone,
        address : address,
        money : money,
        start_date : start_date
        }),
        headers: {
            "Content-Type": "application/json;charset=UTF-8"
        }
    })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            $("#editEmployeeForm").fadeOut();
            alert(data["msg"]); 
            document.getElementById("get_name").innerHTML = name;
            document.getElementById("get_phone").innerHTML = phone;
            document.getElementById("get_address").innerHTML = address;
            document.getElementById("get_money").innerHTML = money;
            document.getElementById("get_start_data").innerHTML = start_date;
        });    
}


function showAddAttendanceForm(){
    document.getElementById("fromAdd").value = "";
    document.getElementById("toAdd").value = "";    
    $("#addAttendanceForm").fadeIn(100);
    var date = new Date();
    document.getElementById("attendanceDateAdd").valueAsDate = date;
} 

function cancelEmployeeAttendance(){
    $("#addAttendanceForm").fadeOut(100);
}

function addAttendance(){
  fetch("http://127.0.0.1:8000/api/v1/admins/add-attendance", {
    method: 'POST',
    body: JSON.stringify({
        id : id,
        date : document.getElementById("attendanceDateAdd").value,
        from : document.getElementById("fromAdd").value,
        to : document.getElementById("toAdd").value,
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
        $("#addAttendanceForm").fadeOut(100);
        setTimeout(function(){

            alert("تم اضافة الحضور للموظف");

        }, 100);     

        var date = data["date"];
        $("#attendanceNode").append('<tr class="attendance_tr"> <td class="id" style="display:none;">'+data["id"]+'</td> <td> <h6 class="mb-0 text-sm">'+date.substring(0, 10)+'</h6> </td>  <td> <h6 class="mb-0 text-sm attendance">'+data["money"]+'</h6> </td> <td> <h6 class="mb-0 text-sm">'+ document.getElementById("fromAdd").value+'</h6> </td> <td> <h6 class="mb-0 text-sm">'+document.getElementById("toAdd").value+'</h6> </td> <td> <a href="javascript:;" class="text-secondary font-weight-bold text-xs" data-toggle="tooltip" data-original-title="بيانات الموظف user"> <span onclick="'+"showDeleteForm("+data["id"]+" , "+"'attendance'"+");"+'"  class="badge badge-sm bg-gradient-danger">حذف الحضور</span> <span onclick="showEditAttendanceForm('+data["id"]+');" class="badge badge-sm bg-gradient-warning">تعديل الحضور</span> </a> </td> </tr>');
        var attendance_count = parseInt(document.getElementById("attendance_count").innerHTML) + 1;
        document.getElementById("attendance_count").innerHTML = attendance_count;
        sumAttendance();
        getMonthMoney();
    });
}

var attendance_id = 0;
function showEditAttendanceForm(id){
    attendance_id = id;
    var trs = $('.attendance_tr');
    var chkdName = "id";

    var date = $(trs).find("."+chkdName+':contains('+attendance_id+')').parent().eq(0).find('td:eq(1)').text();
    var from = $(trs).find("."+chkdName+':contains('+attendance_id+')').parent().eq(0).find('td:eq(3)').text();
    var to = $(trs).find("."+chkdName+':contains('+attendance_id+')').parent().eq(0).find('td:eq(4)').text();

    if(date.length != 10){
        date =  date.slice(1 , 11);
    }

    //var date = "06/06/2023";
    //var from = "22:53:05";
    //var to = "08:53:05";
    var year = date.substring(0,4);
    var month = date.substring(5 , 7);
    var day = date.substring(8 ,10);

    var fromTime = from.substring(1 , 6) +":00";
    var toTime = to.substring(1 , 6) +":00";


    var convertedDta = day + "/" + month + "/" + year;
    var myDate = convertedDta.split('/').reverse().join('-');

    let attendanceInput = document.getElementById("editAttendanceDate")
    attendanceInput.value = myDate;

    document.getElementById("editFrom").value = fromTime;
    document.getElementById("editTo").value = toTime;
    $("#editAttendanceForm").fadeIn(100);
} 

function cancelEditEmployeeAttendance(){
    $("#editAttendanceForm").fadeOut(100);
}

function editAttendance(){
    fetch("http://127.0.0.1:8000/api/v1/admins/update-attendance", {
        method: 'POST',
        body: JSON.stringify({
            id : attendance_id,
            employee_id : id,
            date : document.getElementById("editAttendanceDate").value,
            from : document.getElementById("editFrom").value,
            to : document.getElementById("editTo").value,
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
            $("#editAttendanceForm").fadeOut(100);
            setTimeout(function(){
    
                alert("تم تعديل الحضور للموظف");
    
            }, 100);     
            var trs = $('.attendance_tr');
            var chkdName = "id";        
            $(trs).find("."+chkdName+':contains('+attendance_id+')').parent().eq(0).find('td:eq(1)').find('h6').text(document.getElementById("editAttendanceDate").value);
            $(trs).find("."+chkdName+':contains('+attendance_id+')').parent().eq(0).find('td:eq(3)').find('h6').text(document.getElementById("editFrom").value);
            $(trs).find("."+chkdName+':contains('+attendance_id+')').parent().eq(0).find('td:eq(4)').find('h6').text(document.getElementById("editTo").value);
            sumAttendance();
            getMonthMoney();
        });
    
}

function showAddAbsenceForm(){
    $("#addAbsenceForm").fadeIn(100);
    var date = new Date();
    document.getElementById("AbsenceDate").valueAsDate = date;
} 

function cancelEmployeeAbsence(){
    $("#addAbsenceForm").fadeOut(100);
}

function addAbsence(){
    fetch("http://127.0.0.1:8000/api/v1/admins/add-absence", {
        method: 'POST',
        body: JSON.stringify({
            id : id,
            date : document.getElementById("AbsenceDate").value,
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
            $("#addAbsenceForm").fadeOut(100);
            setTimeout(function(){
    
                alert("تم اضافة الغياب للموظف");
    
            }, 100);     
    
            var date = data["date"];
            $("#absenceNode").append('<tr class="absence_tr"> <td class="id" style="display:none;">'+data["id"]+'</td> <td> <h6 class="mb-0 text-sm">'+date.substring(0, 10)+'</h6> </td> <td> <h6 class="mb-0 text-sm absence">'+data["money"]+'</h6> </td><td> <a href="javascript:;" class="text-secondary font-weight-bold text-xs" data-toggle="tooltip" data-original-title="بيانات الموظف user"> <span onclick="'+"showDeleteForm("+data["id"]+" , "+"'absence'"+");"+'" class="badge badge-sm bg-gradient-danger">حذف الغياب</span> </a> </td> </tr>');
            var absence_count = parseInt(document.getElementById("absences_count").innerHTML) + 1;
            document.getElementById("absences_count").innerHTML = absence_count;   
            sumAbsence();     
            getMonthMoney();
        });
    
}

function showAddLoanForm(){
    document.getElementById("loanMoney").value = "";
    $("#addLoanForm").fadeIn(100);
    var date = new Date();
    document.getElementById("loanDate").valueAsDate = date;
} 

function cancelShowAddLoanForm(){
    $("#addLoanForm").fadeOut(100);
}

function addLoan(){
    fetch("http://127.0.0.1:8000/api/v1/admins/add-loan", {
        method: 'POST',
        body: JSON.stringify({
            id : id,
            money : document.getElementById("loanMoney").value,
            date : document.getElementById("loanDate").value,
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
            $("#addLoanForm").fadeOut(100);
            setTimeout(function(){
    
                alert("تم اضافة السلفة للموظف");
    
            }, 100);     
    
            var date = data["date"];
            $("#loanNode").append('<tr class="loan_tr"> <td class="id" style="display:none;">'+data["id"]+'</td> <td> <h6 class="mb-0 text-sm">'+date.substring(0, 10)+'</h6> </td> <td> <h6 class="mb-0 text-sm loan">'+document.getElementById("loanMoney").value+' جنيه</h6> </td> <td> <a href="javascript:;" class="text-secondary font-weight-bold text-xs" data-toggle="tooltip" data-original-title="بيانات الموظف user"> <span onclick="'+"showDeleteForm("+data["id"]+" , "+"'loan'"+");"+'"   class="badge badge-sm bg-gradient-danger">حذف السلفة</span> <span onclick="showEditLoanForm('+data["id"]+');" class="badge badge-sm bg-gradient-warning">تعديل السلفة</span> </a> </td> </tr>');
            sumLoans();
            getMonthMoney();
        });

}

var loan_id = 0;
function showEditLoanForm(id){
    loan_id = id;
    var trs = $('.loan_tr');
    var chkdName = "id";

    var date = $(trs).find("."+chkdName+':contains('+loan_id+')').parent().eq(0).find('td:eq(1)').text();
    var money = $(trs).find("."+chkdName+':contains('+loan_id+')').parent().eq(0).find('td:eq(2)').text();

    //var date = "06/06/2023";
    //var from = "22:53:05";
    //var to = "08:53:05";
    var year = date.substring(1,5);
    var month = date.substring(6 , 8);
    var day = date.substring(9 ,11);
    
    var convertedDta = day + "/" + month + "/" + year;
    var myDate = convertedDta.split('/').reverse().join('-');

   // alert(convertedDta + '\n' + fromTime + '\n' + toTime);
    let attendanceInput = document.getElementById("editLoanDate")
    attendanceInput.value = myDate;

    document.getElementById("editLoanMoney").value = money.match(/\d/g).join("");

    $("#editLoanForm").fadeIn(100);
} 

function cancelShowEditLoanForm(){
    $("#editLoanForm").fadeOut(100);
}

function editLoan(){
    fetch("http://127.0.0.1:8000/api/v1/admins/update-loan", {
        method: 'POST',
        body: JSON.stringify({
            id : loan_id,
            date : document.getElementById("editLoanDate").value,
            money : document.getElementById("editLoanMoney").value,
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
            $("#editLoanForm").fadeOut(100);
            setTimeout(function(){
    
                alert("تم تعديل السلفة للموظف");
    
            }, 100);     
            var trs = $('.loan_tr');
            var chkdName = "id";        
            $(trs).find("."+chkdName+':contains('+loan_id+')').parent().eq(0).find('td:eq(1)').find('h6').text(document.getElementById("editLoanDate").value);
            $(trs).find("."+chkdName+':contains('+loan_id+')').parent().eq(0).find('td:eq(2)').find('h6').text(document.getElementById("editLoanMoney").value + " جنيه");
            sumLoans();
            getMonthMoney();
        });
}

function showAddMinceForm(){
    document.getElementById("minceMoney").value = "";
    $("#addMinceForm").fadeIn(100);
    var date = new Date();
    document.getElementById("minceDate").valueAsDate = date;
} 

function cancelShowAddMinceForm(){
    $("#addMinceForm").fadeOut(100);
}

function addMince(){
    fetch("http://127.0.0.1:8000/api/v1/admins/add-mince", {
        method: 'POST',
        body: JSON.stringify({
            id : id,
            money : document.getElementById("minceMoney").value,
            date : document.getElementById("minceDate").value,
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
            $("#addMinceForm").fadeOut(100);
            setTimeout(function(){
    
                alert("تم اضافة الخصم للموظف");
    
            }, 100);     
    
            var date = data["date"];
            $("#minceNode").append('<tr class="mince_tr"> <td class="id" style="display:none;">'+data["id"]+'</td> <td> <h6 class="mb-0 text-sm">'+date.substring(0, 10)+'</h6> </td> <td> <h6 class="mb-0 text-sm mince">'+document.getElementById("minceMoney").value+' جنيه</h6> </td> <td> <a href="javascript:;" class="text-secondary font-weight-bold text-xs" data-toggle="tooltip" data-original-title="بيانات الموظف user"> <span onclick="'+"showDeleteForm("+data["id"]+" , "+"'mince'"+");"+'"   class="badge badge-sm bg-gradient-danger">حذف السلفة</span> <span onclick="showEditMinceForm('+data["id"]+');" class="badge badge-sm bg-gradient-warning">تعديل السلفة</span> </a> </td> </tr>');
            sumMinces();
            getMonthMoney();        
        });
}

mince_id = 0;
function showEditMinceForm(id){
    mince_id = id;
    var trs = $('.mince_tr');
    var chkdName = "id";

    var date = $(trs).find("."+chkdName+':contains('+mince_id+')').parent().eq(0).find('td:eq(1)').text();
    var money = $(trs).find("."+chkdName+':contains('+mince_id+')').parent().eq(0).find('td:eq(2)').text();

    //var date = "06/06/2023";
    //var from = "22:53:05";
    //var to = "08:53:05";
    var year = date.substring(1,5);
    var month = date.substring(6 , 8);
    var day = date.substring(9 ,11);
    
    var convertedDta = day + "/" + month + "/" + year;
    var myDate = convertedDta.split('/').reverse().join('-');

   // alert(convertedDta + '\n' + fromTime + '\n' + toTime);
    let attendanceInput = document.getElementById("editMinceDate")
    attendanceInput.value = myDate;

    document.getElementById("editMinceMoney").value = money.match(/\d/g).join("");

    $("#editMinceForm").fadeIn(100);
} 

function cancelShowEditMinceForm(){
    $("#editMinceForm").fadeOut(100);
    document.getElementById("editMinceMoney").value = "";
}

function editMince(){
    fetch("http://127.0.0.1:8000/api/v1/admins/update-mince", {
        method: 'POST',
        body: JSON.stringify({
            id : mince_id,
            date : document.getElementById("editMinceDate").value,
            money : document.getElementById("editMinceMoney").value,
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
            $("#editMinceForm").fadeOut(100);
            setTimeout(function(){
    
                alert("تم تعديل الخصم للموظف");
    
            }, 100);     
            var trs = $('.mince_tr');
            var chkdName = "id";        
            $(trs).find("."+chkdName+':contains('+mince_id+')').parent().eq(0).find('td:eq(1)').find('h6').text(document.getElementById("editMinceDate").value);
            $(trs).find("."+chkdName+':contains('+mince_id+')').parent().eq(0).find('td:eq(2)').find('h6').text(document.getElementById("editMinceMoney").value + " جنيه");
            sumMinces();
            getMonthMoney();
        });
}

function showAddOverForm(){
    document.getElementById("overMoney").value = "";
    $("#addOverForm").fadeIn(100);
    var date = new Date();
    document.getElementById("overDate").valueAsDate = date;
} 

function cancelShowAddOverForm(){
    $("#addOverForm").fadeOut(100);
}

function addOver(){
    fetch("http://127.0.0.1:8000/api/v1/admins/add-over", {
        method: 'POST',
        body: JSON.stringify({
            id : id,
            money : document.getElementById("overMoney").value,
            date : document.getElementById("overDate").value,
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
            $("#addOverForm").fadeOut(100);
            setTimeout(function(){
    
                alert("تم اضافة الزيادة للموظف");
    
            }, 100);     
    
            var date = data["date"];
            $("#overNode").append('<tr class="over_tr"> <td class="id" style="display:none;">'+data["id"]+'</td> <td> <h6 class="mb-0 text-sm">'+date.substring(0, 10)+'</h6> </td> <td> <h6 class="mb-0 text-sm over">'+document.getElementById("overMoney").value+' جنيه</h6> </td> <td> <a href="javascript:;" class="text-secondary font-weight-bold text-xs" data-toggle="tooltip" data-original-title="بيانات الموظف user"> <span onclick="'+"showDeleteForm("+data["id"]+" , "+"'over'"+");"+'"   class="badge badge-sm bg-gradient-danger">حذف السلفة</span> <span onclick="showEditOverForm('+data["id"]+');" class="badge badge-sm bg-gradient-warning">تعديل السلفة</span> </a> </td> </tr>');
        sumOvers();
        getMonthMoney();
        });
}

over_id = 0;
function showEditOverForm(id){
    over_id = id;
    var trs = $('.over_tr');
    var chkdName = "id";

    var date = $(trs).find("."+chkdName+':contains('+over_id+')').parent().eq(0).find('td:eq(1)').text();
    var money = $(trs).find("."+chkdName+':contains('+over_id+')').parent().eq(0).find('td:eq(2)').text();

    //var date = "06/06/2023";
    //var from = "22:53:05";
    //var to = "08:53:05";
    var year = date.substring(1,5);
    var month = date.substring(6 , 8);
    var day = date.substring(9 ,11);
    
    var convertedDta = day + "/" + month + "/" + year;
    var myDate = convertedDta.split('/').reverse().join('-');

   // alert(convertedDta + '\n' + fromTime + '\n' + toTime);
    let attendanceInput = document.getElementById("editOverDate")
    attendanceInput.value = myDate;

    document.getElementById("editOverMoney").value = money.match(/\d/g).join("");

    $("#editOverForm").fadeIn(100);
} 

function cancelShowEditOverForm(){
    $("#editOverForm").fadeOut(100);
    document.getElementById("editOverMoney").value = "";
}

function editOver(){
    fetch("http://127.0.0.1:8000/api/v1/admins/update-over", {
        method: 'POST',
        body: JSON.stringify({
            id : over_id,
            date : document.getElementById("editOverDate").value,
            money : document.getElementById("editOverMoney").value,
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
            $("#editOverForm").fadeOut(100);
            setTimeout(function(){
    
                alert("تم تعديل الزيادة للموظف");
    
            }, 100);     
            var trs = $('.over_tr');
            var chkdName = "id";        
            $(trs).find("."+chkdName+':contains('+over_id+')').parent().eq(0).find('td:eq(1)').find('h6').text(document.getElementById("editOverDate").value);
            $(trs).find("."+chkdName+':contains('+over_id+')').parent().eq(0).find('td:eq(2)').find('h6').text(document.getElementById("editOverMoney").value + " جنيه");
            sumOvers();
            getMonthMoney();
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
    if(kind_delete == "attendance"){
        fetch("http://127.0.0.1:8000/api/v1/admins/delete-attendance", {
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
        
                    alert("تم حذف الحضور للموظف");
        
                }, 100);     
                var trs = $('.attendance_tr');
                var chkdName = "id";        
                trs = $(trs).find("."+chkdName+':contains('+id_delete+')').parent().eq(0);
                $(trs).find('.attendance').removeClass("attendance");
                $(trs).hide();
                var attendance_count = parseInt(document.getElementById("attendance_count").innerHTML) - 1;
                document.getElementById("attendance_count").innerHTML = attendance_count; 
                sumAttendance();
                getMonthMoney();       
                });    
    }
    if(kind_delete == "absence"){
        fetch("http://127.0.0.1:8000/api/v1/admins/delete-absence", {
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
        
                    alert("تم حذف الغياب للموظف");
        
                }, 100);     
                var trs = $('.absence_tr');
                var chkdName = "id";        
                trs = $(trs).find("."+chkdName+':contains('+id_delete+')').parent().eq(0);
                $(trs).find('.absence').removeClass("absence");
                $(trs).hide();
                var absence_count = parseInt(document.getElementById("absences_count").innerHTML) - 1;
                document.getElementById("absences_count").innerHTML = absence_count; 
                sumAbsence();       
                getMonthMoney();
                });    

    }
    if(kind_delete == "loan"){
        fetch("http://127.0.0.1:8000/api/v1/admins/delete-loan", {
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
        
                    alert("تم حذف السلفة للموظف");
        
                }, 100);     
                var trs = $('.loan_tr');
                var chkdName = "id";        
                trs = $(trs).find("."+chkdName+':contains('+id_delete+')').parent().eq(0);
                $(trs).find('.loan').removeClass("loan");
                $(trs).hide();
                sumLoans();
                getMonthMoney();
                });    
    }
    if(kind_delete == "mince"){
        fetch("http://127.0.0.1:8000/api/v1/admins/delete-mince", {
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
        
                    alert("تم حذف الخصم للموظف");
        
                }, 100);     
                var trs = $('.mince_tr');
                var chkdName = "id";        
                trs = $(trs).find("."+chkdName+':contains('+id_delete+')').parent().eq(0);
                $(trs).find('.mince').removeClass("mince");
                $(trs).hide();
                sumMinces();
                getMonthMoney();
        });    
    }
    if(kind_delete == "over"){
        fetch("http://127.0.0.1:8000/api/v1/admins/delete-over", {
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
        
                    alert("تم حذف الزيادة للموظف");
        
                }, 100);     
                var trs = $('.over_tr');
                var chkdName = "id";        
                trs = $(trs).find("."+chkdName+':contains('+id_delete+')').parent().eq(0);
                $(trs).find('.over').removeClass("over");
                $(trs).hide();
                sumOvers();
                getMonthMoney();
        });    
    }
}

