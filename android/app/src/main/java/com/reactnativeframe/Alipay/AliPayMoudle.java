package com.reactnativeframe.Alipay;

/**
 * Created by apple on 2018/2/28.
 */

import android.content.Context;
import android.widget.Toast;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import android.annotation.SuppressLint;
import android.app.AlertDialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.support.v4.app.FragmentActivity;
import android.text.TextUtils;
import android.util.Log;
import android.view.View;
import android.widget.Toast;

import com.alipay.sdk.app.AuthTask;
import com.alipay.sdk.app.PayTask;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.reactnativeframe.Alipay.util.OrderInfoUtil2_0;

import java.util.Map;


public class AliPayMoudle extends ReactContextBaseJavaModule {
    /** 支付宝支付业务：入参app_id */
    public static final String APPID = "2018012001992432";

    /** 支付宝账户登录授权业务：入参pid值 */
    public static final String PID = "";
    /** 支付宝账户登录授权业务：入参target_id值 */
    public static final String TARGET_ID = "";

    /** 商户私钥，pkcs8格式 */
    /** 如下私钥，RSA2_PRIVATE 或者 RSA_PRIVATE 只需要填入一个 */
    /** 如果商户两个都设置了，优先使用 RSA2_PRIVATE */
    /** RSA2_PRIVATE 可以保证商户交易在更加安全的环境下进行，建议使用 RSA2_PRIVATE */
    /** 获取 RSA2_PRIVATE，建议使用支付宝提供的公私钥生成工具生成， */
    /** 工具地址：https://doc.open.alipay.com/docs/doc.htm?treeId=291&articleId=106097&docType=1 */
    //public static final String RSA2_PRIVATE = "MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCV8ZlsSXasY/2iwJhSBePOuHsZm48S6Qj75Qe6UNuiSYIMyqw8LP8AsNvL5IcWuJB+UnRjTJpqkU+DVPkrwJmp156c7Ry1VRsuflF4f8ovxHdD6GdFBoN/hsGKj92INb+zKzuLxnZktaQnoBEO/unmIoslYPYuoVpXNTNitRlYsA2vVWTS+3bR23jkfV0nfzIxU8Eoz+TmNDosrLV0AI6RojEWU0jnNIarLlTSg4Oo7FDz9GHFDfNL6kysSLoMMSm6hR3XsFYgeqOygKVznujh3miAiF0Ces1K3TJDlbGzKkWRt/xeUcDdYcF7DbYaHmpEKex9ePvmR03OdWcLYV6JAgMBAAECggEAQTqPAbqbs7bz+b9LBDOnvKAofSVdAl76F4q05+qRAXJ07tekQbFZZZWKqJJL6ih0Q1/fXetPKZj5PCrVEqGAt5AjYiUMXh4d6wXsrzz4Wftf3tzVQAPrZKjcvUiEmOK4+FqQVugJTRpvxQUvJpTib8kLO0GJFxP+Vv2/0urxkdCqRupQqS+TtWtSKa/6DmsqTV8G+nfETwnRaeMilI8ovlkEKax6a68bFO5+47Rtz4D5C+0Oow2kpyI83GEJBgQostlyU8YqXQmEZgAI1RNExfDadxEe7y6r/jQ6xhVgdnHuC2QKJN0qEYcz9Rk7sfwyWjxqpKjHcydQ+NacRGl4YQKBgQDHJSAgxoDlRh7fIwweLxFGDrYEgIFNUqjSsA2QCNQieKHG+r4OylmW5im1OLUHapTqaHqJADBPCmx5XZC+EQqPFbJ2bXcNVlRjynKWWxmfrRPsqH++tZC28bu0LQ42sDrEBk0hH9BPBS++bBuT47TKDZ60SgiFAnet24HiH7ne9QKBgQDAwIJ0qsy9NlWTaD2eBZUDBxLcIB7C5zsEdzYQ7jzg7EA8HAtJO38yd7Er36v0jIIZ6Ej+iPQOffM9JmcM2ks7tKAJOXrLzgwpLNm4WIGbFizEgVC0R3DIxu2C87TEaO/cXg2elv5yO78ZczdNlvDsSCeBY/yTlp44M2P3U14cxQKBgEg3iF0aXyfFs/BLL1vKycLUFuGvEDTQIvS0b1aqPPN7N3+G8mE+tBpqwPk85TkZR4Nx++2uqdYf+5JPgevLFj8pKRyVObUWd2fwxHkN9E7ZXv5VZG3uPdp58w21wQ/H/KeVeWbnuIzPXq75WU7aJneXVNQgfNJvQKNFlOZBhw/5AoGAOvFjs1ubumzIJIim9xDL7Z4XJVtpLL7bLFVsIidIVJvKVNdamC1qiztQ4ZLHmcPx8Qw4biXhRCE95cA9mQ+UHBDzM37xTyuWSm0dsyLVl2Bjlj/ZNxf1pGA4t2fhKoLQfroAPjP8YWBl4tl52u9Cg27ZLdcuoM9ZWORWOIa06+UCgYEAh+nyvh1DQ0Hgl8BNfDo+Y8lxv2ruZ7wt87itFDDQeujFqEO7rwhv+633OgHYCICH5GEYjaEUxBiOhqYR3uWNkVOr9zfBja0+5QoMk+fo2EZYRkj1yIF2xMZuEgNX1v4Njd6AuVpjsuGKAS6QNXTmJpYCw9L0+D3CSJksaBXmc4M=";
    //public static final String RSA_PRIVATE = "MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCV8ZlsSXasY/2iwJhSBePOuHsZm48S6Qj75Qe6UNuiSYIMyqw8LP8AsNvL5IcWuJB+UnRjTJpqkU+DVPkrwJmp156c7Ry1VRsuflF4f8ovxHdD6GdFBoN/hsGKj92INb+zKzuLxnZktaQnoBEO/unmIoslYPYuoVpXNTNitRlYsA2vVWTS+3bR23jkfV0nfzIxU8Eoz+TmNDosrLV0AI6RojEWU0jnNIarLlTSg4Oo7FDz9GHFDfNL6kysSLoMMSm6hR3XsFYgeqOygKVznujh3miAiF0Ces1K3TJDlbGzKkWRt/xeUcDdYcF7DbYaHmpEKex9ePvmR03OdWcLYV6JAgMBAAECggEAQTqPAbqbs7bz+b9LBDOnvKAofSVdAl76F4q05+qRAXJ07tekQbFZZZWKqJJL6ih0Q1/fXetPKZj5PCrVEqGAt5AjYiUMXh4d6wXsrzz4Wftf3tzVQAPrZKjcvUiEmOK4+FqQVugJTRpvxQUvJpTib8kLO0GJFxP+Vv2/0urxkdCqRupQqS+TtWtSKa/6DmsqTV8G+nfETwnRaeMilI8ovlkEKax6a68bFO5+47Rtz4D5C+0Oow2kpyI83GEJBgQostlyU8YqXQmEZgAI1RNExfDadxEe7y6r/jQ6xhVgdnHuC2QKJN0qEYcz9Rk7sfwyWjxqpKjHcydQ+NacRGl4YQKBgQDHJSAgxoDlRh7fIwweLxFGDrYEgIFNUqjSsA2QCNQieKHG+r4OylmW5im1OLUHapTqaHqJADBPCmx5XZC+EQqPFbJ2bXcNVlRjynKWWxmfrRPsqH++tZC28bu0LQ42sDrEBk0hH9BPBS++bBuT47TKDZ60SgiFAnet24HiH7ne9QKBgQDAwIJ0qsy9NlWTaD2eBZUDBxLcIB7C5zsEdzYQ7jzg7EA8HAtJO38yd7Er36v0jIIZ6Ej+iPQOffM9JmcM2ks7tKAJOXrLzgwpLNm4WIGbFizEgVC0R3DIxu2C87TEaO/cXg2elv5yO78ZczdNlvDsSCeBY/yTlp44M2P3U14cxQKBgEg3iF0aXyfFs/BLL1vKycLUFuGvEDTQIvS0b1aqPPN7N3+G8mE+tBpqwPk85TkZR4Nx++2uqdYf+5JPgevLFj8pKRyVObUWd2fwxHkN9E7ZXv5VZG3uPdp58w21wQ/H/KeVeWbnuIzPXq75WU7aJneXVNQgfNJvQKNFlOZBhw/5AoGAOvFjs1ubumzIJIim9xDL7Z4XJVtpLL7bLFVsIidIVJvKVNdamC1qiztQ4ZLHmcPx8Qw4biXhRCE95cA9mQ+UHBDzM37xTyuWSm0dsyLVl2Bjlj/ZNxf1pGA4t2fhKoLQfroAPjP8YWBl4tl52u9Cg27ZLdcuoM9ZWORWOIa06+UCgYEAh+nyvh1DQ0Hgl8BNfDo+Y8lxv2ruZ7wt87itFDDQeujFqEO7rwhv+633OgHYCICH5GEYjaEUxBiOhqYR3uWNkVOr9zfBja0+5QoMk+fo2EZYRkj1yIF2xMZuEgNX1v4Njd6AuVpjsuGKAS6QNXTmJpYCw9L0+D3CSJksaBXmc4M=";
    //public static final String RSA2_PRIVATE = "MIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQC26xD5niwKEox9wusyFYDijHEADdIsnrxG258pV6ZPnsNVA0eKbFPwheZ0P2ZNSqsTg5RQx69AZw7Dy3x5o1e4t1cwqJD1H0ztq1/uXc0zpL9ql8Kl5opcvRmBiHl1YnBtxpBoD5FaI3eUt6svIYmWv313QPlYgbXyPOR+Ya8EyKU0lr8iUS7XrmDBE7Bj3mSdsPXfl3xJXeDiycRWHirW9VHKfHeehq4NVYiDc4imZeNhfuFL6AA0gcXXHWvF3AukrN83ijxvDstp97JKrzFv7pimrwy6n52gqADEgQq3d97Ma9wyV2BPlUykYoBPkGWGNGCoWYuhc4eeb+ClagmfAgMBAAECggEBAJemX1Z0GlLnee6x8Uh+p3IruWuwCbXQjIu6fURLVKjiGVOb+m36zcS1XpC2F1yxMRBmoEowo00jpAwT4kj+cTXFWtYOis+Oebr5v/jhb8UHK2N2Gnxsm/2zEThhK0F0sX1xiDud3IX8raFwfM4AYg/HBoAeMBt+vpfsgAt/dRji0FUYERoqNtIkSnU3qASQAdKWVi07EY4lvY/KFjiWgFMWG2+dqBPCzYBDlKJ1YWbxai2s/J9+LIoB2THxdUnAeF3McOTWLuqDCLWw4IaWMfGcYvT6Ncb6/wE02dDunbwNo2Wf3l/4/zHiYYg21avW5JRt3ehskYXWiGLq1nc+nfECgYEA7CkissvjwaaZPOHCE3GMyQeaLTEzN9QDGOVGJa6LsLiDqyXthrl0rGXwhvMnmBELHsxzRy/fsCb4dvOt9J6L79YMCFpFrv+HBj9rhWNgQcMNCYe29HMkYwei1ql2TBX7ECbvDTU41SBfqbHDwga6N9/nwUZmnU+RdA5f4L3FLSUCgYEAxkjmbRDNe2GilFmVkT3uLonKfXegqpmjIkayQ7exHfFyNsDI/UUsYq31GfXLODUmOAeziAiWsnL01wuQ08JQ9MZl5NoMpVRh4heNZj8I8C9hovDiWhqkY7XPCGZedQq6j10chbb3cPvYfa+ECdr6dKWs3pn6Hv+IlVA27gTtGnMCgYEArael8zHIPXrDDai4bFHAA4cKkRavoerNiD33sffCkmVrtKtEGSBAMhEXqDQetkw6ECCo1/zVEJPnepi/HrSDFA4idPXkbcVKRYbXCpPDkTfbW1mnZ+NPK17PF+guq84x+nOWrvCm5NlUXtTvrLoDrth/c3jQNfbvbxau2/TPi90CgYAk0Vp/+/O7qjhvBWdhTbeRSqKfw3vA0cBZ1/i33D72CWQkyI1JgfOo6xYs2NgAOtY65yst4jJhNjlCSPJ+b4FqwgAfi2F3vYBjY+4sgx3cw1+EyuesxW+q2BJ2Q9PcNb7Iagimx3+QqiLby6Bf2BpTWIQN3Vd1NAufdgKNFbsVAwKBgQCPqS3N3DKmhM2P+pQUBMvriJucUyI/QgqwWsIGRGmOlm3ZR15koQ/7yKjlbSDMMUHfrXpg185BgPDXvL6zy+hsEu+tEczQpcofBxxJkhSaPnGGOrO0VpRt6anLLPJ8F4X5H2FQxO/RgUP4cleUymbq939iaKPw8Bc+LrnIGS9JLQ==";
    //public static final String RSA_PRIVATE = "MIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQC26xD5niwKEox9wusyFYDijHEADdIsnrxG258pV6ZPnsNVA0eKbFPwheZ0P2ZNSqsTg5RQx69AZw7Dy3x5o1e4t1cwqJD1H0ztq1/uXc0zpL9ql8Kl5opcvRmBiHl1YnBtxpBoD5FaI3eUt6svIYmWv313QPlYgbXyPOR+Ya8EyKU0lr8iUS7XrmDBE7Bj3mSdsPXfl3xJXeDiycRWHirW9VHKfHeehq4NVYiDc4imZeNhfuFL6AA0gcXXHWvF3AukrN83ijxvDstp97JKrzFv7pimrwy6n52gqADEgQq3d97Ma9wyV2BPlUykYoBPkGWGNGCoWYuhc4eeb+ClagmfAgMBAAECggEBAJemX1Z0GlLnee6x8Uh+p3IruWuwCbXQjIu6fURLVKjiGVOb+m36zcS1XpC2F1yxMRBmoEowo00jpAwT4kj+cTXFWtYOis+Oebr5v/jhb8UHK2N2Gnxsm/2zEThhK0F0sX1xiDud3IX8raFwfM4AYg/HBoAeMBt+vpfsgAt/dRji0FUYERoqNtIkSnU3qASQAdKWVi07EY4lvY/KFjiWgFMWG2+dqBPCzYBDlKJ1YWbxai2s/J9+LIoB2THxdUnAeF3McOTWLuqDCLWw4IaWMfGcYvT6Ncb6/wE02dDunbwNo2Wf3l/4/zHiYYg21avW5JRt3ehskYXWiGLq1nc+nfECgYEA7CkissvjwaaZPOHCE3GMyQeaLTEzN9QDGOVGJa6LsLiDqyXthrl0rGXwhvMnmBELHsxzRy/fsCb4dvOt9J6L79YMCFpFrv+HBj9rhWNgQcMNCYe29HMkYwei1ql2TBX7ECbvDTU41SBfqbHDwga6N9/nwUZmnU+RdA5f4L3FLSUCgYEAxkjmbRDNe2GilFmVkT3uLonKfXegqpmjIkayQ7exHfFyNsDI/UUsYq31GfXLODUmOAeziAiWsnL01wuQ08JQ9MZl5NoMpVRh4heNZj8I8C9hovDiWhqkY7XPCGZedQq6j10chbb3cPvYfa+ECdr6dKWs3pn6Hv+IlVA27gTtGnMCgYEArael8zHIPXrDDai4bFHAA4cKkRavoerNiD33sffCkmVrtKtEGSBAMhEXqDQetkw6ECCo1/zVEJPnepi/HrSDFA4idPXkbcVKRYbXCpPDkTfbW1mnZ+NPK17PF+guq84x+nOWrvCm5NlUXtTvrLoDrth/c3jQNfbvbxau2/TPi90CgYAk0Vp/+/O7qjhvBWdhTbeRSqKfw3vA0cBZ1/i33D72CWQkyI1JgfOo6xYs2NgAOtY65yst4jJhNjlCSPJ+b4FqwgAfi2F3vYBjY+4sgx3cw1+EyuesxW+q2BJ2Q9PcNb7Iagimx3+QqiLby6Bf2BpTWIQN3Vd1NAufdgKNFbsVAwKBgQCPqS3N3DKmhM2P+pQUBMvriJucUyI/QgqwWsIGRGmOlm3ZR15koQ/7yKjlbSDMMUHfrXpg185BgPDXvL6zy+hsEu+tEczQpcofBxxJkhSaPnGGOrO0VpRt6anLLPJ8F4X5H2FQxO/RgUP4cleUymbq939iaKPw8Bc+LrnIGS9JLQ==";
    //public static final String RSA2_PRIVATE ="";
    private static final int SDK_PAY_FLAG = 1;
    private static final int SDK_AUTH_FLAG = 2;

    private Context context;

    public AliPayMoudle(ReactApplicationContext reactContext) {
        super(reactContext);
        context = reactContext;
    }
//ReactContextBaseJavaModule要求派生类实现getName（）方法， 返回的是字符串名字，
// 这个名字在JavaScript端标记这个模块。注意：RN中已经内置了ToastAndroid的模块，所以练习时不要使用
    //这个名字否则会出错。

    @Override
    public String getName() {
        return "AliPay";
    }
    //Toast的show方法
    @ReactMethod //要导出一个方法给JavaScript用，Java方法需要使用注解：@ReactMethod，返回类型必须为void
    public void rnCallNative(String msg) {
        Toast.makeText(context, msg, Toast.LENGTH_LONG).show();
    }
    @SuppressLint("HandlerLeak")
    private Handler mHandler = new Handler(getReactApplicationContext().getMainLooper()) {
        @SuppressWarnings("unused")
        public void handleMessage(Message msg) {
            switch (msg.what) {
                case SDK_PAY_FLAG: {
                    @SuppressWarnings("unchecked")
                    PayResult payResult = new PayResult((Map<String, String>) msg.obj);
                    /**
                     对于支付结果，请商户依赖服务端的异步通知结果。同步通知结果，仅作为支付结束的通知。
                     */
                    String resultInfo = payResult.getResult();// 同步返回需要验证的信息
                    String resultStatus = payResult.getResultStatus();
                    // 判断resultStatus 为9000则代表支付成功
                    if (TextUtils.equals(resultStatus, "9000")) {
                        // 该笔订单是否真实支付成功，需要依赖服务端的异步通知。
				Toast.makeText(context, "支付成功", Toast.LENGTH_SHORT).show();
                    } else {
                        // 该笔订单真实的支付结果，需要依赖服务端的异步通知。
					Toast.makeText(context, "支付失败", Toast.LENGTH_SHORT).show();
                    }
                    break;
                }
                case SDK_AUTH_FLAG: {
                    @SuppressWarnings("unchecked")
                    AuthResult authResult = new AuthResult((Map<String, String>) msg.obj, true);
                    String resultStatus = authResult.getResultStatus();

                    // 判断resultStatus 为“9000”且result_code
                    // 为“200”则代表授权成功，具体状态码代表含义可参考授权接口文档
                    if (TextUtils.equals(resultStatus, "9000") && TextUtils.equals(authResult.getResultCode(), "200")) {
                        // 获取alipay_open_id，调支付时作为参数extern_token 的value
                        // 传入，则支付账户为该授权账户
					Toast.makeText(context,
							"授权成功\n" + String.format("authCode:%s", authResult.getAuthCode()), Toast.LENGTH_SHORT)
							.show();
                    } else {
                        // 其他状态值则为授权失败
					Toast.makeText(context,
							"授权失败" + String.format("authCode:%s", authResult.getAuthCode()), Toast.LENGTH_SHORT).show();
                    }
                    break;
                }
                default:
                    break;
            }
        };
    };



    /**
     * 支付宝支付业务
     *
     *
     */
    @ReactMethod
    public void payV2(String info,final Promise promise) {
//		if (TextUtils.isEmpty(APPID) || (TextUtils.isEmpty(RSA2_PRIVATE) && TextUtils.isEmpty(RSA_PRIVATE))) {
//			new AlertDialog.Builder(context).setTitle("警告").setMessage("需要配置APPID | RSA_PRIVATE")
//					.setPositiveButton("确定", new DialogInterface.OnClickListener() {
//						public void onClick(DialogInterface dialoginterface, int i) {
//							//
//                            getCurrentActivity().finish();
//						}
//					}).show();
//			return;
//		}

        /**
         * 这里只是为了方便直接向商户展示支付宝的整个支付流程；所以Demo中加签过程直接放在客户端完成；
         * 真实App里，privateKey等数据严禁放在客户端，加签过程务必要放在服务端完成；
         * 防止商户私密数据泄露，造成不必要的资金损失，及面临各种安全风险；
         *
         * orderInfo的获取必须来自服务端；
         */

//        boolean rsa2 = (RSA2_PRIVATE.length() > 0);
//        Map<String, String> params = OrderInfoUtil2_0.buildOrderParamMap(APPID, rsa2, info);
//        String orderParam = OrderInfoUtil2_0.buildOrderParam(params);
//
//        String privateKey = rsa2 ? RSA2_PRIVATE : RSA_PRIVATE;
//        String sign = OrderInfoUtil2_0.getSign(params, privateKey, rsa2);
        final String orderInfo = info;
        Log.d("sssssss", "payV2: "+orderInfo);

        Runnable payRunnable = new Runnable() {

            @Override
            public void run() {
                try {
                    PayTask alipay = new PayTask(getCurrentActivity());
                    Map<String, String> result = alipay.payV2(orderInfo, true);
                    Log.i("msp", result.toString());
                    PayResult payResult = new PayResult(result);
                    String resultInfo = payResult.getMemo();
                    String resultStatus = payResult.getResultStatus();

                    Message msg = new Message();
                    msg.what = SDK_PAY_FLAG;
                    msg.obj = result;
                    mHandler.sendMessage(msg);
                    if (Integer.valueOf(resultStatus) >= 8000) {
                        promise.resolve(result.toString());
                        Log.d("123", result.toString());
                    } else {
                        promise.reject(resultInfo, new RuntimeException(resultStatus + ":" + resultInfo));
                    }
                } catch (Exception e) {
                    promise.reject(e.getLocalizedMessage(), e);
                }
            }
        };

        Thread payThread = new Thread(payRunnable);
        payThread.start();
    }

    /**
     * 支付宝账户授权业务
     *
     * @param v
     */
//    public void authV2(View v) {
//        if (TextUtils.isEmpty(PID) || TextUtils.isEmpty(APPID)
//                || (TextUtils.isEmpty(RSA2_PRIVATE) && TextUtils.isEmpty(RSA_PRIVATE))
//                || TextUtils.isEmpty(TARGET_ID)) {
//            new AlertDialog.Builder(this).setTitle("警告").setMessage("需要配置PARTNER |APP_ID| RSA_PRIVATE| TARGET_ID")
//                    .setPositiveButton("确定", new DialogInterface.OnClickListener() {
//                        public void onClick(DialogInterface dialoginterface, int i) {
//                        }
//                    }).show();
//            return;
//        }

        /**
         * 这里只是为了方便直接向商户展示支付宝的整个支付流程；所以Demo中加签过程直接放在客户端完成；
         * 真实App里，privateKey等数据严禁放在客户端，加签过程务必要放在服务端完成；
         * 防止商户私密数据泄露，造成不必要的资金损失，及面临各种安全风险；
         *
         * authInfo的获取必须来自服务端；
         */
//        boolean rsa2 = (RSA2_PRIVATE.length() > 0);
//        Map<String, String> authInfoMap = OrderInfoUtil2_0.buildAuthInfoMap(PID, APPID, TARGET_ID, rsa2);
//        String info = OrderInfoUtil2_0.buildOrderParam(authInfoMap);
//
//        String privateKey = rsa2 ? RSA2_PRIVATE : RSA_PRIVATE;
//        String sign = OrderInfoUtil2_0.getSign(authInfoMap, privateKey, rsa2);
//        final String authInfo = info + "&" + sign;
//        Runnable authRunnable = new Runnable() {
//
//            @Override
//            public void run() {
//                // 构造AuthTask 对象
//                AuthTask authTask = new AuthTask(PayDemoActivity.this);
//                // 调用授权接口，获取授权结果
//                Map<String, String> result = authTask.authV2(authInfo, true);
//
//                Message msg = new Message();
//                msg.what = SDK_AUTH_FLAG;
//                msg.obj = result;
//                mHandler.sendMessage(msg);
//            }
//        };
//
//        // 必须异步调用
//        Thread authThread = new Thread(authRunnable);
//        authThread.start();
//    }

    /**
     * get the sdk version. 获取SDK版本号
     *
     */
    public void getSDKVersion() {
        PayTask payTask = new PayTask(getCurrentActivity());
        String version = payTask.getVersion();
        Toast.makeText(context, version, Toast.LENGTH_SHORT).show();
    }

    /**
     * 原生的H5（手机网页版支付切natvie支付） 【对应页面网页支付按钮】
     *
     * @param v
     */
//    public void h5Pay(View v) {
//        Intent intent = new Intent(this, H5PayDemoActivity.class);
//        Bundle extras = new Bundle();
//        /**
//         * url 是要测试的网站，在 Demo App 中会使用 H5PayDemoActivity 内的 WebView 打开。
//         *
//         * 可以填写任一支持支付宝支付的网站（如淘宝或一号店），在网站中下订单并唤起支付宝；
//         * 或者直接填写由支付宝文档提供的“网站 Demo”生成的订单地址
//         * （如 https://mclient.alipay.com/h5Continue.htm?h5_route_token=303ff0894cd4dccf591b089761dexxxx）
//         * 进行测试。
//         *
//         * H5PayDemoActivity 中的 MyWebViewClient.shouldOverrideUrlLoading() 实现了拦截 URL 唤起支付宝，
//         * 可以参考它实现自定义的 URL 拦截逻辑。
//         */
//        String url = "http://m.taobao.com";
//        extras.putString("url", url);
//        intent.putExtras(extras);
//        startActivity(intent);
//    }
}