package com.reactnativeframe;

import android.content.Context;
import android.os.Bundle;
import android.os.Environment;
import android.os.StatFs;
import android.text.format.Formatter;
import android.util.Log;
import android.widget.Toast;

import com.facebook.react.ReactActivity;

import java.io.File;

import cn.jpush.android.api.JPushInterface;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "reactNativeFrame";
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        if(!hasAvailStorage(this)) {
            finish();
        }
        JPushInterface.init(this);
    }
    private static final String TAG = "david";
    private static final long MIN_SIZE = 20L;

    public static boolean hasAvailStorage(Context context) {
        //判断sdcard存储空间是否满足文件的存储
        File sdcard_filedir = Environment.getExternalStorageDirectory();//得到sdcard的目录作为一个文件对象
        long usableSpace = sdcard_filedir.getUsableSpace();//获取文件目录对象剩余空间
        long totalSpace = sdcard_filedir.getTotalSpace();
        //将一个long类型的文件大小格式化成用户可以看懂的M，G字符串
        String totalSpace_str = Formatter.formatFileSize(context, totalSpace);

        File root = Environment.getRootDirectory();
        StatFs sf = new StatFs(root.getPath());
        long blockSize = sf.getBlockSizeLong();
        long blockCount = sf.getBlockCountLong();
        long availCount = sf.getAvailableBlocksLong();
        long rootDirectorySize = availCount * blockSize;
        Log.i(TAG, "block大小:" + blockSize + ",block数目:" + blockCount + ",总大小:" + blockSize * blockCount / 1024 + "KB");
        Log.i(TAG, "可用的block数目：:" + availCount + ",可用大小:" + availCount * blockSize / 1024 + "KB");
        long availStorage = usableSpace + rootDirectorySize;
        String availStorageStr = Formatter.formatFileSize(context, availStorage);

        if (availStorage < 1024 * 1024 * MIN_SIZE) {//判断剩余空间是否小于200M
            Toast.makeText(context, "剩余空间不足,无法启动app；剩余空间为：" + availStorageStr, Toast.LENGTH_SHORT).show();
            return false;
        }
        Log.i(TAG, "剩余空间为：" + availStorageStr);
        return true;
    }
    @Override
    protected void onPause() {
        super.onPause();
        JPushInterface.onPause(this);
    }

    @Override
    protected void onResume() {
        super.onResume();
        JPushInterface.onResume(this);
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
    }
}
