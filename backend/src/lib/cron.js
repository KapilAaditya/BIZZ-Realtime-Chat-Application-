require('dotenv').config()
const cron = require('cron')
const http = require('node:http')
const https = require('node:https')

const job = new CronJob('*/14 * * * *', () => {

    const base = process.env.FRONTEND_URL
    if (!base) return;

    const url = ('/health', base).href;
    const client = url.startsWith("https:") ? https : http;

    client.get(url, (res) => {
        if (res.statusCode === 200) {
            console.log("Get request send succesfully ", statusCode)
        }
        else{
            console.log("Get request Failed ", statusCode);
            
        }
    }
).on("erroe",(e)=>console.error("Error while sending request ",e))

})

export default job