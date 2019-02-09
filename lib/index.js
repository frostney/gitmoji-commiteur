var inquirer = require('inquirer');
var emoji = require('node-emoji')

const fuzzy = require('fuzzy');
const emojis = require('./emojis');

const emojiList = Object.values(emojis).map(value => emoji.emojify(value));

inquirer.registerPrompt('autocomplete', require('inquirer-autocomplete-prompt'));


inquirer
  .prompt([
    {
        type: 'autocomplete',
        name: 'emoji',
        message: 'Which gitmoji would you need to use?',
        pageSize: 5,
        source: function(answersSoFar, input) {
            if (!input) {
                return Promise.resolve(emojiList);
            }

            return Promise.resolve(fuzzy.filter(input, emojiList).map(item => item.string))
        },
        filter(answer) {
            return 
        }
  }, 
  {
    type: 'input',
    name: 'message',
    message: 'Enter your message'
  }, {
      type: 'confirm',
      name: 'breaking',
      message: 'Is this a breaking change?',
      default: false
  }
  ])
  .then(answers => {
    console.log(answers);
  });
