
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, TextInput } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { router } from 'expo-router';

export default function UserSettings() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const [userInfo, setUserInfo] = useState({
    fullName: 'أحمد محمد',
    email: 'ahmed@example.com',
    phone: '+966501234567',
    city: 'الرياض',
  });

  const handleBack = () => {
    router.back();
  };

  const handleSave = () => {
    alert('تم حفظ الإعدادات بنجاح');
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
            <Text style={styles.headerTitle}>إعدادات المستخدم</Text>
            <Text style={styles.headerSubtitle}>إدارة الحساب والإعدادات الشخصية</Text>
          </View>
          
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveText}>حفظ</Text>
          </TouchableOpacity>
        </View>
      </ThemedView>

      <View style={styles.content}>
        {/* Personal Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>المعلومات الشخصية</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>الاسم الكامل</Text>
            <TextInput
              style={styles.textInput}
              value={userInfo.fullName}
              onChangeText={(text) => setUserInfo({...userInfo, fullName: text})}
              placeholder="أدخل اسمك الكامل"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>البريد الإلكتروني</Text>
            <TextInput
              style={styles.textInput}
              value={userInfo.email}
              onChangeText={(text) => setUserInfo({...userInfo, email: text})}
              placeholder="أدخل بريدك الإلكتروني"
              keyboardType="email-address"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>رقم الهاتف</Text>
            <TextInput
              style={styles.textInput}
              value={userInfo.phone}
              onChangeText={(text) => setUserInfo({...userInfo, phone: text})}
              placeholder="أدخل رقم هاتفك"
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>المدينة</Text>
            <TextInput
              style={styles.textInput}
              value={userInfo.city}
              onChangeText={(text) => setUserInfo({...userInfo, city: text})}
              placeholder="أدخل مدينتك"
            />
          </View>
        </View>

        {/* Notification Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>إعدادات الإشعارات</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>تفعيل الإشعارات</Text>
              <Text style={styles.settingDesc}>استقبال إشعارات عامة من التطبيق</Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: '#e5e7eb', true: '#3b82f6' }}
              thumbColor={notificationsEnabled ? '#fff' : '#f4f3f4'}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>إشعارات البريد الإلكتروني</Text>
              <Text style={styles.settingDesc}>استقبال إشعارات عبر البريد الإلكتروني</Text>
            </View>
            <Switch
              value={emailNotifications}
              onValueChange={setEmailNotifications}
              trackColor={{ false: '#e5e7eb', true: '#3b82f6' }}
              thumbColor={emailNotifications ? '#fff' : '#f4f3f4'}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>إشعارات الرسائل النصية</Text>
              <Text style={styles.settingDesc}>استقبال إشعارات عبر الرسائل النصية</Text>
            </View>
            <Switch
              value={smsNotifications}
              onValueChange={setSmsNotifications}
              trackColor={{ false: '#e5e7eb', true: '#3b82f6' }}
              thumbColor={smsNotifications ? '#fff' : '#f4f3f4'}
            />
          </View>
        </View>

        {/* App Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>إعدادات التطبيق</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>الوضع الليلي</Text>
              <Text style={styles.settingDesc}>تفعيل المظهر الداكن للتطبيق</Text>
            </View>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: '#e5e7eb', true: '#3b82f6' }}
              thumbColor={darkMode ? '#fff' : '#f4f3f4'}
            />
          </View>

          <TouchableOpacity style={styles.actionItem}>
            <View style={styles.actionInfo}>
              <Text style={styles.actionTitle}>تغيير كلمة المرور</Text>
              <Text style={styles.actionDesc}>تحديث كلمة مرور حسابك</Text>
            </View>
            <IconSymbol name="chevron.right" size={20} color="#9ca3af" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionItem}>
            <View style={styles.actionInfo}>
              <Text style={styles.actionTitle}>اللغة</Text>
              <Text style={styles.actionDesc}>العربية</Text>
            </View>
            <IconSymbol name="chevron.right" size={20} color="#9ca3af" />
          </TouchableOpacity>
        </View>

        {/* Account Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>إجراءات الحساب</Text>
          
          <TouchableOpacity style={styles.actionItem}>
            <View style={styles.actionInfo}>
              <Text style={styles.actionTitle}>مساعدة ودعم</Text>
              <Text style={styles.actionDesc}>الحصول على المساعدة أو التواصل مع الدعم</Text>
            </View>
            <IconSymbol name="paperplane.fill" size={20} color="#9ca3af" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionItem}>
            <View style={styles.actionInfo}>
              <Text style={styles.actionTitle}>سياسة الخصوصية</Text>
              <Text style={styles.actionDesc}>مراجعة سياسة الخصوصية وشروط الاستخدام</Text>
            </View>
            <IconSymbol name="chevron.right" size={20} color="#9ca3af" />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.actionItem, styles.dangerAction]} onPress={() => router.push('/auth')}>
            <View style={styles.actionInfo}>
              <Text style={[styles.actionTitle, { color: '#ef4444' }]}>تسجيل الخروج</Text>
              <Text style={styles.actionDesc}>الخروج من حسابك الحالي</Text>
            </View>
            <IconSymbol name="house.fill" size={20} color="#ef4444" />
          </TouchableOpacity>
        </View>
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
    gap: 4,
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
    textAlign: 'center',
  },
  headerSubtitle: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
    textAlign: 'center',
  },
  saveButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  saveText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  content: {
    padding: 16,
    gap: 20,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
    textAlign: 'right',
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
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f9fafb',
    textAlign: 'right',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  settingInfo: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    textAlign: 'right',
    marginBottom: 2,
  },
  settingDesc: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'right',
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  actionInfo: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    textAlign: 'right',
    marginBottom: 2,
  },
  actionDesc: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'right',
  },
  dangerAction: {
    borderBottomColor: '#fee2e2',
    backgroundColor: '#fef2f2',
  },
});
