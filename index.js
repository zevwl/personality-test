// Node modules
const path = require('path')

// NPM packages
const express = require('express')
const bodyParser = require('body-parser')

// App constants
const port = process.env.PORT || 8080

// Initilize app
const app = express()

// Use body-parser to parse forms
app.use(bodyParser.urlencoded({extended: true}))

// Use public directory for static files
app.use(express.static(path.join(__dirname, 'public')))

// Post route for form submition
app.post('/results', (req, res) => {

  // Get the answers
  const answers = Object.values(req.body)

  // Parse answers to integers
  const answersParsed = answers.map(value => Number.parseInt(value))

  // Sum up all answers
  const sum = answersParsed.reduce((accumulator, current) => accumulator + current)

  let result
  if (sum > 60) {
    result = `Others see you as someone they should "handle with care". You're seen as vain, self-centered, and extremely dominant. Others may admire you, wishing they could be more like you, but they don't always trust you and they hesitate to become too deeply involved with you.`
  } else if (sum > 50) {
    result = `Others see you as an exciting, highly volatile, rather impulsive personality; a natural leader, who's quick to make decisions, though not always the right ones. They see you as bold and adventuresome, someone who will try anything once; someone who takes chances and enjoys adventure. They enjoy being in your company because of the excitement you radiate.`
  } else if (sum > 40) {
    result = `Others see you as fresh, lively, charming, amusing, practical, and always interesting; someone who's constantly in the center of attention, but sufficiently well balanced not to let it go to their head. They also see you as kind, considerate, and understanding; someone who'll always cheer them up and help them out.`
  } else if (sum > 30) {
    result = `Others see you as sensible, cautious, careful, and practical. They see you as clever, gifted, talented, but modest. Not a person who makes friends too quickly or easily, but someone who's extremely loyal to friends you do make and who expect the same loyalty in return. Those who really get to know you realize it takes a lot to shake you trust in your friends, but equally important. It takes you a long time to get over it if that trust is ever broken.`
  } else if (sum > 20) {
    result = `Your friends see you as painstaking and fussy. They see you as very cautious, extremely careful, a slow and steady plodder. It would really surprise them if you ever did something impetuously or on the spur of the moment, expecting you to examine against it. They think this reaction is caused, partly, by your careful nature.`
  } else {
    result = `People think you are shy, nervous, and indecisive. Someone who needs looking after, who always wants someone else to make the decisions, and who doesn't want to get involved with anyone or anything. They see you as a worrier who always sees problems that don't exist. Some people think you're boring. Only those who know you well know that you aren't.`
  }

  res.send(`<p>${result}</p>`)
})

app.listen(port, () => console.log(`App is listening on port ${port}`))

