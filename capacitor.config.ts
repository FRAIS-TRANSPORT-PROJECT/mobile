import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'mobile',
  webDir: 'build',
  bundledWebRuntime: false,
  server: {
    androidScheme: 'http',
    cleartext: true,
    allowNavigation: ['http://10.0.2.2:8086/*']
  }
};

export default config;
