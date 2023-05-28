async function notEmp(req, inputName) {
    inputName.forEach(item => 
        req.check(item).notEmpty().withMessage(item[0].toUpperCase() + item.slice(1) + " must not be empty")
    );
}


async function checkLengthPassword(req, inputName) {
    inputName.forEach(item => 
        req.check(item).isLength({min:8}).withMessage(item[0].toUpperCase() + item.slice(1) + " must be min:8 character")
        );
    }
    
    async function checkEmailFormat(req, inputName) {
        inputName.forEach(item => 
            req.check(item).isEmail().withMessage(item[0].toUpperCase() + item.slice(1) + " format is incorrect")
            );
        }
        async function isNum(req, inputName) {
            inputName.forEach(item => 
                req.check(item).isInt().withMessage(item[0].toUpperCase() + item.slice(1) + " must be a number")
            );
        }

async function errorStr(link, req, res, next) {
    const errors = await req.getValidationResult();

    if (!errors.isEmpty()) {
        const strErrors = errors.array().map(item => item.msg);
        req.flash("errors", strErrors);
        res.redirect(link);
    } else {
        next();
    }
}

class Validation {
   
    async shopSingleId(req,res,next){
        await notEmp(req, ["value", "id"]);
        await isNum(req, ["value"])
        await errorStr("/", req, res, next);
    }
    async contentvalidator(req, res, next){
        await notEmp(req, ['name',"lastname","subject", "message"]);
        await checkEmailFormat(req, ['email',]);
        await errorStr("/contant", req, res, next);
    }
    async ordervalidator(req, res, next){
        await notEmp(req, ["fname", "lname", "companyname","region", "district","address","phone","order_notes", ])
        await checkEmailFormat(req, ["email_address",])
        await isNum(req, ["cartanum","cartapassword",])
        const errors = await req.getValidationResult();
        if (!errors.isEmpty()) {
            const strErrors = errors.array().map(item => item.msg);
            res.json({result:false, strErrors})
        } else {
            next();
        }
    }
}

export default new Validation();
