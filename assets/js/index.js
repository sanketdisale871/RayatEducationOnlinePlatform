$("#add_user").submit(function (event) {
  alert("Data Inserted Succesfully !!");
});

$("#update_user").submit(function (event) {
    event.preventDefault(); // default submit karne ke bad page reload hota hai o stop kiya hai

  let unindexed_array = $(this).serializeArray();
  var data = {}

  console.log(unindexed_array); // this is the array of all values

  $.map(unindexed_array,function(n,i){  // we making new array with key and it's value
    data[n['name']]=n['value']
  })
  console.log(data)

  let request = {
    "url":`http://localhost:3000/api/users/${data.id}`,
    "method":"PUT",
    "data":data
  }

  $.ajax(request).done(function(response){
    alert("Data Updated Successfully.");
  })
});


/* Deletion */

if(window.location.pathname == "/home"){
  $ondelete = $(".table tbody td a.delete");
  $ondelete.click(function(){
      var id = $(this).attr("data-id")

      var request = {
          "url" : `http://localhost:3000/api/users/${id}`,
          "method" : "DELETE"
      }

      if(confirm("Do you really want to delete this record?")){
          $.ajax(request).done(function(response){
              alert("Data Deleted Successfully!");
              location.reload();
          })
      }

  })
}