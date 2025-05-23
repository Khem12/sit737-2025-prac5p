const express = require("express");
const fs = require('fs');
const res = require("express/lib/response");
const app = express();
const winston = require ('winston');
const logger = winston.createLogger ({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: {service: 'add-service'},
    transports: [
        //
        // - Write all logs with importance level of `error` or less to `error.log`
        // - Write all logs with importance level of `info` or less to `combined.log`
        //
        new winston.transports.File({filename:'error.log', level: 'error'}),
        new winston.transports.File({filename: 'compared.log'}),
    ],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if(process.env.NODE_ENV !== 'production'){
    logger.add(new winston.transports.Console({
        format: winston.format.simple(),
    }));
}

app.use(express.static(__dirname+'/public'));

// --for addition--
const add = (n1, n2) => {
    return n1 + n2;
}

app.get("/add", (req, res) => {
    try {
        const n1 = parseFloat(req.query.n1); 
        const n2 = parseFloat(req.query.n2);
        
        if (isNaN(n1)) {
            logger.error("n1 is incorrectly defined");
            throw new Error("n1 incorrectly defined");
        } 
        if (isNaN(n2)) {
            logger.error("n2 is incorrectly defined");
            throw new Error("n2 incorrectly defined");
        }
        
        logger.info('Parameters ' + n1 + ' and ' + n2 + ' received for addition');
        const result = add(n1, n2);
        res.status(200).json({ statuscode: 200, data: result });
    } catch (error) {
        logger.error(error.toString());
        res.status(500).json({ statuscode: 500, msg: error.toString() });
    }
});

// --for subtraction--
const sub = (n1, n2) => {
    return n1 - n2;
}

app.get("/minus", (req, res) => {
    try {
        const n1 = parseFloat(req.query.n1); 
        const n2 = parseFloat(req.query.n2);
        if (isNaN(n1)) {
            logger.error("n1 is incorrectly defined");
            throw new Error("n1 incorrectly defined");
        } if (isNaN(n2)) {
            logger.error("n2 is incorrectly defined");
            throw new Error("n2 incorrectly defined");
        }
        if (n1 === NaN || n2 === NaN) {
            console.log()
            throw new Error("Parsing Error");
        }
        logger.info('Parameters '+n1+' and '+n2+' received for addition');
        const result = sub(n1, n2);
        res.status(200).json({ statuscode: 200, data: result });
    } catch (error) {
        console.log(error)
        res.status(500).json({ statuscode: 500, msg: error.toString() })
    }
});

// --for multiplication--
const multi = (n1, n2) => {
    return n1 * n2;
}

app.get("/multiple", (req, res) => {
    try {
        const n1 = parseFloat(req.query.n1); 
        const n2 = parseFloat(req.query.n2);
        if (isNaN(n1)) {
            logger.error("n1 is incorrectly defined");
            throw new Error("n1 incorrectly defined");
        } if (isNaN(n2)) {
            logger.error("n2 is incorrectly defined");
            throw new Error("n2 incorrectly defined");
        }
        if (n1 === NaN || n2 === NaN) {
            console.log()
            throw new Error("Parsing Error");
        }
        logger.info('Parameters '+n1+' and '+n2+' received for addition');
        const result = multi(n1, n2);
        res.status(200).json({ statuscode: 200, data: result });
    } catch (error) {
        console.log(error)
        res.status(500).json({ statuscode: 500, msg: error.toString() })
    }
});

// --for division--
const divi = (n1, n2) => {
    return n1 / n2;
}

app.get("/divison", (req, res) => {
    try {
        const n1 = parseFloat(req.query.n1); 
        const n2 = parseFloat(req.query.n2);
        if (isNaN(n1)) {
            logger.error("n1 is incorrectly defined");
            throw new Error("n1 incorrectly defined");
        } if (isNaN(n2)) {
            logger.error("n2 is incorrectly defined");
            throw new Error("n2 incorrectly defined");
        }
        if (n1 === NaN || n2 === NaN) {
            console.log()
            throw new Error("Parsing Error");
        }
        logger.info('Parameters '+n1+' and '+n2+' received for addition');
        const result = divi(n1, n2);
        res.status(200).json({ statuscode: 200, data: result });
    } catch (error) {
        console.log(error)
        res.status(500).json({ statuscode: 500, msg: error.toString() })
    }
});
const port = 3040;
app.listen(port, () => {
    console.log("hello i'm listening to port" + port);
})
