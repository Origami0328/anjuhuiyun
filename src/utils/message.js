import { message } from 'ant-design-vue'

export function messageContent(type, content) {
  message[type]({
    content: () => content,
    duration: 1.0,
    style: {
      marginTop: '20vh',
    },
  })
}
