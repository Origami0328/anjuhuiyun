import { message } from 'ant-design-vue'

export function messageContent(type, content) {
  message[type]({
    content: () => content,
    duration: 0.8,
    style: {
      marginTop: '20vh',
    },
  })
}
