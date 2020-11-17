import axios from 'axios'

export default axios.create({
    baseURL: process.env.APP_PORTFOLIO_API_URL
})
