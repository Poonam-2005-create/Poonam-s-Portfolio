var express=require("express");
var exe=require("./db");
var router=express.Router();

router.get("/",function(req,res){
    res.render("admin/home.ejs");
});
router.get("/introduction",async function(req,res){
    var data=await exe(`select * from introduction`);
    var obj={"intro":data};
    res.render("admin/introduction.ejs",obj);
});
router.post("/save_introduction",async function(req,res){
    var user_photo='';
    var resume='';
    if(req.files){
        if(req.files.user_photo){
            user_photo=new Date().getTime()+req.files.user_photo.name;
            req.files.user_photo.mv("public/"+user_photo);
        }
        if(req.files.resume){
            resume=new Date().getTime()+req.files.resume.name;
            req.files.resume.mv("public/"+resume);
        }
    }
  

    var d=req.body;
    var data=await exe(`update introduction set user_name='${d.user_name}',tagline='${d.tagline}',linkedin_link='${d.linkedin_link}',instagram_link='${d.instagram_link}',facebook_link='${d.facebook_link}',twitter_link='${d.twitter_link}',user_photo='${user_photo}',description='${d.description}',user_email='${d.user_email}',user_mobile='${d.user_mobile}',resume='${resume}' where intro_id='1'`);
    res.redirect("/admin/introduction");
    //res.send(req.files.user_photo);
   // res.send(req.body);
});

router.get("/education",async function(req,res){
    var data=await exe(`select * from education`);
    var obj={"edu":data};
    res.render("admin/education.ejs",obj);
});
router.post("/save_education",async function(req,res){
    var d=req.body;
    var data=await exe(`insert into education(user_degree,user_university,passing_year) values('${d.user_degree}','${d.user_university}','${d.passing_year}')`);
    res.redirect("/admin/education");
   // res.send(req.body);
});
router.get("/delete/:edu_id",async function(req,res){
    var edu_id=req.params.edu_id;
    var data=await exe(`delete from education where edu_id='${edu_id}'`);
    res.redirect("/admin/education");
   // res.send(edu_id);
});
router.get("/edit/:edu_id",async function(req,res){
    var edu_id=req.params.edu_id;
    var data=await exe(`select * from education where edu_id='${edu_id}'`);
    var obj={"edu":data};
    res.render("admin/edit.ejs",obj);
    //res.send(req.params.edu_id);
});
router.post("/update_education",async function(req,res){
    var d=req.body;
    var data=await exe(`update education set user_degree='${d.user_degree}',user_university='${d.user_university}',passing_year='${d.passing_year}' where edu_id='${d.edu_id}'`);
    res.redirect("/admin/education");
   // res.send(photo);
});
router.get("/skills",async function(req,res){
var data=await exe(`select * from skills`);
    res.render("admin/skills.ejs",{"skill":data});
});
router.post("/save_skills",async function(req,res){
    var d=req.body;
    var skill_image='';
    if(req.files){
        if(req.files.skill_image){
            skill_image=new Date().getTime()+req.files.skill_image.name;
            req.files.skill_image.mv("public/"+skill_image);
        }
    }
    var data=await exe(`insert into skills(skill_image,skill_title) values('${skill_image}','${d.skill_title}')`);
    res.redirect("/admin/skills");
   //res.send(req.files);
});
router.get("/delete_skill/:skill_id",async function(req,res){
    var skill_id=req.params.skill_id;
    var data=await exe(`delete from skills where skill_id='${skill_id}'`);
    res.redirect("/admin/skills");
   // res.send(skill_id);
});
router.get("/edit_skill/:skill_id",async function(req,res){
    var skill_id=req.params.skill_id;
    var data=await exe(`select * from skills`);
    res.render("admin/edit_skill.ejs",{"skill":data});
    //res.send(skill_id);
});
router.post("/update_skill",async function(req,res){
    var d=req.body;
    var skill_image='';
    if(req.files){
        if(req.files.skill_image){
            skill_image=new Date().getTime()+req.files.skill_image.name;
            req.files.skill_image.mv("public/"+skill_image);
        }
    }
    var data=await exe(`update skills set skill_image='${skill_image}',skill_title='${d.skill_title}' where skill_id='${d.skill_id}'`);
    res.redirect("/admin/skills");
});
router.get("/project",async function(req,res){
    var data=await exe(`select * from projects`);
    res.render("admin/project.ejs",{"project":data});
});
router.post("/save_project",async function(req,res){
    var d=req.body;
    var project_image='';
    if(req.files){
        if(req.files.project_image){
            project_image=new Date().getTime()+req.files.project_image.name;
            req.files.project_image.mv("public/"+project_image);
        }
    }
    var data=await exe(`insert into projects(project_image,project_title,project_description) values('${project_image}','${d.project_title}','${d.project_description}')`);
    res.redirect("/admin/project");
   // res.send(req.files);
});
router.get("/delete_project/:project_id",async function(req,res){
    var project_id=req.params.project_id;
    var data=await exe(`delete from projects where project_id='${project_id}'`);
    res.redirect("/admin/project");
});
router.get("/edit_project/:project_id",async function(req,res){
    var project_id=req.params.project_id;
    var data=await exe(`select * from projects where project_id=${project_id}`);
    res.render("admin/edit_project.ejs",{"project":data});
    //res.send(skill_id);
});
router.post("/update_project",async function(req,res){
    var d=req.body;
    var project_image='';
    if(req.files){
        if(req.files.skill_image){
            project_image=new Date().getTime()+req.files.project_image.name;
            req.files.project_image.mv("public/"+project_image);
        }
    }
     var data=await exe(`update projects set project_image='${project_image}',project_title='${d.project_title}',project_description='${d.project_description}' where project_id='${d.project_id}'`);
     res.redirect("/admin/project");
    //res.send(d);
});
module.exports=router;
//"user_degree": "BCS",
// "user_university": "(2024-25)",
// "passing_year": "2025"
//create table education(edu_id int primary key auto_increment,user_degree varchar(200),user_university varchar(200),passing_year int);
//create table skills(skill_id int primary key auto_increment,skill_image text,skill_title varchar(100));
//create table projects(project_id int primary key auto_increment,project_image text,project_title varchar(100),project_description text);