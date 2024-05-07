import bcrypt from 'bcrypt'
function hashh() {
    bcrypt.hash("Emergency_admin_panel",10) // Aircraft_admin_panel
    .then(hash => bcrypt.compare("Emergency_admin_panel",hash,(err,response)=>{
        if (response) {
            console.log(response,hash);
        }else{
            console.log(404);
        }
        if (err) {
            console.log(0);
        }
    }))
    
}

hashh();
//   axios.defaults.withCredentials = true;