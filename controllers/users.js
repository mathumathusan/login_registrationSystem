const mysql=require('mysql')
const bcrypt=require('bcryptjs');

const db= mysql.createConnection({
    host:"localhost",
    user: "root",
    password:'',
    database:'login_crud' 
})

exports.login=async (req,res)=>{
try {
    const {name,email,password,confirm_password}=req.body;
    if(!email || !password){
        return res.status(400).render('../views/index', { msg: 'please enter your email and password',msg_type:'error' })
    }
  db.query('select * from users where email=?',[email],async (err,result)=>{
              if(result.length<=0 ){
                return res.status(402).render('../views/index', { msg: 'email or password incorrect',msg_type:'error' })
              }else{
                  if( !(await bcrypt.compare(password,result[0].PASS))){
                    return res.status(402).render('../views/index', { msg: 'email or password incorrect',msg_type:'error' })
                  }
              }

              return res.render('../views/profile', { msg:'login successfully',msg_type:'good',names: result[0].NAME,email:result[0].EMAIL })
  })
} catch (error) {
 console.log(error);   
}
}

exports.register=(req,res)=>{
      const {name,email,password,confirm_password}=req.body;
    db.query('select EMAIL from users where EMAIL=?', [email], async  (err, result) => {
        if (err) {
          console.log(err);
        } 
        if (result && result.length > 0) {
          return res.render('../views/register', { msg: 'email already taken',msg_type:'error' });
        }
        else if(password!==confirm_password){
        return res.render('../views/register', { msg: 'password do not match',msg_type:'error' });
        }

        let hashedpassword= await bcrypt.hash(password,8);

        db.query('insert into users set ?',{NAME:name,EMAIL:email,PASS:hashedpassword},(err,result)=>{
                                           if(err){
                                               console.log(err);
                                           }
                                           else{
                                               console.log(result);
                                               return res.render('../views/register', { msg: 'User registration success',msg_type:'good'});
                                           }
        })
      });  
};