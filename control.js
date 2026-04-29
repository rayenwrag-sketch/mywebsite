let current = 0;
let score = 0;
let active = [];
let timer;
let timeLeft = 15;

/*  DDL q */
const ddl = [
{q:"Which SQL command creates a table?",type:"mcq",options:["CREATE TABLE","INSERT INTO","SELECT"],answer:"CREATE TABLE",exp:"Creates structure"},
{q:"ALTER TABLE is used to?",type:"mcq",options:["Modify structure","Delete rows","Query data"],answer:"Modify structure",exp:"Changes schema"},
{q:"DROP TABLE does what?",type:"mcq",options:["Deletes table","Deletes rows","Updates table"],answer:"Deletes table",exp:"Removes structure"},
{q:"TRUNCATE removes?",type:"mcq",options:["All rows","Table structure","Database"],answer:"All rows",exp:"Clears data only"},
{q:"DDL focuses on?",type:"mcq",options:["Structure","Data","Queries"],answer:"Structure",exp:"Schema level"},

{q:"CREATE DATABASE is DDL?",type:"tf",answer:"True",exp:"Yes"},
{q:"ALTER adds columns?",type:"tf",answer:"True",exp:"Yes"},
{q:"DROP is reversible?",type:"tf",answer:"False",exp:"No"},
{q:"DDL changes data content?",type:"tf",answer:"False",exp:"No"},
{q:"TRUNCATE keeps structure?",type:"tf",answer:"True",exp:"Yes"},

{q:"CREATE VIEW is DDL?",type:"tf",answer:"True",exp:"Yes"},
{q:"DROP VIEW deletes view?",type:"tf",answer:"True",exp:"Yes"},
{q:"DDL includes INSERT?",type:"tf",answer:"False",exp:"No"},
{q:"ALTER renames table?",type:"tf",answer:"True",exp:"Yes"},
{q:"DDL auto-commits?",type:"tf",answer:"True",exp:"Yes"},

{q:"CREATE INDEX improves?",type:"mcq",options:["Performance","Deletion","Storage"],answer:"Performance",exp:"Speed"},
{q:"DROP DATABASE removes?",type:"mcq",options:["Entire DB","Rows","Columns"],answer:"Entire DB",exp:"Full deletion"},
{q:"ALTER TABLE DROP COLUMN does?",type:"mcq",options:["Remove column","Add row","Select"],answer:"Remove column",exp:"Schema change"},
{q:"DDL stands for?",type:"mcq",options:["Data Definition","Data Manipulation","Query Language"],answer:"Data Definition",exp:"Definition layer"},
{q:"TRUNCATE is faster than DELETE?",type:"tf",answer:"True",exp:"Yes"},

{q:"DDL affects records?",type:"tf",answer:"False",exp:"No"},
{q:"CREATE TABLE defines schema?",type:"tf",answer:"True",exp:"Yes"},
{q:"DROP removes schema?",type:"tf",answer:"True",exp:"Yes"},
{q:"ALTER modifies schema?",type:"tf",answer:"True",exp:"Yes"},
{q:"DDL is structural?",type:"tf",answer:"True",exp:"Yes"},

{q:"CREATE TABLE belongs to?",type:"mcq",options:["DDL","DML","SQL"],answer:"DDL",exp:"Structure"},
{q:"DROP TABLE deletes data only?",type:"tf",answer:"False",exp:"No"},
{q:"ALTER TABLE is reversible?",type:"tf",answer:"False",exp:"Not always"},
{q:"TRUNCATE deletes rows quickly?",type:"tf",answer:"True",exp:"Yes"},
{q:"DDL defines database schema?",type:"tf",answer:"True",exp:"Yes"},
{q:"CREATE TABLE is safe operation?",type:"mcq",options:["Yes","No","Sometimes"],answer:"Yes",exp:"Creation only"}
];

/* dml q */
const dml = [
{q:"INSERT INTO is used for?",type:"mcq",options:["Add data","Delete table","Create DB"],answer:"Add data",exp:"Adds rows"},
{q:"UPDATE changes?",type:"mcq",options:["Existing data","Structure","Database"],answer:"Existing data",exp:"Modifies rows"},
{q:"DELETE removes?",type:"mcq",options:["Rows","Table","Database"],answer:"Rows",exp:"Removes data"},
{q:"SELECT retrieves?",type:"mcq",options:["Data","Structure","Index"],answer:"Data",exp:"Reads rows"},
{q:"DML works on?",type:"mcq",options:["Data","Schema","Design"],answer:"Data",exp:"Data level"},

{q:"INSERT adds new rows?",type:"tf",answer:"True",exp:"Yes"},
{q:"UPDATE deletes table?",type:"tf",answer:"False",exp:"No"},
{q:"DELETE removes rows?",type:"tf",answer:"True",exp:"Yes"},
{q:"SELECT modifies data?",type:"tf",answer:"False",exp:"No"},
{q:"DML needs commit?",type:"tf",answer:"True",exp:"Yes"},

{q:"DELETE without WHERE deletes all?",type:"tf",answer:"True",exp:"Yes"},
{q:"UPDATE uses WHERE?",type:"tf",answer:"True",exp:"Yes"},
{q:"INSERT adds records?",type:"tf",answer:"True",exp:"Yes"},
{q:"SELECT * gets all columns?",type:"tf",answer:"True",exp:"Yes"},
{q:"DML changes structure?",type:"tf",answer:"False",exp:"No"},

{q:"INSERT can fail due to constraints?",type:"tf",answer:"True",exp:"Yes"},
{q:"UPDATE modifies rows?",type:"tf",answer:"True",exp:"Yes"},
{q:"DELETE keeps structure?",type:"tf",answer:"True",exp:"Yes"},
{q:"SELECT is read-only?",type:"tf",answer:"True",exp:"Yes"},
{q:"DML is part of SQL?",type:"tf",answer:"True",exp:"Yes"},

{q:"INSERT INTO belongs to?",type:"mcq",options:["DML","DDL","Query"],answer:"DML",exp:"Data manipulation"},
{q:"UPDATE affects schema?",type:"tf",answer:"False",exp:"No"},
{q:"DELETE removes schema?",type:"tf",answer:"False",exp:"No"},
{q:"SELECT is safe operation?",type:"tf",answer:"True",exp:"Yes"},
{q:"DML modifies data content?",type:"tf",answer:"True",exp:"Yes"},
{q:"INSERT INTO adds records?",type:"tf",answer:"True",exp:"Yes"},
{q:"UPDATE changes values?",type:"tf",answer:"True",exp:"Yes"},
{q:"DELETE removes records?",type:"tf",answer:"True",exp:"Yes"}
];

/*  SQL q  */
const sql = [
{q:"WHERE is used for?",type:"mcq",options:["Filtering","Deleting","Creating"],answer:"Filtering",exp:"Condition"},
{q:"ORDER BY is for?",type:"mcq",options:["Sorting","Filtering","Grouping"],answer:"Sorting",exp:"Order results"},
{q:"GROUP BY does?",type:"mcq",options:["Groups rows","Deletes rows","Inserts"],answer:"Groups rows",exp:"Aggregation"},
{q:"SQL stands for?",type:"input",answer:"structured query language",exp:"Full name"},
{q:"SELECT * means?",type:"mcq",options:["All columns","No data","Delete"],answer:"All columns",exp:"Everything"},

{q:"WHERE filters data?",type:"tf",answer:"True",exp:"Yes"},
{q:"ORDER BY deletes data?",type:"tf",answer:"False",exp:"No"},
{q:"GROUP BY aggregates?",type:"tf",answer:"True",exp:"Yes"},
{q:"SQL is query language?",type:"tf",answer:"True",exp:"Yes"},
{q:"HAVING used with GROUP BY?",type:"tf",answer:"True",exp:"Yes"},

{q:"COUNT() counts rows?",type:"tf",answer:"True",exp:"Yes"},
{q:"SUM() deletes data?",type:"tf",answer:"False",exp:"No"},
{q:"AVG() calculates mean?",type:"tf",answer:"True",exp:"Yes"},
{q:"ORDER BY sorts results?",type:"tf",answer:"True",exp:"Yes"},
{q:"WHERE uses conditions?",type:"tf",answer:"True",exp:"Yes"},

{q:"JOIN combines tables?",type:"tf",answer:"True",exp:"Yes"},
{q:"DISTINCT removes duplicates?",type:"tf",answer:"True",exp:"Yes"},
{q:"LIMIT restricts rows?",type:"tf",answer:"True",exp:"Yes"},
{q:"LIKE is pattern matching?",type:"tf",answer:"True",exp:"Yes"},
{q:"AND/OR are logical operators?",type:"tf",answer:"True",exp:"Yes"},

{q:"SQL modifies structure?",type:"tf",answer:"False",exp:"No"},
{q:"SELECT retrieves data?",type:"tf",answer:"True",exp:"Yes"},
{q:"WHERE applies condition?",type:"tf",answer:"True",exp:"Yes"},
{q:"GROUP BY groups data?",type:"tf",answer:"True",exp:"Yes"},
{q:"SQL = database language?",type:"tf",answer:"True",exp:"Yes"},
{q:"ORDER BY filters data?",type:"tf",answer:"False",exp:"No"},
{q:"JOIN merges tables?",type:"tf",answer:"True",exp:"Yes"},
{q:"SQL is procedural language?",type:"tf",answer:"False",exp:"Declarative"},
{q:"DISTINCT removes duplicates?",type:"tf",answer:"True",exp:"Yes"},
{q:"SQL used for querying DB?",type:"tf",answer:"True",exp:"Yes"}
];

/* ================= CORE (same logic) ================= */

function startQuiz(type){
active = type==="ddl"?ddl:type==="dml"?dml:sql;
current=0;
score=0;
loadQ();
}

function loadQ(){
clearInterval(timer);
timeLeft=15;

let q=active[current];

document.getElementById("qnum").innerText=current+1;
document.getElementById("score").innerText=score;

let html=`<h2>${q.q}</h2>`;

if(q.type==="mcq"){
q.options.forEach(o=>{
html+=`<button onclick="check('${o}')">${o}</button>`;
});
}

if(q.type==="tf"){
html+=`<button onclick="check('True')">True</button>`;
html+=`<button onclick="check('False')">False</button>`;
}

if(q.type==="input"){
html+=`<input id="ans"><button onclick="checkInput()">Submit</button>`;
}

document.getElementById("quizBox").innerHTML=html;
startTimer();
}

function startTimer(){
document.getElementById("time").innerText=timeLeft;

timer=setInterval(()=>{
timeLeft--;
document.getElementById("time").innerText=timeLeft;
if(timeLeft<=0){clearInterval(timer);next();}
},1000);
}

function check(ans){
let q=active[current];
if(ans===q.answer) score++;
show(ans===q.answer,q);
}

function checkInput(){
let v=document.getElementById("ans").value.toLowerCase();
let q=active[current];
if(v===q.answer) score++;
show(v===q.answer,q);
}

function show(c,q){
clearInterval(timer);
document.getElementById("quizBox").innerHTML=
`<h2 class="${c?'correct':'wrong'}">${c?'Correct':'Wrong'}</h2>
<p>${q.exp}</p>
<button onclick="next()">Next</button>`;
}

function next(){
current++;
if(current<active.length) loadQ();
else finish();
}

function finish(){
document.getElementById("quizBox").innerHTML=
`<h2>${score>=18?"PASS 🎉":"FAIL ❌"}</h2>
<p>${score}/30</p>
<button onclick="location.reload()">Restart</button>`;
}