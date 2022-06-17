package com.mappn;

import android.os.Bundle;
import android.view.View;
import android.view.WindowManager;

import com.facebook.react.ReactActivity;

import org.devio.rn.splashscreen.SplashScreen;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "Mappn";
  }

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    getWindow().addFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN);
    SplashScreen.show(this);  // here
    super.onCreate(savedInstanceState);

  }
}
