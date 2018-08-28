import { Toast } from 'antd-mobile'

/*
 Toast.success(content, duration, onClose, mask)

Toast.fail(content, duration, onClose, mask)

Toast.info(content, duration, onClose, mask)

Toast.loading(content, duration, onClose, mask)

Toast.offline(content, duration, onClose, mask)
*/


export const ToastCom = (info) => {
    switch (info.title) {
        case 'success':
            return Toast.success(info.info, 2, null, true)
        case 'fail':
            return Toast.fail(info.info, 2, null, true)
        case 'info':
            return Toast.info(info.info, 2, null, true)
        case 'loading':
            return Toast.loading(info.info, 2, null, true)
        case 'offline':
            return Toast.offline(info.info, 2, null, true)
    }
}