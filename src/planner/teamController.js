
function addMember(id) {
  var newTeam = "";
  if (teamIDs.length <= 5){
    teamIDs.push(id);
   for (var i = 0; i < teamIDs.length; i++){
     newTeam = newTeam + teamIDs[i].toString().padStart(4, "0");
   }
 window.location.replace(process.env.PUBLIC_URL + "/red/" + newTeam)
}
}

function removeMember(id) {
  var newTeam = "";
  for (var i = 0; i < teamIDs.length; i++){
    if (teamIDs[i] == id){
      teamIDs.splice(i,1);
      for (var i = 0; i < teamIDs.length; i++){
        newTeam = newTeam + teamIDs[i].toString().padStart(4, "0");
      }
   window.location.replace(process.env.PUBLIC_URL + "/teamPlanner/" + "" + "red/" + newTeam)
    }
  }
}
