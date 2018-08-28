package com.reactnativeframe.QR;

import android.app.Activity;
import android.content.Intent;
import android.util.Log;
import android.widget.Toast;
import android.content.Context;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.google.zxing.integration.android.IntentIntegrator;
import com.google.zxing.integration.android.IntentResult;

/**
 * Created by Administrator on 2016/10/18.
 */

public class QRMoudle extends ReactContextBaseJavaModule implements ActivityEventListener {


    private Context mContext;
    private String result;
    private Promise pro;

    public QRMoudle(ReactApplicationContext reactContext) {
        super(reactContext);

        mContext = reactContext;
        reactContext.addActivityEventListener(this);
    }

    @Override
    public String getName() {

        //返回的这个名字是必须的，在rn代码中需要这个名字来调用该类的方法。
        return "QRMoudle";
    }


    //函数不能有返回值，因为被调用的原生代码是异步的，原生代码执行结束之后只能通过回调函数或者发送信息给rn那边。


    @ReactMethod
    public void rnCallNative(String msg,final Promise promise){
        this.pro = promise;
        new IntentIntegrator(getCurrentActivity())
                .setOrientationLocked(false)
                .setCaptureActivity(ScanActivity.class) // 设置自定义的activity是ScanActivity
                .initiateScan(); // 初始化扫描

    }


    @Override
    public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {
        IntentResult intentResult = IntentIntegrator.parseActivityResult(requestCode,resultCode,data);
        if(intentResult != null) {
            if(intentResult.getContents() == null) {
                Toast.makeText(mContext,"内容为空",Toast.LENGTH_LONG).show();
                pro.reject("shibai", new RuntimeException("shibai" ));
            } else {
                Toast.makeText(mContext,"扫描成功",Toast.LENGTH_LONG).show();
                // ScanResult 为 获取到的字符串
                String ScanResult = intentResult.getContents();
                Log.d("3333333333", ScanResult);
                pro.resolve(ScanResult);
            }
        } else {
            //super.onActivityResult(requestCode,resultCode,data);
        }
    }

    @Override
    public void onNewIntent(Intent intent) {

    }
}