var Sequelize = require('Sequelize');
var sequelize = new Sequelize('', '', '', {
    host: 'localhost',
    dialect: 'sqlite',

    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },

    // SQLite only
    storage: '/Users/yc05ps3/test.db'
});


var Project = sequelize.define('Project', {
    title: Sequelize.STRING,
    description: Sequelize.TEXT
});

//Project.sync().then(function () {
    // Table created

    //Project.create({
    //    title: 'John',
    //    description: 'Hancock'
    //});

   // Project.update({title:'Hancock'},{where:{id:1}});

   // Project.destroy({where:{id:1}});

    Project.findAll().then(function(projects){
        console.log(projects);
    });

    //Project.findById(1).then(function(projects){
    //    console.log(projects);
    //})

    //Project.findAll({where:{
    //    title: 'John'
    //}}).then(function(projects){
    //    console.log(projects);
    //});

//});


//sequelize.query("SELECT * FROM `employee`", { type: sequelize.QueryTypes.SELECT})
//    .then(function(employee) {
//        console.log(employee);
//    });
