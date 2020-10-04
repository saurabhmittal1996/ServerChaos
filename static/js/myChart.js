function cpuChart(data, labels, ele) {
    
}
var firstTime = true;

var cdata_cpu = [0,0,0,0,0,0,0];
var clabel_cpu = ['12:00:01','12:00:16','12:00:31','12:00:46','12:01:01','12:01:16','12:01:31',];

var cdata_mem = [0,0,0,0,0,0,0];
var clabel_mem = ['12:00:01','12:00:16','12:00:31','12:00:46','12:01:01','12:01:16','12:01:31',];

var cdata_db = [0,0,0,0,0,0,0];
var clabel_db = ['12:00:01','12:00:16','12:00:31','12:00:46','12:01:01','12:01:16','12:01:31',];

var ctx = document.getElementById("cpu").getContext('2d');
    var myChart1 = new Chart(ctx, {
        type: 'line',
        data: {
            labels: clabel_cpu,
            datasets: [{
                label: 'CPU Utilization',
                data: cdata_cpu,
                borderColor: 'rgba(93, 188, 210, 10)',
                backgroundColor: 'rgba(93, 188, 210, 0.4)',
                borderWidth:1,
                pointRadius:0.5,
                pointHitRadius: 20,
            }]
        },
        options: {          
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,  //{}
                        suggestedMax: 100,
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Percentage'
                      }
                }],
                xAxes: [{
                    ticks: {
                        maxRotation: 0,
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Time'
                      }
                }]               
            },
            legend:{
                display: false,
                backgroundColor:false,
                labels:{
                    boxWidth: 40
                }
            },
            title: {
                display: true,
                text: 'CPU Utilization',
                position: 'top',
                fontFamily: 'Open Sans',
            },
            maintainAspectRatio: false,
            responsive:true,
            
        }
    });
    function updateCpu(){
    axios({
    method: 'get',
    // baseURL: window.location.origin,
    url: 'http://127.0.0.1:8000/cpu/',

    // responseType: 'json',
})
    .then(function (response) {
        oldLabel = myChart1.data.labels[myChart1.data.labels.length-1];
        date = new Date('2020-10-05 '+oldLabel);
        date = new Date(date.getTime()+15000);
        nlabel = date.getHours()+':'+ (date.getMinutes()<10?'0':'')+date.getMinutes()+':'+(date.getSeconds()<10?'0':'')+date.getSeconds();
        myChart1.data.datasets[0].data.push(response.data);
        myChart1.data.labels.push(nlabel);
        myChart1.data.datasets[0].data.shift();
        myChart1.data.labels.shift();
        myChart1.update();
        console.log(response);
    })

    .catch(function (error) {
        console.log(' error=', error.message);
    });
};

setInterval(function(){
    date = new Date();
    nlabel = date.getHours()+':'+ (date.getMinutes()<10?'0':'')+date.getMinutes()+':'+(date.getSeconds()<10?'0':'')+date.getSeconds();
    document.getElementById("sysclock").innerText= 'System Time(IST): '+nlabel;
}, 1000)

var ctx = document.getElementById("mem").getContext('2d');
    var myChart2 = new Chart(ctx, {
        type: 'line',
        data: {
            labels: clabel_mem,
            datasets: [{
                label: 'Memory Consumption',
                data: cdata_mem,
                borderColor: 'rgba(205,157,218, 1)',
                backgroundColor: 'rgba(205,157,218, 0.3)',
                borderWidth:1,
                pointRadius:0.5,
                pointHitRadius: 20,
            }]
        },
        options: {            
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,  //{}
                        suggestedMax: 100,
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Percentage'
                      }
                }],
                xAxes: [{
                    ticks: {
                        autoSkip: false,
                        maxRotation: 0,
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Time'
                      }
                }]                 
            },
            legend:{
                display: false
            },
            title: {
                display: true,
                text: 'Memory Consumption',
                position: 'top'
            },
            maintainAspectRatio: false,
            responsive:true,
        },
    });
    function updateMem(){
    axios({
    method: 'get',
    // baseURL: window.location.origin,
    url: 'http://127.0.0.1:8000/mem/',

    // responseType: 'json',
})
    .then(function (response) {
        oldLabel = myChart2.data.labels[myChart2.data.labels.length-1];
        date = new Date('2020-10-05 '+oldLabel);
        date = new Date(date.getTime()+15000);
        nlabel = date.getHours()+':'+ (date.getMinutes()<10?'0':'')+date.getMinutes()+':'+(date.getSeconds()<10?'0':'')+date.getSeconds();
        
        myChart2.data.datasets[0].data.push(response.data);
        myChart2.data.labels.push(nlabel);
        myChart2.data.datasets[0].data.shift();
        myChart2.data.labels.shift();
        myChart2.update();
        console.log(response);
    })

    .catch(function (error) {
        console.log(' error=', error.message);
    });
};

var ctx = document.getElementById("dbtrend").getContext('2d');
    var myChart3 = new Chart(ctx, {
        type: 'line',
        data: {
            labels: clabel_db,
            datasets: [{
                label: 'DB Trend',
                data: cdata_db,
                borderColor: 'rgba(175,215,145, 1)',
                backgroundColor: 'rgba(175,215,145, 0.5)',
                borderWidth:1,
                pointRadius:0.5,
                pointHitRadius: 20,
            }]
        },
        options: {            
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,  //{}
                        stepSize: 1,
                        suggestedMax: 5,
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Threads'
                      }
                }],
                xAxes: [{
                    ticks: {
                        autoSkip: false,
                        maxRotation: 0,
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Time'
                      }
                }]                 
            },
            legend:{
                display: false
            },
            title: {
                display: true,
                text: 'DB Trend',
                position: 'top'
            },
            maintainAspectRatio: false,
            responsive:true,
        },
    });
    function updateDB(){
    axios({
    method: 'get',
    // baseURL: window.location.origin,
    url: 'http://127.0.0.1:8000/db/',

    // responseType: 'json',
})
    .then(function (response) {
        oldLabel = myChart3.data.labels[myChart3.data.labels.length-1];
        date = new Date('2020-10-05 '+oldLabel);
        date = new Date(date.getTime()+15000);
        nlabel = date.getHours()+':'+ (date.getMinutes()<10?'0':'')+date.getMinutes()+':'+(date.getSeconds()<10?'0':'')+date.getSeconds();
        myChart3.data.datasets[0].data.push(response.data);
        myChart3.data.labels.push(nlabel);
        myChart3.data.datasets[0].data.shift();
        myChart3.data.labels.shift();
        myChart3.update();
        console.log(response);
    })

    .catch(function (error) {
        console.log(' error=', error.message);
    });
};
 function initDate()
 {
    date = new Date();
    nlabel = date.getHours()+':'+ (date.getMinutes()<10?'0':'')+date.getMinutes()+':'+(date.getSeconds()<10?'0':'')+date.getSeconds();
    myChart1.data.datasets[0].data.push(0);
    myChart1.data.labels.push(nlabel);
    myChart1.data.datasets[0].data.shift();
    myChart1.data.labels.shift();
    myChart1.update();

    myChart2.data.datasets[0].data.push(0);
    myChart2.data.labels.push(nlabel);
    myChart2.data.datasets[0].data.shift();
    myChart2.data.labels.shift();
    myChart2.update();

    myChart3.data.datasets[0].data.push(0);
    myChart3.data.labels.push(nlabel);
    myChart3.data.datasets[0].data.shift();
    myChart3.data.labels.shift();
    myChart3.update();
 };

initDate();
doRunmaxcpu();
doRunmaxmem();

setInterval(function() {
    updateCpu();
    updateMem();
    updateDB();
    doRunmaxcpu();
    doRunmaxmem();    
    }, 15000
);

function doRunmaxcpu() {
    console.log("executed ls");
    axios({
    method: 'get',
    // baseURL: window.location.origin,
    url: 'http://127.0.0.1:8000/maxcpu/',

    // responseType: 'json',
})
    .then(function (response) {
       
        CreateTableFromJSON(response.data, "topcpu")
        console.log(response);
    })

    .catch(function (error) {
        console.log(' error=', error.message);
    });
};

function doRunmaxmem() {
    console.log("executed ls -la");
    axios({
    method: 'get',
    // baseURL: window.location.origin,
    url: 'http://127.0.0.1:8000/maxmem/',

    // responseType: 'json',
})
    .then(function (response) {
       
        
        CreateTableFromJSON(response.data, "topmem")
        console.log(response);
    })

    .catch(function (error) {
        console.log(' error=', error.message);
    });
};

// doSomething();




function CreateTableFromJSON(myBooks, ElementID) {
        console.log(typeof myBooks);
        var col = [];

        console.log(myBooks.length)
        for (var i = 0; i < myBooks.length; i++) {
            console.log(typeof myBooks[i])
            for (var key in myBooks[i]) {
                if (col.indexOf(key) === -1) {
                    col.push(key);
                }
            }
        }

        // CREATE DYNAMIC TABLE.
        var table = document.createElement("table");
        var header = table.createTHead();
        var tblBody = document.createElement("tbody");
        // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

        var tr = header.insertRow(-1);                   // TABLE ROW.

        for (var i = 0; i < col.length; i++) {
            var th = document.createElement("th");      // TABLE HEADER.
            th.innerHTML = col[i];
            tr.appendChild(th);
        }

        // ADD JSON DATA TO THE TABLE AS ROWS.
        for (var i = 0; i < myBooks.length; i++) {

            tr = tblBody.insertRow(-1);

            for (var j = 0; j < col.length; j++) {
                var tabCell = tr.insertCell(-1);
                tabCell.innerHTML = myBooks[i][col[j]];
            }
        }
        table.appendChild(tblBody);

        // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
        var divContainer = document.getElementById(ElementID);
        divContainer.innerHTML = "";
        divContainer.appendChild(table);
    }









// function cpuChart(data, labels, ele) {    
// }

// var cdata_cpu = [10,15,12,1];
// var clabel_cpu = ["12:00", "12:01", "12:02", "12:03"];

// var cdata_mem = [10,15,12,1];
// var clabel_mem = ["12:00", "12:01", "12:02", "12:03"];

// var cdata_db = [10,15,12,1];                              
// var clabel_db = ["12:00", "12:01", "12:02", "12:03"];    

// var ctx = document.getElementById("cpu").getContext('2d');
//     var myChart1 = new Chart(ctx, {
//         type: 'line',
//         data: {
//             labels: clabel_cpu,
//             datasets: [{
//                 data: cdata_cpu,
//                 borderColor: 'rgba(93, 188, 210, 1)',
//                 backgroundColor: 'rgba(93, 188, 210, 0.2)',
//                 borderWidth:1,
//                 pointRadius:0.5,
//             }]
//         },
//         options: {            
//             scales: {
//                 yAxes: [{
//                     ticks: {
//                         beginAtZero: true,  //{}
//                         suggestedMax: 100,
//                     }
//                 }],
//                 xAxes: [{
//                     ticks: {
//                         autoSkip: true,
//                         maxTicksLimit: 5,
//                         maxRotation: 0,
//                     }
//                 }]               
//             },
//             legend:{
//                 display: false
//             },
//         },
//     });
//     function updateCpu(){
//     axios({
//     method: 'get',
//     url: 'http://127.0.0.1:8000/cpu/',
// })
//     .then(function (response) {
//         date = new Date();
//         nlabel = date.getHours()+':'+ (date.getMinutes()<10?'0':'')+date.getMinutes()+':'+(date.getSeconds()<10?'0':'')+date.getSeconds();
//         myChart1.data.datasets[0].data.push(response.data);
//         myChart1.data.labels.push(nlabel);
//         myChart1.update();
//         console.log(response);
//     })

//     .catch(function (error) {
//         console.log(' error=', error.message);
//     });
// };


// var ctx = document.getElementById("mem").getContext('2d');
//     var myChart2 = new Chart(ctx, {
//         type: 'line',
//         data: {
//             labels: clabel_mem,
//             datasets: [{
//                 data: cdata_mem,
//                 borderColor: 'rgba(205,157,218, 1)',
//                 backgroundColor: 'rgba(205,157,218, 0.2)',
//                 borderWidth:1,
//                 pointRadius:0.5,
//             }]
//         },
//         options: {            
//             scales: {
//                 yAxes: [{
//                     ticks: {
//                         beginAtZero: true,  //{}
//                         suggestedMax: 100,
//                     }
//                 }],
//                 xAxes: [{
//                     ticks: {
//                         autoSkip: true,
//                         maxTicksLimit: 5,
//                         maxRotation: 0,
//                     }
//                 }]                 
//             },
//             legend:{
//                 display: false
//             },
//         },
//     });
//     function updateMem(){
//     axios({
//     method: 'get',
//     url: 'http://127.0.0.1:8000/mem/',

//     // responseType: 'json',
// })
//     .then(function (response) {
//         date = new Date();
//         nlabel = date.getHours()+':'+ (date.getMinutes()<10?'0':'')+date.getMinutes()+':'+(date.getSeconds()<10?'0':'')+date.getSeconds();
//         myChart2.data.datasets[0].data.push(response.data);
//         myChart2.data.labels.push(nlabel);
//         myChart2.update();
//         console.log(response);
//     })

//     .catch(function (error) {
//         console.log(' error=', error.message);
//     });
// };

// var ctx = document.getElementById("dbtrend").getContext('2d');
//     var myChart3 = new Chart(ctx, {
//         type: 'line',
//         data: {
//             labels: clabel_db,
//             datasets: [{
//                 data: cdata_db,
//                 borderColor: 'rgba(175,215,145, 1)',
//                 backgroundColor: 'rgba(175,215,145, 0.2)',
//                 borderWidth:1,
//                 pointRadius:0.5,
//             }]
//         },
//         options: {            
//             scales: {
//                 yAxes: [{
//                     ticks: {
//                         beginAtZero: true,  //{}
//                         suggestedMax: 100,
//                     }
//                 }],
//                 xAxes: [{
//                     ticks: {
//                         autoSkip: true,
//                         maxTicksLimit: 5,
//                         maxRotation: 0,
//                     }
//                 }]                 
//             },
//             legend:{
//                 display: false
//             },
//         },
//     });
//     function updateDB(){
//     axios({
//     method: 'get',
//     url: 'http://127.0.0.1:8000/db/',

//     // responseType: 'json',
// })
//     .then(function (response) {
//         date = new Date();
//         nlabel = date.getHours()+':'+ (date.getMinutes()<10?'0':'')+date.getMinutes()+':'+(date.getSeconds()<10?'0':'')+date.getSeconds();
//         myChart3.data.datasets[0].data.push(response.data);
//         myChart3.data.labels.push(nlabel);
//         myChart3.update();
//         console.log(response);
//     })

//     .catch(function (error) {
//         console.log(' error=', error.message);
//     });
// };
//  function initDate()
//  {
//         date = new Date();
//         nlabel = date.getHours()+':'+ (date.getMinutes()<10?'0':'')+date.getMinutes()+':'+(date.getSeconds()<10?'0':'')+date.getSeconds();
//         myChart1.data.datasets[0].data.unshift(0);
//         myChart1.data.labels.unshift(nlabel);
//         myChart1.update();
//         myChart2.data.datasets[0].data.unshift(0);
//         myChart2.data.labels.unshift(nlabel);
//         myChart2.update();
//         myChart3.data.datasets[0].data.unshift(0);
//         myChart3.data.labels.unshift(nlabel);
//         myChart3.update();
//  };

// initDate();
//     updateCpu();
//     updateMem();
//     updateDB();
//     doRunmaxcpu();
//     doRunmaxmem();
// setInterval(function() {
//     updateCpu();
//     updateMem();
//     updateDB();
//     doRunmaxcpu();
//     doRunmaxmem();
 
//     }, 60000
//     );

// function doRunmaxcpu() {
//     console.log("executed ls");
//     axios({
//     method: 'get',
//     url: 'http://127.0.0.1:8000/maxcpu/',
//     responseType: 'json',
// })
//     .then(function (response) {
//         console.log(response.data)
//         CreateTableFromJSON(response.data,"topcpu")
//     })

//     .catch(function (error) {
//         console.log(' error=', error.message);
//     });
// };

// function doRunmaxmem() {
//     console.log("executed ls -la");
//     axios({
//     method: 'get',
//     url: 'http://127.0.0.1:8000/maxmem/',

//     responseType: 'json',
// })
//     .then(function (response) {
       
       
//         CreateTableFromJSON(response.data,"topmem");
//         console.log(response);
//     })

//     .catch(function (error) {
//         console.log(' error=', error.message);
//     });
// };




// function CreateTableFromJSON(myBooks,ElementID) {
        
//         var col = [];

//         console.log(myBooks.length)
//         for (var i = 0; i < myBooks.length; i++) {
//             console.log(typeof myBooks[i])
//             for (var key in myBooks[i]) {
//                 if (col.indexOf(key) === -1) {
//                     col.push(key);
//                 }
//             }
//         }

//         // CREATE DYNAMIC TABLE.
//         var table = document.createElement("table");
//         var header = table.createTHead();
//         var tblBody = document.createElement("tbody");
//         // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

//         var tr = header.insertRow(-1);                   // TABLE ROW.



//         for (var i = 0; i < col.length; i++) {
//             var th = document.createElement("th");      // TABLE HEADER.
//             th.innerHTML = col[i];
//             tr.appendChild(th);
//         }

//         // ADD JSON DATA TO THE TABLE AS ROWS.
//         for (var i = 0; i < myBooks.length; i++) {

//             tr = tblBody.insertRow(-1);
//             for (var j = 0; j < col.length; j++) {
//                 var tabCell = tr.insertCell(-1);
//                 tabCell.innerHTML = myBooks[i][col[j]];
//             }
//         }
//         table.appendChild(tblBody);

//         // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
//         var divContainer = document.getElementById(ElementID);
//         divContainer.innerHTML = "";
//         divContainer.appendChild(table);
//     }

