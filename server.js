// include the Themeparks library
var Themeparks = require("themeparks");
var inquirer = require('inquirer');

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
    message: 'Choose a theme park',
    choices: [
      'Magic Kingdom',
      'Epcot',
      'Hollywood Studios',
      'Animal Kingdom'
    ]
  }
]).then(answers => {
  var choice = '';
  switch (answers.themepark) {
    case 'Magic Kingdom':
      choice = new Themeparks.Parks.WaltDisneyWorldMagicKingdom();
      break;
    case 'Epcot':
      choice = new Themeparks.Parks.WaltDisneyWorldEpcot();
      break;
    case 'Hollywood Studios':
      choice = new Themeparks.Parks.WaltDisneyWorldHollywoodStudios();
      break;
    case 'Animal Kingdom':
      choice = new Themeparks.Parks.WaltDisneyWorldAnimalKingdom();
      break;
  }
  choice.GetWaitTimes().then(function(rides) {
      // print each wait time
      for(var i=0, ride; ride=rides[i++];) {
          console.log(ride.name + ": " + ride.waitTime + " minutes wait");
      }
  }, console.error);
})




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
