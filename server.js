// include the Themeparks library
var inquirer = require('inquirer');
var Themeparks = require("themeparks");
var weather = require("weather-js");

// // list all the parks supported by the library
// for (var park in Themeparks.Parks) {
//     console.log("* " + new Themeparks.Parks[park]().Name + " (DisneyAPI." + park + ")");
// }


// inquirer
//   .prompt([
//     {
//       type: 'list',
//       name: 'theme',
//       message: 'What do you want to do?',
//       choices: [
//         'Order a pizza',
//         'Make a reservation',
//         new inquirer.Separator(),
//         'Ask for opening hours',
//         {
//           name: 'Contact support',
//           disabled: 'Unavailable at this time'
//         },
//         'Talk to the receptionist'
//       ]
//     },
//     {
//       type: 'list',
//       name: 'size',
//       message: 'What size do you need?',
//       choices: ['Jumbo', 'Large', 'Standard', 'Medium', 'Small', 'Micro'],
//       filter: function(val) {
//         return val.toLowerCase();
//       }
//     }
//   ])
//   .then(answers => {
//     console.log(JSON.stringify(answers, null, '  '));
//   });

inquirer.prompt([
  {
    type: 'list',
    name: 'themepark',
    message: 'Where are you heading?',
    choices: [
      'Magic Kingdom',
      'Epcot',
      'Hollywood Studios',
      'Animal Kingdom'
    ]
  },
  {
      type: 'list',
      name: 'function',
      message: 'Have fun!  What can we help with?',
      choices: [
        'Weather report',
        'Ride wait times'
      ]
  }
]).then(answers => {
  switch (answers.function) {
    case 'Ride wait times':
      var themepark = returnPark(answers.themepark)
      getWaitTimes(themepark)
      break;
    case 'Weather report':
      getWeather('Orlando, FL')
      break;
  }
})

function returnPark(themepark){
  var result = '';
  switch (themepark) {
    case 'Magic Kingdom':
      result = new Themeparks.Parks.WaltDisneyWorldMagicKingdom();
      break;
    case 'Epcot':
      result = new Themeparks.Parks.WaltDisneyWorldEpcot();
      break;
    case 'Hollywood Studios':
      result = new Themeparks.Parks.WaltDisneyWorldHollywoodStudios();
      break;
    case 'Animal Kingdom':
      result = new Themeparks.Parks.WaltDisneyWorldAnimalKingdom();
      break;
  }
  return result;
}

function getWaitTimes(choice) {
  // This function calls the Themeparks DisneyAPI for wait times.
  choice.GetWaitTimes().then(function(rides) {
      // print each wait time
      for(var i=0, ride; ride=rides[i++];) {
          console.log(ride.name + ": " + ride.waitTime + " minutes wait");
      }
  }, console.error);
}

function getWeather(location) {
  // This function calls the Weather-JS module.
  // For now, the location will always be Orlando, added when the function is called.
  weather.find({ search: location, degreeType: "F" }, function(err, result) {
    if (err) {
      console.log(err);
    }
    console.log('Weather report for ' + result[0].location.name +':');
    console.log('Current temperature: ' + result[0].current.temperature + '(F).  It\'s ' + result[0].current.skytext.toLowerCase() + '.');
    console.log('Tomorrow\'s high temperature: ' + result[0].forecast[2].high + '(F).  It\'ll be ' + result[0].forecast[2].skytextday.toLowerCase() + '.');

  });
}


// access wait times by Promise
// disneyMagicKingdom.GetWaitTimes().then(function(rides) {
//     // print each wait time
//     for(var i=0, ride; ride=rides[i++];) {
//         console.log(ride.name + ": " + ride.waitTime + " minutes wait");
//     }
// }, console.error);

// // get park opening times
// disneyMagicKingdom.GetOpeningTimes().then(function(times) {
//     // print opening times
//     for(var i=0, time; time=times[i++];) {
//         if (time.type == "Operating") {
//             console.log("[" + time.date + "] Open from " + time.openingTime + " until " + time.closingTime);
//         }
//     }
// }, console.error);
