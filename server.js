import express from 'express';
import connectDatabase from './config/db';

import{check,validationResult} from 'express-validator';


const app = express();

connectDatabase();

app.use(express.json({ extended: false}));

app.get('/',(req,res)=>
res.send('http get request sent to root api endpoint')
);

//@route Get/

app.post('/api/users',
[
check('name','Please enter your name')
.not().
isEmpty(),
check('email','please enter valid email')
.isEmail(),
check('password','Please enter a password with 6 or more char')
.isLength({min:6}),
check('message','please enter the message')
.not()
.isEmpty()

],
 (req, res)=>{
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(422).json({error:error.array});

    } else {
        return res.send(req.body);
    }
    
    
});

app.listen(3000, ()=>console.log(`Express server running on port: 3000`));