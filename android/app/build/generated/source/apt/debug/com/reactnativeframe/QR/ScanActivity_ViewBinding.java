// Generated code from Butter Knife. Do not modify!
package com.reactnativeframe.QR;

import android.support.annotation.CallSuper;
import android.support.annotation.UiThread;
import android.view.View;
import butterknife.Unbinder;
import butterknife.internal.Utils;
import com.journeyapps.barcodescanner.DecoratedBarcodeView;
import com.reactnativeframe.R;
import java.lang.IllegalStateException;
import java.lang.Override;

public class ScanActivity_ViewBinding implements Unbinder {
  private ScanActivity target;

  @UiThread
  public ScanActivity_ViewBinding(ScanActivity target) {
    this(target, target.getWindow().getDecorView());
  }

  @UiThread
  public ScanActivity_ViewBinding(ScanActivity target, View source) {
    this.target = target;

    target.mDBV = Utils.findRequiredViewAsType(source, R.id.dbv, "field 'mDBV'", DecoratedBarcodeView.class);
  }

  @Override
  @CallSuper
  public void unbind() {
    ScanActivity target = this.target;
    if (target == null) throw new IllegalStateException("Bindings already cleared.");
    this.target = null;

    target.mDBV = null;
  }
}
