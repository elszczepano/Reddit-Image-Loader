import axios from 'axios'

export default axios.create({
  baseURL: 'http://www.reddit.com/r/'
})
