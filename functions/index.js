// Copyright 2016, Google, Inc.
// Licensed under the Apache License, Version 2.0 (the 'License');
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an 'AS IS' BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

const {dialogflow} = require('actions-on-google');
const functions = require('firebase-functions');

const app = dialogflow({debug: true});

app.intent('make_name', (conv, {color, number}) => {
    conv.close(`Alright, your silly name is ${color} ${number}! ` +
        `I hope you like it. See you next time.`);
});

let dinner = ['burgers', 'enchiladas', 'yakisoba', 'american chop suey', 'shepherds pie', 'swedish meatballs', 'salsa chicken', 'spaghetti',
    'chinese chicken',
    'pork pie',
    'pizza',
    'steak with peppers and onions',
    'bratz',
    'fettuccine alfredo',
    'breaded chicken',
    'buffalo chicken',
    'meatloaf',
    'barbeque pork',
    'thai noodles',
    'bagels with lox and cream cheese',
    'fish tacos',
    'tacos'];
app.intent('what_is_for_dinner', (conv) => {
    let n = dinner[Math.floor(Math.random() * dinner.length)];
    conv.close(`You should have ` + n);
});

app.intent('who_does_dishes', (conv) => {
    let chosen = getPeople();
    conv.close(chosen[0] + ` washes. ` + chosen[1] + ` Dries. ` + chosen[2] + ` does trash.`);
});

/**
 * Generates a list of people that should do the jobs
 * @return {[p1,p2,p3]}
 */
function getPeople() {
    let peopleTmp = ['Gabriel', 'Elizabeth', 'Andrew', 'Amy', 'Lillia', 'Joshua'];
    let peopleReturn = [];
    let i;
    for (i = 0; i < 3; i++) {
        let p = Math.floor(Math.random() * peopleTmp.length);
        if (i != 2 && peopleTmp[p] == 'Joshua') {
            i--;
        } else {
            peopleReturn.push(peopleTmp[p]);
            peopleTmp.splice(p, 1);
        }
    }
    return peopleReturn;
}

exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);
