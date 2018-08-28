import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    TextInput,
    View
} from 'react-native';
import { TabBar, Icon, Drawer } from 'antd-mobile'
import ScrollPage from '../../component/scrollpage'
import CountDownButton from 'react-native-smscode-count-down'


import Dimensions from 'Dimensions'
var { width, height } = Dimensions.get('window');//高度宽度


import { connect } from 'react-redux';
import { register, getAuthCode } from '../action/index';


class main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loginBtnBg: { backgroundColor: '#bcbcbc' },
            loginBtnTitleColor: { color: '#ffffff' },
            username: '',
            password: '',
            authCode: '',
            invitationCode: ''
        }
    }

    phoneNumTextWatch(text) {

        if (text.length > 0) {
            this.setState({
                loginBtnBg: { backgroundColor: '#e52540' },
                loginBtnTitleColor: { color: '#ffffff' },
                username: text
            });
        } else {
            this.setState({
                loginBtnBg: { backgroundColor: '#bcbcbc' },
                loginBtnTitleColor: { color: '#ffffff' },
                username: text
            });
        }
    }

    loginBtnOnClick() {
        var timestamp = Date.parse(new Date());
        let jsonArr = {
            method: 'user.register',
        }
        jsonArr['timestamp'] = timestamp
        jsonArr['userName'] = this.state.username
        jsonArr['password'] = this.state.password
        jsonArr['verificationCode'] = this.state.authCode
        jsonArr['invitationCode'] = !!this.props.info ? this.props.info : this.state.invitationCode
        let { dispatch } = this.props
        dispatch(register(jsonArr, this.props.navigator))
    }

    getCode = () => {
        var timestamp = Date.parse(new Date());
        let jsonArr = {
            method: 'user.sendOpenVerificationCode',
            type: '1'
        }
        jsonArr['timestamp'] = timestamp
        jsonArr['mobilePhone'] = this.state.username
        let { dispatch } = this.props
        dispatch(getAuthCode(jsonArr))
        return true
    }


    render() {
        let date = new Date()
        let time = Number(date.getHours())
        // console.log(time)
        let src = require('../../img/forget.jpg')
        if (time >= 0 && time < 6) {
            src = require('../../img/login4.png')
        } else if (time >= 6 && time < 12) {
            src = require('../../img/login1.png')
        } else if (time >= 12 && time < 18) {
            src = require('../../img/login2.png')
        } else {
            src = require('../../img/login3.png')
        }
        return (
            <View style={styles.container}>
                <ScrollPage
                    title={'服务条款'}
                    bg={true}
                    isScroll={true}
                    bgImg={src}
                    barStyle="light-content"
                    navigator={this.props.navigator}
                    bgStyle={{ height: height }}
                    left={require('../../img/back.png')}
                    leftClick={() => this.props.navigator.pop()}
                >
                    <View style={styles.content}>
                        <Text style={{ color: 'white' }}>
                            南京德云鑫电子商务有限责任公司用户注册协议

    本协议是您与南京德云鑫电子商务有限责任公司所有者之间就南京德云鑫电子商务有限责任公司服务等相关事宜所订立的契约，请您仔细阅读本注册协议，
    您点击“同意以下协议，提交”按钮后，本协议即构成对双方有约束力的法律文件。

    第1条

    本站服务条款的确认和接纳

    1.1
    本站的各项电子服务的所有权和运作权归南京德云鑫电子商务有限责任公司所有。
    用户同意所有注册协议条款并完成注册程序，才能成为本App的正式用户。
    用户确认：
    本协议条款是处理双方权利义务的契约，始终有效，法律另有强制性规定或双方另有特别约定的，依其规定。

    1.2
    用户点击同意本协议的，即视为用户确认自己具有享受本站服务、下单购物等相应的权利能力和行为能力，能够独立承担法律责任。

    1.3
    如果您在18周岁以下，您只能在父母或监护人的监护参与下才能使用本站。

    1.4
    南京德云鑫电子商务有限责任公司保留在中华人民共和国大陆地区法施行之法律允许的范围内独自决定拒绝服务、关闭用户账户、清除或编辑内容或取消订单的权利。

    第2条

    App服务

    2.1
    App通过互联网依法为用户提供互联网信息等服务，用户在完全同意本协议及本站规定的情况下，方有权使用App的相关服务。

    2.2
    用户必须自行准备如下设备和承担如下开支：
    （1）上网设备，包括并不限于电脑或者其他上网终端、调制解调器及其他必备的上网装置；
    （2）上网开支，包括并不限于网络接入费、上网设备租用费、手机流量费等。

    第3条

    用户信息

    3.1
    用户应自行诚信向App提供注册资料，用户同意其提供的注册资料真实、准确、完整、合法有效，用户注册资料如有变动的，应及时更新其注册资料。如果用户提供的注册资料不合法、不真实、不准确、不详尽的，用户需承担因此引起的相应责任及后果，并且南京德云鑫电子商务有限责任公司保留终止用户使用南京德云鑫电子商务有限责任公司各项服务的权利。

    3.2
    用户在App进行浏览、下单购物等活动时，涉及用户真实姓名/名称、通信地址、联系电话、电子邮箱等隐私信息的，本站将予以严格保密，除非得到用户的授权或法律另有规定，本站不会向外界披露用户隐私信息。

    3.3
    用户注册成功后，将产生用户名和密码等账户信息，您可以根据App规定改变您的密码。用户应谨慎合理的保存、使用其用户名和密码。用户若发现任何非法使用用户账号或存在安全漏洞的情况，请立即通知App并向公安机关报案。

    3.4
    用户同意，南京德云鑫电子商务有限责任公司拥有通过邮件、短信电话等形式，向在本站注册、购物用户、收货人发送订单信息、促销活动等告知信息的权利。

    3.5
    用户不得将在App注册获得的账户借给他人使用，否则用户应承担由此产生的全部责任，并与实际使用人承担连带责任。

    第4条

    用户依法言行义务

    本协议依据国家相关法律法规规章制定，用户同意严格遵守以下义务：
    （1）不得传输或发表：煽动抗拒、破坏宪法和法律、行政法规实施的言论，煽动颠覆国家政权，推翻社会主义制度的言论，煽动分裂国家、破坏国家统一的的言论，煽动民族仇恨、民族歧视、破坏民族团结的言论；
    （2）从中国大陆向境外传输资料信息时必须符合中国有关法规；
    （3）不得利用本站从事洗钱、窃取商业秘密、窃取个人信息等违法犯罪活动；
    （4）不得干扰本站的正常运转，不得侵入本站及国家计算机信息系统；
    （5）不得传输或发表任何违法犯罪的、骚扰性的、中伤他人的、辱骂性的、恐吓性的、伤害性的、庸俗的，淫秽的、不文明的等信息资料；
    （6）不得传输或发表损害国家社会公共利益和涉及国家安全的信息资料或言
    论；
    （7）不得教唆他人从事本条所禁止的行为；
    （8）不得利用在本站注册的账户进行牟利性经营活动；
    （9）不得发布任何侵犯他人著作权、商标权等知识产权或合法权利的内容；

    用户应不时关注并遵守App不时公布或修改的各类合法规则规定。

    南京德云鑫电子商务有限责任公司保有删除站内各类不符合法律政策或不真实的信息内容而无须通知用户的权利。
                        </Text>
                    </View>
                </ScrollPage>
            </View>
        )
    }

}

function select(store) {
    return {
    }
}

export default connect(select)(main);

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    content: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 10
    },
    headView: {
        height: 80,
        width: 80,
        borderRadius: 40,
    },
    phoneInput: {
        width: 0.9 * width,
        borderRadius: 5,
        height: 40,
        backgroundColor: 'white',
        fontSize: 16,
        marginTop: 10
    },
    loginBtnStyle: {
        height: 40,
        borderRadius: 5,
        width: width * 0.9,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    //登录按钮,可用状态
    loginBtnTitle: {
        fontSize: 18,
    },
});
