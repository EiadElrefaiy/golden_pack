var id = localStorage.getItem("employeeId");
var day_money = 0;
window.onload = function () { 
    var login = localStorage.getItem("login");
    if(login == 0){
        window.location.replace("../../../golden-hr-dash/material-dashboard-master/pages/sign-in.html");
    }else{
        showData();
    }
}       
window.onload();

function showData(){
    fetch("http://127.0.0.1:8000/api/v1/admins/get-projects", {
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
            $("#projectsNode").empty();
            $("#projectsNode").append(' <tr> <td class="text-uppercase text-secondary text-lg font-weight-bolder ">نوع المشروع</td> <td class="text-uppercase text-secondary text-lg font-weight-bolder ">اسم الزبون او الشركة</td> <td class="text-uppercase text-secondary text-lg font-weight-bolder ">تليفون الزبون او الشركة</td> <td class="text-uppercase text-secondary text-lg font-weight-bolder ">العربون</td> <td class="text-uppercase text-secondary text-lg font-weight-bolder ">الاجمالي</td> <td class="text-uppercase text-secondary text-lg font-weight-bolder ">الوصف</td> <td class="text-uppercase text-secondary text-lg font-weight-bolder ">تاريخ البدء</td> <td class="text-uppercase text-secondary text-lg font-weight-bolder ">تاريخ التسليم</td> <td class="text-uppercase text-secondary text-lg font-weight-bolder ">حالة المشروع</td> <td class="text-secondary opacity-7"></td> </tr> ');
            for(var n = 0; n < data["projects"].length; n++){
                var done="";
                if(data["projects"][n]["done"] == 0){
                  done = '<span class="badge badge-sm bg-gradient-warning">جاري التنفيذ</span>';
                }
                if(data["projects"][n]["done"] == 1){
                  done = '<span class="badge badge-sm bg-gradient-success">تم التسليم</span>';
                }    
                var start_date = data["projects"][n]["start_at"];
                var end = data["projects"][n]["end_at"];
                $("#projectsNode").append('<tr class="project_tr"> <td class="id" style="display:none;">'+data["projects"][n]["id"]+'</td><td><h6 class="mb-0 text-sm">'+data["projects"][n]["kind"]+'</h6></td><td><h6 class="mb-0 text-sm">'+data["projects"][n]["client_name"]+'</h6></td><td><h6 class="mb-0 text-sm">'+data["projects"][n]["client_phone"]+'</h6></td><td><h6 class="mb-0 text-sm">'+data["projects"][n]["deposit"]+'</h6></td><td><h6 class="mb-0 text-sm">'+data["projects"][n]["total"]+'</h6></td><td><h6 class="mb-0 text-sm">'+data["projects"][n]["description"]+'</h6></td><td><h6 class="mb-0 text-sm">'+start_date.substring(0, 10)+'</h6></td><td><h6 class="mb-0 text-sm">'+end.substring(0, 10)+'</h6></td><td> '+done+' </td> <td> <a href="javascript:;" class="text-secondary font-weight-bold text-xs" data-toggle="tooltip" data-original-title="بيانات الموظف user"> <span onclick="'+"showDeleteForm("+data["projects"][n]["id"]+" , "+"'project'"+");"+'"  class="badge badge-sm bg-gradient-danger">حذف المشروع</span> <span onclick="showEditProjectForm('+data["projects"][n]["id"]+');" class="badge badge-sm bg-gradient-warning">تعديل المشروع</span> </a> </td> </tr>')
            }
        });    
}


function showAddProjectForm(){
    document.getElementById("client_name").value = "";
    document.getElementById("kind").value = "";    
    document.getElementById("client_phone").value = "";    
    document.getElementById("deposit").value = "";    
    document.getElementById("description").value = "";    
    document.getElementById("total").value = "";    
    var date = new Date();
    document.getElementById("start_date").valueAsDate = date;
    document.getElementById("end_date").valueAsDate = date;
    $("#addProjectForm").fadeIn(100);
} 

function cancelAddProject(){
    $("#addProjectForm").fadeOut(100);
}

function addProject(){
    fetch("http://127.0.0.1:8000/api/v1/admins/add-project", {
      method: 'POST',
      body: JSON.stringify({
        kind : document.getElementById("kind").value,
        client_name : document.getElementById("client_name").value,
        client_phone : document.getElementById("client_phone").value,
        deposit : document.getElementById("deposit").value,
        description : document.getElementById("description").value,
        total : document.getElementById("total").value,
        start_at : document.getElementById("start_date").value,
        end_at : document.getElementById("end_date").value,
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
          $("#addProjectForm").fadeOut(100);
          setTimeout(function(){
  
              alert("تم اضافة المشروع");
  
          }, 100);     
          $("#projectsNode").append('<tr class="project_tr"> <td class="id" style="display:none;">'+data["id"]+'</td><td><h6 class="mb-0 text-sm">'+document.getElementById("kind").value+'</h6></td><td><h6 class="mb-0 text-sm">'+document.getElementById("client_name").value+'</h6></td><td><h6 class="mb-0 text-sm">'+document.getElementById("client_phone").value+'</h6></td><td><h6 class="mb-0 text-sm">'+document.getElementById("deposit").value+'</h6></td><td><h6 class="mb-0 text-sm">'+document.getElementById("total").value+'</h6></td><td><h6 class="mb-0 text-sm">'+document.getElementById("description").value+'</h6></td><td><h6 class="mb-0 text-sm">'+document.getElementById("start_date").value+'</h6></td><td> <h6 class="mb-0 text-sm">'+document.getElementById("end_date").value+'</h6> </td><td><span class="badge badge-sm bg-gradient-warning">جاري التنفيذ</span></td> <td> <a href="javascript:;" class="text-secondary font-weight-bold text-xs" data-toggle="tooltip" data-original-title="بيانات الموظف user"> <span onclick="'+"showDeleteForm("+data["id"]+" , "+"'project'"+");"+'"  class="badge badge-sm bg-gradient-danger">حذف المشروع</span> <span onclick="showEditProjectForm('+data["id"]+');" class="badge badge-sm bg-gradient-warning">تعديل المشروع</span> </a> </td> </tr>');
      });
  }

  var project_id = 0;
function showEditProjectForm(id){
    project_id = id;
    var trs = $('.project_tr');
    var chkdName = "id";

    document.getElementById("edit_client_name").value = $(trs).find("."+chkdName+':contains('+project_id+')').parent().eq(0).find('td:eq(2)').text();
    document.getElementById("edit_kind").value = $(trs).find("."+chkdName+':contains('+project_id+')').parent().eq(0).find('td:eq(1)').text();    
    document.getElementById("edit_client_phone").value = $(trs).find("."+chkdName+':contains('+project_id+')').parent().eq(0).find('td:eq(3)').text();    
    document.getElementById("edit_deposit").value =$(trs).find("."+chkdName+':contains('+project_id+')').parent().eq(0).find('td:eq(4)').text().match(/\d/g).join("");    
    document.getElementById("edit_description").value = $(trs).find("."+chkdName+':contains('+project_id+')').parent().eq(0).find('td:eq(6)').text();    
    document.getElementById("edit_total").value = $(trs).find("."+chkdName+':contains('+project_id+')').parent().eq(0).find('td:eq(5)').text().match(/\d/g).join("");   
    
    var start_date = $(trs).find("."+chkdName+':contains('+project_id+')').parent().eq(0).find('td:eq(7)').text();

    //var date = "06/06/2023";
    //var from = "22:53:05";
    //var to = "08:53:05";
    var start_year = start_date.substring(0,4);
    var start_month = start_date.substring(5 , 7);
    var start_day = start_date.substring(8 ,10);



    var start_convertedDta = start_day + "/" + start_month + "/" + start_year;
    var start_myDate = start_convertedDta.split('/').reverse().join('-');

    let start_Input = document.getElementById("edit_start_date");
    start_Input.value = start_myDate;



    var end_date = $(trs).find("."+chkdName+':contains('+project_id+')').parent().eq(0).find('td:eq(8)').text();

    if(end_date.length != 10){
        end_date =  end_date.slice(1 , 11);
    }


    //var date = "06/06/2023";
    //var from = "22:53:05";
    //var to = "08:53:05";
    var end_year = end_date.substring(0,4);
    var end_month = end_date.substring(5 , 7);
    var end_day = end_date.substring(8 ,10);


    var end_convertedDta = end_day + "/" + end_month + "/" + end_year;
    var end_myDate = end_convertedDta.split('/').reverse().join('-');

    let end_Input = document.getElementById("edit_end_date");
    end_Input.value = end_myDate;

    if($(trs).find("."+chkdName+':contains('+project_id+')').parent().eq(0).find('td:eq(9)').find("span").text() == "جاري التنفيذ"){
        $('#flexRadioDefault1').prop('checked' , true);
      }
      if($(trs).find("."+chkdName+':contains('+project_id+')').parent().eq(0).find('td:eq(9)').find("span").text() == "تم التسليم"){
        $('#flexRadioDefault2').prop('checked' , true);
      }
    
    $("#editProjectForm").fadeIn(100);
} 

function cancelEditProject(){
    $("#editProjectForm").fadeOut(100);
}

function editProject(){
    var statues = "";
    var done = 0;
    if ($('#flexRadioDefault1').prop('checked') == true) {
        statues = '<span class="badge badge-sm bg-gradient-warning">جاري التنفيذ</span>';
        done = 0;
    }

    if ($('#flexRadioDefault2').prop('checked') == true) {
        statues = '<span class="badge badge-sm bg-gradient-success">تم التسليم</span>';
        done = 1;
    }
    
    fetch("http://127.0.0.1:8000/api/v1/admins/update-project", {
        method: 'POST',
        body: JSON.stringify({
            id : project_id,
            kind : document.getElementById("edit_kind").value,
            client_name : document.getElementById("edit_client_name").value,
            client_phone : document.getElementById("edit_client_phone").value,
            deposit : document.getElementById("edit_deposit").value,
            description : document.getElementById("edit_description").value,
            total : document.getElementById("edit_total").value,
            start_at : document.getElementById("edit_start_date").value,
            end_at : document.getElementById("edit_end_date").value,
            done : done
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
            $("#editProjectForm").fadeOut(100);
            setTimeout(function(){
    
                alert("تم تعديل المشروع");
    
            }, 100);     
            var trs = $('.project_tr');
            var chkdName = "id";        
            $(trs).find("."+chkdName+':contains('+project_id+')').parent().eq(0).find('td:eq(1)').find('h6').text(document.getElementById("edit_kind").value);
            $(trs).find("."+chkdName+':contains('+project_id+')').parent().eq(0).find('td:eq(2)').find('h6').text(document.getElementById("edit_client_name").value);
            $(trs).find("."+chkdName+':contains('+project_id+')').parent().eq(0).find('td:eq(3)').find('h6').text(document.getElementById("edit_client_phone").value);
            $(trs).find("."+chkdName+':contains('+project_id+')').parent().eq(0).find('td:eq(4)').find('h6').text(document.getElementById("edit_deposit").value);
            $(trs).find("."+chkdName+':contains('+project_id+')').parent().eq(0).find('td:eq(5)').find('h6').text(document.getElementById("edit_total").value);
            $(trs).find("."+chkdName+':contains('+project_id+')').parent().eq(0).find('td:eq(6)').find('h6').text(document.getElementById("edit_description").value);
            $(trs).find("."+chkdName+':contains('+project_id+')').parent().eq(0).find('td:eq(7)').find('h6').text(document.getElementById("edit_start_date").value);
            $(trs).find("."+chkdName+':contains('+project_id+')').parent().eq(0).find('td:eq(8)').find('h6').text(document.getElementById("edit_end_date").value);
            $(trs).find("."+chkdName+':contains('+project_id+')').parent().eq(0).find('td:eq(9)').html(statues);
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
    if(kind_delete == "project"){
        fetch("http://127.0.0.1:8000/api/v1/admins/delete-project", {
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
        
                    alert("تم حذف المشروع");
        
                }, 100);     
                var trs = $('.project_tr');
                var chkdName = "id";        
                trs = $(trs).find("."+chkdName+':contains('+id_delete+')').parent().eq(0);
                $(trs).hide();
                });    
    }
}



  


