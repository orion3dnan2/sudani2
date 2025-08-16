
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Switch, Alert } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { router } from 'expo-router';

interface DatabaseConfig {
  type: 'mysql' | 'postgresql' | 'mongodb' | 'firebase';
  host: string;
  port: string;
  database: string;
  username: string;
  password: string;
  connectionString: string;
}

interface ApiConfig {
  baseUrl: string;
  apiKey: string;
  timeout: number;
  retryAttempts: number;
  enableLogging: boolean;
}

interface NotificationConfig {
  email: {
    enabled: boolean;
    smtpHost: string;
    smtpPort: string;
    username: string;
    password: string;
    fromEmail: string;
  };
  sms: {
    enabled: boolean;
    provider: 'twilio' | 'nexmo' | 'aws-sns';
    apiKey: string;
    apiSecret: string;
    fromNumber: string;
  };
  push: {
    enabled: boolean;
    firebaseServerKey: string;
    apnsKey: string;
    apnsCertificate: string;
  };
}

interface PaymentConfig {
  stripe: {
    enabled: boolean;
    publicKey: string;
    secretKey: string;
    webhookSecret: string;
  };
  paypal: {
    enabled: boolean;
    clientId: string;
    clientSecret: string;
    sandboxMode: boolean;
  };
  localPayment: {
    enabled: boolean;
    bankAccount: string;
    iban: string;
  };
}

interface SocialMediaConfig {
  whatsapp: {
    enabled: boolean;
    businessApiToken: string;
    phoneNumberId: string;
    webhookUrl: string;
  };
  telegram: {
    enabled: boolean;
    botToken: string;
    chatId: string;
  };
  twitter: {
    enabled: boolean;
    apiKey: string;
    apiSecret: string;
    accessToken: string;
    accessSecret: string;
  };
}

export default function AdminAppSettings() {
  const [activeTab, setActiveTab] = useState<'database' | 'api' | 'notifications' | 'payments' | 'social' | 'general'>('database');

  const [databaseConfig, setDatabaseConfig] = useState<DatabaseConfig>({
    type: 'mysql',
    host: 'localhost',
    port: '3306',
    database: '',
    username: '',
    password: '',
    connectionString: ''
  });

  const [apiConfig, setApiConfig] = useState<ApiConfig>({
    baseUrl: 'https://api.example.com',
    apiKey: '',
    timeout: 30000,
    retryAttempts: 3,
    enableLogging: true
  });

  const [notificationConfig, setNotificationConfig] = useState<NotificationConfig>({
    email: {
      enabled: false,
      smtpHost: 'smtp.gmail.com',
      smtpPort: '587',
      username: '',
      password: '',
      fromEmail: ''
    },
    sms: {
      enabled: false,
      provider: 'twilio',
      apiKey: '',
      apiSecret: '',
      fromNumber: ''
    },
    push: {
      enabled: false,
      firebaseServerKey: '',
      apnsKey: '',
      apnsCertificate: ''
    }
  });

  const [paymentConfig, setPaymentConfig] = useState<PaymentConfig>({
    stripe: {
      enabled: false,
      publicKey: '',
      secretKey: '',
      webhookSecret: ''
    },
    paypal: {
      enabled: false,
      clientId: '',
      clientSecret: '',
      sandboxMode: true
    },
    localPayment: {
      enabled: true,
      bankAccount: '',
      iban: ''
    }
  });

  const [socialMediaConfig, setSocialMediaConfig] = useState<SocialMediaConfig>({
    whatsapp: {
      enabled: false,
      businessApiToken: '',
      phoneNumberId: '',
      webhookUrl: ''
    },
    telegram: {
      enabled: false,
      botToken: '',
      chatId: ''
    },
    twitter: {
      enabled: false,
      apiKey: '',
      apiSecret: '',
      accessToken: '',
      accessSecret: ''
    }
  });

  const [generalSettings, setGeneralSettings] = useState({
    appName: 'منصة التجارة الإلكترونية',
    appVersion: '1.0.0',
    maintenanceMode: false,
    debugMode: false,
    maxUploadSize: '10MB',
    defaultLanguage: 'ar',
    timezone: 'Asia/Riyadh',
    supportEmail: 'support@example.com',
    supportPhone: '+966501234567'
  });

  const handleSaveSettings = () => {
    Alert.alert('تأكيد الحفظ', 'هل تريد حفظ جميع الإعدادات؟', [
      { text: 'إلغاء', style: 'cancel' },
      { text: 'حفظ', onPress: () => {
        // Logic to save settings
        Alert.alert('نجح', 'تم حفظ الإعدادات بنجاح');
      }}
    ]);
  };

  const testConnection = (type: string) => {
    Alert.alert('اختبار الاتصال', `جاري اختبار اتصال ${type}...`, [
      { text: 'موافق' }
    ]);
  };

  const handleBack = () => {
    router.back();
  };

  const tabs = [
    { id: 'database', title: 'قاعدة البيانات', icon: 'house.fill' },
    { id: 'api', title: 'واجهة البرمجة', icon: 'paperplane.fill' },
    { id: 'notifications', title: 'الإشعارات', icon: 'chevron.right' },
    { id: 'payments', title: 'المدفوعات', icon: 'house.fill' },
    { id: 'social', title: 'التواصل الاجتماعي', icon: 'paperplane.fill' },
    { id: 'general', title: 'عام', icon: 'chevron.right' }
  ];

  const renderDatabaseSettings = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>🗄️ إعدادات قاعدة البيانات</Text>
      
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>نوع قاعدة البيانات</Text>
        <View style={styles.radioGroup}>
          {(['mysql', 'postgresql', 'mongodb', 'firebase'] as const).map((type) => (
            <TouchableOpacity
              key={type}
              style={[styles.radioOption, databaseConfig.type === type && styles.radioSelected]}
              onPress={() => setDatabaseConfig(prev => ({ ...prev, type }))}
            >
              <Text style={[styles.radioText, databaseConfig.type === type && styles.radioTextSelected]}>
                {type === 'mysql' ? 'MySQL' : type === 'postgresql' ? 'PostgreSQL' : type === 'mongodb' ? 'MongoDB' : 'Firebase'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {databaseConfig.type !== 'firebase' ? (
        <>
          <View style={styles.inputRow}>
            <View style={styles.inputHalf}>
              <Text style={styles.inputLabel}>المضيف (Host)</Text>
              <TextInput
                style={styles.textInput}
                value={databaseConfig.host}
                onChangeText={(text) => setDatabaseConfig(prev => ({ ...prev, host: text }))}
                placeholder="localhost"
              />
            </View>
            <View style={styles.inputHalf}>
              <Text style={styles.inputLabel}>المنفذ (Port)</Text>
              <TextInput
                style={styles.textInput}
                value={databaseConfig.port}
                onChangeText={(text) => setDatabaseConfig(prev => ({ ...prev, port: text }))}
                placeholder="3306"
                keyboardType="numeric"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>اسم قاعدة البيانات</Text>
            <TextInput
              style={styles.textInput}
              value={databaseConfig.database}
              onChangeText={(text) => setDatabaseConfig(prev => ({ ...prev, database: text }))}
              placeholder="app_database"
            />
          </View>

          <View style={styles.inputRow}>
            <View style={styles.inputHalf}>
              <Text style={styles.inputLabel}>اسم المستخدم</Text>
              <TextInput
                style={styles.textInput}
                value={databaseConfig.username}
                onChangeText={(text) => setDatabaseConfig(prev => ({ ...prev, username: text }))}
                placeholder="username"
              />
            </View>
            <View style={styles.inputHalf}>
              <Text style={styles.inputLabel}>كلمة المرور</Text>
              <TextInput
                style={styles.textInput}
                value={databaseConfig.password}
                onChangeText={(text) => setDatabaseConfig(prev => ({ ...prev, password: text }))}
                placeholder="password"
                secureTextEntry
              />
            </View>
          </View>
        </>
      ) : (
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>سلسلة الاتصال (Connection String)</Text>
          <TextInput
            style={[styles.textInput, styles.textArea]}
            value={databaseConfig.connectionString}
            onChangeText={(text) => setDatabaseConfig(prev => ({ ...prev, connectionString: text }))}
            placeholder="mongodb://username:password@host:port/database"
            multiline
            numberOfLines={3}
          />
        </View>
      )}

      <TouchableOpacity style={styles.testButton} onPress={() => testConnection('قاعدة البيانات')}>
        <IconSymbol name="paperplane.fill" size={16} color="#fff" />
        <Text style={styles.testButtonText}>اختبار الاتصال</Text>
      </TouchableOpacity>
    </View>
  );

  const renderApiSettings = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>🔌 إعدادات واجهة البرمجة</Text>
      
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>رابط API الأساسي</Text>
        <TextInput
          style={styles.textInput}
          value={apiConfig.baseUrl}
          onChangeText={(text) => setApiConfig(prev => ({ ...prev, baseUrl: text }))}
          placeholder="https://api.example.com"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>مفتاح API</Text>
        <TextInput
          style={styles.textInput}
          value={apiConfig.apiKey}
          onChangeText={(text) => setApiConfig(prev => ({ ...prev, apiKey: text }))}
          placeholder="your-api-key"
          secureTextEntry
        />
      </View>

      <View style={styles.inputRow}>
        <View style={styles.inputHalf}>
          <Text style={styles.inputLabel}>مهلة الانتظار (بالثواني)</Text>
          <TextInput
            style={styles.textInput}
            value={apiConfig.timeout.toString()}
            onChangeText={(text) => setApiConfig(prev => ({ ...prev, timeout: parseInt(text) || 30000 }))}
            placeholder="30000"
            keyboardType="numeric"
          />
        </View>
        <View style={styles.inputHalf}>
          <Text style={styles.inputLabel}>محاولات الإعادة</Text>
          <TextInput
            style={styles.textInput}
            value={apiConfig.retryAttempts.toString()}
            onChangeText={(text) => setApiConfig(prev => ({ ...prev, retryAttempts: parseInt(text) || 3 }))}
            placeholder="3"
            keyboardType="numeric"
          />
        </View>
      </View>

      <View style={styles.switchItem}>
        <Text style={styles.switchLabel}>تفعيل تسجيل الأخطاء</Text>
        <Switch
          value={apiConfig.enableLogging}
          onValueChange={(value) => setApiConfig(prev => ({ ...prev, enableLogging: value }))}
          trackColor={{ false: '#e5e7eb', true: '#3b82f6' }}
          thumbColor={apiConfig.enableLogging ? '#fff' : '#f4f3f4'}
        />
      </View>

      <TouchableOpacity style={styles.testButton} onPress={() => testConnection('واجهة البرمجة')}>
        <IconSymbol name="paperplane.fill" size={16} color="#fff" />
        <Text style={styles.testButtonText}>اختبار الاتصال</Text>
      </TouchableOpacity>
    </View>
  );

  const renderNotificationSettings = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>🔔 إعدادات الإشعارات</Text>
      
      {/* Email Settings */}
      <View style={styles.subSection}>
        <View style={styles.subSectionHeader}>
          <Text style={styles.subSectionTitle}>📧 البريد الإلكتروني</Text>
          <Switch
            value={notificationConfig.email.enabled}
            onValueChange={(value) => setNotificationConfig(prev => ({
              ...prev,
              email: { ...prev.email, enabled: value }
            }))}
            trackColor={{ false: '#e5e7eb', true: '#3b82f6' }}
            thumbColor={notificationConfig.email.enabled ? '#fff' : '#f4f3f4'}
          />
        </View>

        {notificationConfig.email.enabled && (
          <>
            <View style={styles.inputRow}>
              <View style={styles.inputHalf}>
                <Text style={styles.inputLabel}>خادم SMTP</Text>
                <TextInput
                  style={styles.textInput}
                  value={notificationConfig.email.smtpHost}
                  onChangeText={(text) => setNotificationConfig(prev => ({
                    ...prev,
                    email: { ...prev.email, smtpHost: text }
                  }))}
                  placeholder="smtp.gmail.com"
                />
              </View>
              <View style={styles.inputHalf}>
                <Text style={styles.inputLabel}>المنفذ</Text>
                <TextInput
                  style={styles.textInput}
                  value={notificationConfig.email.smtpPort}
                  onChangeText={(text) => setNotificationConfig(prev => ({
                    ...prev,
                    email: { ...prev.email, smtpPort: text }
                  }))}
                  placeholder="587"
                  keyboardType="numeric"
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>البريد الإلكتروني للمرسل</Text>
              <TextInput
                style={styles.textInput}
                value={notificationConfig.email.fromEmail}
                onChangeText={(text) => setNotificationConfig(prev => ({
                  ...prev,
                  email: { ...prev.email, fromEmail: text }
                }))}
                placeholder="noreply@example.com"
                keyboardType="email-address"
              />
            </View>

            <View style={styles.inputRow}>
              <View style={styles.inputHalf}>
                <Text style={styles.inputLabel}>اسم المستخدم</Text>
                <TextInput
                  style={styles.textInput}
                  value={notificationConfig.email.username}
                  onChangeText={(text) => setNotificationConfig(prev => ({
                    ...prev,
                    email: { ...prev.email, username: text }
                  }))}
                  placeholder="username"
                />
              </View>
              <View style={styles.inputHalf}>
                <Text style={styles.inputLabel}>كلمة المرور</Text>
                <TextInput
                  style={styles.textInput}
                  value={notificationConfig.email.password}
                  onChangeText={(text) => setNotificationConfig(prev => ({
                    ...prev,
                    email: { ...prev.email, password: text }
                  }))}
                  placeholder="password"
                  secureTextEntry
                />
              </View>
            </View>
          </>
        )}
      </View>

      {/* SMS Settings */}
      <View style={styles.subSection}>
        <View style={styles.subSectionHeader}>
          <Text style={styles.subSectionTitle}>📱 الرسائل النصية</Text>
          <Switch
            value={notificationConfig.sms.enabled}
            onValueChange={(value) => setNotificationConfig(prev => ({
              ...prev,
              sms: { ...prev.sms, enabled: value }
            }))}
            trackColor={{ false: '#e5e7eb', true: '#3b82f6' }}
            thumbColor={notificationConfig.sms.enabled ? '#fff' : '#f4f3f4'}
          />
        </View>

        {notificationConfig.sms.enabled && (
          <>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>مزود الخدمة</Text>
              <View style={styles.radioGroup}>
                {(['twilio', 'nexmo', 'aws-sns'] as const).map((provider) => (
                  <TouchableOpacity
                    key={provider}
                    style={[styles.radioOption, notificationConfig.sms.provider === provider && styles.radioSelected]}
                    onPress={() => setNotificationConfig(prev => ({
                      ...prev,
                      sms: { ...prev.sms, provider }
                    }))}
                  >
                    <Text style={[styles.radioText, notificationConfig.sms.provider === provider && styles.radioTextSelected]}>
                      {provider === 'twilio' ? 'Twilio' : provider === 'nexmo' ? 'Nexmo' : 'AWS SNS'}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.inputRow}>
              <View style={styles.inputHalf}>
                <Text style={styles.inputLabel}>مفتاح API</Text>
                <TextInput
                  style={styles.textInput}
                  value={notificationConfig.sms.apiKey}
                  onChangeText={(text) => setNotificationConfig(prev => ({
                    ...prev,
                    sms: { ...prev.sms, apiKey: text }
                  }))}
                  placeholder="api-key"
                  secureTextEntry
                />
              </View>
              <View style={styles.inputHalf}>
                <Text style={styles.inputLabel}>المفتاح السري</Text>
                <TextInput
                  style={styles.textInput}
                  value={notificationConfig.sms.apiSecret}
                  onChangeText={(text) => setNotificationConfig(prev => ({
                    ...prev,
                    sms: { ...prev.sms, apiSecret: text }
                  }))}
                  placeholder="api-secret"
                  secureTextEntry
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>رقم المرسل</Text>
              <TextInput
                style={styles.textInput}
                value={notificationConfig.sms.fromNumber}
                onChangeText={(text) => setNotificationConfig(prev => ({
                  ...prev,
                  sms: { ...prev.sms, fromNumber: text }
                }))}
                placeholder="+966501234567"
                keyboardType="phone-pad"
              />
            </View>
          </>
        )}
      </View>

      {/* Push Notifications */}
      <View style={styles.subSection}>
        <View style={styles.subSectionHeader}>
          <Text style={styles.subSectionTitle}>📲 الإشعارات الفورية</Text>
          <Switch
            value={notificationConfig.push.enabled}
            onValueChange={(value) => setNotificationConfig(prev => ({
              ...prev,
              push: { ...prev.push, enabled: value }
            }))}
            trackColor={{ false: '#e5e7eb', true: '#3b82f6' }}
            thumbColor={notificationConfig.push.enabled ? '#fff' : '#f4f3f4'}
          />
        </View>

        {notificationConfig.push.enabled && (
          <>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>مفتاح خادم Firebase</Text>
              <TextInput
                style={styles.textInput}
                value={notificationConfig.push.firebaseServerKey}
                onChangeText={(text) => setNotificationConfig(prev => ({
                  ...prev,
                  push: { ...prev.push, firebaseServerKey: text }
                }))}
                placeholder="firebase-server-key"
                secureTextEntry
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>مفتاح APNS (iOS)</Text>
              <TextInput
                style={styles.textInput}
                value={notificationConfig.push.apnsKey}
                onChangeText={(text) => setNotificationConfig(prev => ({
                  ...prev,
                  push: { ...prev.push, apnsKey: text }
                }))}
                placeholder="apns-key"
                secureTextEntry
              />
            </View>
          </>
        )}
      </View>
    </View>
  );

  const renderPaymentSettings = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>💳 إعدادات المدفوعات</Text>
      
      {/* Stripe */}
      <View style={styles.subSection}>
        <View style={styles.subSectionHeader}>
          <Text style={styles.subSectionTitle}>💳 Stripe</Text>
          <Switch
            value={paymentConfig.stripe.enabled}
            onValueChange={(value) => setPaymentConfig(prev => ({
              ...prev,
              stripe: { ...prev.stripe, enabled: value }
            }))}
            trackColor={{ false: '#e5e7eb', true: '#3b82f6' }}
            thumbColor={paymentConfig.stripe.enabled ? '#fff' : '#f4f3f4'}
          />
        </View>

        {paymentConfig.stripe.enabled && (
          <>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>المفتاح العام</Text>
              <TextInput
                style={styles.textInput}
                value={paymentConfig.stripe.publicKey}
                onChangeText={(text) => setPaymentConfig(prev => ({
                  ...prev,
                  stripe: { ...prev.stripe, publicKey: text }
                }))}
                placeholder="pk_test_..."
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>المفتاح السري</Text>
              <TextInput
                style={styles.textInput}
                value={paymentConfig.stripe.secretKey}
                onChangeText={(text) => setPaymentConfig(prev => ({
                  ...prev,
                  stripe: { ...prev.stripe, secretKey: text }
                }))}
                placeholder="sk_test_..."
                secureTextEntry
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>مفتاح Webhook</Text>
              <TextInput
                style={styles.textInput}
                value={paymentConfig.stripe.webhookSecret}
                onChangeText={(text) => setPaymentConfig(prev => ({
                  ...prev,
                  stripe: { ...prev.stripe, webhookSecret: text }
                }))}
                placeholder="whsec_..."
                secureTextEntry
              />
            </View>
          </>
        )}
      </View>

      {/* PayPal */}
      <View style={styles.subSection}>
        <View style={styles.subSectionHeader}>
          <Text style={styles.subSectionTitle}>🏦 PayPal</Text>
          <Switch
            value={paymentConfig.paypal.enabled}
            onValueChange={(value) => setPaymentConfig(prev => ({
              ...prev,
              paypal: { ...prev.paypal, enabled: value }
            }))}
            trackColor={{ false: '#e5e7eb', true: '#3b82f6' }}
            thumbColor={paymentConfig.paypal.enabled ? '#fff' : '#f4f3f4'}
          />
        </View>

        {paymentConfig.paypal.enabled && (
          <>
            <View style={styles.inputRow}>
              <View style={styles.inputHalf}>
                <Text style={styles.inputLabel}>معرف العميل</Text>
                <TextInput
                  style={styles.textInput}
                  value={paymentConfig.paypal.clientId}
                  onChangeText={(text) => setPaymentConfig(prev => ({
                    ...prev,
                    paypal: { ...prev.paypal, clientId: text }
                  }))}
                  placeholder="client-id"
                />
              </View>
              <View style={styles.inputHalf}>
                <Text style={styles.inputLabel}>المفتاح السري</Text>
                <TextInput
                  style={styles.textInput}
                  value={paymentConfig.paypal.clientSecret}
                  onChangeText={(text) => setPaymentConfig(prev => ({
                    ...prev,
                    paypal: { ...prev.paypal, clientSecret: text }
                  }))}
                  placeholder="client-secret"
                  secureTextEntry
                />
              </View>
            </View>

            <View style={styles.switchItem}>
              <Text style={styles.switchLabel}>وضع التجربة (Sandbox)</Text>
              <Switch
                value={paymentConfig.paypal.sandboxMode}
                onValueChange={(value) => setPaymentConfig(prev => ({
                  ...prev,
                  paypal: { ...prev.paypal, sandboxMode: value }
                }))}
                trackColor={{ false: '#e5e7eb', true: '#f59e0b' }}
                thumbColor={paymentConfig.paypal.sandboxMode ? '#fff' : '#f4f3f4'}
              />
            </View>
          </>
        )}
      </View>

      {/* Local Payment */}
      <View style={styles.subSection}>
        <View style={styles.subSectionHeader}>
          <Text style={styles.subSectionTitle}>🏧 الدفع المحلي</Text>
          <Switch
            value={paymentConfig.localPayment.enabled}
            onValueChange={(value) => setPaymentConfig(prev => ({
              ...prev,
              localPayment: { ...prev.localPayment, enabled: value }
            }))}
            trackColor={{ false: '#e5e7eb', true: '#3b82f6' }}
            thumbColor={paymentConfig.localPayment.enabled ? '#fff' : '#f4f3f4'}
          />
        </View>

        {paymentConfig.localPayment.enabled && (
          <>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>رقم الحساب البنكي</Text>
              <TextInput
                style={styles.textInput}
                value={paymentConfig.localPayment.bankAccount}
                onChangeText={(text) => setPaymentConfig(prev => ({
                  ...prev,
                  localPayment: { ...prev.localPayment, bankAccount: text }
                }))}
                placeholder="1234567890"
                keyboardType="numeric"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>رقم IBAN</Text>
              <TextInput
                style={styles.textInput}
                value={paymentConfig.localPayment.iban}
                onChangeText={(text) => setPaymentConfig(prev => ({
                  ...prev,
                  localPayment: { ...prev.localPayment, iban: text }
                }))}
                placeholder="SA03 8000 0000 6080 1016 7519"
              />
            </View>
          </>
        )}
      </View>
    </View>
  );

  const renderSocialMediaSettings = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>📱 إعدادات التواصل الاجتماعي</Text>
      
      {/* WhatsApp */}
      <View style={styles.subSection}>
        <View style={styles.subSectionHeader}>
          <Text style={styles.subSectionTitle}>💬 WhatsApp Business API</Text>
          <Switch
            value={socialMediaConfig.whatsapp.enabled}
            onValueChange={(value) => setSocialMediaConfig(prev => ({
              ...prev,
              whatsapp: { ...prev.whatsapp, enabled: value }
            }))}
            trackColor={{ false: '#e5e7eb', true: '#25D366' }}
            thumbColor={socialMediaConfig.whatsapp.enabled ? '#fff' : '#f4f3f4'}
          />
        </View>

        {socialMediaConfig.whatsapp.enabled && (
          <>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>رمز API للأعمال</Text>
              <TextInput
                style={styles.textInput}
                value={socialMediaConfig.whatsapp.businessApiToken}
                onChangeText={(text) => setSocialMediaConfig(prev => ({
                  ...prev,
                  whatsapp: { ...prev.whatsapp, businessApiToken: text }
                }))}
                placeholder="business-api-token"
                secureTextEntry
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>معرف رقم الهاتف</Text>
              <TextInput
                style={styles.textInput}
                value={socialMediaConfig.whatsapp.phoneNumberId}
                onChangeText={(text) => setSocialMediaConfig(prev => ({
                  ...prev,
                  whatsapp: { ...prev.whatsapp, phoneNumberId: text }
                }))}
                placeholder="phone-number-id"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>رابط Webhook</Text>
              <TextInput
                style={styles.textInput}
                value={socialMediaConfig.whatsapp.webhookUrl}
                onChangeText={(text) => setSocialMediaConfig(prev => ({
                  ...prev,
                  whatsapp: { ...prev.whatsapp, webhookUrl: text }
                }))}
                placeholder="https://your-domain.com/webhook"
              />
            </View>
          </>
        )}
      </View>

      {/* Telegram */}
      <View style={styles.subSection}>
        <View style={styles.subSectionHeader}>
          <Text style={styles.subSectionTitle}>✈️ Telegram Bot</Text>
          <Switch
            value={socialMediaConfig.telegram.enabled}
            onValueChange={(value) => setSocialMediaConfig(prev => ({
              ...prev,
              telegram: { ...prev.telegram, enabled: value }
            }))}
            trackColor={{ false: '#e5e7eb', true: '#0088cc' }}
            thumbColor={socialMediaConfig.telegram.enabled ? '#fff' : '#f4f3f4'}
          />
        </View>

        {socialMediaConfig.telegram.enabled && (
          <>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>رمز البوت</Text>
              <TextInput
                style={styles.textInput}
                value={socialMediaConfig.telegram.botToken}
                onChangeText={(text) => setSocialMediaConfig(prev => ({
                  ...prev,
                  telegram: { ...prev.telegram, botToken: text }
                }))}
                placeholder="123456789:ABC..."
                secureTextEntry
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>معرف المحادثة</Text>
              <TextInput
                style={styles.textInput}
                value={socialMediaConfig.telegram.chatId}
                onChangeText={(text) => setSocialMediaConfig(prev => ({
                  ...prev,
                  telegram: { ...prev.telegram, chatId: text }
                }))}
                placeholder="chat-id"
              />
            </View>
          </>
        )}
      </View>

      {/* Twitter */}
      <View style={styles.subSection}>
        <View style={styles.subSectionHeader}>
          <Text style={styles.subSectionTitle}>🐦 Twitter API</Text>
          <Switch
            value={socialMediaConfig.twitter.enabled}
            onValueChange={(value) => setSocialMediaConfig(prev => ({
              ...prev,
              twitter: { ...prev.twitter, enabled: value }
            }))}
            trackColor={{ false: '#e5e7eb', true: '#1DA1F2' }}
            thumbColor={socialMediaConfig.twitter.enabled ? '#fff' : '#f4f3f4'}
          />
        </View>

        {socialMediaConfig.twitter.enabled && (
          <>
            <View style={styles.inputRow}>
              <View style={styles.inputHalf}>
                <Text style={styles.inputLabel}>مفتاح API</Text>
                <TextInput
                  style={styles.textInput}
                  value={socialMediaConfig.twitter.apiKey}
                  onChangeText={(text) => setSocialMediaConfig(prev => ({
                    ...prev,
                    twitter: { ...prev.twitter, apiKey: text }
                  }))}
                  placeholder="api-key"
                  secureTextEntry
                />
              </View>
              <View style={styles.inputHalf}>
                <Text style={styles.inputLabel}>المفتاح السري</Text>
                <TextInput
                  style={styles.textInput}
                  value={socialMediaConfig.twitter.apiSecret}
                  onChangeText={(text) => setSocialMediaConfig(prev => ({
                    ...prev,
                    twitter: { ...prev.twitter, apiSecret: text }
                  }))}
                  placeholder="api-secret"
                  secureTextEntry
                />
              </View>
            </View>

            <View style={styles.inputRow}>
              <View style={styles.inputHalf}>
                <Text style={styles.inputLabel}>رمز الوصول</Text>
                <TextInput
                  style={styles.textInput}
                  value={socialMediaConfig.twitter.accessToken}
                  onChangeText={(text) => setSocialMediaConfig(prev => ({
                    ...prev,
                    twitter: { ...prev.twitter, accessToken: text }
                  }))}
                  placeholder="access-token"
                  secureTextEntry
                />
              </View>
              <View style={styles.inputHalf}>
                <Text style={styles.inputLabel}>المفتاح السري للوصول</Text>
                <TextInput
                  style={styles.textInput}
                  value={socialMediaConfig.twitter.accessSecret}
                  onChangeText={(text) => setSocialMediaConfig(prev => ({
                    ...prev,
                    twitter: { ...prev.twitter, accessSecret: text }
                  }))}
                  placeholder="access-secret"
                  secureTextEntry
                />
              </View>
            </View>
          </>
        )}
      </View>
    </View>
  );

  const renderGeneralSettings = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>⚙️ الإعدادات العامة</Text>
      
      <View style={styles.inputRow}>
        <View style={styles.inputHalf}>
          <Text style={styles.inputLabel}>اسم التطبيق</Text>
          <TextInput
            style={styles.textInput}
            value={generalSettings.appName}
            onChangeText={(text) => setGeneralSettings(prev => ({ ...prev, appName: text }))}
            placeholder="اسم التطبيق"
          />
        </View>
        <View style={styles.inputHalf}>
          <Text style={styles.inputLabel}>إصدار التطبيق</Text>
          <TextInput
            style={styles.textInput}
            value={generalSettings.appVersion}
            onChangeText={(text) => setGeneralSettings(prev => ({ ...prev, appVersion: text }))}
            placeholder="1.0.0"
          />
        </View>
      </View>

      <View style={styles.inputRow}>
        <View style={styles.inputHalf}>
          <Text style={styles.inputLabel}>اللغة الافتراضية</Text>
          <TextInput
            style={styles.textInput}
            value={generalSettings.defaultLanguage}
            onChangeText={(text) => setGeneralSettings(prev => ({ ...prev, defaultLanguage: text }))}
            placeholder="ar"
          />
        </View>
        <View style={styles.inputHalf}>
          <Text style={styles.inputLabel}>المنطقة الزمنية</Text>
          <TextInput
            style={styles.textInput}
            value={generalSettings.timezone}
            onChangeText={(text) => setGeneralSettings(prev => ({ ...prev, timezone: text }))}
            placeholder="Asia/Riyadh"
          />
        </View>
      </View>

      <View style={styles.inputRow}>
        <View style={styles.inputHalf}>
          <Text style={styles.inputLabel}>بريد الدعم الفني</Text>
          <TextInput
            style={styles.textInput}
            value={generalSettings.supportEmail}
            onChangeText={(text) => setGeneralSettings(prev => ({ ...prev, supportEmail: text }))}
            placeholder="support@example.com"
            keyboardType="email-address"
          />
        </View>
        <View style={styles.inputHalf}>
          <Text style={styles.inputLabel}>هاتف الدعم الفني</Text>
          <TextInput
            style={styles.textInput}
            value={generalSettings.supportPhone}
            onChangeText={(text) => setGeneralSettings(prev => ({ ...prev, supportPhone: text }))}
            placeholder="+966501234567"
            keyboardType="phone-pad"
          />
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>الحد الأقصى لحجم الملف</Text>
        <TextInput
          style={styles.textInput}
          value={generalSettings.maxUploadSize}
          onChangeText={(text) => setGeneralSettings(prev => ({ ...prev, maxUploadSize: text }))}
          placeholder="10MB"
        />
      </View>

      <View style={styles.switchItem}>
        <Text style={styles.switchLabel}>وضع الصيانة</Text>
        <Switch
          value={generalSettings.maintenanceMode}
          onValueChange={(value) => setGeneralSettings(prev => ({ ...prev, maintenanceMode: value }))}
          trackColor={{ false: '#e5e7eb', true: '#ef4444' }}
          thumbColor={generalSettings.maintenanceMode ? '#fff' : '#f4f3f4'}
        />
      </View>

      <View style={styles.switchItem}>
        <Text style={styles.switchLabel}>وضع التطوير (Debug)</Text>
        <Switch
          value={generalSettings.debugMode}
          onValueChange={(value) => setGeneralSettings(prev => ({ ...prev, debugMode: value }))}
          trackColor={{ false: '#e5e7eb', true: '#f59e0b' }}
          thumbColor={generalSettings.debugMode ? '#fff' : '#f4f3f4'}
        />
      </View>
    </View>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'database':
        return renderDatabaseSettings();
      case 'api':
        return renderApiSettings();
      case 'notifications':
        return renderNotificationSettings();
      case 'payments':
        return renderPaymentSettings();
      case 'social':
        return renderSocialMediaSettings();
      case 'general':
        return renderGeneralSettings();
      default:
        return renderDatabaseSettings();
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <ThemedView style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <IconSymbol name="chevron.right" size={20} color="#fff" />
            <Text style={styles.backText}>الرجوع</Text>
          </TouchableOpacity>
          
          <View style={styles.headerCenter}>
            <View style={styles.settingsIcon}>
              <IconSymbol name="house.fill" size={24} color="#fff" />
            </View>
            <Text style={styles.headerTitle}>إعدادات التطبيق</Text>
            <Text style={styles.headerSubtitle}>إدارة اتصالات وخدمات التطبيق</Text>
          </View>

          <TouchableOpacity style={styles.saveHeaderButton} onPress={handleSaveSettings}>
            <Text style={styles.saveHeaderText}>حفظ الكل</Text>
          </TouchableOpacity>
        </View>
      </ThemedView>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabsScroll}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.id}
              style={[styles.tab, activeTab === tab.id && styles.activeTab]}
              onPress={() => setActiveTab(tab.id as any)}
            >
              <IconSymbol 
                name={tab.icon} 
                size={16} 
                color={activeTab === tab.id ? '#fff' : '#6b7280'} 
              />
              <Text style={[styles.tabText, activeTab === tab.id && styles.activeTabText]}>
                {tab.title}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {renderTabContent()}

        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSaveSettings}>
          <IconSymbol name="house.fill" size={20} color="#fff" />
          <Text style={styles.saveButtonText}>حفظ جميع الإعدادات</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    backgroundColor: '#3b82f6',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  backText: {
    color: '#fff',
    fontSize: 14,
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  settingsIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  headerSubtitle: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
    textAlign: 'center',
  },
  saveHeaderButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  saveHeaderText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  tabsContainer: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  tabsScroll: {
    paddingHorizontal: 16,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 4,
    borderRadius: 8,
    gap: 8,
  },
  activeTab: {
    backgroundColor: '#3b82f6',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
  },
  activeTabText: {
    color: '#fff',
  },
  content: {
    padding: 20,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 20,
    textAlign: 'right',
  },
  subSection: {
    marginBottom: 24,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  subSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  subSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
    textAlign: 'right',
  },
  textInput: {
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 14,
    textAlign: 'right',
    color: '#1f2937',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  inputRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  inputHalf: {
    flex: 1,
  },
  radioGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  radioOption: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    backgroundColor: '#f9fafb',
  },
  radioSelected: {
    backgroundColor: '#3b82f6',
    borderColor: '#3b82f6',
  },
  radioText: {
    fontSize: 14,
    color: '#6b7280',
  },
  radioTextSelected: {
    color: '#fff',
  },
  switchItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    marginBottom: 8,
  },
  switchLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  testButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#10b981',
    borderRadius: 8,
    paddingVertical: 12,
    gap: 8,
    marginTop: 8,
  },
  testButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3b82f6',
    borderRadius: 12,
    paddingVertical: 16,
    gap: 8,
    marginTop: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
