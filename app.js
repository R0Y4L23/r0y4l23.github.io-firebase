var firebaseConfig = {
    apiKey: "AIzaSyA4c6NrW1djTdtGxuWBLrO7IKIM-Bb_rEs",
    authDomain: "fir-tut-1ef88.firebaseapp.com",
    projectId: "fir-tut-1ef88",
    storageBucket: "fir-tut-1ef88.appspot.com",
    messagingSenderId: "561693405209",
    appId: "1:561693405209:web:9a9fa776fbd69169f7ba88",
    measurementId: "G-1PBER05G7H"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
const db = firebase.firestore()
db.settings({
    timestampInSnapshots: true
});
var output="";
var cross='"cross"';

$("#add-cafe-form").submit((e)=>{
    e.preventDefault();
    db.collection("cafes").add({
        name: $(".name").val(),
        city: $(".city").val(),
    })

    $(".name").val("");
    $(".city").val("");

})
db.collection("cafes").orderBy("city").onSnapshot((snapshot)=>{
    snapshot.forEach((change)=>{
         let idd=change.id;
         output+="<li data-id='"+change.id+"'><span>"+change.data().name+"</span><span>"+change.data().city+"</span><div class="+cross+" onClick=Delete('"+idd+"')>x</div></li>";   
    })
    $("#cafe-list").html(output);
    output=""
})

function Delete(id)
{
        console.log("here cross");
        console.log(id);
        db.collection("cafes").doc(id).delete();
}



