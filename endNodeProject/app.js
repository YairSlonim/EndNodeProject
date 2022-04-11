const express = require('express')

let app = express();


app.use(express.json()) //For JSON requests

app.use(express.urlencoded({extended: true}));
require('./config/database')
//require('./BL/usersDal')
//require('./BL/moviesDal')

app.use('/api/members',require('./routers/membersRouter'))
app.use('/api/movies',require('./routers/moviesRouter'))
app.use('/api/subscriptions',require('./routers/subscriptionsRouter'))

app.listen(8000);