//Main app javascript

//set our namespace
var mySurvey = mySurvey || {};

// question class
var Question = function(headlineText) {
  // member vars, accept as a good constructor would
  this.headlineText = headlineText;
};

//possibly remove this smoke-test in the future
Question.prototype.getHeadline = function() {
  console.log(this.headlineText);
};

function RadioQuestion(headlineText, options) {
  Question.call(this, headlineText);
  this.options = options; 
  console.log("Radio question created.  Headline: " + headlineText + ", options: " + options); 
};
RadioQuestion.prototype = Object.create(Question.prototype);
RadioQuestion.prototype.constructor = RadioQuestion;

function FreetextQuestion(headlineText) {
  Question.call(this, headlineText);
  console.log("Freetext created: " + headlineText); 
};
FreetextQuestion.prototype = Object.create(Question.prototype);
FreetextQuestion.prototype.constructor = FreetextQuestion;

// survey class
var Survey = function() {
  this.questionList = new Array();
  //some stuff here
};
Survey.prototype.AddQuestion = function(newQuestion) {
  this.questionList.push(newQuestion);
  console.log("added " + qType(newQuestion) + ": " + newQuestion.headlineText + ", " + this.questionList.length + " questions total");
};

var thisSurvey = new Survey();

//helper functions
function qType(tmpQuestion) {
  var nqc = new String(tmpQuestion.constructor);
  var nqt = nqc.split("(");
  return nqt[0].split(" ")[1];
}

//give functionality to ui elements
$("#reset").click(function() {
  location.reload();
});

$("#addquestion").click(function() {
 $("#aqdt").show(); 
});

$("#createRadio").click(function() {
  $("#aqdt").hide();
  $("#radio-headline").val('');
  $("#create-radio-dialog").show();
  $("#radio-headline").focus();
});

$("#radio-finish").click(function() {
  var newRadio = new RadioQuestion($("#radio-headline").val());
  thisSurvey.AddQuestion(newRadio);
  addQuestionToList(newRadio);
  $("#create-radio-dialog").hide(); 
});

$("#createFreetext").click(function() {
  $("#aqdt").hide();
  $("#freetext-headline").val('');
  $("#create-freetext-dialog").show();
  $("#ftheadline").focus();
});

//$("#freetext-finish").click(function() {
  //TODO: validation

$("#form-create-freetext").submit(function(e){
  var newFreetext = new FreetextQuestion($("#ftheadline").val());
  thisSurvey.AddQuestion(newFreetext);
  addQuestionToList(newFreetext);
  $("#create-freetext-dialog").hide(); 
});

function addQuestionToList(newQuestion){
  $("#no-questions").hide();
  $("#question-list").append("<li class=\"list-group-item list-group-item-warning\">" + newQuestion.headlineText + "<span class=\"badge\">" + qType(newQuestion) + "</span></li>");
}

$("#takesurvey").click(function() {
  //hide ui elements that are no longer necessary
  $("#addquestion").hide(400);
  $("#takesurvey").hide(400);
  //TODO: make the actual survey!
  //clear out content area
   
});

//allow user to click outside of the modal to close it
window.onclick = function(event) {
  var modals = ["aqdt", "create-freetext-dialog", "create-radio-dialog", "create-dropdown-dialog", "create-checkbox-dialog"];
  if (modals.indexOf(event.target.id) >= 0) {
    $("#"+event.target.id).hide();
  }
}

//why doesn't this validation work?
$("#form-create-freetext").validate({ 
  rules: { 
    ftheadline: { required: true, minlength: 2}
  },
  messages: { 
    ftheadline: "Please provide a headline"
  },
  submitHandler: function(form) { form.preventDefault(); form.submit(this); }
});

