
window.onload = function () {
    var login = localStorage.getItem("login");
    if(login == 0){
        window.location.replace("../../../golden-hr-dash/material-dashboard-master/pages/sign-in.html");
    }else{        
            fetch("http://127.0.0.1:8000/api/v1/admins/get-employees", {
                method: 'POST',
                body: JSON.stringify({
                }),
                headers: {
                    "Content-Type": "application/json;charset=UTF-8"
                }
            })
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    shops = data;
                    console.log(data); 
                    var employees_total_salaries = 0;
                    for(var n = 0; n <= data["employees"].length - 1; n++){ 
                        var date = data["employees"][n]["created_at"];
                        employees_total_salaries = employees_total_salaries + data["employees"][n]["money"];
                        $("#employeeNode").append('<tr><td style="display: none;" class="id">'+data["employees"][n]["id"]+'</td> <td class="name"> <h6 class="mb-0 text-sm">'+data["employees"][n]["name"]+'</h6> </td> <td> <h6 class="mb-0 text-sm">'+data["employees"][n]["phone"]+'</h6> </td> <td> <h6 class="mb-0 text-sm">'+data["employees"][n]["address"]+'</h6> </td> <td> <h6 class="mb-0 text-sm">'+data["employees"][n]["money"]+' جنيه</h6> </td> <td> <h6 class="mb-0 text-sm">'+date.substring(0, 10)+'<h6> </td> <td> <a href="javascript:;" class="text-secondary font-weight-bold text-xs" data-toggle="tooltip" data-original-title="بيانات الموظف user"> <span onclick="'+"employeeData("+data["employees"][n]["id"]+");"+'" class="badge badge-sm bg-gradient-warning">بيانات الموظف</span> <span onclick="'+"showDeleteEmployee("+data["employees"][n]["id"]+");"+'" class="badge badge-sm bg-gradient-danger">حذف الموظف</span> </a> </td> </tr> ');
                    }
                    document.getElementById("employees_total_salaries").innerHTML =   employees_total_salaries;
                    document.getElementById("employees_count").innerHTML =  data["employees"].length;
                });    

                
                /*
                $( "#myInput" ).keyup(function() {
                    input = document.getElementById("myInput");
                    filter = input.value.toUpperCase();

                    fetch("http://app.getcenter.info/api/v1/admins/get-shops", {
                        method: 'POST',
                        body: JSON.stringify({
                            api_password: "tQnyBMCfK32bUx6pUnIh5IzR",
                        }),
                        headers: {
                            "Content-Type": "application/json;charset=UTF-8"
                        }
                    })
                        .then((response) => {
                            return response.json();
                        })
                        .then((data) => {
                            $("#node").empty();
                            for(var n = 0; n <= data.length; n++){
                                txtValue = data[n]["name"];
                                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                                    $("#node").append('<div class="shop col-sm-6 col-md-6 col-lg-3"><div class="card iq-mb-3"><img height="185" src="'+data[n]["logo"]+'" class="card-img-top" alt="#"><div class="card-body"><div class="row"><div class="col-lg-6"><h4 class="card-title">'+data[n]["name"]+'</h4></div><div class="col-lg-6"><a href="#" class="btn btn-primary" onclick="'+"localStorage.setItem('shopPage' , "+data[n]["id"]+");location.replace('shopDetails.html');"+'">التفاصيل</a></div></div> </div></div></div>');
                                }
                            }
                        });
                });         
                */      
              }
            }
window.onload();

function search(){
    input = document.getElementById("myInput").value;
    
    var trs = $('tr:not(:first)');
    $(trs).hide();

    var chkdName = "name";
    trs = $(trs).find("."+chkdName+':contains('+input+')').parent();
    $(trs).show();
}

function employeeData(id){
    localStorage.setItem("employeeId" , id);
    location.assign('updateEmployee.html');
}


function test(){
    $("#addEmployeeForm").slideDown();
} 

function cancelAddEmployee(){
    $("#addEmployeeForm").slideUp();
    document.getElementById("name").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("address").value = "";
    document.getElementById("money").value = "";
}

function addEmployee(){
    var name = document.getElementById("name").value;
    var phone = document.getElementById("phone").value;
    var address = document.getElementById("address").value;
    var money = document.getElementById("money").value;
    fetch("http://127.0.0.1:8000/api/v1/admins/add-employee", {
        method: 'POST',
        body: JSON.stringify({
        name : name,
        phone : phone,
        address : address,
        money : money,
        }),
        headers: {
            "Content-Type": "application/json;charset=UTF-8"
        }
    })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            $("#addEmployeeForm").fadeOut();
            alert(data["msg"]); 
            var date = data["date"];
            $("#employeeNode").append('<tr> <td style="display: none;" class="id">'+data["id"]+'</td> <td class="name"> <h6 class="mb-0 text-sm">'+name+'</h6> </td> <td> <h6 class="mb-0 text-sm">'+phone+'</h6> </td> <td> <h6 class="mb-0 text-sm">'+address+'</h6> </td> <td> <h6 class="mb-0 text-sm">'+money+' جنيه</h6> </td> <td> <h6 class="mb-0 text-sm">'+date.substring(0, 10)+'<h6> </td> <td> <a href="javascript:;" class="text-secondary font-weight-bold text-xs" data-toggle="tooltip" data-original-title="بيانات الموظف user"> <span onclick="'+"employeeData("+data["id"]+");"+'" class="badge badge-sm bg-gradient-warning">بيانات الموظف</span> <span onclick="'+"showDeleteEmployee("+data["id"]+");"+'" class="badge badge-sm bg-gradient-danger">حذف الموظف</span> </a> </td> </tr>');
            document.getElementById("name").value = "";
            document.getElementById("phone").value = "";
            document.getElementById("address").value = "";
            document.getElementById("money").value = "";
        });    
}

var employee_id = 0;
function showDeleteEmployee(id){
    employee_id = id;
    $("#deleteEmployee").fadeIn(100);
}

function cancelshowDeleteEmployee(){
    $("#deleteEmployee").fadeOut(100);
}

function deleteEmployee(){
    id= employee_id;
    fetch("http://127.0.0.1:8000/api/v1/admins/delete-employee", {
        method: 'POST',
        body: JSON.stringify({
        id : id,
        }),
        headers: {
            "Content-Type": "application/json;charset=UTF-8"
        }
    })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            var trs = $('tr:not(:first)');
            var chkdName = "id";
            trs = $(trs).find("."+chkdName+':contains('+id+')').parent().eq(0);
            $(trs).hide();
            $("#deleteEmployee").fadeOut(100);
            setTimeout(function(){
    
                alert("تم حذف الموظف");
    
            }, 100);     
        });    
}




