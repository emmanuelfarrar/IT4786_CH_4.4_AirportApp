window.onload = function () {
    this.document.addEventListener("deviceready", init, false);
}

function init() {
    document.getElementById("btnGetSchedule").addEventListener('click', getSchedule, false);
}

/**AJAX request using jQuery. With a successful AJAX response resulting in calling the parseJSON()
 * Once this is complete, more jQuery ensures that the content of the schedule <div> is empty
 */
function getSchedule(){
    $.ajax({url:"http://www3.septa.org/hackathon/Arrivals/90404/10/", 
    success: function(result){
        parseJSON(result);
    }});
    $("#schedule").html("");
}

/** Details of parseJSON() 
 * > parseJSON() will take one arguement "result" - which is the resonse from JSON from AJAX request
 * > output is a var with the header for the table with the columns labeled in an order of the data when we build the row
 * > var data: hold the result of jQuery's parseJSON(); this returns the value of JSON to js as a string
 * > var arr: is an array of elements within var data
 * > Finally, we know from our JSON visualizer that the first element in arr will contain a key, Northbound, with a 
 * value of an array of train elements, so we set the value of northbound to that array.
 * > Loopthrough every element in northbound - if/else conditional uses the modulus operator to determine if a given row 
 * is even or odd, and styles it accordingly. After that, we simply set variables for each value we are interested in 
 * using to the element’s key/value pairs. Refer to the JSON visualizer to determine the appropriate keys. Once that is 
 * done, we complete the table row HTML.
 * >>substring was used on time to limit what we get back since time has a lot of info
 * > RINSE AND REPEAT FOR SOUTHBOUND
 * > Now that the HTML for the tables is complete and stored in output, we can set the inner HTML of the schedule <div> 
 * to output in order to display our train information
*/
function parseJSON(result) {
    var output = "<h3>Northbound</h3>";
        output += "<table>";
        output += "<tr class='odd'><th>Train #</th><th>Time</th><th>Destination</th><th>Service</th><th>Status</th></tr>";

        var data = jQuery.parseJSON(result);
        var arr = data[Object.keys(data)];

        var northbound = arr[0].Northbound;

        for(var x = 0; x < northbound.length; x++){
            if ((x%2 == 0)) {
                output += "<tr class='even'>";
            } else {
                output += "<tr class='odd'>";
            }

            var trainID = northbound[x].train_id;
            var destination = northbound[x].destination;
            var service = northbound[x].service_type;
            var status = northbound[x].status;
            var time = northbound[x].depart_time;

            time = time.substring(11, 17);

            output += "<td>" + trainID + "</td><td>" + time + "</td><td>"  + destination + "</td>";
            output += "<td>" + service + "</td><td>" + status + "</td>";
            output += "</tr>";
            output += "</table>";
        }
    
        var southbound = arr[1].Southbound;
        output = "<h3>Southbound</h3>";
        output += "<table>";
        output += "<tr class='odd'><th>Train #</th><th>Time</th><th>Destination</th><th>Service</th><th>Status</th></tr>";

        for(var x = 0; x < southbound.length; x++){
            if ((x%2 == 0)) {
                output += "<tr class='even'>";
            } else {
                output += "<tr class='odd'>";
            }

            var trainID = southbound[x].train_id;
            var destination = southbound[x].destination;
            var service = southbound[x].service_type;
            var status = southbound[x].status;
            var time = southbound[x].depart_time;

            time = time.substring(11, 17);

            output += "<td>" + trainID + "</td><td>" + time + "</td><td>"  + destination + "</td>";
            output += "<td>" + service + "</td><td>" + status + "</td>";
            output += "</tr>";
            output += "</table>";
        }

        $("#schedule").html(output);        //seting the HTML element of schedule to output
}

