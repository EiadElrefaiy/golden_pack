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
    fetch("http://127.0.0.1:8000/api/v1/admins/get-month", {
        method: 'POST',
        body: JSON.stringify({
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
            $("#empNode").empty();
            $("#empNode").append('<tr> <td class="text-uppercase text-secondary text-lg font-weight-bolder ">الموظف</td> <td class="text-uppercase text-secondary text-lg font-weight-bolder ">الراتب اليومي</td> <td class="text-uppercase text-secondary text-lg font-weight-bolder ">عدد مرات الحضور</td> <td class="text-uppercase text-secondary text-lg font-weight-bolder ">عدد مرات الغياب</td> <td class="text-uppercase text-secondary text-lg font-weight-bolder ">اجمالي السلف</td><td class="text-uppercase text-secondary text-lg font-weight-bolder ">اجمالي الخصومات</td><td class="text-uppercase text-secondary text-lg font-weight-bolder ">اجمالي الزيادات</td><td class="text-uppercase text-secondary text-lg font-weight-bolder ">رصيد الشهر</td></tr> ');
            for(var n = 0; n < data["employee"].length; n++){
                $("#empNode").append('<tr class="emp"><td><h6 class="mb-0 text-sm">'+data["employee"][n]["name"]+'</h6></td><td> <h6 class="mb-0 text-sm attendance">'+data["employee"][n]["salary"]+' جنيه</h6> </td> <td class="emp_attendance"> <h6 class="mb-0 text-sm">'+data["employee"][n]["attendance_count"]+'</h6> </td> <td> <h6 class="mb-0 text-sm">'+data["employee"][n]["absence_count"]+'</h6> </td> <td> <h6 class="mb-0 text-sm">'+data["employee"][n]["loans_money"]+' جنيه</h6> </td><td> <h6 class="mb-0 text-sm">'+data["employee"][n]["minces_money"]+' جنيه</h6> </td><td> <h6 class="mb-0 text-sm">'+data["employee"][n]["overs_money"]+' جنيه</h6> </td><td class="emp_total"> <h6 class="mb-0 text-sm">'+data["employee"][n]["total"]+' جنيه</h6></td></tr>')
            }
            
            $("#incomeNode").empty();
            $("#incomeNode").append('<tr> <td class="text-uppercase text-secondary text-lg font-weight-bolder ">اليوم</td> <td class="text-uppercase text-secondary text-lg font-weight-bolder ">المبلغ</td> <td class="text-uppercase text-secondary text-lg font-weight-bolder ">الوصف</td></tr>');
            for(var n = 0; n < data["incomes"].length; n++){
                var date = data["incomes"][n]["created_at"];
                $("#incomeNode").append('<tr class="income_tr"> <td class="id" style="display:none;">'+data["incomes"][n]["id"]+'</td><td> <h6 class="mb-0 text-sm">'+date.substring(0, 10)+'</h6> </td><td> <h6 class="mb-0 text-sm income">'+data["incomes"][n]["money"]+' جنيه</h6> </td> <td> <h6 class="mb-0 text-sm">'+data["incomes"][n]["description"]+'</h6> </td></tr>')
            }
            $("#outcomeNode").empty();
            $("#outcomeNode").append('<tr><td class="text-uppercase text-secondary text-lg font-weight-bolder ">اليوم</td>  <td class="text-uppercase text-secondary text-lg font-weight-bolder ">المبلغ</td> <td class="text-uppercase text-secondary text-lg font-weight-bolder ">الوصف</td> <td class="text-secondary opacity-7"></td> </tr>');
            for(var n = 0; n < data["outcomes"].length; n++){
                var date = data["outcomes"][n]["created_at"];
                $("#outcomeNode").append('<tr class="outcome_tr"> <td class="id" style="display:none;">'+data["outcomes"][n]["id"]+'</td><td> <h6 class="mb-0 text-sm">'+date.substring(0, 10)+'</h6> </td><td> <h6 class="mb-0 text-sm outcome">'+data["outcomes"][n]["money"]+' جنيه</h6> </td> <td> <h6 class="mb-0 text-sm">'+data["outcomes"][n]["description"]+'</h6> </td></tr>')
            }
            $('#total_emp').text(data["employees_total"]);
            hideEmployeesNotExisted();
            //sumEmp();
            sumIncomes();
            sumOutcomes();
        });    
}

function hideEmployeesNotExisted(){
    $('.emp_attendance').each(function() {
        if(parseInt($(this).text().match(/\d/g).join("")) == 0){
            $(this).removeClass("emp_attendance");
            $(this).parent().find(".emp_total").removeClass("emp_total");
            $(this).parent().hide();
        }
    });
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

/*
function sumEmp(){
    var sum = 0;
    $('.emp_total').each(function() {
         sum += parseFloat($(this).text().match(/\d/g).join(""));
    });
    $('#total_emp').text(sum);
}
*/

