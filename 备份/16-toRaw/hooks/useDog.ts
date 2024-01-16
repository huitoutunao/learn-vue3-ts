import { reactive } from 'vue'
import axios from 'axios'

export default function () {
  const dogList = reactive([
    'https://images.dog.ceo/breeds/pembroke/n02113023_4373.jpg'
  ])
  const changeImg = async () => {
    try {
      const result = await axios.get('https://dog.ceo/api/breed/pembroke/images/random')
      dogList.push(result.data.message)
    } catch (err) {
      console.log(err)
    }
  }

  return {
    dogList,
    changeImg,
  }
}
