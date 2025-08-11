import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

interface AuthScreenProps {
  onLogin?: (username?: string, password?: string) => void;
  onRegister?: () => void;
}

export function LoginScreen({ onLogin }: AuthScreenProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.authCard}>
        <View style={styles.logoContainer}>
          <View style={styles.logo}>
            <IconSymbol name="house.fill" size={40} color="#3b82f6" />
          </View>
        </View>

        <View style={styles.loginIcon}>
          <IconSymbol name="house.fill" size={32} color="#fff" />
        </View>

        <Text style={styles.title}>تسجيل الدخول</Text>
        <Text style={styles.subtitle}>أدخل بيانات تسجيل دخولك</Text>

        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>اسم المستخدم</Text>
            <TextInput
              style={styles.input}
              value={username}
              onChangeText={setUsername}
              placeholder="أدخل اسم المستخدم"
              textAlign="right"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>كلمة المرور</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="أدخل كلمة المرور"
              secureTextEntry
              textAlign="right"
            />
          </View>

          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>نسيت كلمة المرور؟</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginButton} onPress={() => onLogin?.(username, password)}>
            <Text style={styles.loginButtonText}>تسجيل الدخول →</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.createAccountLink}>
            <Text style={styles.createAccountText}>
              ليس لديك حساب؟ <Text style={styles.linkText}>أنشئ حساب جديد</Text>
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.adminSection}>
          <Text style={styles.adminTitle}>حسابات التجربة</Text>

          <View style={styles.adminCard}>
            <Text style={styles.adminType}>مدير التطبيق (Super Admin)</Text>
            <View style={styles.adminBadge}>
              <Text style={styles.adminBadgeText}>admin</Text>
            </View>
            <View style={styles.adminBadge}>
              <Text style={styles.adminBadgeText}>123456</Text>
            </View>
          </View>

          <View style={styles.adminCard}>
            <Text style={styles.adminType}>صاحب متجر (Merchant)</Text>
            <View style={styles.adminBadge}>
              <Text style={styles.adminBadgeText}>merchant</Text>
            </View>
            <View style={styles.adminBadge}>
              <Text style={styles.adminBadgeText}>merchant</Text>
            </View>
          </View>
        </View>
      </ThemedView>
    </ScrollView>
  );
}

export function RegisterScreen({ onRegister }: AuthScreenProps) {
  const [userType, setUserType] = useState<'customer' | 'merchant'>('customer');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    city: '',
  });

  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.authCard}>
        <View style={styles.logoContainer}>
          <View style={styles.logo}>
            <IconSymbol name="house.fill" size={40} color="#3b82f6" />
          </View>
        </View>

        <Text style={styles.title}>إنشاء حساب جديد</Text>
        <Text style={styles.subtitle}>انضم إلى منصة التسوق الإلكتروني</Text>

        <View style={styles.userTypeSelector}>
          <Text style={styles.userTypeLabel}>نوع الحساب</Text>

          <TouchableOpacity
            style={[styles.userTypeOption, userType === 'customer' && styles.userTypeSelected]}
            onPress={() => setUserType('customer')}
          >
            <IconSymbol name="house.fill" size={20} color={userType === 'customer' ? '#3b82f6' : '#64748b'} />
            <View style={styles.userTypeText}>
              <Text style={[styles.userTypeTitle, userType === 'customer' && styles.userTypeSelectedText]}>
                مستخدم عادي
              </Text>
              <Text style={styles.userTypeDesc}>للتسوق وشراء من المتاجر المختلفة</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.userTypeOption, userType === 'merchant' && styles.userTypeSelected]}
            onPress={() => setUserType('merchant')}
          >
            <IconSymbol name="paperplane.fill" size={20} color={userType === 'merchant' ? '#3b82f6' : '#64748b'} />
            <View style={styles.userTypeText}>
              <Text style={[styles.userTypeTitle, userType === 'merchant' && styles.userTypeSelectedText]}>
                صاحب عمل
              </Text>
              <Text style={styles.userTypeDesc}>لإنشاء متجر وبيع المنتجات</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputRow}>
            <View style={styles.inputHalf}>
              <Text style={styles.label}>الاسم الكامل *</Text>
              <TextInput
                style={styles.input}
                placeholder="أدخل الاسم الكامل"
                textAlign="right"
              />
            </View>
            <View style={styles.inputHalf}>
              <Text style={styles.label}>البريد الإلكتروني *</Text>
              <TextInput
                style={styles.input}
                placeholder="example@email.com"
                textAlign="left"
              />
            </View>
          </View>

          <View style={styles.inputRow}>
            <View style={styles.inputHalf}>
              <Text style={styles.label}>الدولة</Text>
              <TextInput
                style={styles.input}
                placeholder="اختر الدولة"
                textAlign="right"
              />
            </View>
            <View style={styles.inputHalf}>
              <Text style={styles.label}>رقم الهاتف *</Text>
              <TextInput
                style={styles.input}
                placeholder="+966 50 123 4567"
                textAlign="left"
              />
            </View>
          </View>

          <View style={styles.inputRow}>
            <View style={styles.inputHalf}>
              <Text style={styles.label}>كلمة المرور *</Text>
              <TextInput
                style={styles.input}
                placeholder="أدخل كلمة المرور"
                secureTextEntry
                textAlign="right"
              />
            </View>
            <View style={styles.inputHalf}>
              <Text style={styles.label}>تأكيد كلمة المرور *</Text>
              <TextInput
                style={styles.input}
                placeholder="أعد إدخال كلمة المرور"
                secureTextEntry
                textAlign="right"
              />
            </View>
          </View>

          <View style={styles.checkboxContainer}>
            <TouchableOpacity style={styles.checkbox}>
              <Text style={styles.checkboxText}>
                أوافق على الشروط والأحكام
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.checkboxContainer}>
            <TouchableOpacity style={styles.checkbox}>
              <Text style={styles.checkboxText}>
                أوافق على شروط الشراء والتوصيل الخاصة
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.registerButton} onPress={onRegister}>
            <Text style={styles.registerButtonText}>إنشاء الحساب →</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginLink}>
            <Text style={styles.loginLinkText}>
              لديك حساب بالفعل؟ <Text style={styles.linkText}>سجل الدخول</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f5f9',
  },
  authCard: {
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#eff6ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#3b82f6',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 32,
  },
  formContainer: {
    gap: 16,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    textAlign: 'right',
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f9fafb',
  },
  inputRow: {
    flexDirection: 'row',
    gap: 12,
  },
  inputHalf: {
    flex: 1,
    gap: 8,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginTop: 8,
  },
  forgotPasswordText: {
    color: '#3b82f6',
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: '#3b82f6',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  registerButton: {
    backgroundColor: '#10b981',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  createAccountLink: {
    alignItems: 'center',
    marginTop: 16,
  },
  createAccountText: {
    color: '#64748b',
    fontSize: 14,
  },
  loginLink: {
    alignItems: 'center',
    marginTop: 16,
  },
  loginLinkText: {
    color: '#64748b',
    fontSize: 14,
  },
  linkText: {
    color: '#3b82f6',
    fontWeight: '600',
  },
  adminSection: {
    marginTop: 32,
    padding: 16,
    backgroundColor: '#f8fafc',
    borderRadius: 8,
  },
  adminTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    textAlign: 'center',
    marginBottom: 16,
  },
  adminCard: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#3b82f6',
  },
  adminType: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 8,
  },
  adminBadge: {
    backgroundColor: '#eff6ff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginBottom: 4,
  },
  adminBadgeText: {
    fontSize: 12,
    color: '#3b82f6',
    textAlign: 'right',
  },
  userTypeSelector: {
    marginBottom: 24,
  },
  userTypeLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 12,
    textAlign: 'right',
  },
  userTypeOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    marginBottom: 12,
    gap: 12,
  },
  userTypeSelected: {
    borderColor: '#3b82f6',
    backgroundColor: '#eff6ff',
  },
  userTypeText: {
    flex: 1,
  },
  userTypeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#64748b',
    textAlign: 'right',
  },
  userTypeSelectedText: {
    color: '#3b82f6',
  },
  userTypeDesc: {
    fontSize: 14,
    color: '#9ca3af',
    marginTop: 4,
    textAlign: 'right',
  },
  checkboxContainer: {
    marginVertical: 8,
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  checkboxText: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'right',
    flex: 1,
  },
});